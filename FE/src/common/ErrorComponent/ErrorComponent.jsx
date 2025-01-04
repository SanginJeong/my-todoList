import React from 'react'
import './ErrorComponent.style.css';
// 에러모달과는 다른 에러 메시지입니다.
const ErrorComponent = ({error}) => {
  return (
    <h3 className='error-component'>{error.message}</h3>
  )
}

export default ErrorComponent