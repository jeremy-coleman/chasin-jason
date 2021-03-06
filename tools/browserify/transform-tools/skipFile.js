// Generated by CoffeeScript 1.9.2
(function() {
  var JS_EXTENSIONS, endsWith, isArray, path;

  path = require('path');

  JS_EXTENSIONS = [".js", ".coffee", ".coffee.md", ".litcoffee", "._js", "._coffee", ".jsx", ".es", ".es6"];
  
  //JS_EXTENSIONS = [".js", ".coffee", ".coffee.md", ".litcoffee", "._js", "._coffee", ".jsx", ".es", ".es6", ".tsx", ".ts"];

  isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  module.exports = function(file, configData, options) {
    var appliesTo, extension, fileToTest, i, includeExtensions, includeThisFile, j, k, l, len, len1, len2, len3, ref, ref1, regex, regexes, skip;
    if (configData == null) {
      configData = {};
    }
    if (options == null) {
      options = {};
    }
    file = path.resolve(file);
    skip = false;
    appliesTo = configData.appliesTo;
    if ((appliesTo == null) || ((appliesTo.includeExtensions == null) && (appliesTo.excludeExtensions == null) && (appliesTo.regex == null) && (appliesTo.files == null))) {
      appliesTo = options;
    }
    includeExtensions = appliesTo != null ? appliesTo.includeExtensions : void 0;
    if ((appliesTo != null ? appliesTo.jsFilesOnly : void 0) && !includeExtensions) {
      includeExtensions = JS_EXTENSIONS;
    }
    if (appliesTo.regex != null) {
      regexes = appliesTo.regex;
      includeThisFile = false;
      if (!isArray(regexes)) {
        regexes = [regexes];
      }
      for (i = 0, len = regexes.length; i < len; i++) {
        regex = regexes[i];
        if (!regex.test) {
          regex = new RegExp(regex);
        }
        if (regex.test(file)) {
          includeThisFile = true;
          break;
        }
      }
      if (!includeThisFile) {
        skip = true;
      }
    } else if (appliesTo.files != null) {
      includeThisFile = false;
      ref = appliesTo.files;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        fileToTest = ref[j];
        fileToTest = path.resolve(configData.configDir, fileToTest);
        if (fileToTest === file) {
          includeThisFile = true;
          break;
        }
      }
      if (!includeThisFile) {
        skip = true;
      }
    } else if (appliesTo.excludeExtensions != null) {
      ref1 = appliesTo.excludeExtensions;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        extension = ref1[k];
        if (endsWith(file, extension)) {
          skip = true;
          break;
        }
      }
    } else if (includeExtensions != null) {
      includeThisFile = false;
      for (l = 0, len3 = includeExtensions.length; l < len3; l++) {
        extension = includeExtensions[l];
        if (endsWith(file, extension)) {
          includeThisFile = true;
          break;
        }
      }
      if (!includeThisFile) {
        skip = true;
      }
    }
    return skip;
  };

}).call(this);
