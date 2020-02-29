const Router = require('./Router');

class Server {
    constructor() {
        this.routes = [];
    }
    get(url, fn) {
        this.routes.push({ url, fn });
    }
}

describe("Router", () => {
    let server, router;

    beforeEach(() => {
        server = new Server();
        router = new Router({ server });
    });

    test("Adds a single route to the server", () => {
        const route = {
            url: "/api/:version/accounts",
            verb: "get",
            fn: (req, res) => { }
        };

        router.register({}, { routes: [route] });
        expect(server.routes.length).toBe(1);
    });
    test.todo("Adds multiple routes to the server");
    test("Rejects malformed URLs", () => {
        const route = {
            url: "//api/ve-rsion/accounts",
            verb: "get",
            fn: (req, res) => { }
        };

        expect(() => router.register({}, { routes: [route] })).toThrow(/url/)
    });
    test("Rejects unknown verbs", () => {
        const route = {
            url: "/api/version/accounts",
            verb: "froog",
            fn: (req, res) => { }
        };

        expect(() => router.register({}, { routes: [route] })).toThrow(/verb/)
    });
    test("Rejects function-less routes", () => {
        const route = {
            url: "/api/version/accounts",
            verb: "get"
        };

        expect(() => router.register({}, { routes: [route] })).toThrow(/fn/)
    });
});