import { findDeep } from "../utilities"

const USER_INPUTTED_WORDS = "USER_INPUTTED_WORDS"
const RANDOM_WORD = "RANDOM_WORD"

const defaultWords = {
  word: "quantum leap",
  results: [
    {
      definition: "a sudden large increase or advance",
      examples: [
        "this may not insure success but it will represent a quantum leap from last summer",
      ],
    },
  ],
}

const randomWordDefault = {
  word: "quantum leap",
  results: [
    {
      definition: "a sudden large increase or advance",
      examples: [
        "this may not insure success but it will represent a quantum leap from last summer",
      ],
    },
  ],
  syllables: {
    list: ["quant", "um", "leap"]
  }
}

function fetchUserWords(words) {
  console.log(words)
  return fetch(`/api/words/${words}`)
}
function fetchRandomWord() {
  return fetch(`/api/words/random/word`)
}

function userWords(data) {
  console.log(data)
  return {
    type: USER_INPUTTED_WORDS,
    userWords: {
      definition: data.definition,
    },
  }
}
function randomWord(data) {
  console.log(data)
  return {
    type: RANDOM_WORD,
    randomWord: {
      word: data.word,
      definition: findDeep(data, ["results", 0, "definition"], undefined),
      example: findDeep(data, ["results", 0, "examples", 0], undefined),
      syllables: findDeep(data, ["syllables", "list"], undefined),
    },
  }
}
export function getUserWords(words) {
  console.log(words)
  return function(dispatch) {
    return (
      fetchUserWords(words)
        .then(response => response.json())
        .then(json => console.log(json)),
      error => dispatch(userWords(defaultWords))
    )
  }
}
export function getRandomWord() {
  return function(dispatch) {
    return (
      // fetchRandomWord()
      //   .then(response => response.json())
      //   .then(json => dispatch(randomWord(json))),
      // error => 
      dispatch(randomWord(randomWordDefault))
    )
  }
}

const initialState = {
  userWords: undefined,
  randomWord: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RANDOM_WORD:
      return Object.assign({}, state, {
        randomWord: action.randomWord,
      })
    case USER_INPUTTED_WORDS:
      return Object.assign({}, state, {
        userWords: action.userWords,
      })
    default:
      return state
  }
}
