import React from 'react'
import {useGetAuthQuery} from '../hooks/useGetAuth';
import HomePage from '../pages/HomePage/HomePage';
import TodoPage from '../pages/TodoPage/TodoPage';
const PrivatePage = ({children}) => {
  const { isError } = useGetAuthQuery();
  
  if(isError){
    return <HomePage/>
  }

  return (
      <TodoPage/>
  )
}

export default PrivatePage