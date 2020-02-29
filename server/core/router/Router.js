const Joi = require('@hapi/joi');

const routeSchema = Joi.object({
    url: Joi.string().pattern(/^(\/(:\w+|\w+|_\w+))+$/).required(),
    verb: Joi.string().valid('get', 'post', 'put', 'patch', 'delete').required(),
    fn: Joi.function().required()
}).options({ stripUnknown: true });

class Router {
    constructor({ server }) {
        if (!server) throw Error("Router requires 'server' to operate.");

        this.server = server;
    }

    /**
     * 
     * @param {Object} info General information on the module being registered.
     * @param {string} info.name The name of the module. Used when generating default routes.
     * @param {Object} config Router-specific configuration.
     * @param {boolean} config.useDefaults Whether to apply the default set of routes. Requires info.name
     * @param {Array<Object>} config.routes An array of routes to add to the server.
     */
    register({ name }, { useDefaults, routes }) {
        if (useDefaults) {
            if (!name) throw new Error("`info.name` is required to generate default routes.");

            routes.push(require('./default.routes')(name));
        }

        if (!Array.isArray(routes)) routes = [routes];

        routes.forEach(route => {
            const { value, error: validationError } = routeSchema.validate(route);
            if (validationError) throw validationError; // TODO: Convert to standardized error?

            this.server[value.verb](value.url, route.fn);
        });
    }
}

module.exports = Router;