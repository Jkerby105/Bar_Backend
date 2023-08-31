const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "DELETE", "PUT"],
    })
    );


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });


app.get('/drinks', (req,res,next) => {

  const sql = "SELECT idDrinkItems, Title, Description, CONVERT(Image USING utf8) AS Image FROM DrinkItems";

        db.query(sql)
        .then(data => res.json(data))
        .catch(error => console.log(error))

});


app.post('/order', (req,res,next) => {
  const data = req.body;
  const id = data.ID;

  const sql = 'INSERT INTO Orders (OrderTime, DrinkItems_idDrinkItems) VALUES (NOW(), ?)';

  db.query(sql,[id])
  .then(response => res.json(response))
  .catch(error => console.log(error))

})

app.post('/drinks', (req,res,next) => {
    const data = req.body;

    const title = data.title;
    const description = data.description;
    const img = data.img;

    const sql = " INSERT INTO `MyBar2`.`DrinkItems` (`Title`, `Description`, `Image`) VALUES (?,?,?)"

    db.query(sql,[title,description,img])
    .then(response => res.json(response))
    .catch(error => console.log(error));

})


app.get('/order', (req,res,next) => {

  const sql = `
  SELECT
    O.idOrders,
    O.OrderTime,
    O.DrinkItems_idDrinkItems,
  FROM
    Orders AS O
  INNER JOIN
  DrinkItems AS D
  ON
  O.DrinkItems_idDrinkItems = D.idDrinkItems;
`;

  db.query(sql)
  .then(response => res.json(response))
  .catch(error => console.log(error))

})

app.get('/order', (req, res, next) => {

  const sql = `
  SELECT
    O.idOrders,
    O.OrderTime,
    O.DrinkItems_idDrinkItems,
    D.Title
  FROM
    Orders AS O
  INNER JOIN
    DrinkItems AS D
  ON
    O.DrinkItems_idDrinkItems = D.idDrinkItems;
`;

  db.query(sql)
    .then(response => res.json(response))
    .catch(error => console.log(error));

});

app.delete('/ordercompletion', (req,res,next) => {
  const data = req.body;
  const id = data.ID;

  const sql = 'DELETE FROM Orders WHERE idOrders = ?;'

  db.query(sql, [id])
  .then(response => res.json(response))
  .catch(error => console.log(error))


})


app.listen(3001);