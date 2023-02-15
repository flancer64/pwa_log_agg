/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Fl64_Log_Agg_Back_Defaults {
    CLI_PREFIX = 'app';

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Fl64_Log_Agg_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.MOD_WEB = spec['TeqFw_Web_Back_Defaults$'];
        this.SHARED = spec['Fl64_Log_Agg_Shared_Defaults$'];
        Object.freeze(this);
    }
}
