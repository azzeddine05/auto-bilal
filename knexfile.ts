// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html

// Load our database connection info from the app configuration
const config = {
  client: 'pg',
  connection: 'postgres://bilal_auto_user:bilal_auto_password@database/bilal_auto_db'
}

module.exports = config
