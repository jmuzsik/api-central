const express = require('express');
var request = require('request-promise');
var unirest = require('unirest');
require('dotenv').config();

var { findDeep } = require('./utils');

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
app.get('/api/words/random/word', (req, res) => {
  unirest
    .get('https://wordsapiv1.p.mashape.com/words?random=true')
    .header('X-Mashape-Key', process.env.WORDS_API_KEY)
    .header('Accept', 'application/json')
    .end(function(result, error) {
      if (!error && result.status === 200) {
        res.status(result.status).send(result.body);
      } else {
        res
          .status(result.status)
          .send({ error: result.body, message: 'error' });
      }
      console.log(
        'requests remaining:',
        result.headers['x-ratelimit-requests-remaining']
      );
    });
});
app.get('/api/words/:words', (req, res) => {
  console.log(req.params.words);
  const words = req.params.words;
  const numberOfQueries = 5;
  const splitWords = words.split(',');
  let objOfWords = {};
  for (let i = 0; i < numberOfQueries; i++) {
    unirest
      .get(`https://wordsapiv1.p.mashape.com/words/${splitWords[i]}`)
      .header('X-Mashape-Key', process.env.WORDS_API_KEY)
      .header('Accept', 'application/json')
      .end(function(result, error) {
        if (!error && result.status === 200) {
          console.log(result.body);
          objOfWords[splitWords[i]] = {};
          objOfWords[splitWords[i]].word = splitWords[i];
          objOfWords[splitWords[i]].definition = findDeep(
            result.body,
            ['results', 0, 'definition'],
            splitWords[i]
          );
        } else {
          objOfWords[splitWords[i]] = {};
          objOfWords[splitWords[i]].word = splitWords[i];
        }
        console.log(
          'requests remaining:',
          result.headers['x-ratelimit-requests-remaining']
        );
      });
  }
  setTimeout(() => {
    res.send(objOfWords);
  }, 3500);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
