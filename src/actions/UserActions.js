const { updateUser, uploadProfileImage } = require('../api/PartyOnAPI');

function setGender(gender) {
  return {
    type: 'SET_GENDER',
    gender: gender
  }
}

function setAge(age) {
  return {
    type: 'SET_AGE',
    age: age
  }
}

function setBio(bio) {
  return {
    type: 'SET_BIO',
    bio: bio
  }
}

function setProfileImage(url) {
  return {
    type: 'SET_PROFILE_IMAGE',
    url: url
  }
}

function updateProfileInfoActionCreator(payload = {}) {
  return (dispatch) => {
    return updateUser(payload).then(
      (result) => {
        console.log('Set bio called', payload.bio);
        dispatch(setBio(payload.bio));
      }
    )
  }
}

function setAgeActionCreator(date) {
  return (dispatch) => {
    console.log('SET BIRTHDATE: ', date);
    let convertedDate = convertBirthdate(date);
    dispatch(setAge(convertedDate));
  }
}

function updateProfileImageActionCreator(image, profileId) {
  return (dispatch) => {
    return uploadProfileImage(image, profileId).then(
      (response) => {
        dispatch(setProfileImage(response.file));
      }
    )
  }
}

function convertBirthdate(date) {
  let year, month, day;
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-${day}`;
}

module.exports = {
  setGender,
  setAgeActionCreator,
  setBio,
  updateProfileInfoActionCreator,
  updateProfileImageActionCreator
}
