// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { InfractionService } from './infractions.class'

// Main data model schema
export const infractionSchema = Type.Object(
  {
    id: Type.Number(),
    dossier_number: Type.String(),
    advice_date: Type.String(),
    infraction_date: Type.String(),
    plate_number: Type.String(),
    model: Type.String(),
    description: Type.String(),
    response_date: Type.String(),
    user: Type.String(),
    response: Type.String()
  },
  { $id: 'Infraction', additionalProperties: false }
)
export type Infraction = Static<typeof infractionSchema>
export const infractionValidator = getValidator(infractionSchema, dataValidator)
export const infractionResolver = resolve<Infraction, HookContext<InfractionService>>({})

export const infractionExternalResolver = resolve<Infraction, HookContext<InfractionService>>({})

// Schema for creating new entries
export const infractionDataSchema = Type.Pick(
  infractionSchema,
  [
    'dossier_number',
    'advice_date',
    'infraction_date',
    'plate_number',
    'model',
    'description',
    'response_date',
    'user',
    'response'
  ],
  {
    $id: 'InfractionData'
  }
)
export type InfractionData = Static<typeof infractionDataSchema>
export const infractionDataValidator = getValidator(infractionDataSchema, dataValidator)
export const infractionDataResolver = resolve<Infraction, HookContext<InfractionService>>({})

// Schema for updating existing entries
export const infractionPatchSchema = Type.Partial(infractionSchema, {
  $id: 'InfractionPatch'
})
export type InfractionPatch = Static<typeof infractionPatchSchema>
export const infractionPatchValidator = getValidator(infractionPatchSchema, dataValidator)
export const infractionPatchResolver = resolve<Infraction, HookContext<InfractionService>>({})

// Schema for allowed query properties
export const infractionQueryProperties = Type.Pick(infractionSchema, [
  'dossier_number',
  'advice_date',
  'infraction_date',
  'plate_number',
  'model',
  'description',
  'response_date',
  'user',
  'response'
])
export const infractionQuerySchema = Type.Intersect(
  [
    querySyntax(infractionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type InfractionQuery = Static<typeof infractionQuerySchema>
export const infractionQueryValidator = getValidator(infractionQuerySchema, queryValidator)
export const infractionQueryResolver = resolve<InfractionQuery, HookContext<InfractionService>>({})
