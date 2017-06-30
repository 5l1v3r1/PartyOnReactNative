import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

const CalendarPicker = require('../../../calendar-picker/calendar-picker.js');
const Dimensions = require('Dimensions').get('window');
const strings = require('../../../../strings/strings');

module.exports = React.createClass({
  getInitialState() {
    return {
      date: new Date(),
    };
  },

  onDateChange(date) {
    //this.setState({date: date});
    this.props.onDateChange(date);
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image
              source={require('../../../../resources/date-icon@2x.png')}
              style={styles.icon}
              />
            <Text style={styles.titleText}>{strings.date}</Text>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <CalendarPicker
              selectedDate={this.props.date}
              onDateChange={this.onDateChange}
              screenWidth={Dimensions.width}
              selectedBackgroundColor={'#FF0055'}
              />
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topView: {
    flex: 1,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9B9B9B',
  },
  bottomWrapper: {
    flex: 5,
  }
});
