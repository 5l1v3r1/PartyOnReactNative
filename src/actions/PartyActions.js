const {
  joinParty,
  getParties,
  getParty,
  getUserParties,
  getPartyGuests,
  acceptJoinRequest,
  leaveParty,
  removePartyGuest,
  inviteToParty,
  deleteParty,
  acceptInviteRequest,
  declineJoinRequest,
  getAttendings
} = require('../api/PartyOnAPI');

function loadedPartiesAction(parties) {
  return {
    type: 'LOADED_PARTIES',
    parties: parties
  }
}

function loadedPartiesEmpty() {
  return {
    type: 'LOADED_PARTIES_EMPTY',
    empty: 'PARTIES'
  }
}

function loadedPartyAction(party) {
  return {
    type: 'LOADED_PARTY',
    party: party
  }
}

function loadedMyAttendings(parties) {
  return {
    type: 'LOADED_ATTENDINGS',
    attendings: parties
  }
}

function loadedMyAttendingsEmpty() {
  return {
    type: 'LOADED_ATTENDINGS_EMPTY'
  }
}

function loadedMyPartiesEmpty() {
  return {
    type: 'LOADED_MY_PARTIES_EMPTY'
  }
}

function loadedMyPartiesAction(parties) {
  return {
    type: 'LOADED_MY_PARTIES',
    parties: parties
  }
}

function partyJoined(index) {
  return {
    type: 'PARTY_JOINED',
    index: index,
    status: 'attending'
  }
}
function genericPartyJoined() {
  return {
    type: 'GENERIC_PARTY_JOINED',
    status: 'attending'
  }
}


function partyRequested(index) {
  return {
    type: 'PARTY_REQUESTED',
    index: index,
    status: 'pending'
  }
}
function genericPartyRequested() {
  return {
    type: 'GENERIC_PARTY_REQUESTED',
    status: 'pending'
  }
}

function leavePartyAction(index) {
  return {
    type: 'PARTY_LEFT',
    index: index,
    status: 'none'
  }
}
function genericLeavePartyAction() {
  return {
    type: 'GENERIC_PARTY_LEFT',
    status: 'none'
  }
}

function genericPartyDeleteAction(partyId) {
  return {
    type: 'GENERIC_PARTY_DELETED',
    partyId: partyId
  }
}

function partyDeleted(index) {
  return {
    type: 'PARTY_DELETED',
    index: index
  }
}

function loadPartiesActionCreator(profileId, position) {
  return (dispatch) => {
    return getParties(profileId, position).then(
      (response) => {
        if (response.length === 0) {
          dispatch(loadedPartiesEmpty());
        } else {
          for (party of response) {
            party.date = party.date * 1000;
          }
          dispatch(loadedPartiesAction(response));
        }
      }
    ).catch((error) => {
      return error;
    });
  }
}

function loadPartyByIdActionCreator(partyId, profileId, location) {
  return (dispatch) => {
    return getParty(partyId, profileId, location).then(
      (response) => {
        response.date = response.date * 1000;
        dispatch(loadedPartyAction(response));
      }
    ).catch((error) => {
      return error;
    })
  }
}

function loadMyAttendingsActionCreator(profileId, location) {
  return (dispatch) => {
    return getAttendings(profileId, location).then(
      (response) => {
        if (response.success && response.parties.length > 0) {
          for (party of response.parties) {
            party.date = party.date * 1000
          }
          dispatch(loadedMyAttendings(response.parties));
        } else if (response.success && response.parties.length == 0) {
          dispatch(loadedMyAttendingsEmpty());
        }
      }
    )
  }
}

function loadMyPartiesActionCreator(profileId, me, location) {
  return (dispatch, getStore) => {
    return getUserParties(profileId, me, location).then(
      (response) => {
        if (response.length === 0) {
          dispatch(loadedMyPartiesEmpty())
        } else {
          let parties = [];
          const store = getStore();
          for (item of response) {
            let party = {
              ...item,
              date: item.date * 1000
            }
            parties.push(party);
          }
          dispatch(loadedMyPartiesAction(parties));
        }
        return response;
      }
    ).catch((error) => {
      return error;
    });
  }
}

function loadPartiesByUser(profileId, me) {
  return (dispatch, getStore) => {
    return getUserParties(profileId, me).then(
      (response) => {
        let parties = [];
        const store = getStore();
        for (item of response) {
          let party = {
            ...item,
            date: item.date * 1000
          }
          parties.push(party);
        }
        dispatch(loadedMyPartiesAction(parties));
      }
    ).catch((error) => {
      return error;
    });
  }
}

function joinPartyActionCreator(partyId, profileId, index, generic) {
  return (dispatch) => {
    return joinParty(partyId, profileId).then(
      (response) => {
        if (response.success) {
          switch (response.message) {
            case 'Profile requested to join party':
              if (!generic) {
                dispatch(partyRequested(index));
              } else {
                dispatch(genericPartyRequested());
              }
              return response;
              break;
          }
        }
      }
    )
  }
}

function acceptInviteRequestActionCreator(partyId, profileId, index, generic) {
  return (dispatch) => {
    return acceptInviteRequest(partyId, profileId).then(
      (response) => {
        if (!generic) {
          dispatch(partyJoined(index));
        } else {
          dispatch(genericPartyJoined());
        }

        return response;
      }
    )
  }
}

function removePartyGuestActionCreator(profileId, partyId, removeId) {
  return (dispatch) => {
    return removePartyGuest(profileId, partyId, removeId).then(
      (response) => {
        return response;
      }
    )
  }
}

function leavePartyActionCreator(partyId, profileId, index, generic) {
  return (dispatch) => {
    return leaveParty(partyId, profileId).then(
      (response) => {
        if (!generic) {
          dispatch(leavePartyAction(index));
        } else {
          dispatch(genericLeavePartyAction());
        }

        return response;
      }
    )
  }
}

function inviteToPartyActionCreator(partyId, profileId, invites) {
  return (dispatch) => {
    return inviteToParty(partyId, profileId, invites).then(
      (response) => {
        console.log('INVITE TO PARTY RESPONSE: ', response);
      }
    )
  }
}

function deletePartyActionCreator(partyId, profileId, index, generic) {
  return (dispatch) => {
    return deleteParty(partyId, profileId).then(
      (response) => {
        if (!generic) {
          dispatch(partyDeleted(index));
        } else {
          dispatch(genericPartyDeleteAction(partyId));
        }
        return response;
        console.log('DELETE PARTY RESPONSE: ', response);
      }
    )
  }
}

function acceptJoinRequestActionCreator(params) {
  return (dispatch) => {
    return acceptJoinRequest(params).then(
      (response) => {
        console.log('ACCEPT RESPONSE: ', response);
      }
    )
  }
}

function declineJoinRequestActionCreator(params) {
  return (dispatch) => {
    return declineJoinRequest(params).then(
      (response) => {
        console.log('DECLINE RESPONSE: ', response);
      }
    )
  }
}

module.exports = {
  loadPartiesActionCreator,
  joinPartyActionCreator,
  loadedPartiesAction,
  loadedPartiesEmpty,
  loadMyPartiesActionCreator,
  removePartyGuestActionCreator,
  acceptJoinRequestActionCreator,
  declineJoinRequestActionCreator,
  acceptInviteRequestActionCreator,
  deletePartyActionCreator,
  loadPartiesByUser,
  inviteToPartyActionCreator,
  leavePartyActionCreator,
  loadMyAttendingsActionCreator,
  loadPartyByIdActionCreator
}
