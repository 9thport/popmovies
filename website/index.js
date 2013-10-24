process.config = {
  api: 'http://localhost:8675'
};

var express = require('express'),
    app = express(),

    //Load the controllers
    Movie = require('./controllers/movie_controller');

//Allows the serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  Movie.get(function(err, movies) {
    if(err) {
      console.log(err);
      return res.render('index', {movies: []});
    }

    res.render('index', {movies: movies});
    console.log(movies);
  });
});

app.get('/movie/:id', function(req, res) {
  Movie.get(req.params.id, function(err, movie) {
    if(err) {
      console.log(err);
      return res.render('movie', {});
    }

    res.render('movie', movie);
  });
});

app.get('/new', function(req, res) {
  res.render('new');
});

//Save a movie, set it to the latest
app.post('/movie', function(req, res) {
  Movie.create(req.body, function(err, movie) {
    if(err) {
      return res.send(err);
    }

    //sanatize the data
    delete movie._id;
    delete movie.__v;

    res.send(movie);
  });
});

//Start the app
app.listen(2013);