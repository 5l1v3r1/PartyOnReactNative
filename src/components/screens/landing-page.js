import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Image,
} from 'react-native';

const { connect } = require('react-redux');
import Swiper from 'react-native-swiper';
import PartyOnLogo from '../../resources/partyon-logo.png';
var {height, width} = Dimensions.get('window');

var LandingPage = React.createClass({
  getInitialState() {
    return {
      index: 0
    }
  },

  renderAndroidStatusBar() {
    if (Platform.OS === 'android') {
      return <StatusBar
        backgroundColor={'#ff0055'}
        />
    }
    return;
  },

  render() {
    return(
      <View style={{flex: 1}}>
      {this.renderAndroidStatusBar()}
        <Swiper style={styles.wrapper}
        ref={(ref) => this.scrollView = ref }
        showsPagination={true}
        showsButtons={false}
        dot={this.renderDot()}
        activeDot={this.renderActiveDot()}
        >
        {this.renderFestIntro()}
        {this.renderShoutoutIntro()}
        {this.renderChatIntro()}
       </Swiper>
       {this.renderSkipButton()}
       {this.renderNextButton()}
     </View>
    );
  },

  renderFestIntro() {
    return (
      <View style={styles.festScreen}>
        <View style={styles.imageWrapper}>
          <Image style={styles.logo} source={require('../../resources/partyon-logo.png')}/>
          <Image style={styles.deviceArt} source={require('../../resources/fest-onboard.png')}/>
        </View>

        <View style={styles.bottomWrapper}>
          <Text style={styles.titleText}>Fest</Text>
          <Text style={styles.text}>Det har aldri vært enklere å bli med på fest. Bare trykk “Bli med”, så er det gjort!</Text>
        </View>
      </View>
    );
  },

  renderShoutoutIntro() {
    return (
      <View style={styles.festScreen}>
        <View style={styles.imageWrapper}>
          <Image style={styles.logo} source={require('../../resources/partyon-logo.png')}/>
          <Image style={styles.deviceArt} source={require('../../resources/shoutout-onboard.png')}/>
        </View>

        <View style={styles.bottomWrapper}>
          <Text style={styles.titleText}>Shoutout</Text>
          <Text style={styles.text}>Del bilder, tanker og ideer med Shoutouts.</Text>
        </View>
      </View>
    );
  },

  renderChatIntro() {
    return (
      <View style={styles.festScreen}>
        <View style={styles.imageWrapper}>
          <Image style={styles.logo} source={require('../../resources/partyon-logo.png')}/>
          <Image style={styles.deviceArt} source={require('../../resources/chat-onboard.png')}/>
        </View>

        <View style={styles.bottomWrapper}>
          <Text style={styles.titleText}>Chat</Text>
          <Text style={styles.text}>Chat med venner, fremmede og festverter.  Perfekt for å klargjøre den perfekte festen!</Text>
        </View>
      </View>
    );
  },

  renderDot() {
    return (
      <View style={{
        borderColor: '#4A4A4A',
        backgroundColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    }} />
    );
  },

  renderActiveDot() {
    return (
      <View style={{
        backgroundColor:'#ff0055',
        width: 8,
        height: 8,
        borderColor: '#ff0055',
        borderWidth: 1,
        borderRadius: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
    }} />
    );
  },

  renderSkipButton() {
    return (
      <TouchableOpacity style={styles.skipButton}
      onPress={() => this.props.navigator.immediatelyResetRouteStack([{name: 'root'}])}>
        <Text style={styles.doneText}>Fullfør</Text>
      </TouchableOpacity>
    );
  },

  renderNextButton() {
    return (
      <TouchableOpacity style={styles.nextButton}
      onPress={() => this.scrollView.scrollBy(1)}>
        <Text style={styles.doneText}>Next</Text>
      </TouchableOpacity>
    );
  },


  renderDoneButton() {
    return (
      <TouchableOpacity style={styles.skipButton}
      onPress={() => this.props.navigator.immediatelyResetRouteStack([{name: 'root'}])}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  wrapper: {
    ...Platform.select({
      android: {
        flex: 1
      },
    }),
  },
  festScreen: {
    flex: 5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
    marginBottom: 15
  },
  text: {
    color: '#4A4A4A',
    fontSize: 14,
    textAlign: 'center'
  },
  doneText: {
    color: '#FF0055',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  imageWrapper: {
    backgroundColor: '#ff0055',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 4,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 35,
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 20,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  deviceArt: {
    width: 220,
    height: 375,
  },
  skipButton: {
    position: 'absolute',
    left: 10,
    bottom: 20
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    bottom: 20
  },

});

function select(store) {
  return {

  }
}
module.exports = connect(select)(LandingPage);
