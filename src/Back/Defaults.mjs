/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl64_Log_Agg_Back_Defaults {
    CLI_PREFIX = 'app';

    /** @type {Fl64_Log_Agg_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Fl64_Log_Agg_Shared_Defaults$'];
        Object.freeze(this);
    }
}
