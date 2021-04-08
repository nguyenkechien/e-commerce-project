import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Head } from '@react-ssr/nestjs-express';
import { Pagination } from '../components/pagination';
import { getListPages } from '../../helpers';

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

const Index = ({ payload, message }: IndexProps) => {
  const onChange = (pageNum: number) => {
    console.log(`pageNum`, pageNum);
  }
  return (
    <React.Fragment>
      <Head>
        <title>An example of @react-ssr/nestjs-express</title>
      </Head>
      <p>Home page</p>
      <p>{message}</p>
      <a href="/about">Go to the about page</a>
      {payload.items.map((item) => {
        return (
          <div key={item._id}>
            <span>Name: </span>
            <span>{item.name}</span>
          </div>
        )
      })}
      <Pagination pages={getListPages(payload.pages, payload.curentPage)} onChange={onChange} />
    </React.Fragment>
  );
};

export default Index
