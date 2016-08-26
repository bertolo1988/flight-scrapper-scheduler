let debug = require('debug')('flight-scrapper-scheduler');
let FlightScrapper = require('flight-scrapper');
let cron = require('cron');

function flightScrapperScheduler() {

	function buildFlightScrapperOptions(scrapperOptions, route) {
		let fsOptions = JSON.parse(JSON.stringify(scrapperOptions));
		fsOptions.from = route.from;
		fsOptions.to = route.to;
		return fsOptions;
	}

	function scrapFlights(options) {
		if (options.routes.length > 0) {
			let route = options.routes.splice(0, 1)[0];
			let scrapOptions = buildFlightScrapperOptions(options.flightScrapper, route);
			debug('Route:\n' + JSON.stringify(route, null, 2));
			let fsPromise = FlightScrapper.run(scrapOptions);
			fsPromise.then((res) => {
				debug('Retrieved ' + res.length + ' results!');
				scrapFlights(options);
			});
		} else {
			debug('No more routes!');
			return;
		}
	}

	function startJob(options) {
		debug('Starting with the following options:\n' + JSON.stringify(options, null, 2));
		debug('Number of routes: ' + options.routes.length);
		debug('Estimated gathered flights per route: ' + options.flightScrapper.periods * 15);
		debug('Estimated total flights: ' + options.flightScrapper.periods * 15 * options.routes.length);
		cron.job(options.cronPattern, scrapFlights(options)).start();
	}

	return {
		startJob
	};
}

module.exports = flightScrapperScheduler();