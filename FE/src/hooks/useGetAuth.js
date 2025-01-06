import { useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const getAuth = async () => {
  const token = sessionStorage.getItem('token');
  if(!token){
    throw new Error("No Token");
  }
  return api.get('/user')
}
export const useGetAuthQuery = () => {
  return useQuery({
    queryKey: ["getAuth"],
    queryFn: getAuth,
    retry: false,
  })
}