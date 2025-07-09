import { Documentos } from "@/app/api/common/types";
import { httpBaseV2 } from "@/app/config/api-base-v2";
import { createFormData } from "@/lib/helpers/formData";
import { DocumentsFiles } from "../../../../../../gmet-api/src/common/files/files.adaptor";

interface UploadFilesArg {
  archivos: File[];
  pathName: string;
}

export const uploadFiles = async (
  arg: UploadFilesArg
): Promise<DocumentsFiles[]> => {
  const formData = createFormData(arg);

  const response = await httpBaseV2.post<DocumentsFiles[]>(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
