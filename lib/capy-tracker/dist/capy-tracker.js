/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * MIT License
	 *
	 * Copyright (c) 2016 Marcelo Camargo
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */

	/**
	 * Receives a window object and extracts the necessary information
	 * from the user
	 * @author Marcelo Camargo <marcelocamargo@linuxmail.org>
	 */
	var CapyTracker = function () {

	    /**
	     * Pass window to constructor. All the properties we'll access
	     * must be exposed in this object
	     * @param {object} window - The window object
	     */
	    function CapyTracker(window) {
	        _classCallCheck(this, CapyTracker);

	        this.window = window;
	    }

	    /**
	     * Extracts information about location, date and lead session
	     * @return {object}
	     */


	    _createClass(CapyTracker, [{
	        key: 'tellInfo',
	        value: function tellInfo() {
	            var info = this.window.location;
	            return {
	                url: {
	                    hostname: info.hostname,
	                    pathname: info.pathname
	                },
	                date: Date.now(),
	                session: this.session()
	            };
	        }

	        /**
	         * Creates or returns the user session.
	         * @return {object}
	         */

	    }, {
	        key: 'session',
	        value: function session() {
	            var _this = this;

	            var getSessionId = function getSessionId() {
	                return _this.window.localStorage.getItem('capy-tracker-session');
	            };
	            var sessionId = getSessionId();
	            if (undefined === sessionId) {
	                // TODO: Find a better way to generate a UID
	                this.window.localStorage.setItem('capy-tracker-session', Date.now());
	                sessionId = getSessionId();
	            }
	            return sessionId;
	        }
	    }]);

	    return CapyTracker;
	}();

	exports.default = CapyTracker;

/***/ }
/******/ ]);