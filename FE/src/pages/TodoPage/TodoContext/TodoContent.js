import TodoModal from '../TodoModal/TodoModal';
import { useGetScheduleListQuery } from '../../../hooks/useGetScheduleList';
import ErrorComponent from '../../../common/ErrorComponent/ErrorComponent';
import Spinner from '../../../common/LoadingSpinner/Spinner';
import TodoCard from '.././TodoCard/TodoCard';
import { useTodo } from './TodoContext';
import Dropdown from '../Dropdown/Dropdown';

export const TodoContent = () => {
  const {data:scheduleList, isLoading, isError, error} = useGetScheduleListQuery();
  const {
    isOpen, 
    setIsOpen, 
    clickedSchedule, 
    handleCloseModal, 
    handleOpenModal, 
    handleDone, 
    handleDeleteSchedule, 
    handleSchedule, 
    handleSaveSchedule,
    handleContentClick,
  } = useTodo();
  
  console.log('sss',scheduleList);
  

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
            <TodoCard handleDone = {handleDone} handleSchedule = {handleSchedule} schedule={schedule} handleDeleteSchedule={handleDeleteSchedule}/>
          ))}
        </div>
        <div className="this-week">
          <p className='todo-title'>THIS WEEK</p>
          {scheduleList?.thisWeekSchedules.map((day) => (
            <Dropdown day={day}>
              {day.schedules.map((schedule) => (
                <TodoCard
                  handleDone={handleDone}
                  handleSchedule={handleSchedule}
                  schedule={schedule}
                  handleDeleteSchedule={handleDeleteSchedule}
                />
              ))}
            </Dropdown>
          ))}
        </div>
      </div>
      <TodoModal handleContentClick={handleContentClick} handleSaveSchedule={handleSaveSchedule} clickedSchedule={clickedSchedule} setIsOpen={setIsOpen} isOpen={isOpen} handleCloseModal = {handleCloseModal} />
    </>
  )
}
