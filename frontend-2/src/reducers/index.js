import { combineReducers } from 'redux'
import user from './userReducer'

const rootReducer = combineReducers({
  userData: user,
})

export default rootReducer