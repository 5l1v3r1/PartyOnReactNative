import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View
} from 'react-native';

module.exports = React.createClass({
  render() {
    if (this.props.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator
            style={{flex: 1}}
            size='large'
            color='white'/>
        </View>
      );
    }

    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
        >
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0055',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  }
});
