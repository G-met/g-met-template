import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service";


export const useGetAllUsers = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    select: (response) => response.data,
  });

  return {
    users: data ?? [],
    error,
    isError,
    isLoading,
  };
};
