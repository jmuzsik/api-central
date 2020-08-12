var express = require('express');
var router = express.Router();

var rp = require('request-promise');

router.get('/rothko', async function(req, res) {
  let data;
  try {
    data = await rp(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.play.robotRothko&access_token=${process.env.COOPER_HEWITT_KEY}`);
  } catch (error) {
    console.log(error);
    return res.send({error: true})    
  }
  return res.send(data); 
});

router.get('/object', async function(req, res) {
  let data;
  try {
    data = await rp(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getRandom&access_token=${process.env.COOPER_HEWITT_KEY}`);
  } catch (error) {
    console.log(error);
    return res.send({error: true})    
  }
  return res.send(data); 
});

router.get('/micah', async function(req, res) {
  let data;
  try {
    data = await rp(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.labs.whatWouldMicahSay&access_token=${process.env.COOPER_HEWITT_KEY}`);
  } catch (error) {
    console.log(error);
    return res.send({error: true})    
  }
  return res.send(data); 
});

router.get('/video', async function(req, res) {
  let data;
  try {
    data = await rp(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.videos.getRandom&access_token=${process.env.COOPER_HEWITT_KEY}`);
  } catch (error) {
    console.log(error);
    return res.send({error: true})    
  }
  return res.send(data); 
});

module.exports = router;
