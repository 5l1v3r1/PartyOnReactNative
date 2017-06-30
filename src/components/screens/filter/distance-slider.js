import React, {Component} from 'React';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Slider
} from 'react-native';

import {
  MKSlider
} from 'react-native-material-kit';

const SCREEN_WIDTH = require('Dimensions').get('window').width;

class DistanceSliderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: this.props.defaultValue
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
        <Text style={styles.distanceText}>{`${this.state.distance} km`}</Text>
          {this.renderSlider()}
        </View>
      </View>
    );
  }

  renderSlider() {
    if (Platform.OS === 'ios') {
      return (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={this.state.distance}
          step={1}
          onValueChange={(value) => this.setState({distance: value})}
          onSlidingComplete={() => this.props.onSlidingComplete(this.state.distance)}
          minimumTrackTintColor={'#ff0055'}
          />
      );
    } else {
      return (
        <MKSlider
          min={1}
          max={100}
          style={{width: SCREEN_WIDTH - 20}}
          value={this.state.distance}
          lowerTrackColor={'#ff0055'}
          step={1}
          onChange={(value) => this.setState({distance: Math.round(value)})}
          onConfirm={() => this.props.onSlidingComplete(this.state.distance)}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginBottom: 10,
  },
  distanceText: {
    marginBottom: 25,
  },
  slider: {
    width: SCREEN_WIDTH - 20,
    height: 10,
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
})

module.exports = DistanceSliderRow;
