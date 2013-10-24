var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.connection

    //Load in the models
    Movie = require('./models/movie').init(mongoose);

//Helps parse the request body for JSON POSTs
app.use(express.bodyParser());

//Listen to some database connection events
db.on('error', console.error);
db.once('open', function() {
  console.log('Database Connected.');
});

//Connect to the database
//mongoose.connect('mongodb://root:n0d3db@mongo.onmodulus.net:27017/uxar4iDa');
mongoose.connect('mongodb://root:n0d31234@mongo.onmodulus.net:27017/pY9pimyj');

// MAKE DEFAULT MOVIE
// app.get('/defmovie', fuction(req, res) {
//   Movie.create(function(err, item) {

//   })
// });

app.get('/movies', function(req, res) {
  Movie.getAll(function(err, dudes) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dudes);
  });
});

app.get('/movie/:id', function(req, res) {
  Movie.get(req.params.id, function(err, dude) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dude);
  });
});

app.get('/movies/sortBy', function(req, res) {
  Movie.sortBy(function(err, dudes) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dudes);
  });
});

app.post('/movie', function(req, res) {
  if(!req.body.title) {
    return res.send({
      error: 'Movies require at least a movie name.'
    });
  }

  Movie.create(req.body, function(err, dude) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dude);
  });
});

app.delete('/movie/:id', function(req, res) {
  Movie.delete(req.params.id, function(err) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send({});
  });
});

//Start the server
app.listen(8675); //309