/**
 * Dialog widget to view log entry details.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Home_Details
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Home_Details';

// MODULE'S FUNCTIONS

/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Home_Details.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Rx_Details} */
    const rxDetails = spec['Fl64_Log_Agg_Front_Rx_Details$'];

    // WORKING VARS
    const template = `
<q-dialog v-model="display">
    <q-card>
        <q-card-section>
            <div class="text-h6">{{item.source}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            {{item.message}}
        </q-card-section>
        
        <q-card-section class="q-pt-none">
            {{item.meta}}
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
    </q-card>
</q-dialog>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Home_Details
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                display: null,
                /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto} */
                item: null,
            };
        },
        computed: {},
        methods: {},
        async mounted() {
            this.display = rxDetails.getDisplay();
            this.item = rxDetails.getItem();
        }
    };
}