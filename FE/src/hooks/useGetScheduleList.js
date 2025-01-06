import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const getScheduleList = async() => {
  return await api.get('/schedule')
}

export const useGetScheduleListQuery = () => {
  return useQuery({
    queryKey: ["getScheduleList"],
    queryFn: getScheduleList,
    select: (response) => response.data
  })
}