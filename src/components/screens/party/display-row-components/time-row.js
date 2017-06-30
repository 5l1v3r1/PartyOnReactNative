import React from 'react';
import {
  StyleSheet,
  View,
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
              source={require('../../../../resources/clock@2x.png')}
              style={styles.icon}></Image>
            <Text style={styles.titleText}>{strings.time}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.text}>{this.props.time}</Text>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    height: 60,
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
    paddingLeft: 25,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingRight: 10,
    flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    color: '#4A4A4A',
    fontWeight: '500'
  }
});
