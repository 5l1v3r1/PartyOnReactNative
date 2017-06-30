import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';

module.exports = React.createClass({
  render(){
    if (this.props.isLoading) {
      return (
        <View style={styles.joinButton}>
          <ActivityIndicator
            color={'#FF0055'}
            size={'small'}
            />
        </View>
      );
    }

    return (
    <TouchableOpacity
      style={[styles.joinButton, this.props.attending ? {backgroundColor: '#2ecc71'} : {backgroundColor: '#ff0055'}]}
      onPress={this.props.onPress}>
      <Text style={styles.buttonText}>{this.props.buttonText}</Text>
    </TouchableOpacity>
    );
  },

});

const styles = StyleSheet.create({
  joinButton: {
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold'
  },
});
