import { findDeep, createPoem } from "../utilities";

const USER_INPUTTED_WORDS = "USER_INPUTTED_WORDS";
const RANDOM_WORD = "RANDOM_WORD";
const REMOVE_POEM = "REMOVE_POEM";

const defaultWords = {
  crab: { word: "crab", definition: "a quarrelsome grouch" },
  coconut: {
    word: "coconut",
    definition:
      "tall palm tree bearing coconuts as fruits; widely planted throughout the tropics",
  },
  elephant: { word: "elephant", definition: "five-toed pachyderm" },
  extraneous: {
    word: "extraneous",
    definition:
      "not belonging to that in which it is contained; introduced from an outside source",
  },
  radioactive: {
    word: "radioactive",
    definition: "exhibiting or caused by radioactivity",
  },
};

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
    list: ["quant", "um", "leap"],
  },
};

function fetchUserWords(words) {
  return fetch("/api/words/words", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({ words }),
  });
}
function fetchRandomWord() {
  return fetch("/api/words/random");
}

function userWords(data) {
  return {
    type: USER_INPUTTED_WORDS,
    poem: data.poem,
  };
}

function randomWord(data) {
  return {
    type: RANDOM_WORD,
    randomWord: {
      word: data.word,
      definition: findDeep(data, ["results", 0, "definition"], undefined),
      example: findDeep(data, ["results", 0, "examples", 0], undefined),
      syllables: findDeep(data, ["syllables", "list"], undefined),
    },
  };
}
function removeThePoem() {
  return {
    type: REMOVE_POEM,
    poem: undefined,
  };
}
export function removePoem(data) {
  return function (dispatch) {
    return dispatch(removeThePoem());
  };
}
export function getUserWords(words) {
  return function (dispatch) {
    return (
      fetchUserWords(words)
        .then((response) => response.json())
        .then((json) => dispatch(userWords(json))),
      (error) => dispatch(userWords(defaultWords))
    );
  };
}
export function getRandomWord() {
  return function (dispatch) {
    return (
      fetchRandomWord()
        .then((response) => response.json())
        .then((json) => dispatch(randomWord(json))),
      (error) => dispatch(randomWord(randomWordDefault))
    );
  };
}

const initialState = {
  userWords: undefined,
  randomWord: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RANDOM_WORD:
      return Object.assign({}, state, {
        randomWord: action.randomWord,
      });
    case USER_INPUTTED_WORDS:
      return Object.assign({}, state, {
        poem: action.poem,
      });
    case REMOVE_POEM:
      return Object.assign({}, state, {
        poem: action.poem,
      });
    default:
      return state;
  }
};
