import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActivity, getActivities } from "../service";
import { AxiosError } from "axios";
import { CreateActivity } from "../types";

export const useGetAllActivities = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities(),
    select: (response) => response.data,
  });

  return {
    activities: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (activity: CreateActivity) => createActivity(activity),
    mutationKey: ["createActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const getErrorMessage = (err: unknown): string | undefined => {
    if (err && (err as AxiosError<{ message?: string }>).response?.data?.message) {
      return (err as AxiosError<{ message?: string }>).response?.data?.message;
    }
    return (err as Error)?.message;
  };

  return {
    create: mutateAsync,
    error,
    errorMessage: getErrorMessage(error),
    isError,
    isLoading: isPending,
  };
};
