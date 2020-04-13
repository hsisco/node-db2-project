const express = require('express');
const server = express();

const db = require('./data/db-config')

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Vroom-vroom Beep-beep</h2>`);
});

module.exports = server;