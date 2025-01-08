import React, { createContext, useContext, useState } from 'react'
import { useDeleteScheduleQuery } from '../../../hooks/useDeleteSchedule';
import { useUpdateIsDoneScheduleQuery } from '../../../hooks/useUpdateIsDoneSchedule';
import { useAppendScheduleQuery } from '../../../hooks/useAppendSchedule';
import { useUpdateScheduleInfoQuery } from '../../../hooks/useUpdateScheduleInfo';

const TodoContext = createContext();
export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedSchedule, setClickedSchedule] = useState(null);

  const {mutate: deleteSchedule} = useDeleteScheduleQuery();
  const {mutate: updateIsDone} = useUpdateIsDoneScheduleQuery();
  const {mutate: appendSchedule} = useAppendScheduleQuery();
  const {mutate: updateScheduleInfo} = useUpdateScheduleInfoQuery();

  const handleOpenModal = () => {
  setIsOpen(true);
  setClickedSchedule(null);
}

  const handleCloseModal = () => {
  setIsOpen(false);
}

  const handleDone =(scheduleId,e) => {
  e.stopPropagation();
  updateIsDone(scheduleId);
}
  const handleDeleteSchedule = (scheduleId,e) => {
  e.stopPropagation();
  deleteSchedule(scheduleId);
}

  const handleSchedule = (schedule) => {
  setIsOpen(true);
  setClickedSchedule(schedule)
}

  const handleContentClick = (e) => {
  e.stopPropagation();
};

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const title = formData.get("title") || clickedSchedule?.title;
    const date = formData.get("date") || clickedSchedule?.date;
    if(!clickedSchedule){ // 추가 모드
      appendSchedule({title,date});
    } else { // 업데이트 모드
      updateScheduleInfo({scheduleId: clickedSchedule._id , title, date});
    }
    setIsOpen(false);
  }

  return (
    <TodoContext.Provider
      value={{
        isOpen,
        setIsOpen,
        clickedSchedule,
        handleOpenModal,
        handleCloseModal,
        handleDone,
        handleDeleteSchedule,
        handleSchedule,
        handleSaveSchedule,
        handleContentClick,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}