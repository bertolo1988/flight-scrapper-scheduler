var debug = require('debug')('flight-scrappper-scheduler');
var CronJob = require('cron').CronJob;
var tasksCompleted = 0,
    job, options;
var FlightScrappper = require('flight-scrappper');

function flightScrappperScheduler() {

    const MS_PER_SEC = 1000;

    function millisToMinutes(duration) {
        let seconds = parseInt((duration / MS_PER_SEC) % 60),
            minutes = parseInt((duration / (MS_PER_SEC * 60)) % 60),
            hours = parseInt((duration / (MS_PER_SEC * 60 * 60)) % 24);
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    }

    function printElapsedTime(start, end) {
        debug('Started task nº ' + tasksCompleted + ' at ' + start + ' and finished at ' + end + '. Took ' + millisToMinutes(end - start));
    }

    function printOptions() {
        debug('Starting with the following options:\n' + JSON.stringify(options, null, 4));
    }

    function reverseRoutes(inputOptions) {
        if (inputOptions.reverseRoute) {
            let reversedRoutes = [];
            for (let route of inputOptions.flightScrappper.routes) {
                reversedRoutes.push(route);
                reversedRoutes.push({
                    from: route.to,
                    to: route.from
                });
            }
            inputOptions.flightScrappper.routes = reversedRoutes;
        }
        return inputOptions;
    }

    function startJob(inputOptions) {
        options = reverseRoutes(inputOptions);
        printOptions();
        job = new CronJob({
            cronTime: options.cronPattern,
            onTick() {
                let startTime = new Date();
                let scrapPromise = FlightScrappper.run(options.flightScrappper);
                scrapPromise.then((res) => {
                    tasksCompleted++;
                    debug('Scraped ' + res.length + ' flights.');
                    printElapsedTime(startTime, new Date());
                });
            },
            runOnInit: options.runOnInit,
            timeZone: options.timezone
        }).start();
    }

    return {
        startJob
    };
}

module.exports = flightScrappperScheduler();