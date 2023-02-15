/**
 * Convert og related structures on the back (Shared, RDB, ...).
 */
export default class Fl64_Log_Agg_Back_Convert_Log {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdb = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const shared = spec['Fl64_Log_Agg_Shared_Dto_Log$'];

        // INSTANCE METHODS

        /**
         * @param {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto} data
         * @returns {Fl64_Log_Agg_Shared_Dto_Log.Dto}
         */
        this.rdb2share = function (data) {
            const res = shared.createDto();
            res.date = castDate(data?.date);
            res.id = castInt(data?.id);
            res.level = castInt(data?.level);
            res.message = castString(data?.message);
            res.meta = structuredClone(data?.meta);
            res.source = castString(data?.source);
            return res;
        }

        /**
         * @param {Fl64_Log_Agg_Shared_Dto_Log.Dto} data
         * @returns {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto}
         */
        this.share2rdb = function (data) {
            const res = rdb.createDto();
            res.date = castDate(data?.date);
            res.level = castInt(data?.level);
            res.message = castString(data?.message);
            res.meta = structuredClone(data?.meta);
            res.source = castString(data?.source);
            return res;
        }

    }
}
