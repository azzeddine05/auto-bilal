import { carDriver } from './car_drivers/car_drivers'
import { infraction } from './infractions/infractions'
import { driver } from './drivers/drivers'
import { car } from './cars/cars'
import { setting } from './settings/settings'
import { entity } from './entities/entities'
import { packageService } from './packages/packages'
import { permission } from './permissions/permissions'
import { role } from './roles/roles'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(carDriver)
  app.configure(infraction)
  app.configure(driver)
  app.configure(car)
  app.configure(setting)
  app.configure(entity)
  app.configure(packageService)
  app.configure(permission)
  app.configure(role)
  app.configure(user)
  // All services will be registered here
}
