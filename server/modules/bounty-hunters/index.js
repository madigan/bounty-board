const Response = require('../../core/Response');

const getById = require('./getById');

module.exports = {  // TODO: Abstract to Module class
    name: "bountyhunters",
    routes: [
        {
            verb: "get",
            path: ":id",
            method: async (req, res, version, context) => { // TODO: Abstract to route class
                try {
                    const result = await getById({
                        id: req.params.id
                    }, context);

                    res.json(new Response({
                        data: result.toVersion(version)
                    }));
                } catch (error) {
                    res.json({
                        message: error.message,
                        status: 500
                    });
                }
            }
        }
    ]
}