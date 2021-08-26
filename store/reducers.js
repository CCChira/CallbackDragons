import {combineReducers} from 'redux';
import * as types from './types';

// COUNTER REDUCER
const counterReducer = (state = 0, {type}) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;
    default:
      return state;
  }
};

const searchbarReducer = (state = {queryString: ''}, {type, payload}) => {
  switch (type) {
    case types.SET_QUERY_STRING:
      return {
        queryString: payload
      };
    default:
      return state;
  }
};

const setLoginReducer = (state = {userName: ''}, {type, payload})  => {
  switch(type) {
    case types.SET_LOGIN_USER:
      return {
        userName: payload
      };
    default:
      return state;
  }
}

const fileLocationReducer = (state = [], {type, payload}) => {
  switch (type) {
    case "SET_FILE_STACK":
      return payload
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  searchbar: searchbarReducer,
  setLoginUser: setLoginReducer,
  fileLocation: fileLocationReducer,
};

export default combineReducers(reducers);
