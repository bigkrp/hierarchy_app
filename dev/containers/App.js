import React, {PropTypes} from 'react';
import { fetchDataIfNeeded, showLeafs } from '../actions';
import { connect } from 'react-redux';

let NodeSearch = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(showLeafs(input.value));
        input.value = '';
      }}>Search</button>
    </div>
  );
};
// mapStateToTodoNodeSearch
NodeSearch = connect()(NodeSearch);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded())
  }

  render() {
    console.log();
    return (
      <div>
        <NodeSearch />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
