const Sequelize = require('sequelize');
const Response = require('core/Response');

const getList = require('./getList');
const createAccount = require('./createAccount');

class AccountModule {
    constructor({ sequelize }) {
        /**
         * @type {Sequelize}
         */
        this.sequelize = sequelize;

        this.AccountDB = sequelize.define('account', {
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            }
        })
    }


}

module.exports = {
    name: "accounts",
    routes: [
        {
            verb: "get",
            method: async (req, res, version, context) => { // TODO: Abstract to route class
                try {
                    const result = await getList({}, context);

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
        },
        {
            verb: "get",
            path: ":id",
            method: async (req, res, version, context) => {
                try {
                    const result = await getById({ id: req.params.id })
                } catch (error) {

                }
            }
        }
    ]
}