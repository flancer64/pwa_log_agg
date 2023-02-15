/**
 * Front request to load the latest log items from the back.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request';

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request
 */
class Dto {
    static namespace = NS;
    /**
     * Max items to load.
     * @type {number}
     */
    limit;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];

        // INSTANCE METHODS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.limit = castInt(data?.limit);
            return res;
        }

    }
}
