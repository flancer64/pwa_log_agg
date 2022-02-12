/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];

    // COMPOSE RESULT
    async function exec() {
        await rdb.disconnect();
    }

    Object.defineProperty(exec, 'name', {value: `${NS}.${exec.name}`});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
