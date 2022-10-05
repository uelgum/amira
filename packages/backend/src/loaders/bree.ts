import path from "path";
import Bree from "bree";

// Intern
import logger from "@loaders/logger";

/**
    Pfad zu den Jobs.
*/
const JOBS_PATH = path.join(__dirname, "../jobs");

/**
    Job-Scheduler.
*/
const bree = new Bree({
    logger: false,
    root: JOBS_PATH,
    jobs: [
        {
            name: "dailies",
            interval: "at 12:00 am"
        }
    ]
});

/**
    Initialisiert den Job-Scheduler.
*/
const loadJobs = async () => {
    const start = performance.now();

    await bree.start();

    const jobs = bree.config.jobs.length;

    const end = performance.now();
    const duration = Math.round(end - start);

    logger.info(`Jobs geladen (insgesamt ${jobs}) (${duration}ms)`);
};

export {
    loadJobs
};

export default bree;