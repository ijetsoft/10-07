require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../lib/db');
const Weather = require('../models/weather');

const app = express();

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('*Ошибка подключения к базе данных:', error.message);
    res.status(500).json({ error: 'Ошибка подключения к базе данных' });
  }
});

app.get('/', (req, res) => {
  res.send('10.07' + '<br>' + 'Static Home Page');
});

app.get('/api', (req, res) => {
  res.send('*** Express сервер успешно работает на Vercel!');
});

app.get('/api/add', async (req, res) => {
    
  /* const Weather = mongoose.model('Weather', {
    temperature: Number,
    city: String,
    date: Date
  }); */
  let temperature = 28
  let city = 'Warsow'
  let date = new Date()
  

  const newWeather = new Weather({
    temperature,
    city,
    date
  });

    await newWeather.save().then(() => console.log({newWeather}));
    res.json(newWeather)
   })

app.get('/api/list', async (req, res) => {
  const weathers = await Weather.find();
  res.json(weathers);
});

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

module.exports = app;