import * as ActionTypes from './ActionType'

export const User = (state = {
  isLoading: true,
  errMess: null,
  valid: false,
  user: '',
  code: '',
  level: 0,
  time: 0,
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, errMess: null }

    case ActionTypes.LOGIN_SUCCESS: {
      return { ...state, isLoading: false, errMess: null, user: action.userId, code: action.code, level: action.level, time: action.time, valid: true }
    }

    case ActionTypes.LOGIN_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload }

    case ActionTypes.COMPILE_REQUEST:
      return { ...state, isLoading: true, errMess: null }

    case ActionTypes.COMPILE_SUCCESS:
      return { ...state, isLoading: false, level: action.level, time: action.time, code: action.code }
    
    case ActionTypes.COMPILE_FAILURE:
      return { ...state, isLoading: false, errMess: action.err }

    default:
      return state
  }
}
