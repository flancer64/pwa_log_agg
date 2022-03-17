/**
 * Action to re-create database structure (drop-create tables).
 *
 * @namespace Fl64_Log_Agg_Back_Cli_Db_Z_Restruct
 */
// DEFINE WORKING VARS
const NS = 'Fl64_Log_Agg_Back_Cli_Db_Z_Restruct';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to setup context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @constructor
 * @memberOf Fl64_Log_Agg_Back_Cli_Db_Z_Restruct
 */
export default function Factory(spec) {
    // PARSE INPUT & DEFINE WORKING VARS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const conn = spec['TeqFw_Db_Back_RDb_IConnect$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Db_Back_Api_RDb_ISchema} */
    const dbSchema = spec['TeqFw_Db_Back_Api_RDb_ISchema$'];
    /** @type {TeqFw_Db_Back_Dem_Load} */
    const demLoad = spec['TeqFw_Db_Back_Dem_Load$'];

    // FUNCS
    /**
     * Action to re-create database structure (drop-create tables).
     * @returns {Promise<void>}
     * @memberOf Fl64_Log_Agg_Back_Cli_Db_Z_Restruct
     */
    async function action() {
        // load DEMs then drop/create all tables
        const path = config.getBoot().projectRoot;
        const {dem, cfg} = await demLoad.exec({path});
        await dbSchema.setDem({dem});
        await dbSchema.setCfg({cfg});
        await dbSchema.dropAllTables({conn});
        await dbSchema.createAllTables({conn});
        logger.info('Database structure is recreated.');
    }

    // COMPOSE RESULT
    logger.setNamespace(NS);
    Object.defineProperty(action, 'name', {value: `${NS}.action`});
    return action;
}


// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.Factory`});
