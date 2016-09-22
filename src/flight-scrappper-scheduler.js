var debug = require('debug')('flight-scrappper-scheduler');
var CronJob = require('cron').CronJob;
var tasksCompleted = 0,
	job, options;
var FlightScrappper = require('flight-scrappper');

function flightScrappperScheduler() {

	function millisToMinutes(duration) {
		let seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);
		hours = (hours < 10) ? '0' + hours : hours;
		minutes = (minutes < 10) ? '0' + minutes : minutes;
		seconds = (seconds < 10) ? '0' + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds;
	}

	function printElapsedTime(start, end) {
		debug('Started task nº ' + tasksCompleted + ' at ' + start + ' and finished at ' + end + '. Took ' + millisToMinutes(end - start));
	}

	function printStatus() {
		let millisFlightPrediction = 2000;
		let flightsPerPagePrediction = 15;
		let flightsCount = options.flightScrappper.routes.length * options.flightScrappper.periods * flightsPerPagePrediction;
		debug('Starting with the following options:\n' + JSON.stringify(options, null, 2));
		debug('Estimations:');
		debug('Flights: ' + flightsCount);
		debug('Millis per flight: ' + millisFlightPrediction);
		debug('Time per run: ' + millisToMinutes(flightsCount * millisFlightPrediction));
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
					debug('Scraped ' + res.length + ' flights.');
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