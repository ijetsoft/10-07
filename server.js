const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI //|| 'mongodb://127.0.0.1:27017/weather';

const Weather = mongoose.model('Weather', {
  temperature: Number,
  city: String,
  date: Date
});

app.get('/', (req, res) =>  {
  res.send('Static Home Page')
})
app.get('/api/add', async (req, res) => {
    let temperature = 32
    let city = 'London'
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

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, 
      //,useNewUrlParser: true, useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB');

    if (require.main === module) {
      app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (require.main === module) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  start();
}

module.exports = app;