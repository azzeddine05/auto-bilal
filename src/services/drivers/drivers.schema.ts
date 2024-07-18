// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { DriverService } from './drivers.class'

enum DriverType {
  Physical = 'physical',
  Moral = 'moral'
}

// Main data model schema
export const driverSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Enum(DriverType),
    civility: Type.Optional(Type.String()),
    first_name: Type.Optional(Type.String()),
    last_name: Type.Optional(Type.String()),
    birth_date: Type.Optional(Type.String()),
    birth_place: Type.Optional(Type.String()),
    company_name: Type.Optional(Type.String()),
    siren: Type.Optional(Type.String()),
    siret: Type.Optional(Type.String()),
    entity_id: Type.Number(),
    professional_email: Type.String(),
    personal_email: Type.Optional(Type.String()),
    address: Type.String(),
    postal_code: Type.String(),
    city: Type.String(),
    country: Type.String(),
    plate_number: Type.Optional(Type.String()),
    reference_1: Type.Optional(Type.String()),
    reference_2: Type.Optional(Type.String()),
    comment: Type.Optional(Type.String())
  },
  { $id: 'Driver', additionalProperties: false }
)
export type Driver = Static<typeof driverSchema>
export const driverValidator = getValidator(driverSchema, dataValidator)
export const driverResolver = resolve<Driver, HookContext<DriverService>>({})

export const driverExternalResolver = resolve<Driver, HookContext<DriverService>>({})

// Schema for creating new entries
export const driverDataSchema = Type.Pick(
  driverSchema,
  [
    'civility',
    'type',
    'first_name',
    'last_name',
    'company_name',
    'siren',
    'siret',
    'entity_id',
    'professional_email',
    'personal_email',
    'address',
    'postal_code',
    'city',
    'country',
    'plate_number',
    'reference_1',
    'reference_2',
    'comment',
    'birth_date',
    'birth_place'
  ],
  {
    $id: 'DriverData'
  }
)
export type DriverData = Static<typeof driverDataSchema>
export const driverDataValidator = getValidator(driverDataSchema, dataValidator)
export const driverDataResolver = resolve<Driver, HookContext<DriverService>>({})

// Schema for updating existing entries
export const driverPatchSchema = Type.Partial(driverSchema, {
  $id: 'DriverPatch'
})
export type DriverPatch = Static<typeof driverPatchSchema>
export const driverPatchValidator = getValidator(driverPatchSchema, dataValidator)
export const driverPatchResolver = resolve<Driver, HookContext<DriverService>>({})

// Schema for allowed query properties
export const driverQueryProperties = Type.Pick(driverSchema, [
  'id',
  'type',
  'civility',
  'first_name',
  'last_name',
  'company_name',
  'siren',
  'siret',
  'entity_id',
  'professional_email',
  'personal_email',
  'address',
  'postal_code',
  'city',
  'country',
  'plate_number',
  'reference_1',
  'reference_2',
  'comment'
])
export const driverQuerySchema = Type.Intersect(
  [
    querySyntax(driverQueryProperties, {
      first_name: { $like: Type.String() },
      last_name: { $like: Type.String() },
      company_name: { $like: Type.String() },
      siren: { $like: Type.String() },
      siret: { $like: Type.String() },
      professional_email: { $like: Type.String() },
      personal_email: { $like: Type.String() },
      address: { $like: Type.String() },
      postal_code: { $like: Type.String() },
      city: { $like: Type.String() },
      country: { $like: Type.String() },
      plate_number: { $like: Type.String() }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DriverQuery = Static<typeof driverQuerySchema>
export const driverQueryValidator = getValidator(driverQuerySchema, queryValidator)
export const driverQueryResolver = resolve<DriverQuery, HookContext<DriverService>>({})
