const crypto = require('crypto');

class Encryption {
    constructor() {
        this.secret = "ec491983-5f49-43e5-a551-ea2e87ee71c4";
    }

    encrypt(message) {
        return crypto.createHmac('sha256', this.secret)
            .update(message)
            .digest('hex');
    }
}

module.exports = Encryption;