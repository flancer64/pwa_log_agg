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
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Fl64_Log_Agg_Shared_Event_Back_Log_Added {
    constructor(spec) {
        // DEPS
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const dtoLog = spec['Fl64_Log_Agg_Shared_Dto_Log$'];

        // INSTANCE METHODS
        /**
         * @param {Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto} [data]
         * @return {Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.item = dtoLog.createDto(data?.item);
            return res;
        }
    }
}
