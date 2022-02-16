/**
 * Model to convert log entry data from one format to another.
 */
export default class Fl64_Log_Agg_Back_Mod_Convert_LogEntry {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {Fl64_Log_Agg_Back_Store_RDb_Schema_Log} */
        const rdbLog = spec['Fl64_Log_Agg_Back_Store_RDb_Schema_Log$'];
        /** @type {Fl64_Log_Agg_Shared_Dto_Log} */
        const dtoLogNet = spec['Fl64_Log_Agg_Shared_Dto_Log$'];

        // INSTANCE METHODS

        /**
         * @param {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto} rdb
         * @return {Fl64_Log_Agg_Shared_Dto_Log.Dto}
         */
        this.rdbToNet = function (rdb) {
            // noinspection JSCheckFunctionSignatures
            return dtoLogNet.createDto(rdb);
        }

        /**
         *
         * @param {Fl64_Log_Agg_Shared_WAPI_Add.Request} wapi
         * @return {Fl64_Log_Agg_Back_Store_RDb_Schema_Log.Dto}
         */
        this.wapiToRdb = function (wapi) {
            const res = rdbLog.createDto();
            res.date = castDate(wapi.date ?? new Date());
            res.level = wapi.level ?? 0;
            res.message = wapi.message;
            res.meta = wapi.meta;
            res.source = wapi.source;
            return res;
        }
    }

}
