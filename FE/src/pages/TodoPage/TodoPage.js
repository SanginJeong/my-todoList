import React from 'react'
import './TodoPage.style.css';
import TodoToday from './todoComponent/todoToday/TodoToday';
import TodoWeek from './todoComponent/todoWeek/TodoWeek';
import Modal from '../../common/modal/Modal';
import useModal from '../../common/modal/useModal';
import { useAppendScheduleQuery } from '../../hooks/useAppendSchedule';
import { useDeleteScheduleQuery } from '../../hooks/useDeleteSchedule';
import { useGetScheduleListQuery } from '../../hooks/useGetScheduleList';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../common/LoadingSpinner/Spinner';

const TodoPage = () => {
  const {isOpen, openModal, onClose} = useModal(); // context api는 isOpen을 공유하기 떄문에 에러 (props로 전달하지 않는이유도)
  const {mutate: appendSchedule} = useAppendScheduleQuery();
  const {data,isError,error,isLoading} = useGetScheduleListQuery();
  const {mutate:deleteSchedule} = useDeleteScheduleQuery();
  const todaySchedules = data?.todaySchedules;
  const thisWeekSchedules = data?.thisWeekSchedules;

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const date = formData.get("date");
    appendSchedule({title,date});
    onClose();
  }
  
  const handleDeleteSchedule = (e, schedule) => {
    e.stopPropagation();
    deleteSchedule(schedule._id)
  }

  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return <ErrorComponent error={error}/>
  }

  return (
    <div className="todo-page">
      <div className='add-schedule-area'>
        <button onClick={openModal}>ADD Schedule</button>
      </div>

      <div className='todo-area'>
        <TodoToday handleDeleteSchedule={handleDeleteSchedule} todaySchedules={todaySchedules}/>
        <TodoWeek handleDeleteSchedule={handleDeleteSchedule} thisWeekSchedules={thisWeekSchedules}/>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.addScheduleForm onClose={onClose} handleAddSchedule={handleAddSchedule}/>
      </Modal>
    </div>
  )
}

export default TodoPage;