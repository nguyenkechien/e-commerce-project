export type S = {
  [key: string]: any;
};
// custom interface Reducer
export interface Action {
  type: any;
}
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}
export type Reducer<S> = (state: S, action: AnyAction) => S;

export interface ReducersMapObject {
  [key: string]: Reducer<any>;
}

/**
 * @param reducers
 * @returns
 */
export const combineReducers = (reducers: ReducersMapObject): Reducer<S> => {
  return (state: any, action: any = {}) => {
    const initStateAction: S = {};
    console.log(state);
    return Object.keys(reducers).reduce((obj, reduce) => {
      obj[reduce] = reducers[reduce](state, action);
      return obj;
    }, initStateAction);
  };
};
