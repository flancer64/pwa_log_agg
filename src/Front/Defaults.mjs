/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl64_Log_Agg_Front_Defaults {

    ROUTE_HOME = '/';
    ROUTE_LOGS = '/logs';
    ROUTE_SETTINGS = '/settings';

    /** @type {Fl64_Log_Agg_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Fl64_Log_Agg_Shared_Defaults$'];
        Object.freeze(this);
    }
}
