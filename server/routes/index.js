var express = require('express');
var router = express.Router();
var nasaRouter = require("./nasa");
var hewittRouter = require("./hewitt");
var wordsRouter = require("./words");

router.use('/api/nasa', nasaRouter);
router.use('/api/hewitt', hewittRouter);
router.use('/api/words', wordsRouter);

module.exports = router;
