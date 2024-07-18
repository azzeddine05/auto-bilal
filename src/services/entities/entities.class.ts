// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Entity, EntityData, EntityPatch, EntityQuery } from './entities.schema'

export type { Entity, EntityData, EntityPatch, EntityQuery }

export interface EntityParams extends KnexAdapterParams<EntityQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class EntityService<ServiceParams extends Params = EntityParams> extends KnexService<
  Entity,
  EntityData,
  EntityParams,
  EntityPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'entities'
  }
}
