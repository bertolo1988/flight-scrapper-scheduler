module.exports = {
    flightScrappper: {
        periods: 240,
        interval: 24,
        routes: [{
            from: 'LON',
            to: 'LIS'
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
        timeout: 80000,
        browser: 'chrome',
        chromedriverArgs: ['--verbose', '--log-path=chromedriver.log'],
        maximize: true,
        retries: 1
    },
    cron: {
        runOnInit: false,
        timezone: 'Europe/London',
        cronPattern: '0 30 8 */1 * *',
    },
    reverseRoute: true
};