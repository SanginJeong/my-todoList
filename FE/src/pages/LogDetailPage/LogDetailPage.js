import React from 'react'
import { useParams } from 'react-router'
import { useGetGroupedSchedulesQuery } from '../../hooks/useGetGroupedSchedules';
import Spinner from '../../common/LoadingSpinner/Spinner';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import dayjs from 'dayjs';
import weekOfYear from "dayjs/plugin/weekOfYear";
import Card from '../../common/card/Card';
import Dropdown from '../../common/dropdown/Dropdown';

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

  const filteredByDateScheduleList = scheduleList.reduce((acc,cur)=>{
    const existingGroup = acc.find((group)=> group.date === cur.date);

    if(existingGroup) {
      existingGroup.schedules.push(cur);
    } else {
      acc.push({date: cur.date, schedules: [cur]})
    }
    return acc
  },[])
  

  console.log('fff', filteredByDateScheduleList);
  
  if(isLoading) {
    <Spinner/>
  }

  if(isError) {
    <ErrorComponent error={error}/>
  }
  return (
    <div>
      {filteredByDateScheduleList?.map((group)=>(
        <Dropdown>
          <Dropdown.menu>
            {dayjs(group.date).format('YYYY-MM-DD')}{`  (${group.schedules.length})`}
          </Dropdown.menu>
          {group.schedules.map((schedule)=>(
            <Dropdown.item>
              <Card>
                <Card.layout className={"todo-card"}>
                  <Card.todoTitle isDone={schedule.isDone}>
                    {schedule.title}
                  </Card.todoTitle>
                </Card.layout>
              </Card>
            </Dropdown.item>
          ))}
        </Dropdown>
      ))}
    </div>
  )
}

export default LogDetailPage