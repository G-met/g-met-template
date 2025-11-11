import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
  isCompleted: boolean;
  codeId: string;
}

import { DialogWrapper } from "@/components/dialogWrapper";
import { FormEjecucionPatron } from "./form";
import { useModalDropdown } from "@/app/dashboard/hooks/useModal";
import { useRouter } from "next/navigation";
export const DropDownMenuEjecucionPatron = ({ isCompleted, codeId }: Props) => {
  const router = useRouter();
  const {
    isOpenModal,
    clickDropdownItem,
    onOpenChangeModal,
    detectDropdownClose,
    closeModal,
  } = useModalDropdown();
  const navigateTakeData = () => {
    router.push(`/dashboard/patrones/data-collection/${codeId}`);
  };
  return (
    <>
      <DropdownMenu onOpenChange={detectDropdownClose}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={clickDropdownItem} disabled={isCompleted}>
            Ejecutar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={navigateTakeData}>
            Toma datos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={onOpenChangeModal}
        title="Crear Ejecucion"
        description="Ingresa la informacion solicitada"
      >
        <FormEjecucionPatron
          closeModal={closeModal}
          programacionPatronId={codeId}
        />
      </DialogWrapper>
    </>
  );
};
