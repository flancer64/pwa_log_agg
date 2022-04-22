/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];

    // MAIN
    async function exec() {
        await rdb.disconnect();
    }

    Object.defineProperty(exec, 'namespace', {value: NS});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
