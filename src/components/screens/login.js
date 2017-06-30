import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Animated,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken,
} = FBSDK;

const {height, width} = Dimensions.get('window');
var { connect } = require('react-redux');
var {checkLoginActionCreator} = require('../../actions');
const strings = require('../../strings/strings');


var Login = React.createClass({

  getInitialState() {
    return {
      anim: new Animated.Value(0)
    }
  },

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  },

  render() {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle={"light-content"}
            //hidden={true}
            backgroundColor={'#ff0055'}
            />
          <View style={styles.bgWrapper}>
            <Image
              source={require('../../resources/login-bg.png')}
              style={styles.bgImage}>
              <Animated.Image
                style={[styles.logo, this.fadeIn(0)]}
                source={require('../../resources/partyon-logo.png')}
                />
              {this.facebookButton()}
            </Image>
          </View>
        </View>
      );
    },

    facebookButton() {
      return(
        <Animated.View style={[styles.fbButtonWrapper, this.fadeIn(700, 40)]}>
          <TouchableOpacity
            style={styles.facebookButton}
            underlayColor='white'
            onPress={this.attemptLogin}>
            <Image
              style={styles.facebookIc}
              source={require('../../resources/ic_facebook.png')}
              />
            <Text style={styles.loginText}>{strings.login}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },

    fadeIn(delay, from = 0) {
      const {anim} = this.state;
      return {
        opacity: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
        transform: [{
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        }],
      };
    },

    //TODO Should probably refactor this function inside login actions
    attemptLogin() {
      LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']).then(
        (result) => {
          if (result.isCancelled) {
            //console.log('login cancelled');
          } else {
            this.props.dispatch(checkLoginActionCreator());
            this.props.navigator.immediatelyResetRouteStack([{name: 'landingPage'}]);
          }
        },
        (error) => {
          alert('Login fail with error: ' + error);
        }
      );
    }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgWrapper: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //paddingLeft: 20,
    //paddingRight: 20,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode: 'cover',
    height: height,
    width: width
    //paddingLeft: 20,
    //paddingRight: 20,
  },
  logo: {
    marginTop: 120,
    width: 60,
    height: 38,
    resizeMode: 'stretch',
  },
  facebookButton: {
    flex: 1,
    backgroundColor: '#3392FF',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    marginBottom: 80,
  },
  fbButtonWrapper: {
    alignSelf: 'stretch',
  },
  facebookIc: {
    height: 20,
    width: 10,
    marginRight: 15,
    resizeMode: 'stretch'
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  }
});

function select(store) {
  return {

  }
}

module.exports = connect(select)(Login);
