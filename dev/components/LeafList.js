import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

/**
 * Simple list-element component
 * @param {Object} props
 */
const Leaf = (props) =>
  <li>{props.leaf}</li>;
Leaf.propTypes = {
  leaf: PropTypes.string
};

/**
 * List of leaf component
 * @param {Object} props
 */
const LeafList = (props) => {
  const { leafs } = props;
  return (
    <ul className='search__result-list'>
      {
      (leafs.length) ?
        leafs.map((leaf, index) => <Leaf key={index} leaf={leaf} />) :
        'No result'
      }
    </ul>
  );
};
LeafList.propTypes = {
  leafs: PropTypes.array.isRequired
};
const mapStateToProps = (
  state
) => {
  return {
    leafs: state.leafs
  };
};

export default connect(
  mapStateToProps
)(LeafList);
