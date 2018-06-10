const express = require('express');
var request = require('request-promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/latest-hubble', (req, res) => {
  const options = {
    uri: 'http://hubblesite.org/api/v3/news_release/last',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.get('/api/daily-nasa', (req, res) => {
  const options = {
    uri: `https://api.nasa.gov/planetary/apod?api_key=${
      process.env.NASA_API_KEY
    }`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.get('/api/cooper-hewitt/what-would-micah-say', (req, res) => {
  const options = {
    uri: `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.labs.whatWouldMicahSay&access_token=${
      process.env.COOPER_HEWITT_API_KEY
    }`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.get('/api/cooper-hewitt/random-object', (req, res) => {
  const options = {
    uri: `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getRandom&access_token=${
      process.env.COOPER_HEWITT_API_KEY
    }`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.get('/api/cooper-hewitt/robot-rothko', (req, res) => {
  const options = {
    uri: `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=${
      process.env.COOPER_HEWITT_API_KEY
    }`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.get('/api/cooper-hewitt/random-video', (req, res) => {
  const options = {
    uri: `https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.videos.getRandom&access_token=${
      process.env.COOPER_HEWITT_API_KEY
    }`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };

  request(options)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send('error'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
