import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EmpleadoRepository} from '../repositories';
const generatePassword = require("password-generator");
const CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor
    (@repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    ) { }

  generarClave(): string {
    const clave = generatePassword(12, false);
    return clave;
  }

  cifrarClave(clave: string) {
    let claveCifrada = CryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarEmpleado(usuario: string, clave: string) {
    try {
      let p = this.empleadoRepository.findOne({where: {correo: usuario, clave: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {

    }

  }

}
