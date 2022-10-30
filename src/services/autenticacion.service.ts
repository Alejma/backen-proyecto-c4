import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
const generatePassword = require("password-generator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
      return false;
    }

  }

  GenerarTokenJWT(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.id,
        correo: empleado.correo,
        nombre: empleado.nombres
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
