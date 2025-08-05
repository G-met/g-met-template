import { prisma } from "@/lib/prisma";
import { Role, Usuario } from "../../dominio/entity";
import { UsuarioWriteRepository } from "../../dominio/repository/index";
export class UsuarioWriteRepositoryImp implements UsuarioWriteRepository {
  async actualizarUsuario(usuario: Usuario): Promise<void> {
    await prisma.usuario.update({
      where: {
        clienteId: usuario.cliente.id,
        id: usuario.id,
      },
      data: {
        password: usuario.password,
        correoVerificado: usuario.correoVerificado,
      },
    });
  }
  async crearUsuarios(usuario: Usuario): Promise<void> {
    await prisma.usuario.create({
      data: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cargo: usuario.cargo,
        rol: usuario.rol as Role,
        correo: usuario.correo,
        clienteId: usuario.cliente.id,
      },
    });
  }
}
