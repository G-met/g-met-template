import  { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import { httpBase } from "../../config/api-base";
import useSWR from "swr";

import { CrearVariableDto } from "../../api/variables/dtos/crear";
import { Variable } from "../../api/variables/dominio";

export const useObtenerVariables = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Variable[]>(
    "/variables",
    fetcher
  );
  return {
    variables: data ?? [],
    isLoading,
    isError: error,
  };
};


export const useCrearVariable = () => {

  const fetcher = (
    url: string,
    { arg }: { arg: CrearVariableDto }
  ) => httpBase.post(url, arg).then((res) => res.data);


  const { data, error, trigger, isMutating } = useSWRMutation(
    "/variables",
    fetcher
  );

  return {
    isLoading: isMutating,
    variable: data,
    crear:trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};
