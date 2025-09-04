import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, getLocations } from "../service";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { CreateLocation } from "../types";

export const useGetAllLocations = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    select: (response) => response.data,
  });

  return {
    locations: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (location: CreateLocation) => createLocation(location),
    mutationKey: ["createLocation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
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
