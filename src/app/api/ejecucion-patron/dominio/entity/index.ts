import { Responsable } from "@/app/api/responsables/domain/entity";
import { Cliente } from "../../../cliente/dominio/entity";
import { ProgramacionPatrones } from "@/app/api/programacion-patrones/domain/entity";
import { Documentos, TipoEjecutor } from "@/app/api/common/types";
import { Proveedor } from "@/app/api/proveedor/dominio/entity";
import { Usuario } from "@/app/api/usuarios/dominio/entity";

export class EjecucionPatron {
  id: string;
  fechaEjecucion: Date | string;
  observaciones: string;
  cliente: Cliente;
  programacionPatron: ProgramacionPatrones;
  documentos?: Documentos[];
  proveedor?: Proveedor;
  usuario?: Usuario;
  tipoEjecutor: TipoEjecutor;

  constructor(attributes: Partial<EjecucionPatron>) {
    this.id = attributes.id ?? "";
    this.fechaEjecucion = attributes.fechaEjecucion ?? new Date();
    this.observaciones = attributes.observaciones ?? "";
    this.cliente = attributes.cliente ?? new Cliente();
    this.programacionPatron =
      attributes.programacionPatron ?? ({} as ProgramacionPatrones);
    this.documentos = attributes.documentos ?? [];
    this.proveedor = attributes.proveedor;
    this.usuario = attributes.usuario;
    this.tipoEjecutor = attributes.tipoEjecutor ?? TipoEjecutor.INTERNO;
  }
}
