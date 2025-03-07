import { Documentos, TipoEjecutor } from "@/app/api/common/types";
import { Cliente } from "../../../cliente/dominio/entity";
import { ProgramacionEquipos } from "@/app/api/equipos/dominio";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";
import { Usuario } from "@/app/api/usuarios/dominio/entity";

export class EjecucionEquipo {
  id: string;
  fechaEjecucion: Date | string;
  observaciones: string;
  cliente: Cliente;
  programacionEquipo: ProgramacionEquipos;
  documentos: Documentos[];
  proveedor?: Proveedor;
  usuario?: Usuario;
  tipoEjecutor: TipoEjecutor;

  constructor(attributes: Partial<EjecucionEquipo>) {
    this.id = attributes.id ?? "";
    this.fechaEjecucion = attributes.fechaEjecucion ?? new Date();
    this.observaciones = attributes.observaciones ?? "";
    this.cliente = attributes.cliente ?? new Cliente();
    this.programacionEquipo =
      attributes.programacionEquipo ?? ({} as ProgramacionEquipos);
    this.documentos = attributes.documentos ?? [];
    this.proveedor = attributes.proveedor;
    this.usuario = attributes.usuario;
    this.tipoEjecutor = attributes.tipoEjecutor ?? TipoEjecutor.INTERNO;
  }
}
