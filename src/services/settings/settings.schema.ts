// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SettingService } from './settings.class'

// Main data model schema
export const settingSchema = Type.Object(
  {
    id: Type.Number(),
    response_delay: Type.Number(),
    justification_name: Type.String(),
    include_designated_person_identity: Type.Boolean(),
    include_designated_person_contact: Type.Boolean(),
    allow_external_authentication: Type.Boolean(),
    display_designated_person_identity: Type.Boolean(),
    display_designated_person_contact: Type.Boolean()
  },
  { $id: 'Setting', additionalProperties: false }
)
export type Setting = Static<typeof settingSchema>
export const settingValidator = getValidator(settingSchema, dataValidator)
export const settingResolver = resolve<Setting, HookContext<SettingService>>({})

export const settingExternalResolver = resolve<Setting, HookContext<SettingService>>({})

// Schema for creating new entries
export const settingDataSchema = Type.Pick(
  settingSchema,
  [
    'response_delay',
    'justification_name',
    'include_designated_person_identity',
    'include_designated_person_contact',
    'allow_external_authentication',
    'display_designated_person_identity',
    'display_designated_person_contact'
  ],
  {
    $id: 'SettingData'
  }
)
export type SettingData = Static<typeof settingDataSchema>
export const settingDataValidator = getValidator(settingDataSchema, dataValidator)
export const settingDataResolver = resolve<Setting, HookContext<SettingService>>({})

// Schema for updating existing entries
export const settingPatchSchema = Type.Partial(settingSchema, {
  $id: 'SettingPatch'
})
export type SettingPatch = Static<typeof settingPatchSchema>
export const settingPatchValidator = getValidator(settingPatchSchema, dataValidator)
export const settingPatchResolver = resolve<Setting, HookContext<SettingService>>({})

// Schema for allowed query properties
export const settingQueryProperties = Type.Pick(settingSchema, [
  'response_delay',
  'justification_name',
  'include_designated_person_identity',
  'include_designated_person_contact',
  'allow_external_authentication',
  'display_designated_person_identity',
  'display_designated_person_contact'
])
export const settingQuerySchema = Type.Intersect(
  [
    querySyntax(settingQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SettingQuery = Static<typeof settingQuerySchema>
export const settingQueryValidator = getValidator(settingQuerySchema, queryValidator)
export const settingQueryResolver = resolve<SettingQuery, HookContext<SettingService>>({})
