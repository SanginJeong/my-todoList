import React from 'react'
import Modal from '../../../../common/modal/Modal';
import useModal from '../../../../common/modal/useModal';
import Card from '../../../../common/card/Card';


const TodoToday = ({todaySchedules,handleDeleteSchedule}) => {
  const {isOpen, onClose, selectedSchedule, selectSchedule} = useModal();
  return (
    <div className='todo-today'>
      {
        todaySchedules?.map((schedule)=>(
          <Card selectSchedule={()=>selectSchedule(schedule)}>
            <Card.layout className={"todo-card"}>
              <Card.todoTitle isDone={schedule.isDone}>
                {schedule.title}
              </Card.todoTitle>
              <Card.todoButtons>
                <button className='todo-done-btn'><i class="fa-solid fa-check"></i></button>
                <button onClick={(e)=>handleDeleteSchedule(e,schedule)} className='todo-delete-btn'><i class="fa-solid fa-trash"></i></button>
              </Card.todoButtons>
            </Card.layout>
          </Card>
        ))
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.updateScheduleForm onClose={onClose} schedule={selectedSchedule}/>
      </Modal>
    </div>
  )
}

export default TodoToday