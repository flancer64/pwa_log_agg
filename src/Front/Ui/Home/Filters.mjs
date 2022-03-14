/**
 * Filters panel.
 *
 * @namespace Fl64_Log_Agg_Front_Ui_Home_Filters
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Ui_Home_Filters';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Fl64_Log_Agg_Front_Ui_Home_Filters
 */
class IUiComp {
    /**
     * Reset selection and options.
     */
    reset() {}

    /**
     * @param {string[]} items
     */
    setOptsFrontUuid(items) {}
}

// MODULE'S FUNCTIONS

/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Ui_Home_Filters.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Widget_Home_Filters} */
    const wgFilters = spec['Fl64_Log_Agg_Front_Widget_Home_Filters$'];
    /** @type {Fl64_Log_Agg_Front_Mod_Logs} */
    const modLogs = spec['Fl64_Log_Agg_Front_Mod_Logs$'];

    // WORKING VARS
    const template = `
<div style="t-grid cols">
    <q-card  class="t-grid cols-auto" style="">
        <q-card-section class="q-pa-xs" :key="uiRenderKey">
            <q-select
                :options="optsFront"
                dense
                filled
                label="Front"
                options-dense
                style="min-width: 150px"
                v-model="selectedFront"
            />
        </q-card-section>
<!--        <q-card-section>-->
<!--            <q-select-->
<!--                filled-->
<!--                v-model="selectedBack"-->
<!--                :options="optsBack"-->
<!--                label="Back"-->
<!--                style="width: 150px"-->
<!--            />-->
<!--        </q-card-section>-->
    </q-card>
</div>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Ui_Home_Filters
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                optsBack: [],
                optsFront: [],
                selectedBack: null,
                selectedFront: null,
                uiRenderKey: 0,
            };
        },
        props: {},
        computed: {},
        watch: {
            selectedFront(current) {
                modLogs.filterByFrontUuid(current);
            }
        },
        methods: {
            reset() {
                this.optsFront = [];
                this.selectedFront = null;
                this.uiRenderKey++;
            },
            setOptsFrontUuid(items) {
                this.optsFront = ['', ...items];
                this.uiRenderKey++;
            }
        },
        async mounted() {
            wgFilters.set(this);
        }
    };
}
