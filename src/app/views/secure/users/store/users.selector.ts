import { AppState } from 'src/app/app.reducer';

export const selectUserState = (state: AppState) => state.userState;
