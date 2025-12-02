import { Documentos } from "@/app/dashboard/common/types";
import {
    DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

interface Props {
  documentos: Documentos[];
}

export const SubMenuDocuments = ({ documentos }: Props) => {
  return (
    <DropdownMenuSub>
      {documentos?.length ? (
        <>
          <DropdownMenuSubTrigger>Documentos</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {documentos?.map((e) => (
              <>
                <DropdownMenuItem key={e.name} >
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={e.url ?? ""}
                  >
                    {e.name}
                  </Link>
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuSubContent>
        </>
      ) : (
        <DropdownMenuItem>No hay Documentos</DropdownMenuItem>
      )}
    </DropdownMenuSub>
  );
};
