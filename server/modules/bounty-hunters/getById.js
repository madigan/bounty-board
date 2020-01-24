const BountyHunter = require('./BountyHunter');

module.exports = ({ id }, context) => {
    return new BountyHunter({
        id,
        name: "Spiff",
        title: "Spaceman"
    });
}