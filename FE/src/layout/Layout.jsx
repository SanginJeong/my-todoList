import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router'
import './Layout.style.css';
import { useGetAuthQuery } from '../hooks/useGetAuth';
import { useQueryClient } from '@tanstack/react-query';
const Layout = () => {
  const {data} = useGetAuthQuery();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handlenavigate = (e) => {
    const url = e.target.name;
    navigate(url);
  }
  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    queryClient.setQueryData(["getAuth"], null); // 캐시 즉시 업데이트
    queryClient.invalidateQueries(["getAuth"]); // 서버와 동기화
    navigate('/');
  };

  return (
    <>
      <nav>
        <p><Link to='/'>TODO-jeong</Link></p>
        <div>
          <ul>
            <li>
              <button name='/' onClick={handlenavigate} className="nav-button">HOME</button>
            </li>
            <li>
              <button name='logs' onClick={handlenavigate} className="nav-button">LOGS</button>
            </li>
            <li>
              {data 
                ? <button onClick={handleLogout} className='nav-button'>LOGOUT</button>
                : <button name='/login' onClick={handlenavigate} className='nav-button'>LOGIN</button>
              }
            </li>
          </ul>
        </div>
      </nav>
      <Outlet/>
    </>
  )
}

export default Layout