import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

module.exports = React.createClass({
  renderColor() {
    if (this.props.color === 'white') {
      return {
        color: 'white'
      };
    } else {
      return {
        color: 'gray'
      };
    }
  },

  renderBackgroundColor() {
    if (this.props.color === 'white') {
      return {
        backgroundColor: 'white'
      };
    } else {
      return {
        backgroundColor: 'gray'
      };
    }
  },

  setIcon() {
    if (this.props.color === 'white') {
      return require('../../resources/geo@2x.png');
    } else {
      return require('../../resources/Pin@2x.png');
    }
  },

  render() {
    return(
      <View style={[styles.container]}>
        <Image
          source={this.setIcon()}
          style={styles.icon}
          />
        <Text style={[styles.text, this.renderColor()]}>{this.props.text}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    letterSpacing: 0.08,
    fontWeight: '500'
  }
});
