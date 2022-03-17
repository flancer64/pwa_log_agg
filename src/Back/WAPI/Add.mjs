/**
 * WAPI service to add one log entry to aggregator.
 *
 * @namespace Fl64_Log_Agg_Back_WAPI_Add
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_WAPI_Add';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class Fl64_Log_Agg_Back_WAPI_Add {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {Fl64_Log_Agg_Shared_WAPI_Add.Factory} */
        const route = spec['Fl64_Log_Agg_Shared_WAPI_Add.Factory$'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {TeqFw_Web_Back_Mod_Event_Reverse_Registry} */
        const registry = spec['TeqFw_Web_Back_Mod_Event_Reverse_Registry$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Back_Log_Added} */
        const esbLogAdded = spec['Fl64_Log_Agg_Shared_Event_Back_Log_Added$'];
        /** @type {Fl64_Log_Agg_Back_Mod_Convert_LogEntry} */
        const convert = spec['Fl64_Log_Agg_Back_Mod_Convert_LogEntry$'];

        // MAIN
        logger.setNamespace(this.constructor.namespace);

        // INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // FUNCS
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
                    const data = convert.wapiToRdb(req);
                    // noinspection JSValidateTypes
                    const {id} = await crud.create(trx, rdbLog, data);
                    await trx.commit();
                    res.id = id;
                    // publish new log event to connected fronts
                    const newEntry = convert.rdbToNet(data);
                    for (const one of registry.getAll()) {
                        const event = esbLogAdded.createDto();
                        event.data.item = newEntry;
                        event.meta.frontUUID = one.frontId;
                        // noinspection ES6MissingAwait
                        portalFront.publish(event);
                    }

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
