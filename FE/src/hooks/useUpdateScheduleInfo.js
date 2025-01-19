import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
const updateScheduleInfo = async({id,title,date}) => {
  return await api.patch(`/schedule/${id}`, {title,date});
}

export const useUpdateScheduleInfoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateScheduleInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["getScheduleList"]);
    },
    onError: (error) =>{
      console.log(error);
    }
  })
}