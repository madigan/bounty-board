const Model = require('core/Model');

class BountyHunter extends Model {
    constructor({ id, name }) {
        super();
        this.id = id;
        this.name = name;
    }
}

module.exports = BountyHunter;