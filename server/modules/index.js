const modules = [
    require('./bounty-hunters'),
    require('./accounts')
]

/**
 * Wire up the modules and set up the express routes. This code shouldn't change per-module.
 * @param {Express} app 
 * @param {Object} context 
 */
function wire(app, context) {
    // For each module...
    modules.forEach(m => {
        // Register each route
        m.routes.forEach(route => {
            const path = `/api/:version/${m.name}/${route.path}`;
            const method = (req, res) => {
                // TODO: Should version be determined here or at the Route level?
                route.method(req, res, req.params.version, context);
            };

            if (['get', 'post', 'put', 'patch', 'delete'].includes(route.verb)) {
                console.log(route.verb, path);
                app[route.verb](path, method);
            } else {
                throw new Error(`Cannot create route. Unknown verb ${route.verb}.`);
            }
        });
    });
}

module.exports = wire;