module.exports = {
	flightScrappper: {
		periods: 60,
		interval: 96,
		routes: [{
			from: 'LIS',
			to: 'LON'
		}, {
			from: 'LIS',
			to: 'MIL'
		}, {
			from: 'LIS',
			to: 'PAR'
		}, {
			from: 'LIS',
			to: 'BCN'
		}, {
			from: 'LIS',
			to: 'IST'
		}, {
			from: 'LIS',
			to: 'NYC'
		}, {
			from: 'LIS',
			to: 'BER'
		}, {
			from: 'LIS',
			to: 'RIO'
		}, {
			from: 'LIS',
			to: 'LUA'
		}, {
			from: 'LIS',
			to: 'DXB'
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