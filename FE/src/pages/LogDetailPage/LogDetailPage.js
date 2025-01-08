import React from 'react'
import { useParams } from 'react-router'
import { useGetGroupedSchedulesQuery } from '../../hooks/useGetGroupedSchedules';
import Spinner from '../../common/LoadingSpinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import dayjs from 'dayjs';
import weekOfYear from "dayjs/plugin/weekOfYear";

const LogDetailPage = () => {
  const {id} = useParams();
  dayjs.extend(weekOfYear);
  const {data, isLoading, isError, error} = useGetGroupedSchedulesQuery();
  const scheduleList = data?.groupedSchedules.reduce((acc,cur)=>{
    if(cur.date === id){
      acc=cur.scheduleList
    }
    return acc
  },[])

  

  if(isLoading) {
    <Spinner/>
  }

  if(isError) {
    <ErrorComponent error={error}/>
  }
  return (
    <div>

      {/* {scheduleList?.map((schedule)=>(
        <>
          <div>{schedule.date}</div>
          <div>{schedule.title}</div>
        </>
      ))} */}
    </div>
  )
}

export default LogDetailPage