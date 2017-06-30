const baseUrl = 'http://178.62.27.38/api/v1';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// UserLogin - POST
async function loginUser(user, uuid) {

  let payload = {
    fbid: user.id,
    udid: uuid,
    device: 'iOS',
    firstname: user.first_name,
    lastname: user.last_name,
    email: user.email,
  };
  try {
    let response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    let parsedResponse = await response.json();

    console.log('Successfully logged in user');
    return parsedResponse;
  } catch (e) {
    //TODO properly handle network-error
    console.error(e);
  }
}

async function updateUser(user, uuid) {
  let payload = {
    fbid: user.fbid,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    birthdate: user.birthdate,
    gender: user.gender,
    bio: user.bio
  };
  try {
    let response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    let parsedResponse = await response.json();

    console.log('Successfully updated user');
    return parsedResponse;
  } catch (e) {
    //TODO properly handle network-error
    console.error(e);
  }
}

async function uploadPartyImage(imageData, shouldCrop) {
  let payload = {
    image: imageData
  };
  shouldCrop ? payload.uncropped = 0 : payload.uncropped = 1;
  try {
    let response = await fetch(`${baseUrl}/image`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (e) {
    // TODO properly handle network-error
    console.error(e);
  }
}

async function uploadProfileImage(image, profileId) {
  let payload = {
    image: image,
    profile_id: profileId
  };
  try {
    let response = await fetch(`${baseUrl}/profile/image`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//CreateParty - POST
async function createParty(party) {
  console.log('PARTY-PAYLOAD: ', JSON.stringify(party));
  try {
    let response = await fetch(`${baseUrl}/party`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(party)
    });

    console.log('RAW RESPONSE: ', response);

    let parsedResponse = await response.json();

    console.log('Successfully created party');
    return parsedResponse;
  } catch (e) {
    //TODO properly handle network-error
    console.error(e);
  }
}

//Update party - PATCH
async function updateParty(party, partyId) {
  try {
    let response = await fetch(`${baseUrl}/party/${partyId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(party)
    });

    console.log('RAW RESPONSE: ', response);

    return await response.json();
  } catch (e) {
    return e;
  }
}

//GetParties - GET
async function getParties(profileId, position) {
  try {
    let response = await fetch(`${baseUrl}/party?lat=${position.latitude}&lng=${position.longitude}&distance=50&profile_id=${profileId}`);
    let parsedResponse = await response.json();

    return parsedResponse;
  } catch (e) {
    return e;
  }
}

//GetParties - GET
async function getFilteredParties(profileId, position, filter = {}) {
  const { age_from, age_to, gender, distance} = filter;
  console.log('URL: ', `${baseUrl}/party?lat=${position.latitude}&lng=${position.longitude}&gender=${gender}&age_from=${age_from}&age_to=${age_to}&distance=${distance}&profile_id=${profileId}`);
  try {
    let response = await fetch(`${baseUrl}/party?lat=${position.latitude}&lng=${position.longitude}&gender=${gender}&age_from=${age_from}&age_to=${age_to}&distance=${distance}&profile_id=${profileId}`);
    let parsedResponse = await response.json();

    return parsedResponse;
  } catch (e) {
    return e;
  }
}

//Invite to party
async function inviteToParty(partyId, profileId, invites) {
  const payload = {
    party_id: partyId,
    profile_id: profileId,
    invites: invites
  };
  try {
    let response = await fetch(`${baseUrl}/party/invite`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//Remove guest from party
async function removePartyGuest(profileId, partyId, removeId) {
  const payload = {
    profile_id: profileId,
    party_id: partyId,
    remove_id: removeId
  }
  try {
    const response = await fetch(`${baseUrl}/party/remove`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return e;
  }
}

// Get a single party by id
async function getParty(partyId, profileId, location) {
  const lng = location.longitude;
  const lat = location.latitude;
  try {
    let response = await fetch(`${baseUrl}/party/${partyId}?profile_id=${profileId}&lat=${lat}&lng=${lng}`);
    return await response.json();

  } catch (e) {
    console.error(e);
    return e;
  }
}

async function deleteParty(partyId, profileId) {
  let payload = {
    party_id: partyId,
    profile_id: profileId
  };
  try {
    let response = await fetch(`${baseUrl}/party/destroy`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function leaveParty(partyId, profileId) {
  let payload = {
    party_id: partyId,
    profile_id: profileId
  };

  try {
    let response = await fetch(`${baseUrl}/party/leave`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//Retuns profile-objects given a comma-seperated fbid list - POST
async function getFriendsList(fbids) {
  let payload = {
    fbids: fbids
  }
  try {
    let response = await fetch(`${baseUrl}/profile/friendslist`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    return await response.json();

  } catch (e) {
    console.error(e);
  }
}

// Get parties created by given user
async function getUserParties(profileId, me, location) {
  const lat = location.latitude;
  const lng = location.longitude;
  try {
    let response = await fetch(`${baseUrl}/profile/${profileId}/parties?profile_id=${me}&lat=${lat}&lng=${lng}`);
    return await response.json();
  } catch (e) {
    console.log('ERROR IN API CATCHED');
    return e;
  }
}

// Get attendings for user given profileId
async function getAttendings(profileId, location) {
  const lat = location.latitude;
  const lng = location.longitude;
  try {
    let response = await fetch(`${baseUrl}/party/attendings?profile_id=${profileId}&lat=${lat}&lng=${lng}`);
    return await response.json();
  } catch (e) {
    console.error(e);
    return e;
  }
}

//Request to join party
async function joinParty(partyId, profileId) {
  let payload = {
    party_id: partyId,
    profile_id: profileId
  }

  try {
    let response = await fetch(`${baseUrl}/party/join`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    let parsedResponse = await response.json();

    return parsedResponse;
  } catch (e) {
    console.error(e);
  }
}

// Accept join request
async function acceptJoinRequest(params) {
  let payload = {
    profile_id: params.profile.profile_id,
    party_id: params.party.party_id
  };

  try {
    let response = await fetch(`${baseUrl}/party/join/accept`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Accept invite request
async function acceptInviteRequest(partyId, profileId) {
  let payload = {
    party_id: partyId,
    profile_id: profileId
  };
  try {
    let response = await fetch(`${baseUrl}/party/invite/accept`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Decline join request
async function declineJoinRequest(params) {
  try {
    let response = await fetch(`${baseUrl}/party/join/decline`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params)
    })

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//Gets a party's guests given a partyId
async function getPartyGuests(partyId) {
  try {
    let response = await fetch(`${baseUrl}/party/${partyId}/guests`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//Gets a profilesNotifications
async function getNotifications(profileId) {
  try {
    let response = await fetch(`${baseUrl}/notifications/${profileId}`);
    console.log('RESPONSE: ', response);
    return await response.json();

  } catch (e) {
    console.error(e);
  }
}

//Reads a profiles notifications
async function readNotifications(profileId) {
  let payload = {
    profile_id: profileId
  }
  try {
    let response = await fetch(`${baseUrl}/notifications/seen`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

//Creates a new shoutout
async function createShoutout(shoutout) {
  console.log('SHOUTOUT PAYLOAD: ', shoutout);
  try {
    let response = await fetch(`${baseUrl}/shoutout`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(shoutout)
    });

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function getShoutouts(location, profileId) {
  let { latitude, longitude } = location;
  try {
    let response = await fetch(`${baseUrl}/shoutout?lat=${latitude}&lng=${longitude}&profile_id=${profileId}&proximity=50`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function getShoutoutsById(profileId, me) {
  try {
    let response = await fetch(`${baseUrl}/shoutout/profile/${profileId}?profile_id=${me}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function likeShoutout(shoutoutId, profileId) {
  let payload = {
    shoutout_id: shoutoutId,
    profile_id: profileId
  };

  try {
    let response = await fetch(`${baseUrl}/shoutout/like`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function dislikeShoutout(shoutoutId, profileId) {
  let payload = {
    shoutout_id: shoutoutId,
    profile_id: profileId
  };

  try {
    let response = await fetch(`${baseUrl}/shoutout/dislike`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function deleteShoutout(profileId, shoutoutId) {
  let payload = {
    profile_id: profileId,
    shoutout_id: shoutoutId
  };
  try {
    let response = await fetch(`${baseUrl}/shoutout/remove`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Chat endpoints //

async function getChats(profileId) {
  try {
    let response = await fetch(`${baseUrl}/chat?profile_id=${profileId}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function checkChatExists(profileIdTo, profileIdFrom) {
  let payload = {
    profile_id_1: profileIdTo,
    profile_id_2: profileIdFrom
  };
  try {
    let response = await fetch(`${baseUrl}/chat/exists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function getChatThread(chatId, profileId, before = '') {
  try {
    let response = await fetch(`${baseUrl}/chat/${chatId}/${profileId}?before=${before}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function createChat(profileIdFrom, profileIdTo, message) {
  let payload = {
    profile_id_from: profileIdFrom,
    profile_id_to: profileIdTo,
    body: message
  };
  try {
    let response = await fetch(`${baseUrl}/chat/create`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function addMessage(chatId, profileId, message) {
  let payload = {
    chat_id: chatId,
    profile_id: profileId,
    body: message
  };

  try {
    let response = await fetch(`${baseUrl}/chat/store`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

async function readChatThread(chatId, profileId) {
  let payload = {
    chat_id: chatId,
    profile_id: profileId
  };

  try {
    let response = await fetch(`${baseUrl}/chat/read`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  loginUser,
  updateUser,
  createParty,
  getParties,
  getFriendsList,
  getFilteredParties,
  joinParty,
  removePartyGuest,
  acceptJoinRequest,
  declineJoinRequest,
  getUserParties,
  getAttendings,
  getPartyGuests,
  updateParty,
  acceptInviteRequest,
  uploadPartyImage,
  uploadProfileImage,
  getParty,
  getNotifications,
  readNotifications,
  createShoutout,
  getShoutouts,
  getShoutoutsById,
  likeShoutout,
  leaveParty,
  deleteParty,
  inviteToParty,
  dislikeShoutout,
  deleteShoutout,
  getChats,
  createChat,
  getChatThread,
  checkChatExists,
  addMessage,
  readChatThread
};
