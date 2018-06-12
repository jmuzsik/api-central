import {
  createStore,
  applyMiddleware
} from "redux"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"
import {
  composeWithDevTools
} from 'redux-devtools-extension'
import {
  createLogger
} from 'redux-logger'
import rootReducer from "./modules"

export const history = createHistory()

const initialState = {}
let store
if (process.env.REACT_APP_STAGE !== "production") {
  const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({
      collapsed: true
    }))
  )
  store = createStore(rootReducer, initialState, middleware)
} else {
  const middleware = composeWithDevTools(
    applyMiddleware(thunk)
  )
  store = createStore(rootReducer, initialState, middleware)
}

export default store
