import { httpBase } from "@/app/config/api-base";
import { AxiosError } from "axios";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { CrearEjecucionDTO } from "@/app/api/ejecucion-patron/application/dto/crearEjecucionPatron";
import { ListarEjecucionDTO } from "@/app/api/ejecucion-patron/application/dto/listarEjecucionPatrones.dto";
import { createFormData } from "@/lib/helpers/formData";

export const useCrearEjecucionPatron = () => {
  const fetcher = async (url: string, { arg }: { arg: CrearEjecucionDTO }) => {
    const formData = createFormData(arg);
    const response = await httpBase.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };

  const { data, error, trigger, isMutating } = useSWRMutation(
    "/ejecucion-patron",
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

export const useObtenerEjecucionPatrones = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<ListarEjecucionDTO[]>(
    "/ejecucion-patron",
    fetcher
  );
  return {
    ejecuciones: data ?? [],
    isLoading,
    isError: error,
  };
};
