import React, { useState } from 'react';
import Modal from '../../../../common/modal/Modal';
import Card from '../../../../common/card/Card';
import Dropdown from '../../../../common/dropdown/Dropdown';
import dayjs from 'dayjs';
import { useGetScheduleListQuery } from '../../../../hooks/useGetScheduleList';
import { useModalStore } from '../../../../store/useModalStore';
import { useUpdateScheduleInfoQuery } from '../../../../hooks/useUpdateScheduleInfo';
import ErrorComponent from '../../../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../../../common/LoadingSpinner/Spinner';
import { useDeleteScheduleQuery } from '../../../../hooks/useDeleteSchedule';
import { useUpdateIsDoneScheduleQuery } from '../../../../hooks/useUpdateIsDoneSchedule';

const TodoWeek = () => {
  const {data,isError, error, isLoading} = useGetScheduleListQuery();
  const thisWeekSchedules = data?.thisWeekSchedules;
  const {isOpenUpdateModal, closeUpdateModal, onClickContent, selectedSchedule, onSelectSchedule} = useModalStore();
  const {mutate:updateScheduleInfo} = useUpdateScheduleInfoQuery();
  const {mutate: deleteSchedule} = useDeleteScheduleQuery();
  const {mutate: updateIsDoneSchedule} = useUpdateIsDoneScheduleQuery();

  const handleDeleteSchedule = (e,schedule) => {
    e.stopPropagation();
    deleteSchedule(schedule._id);
  }

  const handleUpdateIsDoneSchedule = (e, schedule) => {
    e.stopPropagation();
    updateIsDoneSchedule(schedule._id)
  }
  
  const handleUpdateScheduleInfo = (e, schedule) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const title = formData.get("title");
      const date = formData.get("date");
      if(!title) {
        throw new Error ("제목을 입력하세요.");
      }
      updateScheduleInfo({id: schedule._id, title, date});
      closeUpdateModal();
    } catch (error) {
      alert(error.message);
    }
  }

  if(isError) {
    return <ErrorComponent error={error}/>
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <div className="todo-week">
      {thisWeekSchedules?.map((group) =>
        <Dropdown>
          <Dropdown.menu>
            {dayjs(group.date).format('YYYY-MM-DD')}{`  (${group.schedules.length})`}
          </Dropdown.menu>
          {group.schedules.map((schedule)=>(
            <Dropdown.item>
              <Card>
                <Card.onSelect onSelectSchedule={()=>onSelectSchedule(schedule)}>
                  <Card.layout className={"todo-card"}>
                    <Card.todoTitle isDone={schedule.isDone}>
                      {schedule.title}
                    </Card.todoTitle>
                    <Card.todoButtons>
                      <button onClick={(e)=>handleUpdateIsDoneSchedule(e,schedule)} className='todo-done-btn'><i class="fa-solid fa-check"></i></button>
                      <button onClick={(e)=>handleDeleteSchedule(e,schedule)} className='todo-delete-btn'><i class="fa-solid fa-trash"></i></button>
                    </Card.todoButtons>
                  </Card.layout>
                </Card.onSelect>
              </Card>
            </Dropdown.item>
          ))}
        </Dropdown>
      )}

      {isOpenUpdateModal &&
        <Modal onClose={closeUpdateModal} onClickContent={onClickContent}>
          <Modal.updateScheduleForm onClose={closeUpdateModal} onSubmit={(e)=>handleUpdateScheduleInfo(e,selectedSchedule)} selectedSchedule={selectedSchedule}/>
        </Modal>
      }
    </div>
  );
};

export default TodoWeek;
