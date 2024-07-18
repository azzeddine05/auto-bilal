// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Setting, SettingData, SettingPatch, SettingQuery } from './settings.schema'

export type { Setting, SettingData, SettingPatch, SettingQuery }

export interface SettingParams extends KnexAdapterParams<SettingQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SettingService<ServiceParams extends Params = SettingParams> extends KnexService<
  Setting,
  SettingData,
  SettingParams,
  SettingPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'settings'
  }
}
