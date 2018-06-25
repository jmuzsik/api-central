export const findDeep = (data, pathArr, fallback) => {
  const len = pathArr.length
  for (let i = 0; i < len; i++) {
    let path = pathArr[i]
    if (
      Array.isArray(data[path]) ||
      findDeep.isObject(data[path]) ||
      typeof data[path] === "string"
    ) {
      if (i === len - 1) {
        return data[path]
      }
      data = data[path]
    } else {
      return fallback
    }
  }
}

findDeep.isObject = obj => obj && typeof obj === "object"

function convertObjToArr(textObj) {
  const words = Object.keys(textObj)
  return words.reduce((accum, wordKey) => {
    accum.push(wordKey)
    if (textObj[wordKey].definition) {
      const definitionArr = textObj[wordKey].definition.split(" ")
      definitionArr.forEach(word => {
        accum.push(word)
      })
    }
    return accum
  }, [])
}
function grabShortWords(arr) {
  return arr.reduce((accum, word) => {
    if (word.length < 4) accum.push(word)
    return accum
  }, [])
}
function grabLongerWords(arr) {
  return arr.reduce((accum, word) => {
    if (word.length >= 4) accum.push(word)
    return accum
  }, [])
}
function createTitle(textObj) {
  const words = Object.keys(textObj)
  const shortestWord = words.reduce((accum, currentWord) => {
    if (currentWord.length < accum.length) return currentWord
    return accum
  }, "an extremely long word that no one will input a longer word for")
  const longestWord = words.reduce((accum, currentWord) => {
    if (currentWord.length > accum.length) return currentWord
    return accum
  }, "")
  let title = shortestWord[0].toUpperCase() + shortestWord.slice(1)
  let flag = true
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== shortestWord && words[i] !== longestWord) {
      if (flag) {
        title +=
          " " +
          words[i][0].toUpperCase() +
          words[i].slice(1, Math.floor(words[i].length / 2))
        flag = false
      } else {
        title += words[i].slice(Math.floor(words[i].length / 2))
      }
    }
    if (i === words.length - 1)
      title += " " + words[i][0].toUpperCase() + words[i].slice(1)
  }
  return title
}
export function createPoem(textObj) {
  const textArr = convertObjToArr(textObj)
  const shortWords = grabShortWords(textArr)
  const longerWords = grabLongerWords(textArr)
  const title = createTitle(textObj)
  const max = shortWords.length > longerWords.length ? shortWords : longerWords
  const min = shortWords.length < longerWords.length ? shortWords : longerWords
  const poemLength = Math.floor(max.length / 2)
  let poem = title + "\n\n"

  let i = 0,
    j = 0
  if (min === shortWords) {
    for (; i < poemLength; i++) {
      if (min.length === i) j = 0
      // longerWords should be twice in a row only right before the new line
      if (i % 3 === 0) {
        poem +=
          shortWords[j] + " " + longerWords[i] + " " + longerWords[i + 1] + "\n"
        i++
      } else {
        poem += shortWords[j] + " " + longerWords[i] + " "
        j++
      }
    }
  } else {
    for (; i < poemLength; i++) {
      if (min.length === i) j = 0

      if (i % 3 === 0) {
        poem +=
          shortWords[j] + " " + longerWords[j] + " " + longerWords[j + 1] + "\n"
        j += 2
      } else {
        poem += shortWords[i] + " " + longerWords[j] + " "
        j++
      }
    }
  }
  return poem
}
