import React, { Dispatch, useContext, useReducer } from 'react';

const PageContext = React.createContext<[{ [elemName: string]: any }, Dispatch<any>]>([{}, () => { }]);

export const usePageContext = () => useContext(PageContext)

export const PageProvider = ({ initialState, reducer, children }: DefaultProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <PageContext.Provider value={[state, dispatch]}>{children}</PageContext.Provider>
}

export interface DefaultProps {
  children: React.ElementType<any> | React.FC<any> | any,
  reducer: (state: any, action: any) => any,
  initialState: {},
  [elemName: string]: any
}

