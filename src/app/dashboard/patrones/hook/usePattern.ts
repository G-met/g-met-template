import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPatterns,
  createPattern,
  createMetrologicalData,
  createComplementaryData,
  getPatternByCode,
} from "../service";
import {
  CreatePattern,
  CreateMetrologicalData,
  CreateComplementaryData,
} from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllPatterns = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["patterns"],
    queryFn: () => getPatterns(),
    select: (response) => response.data,
  });

  return {
    patterns: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreatePattern = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (pattern: CreatePattern) => createPattern(pattern),
    mutationKey: ["createPattern"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns"] });
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

export const useCreateMetrologicalData = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateMetrologicalData) => createMetrologicalData(data),
    mutationKey: ["createMetrologicalData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns"] });
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

export const useCreateComplementaryData = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateComplementaryData) =>
      createComplementaryData(data),
    mutationKey: ["createComplementaryData"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patterns"] });
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

export const useGetPatternByCode = (code: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["pattern", code],
    queryFn: () => getPatternByCode(code),
    select: (response) => response.data,
    enabled: !!code,
  });

  return {
    pattern: data,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading,
  };
};
