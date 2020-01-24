const modules = [
    require('./bounty-hunters')
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
            switch (route.verb) {
                case "get":
                    console.log(`GET /api/:version/${m.name}/${route.path}`)
                    app.get(`/api/:version/${m.name}/${route.path}`, (req, res) => {
                        // TODO: Should version be determined here or at the Route level?
                        const version = req.params.version;
                        route.method(req, res, version, context);
                    });
                    break;
                case "post":
                    app.post(`/api/:version/${m.name}/${route.path}`, route.method);
                    break;
                default:
                    console.error(`Cannot create route. Unknown verb ${route.verb}.`);
                    break;
            }
        });
    });
}

module.exports = wire;