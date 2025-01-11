import React from 'react';
import Modal from '../../../../common/modal/Modal';
import useModal from '../../../../common/modal/useModal';
import Card from '../../../../common/card/Card';
import Dropdown from '../../../../common/dropdown/Dropdown';
import dayjs from 'dayjs';

const TodoWeek = ({ handleDeleteSchedule, thisWeekSchedules }) => {
  const { isOpen, onClose, selectedSchedule, selectSchedule } = useModal();
  console.log('tjos',thisWeekSchedules);
  
  return (
    <div className="todo-today">
      {thisWeekSchedules?.map((group) =>
        <Dropdown>
          <Dropdown.menu>
            {dayjs(group.date).format('YYYY-MM-DD')}  {`(${group.schedules.length})`}
          </Dropdown.menu>
          {group.schedules.map((schedule)=>(
            <Dropdown.item>
              <Card selectSchedule={() => selectSchedule(schedule)}>
                <Card.layout className="todo-card">
                  <Card.todoTitle isDone={schedule.isDone}>
                    {schedule.title}
                  </Card.todoTitle>
                  <Card.todoButtons>
                    <button className="todo-done-btn">
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      onClick={(e) => handleDeleteSchedule(e,schedule)}
                      className="todo-delete-btn"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </Card.todoButtons>
                </Card.layout>
              </Card>
            </Dropdown.item>
          ))}
        </Dropdown>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.updateScheduleForm onClose={onClose} schedule={selectedSchedule} />
      </Modal>
    </div>
  );
};

export default TodoWeek;
