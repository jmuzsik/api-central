var express = require("express");
var router = express.Router();
const rp = require("request-promise");

function createPoem(arr) {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function shuffle(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  }

  let finArr = [];

  arr.forEach((str) => {
    const temp = str.split(" ").map((s) => {
      s = s.toLowerCase();
      if (s.match(/[,`';().]/g)) {
        s = s.replace(/[,`';().]/g, "");
      }
      return s;
    });
    finArr = [...finArr, ...temp];
  });

  finArr = finArr.sort(shuffle);

  const vShortWords = finArr
    .filter((val) => val.length < 3)
    .concat(finArr.filter((val) => val.length < 3));
  const shortWords = finArr.filter((val) => val.length < 5 && val.length >= 3);
  const longWords = finArr.filter((val) => val.length >= 5);

  const len = vShortWords.length + shortWords.length + longWords.length;

  let poem = "";

  let i = 0;
  let j = 0;
  let space = " ";
  let newLine = "\n";

  while (i < 9) {
    let temp = "";
    j = 0;
    poem += newLine;
    if (i === 1 || i === 4 || i === 7) {
      poem += space.repeat(2);
    } else if (i === 2 || i === 5 || i === 8) {
      poem += space.repeat(4);
    } else if (i !== 0) {
      poem += newLine;
    }
    while (j < 6) {
      if (j === 0) {
        temp += vShortWords[getRandomInt(vShortWords.length)] + space;
      } else if (j === 2 || j === 4) {
        temp += shortWords[getRandomInt(shortWords.length)] + space;
      } else {
        temp += longWords[getRandomInt(longWords.length)] + space;
      }
      j++;
    }
    poem += temp;
    if (i === 8) {
      poem += newLine.repeat(2);
      poem +=
        vShortWords[getRandomInt(vShortWords.length)] +
        space +
        longWords[getRandomInt(longWords.length)] +
        space +
        shortWords[getRandomInt(shortWords.length)] +
        space +
        longWords[getRandomInt(longWords.length)] +
        "!";
    }
    i++;
  }
  return poem;
}

/* GET home page. */
router.post("/words", async function (req, res) {
  let data;
  const words = JSON.parse(JSON.stringify(req.body)).words.split(",");
  let arr = [];
  for (let i = 0; i < words.length; i++) {
    let err = false;
    const word = words[i];
    let data;
    try {
      data = await rp(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": process.env.WORDS_KEY,
          useQueryString: true,
        },
      });
    } catch (error) {
      err = true;
    }
    if (!err) {
      data = JSON.parse(data);
      const result = data.results;
      let def = "";
      if (result && result[0]) {
        def = result[0].definition;
      }
      arr.push(def + ' ' + word);
    } else arr.push("word does not exist");
  }
  return res.send({ poem: createPoem(arr) });
});

router.get("/random", async function (req, res) {
  let data;
  try {
    data = await rp(`https://wordsapiv1.p.rapidapi.com/words/`, {
      qs: { random: "true" },
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": process.env.WORDS_KEY,
        useQueryString: true,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
  return res.send(data);
});

module.exports = router;
