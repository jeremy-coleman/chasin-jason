// Generated by CoffeeScript 1.9.2
(function() {

  var path = require('path');

  var fs = require('fs');

  exports.parentDir = function(dir, fileToFind, done) {
    var exists, ref;
    exists = (ref = fs.exists) != null ? ref : path.exists;
    return exists(path.join(dir, fileToFind), function(fileExists) {
      var parent;
      if (fileExists) {
        return done(null, dir);
      } else {
        parent = path.resolve(dir, "..");
        if (parent === dir) {
          return done(null, null);
        } else {
          return exports.parentDir(parent, fileToFind, done);
        }
      }
    });
  };

  exports.parentDirSync = function(dir, fileToFind) {
    var answer, dirToCheck, existsSync, oldDirToCheck, ref;
    existsSync = (ref = fs.existsSync) != null ? ref : path.existsSync;
    dirToCheck = path.resolve(dir);
    answer = null;
    while (true) {
      if (existsSync(path.join(dirToCheck, fileToFind))) {
        answer = dirToCheck;
        break;
      }
      oldDirToCheck = dirToCheck;
      dirToCheck = path.resolve(dirToCheck, "..");
      if (oldDirToCheck === dirToCheck) {
        break;
      }
    }
    return answer;
  };

}).call(this);
