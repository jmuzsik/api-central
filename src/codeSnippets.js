export const latestHubbleCode = `var http = require('http');

exports.handler = (event, context, callback) => {
    http.get('http://hubblesite.org/api/v3/news_release/last', (resp) => {
      let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
     
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        callback(null, response)
      });
     
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
};`

export const dailyNASACode = `var https = require('https')

exports.handler = (event, context, callback) => {
  https
    .get(
      'https://api.nasa.gov/planetary/apod?api_key=' + process.env.NASA_API_KEY,
      resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          callback(null, JSON.parse(data))
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}`

export const randomWordCode = `var unirest = require('unirest')

exports.handler = function(e, ctx, cb) {
  unirest
    .get('https://wordsapiv1.p.mashape.com/words?random=true')
    .header('X-Mashape-Key', process.env.WORDS_API_KEY)
    .header('Accept', 'application/json')
    .end(function(result, error) {
      if (!error && result.status === 200) {
        cb(null, result.body)
      } else {
        cb(null, { error: result.body, message: 'error' })
      }
      console.log(
        'requests remaining:',
        result.headers['x-ratelimit-requests-remaining']
      );
    });
}
`

export const wordPoemCode = `var unirest = require('unirest')
var { findDeep } = require('./utils')

exports.handler = function(event, ctx, cb) {
  let words
  if (event.pathParameters !== null && event.pathParameters !== undefined) {
    if (
      event.pathParameters.proxy !== undefined &&
      event.pathParameters.proxy !== null &&
      event.pathParameters.proxy !== ''
    ) {
      console.log('Received proxy: ' + event.pathParameters.proxy)
      words = event.pathParameters.proxy
    }
  }
  const numberOfQueries = 5
  const splitWords = words.split(',')
  let objOfWords = {}
  for (let i = 0; i < numberOfQueries; i++) {
    unirest
      .get('https://wordsapiv1.p.mashape.com/words/' + splitWords[i])
      .header('X-Mashape-Key', process.env.WORDS_API_KEY)
      .header('Accept', 'application/json')
      .end(function(result, error) {
        if (!error && result.status === 200) {
          objOfWords[splitWords[i]] = {}
          objOfWords[splitWords[i]].word = splitWords[i]
          objOfWords[splitWords[i]].definition = findDeep(
            result.body,
            ['results', 0, 'definition'],
            splitWords[i]
          )
        } else {
          objOfWords[splitWords[i]] = {}
          objOfWords[splitWords[i]].word = splitWords[i]
        }
        console.log(
          'requests remaining:',
          result.headers['x-ratelimit-requests-remaining']
        )
      })
  }
  setTimeout(function() {
    console.log(objOfWords)
    var responseBody = objOfWords

    var response = {
      statusCode: 200,
      headers: {
        'x-custom-header': 'my custom header value',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(responseBody)
    }
    cb(null, response)
  }, 3500)
}
`

export const whatWouldMicahSayCode = `var https = require('https')

exports.handler = (event, context, callback) => {
  https
    .get(
      'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.labs.whatWouldMicahSay&access_token=' +
        process.env.COOPER_HEWITT_API_KEY,
      resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          callback(null, JSON.parse(data))
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}`

export const randomObjectCode = `var https = require('https')

exports.handler = (event, context, callback) => {
  https
    .get(
      'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.labs.whatWouldMicahSay&access_token=' +
        process.env.COOPER_HEWITT_API_KEY,
      resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          callback(null, JSON.parse(data))
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}`

export const robotRothkoCode = `var https = require('https')

exports.handler = (event, context, callback) => {
  https
    .get(
      'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=' +
        process.env.COOPER_HEWITT_API_KEY,
      resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          callback(null, JSON.parse(data))
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}`

export const randomVideoCode = `var https = require('https')

exports.handler = (event, context, callback) => {
  https
    .get(
      'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.videos.getRandom&access_token=' +
        process.env.COOPER_HEWITT_API_KEY,
      resp => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          callback(null, JSON.parse(data))
        })
      }
    )
    .on('error', err => {
      console.log('Error: ' + err.message)
    })
}`
