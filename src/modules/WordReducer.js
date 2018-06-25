import { findDeep, createPoem } from "../utilities"

const USER_INPUTTED_WORDS = "USER_INPUTTED_WORDS"
const RANDOM_WORD = "RANDOM_WORD"

const defaultWords = {
  crab: { word: "crab", definition: "a quarrelsome grouch" },
  coconut: {
    word: "coconut",
    definition:
      "tall palm tree bearing coconuts as fruits; widely planted throughout the tropics"
  },
  elephant: { word: "elephant", definition: "five-toed pachyderm" },
  extraneous: {
    word: "extraneous",
    definition:
      "not belonging to that in which it is contained; introduced from an outside source"
  },
  radioactive: {
    word: "radioactive",
    definition: "exhibiting or caused by radioactivity"
  }
}

const randomWordDefault = {
  word: "quantum leap",
  results: [
    {
      definition: "a sudden large increase or advance",
      examples: [
        "this may not insure success but it will represent a quantum leap from last summer"
      ]
    }
  ],
  syllables: {
    list: ["quant", "um", "leap"]
  }
}

function fetchUserWords(words) {
  console.log(words)
  return fetch(
    `https://3few4kmu3i.execute-api.us-east-1.amazonaws.com/dev/api/words/poem/${words}`
  )
}
function fetchRandomWord() {
  return fetch(
    `https://3few4kmu3i.execute-api.us-east-1.amazonaws.com/dev/api/words/random/word`
  )
}

function userWords(data) {
  const poem = createPoem(data)
  console.log(poem)
  return {
    type: USER_INPUTTED_WORDS,
    poem: {
      poem
    }
  }
}

function randomWord(data) {
  return {
    type: RANDOM_WORD,
    randomWord: {
      word: data.word,
      definition: findDeep(data, ["results", 0, "definition"], undefined),
      example: findDeep(data, ["results", 0, "examples", 0], undefined),
      syllables: findDeep(data, ["syllables", "list"], undefined)
    }
  }
}
export function getUserWords(words) {
  return function(dispatch) {
    return (
      fetchUserWords(words)
        .then(response => response.json())
        .then(json => dispatch(userWords(json))),
      error =>  dispatch(userWords(defaultWords))
    )
  }
}
export function getRandomWord() {
  return function(dispatch) {
    return (
      fetchRandomWord()
        .then(response => response.json())
        .then(json => dispatch(randomWord(json))),
      error => dispatch(randomWord(randomWordDefault))
    )
  }
}

const initialState = {
  userWords: undefined,
  randomWord: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RANDOM_WORD:
      return Object.assign({}, state, {
        randomWord: action.randomWord
      })
    case USER_INPUTTED_WORDS:
      return Object.assign({}, state, {
        poem: action.poem
      })
    default:
      return state
  }
}
