import React from 'react';
import {
  ListView,
  View,
  Text,
  StyleSheet
} from 'react-native';

var MyParty = React.createClass({
  render() {
    return(
      <View style={styles.container}>

      </View>
    );
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  }
});


module.exports = MyParty
