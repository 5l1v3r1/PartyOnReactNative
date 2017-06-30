import React from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';

module.exports = React.createClass({
  setImageSize() {
    if (this.props.size === 'small') {
      return {
        height: 30,
        width: 30,
        borderRadius: 15,
      };
    } else {
      return {
        height: 56,
        width: 56,
        borderRadius: 28,
      };
    }
  },

  render() {
    if (this.props.url) {
      return (
        <View style={[this.props.style, this.setImageSize()]}>
          <Image style={[styles.image, this.setImageSize()]}
            source={{uri: this.props.url}}
            />
        </View>
      );
    } else {
      return(
        <View style={[this.props.style, this.setImageSize()]}>
          <Image style={[styles.image, this.setImageSize()]}
            source={require('../../resources/selfie4.jpg')}
            />
        </View>
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {

  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});
