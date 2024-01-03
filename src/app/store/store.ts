import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

import { loggerMiddleware } from './middleware';
import { authReducer } from '../pages/auth/auth.reducers';
import { birdReducer } from '../pages/birds/bird.reducer';
import { userReducer } from '../pages/users/user.reducer';
import {dashboardReducer} from "../pages/dashboard/dashboard.reducer";
import {predictionReducer} from "../pages/prediction/prediction.reducer";

export type RootState = ReturnType<typeof rootReducer>;

export type RootAction = AnyAction;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

export const rootReducer = combineReducers({
  auth: authReducer,
  birds: birdReducer,
  users: userReducer,
  dashboard : dashboardReducer,
  prediction : predictionReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, thunk)));

export default store;
