import React from 'react'
import './Sidebar.style.css';
import { useNavigate } from 'react-router';

const Sidebar = ({groupedSchedules}) => {
  const navigate = useNavigate();
  const goDetailPage = (e) => {
    const {url} = e.target.dataset;
    navigate(url);
  }
  return (
    <div className='sidebar'>
      {groupedSchedules?.map((group)=>(
        <div data-url={group.date} onClick={goDetailPage} className='log-month'>{group.year}.  {group.month}</div>
      ))}    
    </div>
  )
}

export default Sidebar