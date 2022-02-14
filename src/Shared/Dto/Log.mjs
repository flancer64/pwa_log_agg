/**
 * Log item dto.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Shared_Dto_Log';

/**
 * @memberOf Fl64_Log_Agg_Shared_Dto_Log
 * @type {Object}
 */
const ATTR = {
    DATE: 'date',
    MESSAGE: 'message',
};

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Shared_Dto_Log
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    date;
    /** @type {string} */
    message;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class Fl64_Log_Agg_Shared_Dto_Log {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {Fl64_Log_Agg_Shared_Dto_Log.Dto} data
         * @return {Fl64_Log_Agg_Shared_Dto_Log.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.date = castDate(data?.date);
            res.message = castString(data?.message);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
