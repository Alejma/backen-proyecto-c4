import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresa,
  Producto,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaProductoController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.empresaRepository.productos(id).find(filter);
  }

  @post('/empresas/{id}/productos', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.empresaRepository.productos(id).create(producto);
  }

  @patch('/empresas/{id}/productos', {
    responses: {
      '200': {
        description: 'Empresa.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.empresaRepository.productos(id).patch(producto, where);
  }

  @del('/empresas/{id}/productos', {
    responses: {
      '200': {
        description: 'Empresa.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.empresaRepository.productos(id).delete(where);
  }
}
