# flight-scrappper-scheduler

A  way to schedule web scraping tasks using cron and flight-scrappper.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a242995bca784ef1bc3f0054c5e79451)](https://www.codacy.com/app/tiagobertolo/flight-scrappper-scheduler?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bertolo1988/flight-scrappper-scheduler&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/bertolo1988/flight-scrappper-scheduler/status.svg)](https://david-dm.org/bertolo1988/flight-scrappper-scheduler)
[![devDependencies Status](https://david-dm.org/bertolo1988/flight-scrappper-scheduler/dev-status.svg)](https://david-dm.org/bertolo1988/flight-scrappper-scheduler?type=dev)

## Requirements

 - [chrome](https://www.google.com/chrome/browser/desktop/index.html)
 - [mongodb](https://www.mongodb.com/)

## Options

```js
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
        runOnInit: false,
        timezone: 'Europe/London',
        cronPattern: '0 30 8 */1 * *',
    },
    reverseRoute: true
};
```

You can set the desired options in the `config.js` file.

You can know more about the first part, related with flight-scrappper, [here](https://github.com/bertolo1988/flight-scrappper#options).

Regarding the cron pattern you can know more about it [here](https://github.com/ncb000gt/node-cron).

`reverseRoute` can be used to automatically add the reverse of the previously defined routes. With the config above it would add LON-LIS, NYC-LIS, etc.

## Running

First, you need to start your mongodb database. 

If you have  it installed in the default directory, just type `$npm run mongo-win/mac/linux` whether you use windows or mac.

To run the scheduler-demo simply type `$ npm start` or `$ npm run debug` to get some output in the console.


## Tip

`db.getCollection('flight-data').createIndex({to:1,"time.date":1});` should be a very good index for your database!
