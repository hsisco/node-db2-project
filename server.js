const express = require('express');
const server = express();

const db = require('./data/db-config')

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Vroom-vroom Beep-beep</h2>`);
});

// ADD NEW CAR
server.post('/api/cars', (req, res) => {
  const car = req.body;
  const newCar = { vin: car.vin, make: car.make, model: car.model, mileage: car.mileage };

  db('cars').insert(newCar)
    .then(id => {
      db('cars').where({ id: id[0] })
      .then(car => {
        res.status(201).json({ success: "New car created", car: car })
      })
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to create new car", err })
    }) 
})

// FETCH ALL CARS
server.get('/api/cars', (req, res) => {
  db('cars')
    .then(cars => {
      res.status(201).json({ success: "All cars fetched", cars })
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to fetch all cars", err })
    })
})

module.exports = server;