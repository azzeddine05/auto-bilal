// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PackageService } from './packages.class'

// Main data model schema
export const packageSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    description: Type.String(),
    price: Type.Number(),
    features: Type.Array(Type.Object({ name: Type.String() })),
    total_cars: Type.Number(),
    total_drivers: Type.Number(),
    is_active: Type.Boolean()
  },
  { $id: 'Package', additionalProperties: false }
)
export type Package = Static<typeof packageSchema>
export const packageValidator = getValidator(packageSchema, dataValidator)
export const packageResolver = resolve<Package, HookContext<PackageService>>({})

export const packageExternalResolver = resolve<Package, HookContext<PackageService>>({})

// Schema for creating new entries
export const packageDataSchema = Type.Pick(
  packageSchema,
  ['name', 'description', 'price', 'features', 'total_cars', 'total_drivers', 'is_active'],
  {
    $id: 'PackageData'
  }
)
export type PackageData = Static<typeof packageDataSchema>
export const packageDataValidator = getValidator(packageDataSchema, dataValidator)
export const packageDataResolver = resolve<Package, HookContext<PackageService>>({})

// Schema for updating existing entries
export const packagePatchSchema = Type.Partial(packageSchema, {
  $id: 'PackagePatch'
})
export type PackagePatch = Static<typeof packagePatchSchema>
export const packagePatchValidator = getValidator(packagePatchSchema, dataValidator)
export const packagePatchResolver = resolve<Package, HookContext<PackageService>>({})

// Schema for allowed query properties
export const packageQueryProperties = Type.Pick(packageSchema, [
  'id',
  'name',
  'description',
  'price',
  'features',
  'total_cars',
  'total_drivers',
  'is_active'
])
export const packageQuerySchema = Type.Intersect(
  [
    querySyntax(packageQueryProperties, {
      name: { $like: Type.String() },
      description: { $like: Type.String() },
      price: { $like: Type.String() },
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PackageQuery = Static<typeof packageQuerySchema>
export const packageQueryValidator = getValidator(packageQuerySchema, queryValidator)
export const packageQueryResolver = resolve<PackageQuery, HookContext<PackageService>>({})
