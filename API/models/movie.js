/*
 * Very simple user model. Basically wraps Mongoose calls, 
 * but can easily add more functionality.
 */
var uuid = require('node-uuid');

var Movie = {
  init: function(mongoose) {
    //Create a Mongoose Model
    this.model = mongoose.model('Movie', new mongoose.Schema({
      id: {type: String, required: true, unique: true},
      title: {type: String, required: true, unique: true},
      rating: String,
      votes: Number,
      image: {type: String, default: 'http://placehold.it/64x64'}
    }));

    return this;
  },

  create: function(theMovie, callback) {
    this.model.count(function(err, count) {
      if(err) {
        return callback(err);
      }

      theMovie.id = uuid.v4();
      Movie.model.create(theMovie, callback);
    });
  },

  get: function(id, callback) {
    //findOne will return a single object, or null if nothing was found
    this.model.findOne({id: id}, {__v: 0, _id: 0}, callback);
  },

  getAll: function(callback) {
    //find will return an array of users. Without a query for the first
    //param, it will return all users    
    this.model.find({}, {__v: 0, _id: 0}, callback);
  },
          
  sortByVote: function(callback) {
    //find will return an array of users. Without a query for the first
    //param, it will return all users    
    this.model.find().sort({'votes': 1}).exec(callback);
  },

  sortBy: function(field, callback) {
    //find all movies and sort by paramater
    console.log(field);
    var sortByField;
    
    if (field == 'title') {
        sortByField = { 'title' : 1 };
    } else if (field=="votes") {
        sortByField = { "votes" : 1 };
    }
    
    this.model.find().sort(sortByField).exec(callback);
  },


  delete: function(id, callback) {
    this.model.remove({id: id}, callback);
  }
};

//Allows us to load the model via require
module.exports = Movie;
