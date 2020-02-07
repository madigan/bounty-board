const Encryption = require('./Encryption');

describe("Encryption", () => {
    test("Encryption encrypts a message", () => {
        const service = new Encryption();
        expect(service.encrypt("Hello world! How r u?")).toBe("18a645ef2d8af457908830f4c2fe6d7535c49d12bbc3169d112dc397d0237537");
    });
});