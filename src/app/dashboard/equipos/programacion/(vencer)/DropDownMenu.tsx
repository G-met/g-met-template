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
  equipmentScheduleId: string;
}

import { DialogWrapper } from "@/components/dialogWrapper";
import { FormEjecucionEquipo } from "./form";
import { useModalDropdown } from "@/app/dashboard/hooks/useModal";
export const DropDownMenuEjecucionEquipo = ({
  isCompleted,
  equipmentScheduleId,
}: Props) => {
  const {
    isOpenModal,
    clickDropdownItem,
    onOpenChangeModal,
    detectDropdownClose,
    closeModal,
  } = useModalDropdown();
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
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={onOpenChangeModal}
        title="Crear Ejecucion"
        description="Ingresa la informacion solicitada"
        
      >
        <FormEjecucionEquipo
          closeModal={closeModal}
          equipmentScheduleId={equipmentScheduleId}
        />
      </DialogWrapper>
    </>
  );
};
