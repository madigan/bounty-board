const _ = require('lodash');
_.mixin(require('lodash-inflection'));

module.exports = (name) => {
    const collection = _.camelCase(_.pluralize(name));

    return [
        {
            url: `/api/:version/${collection}/:id`,
            verb: 'get',
            fn: await(req, res) => {
            const result = Something.getById(req.params.id)
        }
        }
    ]
};