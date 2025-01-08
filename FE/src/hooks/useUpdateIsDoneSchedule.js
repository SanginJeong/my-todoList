import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../utils/api';

const updateIsDone = async(scheduleId) => {
  return await api.patch(`/schedule/isDone/${scheduleId}`);
}

export const useUpdateIsDoneScheduleQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : updateIsDone,
    onSuccess: (data) => {
      console.log('data',data);
      
      queryClient.invalidateQueries(["getScheduleList"]);
    },
    onError: (error) => {
      console.log(error);
    }
  })
}