import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return {
      text: '',
      icon: '',
      style: {

      }
    };
  },

  componentWillMount() {
    this.checkAchievement();
  },

  render() {
    if (this.props.size === 'small') {
      return(
        <View style={[styles.iconSmall, this.state.style]}>
          <Text style={styles.iconTextSmall}>+1</Text>
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <View style={[styles.icon, this.state.style]}>
            <Text style={styles.iconText}>1</Text>
          </View>
          <Text style={styles.text}>{this.state.text}</Text>
        </View>
      );
    }
  },

  renderIcon(data) {

  },

  checkAchievement() {
    const { type } = this.props;
    switch (type) {
      case "hosted1Party":
          this.setState({
            text: 'Hosted 1 party',
            style: {
              backgroundColor: '#FF0055'
            }
          });
        break;
      case "ultimatePartyHost":
          this.setState({
            text: 'Ultimate party host',
            style: {
              backgroundColor: '#FFDA00'
            }
          });
        break;
      case "bestPartyMusic":
          this.setState({
            text: 'Best party music',
            style: {
              backgroundColor: '#AB00FF'
            }
          });
        break;
      case "hosted100parties":
          this.setState({
            text: 'Hosted 100 parties',
            style: {
              backgroundColor: '#00DEB4'
            }
          });
        break;
    }
  },

});

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 70,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  iconSmall: {
    height: 30,
    width: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FF0055'
  },
  iconText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  },
  iconTextSmall: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9B9B9B',
    textAlign: 'center',
  }
});
