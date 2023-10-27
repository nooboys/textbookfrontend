import { ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.reducer';
import { removeLoggedInUser } from './views/public/authentication/store/authentication.action';

const STORE_KEYS_TO_PERSIST = ['authenticationState', 'userState', 'branchState', 'poState'];

function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({ keys: STORE_KEYS_TO_PERSIST, rehydrate: true })(
    reducer
  );
}

function logOut(reducer: ActionReducer<AppState>): ActionReducer<any> {
  return (state: AppState, action: Action) => {
    if (action.type === removeLoggedInUser.type) {
      state = {} as AppState;
    }
    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<AppState, Action>> = [
  localStorageSyncReducer,
  logOut,
];
