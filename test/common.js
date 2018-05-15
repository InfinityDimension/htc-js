// var Buffer = require('buffer/').Buffer;
var cryptoLib = require('crypto-browserify');
var should = require('should');
var chai = require('chai');

global.chai = chai;
global.assert = chai.assert;
global.expect = chai.expect;
chai.config.includeStack = true;
global.should = require('should');

process.env.NODE_ENV = 'test';

var htc = require('../index.js');

exports.htc = htc;
exports.cryptoLib = cryptoLib;
exports.should = should;