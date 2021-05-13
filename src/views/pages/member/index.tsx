import React from 'react';
import { Props } from './member.interface';

const Member = (props: Props) => {
  console.log(props.user.name);
  return (
    <>
      <React.Fragment>
        <div>{JSON.stringify(props.user.role.name)}</div>
      </React.Fragment>
    </>
  );
};

export default Member
