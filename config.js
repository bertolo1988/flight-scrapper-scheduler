module.exports = {
	flightScrappper: {
		periods: 2,
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
		database: 'localhost:27017/flight-scrappper',
		collection: 'flight-data',
		timeout: 50000
	},
	cronPattern: '0 0 0 */1 * *'
};