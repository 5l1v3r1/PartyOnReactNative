import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class EmptyRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'gray'
  }
});

module.exports = EmptyRow;
