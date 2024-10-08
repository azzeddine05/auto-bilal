// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Car, CarData, CarPatch, CarQuery } from './cars.schema'

export type { Car, CarData, CarPatch, CarQuery }

export interface CarParams extends KnexAdapterParams<CarQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CarService<ServiceParams extends Params = CarParams> extends KnexService<
  Car,
  CarData,
  CarParams,
  CarPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'cars'
  }
}
