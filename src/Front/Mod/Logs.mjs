/**
 * Model for collected logs (stored on the front in memory).
 *
 * @namespace Fl64_Log_Agg_Front_Mod_Logs
 */
export default class Fl64_Log_Agg_Front_Mod_Logs {
    constructor(spec) {
        // DEPS
        /** @type {Fl64_Log_Agg_Front_Widget_Home_Route} */
        const wgHomeRoute = spec['Fl64_Log_Agg_Front_Widget_Home_Route$'];
        /** @type {Fl64_Log_Agg_Front_Widget_Home_Filters} */
        const wgHomeFilters = spec['Fl64_Log_Agg_Front_Widget_Home_Filters$'];

        // VARS
        /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto[]} */
        const _logsAll = [];
        /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto[]} */
        const _logsDisplay = [];
        /**
         * Front UUIDS as options for the filter.
         * @type {string[]}
         */
        const _frontUuids = [];
        /**
         * Selected front UUID to filter logs to display.
         * @type {string}
         */
        let _frontUuidSelected;

        // FUNCS
        /**
         * Add new unique front UUID to internal registry.
         * @param {string} val
         */
        function addFrontUuid(val) {
            const norm = (typeof val === 'string') ? val.trim().toLowerCase() : null;
            if ((norm !== null) && !_frontUuids.includes(norm)) {
                _frontUuids.push(norm);
                _frontUuids.sort();
            }
        }

        // INSTANCE METHODS
        /**
         * Add one
         * @param {Fl64_Log_Agg_Shared_Dto_Log.Dto} dto
         */
        this.addEntry = function (dto) {
            // update in-memory store
            _logsAll.unshift(dto);
            _logsAll.sort((a, b) => (a.date > b.date) ? -1 : 1); // reverse order
            // update filters options
            const optsLengthBefore = _frontUuids.length;
            const wgFilters = wgHomeFilters.get();
            addFrontUuid(dto?.meta?.frontUuid);
            if (optsLengthBefore !== _frontUuids.length)
                wgFilters.setOptsFrontUuid(_frontUuids);
            // display on UI
            if ((_frontUuidSelected === undefined) || (dto?.meta?.frontUuid?.toLowerCase() === _frontUuidSelected)) {
                _logsDisplay.unshift(dto);
                _logsDisplay.sort((a, b) => (a.date > b.date) ? -1 : 1); // reverse order
                const wgHome = wgHomeRoute.get();
                wgHome.setLogs(_logsDisplay);
            }
        }

        /**
         * Clear all stored log entries and reset filters options.
         */
        this.clear = function () {
            // reset internal vars
            _logsAll.length = 0;
            _logsDisplay.length = 0;
            _frontUuids.length = 0;
            _frontUuidSelected = undefined;
            // put log entries and filters options to UI widgets
            const wgHome = wgHomeRoute.get();
            wgHome.setLogs(_logsDisplay);
            const wgFilters = wgHomeFilters.get();
            wgFilters.reset();
            wgFilters.setOptsFrontUuid(_frontUuids);
        }

        /**
         * Apply or reset (if uuid==='') filter by front UUID to displayed entries.
         * @param {string} uuid
         */
        this.filterByFrontUuid = function (uuid) {
            const wgHome = wgHomeRoute.get();
            if (uuid === '') {
                _frontUuidSelected = undefined;
                _logsDisplay.length = 0;
                _logsDisplay.push(..._logsAll);
                wgHome.setLogs(_logsDisplay);
            } else if (_frontUuids.includes(uuid)) {
                _frontUuidSelected = uuid;
                _logsDisplay.length = 0;
                for (const one of _logsAll)
                    if (one?.meta?.frontUuid?.toLowerCase() === _frontUuidSelected) _logsDisplay.push(one);
                _logsDisplay.sort((a, b) => (a.date > b.date) ? -1 : 1); // reverse order
                wgHome.setLogs(_logsDisplay);
            }
        }

        /**
         * Set log entries to model to handle (filter & display).
         * @param {Fl64_Log_Agg_Shared_Dto_Log.Dto[]} entries
         */
        this.setEntries = function (entries) {
            // FUNCS
            /**
             * Reset selected value for front UUID filter if old value not in the allowed values list.
             */
            function resetFilterFrontUuid() {
                if (_frontUuidSelected !== undefined) {
                    if (!_frontUuids.includes(_frontUuidSelected))
                        _frontUuidSelected = undefined;
                }
                const wgFilters = wgHomeFilters.get();
                wgFilters.setOptsFrontUuid(_frontUuids);
            }

            // MAIN
            // reset internal vars
            _logsAll.length = 0;
            _logsDisplay.length = 0;
            _frontUuids.length = 0;
            // process all log entries and init filters options
            for (const one of entries) {
                _logsAll.push(one);
                addFrontUuid(one?.meta?.frontUuid);
            }
            _logsAll.sort((a, b) => (a.date > b.date) ? -1 : 1); // reverse order
            resetFilterFrontUuid();
            // put log entries to UI widgets (all or filtered only)
            const wgHome = wgHomeRoute.get();
            if (_frontUuidSelected === undefined) {
                _logsDisplay.push(..._logsAll);
                wgHome.setLogs(_logsDisplay);
            } else this.filterByFrontUuid(_frontUuidSelected);
        }
    }
}
