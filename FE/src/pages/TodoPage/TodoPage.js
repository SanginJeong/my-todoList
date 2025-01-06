import React, { useState } from 'react'
import './TodoPage.style.css';
import TodoModal from './TodoModal/TodoModal';
import { useGetScheduleListQuery } from '../../hooks/useGetScheduleList';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../common/LoadingSpinner/Spinner';
import TodoCard from './TodoCard/TodoCard';
import { useDeleteScheduleQuery } from '../../hooks/useDeleteSchedule';

const TodoPage = () => {
  // 할 일 추가하기 : 제목, 날짜
  // TodoPage : 내 todolist 불러오기, today, this-week에 날짜별로 필터링 후 TodoItem 렌더링
  // TodoCard : 클릭 시 TodoModal (todo들의 정보 및 변경모달), 드래그 시 날짜를 옮길 수 있다. 순서도 바꾸기 가능
  // Thisweek : 6일간의 드롭다운 메뉴들로 구성. TodoCard를 끌어 놓을 시 해당 날짜의 드롭다운 하위메뉴로 이동
  const [isOpen, setIsOpen] = useState(false);
  const [clickedSchedule, setClickedSchedule] = useState(null);
  const {data:scheduleList, isLoading, isError, error} = useGetScheduleListQuery();
  const {mutate: deleteSchedule} = useDeleteScheduleQuery();
  
  console.log('sss', scheduleList);
  
  const handleOpenModal = () => {
    setIsOpen(true);
    setClickedSchedule(null);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleDone = (e) => {
    e.stopPropagation();
    
  }
  const handleDeleteSchedule = (scheduleId,e) => {
    e.stopPropagation();
    deleteSchedule(scheduleId);
  }

  const handleSchedule = (schedule) => {
    setIsOpen(true);
    setClickedSchedule(schedule)
  }


  if(isError){
    return <ErrorComponent error={error}/>
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <div className='todo-append-area'>
        <button onClick={handleOpenModal}>New Schedule</button>
      </div>
      <div className='todo-page'>
        <div className="today">
          <p className='todo-title'>TODAY</p>
          {scheduleList?.todaySchedules.map((schedule)=>(
            <TodoCard handleSchedule = {handleSchedule} schedule={schedule} handleDeleteSchedule={handleDeleteSchedule}/>
          ))}
        </div>
        <div className="this-week">
          <p className='todo-title'>THIS WEEK</p>
          {scheduleList?.allSchedules.map((schedule)=>(
            <TodoCard handleSchedule = {handleSchedule} schedule={schedule} handleDeleteSchedule={handleDeleteSchedule}/>  
          ))}
        </div>
      </div>
      <TodoModal clickedSchedule={clickedSchedule} setIsOpen={setIsOpen} isOpen={isOpen} handleCloseModal = {handleCloseModal} />
    </>
  )
}

export default TodoPage