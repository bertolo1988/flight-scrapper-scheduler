[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bac1861829e5488cb3365282fd95b7b9)](https://www.codacy.com/app/tiagobertolo/flight-scrapper-scheduler?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bertolo1988/flight-scrapper-scheduler&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/bertolo1988/flight-scrapper-scheduler/status.svg)](https://david-dm.org/bertolo1988/flight-scrapper-scheduler)
[![devDependencies Status](https://david-dm.org/bertolo1988/flight-scrapper-scheduler/dev-status.svg)](https://david-dm.org/bertolo1988/flight-scrapper-scheduler?type=dev)

# flight-scrapper-scheduler
Scheduler made using node-schedule and flight-scrapper.

# Options

You can set the desired options in the `config.js` file.

You can know more about the first part, related with flight-scrapper, [here](https://github.com/bertolo1988/flight-scrapper#options).

Regarding the cron pattern you can know more about it [here](https://github.com/ncb000gt/node-cron).

# Running

You need a mongodb database. 

If you have  it installed in the default directory, just type `npm run mongo-win/mongo-mac` whether you use windows or mac.

To run the scheduler-demo simply type `$ npm start` or `$ npm run debug` to get some output in the console.
