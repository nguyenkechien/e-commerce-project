import React, { Dispatch, useContext, useReducer } from 'react';
import { rootReducer, initialState } from '../reducer';

const PageContext = React.createContext<[{ [elemName: string]: any }, Dispatch<any>]>([{}, () => { }]);

export const usePageContext = () => useContext(PageContext)

export const PageProvider = ({ children }: DefaultProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return <PageContext.Provider value={[state, dispatch]}>{children}</PageContext.Provider>
}

export interface DefaultProps {
  children: React.ElementType<any> | React.FC<any> | any,
  // reducer: (state: any, action: any) => any,
  // initialState: {},
  [elemName: string]: any
}

