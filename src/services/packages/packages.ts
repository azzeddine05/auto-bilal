// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  packageDataResolver,
  packageDataValidator,
  packageExternalResolver,
  packagePatchResolver,
  packagePatchValidator,
  packageQueryResolver,
  packageQueryValidator,
  packageResolver
} from './packages.schema'

import type { Application } from '../../declarations'
import { PackageService, getOptions } from './packages.class'

export const packagePath = 'packages'
export const packageMethods: Array<keyof PackageService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './packages.class'
export * from './packages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const packageService = (app: Application) => {
  // Register our service on the Feathers application
  app.use(packagePath, new PackageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: packageMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(packagePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(packageExternalResolver),
        schemaHooks.resolveResult(packageResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(packageQueryValidator), schemaHooks.resolveQuery(packageQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(packageDataValidator), schemaHooks.resolveData(packageDataResolver), 
        (context) => {
          // @ts-ignore
          if (context?.data?.features) {
            // @ts-ignore
            context.data.features = JSON.stringify(context.data.features);
          }
        }
      ],
      patch: [schemaHooks.validateData(packagePatchValidator), schemaHooks.resolveData(packagePatchResolver), 
        (context) => {
          // @ts-ignore
          if (context?.data?.features) {
            // @ts-ignore
            context.data.features = JSON.stringify(context.data.features);
          }
        }
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
    [packagePath]: PackageService
  }
}
