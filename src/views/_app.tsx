import React from 'react';
import { PageProvider } from './core/PageContext';

type Props = {
  children: React.ElementType<any> | {
    Page: React.ElementType,
    StoreReducer: {
      reducer: (state: any, action: any) => any,
      initialState: any,
    }
  },
  [elemName: string]: any
}


const App = (props: Props): JSX.Element => {
  // yes, this `props` contains data passed from the server
  // and also we can inject additional data into pages
  const { children, ...rest } = props;

  // we can wrap this PageComponent for persisting layout between page changes
  console.log(`props`, props)
  let PageComponent: any = children;
  let Store = { initialState: {}, reducer: (state: any, action: any) => { } };
  if (typeof children === 'object') {
    PageComponent = children.Page;
    Store = { ...children.StoreReducer }
  }
  return (<>
    <PageProvider initialState={Store.initialState} reducer={Store.reducer} >
      <PageComponent {...rest} />
    </PageProvider>
  </>);
};

export default App;
