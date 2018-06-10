import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import rootReducer from "./modules"

export const history = createHistory()

const initialState = {}

const middleware = composeWithDevTools(
  applyMiddleware(thunk, createLogger({ collapsed: true }))
)

export default createStore(rootReducer, initialState, middleware)
