// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Package, PackageData, PackagePatch, PackageQuery } from './packages.schema'

export type { Package, PackageData, PackagePatch, PackageQuery }

export interface PackageParams extends KnexAdapterParams<PackageQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PackageService<ServiceParams extends Params = PackageParams> extends KnexService<
  Package,
  PackageData,
  PackageParams,
  PackagePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'packages'
  }
}
