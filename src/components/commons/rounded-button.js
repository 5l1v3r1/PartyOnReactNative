import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Text
} from 'react-native';

module.exports = React.createClass({
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.props.accepted) {
            this.props.onPress()
          }
        }}
        underlayColor={'#FF0859'}
        style={this.props.accepted ? styles.buttonAccepted : styles.button}>
        <Text
          style={this.props.accepted ? styles.textAccepted : styles.text}>
          {this.props.accepted ? 'GODTATT' : this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF0859',
    backgroundColor: 'white'
  },
  buttonAccepted: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 5,
    backgroundColor: '#2ecc71'
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.19,
    color: '#FF0055'
  },
  textAccepted: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.19,
    color: 'white'
  }
});
