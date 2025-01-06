import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const appendSchedule = async({title,date}) => {
  return await api.post('/schedule', {title,date});
}

export const useAppendScheduleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appendSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(["getScheduleList"]);
    },
    onError: (error) => {
      console.log('eee'. error);
    }
  })
}