"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/badge";
import clsx from "clsx";

import { DropDownMenuEjecucionEquipo } from "./DropDownMenu";
import { EquipmentScheduleResponse, AlertLevel, ScheduleStatus } from "../../types/equipmentSchedule.types";

export const columns: ColumnDef<EquipmentScheduleResponse>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "scheduledDate",
    header: "Fecha programación",
  },
  {
    accessorKey: "activity",
    header: "Actividad",
  },
  {
    accessorKey: "frequency",
    header: "Frecuencia",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "alertStatus",
    header: "Tiempo disponible",
    cell: ({ row }) => {
      const alertStatus = row.getValue<EquipmentScheduleResponse["alertStatus"]>("alertStatus");
      const daysText = Math.abs(alertStatus.daysUntilDue);
      
      let description = "";
      if (alertStatus.daysUntilDue < 0) {
        description = "vencido";
      } else if (alertStatus.daysUntilDue === 0) {
        description = "Vence hoy";
      } else {
        description = `${daysText} días`;
      }
      
      return (
        <Badge
          className={clsx({
            "bg-green-500": alertStatus.level === AlertLevel.ON_TIME,
            "bg-orange-500": alertStatus.level === AlertLevel.WARNING,
            "bg-red-700": alertStatus.level === AlertLevel.EXPIRED,
          })}
        >
          {description}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const isCompleted = row.original.status === ScheduleStatus.COMPLETADO;

      return (
        <DropDownMenuEjecucionEquipo
          isCompleted={isCompleted}
          programacionEquipoId={row.original.id}
        />
      );
    },
  },
];
