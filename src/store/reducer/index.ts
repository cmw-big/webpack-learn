import { combineReducers } from 'redux'
import userReducer from '@/store/reducer/userReducer'

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer
