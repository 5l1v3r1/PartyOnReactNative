import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

module.exports = React.createClass({
  render() {
    return(
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.imageWrapper}
        onPress={this.props.onPress}
        >
        {this.renderArrow()}
      </TouchableOpacity>
    );
  },

  renderArrow() {
    if (this.props.color === 'white') {
      return <Image
        source={require('../../resources/Back_Arrow_White@2x.png')}
        />
    } else {
      return <Image
        source={require('../../resources/Back_Arrow_Purple@2x.png')}
        />
    }
  }
});

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  }
});
