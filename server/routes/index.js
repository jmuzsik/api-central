var express = require('express');
var router = express.Router();
var nasaRouter = require("./nasa");
var hewittRouter = require("./hewitt");
var wordsRouter = require("./words");

router.use('/nasa', nasaRouter);
router.use('/hewitt', hewittRouter);
router.use('/words', wordsRouter);

module.exports = router;
