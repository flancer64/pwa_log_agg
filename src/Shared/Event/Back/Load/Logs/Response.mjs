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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const dtoLog = spec['Fl64_Log_Agg_Shared_Dto_Log$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castArrayOfObj|function} */
        const castArrayOfObj = spec['TeqFw_Core_Shared_Util_Cast.castArrayOfObj'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.items = castArrayOfObj(data?.items, dtoLog.createDto);
            res.requestEventUuid = castString(data?.requestEventUuid);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
