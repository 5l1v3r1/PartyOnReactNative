import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

module.exports = React.createClass({
  render() {
    return(
      <View style={styles.wrapper}>
        <Text style={styles.text}>Filter</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  text: {
    color: 'white'
  }
});
