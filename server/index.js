const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const Encryption = require('./services/Encryption');

const app = express()
app.use(bodyParser.json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Create the context object
  const context = {};
  context.encryption = new Encryption();
  context.knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './data/dev.db'
    },
    useNullAsDefault: true
  });

  // Initialize the database
  // TODO: Move this to the module layer
  fs.writeFileSync('./data/dev.db', "");
  if (! await context.knex.schema.hasTable('accounts')) {
    await context.knex.schema.createTable('accounts', table => {
      table.increments('id');
      table.string('name', 80);
      table.string('email', 80);
      table.string('password', 256);
    });
  }

  // Wire the API layer
  const wire = require('./modules');
  wire(app, context);

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
