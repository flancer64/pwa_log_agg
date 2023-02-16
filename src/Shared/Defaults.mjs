/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class Fl64_Log_Agg_Shared_Defaults {
    NAME = '@flancer64/pwa_log_agg';

    SPACE_BEACON = 'log-agg-beacon'; // 'content-type: text/plain;charset=UTF-8' is used in HTTP headers
    SPACE_COLLECT = 'log-agg-collect'; // 'content-type: application/json'

    constructor() {
        Object.freeze(this);
    }
}
