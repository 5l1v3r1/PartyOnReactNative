import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

const ProfilePic = require('../../../commons/profilepic');
const strings = require('../../../../strings/strings');

module.exports = React.createClass({

  getInitialState() {
    return {
      noGuests: false
    }
  },

  renderProfilePics(guests = []) {
    const guestsLength = guests.length;
    console.log('guestsLength' + guestsLength);
    const views = [];
    if (guestsLength == 0) {

      return (
        <Text style={styles.noGuestText}>{strings.noGuests}</Text>
      );
    }
    for (let i = 0; i < guestsLength; i++) {
      if (i < 6) {
        views.push(<ProfilePic url={guests[i]} key={i} style={styles.profilePic} size={'small'}/>);
      } else if(i === 6) {
        let count = guestsLength - 6;
        views.push(this.renderAdditionalGuests(count));
      }
    }
    return views;
  },

  renderAdditionalGuests(count) {
    return <this.AdditionalGuests key={'additionalGuests'} count={count} />
  },

  AdditionalGuests(props) {
    return (
      <View
        style={styles.additionalGuests}>
        <Text style={styles.additionalGuestsText}>{`+${props.count}`}</Text>
      </View>
    )
  },

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.topView}>
          <View style={styles.titleView}>
            <Image
              source={require('../../../../resources/People@2x.png')}
              style={styles.icon}></Image>
            <Text style={styles.titleText}>{strings.guests}</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => {
            this.props.onPress();
          }}>
          <View style={styles.bottomView}>
            {this.renderProfilePics(this.props.guests)}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});



const styles = StyleSheet.create({
  container: {
    height: 70,
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
    height: 12,
    width: 12,
    marginRight: 5,
  },
  profilePic: {
    marginRight: 5
  },
  noGuestText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4A4A4A'
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
    alignItems: 'center',
    paddingRight: 10,
    flexDirection: 'row',
  },
  input: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#EFEFF4'
  },
  additionalGuests: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0055',
    borderRadius: 15,
  },
  additionalGuestsText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500'
  }
});
