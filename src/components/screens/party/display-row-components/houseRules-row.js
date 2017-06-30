import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

const strings = require('../../../../strings/strings');

module.exports = React.createClass({
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image
              source={require('../../../../resources/hammer@2x.png')}
              style={styles.icon}></Image>
            <Text style={styles.titleText}>{strings.houserules}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.text}>{this.props.rules}</Text>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  topView: {
    flex: 2,
  },
  titleView: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  profilePic: {
    marginRight: 5
  },
  titleText: {
    fontSize: 12,
    color: '#9B9B9B',
    fontWeight: '500'
  },
  bottomView: {
    flex: 4,
    paddingLeft: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingRight: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    paddingRight: 20,
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500'
  }
});
