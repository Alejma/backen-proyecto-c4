import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Cliente, Empleado, Directivo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {DirectivoRepository} from './directivo.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Empresa.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.id>;

  public readonly directivos: HasManyRepositoryFactory<Directivo, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('DirectivoRepository') protected directivoRepositoryGetter: Getter<DirectivoRepository>,
  ) {
    super(Empresa, dataSource);
    this.directivos = this.createHasManyRepositoryFactoryFor('directivos', directivoRepositoryGetter,);
    this.registerInclusionResolver('directivos', this.directivos.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
