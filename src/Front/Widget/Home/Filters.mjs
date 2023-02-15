/**
 * Container to access UI widget as singleton.
 */
export default class Fl64_Log_Agg_Front_Widget_Home_Filters {
    constructor() {
        // VARS
        /** @type {Fl64_Log_Agg_Front_Ui_Home_Filters.IUiComp} */
        let _store;

        // INSTANCE METHODS
        /**
         * @param {Fl64_Log_Agg_Front_Ui_Home_Filters.IUiComp} data
         */
        this.set = function (data) {
            _store = data;
        }

        /**
         * @return {Fl64_Log_Agg_Front_Ui_Home_Filters.IUiComp}
         */
        this.get = function () {
            return _store;
        }
    }
}
