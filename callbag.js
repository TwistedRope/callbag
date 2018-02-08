(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Random GUID generator taken from https://stackoverflow.com/a/105074/5743554
// From Jon Surrell https://stackoverflow.com/users/1432801/jon-surrell

var guid = function guid() {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

// Iterable function taken from https://stackoverflow.com/a/32538867/5743554
// From Tomas Kulich https://stackoverflow.com/users/1761457/tomas-kulich

var isIterable = function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
};

exports.createCallbag = function () {
  var speakers = []; // Holds the functions that are allowed to speak to the callbag.
  var listeners = []; // Holds the functions that are called when a speaker talks to the callbag.

  /*------------------------------------*/
  /* Add a listener function            */
  /*                                    */
  /* Input: a function                  */
  /* Output: the uuid of the function   */
  /*         for future removal         */
  /*------------------------------------*/
  var speakTo = function speakTo(listenerFn) {
    var uuid = guid();

    listeners.push({
      uuid: uuid,
      fn: listenerFn
    });

    return uuid;
  };

  /*------------------------------------*/
  /* Remove a listener function         */
  /*                                    */
  /* Input: an uuid                     */
  /* Output: a boolean true if the uuid */
  /*         was found and the function */
  /*         removed.                   */
  /*------------------------------------*/
  var stopSpeakingTo = function stopSpeakingTo(uuid) {
    var listenerIndex = listeners.findIndex(function (listener) {
      return listener.uuid === uuid;
    });

    if (listenerIndex > -1) {
      listeners.splice(listenerIndex, 1);
      return true;
    }

    return false;
  };

  /*------------------------------------*/
  /* Speak directly to the callbag      */
  /*                                    */
  /* Input: arguments to pass to the    */
  /*        listeners                   */
  /* Output: none                       */
  /*------------------------------------*/
  var hearNow = function h() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      listener.fn.apply(listener, args);
    });
  };

  /*------------------------------------*/
  /* Add a speaker function             */
  /*                                    */
  /* Input: a function                  */
  /* Output: an object holding          */
  /*         - the uuid of the function */
  /*           for future removal       */
  /*         - the speak function to be */
  /*           used                     */
  /*------------------------------------*/
  var hearFrom = function hearFrom(speakerFn) {
    var uuid = guid();

    speakers.push({
      uuid: uuid,
      fn: speakerFn
    });

    return {
      uuid: uuid,
      speak: function s() {
        if (speakers.findIndex(function (speaker) {
          return speaker.uuid === uuid;
        }) > -1) {
          var res = speakerFn.apply(undefined, arguments);

          if (typeof res === 'string' || !isIterable(res)) {
            hearNow(res);
          } else {
            hearNow.apply(undefined, _toConsumableArray(res));
          }
        }
      }
    };
  };

  /*------------------------------------*/
  /* Remove a speaker function          */
  /*                                    */
  /* Input: an uuid                     */
  /* Output: a boolean true if the uuid */
  /*         was found and the function */
  /*         removed.                   */
  /*------------------------------------*/
  var stopHearingFrom = function stopHearingFrom(uuid) {
    var speakerIndex = speakers.findIndex(function (speaker) {
      return speaker.uuid === uuid;
    });

    if (speakerIndex > -1) {
      speakers.splice(speakerIndex, 1);
      return true;
    }

    return false;
  };

  return {
    speakTo: speakTo,
    stopSpeakingTo: stopSpeakingTo,
    hearNow: hearNow,
    hearFrom: hearFrom,
    stopHearingFrom: stopHearingFrom
  };
};

/***/ })
/******/ ]);
});