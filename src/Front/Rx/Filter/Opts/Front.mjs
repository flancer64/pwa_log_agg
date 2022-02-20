/**
 * Reactive model with options for fronts filter selector.
 */
export default class Fl64_Log_Agg_Front_Rx_Filter_Opts_Front {
    constructor(spec) {
        // EXTRACT DEPS
        const {ref} = spec['TeqFw_Vue_Front_Lib_Vue'];

        // ENCLOSED VARS
        const _items = ref([]);

        // INSTANCE METHODS
        this.getItems = () => _items;
        this.setItems = (val) => _items.value = val;
        /**
         * @param {string} val
         */
        this.addItem = function (val) {
            const norm = (typeof val === 'string') ? val.trim().toLowerCase() : null;
            if ((norm !== null) && !_items.value.includes(norm)) {
                _items.value.push(norm);
                _items.value.sort();
            }
        }
    }
}
