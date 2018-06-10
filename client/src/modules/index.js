import { combineReducers } from "redux"
import NASAReducer from "./NASAReducer"
import CooperHewittReducer from "./CooperHewittReducer"

export default combineReducers({
  NASAReducer,
  CooperHewittReducer,
})
