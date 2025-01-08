import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const getGroupedSchedules = async() => {
  return await api.get('/schedule/group');
}

export const useGetGroupedSchedulesQuery = () => {
  return useQuery({
    queryKey: ["getGroupedSchedules"],
    queryFn: getGroupedSchedules,
    select: (result) => result.data
  })
}