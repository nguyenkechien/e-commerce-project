import { AnyAction } from '../core/combineReducers';
export const initialStateHome = {
  banner: {},
};

const reducer = (state = initialStateHome, action: AnyAction) => {
  const actionsState = [
    {
      type: 'PAGINATION',
      action: (payload: any) => {
        return {
          ...state,
          currentNum: payload,
        };
      },
    },
  ]
    .find(o => o.type === action.type)
    ?.action(action.paload);
  return { ...state, ...actionsState };
};

export const home = reducer;
