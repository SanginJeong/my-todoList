import {useMutation} from '@tanstack/react-query';
import api from '../utils/api';
import { useNavigate } from 'react-router';

const userLogin = async ({email,password}) => {
  return api.post('/user/login',{email,password})
}

export const useUserLoginQuery = () => {
  const naviagte = useNavigate();
  return useMutation({
    mutationFn : userLogin,
    onSuccess: (data) => {
      if(data.data.token){
        sessionStorage.setItem('token', data.data.token);
      }
      naviagte('/');
    },
    onError: (error) => {
      console.log("로그인 실패:", error);
    }
  })
}

