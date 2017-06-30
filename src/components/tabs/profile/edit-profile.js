import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  PickerIOS,
  DatePickerIOS,
  PickerItemIOS,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import { connect } from 'react-redux';
import NavigationBar from 'react-native-navbar';
var {height, width} = Dimensions.get('window');
const strings = require('../../../strings/strings');
import {
  setGender,
  setAgeActionCreator,
  updateProfileInfoActionCreator,
  updateProfileImageActionCreator
} from '../../../actions';
import { uploadProfileImage } from '../../../api/PartyOnAPI';
import ProfilePic from '../../commons/profilepic';
import GenderIcon from '../../../resources/sex-icon@2x.png';
import UserIcon from '../../../resources/profile-icon-filled@2x.png';
import DateIcon from '../../../resources/date-icon-filled@2x.png';
const ImagePickerManager = require('react-native-image-picker');


class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowGenderPicker: false,
      shouldShowDatePicker: false,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      bio: this.props.user.bio,
      gender: 'male',
      isLoading: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
        title={{title: strings.editProfile}}
        leftButton={{
          title: strings.close,
          tintColor: '#ff0055',
          handler: () => this.props.navigator.pop()
        }}
        rightButton={{
          title: strings.done,
          tintColor: '#ff0055',
          handler: () => this.onDonePress()
        }}
        />
        <View style={styles.container}>
          <View style={styles.topWrapper}>
            <Text style={styles.nameTitle}>{`${this.props.user.firstname} ${this.props.user.lastname}`}</Text>
            {this.renderProfilePic()}
            <TouchableOpacity onPress={() => this.onChangeProfilePicPress()}>
              <Text style={styles.changeText}>{strings.changeProfilePic}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.inputRow}>
              <Image style={styles.icon} source={UserIcon}/>
              <TextInput
              style={styles.textInput}
              ref={(ref) => this.textInput = ref }
              defaultValue={this.props.user.bio}
              placeholder={'Bio'}
              onChangeText={(text) => this.onBioChange(text)}
              />
            </View>
            <View style={styles.inputRow}>
                <Image style={styles.icon} source={DateIcon}/>
              <TouchableWithoutFeedback
                onPress={() => this.onDateRowPress()}
                style={styles.inputField}>
              <View>
                <Text>
                  {this.props.user.birthdate}
                </Text>
              </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.inputRow}>
              <Image style={styles.icon} source={GenderIcon}/>
              <View
                style={styles.inputField}>
                <View>
                  <Text>
                    {this.props.user.gender}
                  </Text>
                </View>
              </View>
            </View>
            {this.renderDatePicker()}
            {this.renderGenderPicker()}
          </View>
        </View>
      </View>
    );
  }

  onDateRowPress() {
    this.textInput.blur();
    if (this.state.shouldShowGenderPicker) {
      this.setState({shouldShowGenderPicker: false});
    }
    this.state.shouldShowDatePicker ?
      this.setState({shouldShowDatePicker: false}) :
      this.setState({shouldShowDatePicker: true})
  }

  onGenderRowPress() {
    this.textInput.blur();
    if (this.state.shouldShowDatePicker) {
      this.setState({shouldShowDatePicker: false});
    }
    this.state.shouldShowGenderPicker ?
      this.setState({shouldShowGenderPicker: false}) :
      this.setState({shouldShowGenderPicker: true})
  }

  onBioChange(text) {
    this.setState({bio: text});
  }

  renderProfilePic() {
    if (this.state.isLoading) {
      return (
        <View style={{height: 56, width: 56, borderRadius: 28, backgroundColor: 'white'}}>
        <ActivityIndicator
          style={{flex: 1}}
          size='small'
          color='#FF0055'/>
        </View>
      );
    } else {
      return <ProfilePic url={this.props.user.image}/>
    }
  }


  renderDatePicker() {
    if (this.state.shouldShowDatePicker) {
      return (
        <View>
        <View style={styles.pickerTopWrapper}>
          <Text style={{marginLeft: 20, }}>{strings.chooseBirthdate}</Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.onSaveDatePress()}
            >
            <Text style={styles.saveButtonText}>{strings.saveSmall}</Text>
          </TouchableOpacity>
        </View>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={(date) => this.onDateChange(date)}
            />
        </View>
      );
    }
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  onSaveDatePress() {
    this.props.dispatch(setAgeActionCreator(this.state.date));
    this.setState({shouldShowDatePicker: false});
  }

  onSaveGenderPress() {
    this.props.dispatch(setGender(this.state.gender));
    this.setState({shouldShowGenderPicker: false});
  }

  renderGenderPicker() {
    const GENDERS = {
      male: {name: 'Male'},
      female: {name: 'Female'}
    }
    if (this.state.shouldShowGenderPicker) {
      let gender = GENDERS[this.state.gender];
      let selectionString = gender.name;
      return (
        <View>
        <View style={styles.pickerTopWrapper}>
          <Text style={{marginLeft: 20, }}>Velg et kjønn</Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => this.onSaveGenderPress()}
            >
            <Text style={styles.saveButtonText}>Lagre</Text>
          </TouchableOpacity>
        </View>
        <PickerIOS
          itemStyle={styles.pickerStyle}
          selectedValue={this.state.gender}
          onValueChange={(gender) => this.setState({gender: gender})}>
          {Object.keys(GENDERS).map((gender) => (
            <PickerItemIOS
              key={gender}
              value={gender}
              label={GENDERS[gender].name}
            />
          ))}
        </PickerIOS>
        </View>
      );
    }
  }

  onDonePress() {
    let payload = {
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      fbid: this.props.user.fbid,
      email: this.props.user.email,
      gender: this.state.gender,
      birthdate: this.state.date,
      bio: this.state.bio
    }
    console.log('BIO STATE: ', this.state.bio);
    this.props.dispatch(updateProfileInfoActionCreator(payload)).then(
      (result) => {
        this.props.navigator.pop()
      }
    )
    //Dispatch action to update serverside then pop
  }

  onChangeProfilePicPress() {
    var options = {
      title: strings.changeProfilePic,
      cancelButtonTitle: strings.cancel,
      takePhotoButtonTitle: strings.takePhotoButtonTitle,
      chooseFromLibraryButtonTitle: strings.chooseFromLibraryButtonTitle,
      cameraType: 'back',
      mediaType: 'photo',
      shouldCrop: false,
      maxWidth: 750,
      maxHeight: 750,
      allowsEditing: true,
      quality: 1,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        //this.props.navigator.pop();
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        this.uploadImage(response.data);
        console.log('WIDTH: ', response.width, 'HEIGHT: ', response.height, 'ISVERTICAL: ', response.isVertical);

        this.setState({
          imageSource: source,
          pictureHeight: response.height,
          pictureWidth: response.width
        });
      }
    });
  }

  uploadImage(image) {
    this.setState({isLoading: true});
    this.props.dispatch(updateProfileImageActionCreator(image, this.props.user.profileId)).then(
      (response) => {
        this.setState({isLoading: false});
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topWrapper: {
    flex: 0.8,
    backgroundColor: '#EFEFF4',
    justifyContent: 'flex-start',
    padding: 40,
    alignItems: 'center'
  },
  bottomWrapper: {
    flex: 2,
    justifyContent: 'flex-start',

  },
  changeText: {
    color: '#ff0055',
    fontSize: 14,
    marginTop: 10,
  },
  inputRow: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: '#C8C7CC'
  },
  icon: {
    margin: 10
  },
  inputField: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  nameTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '500',
    //color: '#4A4A4A'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  pickerWrapper: {
    position: 'absolute',
    bottom: 0,
    height: height / 3,
    width: width,
  },
  pickerTopWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    width: width
  },
  saveButtonText: {
    color: '#ff0055',
    fontWeight: '500'
  },
  pickerStyle: {
    fontSize: 25,
    color: '#ff0055',
    fontWeight: '500'
  }
});

function select(store) {
  return {
    user: store.user
  }
}

module.exports = connect(select)(EditProfile);
