// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RoleService } from './roles.class'

// Main data model schema
export const roleSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String()
  },
  { $id: 'Role', additionalProperties: false }
)
export type Role = Static<typeof roleSchema>
export const roleValidator = getValidator(roleSchema, dataValidator)
export const roleResolver = resolve<Role, HookContext<RoleService>>({})

export const roleExternalResolver = resolve<Role, HookContext<RoleService>>({})

// Schema for creating new entries
export const roleDataSchema = Type.Pick(roleSchema, ['name'], {
  $id: 'RoleData'
})
export type RoleData = Static<typeof roleDataSchema>
export const roleDataValidator = getValidator(roleDataSchema, dataValidator)
export const roleDataResolver = resolve<Role, HookContext<RoleService>>({})

// Schema for updating existing entries
export const rolePatchSchema = Type.Partial(roleSchema, {
  $id: 'RolePatch'
})
export type RolePatch = Static<typeof rolePatchSchema>
export const rolePatchValidator = getValidator(rolePatchSchema, dataValidator)
export const rolePatchResolver = resolve<Role, HookContext<RoleService>>({})

// Schema for allowed query properties
export const roleQueryProperties = Type.Pick(roleSchema, ['id', 'name'])
export const roleQuerySchema = Type.Intersect(
  [
    querySyntax(roleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RoleQuery = Static<typeof roleQuerySchema>
export const roleQueryValidator = getValidator(roleQuerySchema, queryValidator)
export const roleQueryResolver = resolve<RoleQuery, HookContext<RoleService>>({})
