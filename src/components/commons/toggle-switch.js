import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const { connect } = require('react-redux');

var ToggleSwitch = React.createClass({

  render() {
    switch (this.props.toggle) {
      case 'statuser':
        return(
          <View style={styles.wrapper} onPress={this.onTogglePress}>
            <View style={styles.toggleWrapper}>
              <View style={[styles.toggleCircle, styles.topCircle]}></View>
              <View style={[styles.toggleCircle, styles.botCircle]}></View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onTogglePress}>
              <Text style={styles.text}>Statuser</Text>
            </TouchableOpacity>
          </View>
        );
        break;
      case 'fester':
        return(
          <View style={styles.wrapper}>
            <View style={styles.toggleWrapper}>
              <View style={[styles.toggleCircle, styles.botCircle]}></View>
              <View style={[styles.toggleCircle, styles.topCircle]}></View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onTogglePress}>
              <Text style={styles.text}>Fester</Text>
            </TouchableOpacity>
          </View>
        );
        break;
    }
  },

  onTogglePress() {
    this.props.onPress();
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleWrapper: {
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 10,
  },
  toggleCircle: {
    height: 5,
    margin: 1,
    width: 5,
    borderRadius: 50,
  },
  topCircle: {
    backgroundColor: '#FF0859'
  },
  botCircle: {
    backgroundColor: '#9E005D'
  },
  button: {
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: '#FF0859'
  }
});

function select(store) {
  return {
    toggle: store.navigation.toggle
  }
}

module.exports = connect(select)(ToggleSwitch);
