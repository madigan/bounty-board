class Response {
    constructor({ status = 200, message, data }) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = Response;