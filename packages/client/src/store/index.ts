import { applyMiddleware, createStore } from 'redux'

import rootReducer from '@/store/reducer'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

// then run the saga
sagaMiddleware.run(mySaga)

export type StoreType = ReturnType<typeof store.getState>
export default store
