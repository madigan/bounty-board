const Model = require('core/Model');
const BountyHunterV1 = require('./v1/BountyHunter');

class BountyHunter extends Model {
    constructor({ id, name, title }) {
        super();
        this.id = id;
        this.name = name;
        this.title = title;
    }

    toVersion(version) {
        switch (version) {
            case "V1":
                return new BountyHunterV1({
                    id: this.id,
                    name: `${this.title} ${this.name}`
                });
            default:
                return this;
        }
    }
}

module.exports = BountyHunter;