/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl64_Log_Agg_Back_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_RDb_Connect} */ // use interface as implementation
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];


    // FUNCS
    async function init() {
        // FUNCS
        /**
         * Get local configuration and initialize DB connection.
         * Place connection object as 'TeqFw_Db_Back_RDb_IConnect' singleton to DI-container.
         *
         * @return {Promise<void>}
         */
        async function initDb() {
            /** @type {Fl64_Log_Agg_Back_Dto_Config_Local} */
            const cfg = config.getLocal(DEF.SHARED.NAME);
            await rdb.init(cfg.db);
        }

        // MAIN
        await initDb();
        // TODO: move it to core
        await container.get('Fl64_Log_Agg_Back_Hand_Load_Logs$');
    }

    // MAIN
    Object.defineProperty(init, 'name', {value: `${NS}.${init.name}`});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
