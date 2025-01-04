import React, { useState } from 'react'
import './LoginPage.style.css';
import { useNavigate } from 'react-router';
import { useUserLoginQuery } from '../../hooks/useUserLogin';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({email: "", password: ""});

  const naviagte = useNavigate();
  const {mutate:userLogin, isLoading, isError, error} = useUserLoginQuery();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginForm((prev)=>({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(loginForm);
  }

  const handleSignUp = () => {
    naviagte('/signup');
  }
  
  return (
    <div className="login-page-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <input name='email' value={loginForm.email} onChange={handleChange} type="text" placeholder="Email" className="login-input" />
        <input name='password' value={loginForm.password} onChange={handleChange} type="password" placeholder="Password" className="login-input" />
        <button type='submit' className="login-button">Log In</button>
        <button onClick={handleSignUp} type="button" className="signup-button">Sign Up</button>
        {isError && <ErrorComponent error={error}/>}
      </form>
    </div>
  )
}

export default LoginPage