import React, {PropTypes} from 'react';
import { showLeafs } from '../actions';
import { connect } from 'react-redux';

let NodeSearch = ({ dispatch }) => {
  let input;

  return (
    <div className='search'>
      <h1 className='search__title'>Enter search query</h1>
      <input className='search__input' ref={node => {
        input = node;
      }} />
      <button className='search__action' onClick={() => {
        dispatch(showLeafs(input.value));
        input.value = '';
      }}>Search</button>
    </div>
  );
};
NodeSearch.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NodeSearch);
