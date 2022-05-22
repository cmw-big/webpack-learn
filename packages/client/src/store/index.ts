import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '@/store/reducer'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

// then run the saga
sagaMiddleware.run(mySaga)

export type StoreType = ReturnType<typeof store.getState>
export default store
