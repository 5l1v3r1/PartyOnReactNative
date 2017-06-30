import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

const strings = require('../../../../strings/strings');

class AgeRow extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            {/* <Image
              source={require('../../../../resources/sex-icon-gray@2x.png')}
              style={styles.icon}></Image> */}
            <Text style={styles.titleText}>{strings.age}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.text}>{`${this.props.ageFrom} ${strings.to} ${this.props.ageTo} ${strings.years}`}</Text>
        </View>
      </View>
    );
  }
}

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
    paddingLeft: 25,
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    paddingRight: 5,
    fontSize: 18,
    color: '#4A4A4A',
    fontWeight: '500'
  }
});

module.exports = AgeRow;
