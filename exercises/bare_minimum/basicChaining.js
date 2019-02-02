/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGitHubProfile = require('./promisification.js').getGitHubProfileAsync;


var writeJSON = function (response, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(writeFilePath, response, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(readFilePath, 'utf-8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        data = data.split('\n');
        resolve(data[0]);
      }
    });
  }).then(function(username) {
    return getGitHubProfile(username);
  }).then(function(response) {
    return writeJSON(JSON.stringify(response), writeFilePath);
  }).catch(function(err) {
    console.log(err);
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
