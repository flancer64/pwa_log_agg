/**
 * Reactive model used to display log items.
 */
export default class Fl64_Log_Agg_Front_Rx_Items {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {function} */
        const ref = spec['TeqFw_Vue_Front_Ext_Vue.ref'];

        // VARS
        const _store = ref([]);

        // INSTANCE METHODS
        this.get = () => _store;
        this.set = (val) => _store.value = val;
    }
}
