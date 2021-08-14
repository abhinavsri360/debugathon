import * as ActionTypes from './ActionType'
import { baseUrl } from '../shared/baseUrl'
import { success, error } from '../utilities/toast'

const axios = require('axios')

export const requestLogin = () => {
    return {
      type: ActionTypes.LOGIN_REQUEST
    }
}

export const receiveLogin = (userId, code, level, time) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    userId: userId,
    code: code,
    level: level,
    time: time
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin())

  axios.post(baseUrl + 'login-auth', {
    userId: creds.userId
  })
  .then((res) => {
    if (res.statusText === 'OK') {
      success('Welcome to de-bug-athon')
      dispatch(receiveLogin(creds.userId, res.data.code, res.data.level, res.data.time))
    }
  })
  .catch((err) => {
    error('Wrong user Id entered')
    console.log(err);
    dispatch(loginError(err.message))
  })
}

export const requestCompile = () => {
  return {
    type: ActionTypes.COMPILE_REQUEST
  }
}

export const compileSuccess = (code, level, time) => {
  return {
    type: ActionTypes.COMPILE_SUCCESS,
    level: level,
    time: time,
    code: code
  }
}

export const compileFailure = (err) => {
  return {
    type: ActionTypes.COMPILE_FAILURE,
    err: err
  }
}

export const compileCode = (creds) => (dispatch) => {
  dispatch(requestCompile())

  axios.post(baseUrl + 'compile', {
    userId: creds.userId,
    code: creds.code,
    language: creds.language
  })
  .then((res) => {
    console.log(res)
    if (res.status === 200) {
      if (res.data.message === 'success') {
        success('Code successfully compiled')
        dispatch(compileSuccess(res.data.code, res.data.level, res.data.time))
      } else if (res.data.message === 'win') {
        success('Congratulations! You\'ve reached the end')
        dispatch(compileSuccess(res.data.code, res.data.level, res.data.time))
      } else if (res.data.message === 'lose') {
        error('Output not matching')
        dispatch(compileSuccess(res.data.code, res.data.level, res.data.time))
      }
    } else {
      dispatch(compileFailure('Server Error'))
    }
  })
  .catch((err) => {
    console.log(err);
    dispatch(compileFailure('Server Error'))
  })
}
