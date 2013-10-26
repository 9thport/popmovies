var request = require('request');


var Movie = {
  get: function(id, callback) {
    var url = '/movie/' + id; 

    if(typeof id === 'function') {
      callback = id;
      url = '/movies';
    }

    request({
      url: process.config.api + url, 
      json: true
    }, function (err, response, body) {
      if(err) {
        return callback({
          error: err.message
        });
      }

      if (response.statusCode !== 200) {
        return callback({
          error: 'Response returned code ' + response.statusCode
        });
      }

      callback(null, body);
    });
  },

  sort: function(fieldName, callback){
    var url = '/movies/sortBy/' + fieldName; 
    //var url = '/movies/sortBy/';

    if(typeof fieldName === 'function') {
      callback = fieldName;
      url = '/movies';
    }

    request({
      url: process.config.api + url, 
      json: true
    }, function (err, response, body) {
      if(err) {
        return callback({
          error: err.message
        });
      }

      if (response.statusCode !== 200) {
        return callback({
          error: 'Response returned code ' + response.statusCode
        });
      }

      callback(null, body);
    });

  },

  create: function(data, callback) {
    request({
      url: process.config.api + '/movie',
      method: 'POST', 
      json: true,
      body: data
    }, function (err, response, body) {
      if(err) {
        return callback({
          error: err.message
        });
      }

      if (response.statusCode !== 200) {
        return callback({
          error: 'Response returned code ' + response.statusCode
        });
      }

      callback(null, body);
    });
  }
};

module.exports = Movie;