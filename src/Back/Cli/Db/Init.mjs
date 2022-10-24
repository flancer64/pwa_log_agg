/**
 * (Re)create RDB structure and fill it with test data (on demand).
 *
 * @namespace Fl64_Log_Agg_Back_Cli_Db_Init
 */
// MODULE'S IMPORT

// DEFINE WORKING VARS
const NS = 'Fl64_Log_Agg_Back_Cli_Db_Init';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Fl64_Log_Agg_Back_Cli_Db_Init
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl64_Log_Agg_Back_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {Fl64_Log_Agg_Back_Cli_Db_Z_Restruct.action|function} */
    const actRestruct = spec['Fl64_Log_Agg_Back_Cli_Db_Z_Restruct$'];

    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Fl64_Log_Agg_Back_Cli_Db_Init
     */
    async function action(opts) {
        await actRestruct();
    }

    logger.setNamespace(NS);
    Object.defineProperty(action, 'name', {value: `${NS}.action`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'db-init';
    res.desc = '(Re)create RDB structure and fill it with test data (on demand).';
    res.action = action;
    return res;
}
