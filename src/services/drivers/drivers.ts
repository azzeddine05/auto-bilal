// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  driverDataValidator,
  driverPatchValidator,
  driverQueryValidator,
  driverResolver,
  driverExternalResolver,
  driverDataResolver,
  driverPatchResolver,
  driverQueryResolver
} from './drivers.schema'

import type { Application } from '../../declarations'
import { DriverService, getOptions } from './drivers.class'

export const driverPath = 'drivers'
export const driverMethods: Array<keyof DriverService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './drivers.class'
export * from './drivers.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const driver = (app: Application) => {
  // Register our service on the Feathers application
  app.use(driverPath, new DriverService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: driverMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(driverPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(driverExternalResolver),
        schemaHooks.resolveResult(driverResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(driverQueryValidator), schemaHooks.resolveQuery(driverQueryResolver)],
      find: [
        (context) => {
          // current user
          const user = context.params.user
          if (user && user?.role_id === 2) {
            context.params.query = {
              ...context.params.query,
              entity_id: user.entity_id
            }
          }

          return context
        }
      ],
      get: [],
      create: [schemaHooks.validateData(driverDataValidator), schemaHooks.resolveData(driverDataResolver)],
      patch: [schemaHooks.validateData(driverPatchValidator), schemaHooks.resolveData(driverPatchResolver)],
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
    [driverPath]: DriverService
  }
}
