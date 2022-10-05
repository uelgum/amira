import path from "path";
import Bree from "bree";

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
    jobs: []
});

export default bree;