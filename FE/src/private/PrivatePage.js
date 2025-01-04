import React, { useEffect } from 'react'
import {useGetAuthQuery} from '../hooks/useGetAuth';
import HomePage from '../pages/HomePage/HomePage';
import TodoPage from '../pages/TodoPage/TodoPage';
import { useQueryClient } from '@tanstack/react-query';
const PrivatePage = () => {
  const {data, isLoading, isError,error} = useGetAuthQuery();
  const queryClient = useQueryClient();


  if(isError){
    return <HomePage/>
  }

  return (
      <TodoPage/>
  )
}

export default PrivatePage