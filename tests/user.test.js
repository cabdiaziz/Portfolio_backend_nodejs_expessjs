const app = require("../app");
const request = require("supertest");

//! Test the user api's
//*POST /signup
//*POST /login
//*POST /my-profile
//*POST /logout   or   /logout-all
//*POST /update-profile
//*POST /delete-profile

describe("POST, PUT, GET, DELETE Crud Api", function() {
    it("Should create a new user", function(done) {
        return request(app)
            .post("api/user/signup")
            .send({
                name: "Ali Ahmed",
                email: "aliahmed@gmail.com",
                address: "yaqshid",
                phone: 617631856,
                gender: "male",
                isAdmin: 'admin',
                password: "aliahmed",
            })
            .set("Accept", "application/json")
            .expect(201);
        done();
    });
    it("Should login the user account.", function(done) {
        return request(app)
            .post("api/user/signup")
            .send({
                email: "aliahmed@gmail.com",
                password: "aliahmed",
            })
            .set("Accept", "application/json")
            .expect(201);
        done();
    });
    it("Should logout the user account", function(done) {
        return request(app)
            .post("api/user/signup")
            .send({})
            .set("Accept", "application/json")
            .expect(201);
        done();
    });
    it("Should Update a User", function(done) {
        return request(app)
            .put("api/user/update_myProfile")
            .send({
                name: "abdiaziiz abdullahi aden",
                email: "ziizuu@gmail.com",
                address: "banaadir",
                phone: 627631856,
                gender: "male",
                isAdmin: 'admin',
            })
            .set("Accept", "application/json")
            .expect(200);
        done();
    });
});