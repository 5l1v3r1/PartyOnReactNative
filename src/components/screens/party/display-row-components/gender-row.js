import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Image
} from 'react-native';

const strings = require('../../../../strings/strings');

const GenderRow = React.createClass({
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image
              source={require('../../../../resources/sex-icon-gray@2x.png')}
              style={styles.icon}></Image>
            <Text style={styles.titleText}>{strings.gender}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          {this.renderGenderIcon()}
        </View>
      </View>
    );
  },

  renderGenderIcon() {
    switch (this.props.gender) {
      case 'both':
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{`${strings.lookingFor} ${strings.lookingForBoth}`}</Text>
            <Image style={{marginTop: 5}} source={require('../../../../resources/sex-icon@2x.png')}/>
          </View>
        );
        break;
      case 'girls':
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{`${strings.lookingFor} ${strings.girls}`}</Text>
            <Image style={{marginTop: 5}} source={require('../../../../resources/woman-symbol@2x.png')}/>
          </View>
        );
        break;
      case 'guys':
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>{`${strings.lookingFor} ${strings.boys}`}</Text>
            <Image style={{marginTop: 5}} source={require('../../../../resources/man-symbol@2x.png')}/>
          </View>
        );
        break;
    }
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
    paddingLeft: 25,
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    marginRight: 5,
    fontSize: 18,
    color: '#4A4A4A',
    fontWeight: '500'
  }
});

module.exports = GenderRow;
