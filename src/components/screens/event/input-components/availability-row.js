import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image
} from 'react-native';

const strings = require('../../../../strings/strings');

module.exports = React.createClass({
  getInitialState() {
    return {
      switchIsOn: this.props.initialValue,
    };
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image
              style={styles.icon}
              source={require('../../../../resources/eye-icon@2x.png')}
              />
            <Text style={styles.titleText}>{strings.availability}</Text>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <Text style={styles.text}>{strings.hideParty}</Text>
          <Switch
            value={this.state.switchIsOn}
            onTintColor={'#FF0055'}
            onValueChange={(value) => {
              this.setState({
                switchIsOn: value
              });
              this.props.onValueChange(value);
            }}
            />
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    height: 80,
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
  text: {
    fontSize: 16,
    color: '#4A4A4A'
  },
  bottomWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
