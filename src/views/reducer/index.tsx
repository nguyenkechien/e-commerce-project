import { combineReducers, S } from '../core/combineReducers';
import { home } from './home';

const appReducer = combineReducers({
  home
})
const rootReducer = (state?: any, action?: any): S => {
  return appReducer(state, action)
}
const initialState = rootReducer();
export {
  rootReducer,
  initialState
};
