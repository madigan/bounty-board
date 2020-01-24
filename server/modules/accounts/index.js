const Response = require('core/Response');

const getList = require('./getList');
const createAccount = require('./createAccount');

module.exports = {
    name: "accounts",
    routes: [
        {
            verb: "get",
            path: "",
            method: async (req, res, version, context) => { // TODO: Abstract to route class
                try {
                    const result = await getList({
                        id: req.params.id
                    }, context);

                    res.json(new Response({
                        data: Array.isArray(result) ? result.map(item => item.toVersion(version)) : result.toVersion(version)
                    }));
                } catch (error) {
                    console.error(error);
                    res.json({
                        message: error.message,
                        status: 500
                    });
                }
            }
        },
        {
            verb: "post",
            path: "",
            method: async (req, res, version, context) => {
                try {
                    await createAccount({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    }, context);
                    res.json(new Response({}));
                } catch (error) {
                    console.error(error);
                    res.json({
                        message: error.message,
                        status: 500
                    });
                }
            }
        }
    ]
}