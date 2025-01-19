import React from 'react'
import ErrorComponent from "../../common/ErrorComponent/ErrorComponent";
import Spinner from "../../common/LoadingSpinner/Spinner";
import Sidebar from './Sidebar/Sidebar';
import './LogPage.style.css';
import { Outlet } from 'react-router';
import { useGetGroupedSchedulesQuery } from '../../hooks/useGetGroupedSchedules';



const LogPage = () => {
  const {data, isLoading, isError, error} = useGetGroupedSchedulesQuery();
  console.log('ddd',data);
  
  if(isError) {
    return <ErrorComponent error={error}/>
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className='log-page'>
      <div className='log-sidebar-area'>
        <Sidebar groupedSchedules={data?.groupedSchedules}/>
      </div>
      
      <div className='log-detail-area'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LogPage