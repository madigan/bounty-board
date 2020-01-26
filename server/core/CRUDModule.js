const EventEmitter = require('events');
const knexlib = require('knex');

const Model = require('./Model');
/**
 * What's going to change between CRUD modules?
 * getById: What Model class is returned
 * getList: What Model class is returned, what filters are available
 * delete: Nothing
 * update: What can be updated
 * create: 
 */
/**
 * Provides generic CRUD support
 */
class CRUDModule {
    constructor(name, DataClass, { bus, knex }) {
        this.name = name;

        /**
         * @type {Model}
         */
        this.DataClass = DataClass;

        /**
         * @type {EventEmitter}
         */
        this.bus = bus;

        /**
         * @type {knexlib}
         */
        this.knex = knex;
    }

    async getList(filters) {

        const raw = [];

        return raw.map(item => new DataClass(raw));
    }

    async getById(id) {

        const raw = this.knex.select('*').from(this.name).where('id', id);

        return new DataClass(raw);
    }

    async create() {

        this.bus.emit(`${name}.created`, {});
    }

    async update() {

        this.bus.emit(`${name}.updated`, {
            before: {},
            after: {}
        });
    }

    async delete(id) {
        const rowCount = await this.knex.from(this.name).where('id', id).delete();
        if (rowCount > 0)
            this.bus.emit(`${name}.deleted`, { id });
        // TODO: Consider throwing an exception if nothing is deleted (i.e. 404)
    }
}