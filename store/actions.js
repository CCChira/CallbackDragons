import * as types from './types'

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT })

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT })

// RESET COUNTER
export const resetCount = () => ({ type: types.RESET })

// SET USERS
export const setUsers = (userList) => ({ type: types.SET_USERS, payload: userList})

export const setQueryString = (string) => ({type: types.SET_QUERY_STRING, payload: string})
