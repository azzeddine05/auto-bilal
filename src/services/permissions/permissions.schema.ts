// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PermissionService } from './permissions.class'

// Main data model schema
export const permissionSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    slug: Type.String()
  },
  { $id: 'Permission', additionalProperties: false }
)
export type Permission = Static<typeof permissionSchema>
export const permissionValidator = getValidator(permissionSchema, dataValidator)
export const permissionResolver = resolve<Permission, HookContext<PermissionService>>({})

export const permissionExternalResolver = resolve<Permission, HookContext<PermissionService>>({})

// Schema for creating new entries
export const permissionDataSchema = Type.Pick(permissionSchema, ['name', 'slug'], {
  $id: 'PermissionData'
})
export type PermissionData = Static<typeof permissionDataSchema>
export const permissionDataValidator = getValidator(permissionDataSchema, dataValidator)
export const permissionDataResolver = resolve<Permission, HookContext<PermissionService>>({})

// Schema for updating existing entries
export const permissionPatchSchema = Type.Partial(permissionSchema, {
  $id: 'PermissionPatch'
})
export type PermissionPatch = Static<typeof permissionPatchSchema>
export const permissionPatchValidator = getValidator(permissionPatchSchema, dataValidator)
export const permissionPatchResolver = resolve<Permission, HookContext<PermissionService>>({})

// Schema for allowed query properties
export const permissionQueryProperties = Type.Pick(permissionSchema, ['id', 'name', 'slug'])
export const permissionQuerySchema = Type.Intersect(
  [
    querySyntax(permissionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PermissionQuery = Static<typeof permissionQuerySchema>
export const permissionQueryValidator = getValidator(permissionQuerySchema, queryValidator)
export const permissionQueryResolver = resolve<PermissionQuery, HookContext<PermissionService>>({})
