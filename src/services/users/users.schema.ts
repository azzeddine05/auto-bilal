// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { passwordHash } from '@feathersjs/authentication-local'
import { resolve } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './users.class'

// Main data model schema
export const userSchema = Type.Object(
  {
    id: Type.Number(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    first_name: Type.String(),
    last_name: Type.String(),
    role_id: Type.Number(),
    entity_id: Type.Number(),
    notification_new_infraction: Type.String(),
    reminder_1: Type.Optional(Type.Number()),
    reminder_2: Type.Optional(Type.Number()),
    reminder_every: Type.Optional(Type.Number()),
    is_active: Type.Optional(Type.Boolean()),
    role: Type.Optional(Type.Any()),
    entity: Type.Optional(Type.Any()),
    stats: Type.Optional(Type.Any())
  },
  { $id: 'User', additionalProperties: false }
)
export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext<UserService>>({})

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined,
  role: async (value, user: User, context) => {
    const role = await context.app.service('roles').get(user.role_id)
    return role
  },
  entity: async (value, user: User, context) => {
    const entity = await context.app.service('entities').get(user.entity_id)
    return entity
  },
  stats: async (value, user: User, context) => {
    if (user?.role_id === 1) {
      const clients = await context.app.service('users').find({
        query: {
          $skip: 0,
          $limit: 1,
          role_id: 2
        }
      })
      const drivers = await context.app.service('drivers').find({
        query: {
          $skip: 0,
          $limit: 1
        }
      })

      const cars = await context.app.service('cars').find({
        query: {
          $skip: 0,
          $limit: 1
        }
      })

      const infractions = await context.app.service('infractions').find({
        query: {
          $skip: 0,
          $limit: 1
        }
      })

      return {
        clients: clients?.total,
        drivers: drivers?.total,
        cars: cars?.total,
        infractions: infractions?.total
      }
    } else {
      const entity = await context.app.service('entities').get(user.entity_id)

      const cars = await context.app.service('cars').find({
        query: {
          $skip: 0,
          $limit: 1,
          entity_id: entity.id
        }
      })
      const drivers = await context.app.service('drivers').find({
        query: {
          $skip: 0,
          $limit: 1,
          entity_id: entity.id
        }
      })

      const infractions = await context.app.service('infractions').find({
        query: {
          $skip: 0,
          $limit: 1
        }
      })

      return {
        cars: cars?.total,
        drivers: drivers?.total,
        infractions: infractions?.total
      }
    }
  }
})

// Schema for creating new entries
export const userDataSchema = Type.Pick(
  userSchema,
  [
    'email',
    'password',
    'first_name',
    'last_name',
    'role_id',
    'entity_id',
    'notification_new_infraction',
    'reminder_1',
    'reminder_2',
    'reminder_every',
    'is_active'
  ],
  {
    $id: 'UserData'
  }
)
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, [
  'id',
  'email',
  'first_name',
  'last_name',
  'role_id',
  'entity_id',
  'notification_new_infraction',
  'reminder_1',
  'reminder_2',
  'reminder_every',
  'is_active'
])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  // // If there is a user (e.g. with authentication), they are only allowed to see their own data
  // id: async (value, user, context) => {
  //   if (context.params.user) {
  //     return context.params.user.id
  //   }
  //   return value
  // }
})
