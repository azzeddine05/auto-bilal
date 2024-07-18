// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Infraction, InfractionData, InfractionPatch, InfractionQuery } from './infractions.schema'

export type { Infraction, InfractionData, InfractionPatch, InfractionQuery }

export interface InfractionParams extends KnexAdapterParams<InfractionQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class InfractionService<ServiceParams extends Params = InfractionParams> extends KnexService<
  Infraction,
  InfractionData,
  InfractionParams,
  InfractionPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'infractions'
  }
}
