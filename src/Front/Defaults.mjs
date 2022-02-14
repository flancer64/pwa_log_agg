/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Fl64_Log_Agg_Front_Defaults {

    ROUTE_CONFIG = '/config';
    ROUTE_HOME = '/';
    ROUTE_LOGS = '/logs';

    /** @type {Fl64_Log_Agg_Shared_Defaults} */
    SHARED;

    // TODO: set dev 64 sec to prod 16 sec.
    TIMEOUT_EVENT_RESPONSE = 64000; // default timeout for response event (sent from back as answer to request from front)
    TIMEOUT_UI_DELAY = 1600; // default timeout for UI delays

    constructor(spec) {
        this.SHARED = spec['Fl64_Log_Agg_Shared_Defaults$'];
        Object.freeze(this);
    }
}
