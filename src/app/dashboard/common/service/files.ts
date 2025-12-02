import { Documentos } from "@/app/dashboard/common/types";
import { httpBaseV2 } from "@/app/config/api-base-v2";
import { createFormData } from "@/lib/helpers/formData";
import { DocumentsFiles } from "../../../../../../gmet-api/src/common/files/files.adaptor";

interface UploadFilesArg {
  archivos: File[];
  pathName: string;
}

export const uploadFiles = async (
  arg: UploadFilesArg,
  sessionToken: string
): Promise<DocumentsFiles[]> => {
  const formData = createFormData(arg);

  const response = await httpBaseV2.post<DocumentsFiles[]>(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionToken}`,
        Cookie: `__session=${sessionToken}`, // <-- así lo espera tu backend
      },
    }
  );
  return response.data;
};
