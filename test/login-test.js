process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const server = require('../server');
const should = chai.should();
const request = require("request");
chai.use(chaiHttp);

const base = 'http://localhost:3001';

describe('Login Service', () => {

  describe('when not stubbed', () => {

    describe("POST /api/users/login", () => {

      it("should log user in", (done) => {
        const options = {
          method: "post",
          body: {
          	"email": "test_user@test.com",
          	"password": "password1"
          },
          json: true,
          url: `${base}/api/users/login`
        };

        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers["content-type"].should.contain("application/json");
          body.message.should.eql("Auth successful");
          body.success.should.eql(true)
        });
        done();

      }) // it block

      it("should return a JWT upon authentication", (done) => {
        const options = {
          method: "post",
          body: {
          	"email": "test_user@test.com",
          	"password": "password1"
          },
          json: true,
          url: `${base}/api/users/login`
        };

        request.post(options, (err, res, body) => {
          body.should.include.keys("message", "token", "success")
        });
        done();
      }) //it block
    })

  });

  describe('when stubbed', () => {
    beforeEach(() => {
      this.get = sinon.stub(request, 'post');
    });
    afterEach(() => {
      request.restore();
    });
    // test cases
  });

});
