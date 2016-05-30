
describe('Calculate', function(){
    it('returns the sum of the numbers after a plus operation', function(){
        var result = cal.calculate("plus", 2, 2);
        expect(result).to.equal(4);
        expect(result).to.be.a('number');
    });
});
//If i wanted to initialse or clean up after my test i could use the so called hooks:

    before(function() {
        // runs before all tests in this block
    });

after(function() {
    // runs after all tests in this block
});

beforeEach(function() {
    // runs before each test in this block
});

afterEach(function() {
    // runs after each test in this block
});
//If a want to test a async function like a call to my joke api i can do it like this:

describe('Get random Joke', function(){
    it('returns a random joke from my own api', function(done){
        module.joke(function(reply){
            console.log(reply);
            done();
        })
    })
});
//The important thing to remember when testing async is simply to add a callback (usually named done) to it(). Then Mocha will know that it should wait for completion.
//The code below is the code I get from the "module.joke" in my "it block".

    exports.joke = function(callback){
    var http = require('http');
    var str = '';
    http.get('http://localhost:3000/api/joke/random', function(response){
        response.on('data', function(data){
            str += data;
        });

        response.on('end', function(){
            callback(JSON.parse(str));
        });

        response.on('error', function(error){
            console.log(error);
            callback(error);
        });
    }).end();
};