import React from 'react';
import {
  View,
  StyleSheet,
  SegmentedControlIOS,
  Text,
  Platform,
  Dimensions,
  Image
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
const strings = require('../../../../strings/strings');
//import AndroidSegmented from 'react-native-segmented-android';
import { SegmentedControls } from 'react-native-radio-buttons';

module.exports = React.createClass({

  getInitialState() {
    return {
      androidIndex: this.checkDefaultValue(this.props.defaultValue)
    }
  },

  onSegmentChange(event) {
    let sexValue;
    switch (event.nativeEvent.selectedSegmentIndex) {
      case 0:
        sexValue = 'girls';
        break;
      case 1:
        sexValue = 'guys';
        break;
      case 2:
        sexValue = 'both';
        break;
    }
    this.props.onChange(sexValue);
  },

  onSegmentChangeAndroid(value) {
    let sexValue;
    switch (value.value) {
      case 0:
        sexValue = 'girls';
        break;
      case 1:
        sexValue = 'guys';
        break;
      case 2:
        sexValue = 'both';
        break;
    }
    this.setState({
      androidIndex: value.value
    });
    this.props.onChange(sexValue);
  },

  checkDefaultValue(defaultValue) {
    switch (defaultValue) {
      case 'girls':
        return 0;
      case 'guys':
        return 1
      case 'both':
        return 2
    }
  },

  getOptions() {
    return [
      {
        label: strings.girls,
        value: 0,
      },
      {
        label: strings.boys,
        value: 1,
      },
      {
        label: strings.both,
        value: 2,
      }
    ]
  },

  renderSegmentControl() {
    if (Platform.OS === 'android') {
      return <SegmentedControls
          tint= {'#ff0055'}
          selectedTint= {'white'}
          backTint= {'white'}
          optionContainerStyle={{
            flex: 1
          }}
          options={this.getOptions()}
          optionStyle= {{
            fontSize: 12,
          }}
          containerStyle={{
            marginLeft: 10,
            marginRight: 10,
            borderWidth: 1
          }}
          extractText={(option) => option.label}
          onSelection={(selected) => this.onSegmentChangeAndroid(selected)}
          selectedIndex={this.state.androidIndex}
        />
    } else {
      return (
        <SegmentedControlIOS
          tintColor={'#FF0055'}
          values={[strings.girls, strings.boys, strings.both]}
          selectedIndex={this.checkDefaultValue(this.props.defaultValue)}
          onChange={(event) => this.onSegmentChange(event)} />
      );
    }

  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image style={styles.icon} source={require('../../../../resources/sex-icon-gray@2x.png')} />
            {this.renderTitle()}
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          {this.renderSegmentControl()}
        </View>
      </View>
    );
  },

  renderTitle() {
    if (this.props.isMissing) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.titleText}>{this.props.text}</Text>
          <Text style={styles.errorText}>{strings.missingGender}</Text>
        </View>
      );
    } else {
      return (
        <Text style={styles.titleText}>{this.props.text}</Text>
      );
    }
  }

});

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
  },
  topView: {
    flex: 2,
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
    flex: 1
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    fontStyle: 'italic'
  }
});
