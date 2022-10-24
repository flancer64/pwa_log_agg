/**
 * Process to periodically clean up old logs in DB (older than 24 hours).
 *
 * @namespace Fl64_Log_Agg_Back_Cron_Logs_CleanUp
 * TODO: don't init this function from plugin init. Create cleaner class (with start/stop methods)
 * TODO: ... and start cleanup from plugn's init function then stop cleanup from plugin's stop function
 */
// MODULE'S IMPORT

// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Cron_Logs_CleanUp';
// const INTERVAL = 1000 * 60 * 60; // 1 hour

// MODULE'S FUNCS
/**
 * Anonymous function that is run by DI container.
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 */
export default function (spec) {
    // DEPS
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
    const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
    /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
    const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];

    // VARS
    /** @type {typeof Fl64_Log_Agg_Back_Store_RDb_Schema_Log.ATTR} */
    const ATTR = rdbLog.getAttributes();

    // FUNCS

    /**
     * This process is started periodically and cleans expired logs in RDB.
     * @memberOf Fl64_Log_Agg_Back_Cron_Logs_CleanUp
     */
    async function process() {
        // run once after 8 secs.
        setTimeout(async () => {
            const trx = await rdb.startTransaction();
            try {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const where = (build) => build.where(ATTR.DATE, '<', yesterday);
                const deleted = await crud.deleteSet(trx, rdbLog, where);
                await trx.commit();
                if (deleted)
                    logger.info(`Logs cleaner has removed ${deleted} old entries from RDB.`);
            } catch (error) {
                await trx.rollback();
                logger.error(error);
            }
        }, 8000);
    }

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(process, 'namespace', {value: NS});
    // setInterval(process, INTERVAL)
}
