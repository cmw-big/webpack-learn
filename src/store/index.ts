import { bindActionCreators, createStore } from 'redux'

import { nanoid } from 'nanoid'
import rootReducer from '@/store/reducer'
import {
  createAddUserAction,
  createDeleteUserAction,
  createUpdateUserAction
} from './actions/usersAction'

const store = createStore(rootReducer)

const bindUserAction = bindActionCreators(
  { createAddUserAction, createDeleteUserAction, createUpdateUserAction },
  store.dispatch
)
const unListen = store.subscribe(() => {
  console.log(store.getState())
})

bindUserAction.createAddUserAction({ id: nanoid(), name: 'John', age: 30 })
unListen()
bindUserAction.createAddUserAction({ id: nanoid(), name: 'John', age: 30 })

export default store
