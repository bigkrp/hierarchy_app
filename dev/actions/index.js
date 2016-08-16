import { findIndex } from 'lodash';

/**
 * Actions query
 */
export const GET_DATA = 'GET_DATA';
export const SHOW_LEAF = 'SHOW_LEAF';
/**
 * End Actions query
 */

/**
 * If treeHierarchy cached in localStorage we take it from there
 * @return {Function} - dispatch data
 */
export const fetchDataIfNeeded = () => {
  return (dispatch) => {
    if (localStorage.getItem('treeHierarchy')) {
      const treeHierarchy = JSON.parse(localStorage.getItem('treeHierarchy'));
      dispatch(receiveData(treeHierarchy));
    } else {
      dispatch(fetchData());
    }
  };
};

/**
 * Aciton for show leafs
 * @type {string} node - query, for what node we will search leafs
 * @return {Array} - array with leafs values
 */
export const showLeafs = (node) => {
  return (dispatch, getState) => {
    dispatch(getLeafs(node, getState().hierarchyApp));
  };
};

/* ------------------------- */
/* -------- Helpers -------- */
/* ------------------------- */

/**
 * Simple fetch data and dispatch it
 * @return {Promise} - fetched and parsed data
 */
const fetchData = () => {
  return dispatch => {
    return fetch('./data.json')
      .then(response => response.json())
      .then(json => dispatch(makeData(json)));
  };
};

/**
 * Prettify data for our state in treeView
 * @param  {Array} json - collection with parent:child objects
 * @return {Object}      Object for dispatch
 */
const makeData = (json) => {
  const treeHierarchy = makeTree(makeFlatList(json));
  localStorage.setItem('treeHierarchy', JSON.stringify(treeHierarchy));

  return receiveData(treeHierarchy);
};

/**
 * Simple format our data for reducer
 * @param  {Object} treeHierarchy - formated data in tree view
 * @return {Object}
 */
const receiveData = (treeHierarchy) => {
  return {
    type: GET_DATA,
    treeHierarchy: treeHierarchy
  };
};


/**
 * Parse oure parent:child data into convenient representation
 * with element id and parent id
 * @param  {Array} json - collection
 * @return {Array}      result
 */
const makeFlatList = (json) => {
  const result = [];

  json.forEach((val, topIndex) => {
    const parentName = getKey(val);
    const parentIndex = findIndex(result, {name: parentName});
    const childName = getValByKey(val);

    if (parentIndex === -1) {
      result.push({
        id: topIndex,
        name: parentName,
        parent: null,
        children: []
      });
      result.push({
        id: topIndex + 1,
        name: childName,
        parent: topIndex,
        children: []
      });
    } else {
      result.push({
        id: topIndex + 1,
        name: childName,
        parent: parentIndex,
        children: []
      });
    }
  });

  return result;
};

/**
 * Make tree view for our representation
 * @param  {Array} flatList - flat list array
 *                            with element id and parent id
 *                            and children array
 * @return {Object}
 */
const makeTree = (flatList) => {
  let parsedData = [];
  parsedData.push(flatList.shift(flatList));

  flatList.forEach((val) => {
    parsedData[val.id] = val;
    parsedData[val.parent].children.push(parsedData[val.id]);
  });

  return parsedData[0];
};

/**
 * Get leafs for curent node query
 * @param  {string} node          - query for search
 * @param  {Object} treeHierarchy - tree view for our data
 * @return {Object}               - object for dispatch
 */
const getLeafs = (node, treeHierarchy) => {
  const nodeObj = findLeafs(node, treeHierarchy);
  let leafs;

  if (nodeObj === null) {
    leafs = [];
  } else{
    leafs = getListOfLeafs(nodeObj, []);
  }

  return {
    type: SHOW_LEAF,
    leafs: leafs
  };
};

/**
 * Find node name and return object with data for curent name
 * @param  {string} name - node
 * @param  {Object} data - tree view for our data
 * @return {Object}
 */
const findLeafs = (name, data) => {
  let tmpData = data.children;
  let neededData = null;
  let dataName = data.name;

  const findDataObj = (data) => {
    data.forEach((val) => {
      dataName = val.name;

      if (dataName === name) {
        neededData = val;
      } else if (val.children.length) {
        findDataObj(val.children);
      }
    });
  };

  if (name === dataName) {
    neededData = data;
  } else {
    findDataObj(tmpData);
  }

  return neededData;
};

/**
 * Get list for curent data that selected for node query
 * @param  {Object} data
 * @param  {Array} leafs - result array that will returned
 * @return {Array}
 */
const getListOfLeafs = (data, leafs) => {
  if (!data.children.length) {
    leafs.push(data.name);
  }

  data.children.forEach((val) => {
    getListOfLeafs(val, leafs);
  });

  return leafs;
};
/**
 * Get first key of object
 * @param  {Object} obj
 * @return {string}
 */
const getKey = (obj) => Object.keys(obj)[0];

/**
 * Get value for first key, use getKey method
 * @param  {Object} obj
 * @return {string}
 */
const getValByKey = obj => obj[getKey(obj)];

/* ----------------------------- */
/* -------- End Helpers -------- */
/* ----------------------------- */
