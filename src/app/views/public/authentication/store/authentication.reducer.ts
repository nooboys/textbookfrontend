import { createReducer, on } from '@ngrx/store';
import { removeLoggedInUser, setLoggedInUser } from './authentication.action';

export const initialState = {
  name: '',
  email: '',
  token: '',
};

export const authenticationReducer = createReducer(
  initialState,
  on(setLoggedInUser, (initialState, { name, email, token }) => ({
    ...initialState,
    ...{
      name,
      email,
      token,
    },
  })),
  on(removeLoggedInUser, () => initialState)
);
