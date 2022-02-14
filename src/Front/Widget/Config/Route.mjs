/**
 * 'Config' route.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Config_Route
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Config_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Config_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];

    // WORKING VARS
    const template = `
<layout-base>
    <q-scroll-area style="width:100%; height: calc(100vh - var(--dim-topBar-h)- var(--dim-bottomBar-h))"
    >

    </q-scroll-area>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Config_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        async mounted() {

        }
    };
}
