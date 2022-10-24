/**
 * WF-600 test command.
 *
 * @namespace Fl64_Log_Agg_Back_Cli_Test
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl64_Log_Agg_Back_Cli_Test';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl64_Log_Agg_Back_Cli_Test
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl64_Log_Agg_Back_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$']; // use interface as implementation
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];


    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Fl64_Log_Agg_Back_Cli_Test
     */
    async function action(opts) {
        /** @type {Fl64_Log_Agg_Back_Dto_Config_Local} */
        const cfg = config.getLocal(DEF.SHARED.NAME);
        await conn.init(cfg.db);
        await conn.disconnect();
        console.log(`Done!`);
    }

    logger.setNamespace(NS);
    Object.defineProperty(action, 'name', {value: `${NS}.action`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'test';
    res.desc = 'WF-600 test command.';
    res.action = action;
    return res;
}
