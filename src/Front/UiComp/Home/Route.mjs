/**
 * Container to access Vue component as singleton.
 */
export default class Fl64_Log_Agg_Front_UiComp_Home_Route {
    constructor() {
        // ENCLOSED VARS
        let _store;

        // INSTANCE METHODS
        this.set = (data) => _store = data;
        this.get = () => _store;
    }
}
