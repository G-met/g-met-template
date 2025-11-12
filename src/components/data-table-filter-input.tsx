"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface DataTableFilterInputProps<TData> {
  table: Table<TData>;
  columnId: string;
  placeholder?: string;
  className?: string;
}

export function DataTableFilterInput<TData>({
  table,
  columnId,
  placeholder = "Filter...",
  className,
}: DataTableFilterInputProps<TData>) {
  return (
    <Input
      placeholder={placeholder}
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnId)?.setFilterValue(event.target.value)
      }
      className={className}
    />
  );
}
