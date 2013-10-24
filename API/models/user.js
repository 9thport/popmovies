/*
 * Very simple user model. Basically wraps Mongoose calls, 
 * but can easily add more functionality.
 */
var uuid = require('node-uuid');

var User = {
  init: function(mongoose) {
    //Create a Mongoose Model
    this.model = mongoose.model('User', new mongoose.Schema({
      id: {type: String, required: true, unique: true},
      username: {type: String, required: true, unique: true},
      firstName: String,
      lastName: String,
      image: {type: String, default: 'http://placehold.it/64x64'}
    }));

    return this;
  },

  create: function(usr, callback) {
    this.model.count(function(err, count) {
      if(err) {
        return callback(err);
      }

      usr.id = uuid.v4();
      User.model.create(usr, callback);
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

  delete: function(id, callback) {
    this.model.remove({id: id}, callback);
  }
};

//Allows us to load the model via require
module.exports = User;
