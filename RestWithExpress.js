/**
 * Created by Kasper on 25-05-2016.
 */
//Like always I start to make the base setup like this:

// call the packages I need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let me get the data from a POST rendered in the req.body object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Then I need to register all the routes or endpoints. By using this statement all the routes will be prefixed with /api.

app.use('/api', router);
//
// I can make a get endpoint which returns a random joke like this.

router.get('/joke/random', function(req,res,next){
    res.json({joke : jokes.getRandomJoke()});
});
//I am sending back information as JSON data because this is standard for an API and will help the people using the API to use the data.

//  To store a new joke I can make an endpoint or route like this and return a JSON message back.

router.post('/storejoke', function(req, res){
    jokes.addJoke(req.body.joke);
    res.json({Message: "New Joke succesfully stored"});
});

//Updating a joke can be done like this:

router.put('/joke/:joke_id', function(req, res){
    var id = req.params.joke_id;
    jokes.allJokes[id] = req.body.joke;
    res.json({message: "Joke with id: " + id + " was succesfully updated"});
});

//And finally a delete endpoint could be done like this:

router.delete('/joke/:joke_id', function(req, res){
    var id = req.params.joke_id;
    jokes.removeJoke(id);
    res.json({message: "Joke with id: " + id + " was succesfully removed"});
});

//To test all these endpoints can I use the request package like this:

var request = require("request");

var getRandom = {
    url: "http://localhost:3000/api/joke/random", method: "GET",
    json : true
};

var getAll = {
    url: "http://localhost:3000/api/jokes", method: "GET",
    json : true
};

var storeJoke = {
    url: "http://localhost:3000/api/storejoke", method: "POST",
    json : true,
    body : {joke : "I'm a joke"}
};

var updateJoke = {
    url: "http://localhost:3000/api/joke/3", method: "PUT",
    json : true,
    body : {joke : "I'm a updated joke"}
};

var deleteJoke = {
    url: "http://localhost:3000/api/joke/2", method: "DELETE",
    json: true
};

request(getRandom,function(error,res,body){
    console.log(body.joke); //Assume the service returns the a random Joke
});

request(getAll,function(error,res,body){
    console.log(body.allJokes); //Assume the service returns an array with all Jokes
});

request(storeJoke,function(error,res,body){
    console.log(body.newJoke); //Assume the service returns the new Joke
});

request(updateJoke,function(error,res,body){
    console.log(body.message); //Assume the service returns an update message
});

request(deleteJoke,function(error,res,body){
    console.log(body.message); //Assume the service returns an remove message
});
//This kind of testing is similar to the use of POSTMAN where you can test the request and response. That means you cannot make an assert.