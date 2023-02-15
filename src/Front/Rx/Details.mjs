/**
 * Reactive model used in log details dialog.
 */
export default class Fl64_Log_Agg_Front_Rx_Details {
    constructor(spec) {
        // EXTRACT DEPS
        const {ref} = spec['TeqFw_Vue_Front_Ext_Vue'];

        // VARS
        const _item = ref(null);
        const _display = ref(false);

        // INSTANCE METHODS
        this.getDisplay = () => _display;
        this.getItem = () => _item;
        this.setDisplay = (val) => _display.value = val;
        this.setItem = (val) => _item.value = val;
    }
}
