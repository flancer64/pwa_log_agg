/**
 * WAPI service to add one log entry to aggregator.
 *
 * @namespace Fl64_Log_Agg_Back__WAPI_Add
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back__WAPI_Add';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl64_Log_Agg_Back__WAPI_Add {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {Fl64_Log_Agg_Shared_WAPI_Add.Factory} */
        const route = spec['Fl64_Log_Agg_Shared_WAPI_Add.Factory$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_App_Server_Handler_WAPI_Context} context
             */
            async function service(context) {
                /** @type {Fl64_Log_Agg_Shared_WAPI_Add.Request} */
                const req = context.getInData();
                /** @type {Fl64_Log_Agg_Shared_WAPI_Add.Response} */
                const res = context.getOutData();
                const trx = await rdb.startTransaction();
                try {
                    /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto} */
                    const data = rdbLog.createDto();
                    data.message = req.message;
                    data.meta = req.meta;
                    // noinspection JSValidateTypes
                    const {id} = await crud.create(trx, rdbLog, data);
                    await trx.commit();
                    res.id = id;
                } catch (e) {
                    logger.error(e);
                    await trx.rollback();
                    throw e;
                }
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }
    }

}
