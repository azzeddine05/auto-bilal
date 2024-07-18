// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  infractionDataValidator,
  infractionPatchValidator,
  infractionQueryValidator,
  infractionResolver,
  infractionExternalResolver,
  infractionDataResolver,
  infractionPatchResolver,
  infractionQueryResolver
} from './infractions.schema'

import type { Application } from '../../declarations'
import { InfractionService, getOptions } from './infractions.class'

export const infractionPath = 'infractions'
export const infractionMethods: Array<keyof InfractionService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './infractions.class'
export * from './infractions.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const infraction = (app: Application) => {
  // Register our service on the Feathers application
  app.use(infractionPath, new InfractionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: infractionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(infractionPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(infractionExternalResolver),
        schemaHooks.resolveResult(infractionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(infractionQueryValidator),
        schemaHooks.resolveQuery(infractionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(infractionDataValidator),
        schemaHooks.resolveData(infractionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(infractionPatchValidator),
        schemaHooks.resolveData(infractionPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [infractionPath]: InfractionService
  }
}
