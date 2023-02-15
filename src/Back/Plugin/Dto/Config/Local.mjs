/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Dto_Config_Local';

// MODULE'S CLASSES
export default class Fl64_Log_Agg_Back_Plugin_Dto_Config_Local {
    /** @type {TeqFw_Db_Back_Dto_Config_Local} */
    db;
}

/**
 * Factory to create new DTO instances.
 * @memberOf Fl64_Log_Agg_Back_Plugin_Dto_Config_Local
 */
export class Factory {
    static namespace = NS;

    constructor(spec) {
        /** @type {TeqFw_Db_Back_Dto_Config_Local.Factory} */
        const fDb = spec['TeqFw_Db_Back_Dto_Config_Local#Factory$'];

        /**
         * @param {Fl64_Log_Agg_Back_Plugin_Dto_Config_Local|null} data
         * @return {Fl64_Log_Agg_Back_Plugin_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const res = new Fl64_Log_Agg_Back_Plugin_Dto_Config_Local();
            res.db = fDb.create(data?.db);
            return res;
        }
    }
}
