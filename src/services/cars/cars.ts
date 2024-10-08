// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  carDataValidator,
  carPatchValidator,
  carQueryValidator,
  carResolver,
  carExternalResolver,
  carDataResolver,
  carPatchResolver,
  carQueryResolver
} from './cars.schema'

import type { Application } from '../../declarations'
import { CarService, getOptions } from './cars.class'

export const carPath = 'cars'
export const carMethods: Array<keyof CarService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './cars.class'
export * from './cars.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const car = (app: Application) => {
  // Register our service on the Feathers application
  app.use(carPath, new CarService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: carMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(carPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(carExternalResolver),
        schemaHooks.resolveResult(carResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(carQueryValidator), schemaHooks.resolveQuery(carQueryResolver)],
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
      create: [schemaHooks.validateData(carDataValidator), schemaHooks.resolveData(carDataResolver)],
      patch: [schemaHooks.validateData(carPatchValidator), schemaHooks.resolveData(carPatchResolver)],
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
    [carPath]: CarService
  }
}
