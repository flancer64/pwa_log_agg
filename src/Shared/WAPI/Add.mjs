/**
 * Route data for WAPI service to add one log entry to aggregator.
 *
 * @namespace Fl64_Log_Agg_Shared_WAPI_Add
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Shared_WAPI_Add';

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Shared_WAPI_Add
 */
export class Request {
    /**
     * Log event date (UTC).
     * @type {Date}
     */
    date;
    /**
     * Unsigned integer to indicate logged event level. Custom values.
     * @type {number}
     */
    level;
    /**
     * Log message to aggregate.
     * @type {string}
     */
    message;
    /**
     * Metadata as JSON object.
     * @type {Object}
     */
    meta;
    /**
     * Log event source (namespace, filename, process id, ...).
     * @type {string}
     */
    source;
}

/**
 * @memberOf Fl64_Log_Agg_Shared_WAPI_Add
 */
export class Response {
    /**
     * ID of the aggregated entry.
     * @type {number}
     */
    id;
}

/**
 * Factory to create new DTOs.
 * @memberOf Fl64_Log_Agg_Shared_WAPI_Add
 * @implements TeqFw_Web_Shared_Api_WAPI_IRoute
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        // DEPS
        /** @type {Fl64_Log_Agg_Shared_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Shared_Defaults$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Core_Shared_Dto_Formless} */
        const dtoFormless = spec['TeqFw_Core_Shared_Dto_Formless$'];

        // INSTANCE METHODS
        /**
         * @param {Request} [data]
         * @return {Fl64_Log_Agg_Shared_WAPI_Add.Request}
         */
        this.createReq = function (data) {
            const res = new Request();
            res.date = castDate(data?.date);
            res.level = castInt(data?.level);
            res.message = castString(data?.message);
            res.source = castString(data?.source);
            res.meta = dtoFormless.createDto(data?.meta);
            return res;
        }

        /**
         * @param {Response} [data]
         * @return {Fl64_Log_Agg_Shared_WAPI_Add.Response}
         */
        this.createRes = function (data) {
            const res = new Response();
            res.id = castInt(data?.id);
            return res;
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_ADD}`;
    }

}

// finalize code components for this es6-module
Object.defineProperty(Request, 'namespace', {value: `${NS}.Request`});
Object.defineProperty(Response, 'namespace', {value: `${NS}.Response`});
