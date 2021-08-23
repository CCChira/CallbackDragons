import { combineReducers } from "redux";
import * as types from "./types";

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
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

const githubReducer = (state = { users: [], query_string: 'haha' }, { type, payload }) => {
    switch(type){
        case types.SET_USERS:
            return {
                ...state,
                users: payload
            }
        case types.SET_QUERY_STRING:
            return {
                ...state,
                query_string: payload
            }
        default:
            return state
    }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
};

export default combineReducers(reducers);
