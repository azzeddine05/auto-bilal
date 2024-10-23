import type { Params } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import { UserData } from './users.class'
import { userDataValidator } from './users.schema'
import { EntityData } from '../entities/entities.class'
import { entityDataValidator } from '../entities/entities.schema'

export const createClientPath = 'create-client'
export const createClientMethods = ['create'] as const

type CreateClientData = {
  userInfo: any
  entityInfo: any
  paymentInfo: any
}

class CreateClientService {
  constructor(private app: Application) {}
  async create(data: CreateClientData, params: Params) {
    try {
      const user = data?.userInfo as UserData
      const entity = data?.entityInfo as EntityData

      const validatedUser = await userDataValidator(user)
      const validatedEntity = await entityDataValidator(entity)

      // create entity first
      const entityService = this.app.service('entities')
      const newEntity = await entityService.create(validatedEntity)

      // create user
      const userService = this.app.service('users')
      validatedUser.entity_id = newEntity.id
      const newUser = await userService.create(validatedUser)

      const updatedEntity = await entityService.patch(newEntity.id, {
        user_id: newUser.id
      });

      return {
        user: newUser,
        entity: updatedEntity,
        message: 'Client created successfully',
        status: 'success'
      }
    } catch (error) {
      return {
        message: 'Error creating client',
        status: 'error',
        error
      }
    }
  }
}

export const createClient = (app: Application) => {
  app.use(createClientPath, new CreateClientService(app), {
    // A list of all methods this service exposes externally
    methods: createClientMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
}

declare module '../../declarations' {
  interface ServiceTypes {
    [createClientPath]: CreateClientService
  }
}
