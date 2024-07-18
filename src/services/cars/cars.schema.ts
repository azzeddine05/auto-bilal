// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CarService } from './cars.class'

// Main data model schema
export const carSchema = Type.Object(
  {
    id: Type.Number(),
    registration_country: Type.String(),
    plate_number: Type.String(),
    brand: Type.String(),
    model: Type.String(),
    reference_1: Type.Optional(Type.String()),
    reference_2: Type.Optional(Type.String()),
    comment: Type.Optional(Type.String()),
    entry_date: Type.String(),
    exit_date: Type.Optional(Type.String()),
    entity_id: Type.Number()
  },
  { $id: 'Car', additionalProperties: false }
)
export type Car = Static<typeof carSchema>
export const carValidator = getValidator(carSchema, dataValidator)
export const carResolver = resolve<Car, HookContext<CarService>>({})

export const carExternalResolver = resolve<Car, HookContext<CarService>>({})

// Schema for creating new entries
export const carDataSchema = Type.Pick(
  carSchema,
  [
    'registration_country',
    'plate_number',
    'brand',
    'model',
    'reference_1',
    'reference_2',
    'comment',
    'entry_date',
    'exit_date',
    'entity_id'
  ],
  {
    $id: 'CarData'
  }
)
export type CarData = Static<typeof carDataSchema>
export const carDataValidator = getValidator(carDataSchema, dataValidator)
export const carDataResolver = resolve<Car, HookContext<CarService>>({})

// Schema for updating existing entries
export const carPatchSchema = Type.Partial(carSchema, {
  $id: 'CarPatch'
})
export type CarPatch = Static<typeof carPatchSchema>
export const carPatchValidator = getValidator(carPatchSchema, dataValidator)
export const carPatchResolver = resolve<Car, HookContext<CarService>>({})

// Schema for allowed query properties
export const carQueryProperties = Type.Pick(carSchema, [
  'id',
  'registration_country',
  'plate_number',
  'brand',
  'model',
  'entry_date',
  'exit_date',
  'entity_id'
])
export const carQuerySchema = Type.Intersect(
  [
    querySyntax(carQueryProperties, {
      brand: { $like: Type.String() },
      model: { $like: Type.String() },
      plate_number: { $like: Type.String() },
      registration_country: { $like: Type.String() }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CarQuery = Static<typeof carQuerySchema>
export const carQueryValidator = getValidator(carQuerySchema, queryValidator)
export const carQueryResolver = resolve<CarQuery, HookContext<CarService>>({})
