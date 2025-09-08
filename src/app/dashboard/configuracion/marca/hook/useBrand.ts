import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrand, getBrands, updateBrand } from "../service";
import { CreateBrand, UpdateBrand } from "../types";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";

export const useGetAllBrands = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    select: (response) => response.data,
  });

  return {
    brands: data ?? [],
    error,
    isError,
    isLoading,
  };
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (brand: CreateBrand) => createBrand(brand),
    mutationKey: ["createBrand"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
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

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  const { error, isError, mutateAsync, isPending } = useMutation({
    mutationFn: (brand: UpdateBrand) => updateBrand(brand),
    mutationKey: ["updateBrand"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  return {
    update: mutateAsync,
    error,
    errorMessage: getErrorMessage(error) ?? "",
    isError,
    isLoading: isPending,
  };
};
