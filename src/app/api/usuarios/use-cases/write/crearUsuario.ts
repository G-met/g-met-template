// import { Usuario } from "../../dominio/entity";
// import { UsuarioService } from "../../dominio/service";
// import { EmailService } from "../../../common/email/index";
// import { SendPasswordcreate } from "@/app/api/common/email/templates/sendPasswordcreate";
// import { CrearUsuarioDTO } from "../dto/crearUsuario.DTO";
// import { UsuarioExiste } from "../../dominio/errors";
// import { Cliente } from "@/app/api/cliente/dominio/entity";
// import { getBaseDomain } from "../../../../../lib/helpers/getBaseDomain";

// interface CrearUsuario {
//   execute(cliente: Cliente, dto: CrearUsuarioDTO): Promise<void>;
// }

// export class CrearUsuarioImp implements CrearUsuario {
//   constructor(
//     private usuarioService: UsuarioService,
//     private emailService: EmailService,
//     private authService: AuthService,
//     private passwordResetTokenService: PasswordResetTokenService
//   ) {}
//   async execute(cliente: Cliente, dto: CrearUsuarioDTO): Promise<void> {
//     const user = await this.usuarioService.obtenerUsuarioPorCorreo(
//       dto.correo,
//       cliente.id
//     );
//     if (user) {
//       throw new UsuarioExiste();
//     }
//     const usuarioToCreate = new Usuario({
//       nombre: dto.nombre,
//       apellido: dto.apellido,
//       cargo: dto.cargo,
//       rol: dto.rol,
//       correo: dto.correo,
//       cliente: cliente,
//     });

//     const token = await this.passwordResetTokenService.generateNewToken(
//       cliente.id,
//       dto.correo
//     );
//     const newPassword = await this.authService.encodePassword(token.token);
//     usuarioToCreate.password = newPassword;
//     await this.usuarioService.crearUsuario(usuarioToCreate);
//     const baseUrl = getBaseDomain(cliente);
//     const link = `${baseUrl}/change-password/${token.token}`;
//     const nombreCompleto = `${dto.nombre} ${dto.apellido}`;
//     await this.emailService.sendEmail({
//       from: "Gmet <noreply@gemet.cloud>",
//       subject: "Credenciales de ingreso",
//       to: [dto.correo],
//       template: SendPasswordcreate({ link, name: nombreCompleto }),
//     });
//   }
// }
