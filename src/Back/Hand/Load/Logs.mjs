/**
 * Load the latest logs when front start monitoring.
 *
 * @namespace Fl64_Log_Agg_Back_Hand_Load_Logs
 */
export default class Fl64_Log_Agg_Back_Hand_Load_Logs {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {TeqFw_Core_Back_Mod_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_Mod_Event_Bus$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Server_Handler_Reverse_Portal$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request} */
        const esfLogsReq = spec['Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response} */
        const esbLogsRes = spec['Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response$'];
        /** @type {Fl64_Log_Agg_Back_Mod_Convert_LogEntry} */
        const convert = spec['Fl64_Log_Agg_Back_Mod_Convert_LogEntry$'];

        // VARS
        /** @type {typeof Fl64_Log_Agg_Back_Store_RDb_Schema_Log.ATTR} */
        const A_LOG = rdbLog.getAttributes();

        // MAIN
        logger.setNamespace(this.constructor.namespace);
        eventsBack.subscribe(esfLogsReq.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto} data
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta.Dto} meta
         * @return {Promise<void>}
         */
        async function onRequest({data, meta}) {
            const limit = data?.limit;
            const trx = await rdb.startTransaction();
            try {
                const items = [];
                const order = [{column: A_LOG.ID, order: 'desc'}];
                // noinspection JSValidateTypes
                /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto[]} */
                const found = await crud.readSet(trx, rdbLog, null, null, order, limit);
                await trx.commit();
                for (const one of found) {
                    /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto} */
                    const dto = convert.rdbToNet(one);
                    items.push(dto);
                }
                // send contact card to recipient
                const event = esbLogsRes.createDto();
                event.meta.frontUUID = meta.frontUUID;
                event.data.items = items;
                event.data.requestEventUuid = meta.uuid;
                // noinspection ES6MissingAwait
                portalFront.publish(event);
            } catch (error) {
                await trx.rollback();
                logger.error(error);
            }
        }
    }
}
