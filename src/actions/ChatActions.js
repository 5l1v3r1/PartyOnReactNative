const {
  getChats,
  getChatThread,
  createChat,
  readChatThread
} = require('../api/PartyOnAPI');

function chatsLoaded(chats) {
  return {
    type: 'CHATS_LOADED',
    chats: chats
  }
}

function chatsLoadedEmpty() {
  return {
    type: 'CHATS_EMPTY'
  }
}

function addChatEntryAction(chatId, message) {
  return {
    type: 'CHAT_ADDED',
    chatId: chatId,
    message: message
  }
}

function currentChatLoaded(chat) {
  return {
    type: 'CURRENT_CHAT_LOADED',
    chat: chat
  }
}

function chatCreated() {
  return {
    type: 'CHAT_CREATED'
  }
}

function setChatCount(count) {
  return {
    type: 'SET_CHAT_COUNT',
    count: count
  }
}

function setMessageStatusUnread(chatId) {
  return {
    type: 'SET_MESSAGE_STATUS_UNREAD',
    chatId: chatId
  }
}

function setMessageStatusRead(chatId, count) {
  return {
    type: 'SET_MESSAGE_STATUS_READ',
    chatId: chatId,
    count: count
  }
}


function fetchChatsActionCreator(profileId) {
  return (dispatch) => {
    return getChats(profileId).then(
      (response) => {
        if (response.empty) {
          dispatch(chatsLoadedEmpty());
        } else {
          for (var i = 0; i < response.chats.length; i++) {
            response.chats[i].profile.fullName = `${response.chats[i].profile.firstname} ${response.chats[i].profile.lastname}`;
          }
          dispatch(chatsLoaded(response.chats));
          dispatch(setChatCount(response.unread))
        }
        return response;
      }
    )
  }
}

function fetchCurrentChatThreadActionCreator(chatId, profileId) {
  return (dispatch) => {
    return getChatThread(chatId, profileId).then(
      (response) => {
        dispatch(currentChatLoaded(response))
        return response;
      }
    )
  }
}

function createChatActionCreator(from, to, message) {
  return (dispatch) => {
    return createChat(from, to, message).then(
      (response) => {
        dispatch(chatCreated());
        return response;
      }
    )
  }
}

function readChatThreadActionCreator(chatId, profileId) {
  return (dispatch) => {
    return readChatThread(chatId, profileId).then(
      (response) => {
        return response;
      }
    )
  }
}


module.exports = {
  fetchChatsActionCreator,
  createChatActionCreator,
  fetchCurrentChatThreadActionCreator,
  readChatThreadActionCreator,
  addChatEntryAction,
  setMessageStatusUnread,
  setMessageStatusRead,
  setChatCount
};
