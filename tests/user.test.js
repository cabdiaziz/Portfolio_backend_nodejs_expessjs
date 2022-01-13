const app = require("../app");
const request = require("supertest");

//*test async code from jest docs.
// describe('POST /create', function() {
//     it('Should create a new user', function(done) {
//         return request(app)
//             .post('api/user/create')
//             .send({
//                 name: 'abdiaziiz abdullahi aden',
//                 email: 'naadirinho@gmail.com',
//                 address: 'yaqshid',
//                 phone: 617631856,
//                 gender: 'male',
//                 isAdmin: 'admin',
//                 password: 'naadirinho'
//             })
//             .set('Accept', 'application/json')
//             .expect(201)
//         done()
//     })
// })