import React, { useState } from 'react';
import { Head } from '@react-ssr/nestjs-express';

interface IndexProps {
  message: string;
  payload: {
    items: [{
      _id: string
      name: string
      createdAt: string
      updatedAt: string
    }],
    total: number,
    pages: number,
    curentPage: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
  }
}

const Login = ({ payload, message }: IndexProps) => {
  const onChange = (pageNum: number) => {
    console.log(`pageNum`, pageNum);
  }
  return (
    <React.Fragment>
      <Head>
        <title>An example of @react-ssr/nestjs-express</title>
      </Head>
      Login page
    </React.Fragment>
  );
};

const reducer = (state: any, action: any) => {

}

const initialState = {
}

export default Login
