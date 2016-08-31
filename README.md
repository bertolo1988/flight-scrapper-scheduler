[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1e8ac2cb49314a9f9404b4415f97953d)](https://www.codacy.com/app/tiagobertolo/flight-scrappper-scheduler?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bertolo1988/flight-scrappper-scheduler&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/bertolo1988/flight-scrappper-scheduler/status.svg)](https://david-dm.org/bertolo1988/flight-scrappper-scheduler)
[![devDependencies Status](https://david-dm.org/bertolo1988/flight-scrappper-scheduler/dev-status.svg)](https://david-dm.org/bertolo1988/flight-scrappper-scheduler?type=dev)

# flight-scrappper-scheduler
Scheduler made using node-schedule and flight-scrappper.

# Options

You can set the desired options in the `config.js` file.

You can know more about the first part, related with flight-scrappper, [here](https://github.com/bertolo1988/flight-scrappper#options).

Regarding the cron pattern you can know more about it [here](https://github.com/ncb000gt/node-cron).

# Running

You need a mongodb database. 

If you have  it installed in the default directory, just type `$npm run mongo-win/mongo-mac` whether you use windows or mac.

To run the scheduler-demo simply type `$ npm start` or `$ npm run debug` to get some output in the console.
