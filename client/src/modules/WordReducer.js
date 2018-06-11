const USER_INPUTTED_WORDS = "USER_INPUTTED_WORDS"
const RANDOM_WORD = "RANDOM_WORD"

const defaultWords = {
  type: USER_INPUTTED_WORDS,
  word: {
    word: "soliloquy",
    definition: "speech you make to yourself",
  },
}

const randomWordDefault = {
  type: RANDOM_WORD,
  randomWord: {
    word: "ventriloquist",
    definition: "a performer who projects the voice into a wooden dummy"
  }
}

function fetchUserWords(word) {
  return fetch(`/api/words${word}`)
}
function fetchRandomWord() {
  return fetch(`/api/words/random`)
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
      definition: data.definition,
    },
  }
}
export function getUserWords(words) {
  return function(dispatch) {
    return (
      fetchUserWords(words)
        .then(response => response.json())
        .then(json => dispatch(userWords(json))),
      error => dispatch(userWords(defaultWords))
    )
  }
}
export function getRandomWord() {
  return function(dispatch) {
    return (
      fetchUserWords()
        .then(response => response.json())
        .then(json => dispatch(randomWord(json))),
      error => dispatch(randomWord(randomWordDefault))
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
