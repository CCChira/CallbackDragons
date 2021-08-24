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

const searchbarReducer = (state = { queryString: 'haha' }, { type, payload }) => {
    switch(type){
        case types.SET_QUERY_STRING:
            return {
                ...state,
                queryString: payload
            }
        default:
            return state
    }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  searchbar: searchbarReducer
};

export default combineReducers(reducers);
