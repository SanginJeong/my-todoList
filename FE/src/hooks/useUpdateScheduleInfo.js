import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
const updateScheduleInfo = async({scheduleId,title,date}) => {
  return await api.patch(`/schedule/${scheduleId}`, {title,date});
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