import { httpBase } from "../../config/api-base";
import { CrearMagnitudDto } from "../../api/magnitud/dtos/crearMagnitud.dto";
import useSWRMutation from "swr/mutation";
import { AxiosError } from "axios";
import { Magnitud } from "../../api/magnitud/dominio";
import useSWR from "swr";

export const crearMagnitud = () => {
  const fetcher = (url: string, { arg }: { arg: CrearMagnitudDto }) =>
    httpBase.post(url, arg).then((res) => res.data);

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/magnitud",
    fetcher
  );

  return {
    isLoading: isMutating,
    responsable: data,
    crear: trigger,
    error: error as AxiosError,
    errorMsg: error?.response?.data?.error,
  };
};

export const obtenerMagnitudes = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Magnitud[]>("/magnitud", fetcher);
  return {
    magnitudes: data ?? [],
    isLoading,
    isError: error,
  };
};
