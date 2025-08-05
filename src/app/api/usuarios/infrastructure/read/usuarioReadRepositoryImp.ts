import { prisma } from "@/lib/prisma";
import { Role, Usuario } from "../../dominio/entity";
import { UsuarioReadRepository } from "../../dominio/repository";
import { usuario as UsuarioPrisma } from "@prisma/client";

export class UsuarioReadRepositoryImp implements UsuarioReadRepository {
  async listarUsuarioPorRoles(
    clienteId: string,
    roles: Role[]
  ): Promise<Usuario[]> {
    const res = await prisma.usuario.findMany({
      where: {
        clienteId,
        rol: {
          in: roles,
        },
      },
    });

    return res.map((usuario) => this.mapToDomainUsuario(usuario));
  }
  async obtenerPorId(usuarioId: string): Promise<Usuario | null> {
    const res = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!res) return null;
    return this.mapToDomainUsuario(res);
  }
  async listarUsuarios(clienteId: string): Promise<Usuario[]> {
    const res = await prisma.usuario.findMany({
      where: {
        clienteId,
      },
    });

    return res.map((usuario) => this.mapToDomainUsuario(usuario));
  }

  private mapToDomainUsuario(usuarioPrisma: UsuarioPrisma): Usuario {
    return new Usuario({
      id: usuarioPrisma.id,
      nombre: usuarioPrisma.nombre,
      apellido: usuarioPrisma.apellido,
      cargo: usuarioPrisma.cargo,
      rol: usuarioPrisma.rol as Role,
      correo: usuarioPrisma.correo,
      fechaCreacion: usuarioPrisma.fechaCreacion,
      fechaActualizacion: usuarioPrisma.fechaActualizacion,
      fechaInactivacion: usuarioPrisma.fechaInactivacion,
      correoVerificado: usuarioPrisma.correoVerificado,
      cliente: {
        id: usuarioPrisma.clienteId,
        nombre: usuarioPrisma.clienteId,
      },
    });
  }

  async obtenerPorCorreo(
    correo: string,
    clienteId: string
  ): Promise<Usuario | null> {
    const res = await prisma.usuario.findUnique({
      where: {
        correo,
        clienteId,
      },
    });

    if (!res) return null;
    return this.mapToDomainUsuario(res);
  }
}
