/**
 * Load the latest logs when front starts monitoring.
 *
 * @namespace Fl64_Log_Agg_Back_Listen_Trans_Load_Logs
 */
export default class Fl64_Log_Agg_Back_Listen_Trans_Load_Logs {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Channel} */
        const eventsBack = spec['TeqFw_Web_Event_Back_Mod_Channel$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request} */
        const esfLogsReq = spec['Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response} */
        const esbLogsRes = spec['Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response$'];
        /** @type {Fl64_Log_Agg_Back_Convert_Log} */
        const convLog = spec['Fl64_Log_Agg_Back_Convert_Log$'];

        // VARS
        /** @type {typeof Fl64_Log_Agg_Back_Store_RDb_Schema_Log.ATTR} */
        const A_LOG = rdbLog.getAttributes();

        // MAIN
        logger.setNamespace(this.constructor.namespace);
        eventsBack.subscribe(esfLogsReq, onRequest)

        // FUNCS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto} dataIn
         * @param {TeqFw_Web_Event_Shared_Dto_Event_Meta_Trans.Dto} metaIn
         * @return {Promise<void>}
         */
        async function onRequest({data: dataIn, meta: metaIn}) {
            const limit = dataIn?.limit;
            const trx = await rdb.startTransaction();
            try {
                /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto[]} */
                const items = [];
                const order = [{column: A_LOG.ID, order: 'desc'}];
                // noinspection JSValidateTypes
                /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto[]} */
                const found = await crud.readSet(trx, rdbLog, null, null, order, limit);
                await trx.commit();
                for (const one of found) items.push(convLog.rdb2share(one));
                // send log items to the front
                const {meta} = portalFront.createMessage();
                meta.sessionUuid = metaIn.sessionUuid
                meta.requestUuid = metaIn.uuid
                const data = esbLogsRes.createDto();
                data.items = items;
                // noinspection JSCheckFunctionSignatures
                portalFront.publish({data, meta}).then();
            } catch (error) {
                await trx.rollback();
                logger.error(error);
            }
        }
    }
}
