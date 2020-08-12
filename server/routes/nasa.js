var express = require('express');
var router = express.Router();
const rp = require('request-promise');

/* GET home page. */
router.get('/daily-nasa', async function(req, res) {
  let data;
  try {
    data = await rp(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`);
  } catch (error) {
    console.log(error);
    return res.send({error: true})    
  }
  return res.send(data);
});

router.get('/daily-hubble', async function(req, res) {
  let data;
  try {
    data = await rp('http://hubblesite.org/api/v3/images')
  } catch (error) {
    console.log(error);
    return res.send({error: true})
  }
  data = JSON.parse(data);
  const id = data[0].id;
  try {
    data = await rp((`http://hubblesite.org/api/v3/image/${id}`));
  } catch (error) {
    console.log(error);
    return res.send({error: true}) 
  }
  return res.send(JSON.parse(data));
});

module.exports = router;
