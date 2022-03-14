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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.limit = castInt(data?.limit);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
         */
        this.createDto = function (data) {
            const res = dtoBase.createDto({[ATTR.META]: data?.[ATTR.META]});
            res.meta.name = NS;
            res.data = createData(data?.[ATTR.DATA]);
            // noinspection JSValidateTypes
            return res;
        }

        this.getEventName = () => NS;
    }
}
