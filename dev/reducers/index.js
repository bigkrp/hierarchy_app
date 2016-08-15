import { combineReducers } from 'redux'
import { GET_DATA, SHOW_LEAF } from '../actions';

const hierarchyApp = (state = [], action) => {
  switch (action.type) {
    case GET_DATA:
      return [...state, action.data];
    default:
      return state;
  }
};

// const rootReducer = combineReducers(hierarchyApp);
const rootReducer = hierarchyApp;

export default rootReducer;
