/**
 * Back response with the latest log items.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response';

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response
 */
class Dto {
    static namespace = NS;
    /**
     * Selected items.
     * @type {Fl64_Log_Agg_Shared_Dto_Log.Dto[]}
     */
    items;
    /** @type {string} */
    requestEventUuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const dtoLog = spec['Fl64_Log_Agg_Shared_Dto_Log$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfObj'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.items = castArrayOfObj(data?.items, dtoLog.createDto);
            res.requestEventUuid = castString(data?.requestEventUuid);
            return res;
        }
    }
}
