import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { useNavigate } from "react-router";

const userSignUp = async ({email,password,checkPassword}) => {
  return api.post('/user', {email,password,checkPassword});
}

export const useUserSignUpQuery = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userSignUp,
    onSuccess: () => {
      alert("회원가입 성공");
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
    }
  })
}