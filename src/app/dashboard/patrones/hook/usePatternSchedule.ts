import { useQuery } from "@tanstack/react-query";
import { getPatternSchedules } from "../service/patternSchedule.service";

export const useGetAllPatternSchedules = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["pattern-schedules"],
    queryFn: () => getPatternSchedules(),
    select: (response) => response.data,
  });

  return {
    patternSchedules: data ?? [],
    error,
    isError,
    isLoading,
  };
};
