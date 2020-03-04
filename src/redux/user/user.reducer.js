const INITIAL_STATE = {
  currentUser: null
};

// if state is undefined it falls back to the default value, but if it is null it will stay null because null is consider a value
// state is passed from the redux store to the reducer every time an action is fired
// we use switch because every reducer gets all actions
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload //payload is user as defined in the user action (action is an object with a type and sometimes a payload)
      };

    default:
      return state;
  }
};

export default userReducer;
