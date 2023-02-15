/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Plugin_Stop';

export default function Factory(spec) {
    // DEPS
    /** @type {Fl64_Log_Agg_Back_Mod_Clean} */
    const modClean = spec['Fl64_Log_Agg_Back_Mod_Clean$'];

    // MAIN
    async function exec() {
        modClean.stop();
    }

    Object.defineProperty(exec, 'namespace', {value: NS});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
