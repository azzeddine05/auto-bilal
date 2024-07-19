// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { CarDriver, CarDriverData, CarDriverPatch, CarDriverQuery } from './car_drivers.schema'

export type { CarDriver, CarDriverData, CarDriverPatch, CarDriverQuery }

export interface CarDriverParams extends KnexAdapterParams<CarDriverQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CarDriverService<ServiceParams extends Params = CarDriverParams> extends KnexService<
  CarDriver,
  CarDriverData,
  CarDriverParams,
  CarDriverPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'car_drivers',
    multi: true,
  }
}
