import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatternExecutions, createPatternExecution } from "../service/patternExecution.service";
import { PatternExecutionResponse, CreatePatternExecution } from "../types/patternExecution.types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllPatternExecutions = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["pattern-executions"],
    queryFn: () => getPatternExecutions(),
    select: (response) => response.data,
  });

  return {
    patternExecutions: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreatePatternExecution = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreatePatternExecution) => createPatternExecution(data),
    mutationKey: ["createPatternExecution"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pattern-executions"] });
      queryClient.invalidateQueries({ queryKey: ["pattern-schedules"] });
    },
  });

  return {
    create: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};
