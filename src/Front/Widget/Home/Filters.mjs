/**
 * Filters panel.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Home_Filters
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Home_Filters';

// MODULE'S FUNCTIONS

/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Home_Filters.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Rx_Filter_Opts_Back} */
    const rxOptsBacks = spec['Fl64_Log_Agg_Front_Rx_Filter_Opts_Back$'];
    /** @type {Fl64_Log_Agg_Front_Rx_Filter_Opts_Front} */
    const rxOptsFronts = spec['Fl64_Log_Agg_Front_Rx_Filter_Opts_Front$'];

    // WORKING VARS
    const template = `
<div style="t-grid cols">
    <q-card  class="t-grid cols-auto" style="">
        <q-card-section>
            <q-select
                :options="optsFront"
                filled
                label="Front"
                style="min-width: 150px"
                v-model="selectedFront"
            />
        </q-card-section>
        <q-card-section>
            <q-select
                filled
                v-model="selectedBack"
                :options="optsBack"
                label="Back"
                style="width: 150px"
            />
        </q-card-section>
    </q-card>
</div>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Home_Filters
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                optsBack: null,
                optsFront: null,
                selectedBack: null,
                selectedFront: null,
            };
        },
        props: {},
        computed: {},
        methods: {},
        async mounted() {
            this.optsBack = rxOptsBacks.getItems();
            this.optsFront = rxOptsFronts.getItems();
        }
    };
}
