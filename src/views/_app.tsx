import React from 'react';

type Props = {
  children: React.ElementType,
  [elemName: string]: any
}


const App = (props: Props): JSX.Element => {
  // yes, this `props` contains data passed from the server
  // and also we can inject additional data into pages
  const { children, ...rest } = props;

  // we can wrap this PageComponent for persisting layout between page changes
  console.log(props)
  const PageComponent = children;

  return (<>
    <PageComponent {...rest} />
  </>);
};

export default App;
