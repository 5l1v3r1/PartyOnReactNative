import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder
} from 'react-native';

import {
  MKRangeSlider,
  setTheme,
  MKSlider,
  MKColor
} from 'react-native-material-kit';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const strings = require('../../../../strings/strings');

module.exports = React.createClass({

  getInitialState() {
    return {
      defaultMin: this.props.defaultMin,
      defaultMax: this.props.defaultMax,
      currentMin: this.props.defaultMin,
      currentMax: this.props.defaultMax
    };
  },

  componentWillMount() {
    // this._panResponder = PanResponder.create({
    //   onMoveShouldSetResponderCapture: () => true,
    //   onMoveShouldSetPanResponderCapture: () => true,
    //
    //   onPanResponderGrant: (e, gestureState) => {
    //     this.props.onTouch();
    //   },
    //
    //   onPanResponderRelease: (e, {vx, vy}) => {
    //     this.props.onRelease();
    //   }
    // });
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          {this.renderText()}
          <MKRangeSlider
            ref="rangeSlider"
            style={{width: SCREEN_WIDTH - 10}}
            min={this.props.title === strings.age ? 18 : 16}
            max={this.props.title === strings.age ? 50 : 29}
            minValue={this.state.currentMin}
            maxValue={this.state.currentMax}
            onChange={(data) => this.onChange(data)}
            step={1}
            thumbRadius={12}
            lowerTrackColor={'#ff0055'}
            />
        </View>
      </View>
    );
  },


  onChange(data) {
    values = [Math.round(data.min), Math.round(data.max)];

    this.setState({
      currentMin: values[0],
      currentMax: values[1]
    });
    this.props.onChange(values);
  },

  convertRangeToTime(value) {
    if (value > 23) {
      return `0${value - 24}:00`;
    } else {
      return `${value}:00`;
    }
  },

  renderText() {
    if (this.props.title === strings.age) {
      return (
        <Text>
          {`${this.state.currentMin} - ${this.state.currentMax} ${strings.years}`}
        </Text>
      );
    } else {
      return (
        <Text>
          {`${this.convertRangeToTime(this.state.currentMin)} - ${this.convertRangeToTime(this.state.currentMax)}`}
        </Text>
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginBottom: 10,
  },
  topView: {
    flex: 1,
  },
  titleView: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 10,
    width: 10,
    marginRight: 5,
    borderRadius: 7.5,
    backgroundColor: 'gray'
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9B9B9B',
  },
  bottomWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
