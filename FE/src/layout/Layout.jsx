import React from 'react'
import { Outlet, Link } from 'react-router'
import './Layout.style.css';
const Layout = () => {
  return (
    <>
      <nav>
        <p><Link to='/'>TODO-jeong</Link></p>
        <div>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/logs'>LOGS</Link></li>
            <li><Link to='/login'>LOGIN</Link></li>
          </ul>
        </div>
      </nav>
      <Outlet/>
    </>
  )
}

export default Layout