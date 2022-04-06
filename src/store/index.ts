import { applyMiddleware, createStore } from 'redux'

import rootReducer from '@/store/reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { nanoid } from 'nanoid'
import { createFetchUserAction } from './actions/usersAction'
import mySaga from './sagas'
import { createGetAllStudentsAction } from './actions/students'

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
store.dispatch(createGetAllStudentsAction())
export type storeType = ReturnType<typeof store.getState>
export default store
