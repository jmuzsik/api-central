var express = require('express');
var router = express.Router();
var nasaRouter = require("./nasa");
var hewittRouter = require("./hewitt");
var wordsRouter = require("./words");

router.route('/nasa', nasaRouter);
router.route('/hewitt', hewittRouter);
router.route('/words', wordsRouter);

module.exports = router;
