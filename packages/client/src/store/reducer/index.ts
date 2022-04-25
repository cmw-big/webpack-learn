import { combineReducers } from 'redux'
import userReducer from '@/store/reducer/userReducer'
import studentsReducer from './studentsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  student: studentsReducer
})

export default rootReducer
