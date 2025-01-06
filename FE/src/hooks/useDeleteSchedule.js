import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

const deleteSchedule = async(scheduleId) => {
  return await api.delete(`/schedule/${scheduleId}`);
}

export const useDeleteScheduleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries(["getScheduleList"]);
    },
    onError: (error) => {
      console.log(error);
    }
  })
}