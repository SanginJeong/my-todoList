import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import { useUserSignUpQuery } from '../../hooks/useUserSignUp';
import ErrorComponent from '../../common/ErrorComponent/ErrorComponent';

const SignUpPage = () => {
  const [signUpForm, setSignUpForm] = useState({email: "", password: "", checkPassword: ""});
  const navigate = useNavigate();
  const {mutate: userSignUp, isError, error} = useUserSignUpQuery();
  const handleback = () => {
    navigate('/login');
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    userSignUp(signUpForm);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSignUpForm((prev)=>({
      ...prev,
      [name]: value,
    }))
  }
  return (
    <div className="login-page-wrapper">
      <form onSubmit={handleSignUp} className="login-form">
        <input name='email' value={signUpForm.email} onChange={handleChange} type="text" placeholder="Email" className="login-input" />
        <input name='password' value={signUpForm.password} onChange={handleChange} type="password" placeholder="Password" className="login-input" />
        <input name='checkPassword' value={signUpForm.checkPassword} onChange={handleChange} type="password" placeholder="Password Check" className="login-input" />
        <button type='submit' className='login-button'>COMPLETE</button>
        <button type='button' onClick={handleback} className='login-button'>GO BACK</button>
        {isError && <ErrorComponent error={error}/>}
      </form>
    </div>
  )
}

export default SignUpPage