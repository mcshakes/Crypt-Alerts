process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const server = require('../server');
const should = chai.should();
const request = require("request");
chai.use(chaiHttp);

const base = 'http://localhost:3001';

describe('Registration Service', () => {

  describe('when not stubbed', () => {

    describe("POST /api/users/signup", () => {

      it("should register a new user with JWT token", (done) => {
        const options = {
          method: "post",
          body: {
          	"email": "fake_man_666@test.com",
          	"password": "password1"
          },
          json: true,
          url: `${base}/api/users/signup`
        };

        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers["content-type"].should.contain("application/json");
          body.message.should.eql("User Created");
          body.success.should.eql(true)
          body.should.include.keys("message", "token", "success")
        });
        done();

      }) // it block
    })

  });

  // describe('when stubbed', () => {
  //   beforeEach(() => {
  //     this.get = sinon.stub(request, 'post');
  //   });
  //   afterEach(() => {
  //     request.restore();
  //   });
  //   // test cases
  // });

});
