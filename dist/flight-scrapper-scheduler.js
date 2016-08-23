/*var Config = require('./config');*/
let debug = require('debug')('flight-scrapper-scheduler.js');
let FlightScrapper = require('flight-scrapper');

debug('Hello');
FlightScrapper.run();