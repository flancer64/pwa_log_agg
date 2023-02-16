/**
 * Web server handler to collect log events sent as POST request with 'application/json' content type.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Web_Handler_Collect';
const {
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class Fl64_Log_Agg_Back_Web_Handler_Collect {
    constructor(spec) {
        // DEPS
        /** @type {Fl64_Log_Agg_Back_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {Fl64_Log_Agg_Back_Web_Handler_Z_Process.process|function} */
        const zProcess = spec['Fl64_Log_Agg_Back_Web_Handler_Z_Process$'];

        // MAIN
        logger.setNamespace(this.constructor.name);
        Object.defineProperty(process, 'namespace', {value: NS});

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf Fl64_Log_Agg_Back_Web_Handler_Collect
         */
        async function process(req, res) {
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                // parse input data
                /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto|*} */
                const item = shares[DEF.MOD_WEB.SHARE_REQ_BODY_JSON];
                zProcess(item);
                // finalize HTTP request
                shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            logger.info(`Web requests handler to collect log events (JSON).`);
        }

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_POST)
                && (address?.space === DEF.SHARED.SPACE_COLLECT)
            );
        }
    }
}
