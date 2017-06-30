
type State = {
  tab: Tab;
  toggle: Toggle;
  tabIndex: ?number;
  initialRoute: initialRoute;
  barStyle: BarStyle;
};

const initialState: State = {
  tab: 'home',
  tabIndex: 0,
  initialRoute: null,
  barStyle: 'default'
};

function navigation(state: State = initialState, action) {
  if (action.type === 'SWITCH_TAB') {
    switch (action.tab) {
      case 'home':
        return {
          ...state,
          tab: action.tab,
          tabIndex: 0
        }
        break;
      case 'shouts':
        return {
          ...state,
          tab: action.tab,
          tabIndex: 1
        }
        break;
      case 'chat':
        return {
          ...state,
          tab: action.tab,
          tabIndex: 2
        }
        break;
      case 'profile':
        return {
          ...state,
          tab: action.tab,
          tabIndex: 3
        }
        break;
    }
  }

  if (action.type === 'TOGGLE_BARSTYLE') {
    if (state.barStyle === 'default') {
      return {
        ...state,
        barStyle: 'light-content'
      }
    } else {
      return {
        ...state,
        barStyle: 'default'
      }
    }
  }

  if (action.type === 'LOGGED_IN') {
    return {
      ...state,
      initialRoute: action.initialRoute,
    }
  }

  if (action.type === 'LOGGED_OUT') {
    return {
      ...state,
      initialRoute: action.initialRoute
    }
  }

  return state;
}

module.exports = navigation;
