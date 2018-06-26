import { combineReducers } from 'redux'
import NASAReducer from './NASAReducer'
import CooperHewittReducer from './CooperHewittReducer'
import WordReducer from './WordReducer'

export default combineReducers({
  NASAReducer,
  CooperHewittReducer,
  WordReducer
})
