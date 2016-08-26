let debug = require('debug')('flight-scrapper-scheduler');
let CronJob = require('cron').CronJob;
var jobCount = 0,
	options;
let FlightScrapper = require('flight-scrapper');

function flightScrapperScheduler() {

	function buildFlightScrapperOptions(scrapperOptions, route) {
		let fsOptions = JSON.parse(JSON.stringify(scrapperOptions));
		fsOptions.from = route.from;
		fsOptions.to = route.to;
		return fsOptions;
	}

	function scrapFlights() {
		if (options.routes.length > 0) {
			let route = options.routes.splice(0, 1)[0];
			let scrapOptions = buildFlightScrapperOptions(options.flightScrapper, route);
			debug('Working on route:\n' + JSON.stringify(route, null, 2));
			let fsPromise = FlightScrapper.run(scrapOptions);
			fsPromise.then((res) => {
				debug('Retrieved ' + res.length + ' results!');
				scrapFlights(options);
				return;
			});
		} else {
			jobCount++;
			debug('No more routes! Finished job nº' + jobCount);
			return;
		}
	}

	function printStatus() {
		debug('Starting with the following options:\n' + JSON.stringify(options, null, 2));
		debug('Number of routes: ' + options.routes.length);
		debug('Estimated gathered flights per route: ' + options.flightScrapper.periods * 15);
		debug('Estimated total flights: ' + options.flightScrapper.periods * 15 * options.routes.length);
	}

	function startJob(inputOptions) {
		options = inputOptions;
		printStatus();
		job = new CronJob({
			cronTime: options.cronPattern,
			onTick: scrapFlights,
			runOnInit: true,
			timeZone: 'Europe/London'
		}).start();
	}

	return {
		startJob
	};
}

module.exports = flightScrapperScheduler();