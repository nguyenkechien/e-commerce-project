import React from 'react';
import { PageProvider } from './core/PageContext';

type Props = {
  children: React.ElementType<any>,
  [elemName: string]: any
}


const App = (props: Props): JSX.Element => {
  console.log(`props`, props)
  // yes, this `props` contains data passed from the server
  // and also we can inject additional data into pages
  const { children, ...rest } = props;
  let PageComponent: any = children;

  return (<>
    <PageProvider>
      <PageComponent {...rest} />
    </PageProvider>
  </>);
};

export default App;
