import React, {PropTypes} from 'react';
import { fetchDataIfNeeded } from '../actions';
import { connect } from 'react-redux';
import NodeSearch from '../components/NodeSearch';
import LeafList from '../components/LeafList';

/**
 * App - main app Container
 * @extends React.Component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded());
  }

  render() {
    return (
      <section className='wrapper'>
        <NodeSearch />
        <LeafList />
      </section>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);
