const {
  createShoutout,
  getShoutouts,
  likeShoutout,
  dislikeShoutout,
  getShoutoutsById,
  deleteShoutout
} = require('../api/PartyOnAPI');

function loadedShoutoutsAction(shoutouts) {
  return {
    type: 'LOADED_SHOUTOUTS',
    shoutouts: shoutouts
  }
}

function loadedMyShoutoutsAction(shoutouts) {
  return {
    type: 'LOADED_MY_SHOUTOUTS',
    shoutouts: shoutouts
  }
}

function shoutoutsEmptyAction() {
  return {
    type: 'SHOUTOUT_EMPTY'
  }
}

function shoutoutCreated(shoutout) {
  return {
    type: 'SHOUTOUT_CREATED',
    shoutout: shoutout
  }
}

function shoutoutLiked(index) {
  return {
    type: 'SHOUTOUT_LIKED',
    index: index
  }
}

function shoutoutDisliked(index) {
  return {
    type: 'SHOUTOUT_DISLIKED',
    index: index
  }
}

function shoutoutDislikedProfile(index) {
  return {
    type: 'SHOUTOUT_DISLIKED_PROFILE',
    index: index
  }
}

function shoutoutLikedProfile(index) {
  return {
    type: 'SHOUTOUT_LIKED_PROFILE',
    index: index
  }
}

function shoutoutDeleted(index) {
  return {
    type: 'SHOUTOUT_DELETED',
    index: index
  }
}

function shoutoutDeletedFromProfile(index) {
  return {
    type: 'SHOUTOUT_DELETED_PROFILE',
    index: index
  }
}

function loadedMyShoutoutsEmpty() {
  return {
    type: 'LOADED_MY_SHOUTOUTS_EMPTY'
  }
}

function loadShoutoutsActionCreator(location, profileId) {
  return (dispatch) => {
    return getShoutouts(location, profileId).then(
      (response) => {
        if (response.empty) {
          dispatch(shoutoutsEmptyAction());
        } else {
          dispatch(loadedShoutoutsAction(response));
        }

        return response;
      }
    )
  }
}

function loadMyShoutoutsActionCreator(profileId, me) {
  return (dispatch) => {
    return getShoutoutsById(profileId, me).then(
      (response) => {
        if (response.empty) {
          dispatch(loadedMyShoutoutsEmpty())
        } else {
          dispatch(loadedMyShoutoutsAction(response));
        }

        return response;
      }
    )
  }
}

function createShoutoutActionCreator(shoutout) {
  return (dispatch) => {
    return createShoutout(shoutout).then(
      (response) => {
        if (response.success) {
          response.shoutout.distance = 'distanceVeryClose';
          dispatch(shoutoutCreated(response.shoutout));
          return response;
        }
      }
    )
  }
}

function likeShoutoutActionCreator(shoutoutId, profileId, index, fromProfile) {
  return (dispatch) => {
    return likeShoutout(shoutoutId, profileId).then(
      (response) => {
        if (!fromProfile) {
          dispatch(shoutoutLiked(index));
        } else {
          dispatch(shoutoutLikedProfile(index));
        }

        return response;
      }
    )
  }
}

function dislikeShoutoutActionCreator(shoutoutId, profileId, index, fromProfile) {
  return (dispatch) => {
    return dislikeShoutout(shoutoutId, profileId).then(
      (response) => {
        if (!fromProfile) {
          dispatch(shoutoutDisliked(index));
        } else {
          dispatch(shoutoutDislikedProfile(index));
        }
        return response;
      }
    )
  }
}

function deleteShoutoutActionCreator(profileId, shoutoutId, index, fromProfile) {
  return (dispatch) => {
    return deleteShoutout(profileId, shoutoutId).then(
      (response) => {
        if (fromProfile) {
          dispatch(shoutoutDeletedFromProfile(index));
        } else {
          dispatch(shoutoutDeleted(index));
        }

        return response;
      }
    )
  }
}

module.exports = {
  loadShoutoutsActionCreator,
  createShoutoutActionCreator,
  likeShoutoutActionCreator,
  dislikeShoutoutActionCreator,
  loadMyShoutoutsActionCreator,
  deleteShoutoutActionCreator
}
