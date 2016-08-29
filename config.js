module.exports = {
	flightScrapper: {
		periods: 1,
		interval: 72,
		routes: [{
			from: 'LIS',
			to: 'LON'
		}, {
			from: 'LIS',
			to: 'MIL'
		}],
		currency: 'USD',
		directFlight: 'false',
		dateFormat: 'DD-MM-YYYY',
		database: 'localhost:27017/flight-scrapper',
		collection: 'flight-data',
		timeout: 50000
	},
	cronPattern: '0 */5 * * * *'
};