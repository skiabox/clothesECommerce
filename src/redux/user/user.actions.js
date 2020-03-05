import { UserActionTypes } from './user.types';

//action creator functions (returns an action - an object with a type and maybe a payload)
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
