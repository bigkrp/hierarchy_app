import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';

/**
 * Configurate store
 */
export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}
