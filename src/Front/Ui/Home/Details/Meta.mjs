/**
 * Meta data for log entry in details dialog.
 *
 * @namespace Fl64_Log_Agg_Front_Ui_Home_Details_Meta
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Ui_Home_Details_Meta';

// MODULE'S FUNCTIONS

/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Ui_Home_Details_Meta.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];

    // WORKING VARS
    const template = `
<div class="t-grid rows" style="grid-template-columns: auto 1fr; background-color: var(--color-bg-grid)">
    <template v-for="(value,key) in meta">
        <div style=" border-bottom: 1px solid var(--color-border);"><b>{{key}}</b></div>
        <div style="padding-left: 5px; border-bottom: 1px solid var(--color-border);">{{value}}</div>
    </template>
</div>    
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Ui_Home_Details_Meta
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                items: {
                    key: 34,
                    key2: 47,
                }
            };
        },
        props: {
            meta: Object,
        },
        computed: {},
        methods: {},
        async mounted() {
        }
    };
}
