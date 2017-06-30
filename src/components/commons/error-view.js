import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const strings = require('../../strings/strings');

let ErrorView = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
        {strings.noInternetConnection}
        </Text>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12
  }
});

module.exports = ErrorView;
