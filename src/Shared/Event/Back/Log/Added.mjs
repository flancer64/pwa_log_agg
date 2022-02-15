/**
 * New log entry is aggregated.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Shared_Event_Back_Log_Added';

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Shared_Event_Back_Log_Added
 */
class Dto {
    static namespace = NS;
    /**
     * Selected items.
     * @type {Fl64_Log_Agg_Shared_Dto_Log.Dto}
     */
    item;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Fl64_Log_Agg_Shared_Event_Back_Log_Added {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const dtoLog = spec['Fl64_Log_Agg_Shared_Dto_Log$'];

        // ENCLOSED VARS
        const ATTR = dtoBase.getAttributes();

        // ENCLOSED FUNCTIONS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.item = dtoLog.createDto(data?.item);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
