type State = {
  gender: Gender;
  lower_age: LowerAge;
  upper_age: UpperAge;
  distance: ?number;
};

const initialState: State = {
  gender: 'both',
  age_from: 18,
  age_to: 50,
  distance: 100
};

function filter(state: State = initialState, action) {

  if (action.type === 'SET_FILTER') {
    return action.filter
  }

  if (action.type === 'SET_FILTER_AGE') {
    return {
      ...state,
      age_from: action.age[0],
      age_to: action.age[1]
    }
  }

  if (action.type === 'SET_FILTER_DISTANCE') {
    return {
      ...state,
      distance: action.distance
    }
  }

  if (action.type === 'SET_FILTER_GENDER') {
    return {
      ...state,
      gender: action.gender
    }
  }


  return state;
}

module.exports = filter;
