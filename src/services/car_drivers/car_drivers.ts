// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  carDriverDataValidator,
  carDriverPatchValidator,
  carDriverQueryValidator,
  carDriverResolver,
  carDriverExternalResolver,
  carDriverDataResolver,
  carDriverPatchResolver,
  carDriverQueryResolver
} from './car_drivers.schema'

import type { Application } from '../../declarations'
import { CarDriverService, getOptions } from './car_drivers.class'

export const carDriverPath = 'car_drivers'
export const carDriverMethods: Array<keyof CarDriverService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './car_drivers.class'
export * from './car_drivers.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const carDriver = (app: Application) => {
  // Register our service on the Feathers application
  app.use(carDriverPath, new CarDriverService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: carDriverMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(carDriverPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(carDriverExternalResolver),
        schemaHooks.resolveResult(carDriverResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(carDriverQueryValidator),
        schemaHooks.resolveQuery(carDriverQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(carDriverDataValidator),
        schemaHooks.resolveData(carDriverDataResolver)
      ],
      patch: [
        schemaHooks.validateData(carDriverPatchValidator),
        schemaHooks.resolveData(carDriverPatchResolver)
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
    [carDriverPath]: CarDriverService
  }
}
