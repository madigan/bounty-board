# bounty-board

> Galactic bounty board website for all your bountyhunting needs.

## Objectives

The purpose of this little app is to demonstrate a potential architecture that supports the following use cases:

- [ ] Multiple API versions (see `bounty-hunter` module)
- [ ] Sensible defaults for routing and data access
- [ ] Sensible defaults for "Data Objects" (i.e. out-of-the-box CRUD)
- [ ] Multiple access points (i.e. RESTish and GraphQL)
- [ ] Driving database setup from the application layer.
- [ ] Event-driven interactions between modules.
- [ ] Unit and integration tests.

## Architecture

The repository layout reflects a standard NUXT application; all the interesting architectural stuff is in the `./server` directory.

The `server` is responsible for setting up the `context` and routing API calls to `adapters`.

`Adapters` are interface-specific code which map API requests/responses to interface-agnostic `modules`. Adapters are responsible for handling translation from interface-specific datastructures to the pure-javascript structures used by the `modules`. They are also responsible for versioning.

`modules` represent the core business logic of the application. They generally come in one of two forms:

- Data Modules encapsulate a particular entity (e.g. an Account or a BountyHunter) and provide generic CRUD operations.
- Workflow Modules contain orchestration functions which may leverage Data Modules and other workflows.

## Core Data Structures

### Model

The Model is the base for any data object. The primary responsibility of Models (that is, classes which extend the Model class) is to give access to the data for the entity and to provide conversion to previous versions of the model so that backwards compatibility can be maintained.

### Context

The Context object is used to inject shared stateful services into modules (database drivers, event busses, other modules). It avoids creating global objects (which makes testing easier).

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
