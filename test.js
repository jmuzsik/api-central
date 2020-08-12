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
      if (s.match(/[,;().]/g)) {
        s = s.replace(/[,;().]/g, '');
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
      poem += vShortWords[getRandomInt(vShortWords.length)] + space + longWords[getRandomInt(longWords.length)] + space + shortWords[getRandomInt(shortWords.length)] + space + longWords[getRandomInt(longWords.length)] + '!';
    }
    i++;
  }
  return poem
}
