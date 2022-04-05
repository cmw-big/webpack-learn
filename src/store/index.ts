import { applyMiddleware, createStore } from 'redux'

import rootReducer from '@/store/reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { nanoid } from 'nanoid'
import {
  createAddUserAction,
  createFetchUserAction,
  createUpdateUserAction
} from './actions/usersAction'
import mySaga from './sagas/mySaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

// then run the saga
sagaMiddleware.run(mySaga)
store.dispatch(
  createFetchUserAction({
    id: nanoid(),
    name: 'test'
  })
)
store.dispatch(
  createAddUserAction({
    id: '1',
    name: 'test',
    age: 134
  })
)
store.dispatch(createUpdateUserAction('1', { name: '搜索树' }))
