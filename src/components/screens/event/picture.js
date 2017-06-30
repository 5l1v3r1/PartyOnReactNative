import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  NativeModules
} from 'react-native';

const NavigationBar = require('react-native-navbar');
const BackButton = require('../../commons/backButtonNavItem');
const FullWidthButton = require('../../commons/full-width-button');
const SCREEN_WIDTH = require('Dimensions').get('window').width;
const ImagePickerManager = require('react-native-image-picker');

var ImageCropper = NativeModules.ImageCropper;

const { connect } = require('react-redux');
const { setEventPicture, setFilename, changedPictureFromEdit } = require('../../../actions');
const { uploadPartyImage } = require('../../../api/PartyOnAPI');
const strings = require('../../../strings/strings')

var PicturePicker = React.createClass({
  getInitialState() {
    return {
      imageSource: null,
      pictureWidth: null,
      pictureHeight: null,
      anim: new Animated.Value(0)
    }
  },

  componentDidMount() {
    this.onPicturePickerPress();
  },

  renderRightButton() {
    if (this.state.imageSource) {
      return {
        title: 'Ta bilde på nytt',
        tintColor: 'white',
        handler: () => this.onPicturePickerPress(),
      };
    }
  },

  render() {
    const pictureSize = {
      width: this.state.pictureWidth,
      height: this.state.pictureHeight
    };

    return(
      <View style={styles.container}>
        <NavigationBar
          statusBar={{style: 'light-content'}}
          tintColor={'transparent'}
          leftButton={
            <View style={styles.buttonWrapper}>
              <BackButton color={'white'} onPress={() => this.onBackPress()}/>
            </View>
          }
          rightButton={this.renderRightButton()}
          />
        <View style={styles.contentWrapper}>
          <View style={styles.imageWrapper}>
            <Image source={this.state.imageSource} style={pictureSize}/>
          </View>
        </View>
        {this.renderFullWidthButton()}
      </View>
    );
  },

  renderFullWidthButton() {
    if (this.state.imageSource) {
      Animated.timing(this.state.anim, {toValue: 3000, duration: 1000}).start();
      return (
        <Animated.View style={this.fadeIn(1000, 10)}>
          <FullWidthButton
            text={strings.usePicture}
            onPress={() => this.onSetPicturePress()}
            />
        </Animated.View>
      );
    }
  },

  onSetPicturePress() {
    this.props.dispatch(setEventPicture(this.state.imageSource));
    if (this.props.data.fromEdit) {
      this.props.dispatch(changedPictureFromEdit());
    }
    this.props.navigator.pop();
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

  onPicturePickerPress() {
    var options = {
      title: strings.choosePhoto,
      cancelButtonTitle: strings.cancel,
      takePhotoButtonTitle: strings.takePhotoButtonTitle,
      chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
      cameraType: 'back',
      mediaType: 'photo',
      shouldCrop: true,
      maxWidth: 750,
      maxHeight: 488,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {

      if (response.didCancel) {
        this.props.navigator.pop();
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        this.uploadImage(response.data);
        //console.log('WIDTH: ', response.width, 'HEIGHT: ', response.height, 'ISVERTICAL: ', response.isVertical);

        this.setState({
          imageSource: source,
          pictureHeight: response.height / 2,
          pictureWidth: response.width / 2
        });
      }
    });
  },

  uploadImage(imageData) {
    uploadPartyImage(imageData, true)
      .then((response) => {
        if (response.success) {
          console.log('DISPATCH CALLED');
          this.props.dispatch(setFilename(response.filename));
        }
      });
  },

  onBackPress() {
    this.props.navigator.pop();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  buttonWrapper: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrapper: {

  }
});

function select(store) {
  return {

  }
}
module.exports = connect(select)(PicturePicker);
