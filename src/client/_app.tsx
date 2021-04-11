import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './assets/scss/core.scss';

type Props = {
  children: React.ElementType<any>,
  [elemName: string]: any
}


const App = (props: Props): JSX.Element => {
  console.log(`props`, props)
  // yes, this `props` contains data passed from the server
  // and also we can inject additional data into pages
  const { children, ...rest } = props;
  const PageComponent = children;

  return (<>
    <Provider store={store}>
      <PageComponent {...rest} />
    </Provider>
  </>);
};

export default App;
