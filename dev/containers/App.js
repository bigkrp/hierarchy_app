import React, {PropTypes} from 'react';
import { fetchDataIfNeeded } from '../actions';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded())
  }

  render() {
    return (<div>MyComponent</div>);
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
