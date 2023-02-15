/**
 * Model to clean up logs data in RDB.
 */
// MODULE'S VARS
const INTERVAL = 1000 * 60 * 60; // 1 hour

// MODULE'S CLASSES
export default class Fl64_Log_Agg_Back_Mod_Clean {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_Connect} */
        const conn = spec['TeqFw_Db_Back_RDb_IConnect$']; // use interface as implementation
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];

        // VARS & INIT
        logger.setNamespace(this.constructor.name);
        /** @type {typeof Fl64_Log_Agg_Back_Store_RDb_Schema_Log.ATTR} */
        const ATTR = rdbLog.getAttributes();
        let _idi;

        // FUNCS
        async function clean() {
            const trx = await conn.startTransaction();
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
        }

        // INSTANCE METHODS

        this.start = function () {
            this.stop();
            _idi = setInterval(clean, INTERVAL);
        }

        this.stop = function () {
            if (_idi) {
                clearInterval(_idi);
                _idi = null;
            }
        }

    }
}
