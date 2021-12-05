const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const port = 3000;
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/find/:name', (req, res) => {
  axios.get(`https://api.scryfall.com/cards/autocomplete?q=${req.params.name}`)
  .then((list) => {
    res.status(200).send(list.data.data);
  });
});

app.get('/exact/:q', (req, res) => {
  axios.get(`https://api.scryfall.com/cards/named?exact=${req.params.q}`)
  .then((list) => {
    res.status(200).send(list.data);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Example app listen at http://localhost:${port}`);
  }
});