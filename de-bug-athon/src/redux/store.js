import { User } from './user'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User
    }),
    applyMiddleware(thunk, logger)
  )
  return store
}