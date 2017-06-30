import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import devTools from 'remote-redux-devtools';
var reducers = require('../reducers');

//const createPartyOnStore = applyMiddleware(thunk)(createStore);
const enhancer = compose(
  applyMiddleware(thunk),
  devTools()
);

function configureStore(onComplete: ?() => void) {
  return createStore(reducers, enhancer);
}

module.exports = configureStore;
