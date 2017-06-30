import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  PanResponder,
  AndroidPermissions,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const strings = require('../../strings/strings');
const RoundedButton = require('../commons/rounded-button');
const NavigationBar = require('react-native-navbar');
const { connect } = require('react-redux');
const { createShoutoutActionCreator, requestCameraPermission } = require('../../actions');
const { uploadPartyImage } = require('../../api/PartyOnAPI');
var {height, width} = Dimensions.get('window');
import Camera from 'react-native-camera';
import CaptionInput from './shoutout/captionInput';

var Shoutout = React.createClass({

  getInitialState() {
    return {
      text: '',
      caption: '',
      hasCaptured: false,
      capturedImage: '',
      cameraType: 'back',
      captionFocused: false,
      disabled: false,
      flashToggle: false,
      flashMode: Camera.constants.FlashMode.off,
      shouldMirror: false,
      isUploading: false,
      captionPos: 40
    }
  },

  componentDidMount() {
    this.textInput.focus();
  },

  checkLineBreaks(text) {
    var eachLine = text.split('\n');
    if (eachLine.length > 7) {
      return
    }
    this.setState({text: text});
  },

  render() {
    return(
      <ScrollView style={styles.container}
        horizontal={true}
        ref={(ref) => this.scrollView = ref }
        pagingEnabled={true}
        scrollEnabled={false}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps={true}
        >
        <View style={styles.shoutoutContainer}>
          <NavigationBar
            title={{title: strings.newShoutout}}
            leftButton={
              {
                title: strings.close,
                tintColor: '#FF0055',
                handler: () => this.props.navigator.pop()
              }
            }
            rightButton={
              this.renderSendButton()
            }
            />
          {this.renderTextInput()}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => this.onCameraPress()}>
              <Text style={styles.cameraButtonText}>CAM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          {this.renderCameraOverlay()}
        </View>

      </ScrollView>
    );
  },

  renderTextInput() {
    if (Platform.OS === 'ios') {
      return (
        <TextInput
          style={styles.textInput}
          ref={(ref) => this.textInput = ref }
          placeholder={`${strings.shoutoutPlaceholder} ${this.props.location.city}!🍻🗣`}
          placeholderTextColor={'rgba(255,255,255, 0.8)'}
          maxLength={90}
          value={this.state.text}
          selectionColor={'white'}
          multiline={true}
          onChangeText={(text) => {
            this.checkLineBreaks(text);
          }}
          />
      );
    } else {
      return (
        <TextInput
          style={styles.textInputAndroid}
          ref={(ref) => this.textInput = ref }
          placeholder={`${strings.shoutoutPlaceholder} ${this.props.location.city}!🍻🗣`}
          placeholderTextColor={'rgba(255,255,255, 0.8)'}
          underlineColorAndroid={'#ff0055'}
          maxLength={90}
          value={this.state.text}
          selectionColor={'white'}
          multiline={true}
          onChangeText={(text) => {
            this.checkLineBreaks(text);
          }}
          />
      );
    }
  },

  renderSendButton() {
    if (this.state.text.length > 0) {
      return {
        title: 'Send',
        tintColor: '#FF0055',
        handler: () => this.onSendClick(false)
      }
    }
    return {
      title: 'Send',
      tintColor: 'gray'
    }
  },

  getColorCamera() {
    if (this.state.shouldMirror) {
      return {
        color: '#ff0055'
      }
    }
    return {
      color: '#929292'
    }
  },

  getColorFlash() {
    if (this.state.flashToggle) {
      return {
        color: '#ff0055'
      }
    }
    return {
      color: '#929292'
    }
  },

  renderCameraOverlay() {
    if (!this.state.hasCaptured) {
      return(
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
          type={this.state.cameraType}
          captureQuality={Platform.OS === 'ios' ? 'high' : 'medium'}
          mirrorImage={true}
          orientation={'portrait'}
          mirrorImage={this.state.shouldMirror}
          flashMode={this.state.flashMode}
          captureTarget={Camera.constants.CaptureTarget.memory}
          >
          <View style={styles.topWrapper}>
            <TouchableOpacity
              onPress={() => this.onFlashPress()}
              style={[styles.selfieBtn, {marginLeft: 15}]}>
              <Text
                style={[styles.selfieText, this.getColorFlash()]}>
                Flash
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onSelfiePress()}
              style={[styles.selfieBtn, {marginRight: 15}]}>
              <Text
                style={[styles.selfieText, this.getColorCamera()]}>
                Selfie
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <TouchableOpacity
              style={[styles.selfieBtn]}
              onPress={() => this.closeCamera()}
              >
              <Text
                style={{color: '#ff0055', letterSpacing: 0.9, fontWeight: '500'}}>
                {strings.cancel}
              </Text>
            </TouchableOpacity>
            {this.renderShutterButton()}
          </View>
        </Camera>
      );
    } else {
        return (
          <TouchableWithoutFeedback
          disabled={this.state.disabled}
          onPress={() => this.toggleCaptionOverlay()}>
            <Image
              style={[styles.preview]}
              source={{uri: 'data:image/png;base64,' + this.state.capturedImage.data}}>
              {this.renderCaptionOverlay()}
              <View style={styles.bottomWrapper}>
                <TouchableOpacity
                  style={styles.selfieBtn}
                  onPress={() => this.onImageDiscard()}
                  >
                  <Text
                    style={{color: '#ff0055', letterSpacing: 0.9, fontWeight: '500'}}>
                    {strings.close}
                  </Text>
                </TouchableOpacity>
                {this.renderShutterButton()}
              </View>
            </Image>
          </TouchableWithoutFeedback>
        );
    }
  },

  onImageDiscard() {
    this.setState({
      hasCaptured: false,
      captionOverlay: false,
      caption: ''
    });
  },

  toggleCaptionOverlay() {
    if (this.state.captionOverlay) {
      if (this.state.caption.length === 0) {
        this.setState({captionOverlay: false})
      } else {
        this.captionInput.blur();
        console.log('captionPos: ', this.state.captionPos);
      }
    } else {
      this.setState({captionOverlay: true});
    }
  },

  renderCaptionOverlay() {
    if (this.state.captionOverlay) {
      return(
        <CaptionInput
          refs={(ref) => this.captionInput = ref}
          onPanYFinished={(yPos) => this.setState({captionPos: Math.round((yPos / height) * 100)})}
          focused={this.state.captionFocused}
          toggleCaptionOverlay={() => this.toggleCaptionOverlay()}
          onChangeText={(text) => this.setState({caption: text})}/>
      );
    }
  },

  renderShutterButton() {
    if (this.state.hasCaptured && !this.state.isUploading) {
      return (
        <TouchableOpacity
          style={styles.shutterButton}
          onPress={() => this.onSendClick(true)}>
          <Image source={require('../../resources/upload-tick.png')}/>
        </TouchableOpacity>
      );
    } else if (this.state.hasCaptured && this.state.isUploading) {
      return (
        <View
          style={styles.shutterButton}>
          <ActivityIndicator
            size='large'
            color='#FF0055'/>
        </View>
      );
    }
    else {
      return (
        <TouchableOpacity
          style={styles.shutterButton}
          onPress={() => this.takePicture()}>
        </TouchableOpacity>
      );
    }
  },

  onFlashPress() {
    if (this.state.flashToggle) {
      this.setState({
        flashToggle: false,
        flashMode: Camera.constants.FlashMode.off
      })
    } else {
      this.setState({
        flashToggle: true,
        flashMode: Camera.constants.FlashMode.on
      });
    }
  },

  onSelfiePress() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        shouldMirror: true
      });
    } else {
      this.setState({
        cameraType: 'back',
        shouldMirror: false
      });
    }
  },

  closeCamera() {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    this.textInput.focus();
  },

  closeWindow() {
    this.props.navigator.pop();
  },


  onSendClick(hasImage) {
    let { city, latitude, longitude } = this.props.location;
    let payload = {
      profile_id: this.props.profileId,
      location: city,
      lat: latitude,
      lng: longitude
    };

    if (hasImage) {
      payload.image = 'data:image/png;base64,' + this.state.capturedImage.data;
      payload.uncropped = 1;
      payload.text = this.state.caption;
      payload.caption_position = this.state.captionPos;
      this.setState({isUploading: true});
      uploadPartyImage(this.state.capturedImage.data, false)
        .then(
          (response) => {
            payload.image = response.file;
            this.props.dispatch(createShoutoutActionCreator(payload)).then(
              (result) => {
                this.closeWindow();
              }
            )
          }
        );
    } else {
      payload.text = this.state.text;
      this.props.dispatch(createShoutoutActionCreator(payload)).then(
        (result) => {
          this.closeWindow();
        }
      )
    }

  },

  takePicture() {
    this.camera.capture()
      .then((data) => {
        this.setState({
          hasCaptured: true,
          capturedImage: data
        });
      })
      .catch(err => console.error(err));
  },

  onCameraPress() {
    console.log('pressed');
    this.textInput.blur();
    this.scrollView.scrollTo({x: width, y: 0, animated: true});
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0055',
  },
  shoutoutContainer: {
    height: height,
    width: width
  },
  topWrapper: {
    position: 'absolute',
    top: 50,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    paddingLeft: 15
  },
  cameraContainer: {
    height: height,
    width: width,
    backgroundColor: 'white'
  },
  preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
},
selfieText: {
  fontSize: 14,
  fontWeight: '500'
},
selfieBtn: {
  padding: 5,
  borderRadius: 8,
  backgroundColor: 'white',
  borderWidth: 2,
  borderColor: '#ff0055'
},
shutterButton: {
  position: 'absolute',
  backgroundColor: '#fff',
  height: 70,
  width: 70,
  borderWidth: 5,
  borderRadius: 35,
  borderColor: '#ff0055',
  bottom: 40,
  left: width / 2 - 35,
  justifyContent: 'center',
  alignItems: 'center'
},
textInput: {
  padding: 25,
  flex: 1,
  color: 'white',
  textAlign: 'left',
  fontSize: 28,
  fontWeight: 'bold'
},
textInputAndroid: {
  paddingBottom: 40,
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 25,
  color: 'white',
  textAlign: 'left',
  fontSize: 28,
  fontWeight: 'bold'
},
captionInput: {
  padding: 6,
  position: 'absolute',
  color: 'white',
  backgroundColor: '#ff0055',
  bottom: height / 2,
  height: 70,
  width: width /2,
  textAlign: 'left',
  fontSize: 18,
  fontWeight: '500'
},
cameraButton: {
  height: 35,
  width: 60,
  borderRadius: 10,
  backgroundColor: 'white',
  position: 'absolute',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  right: 25,
  bottom: height / 2
},
cameraButtonText: {
  color: '#ff0055',
  fontWeight: '500',
  letterSpacing: 0.9
}
});

function select(store) {
  return {
    location: store.location,
    profileId: store.user.profileId
  }
}

module.exports = connect(select)(Shoutout);
