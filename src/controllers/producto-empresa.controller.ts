import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Empresa,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoEmpresaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Empresa> {
    return this.productoRepository.empresa(id);
  }
}
