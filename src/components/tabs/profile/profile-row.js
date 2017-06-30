import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

module.exports = React.createClass({
  render() {
    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.leftWrapper}>
            {this.checkIconSize()}
          </View>

          <View style={styles.middleWrapper}>
            {this.renderText()}
          </View>

          <View style={styles.rightWrapper}>
            <Image source={require('../../../resources/next_calendar@2x.png')}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  },

  renderText() {
    if (this.props.notifications > 0) {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text}>{this.props.text}</Text>
          <View style={styles.badge}/>
        </View>
      );
    } else {
      return (
        <Text style={styles.text}>{this.props.text}</Text>
      );
    }

  },

  checkIconSize() {
    console.log(this.props.resize);
    if (this.props.resize) {
      return (
        <Image
          style={styles.icon}
          source={this.props.icon}
          />
      );
    } else {
      return (
        <Image
          source={this.props.icon}
          />
      );
    }
  }
});

const styles = StyleSheet.create({
  container: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    width: 22,
    height: 22,
  },
  leftWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleWrapper: {
    flex: 4,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  text: {
    color: '#424242',
    fontSize: 17,
  },
  rightWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  seperator: {
    height: 1,
    bottom: 0,
    backgroundColor: 'gray'
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#ff0055'
  }
});
