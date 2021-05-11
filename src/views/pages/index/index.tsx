import React, { useEffect, useState } from 'react';
import { Head } from '@react-ssr/nestjs-express';
import { Pagination } from '../../components/atoms/pagination';
import { storeSelector, storeDispatch } from '../../store/hooks';
import { increment, selectCount, incrementAsync, selectCountStatus } from '../../store/counter/counterSlice';
import { Button } from '../../components/atoms/button/index';
import { getListPages } from '../../utils/helper';
import { rolesService } from '../../services/roles.service';

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
  const counter = storeSelector(selectCount);
  const statusCounter = storeSelector(selectCountStatus);

  const dispatch = storeDispatch();
  const onChange = (pageNum: number) => {
    console.log(`pageNum`, pageNum);
  }

  const btnClick = () => {
    dispatch(incrementAsync(1))
  }

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     const res = await rolesService.get();
  //     console.log(res);
  //   };
  //   fetchRoles()
  // }, [])

  return (
    <React.Fragment>
      <Head>
        <title>E-commerce project</title>
      </Head>
      <p>Home page</p>
      <p>{message}</p>
      <a href="/about">Go to the about page</a>
      <p>{counter}</p>
      <Button
        className="btn-custom"
        primary
        onClick={() => btnClick()}
        loading={statusCounter === 'loading'}
      >
        increment
      </Button>
      {/* {payload.items.map((item) => {
        return (
          <div key={item._id}>
            <span>Name: </span>
            <span>{item.name}</span>
          </div>
        )
      })} */}
      {/* <Pagination pages={getListPages(payload.pages, payload.curentPage)} onChange={onChange} /> */}
    </React.Fragment>
  );
};

export default Index
