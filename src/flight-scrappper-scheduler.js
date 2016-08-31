var debug = require('debug')('flight-scrappper-scheduler');
var CronJob = require('cron').CronJob;
var Moment = require('Moment');
var tasksCompleted = 0,
	job, options;
var FlightScrappper = require('flight-scrappper');

function flightScrappperScheduler() {

	function millisToMinutes(mseconds) {
		return new Moment(mseconds).format('mm:ss');
	}

	function printElapsedTime(start, end) {
		let now = new Moment().format('MMMM Do YYYY, h:mm:ss a');
		debug('Completed task nº ' + tasksCompleted + '. Took ' + millisToMinutes(end - start) + ' at ' + now);
	}

	function printStatus() {
		let millisPerFlight = 2500;
		let flightsCount = options.flightScrappper.routes.length * options.flightScrappper.periods * 15;
		debug('Starting with the following options:\n' + JSON.stringify(options, null, 2));
		debug('Estimations:');
		debug('Flights: ' + flightsCount);
		debug('Millis per flight: ' + millisPerFlight);
		debug('Time in seconds per run: ' + millisToMinutes(flightsCount * millisPerFlight));
	}

	function startJob(inputOptions) {
		options = inputOptions;
		printStatus();
		job = new CronJob({
			cronTime: options.cronPattern,
			onTick() {
				let startTime = new Date();
				let scrapPromise = FlightScrappper.run(options.flightScrappper);
				scrapPromise.then((res) => {
					tasksCompleted++;
					debug('Scrapped ' + res.length + ' flights.');
					printElapsedTime(startTime, new Date());
				});
			},
			runOnInit: true,
			timeZone: 'Europe/London'
		}).start();
	}

	return {
		startJob
	};
}

module.exports = flightScrappperScheduler();