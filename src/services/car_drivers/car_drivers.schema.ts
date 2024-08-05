// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CarDriverService } from './car_drivers.class'

// Main data model schema
export const carDriverSchema = Type.Object(
  {
    id: Type.Optional(Type.Number()),
    car_id: Type.Number(),
    driver_id: Type.Number(),
    start_date: Type.String(),
    end_date: Type.Optional(Type.String()),

    car: Type.Optional(Type.Any()),

  },
  { $id: 'CarDriver', additionalProperties: false }
)
export type CarDriver = Static<typeof carDriverSchema>
export const carDriverValidator = getValidator(carDriverSchema, dataValidator)
export const carDriverResolver = resolve<CarDriver, HookContext<CarDriverService>>({})

export const carDriverExternalResolver = resolve<CarDriver, HookContext<CarDriverService>>({
  car: async (value, carDriver, context) => {
    const car = await context.app.service('cars').get(carDriver.car_id);
    return car;
  }
})

// Schema for creating new entries
export const carDriverDataSchema = Type.Pick(
  carDriverSchema,
  ['car_id', 'driver_id', 'start_date', 'end_date'],
  {
    $id: 'CarDriverData'
  }
)
export type CarDriverData = Static<typeof carDriverDataSchema>
export const carDriverDataValidator = getValidator(carDriverDataSchema, dataValidator)
export const carDriverDataResolver = resolve<CarDriver, HookContext<CarDriverService>>({})

// Schema for updating existing entries
export const carDriverPatchSchema = Type.Partial(carDriverSchema, {
  $id: 'CarDriverPatch'
})
export type CarDriverPatch = Static<typeof carDriverPatchSchema>
export const carDriverPatchValidator = getValidator(carDriverPatchSchema, dataValidator)
export const carDriverPatchResolver = resolve<CarDriver, HookContext<CarDriverService>>({})

// Schema for allowed query properties
export const carDriverQueryProperties = Type.Pick(carDriverSchema, [
  'id',
  'car_id',
  'driver_id',
  'start_date',
  'end_date'
])
export const carDriverQuerySchema = Type.Intersect(
  [
    querySyntax(carDriverQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CarDriverQuery = Static<typeof carDriverQuerySchema>
export const carDriverQueryValidator = getValidator(carDriverQuerySchema, queryValidator)
export const carDriverQueryResolver = resolve<CarDriverQuery, HookContext<CarDriverService>>({})
