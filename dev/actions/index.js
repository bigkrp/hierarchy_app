import _ from 'lodash';

export const GET_DATA = 'GET_DATA';
export const SHOW_LEAF = 'SHOW_LEAF';

export const fetchDataIfNeeded = () => {
  return (dispatch) => {
    if (localStorage.getItem('hierarchyData')) {

    } else {
      dispatch(fetchData());
    }
  };
};

const fetchData = () => {
  return dispatch => {
    return fetch('./data.json')
      .then(response => response.json())
      .then(json => dispatch(receiveData(json)));
  };
};

const receiveData = (json) => {
  return {
    type: GET_DATA,
    data: json
  };
};

export const showLeafs = (node) => {
  // console.log('node', node);
  return (dispatch, getState) => {
    console.log(getState());
    return {
      type: SHOW_LEAF
    }
  };
};

// const data = fetch('./data.json')
//   .then(response => {
//     return response.json();
//   });

const leafs = [];
// let result = [];

data.then(json => {
  let parsedData = [];
  const flatList = makeFlatList(json);

  parsedData.push(flatList.shift(flatList));

  flatList.forEach((val) => {
    parsedData[val.id] = val;
    parsedData[val.parent].children.push(parsedData[val.id]);
  });

  parsedData = parsedData[0];

  // console.log('parsedData', parsedData);
  const node = findLeafs('Europe', parsedData);
  // console.log('node:', node);
  getListOfLeafs(node);
  // console.log(leafs);
});

const makeFlatList = (json) => {
  const result = [];

  json.forEach((val, topIndex) => {
    const parentName = getKey(val);
    const parentIndex = _.findIndex(result, {name: parentName});
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

const getListOfLeafs = (data) => {
  if (!data.children.length) {
    leafs.push(data.name);
  }

  data.children.forEach((val) => {
    getListOfLeafs(val);
  });
};

const getKey = (obj) => Object.keys(obj)[0];
const getValByKey = obj => obj[getKey(obj)];
