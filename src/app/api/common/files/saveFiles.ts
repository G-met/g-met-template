import { uploadFiles } from "@/app/dashboard/common/service/files";
import { getLogger } from "@/lib/logger";
import { currentUser, auth } from "@clerk/nextjs/server";
import { Logger } from "pino";
interface DocumentsFiles {
  name: string;
  url: string;
}
export interface IFilesAdaptor {
  saveFiles(pathName: string, files: File[]): Promise<DocumentsFiles[]>;
}

export class SaveFiles implements IFilesAdaptor {
  

  async saveFiles(pathName: string, files: File[]) {
    const logger = await getLogger();
    const session = await auth();
    if (files.length === 0) {
      logger.error("No files to upload");
      throw new Error("No files to upload");
    }
    if (!session) {
      logger.error("No active session found");
      throw new Error("No hay sesión activa");
    }
    const token = await session.getToken();
    const listOfUrl = await uploadFiles(
      { archivos: files, pathName },
      token as string
    );
    return listOfUrl;
  }
  // async saveFiles(pathName: string, files: File[]) {
  //   const listOfUrl: DocumentsFiles[] = [];
  //   for (const file of files) {
  //     const fileName = file.name;
  //     const pathNameJoin = `${pathName}/${fileName}`;
  //     const res = await put(pathNameJoin, file, { access: "public" });
  //     listOfUrl.push({ name: fileName, url: res.url });
  //   }
  //   return listOfUrl;
  // }
}
