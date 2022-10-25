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
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$']; // use interface as implementation
    /** @type {Fl64_Log_Agg_Back_Mod_Clean} */
    const modClean = spec['Fl64_Log_Agg_Back_Mod_Clean$'];

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
            await conn.init(cfg.db);
        }

        // MAIN
        await initDb();
        modClean.start();
        // TODO: move it to core
        await container.get('Fl64_Log_Agg_Back_Hand_Load_Logs$');
    }

    // MAIN
    Object.defineProperty(init, 'namespace', {value: NS});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
