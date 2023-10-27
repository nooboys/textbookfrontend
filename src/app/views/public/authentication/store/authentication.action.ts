import { createAction, props } from '@ngrx/store';
import { AuthenticationState } from '../authentication.model';

export const setLoggedInUser = createAction(
  '[User login] Set logged In user',
  props<AuthenticationState>()
);

export const removeLoggedInUser = createAction(
  '[User login] Remove logged In user'
);
