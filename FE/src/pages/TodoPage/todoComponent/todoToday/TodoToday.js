import React from 'react'
import Modal from '../../../../common/modal/Modal';
import Card from '../../../../common/card/Card';
import { useGetScheduleListQuery } from '../../../../hooks/useGetScheduleList';
import { useModalStore } from '../../../../store/useModalStore';
import { useDeleteScheduleQuery } from '../../../../hooks/useDeleteSchedule';
import Spinner from '../../../../common/LoadingSpinner/Spinner';
import ErrorComponent from '../../../../common/ErrorComponent/ErrorComponent';
import { useUpdateIsDoneScheduleQuery } from '../../../../hooks/useUpdateIsDoneSchedule';
import { useUpdateScheduleInfoQuery } from '../../../../hooks/useUpdateScheduleInfo';


const TodoToday = () => {
  const {selectedSchedule,onSelectSchedule, isOpenUpdateModal, closeUpdateModal, onClickContent} = useModalStore();
  
  const {data,isError,error,isLoading} = useGetScheduleListQuery();
  const {mutate:deleteSchedule} = useDeleteScheduleQuery();
  const {mutate:updateIsDoneSchedule} = useUpdateIsDoneScheduleQuery(); 
  const {mutate:updateScheduleInfo} = useUpdateScheduleInfoQuery();
  const todaySchedules = data?.todaySchedules;

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

  if(isLoading){
    return <Spinner/>
  }

  if(isError){
    return <ErrorComponent error={error}/>
  }

  return (
    <>
      <div className='todo-today'>
        {
          todaySchedules?.map((schedule)=>(
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
          ))
        }
      </div>

      {isOpenUpdateModal &&
        <Modal onClose={closeUpdateModal} onClickContent={onClickContent}>
          <Modal.updateScheduleForm onClose={closeUpdateModal} onSubmit={(e)=>handleUpdateScheduleInfo(e,selectedSchedule)} selectedSchedule={selectedSchedule}/>
        </Modal>
      }
    </>
  )
}

export default TodoToday