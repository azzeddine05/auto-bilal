// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EntityService } from './entities.class'

// Main data model schema
export const entitySchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    siren: Type.Optional(Type.String()),
    siret: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    address: Type.String(),
    postal_code: Type.String(),
    city: Type.String(),
    country: Type.String(),
    logo: Type.Optional(Type.String()),
    representative_first_name: Type.Optional(Type.String()),
    representative_last_name: Type.Optional(Type.String()),
    representative_email: Type.Optional(Type.String()),
    parent_id: Type.Optional(Type.Number())
  },
  { $id: 'Entity', additionalProperties: false }
)
export type Entity = Static<typeof entitySchema>
export const entityValidator = getValidator(entitySchema, dataValidator)
export const entityResolver = resolve<Entity, HookContext<EntityService>>({})

export const entityExternalResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for creating new entries
export const entityDataSchema = Type.Pick(
  entitySchema,
  [
    'name',
    'siren',
    'siret',
    'email',
    'address',
    'postal_code',
    'city',
    'country',
    'logo',
    'representative_first_name',
    'representative_last_name',
    'representative_email',
    'parent_id'
  ],
  {
    $id: 'EntityData'
  }
)
export type EntityData = Static<typeof entityDataSchema>
export const entityDataValidator = getValidator(entityDataSchema, dataValidator)
export const entityDataResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for updating existing entries
export const entityPatchSchema = Type.Partial(entitySchema, {
  $id: 'EntityPatch'
})
export type EntityPatch = Static<typeof entityPatchSchema>
export const entityPatchValidator = getValidator(entityPatchSchema, dataValidator)
export const entityPatchResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for allowed query properties
export const entityQueryProperties = Type.Pick(entitySchema, [
  'id',
  'name',
  'siren',
  'siret',
  'email',
  'address',
  'postal_code',
  'city',
  'country',
  'representative_first_name',
  'representative_last_name',
  'representative_email',
  'parent_id'
])
export const entityQuerySchema = Type.Intersect(
  [
    querySyntax(entityQueryProperties, {
      name: { $like: Type.String() },
      siren: { $like: Type.String() },
      siret: { $like: Type.String() },
      email: { $like: Type.String() },
      address: { $like: Type.String() },
      postal_code: { $like: Type.String() },
      city: { $like: Type.String() },
      country: { $like: Type.String() },
      representative_first_name: { $like: Type.String() },
      representative_last_name: { $like: Type.String() },
      representative_email: { $like: Type.String() }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EntityQuery = Static<typeof entityQuerySchema>
export const entityQueryValidator = getValidator(entityQuerySchema, queryValidator)
export const entityQueryResolver = resolve<EntityQuery, HookContext<EntityService>>({})
