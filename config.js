module.exports = {
    flightScrappper: {
        periods: 250,
        interval: 24,
        routes: [{
            from: 'LIS',
            to: 'LON'
        }, {
            from: 'LIS',
            to: 'NYC'
        }, {
            from: 'LIS',
            to: 'BKK'
        }, {
            from: 'LIS',
            to: 'HKT'
        }],
        currency: 'EUR',
        directFlight: false,
        dateFormat: 'DD-MM-YYYY',
        database: 'localhost:27017/flight-scrappper',
        collection: 'flight-data',
        timeout: 60000
    },
    cron: {
        timezone: 'Europe/London',
        cronPattern: '0 30 8 */1 * *',
    },
    reverseRoute: true
};