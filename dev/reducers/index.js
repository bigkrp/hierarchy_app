import { combineReducers } from 'redux';
import { GET_DATA, SHOW_LEAF } from '../actions';

const hierarchyApp = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({}, state, action.treeHierarchy);
    default:
      return state;
  }
};

const leafs = (state = [], action) => {
  switch (action.type) {
    case SHOW_LEAF:
      return action.leafs;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  hierarchyApp,
  leafs
});
// const rootReducer = hierarchyApp;

export default rootReducer;
