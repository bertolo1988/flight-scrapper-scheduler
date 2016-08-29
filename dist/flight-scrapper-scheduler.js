var debug = require('debug')('flight-scrapper-scheduler');
var CronJob = require('cron').CronJob;
var tasksCompleted = 0,
	job, options;
var FlightScrapper = require('flight-scrapper');

function flightScrapperScheduler() {

	function printStatus() {
		debug('Starting with the following options:\n' + JSON.stringify(options, null, 2));
		debug('Number of routes: ' + options.flightScrapper.routes.length);
		debug('Estimated total flights: ' + options.flightScrapper.periods * 15 * options.flightScrapper.routes.length);
	}

	function startJob(inputOptions) {
		options = inputOptions;
		printStatus();
		job = new CronJob({
			cronTime: options.cronPattern,
			onTick: function() {
				let scrapPromise = FlightScrapper.run(options.flightScrapper);
				scrapPromise.then((res) => {
					tasksCompleted++;
					debug('Scrapped ' + res.length + ' flights. Completed task nº ' + tasksCompleted);
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

module.exports = flightScrapperScheduler();