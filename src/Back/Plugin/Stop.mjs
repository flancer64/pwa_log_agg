/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Stop';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Db_Back_RDb_Connect} */
    // const conn = spec['TeqFw_Db_Back_RDb_IConnect$']; // use interface as implementation

    // MAIN
    async function exec() {
        // await conn.disconnect();
    }

    Object.defineProperty(exec, 'namespace', {value: NS});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
