import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPatternType,
  getAllPatternTypes,
} from "../service/pattern-type.service";
import { CreatePatternTypePayload } from "../types";

const KEY = "getAllPatternTypes";

export const useGetAllPatternTypes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: getAllPatternTypes,
    select: (response) => response.data,
    refetchOnWindowFocus: false,
  });

  return {
    patternTypes: data ?? [],
    isLoading,
    error,
  };
};

export const useCreatePatternType = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (payload: CreatePatternTypePayload) => createPatternType(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
  });

  return {
    create: mutateAsync,
    isLoading: isPending,
    error,
    isSuccess,
    errorMessage: error ? (error as Error).message : null,
  };
};
