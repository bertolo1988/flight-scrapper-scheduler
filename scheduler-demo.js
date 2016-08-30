let config = require('./config');
let FlightScrapperScheduler = require('./src/flight-scrapper-scheduler');

FlightScrapperScheduler.startJob(config);