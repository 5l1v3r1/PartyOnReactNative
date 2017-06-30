const PartyOnApp = require('./PartyOnApp');

import React, { Component, PropTypes } from 'react';
const { Provider } = require('react-redux');
import ActionSheet from '@exponent/react-native-action-sheet'
var configureStore = require('./store/configureStore');
const strings = require('./strings/strings');

function setup(): React.Component {

  console.log('Setting up react-app');

  class Root extends React.Component {

    static childContextTypes = {
      actionSheet: PropTypes.func,
    };

    constructor() {
      super();
      this.state = {
        isLoading: false,
        // TODO Callback from configureStore for persistStore etc
        store: configureStore(),
      };
    }

    getChildContext() {
      return {
        actionSheet: () => this._actionSheetRef,
      };
    }

    componentWillMount() {

    }

    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <ActionSheet ref={component => this._actionSheetRef = component}>
          <Provider store={this.state.store}>
            <PartyOnApp/>
          </Provider>
        </ActionSheet>
      );
    }
  }

  return Root;
}


module.exports = setup;
