/**
 * Web server handler to collect log events sent by `navigator.sendBeacon()'.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Web_Handler_Beacon';
const {
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Fl64_Log_Agg_Back_Web_Handler_Beacon {
    constructor(spec) {
        // DEPS
        /** @type {Fl64_Log_Agg_Back_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Portal_Front} */
        const portalFront = spec['TeqFw_Web_Event_Back_Mod_Portal_Front$'];
        /** @type {Fl64_Log_Agg_Back_Convert_Log} */
        const convLog = spec['Fl64_Log_Agg_Back_Convert_Log$'];
        /** @type {TeqFw_Web_Event_Back_Mod_Registry_Stream} */
        const modRegStream = spec['TeqFw_Web_Event_Back_Mod_Registry_Stream$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Back_Log_Added} */
        const esbLogAdded = spec['Fl64_Log_Agg_Shared_Event_Back_Log_Added$'];

        // MAIN
        logger.setNamespace(this.constructor.name);
        Object.defineProperty(process, 'namespace', {value: NS});

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Fl64_Log_Agg_Back_Web_Handler_Beacon
         */
        async function process(req, res) {
            // FUNCS

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                const trx = await rdb.startTransaction();
                try {
                    // parse input data
                    /** @type {string} */
                    const body = shares[DEF.MOD_WEB.SHARE_REQ_BODY];
                    const json = JSON.parse(body);
                    /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto} */
                    const item = JSON.parse(json);
                    const entry = convLog.share2rdb(item);
                    // save log item to RDB
                    await crud.create(trx, rdbLog, entry);
                    await trx.commit();
                    // publish item to connected fronts
                    for (const one of modRegStream.getAllActive()) {
                        const {meta} = portalFront.createMessage();
                        meta.sessionUuid = one.sessionUuid
                        const data = esbLogAdded.createDto();
                        data.item = item;
                        // noinspection JSCheckFunctionSignatures
                        portalFront.publish({data, meta}).then();
                    }
                    // finalize HTTP request
                    shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
                } catch (e) {
                    logger.error(e);
                    await trx.rollback();
                }
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            logger.info(`Web requests handler to collect log events.`);
        }

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_POST)
                && (address?.space === DEF.SHARED.SPACE_BEACON)
            );
        }
    }
}
