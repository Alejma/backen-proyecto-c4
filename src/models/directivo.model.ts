import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Empresa} from './empresa.model';

@model()
export class Directivo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_completo: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;
  @property({
    type: 'string',
    required: true,
  })
  sueldo: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
