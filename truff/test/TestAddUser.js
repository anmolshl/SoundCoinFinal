//import Chai from 'chai';
import SoundAccess from "../src/js/SoundAccess.js";
describe("Testing add user to database", function () {
    var expect = chai.expect;
    var soundAccess = new SoundAccess();
    before("Initialize global", function () {
    });
    beforeEach("Initialize for every test", function () {
        soundAccess = new SoundAccess();
    });
    after("After all tests", function () {
    });
    afterEach("After each test", function () {
        soundAccess.destroySoundAccess();
    });
    it("Add user, with new file", function () {
        return soundAccess.addUser("anmolshl2", "chenchen", "Streamer", "0x879627918eafcd22222210002f3bcd", 0)
            .then(function (success) {
                expect(success.code).to.equal(204);
            })
            .catch(function (error) {
                expect.fail();
            });
    });
    it("Add user, with new file, should fail", function () {
        return soundAccess.addUser("anmolshl21", "chenchen", "Streamerx", "0x879197918eafcd22222210002f3bcd", 0)
            .then(function (success) {
                expect.fail();
            })
            .catch(function (error) {
                expect(error.code).to.equal(400);
            });
    });
});