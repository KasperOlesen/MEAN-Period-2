/**
 * Created by Kasper on 25-05-2016.
 */
// The following example won´t work, because chai and nock is not installed in the project, and we don´t have access to
// the jokes js file.

var expect = require("chai").expect;
var jokes = require("../model/jokes");
var nock = require("nock");
var testJoke = {"id": 1234, "joke": "Sunshine reggae....jubiii", "reference": "unknown"};

var n = nock('http://localhost:3000');

describe('Jokes API Get', function () {
    before(function (done) {
        n.get('/api/joke/random')
            .reply(200,testJoke );
        done();
    });

    it('should fetch the "Sunshine reggae....jubiii" joke', function () {
        jokes.getRandomJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.reference).to.be.equal("unknown");
            expect(joke).to.be.eql(testJoke);
        })
    });
});