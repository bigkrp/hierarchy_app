import { combineReducers } from 'redux';
import { GET_DATA, SHOW_LEAF } from '../actions';

/**
 * Main reducer for data
 * @param  {Object} [state={}] - redux state object with tree view data
 * @param  {Object} action     - redux action object
 * @return {Object}            - state
 */
const hierarchyApp = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({}, state, action.treeHierarchy);
    default:
      return state;
  }
};

/**
 * Leaf list reducer
 * @param  {Array}  [state=[]] - list of leafs
 * @param  {Object} action     - redux action
 * @return {Array}
 */
const leafs = (state = [], action) => {
  switch (action.type) {
    case SHOW_LEAF:
      return action.leafs;
    default:
      return state;
  }
};

/**
 * Result combined reducer
 * @type {[type]}
 */
const rootReducer = combineReducers({
  hierarchyApp,
  leafs
});

export default rootReducer;
