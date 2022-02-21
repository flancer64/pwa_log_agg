/**
 * Layout's top bar widget: navigation menu.
 *
 * @namespace Fl64_Log_Agg_Front_Layout_Top
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Layout_Top';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl64_Log_Agg_Front_Layout_Top
 * @returns {Fl64_Log_Agg_Front_Layout_Top.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    const {ref} = spec['TeqFw_Vue_Front_Lib_Vue'];
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_UiComp_Home_Route} */
    const uiHomeRoute = spec['Fl64_Log_Agg_Front_UiComp_Home_Route$'];

    // DEFINE WORKING VARS & PROPS
    const template = `
<q-toolbar>
    <q-btn dense flat round icon="home" to="${DEF.ROUTE_HOME}"/>
    <q-btn dense flat round icon="settings" to="${DEF.ROUTE_SETTINGS}"/>
    <q-btn dense flat round icon="refresh" v-on:click="cleanLogs" v-if="displayRefresh"/>
    <q-space></q-space>
    <q-toolbar-title>{{title}}</q-toolbar-title>
    <q-space></q-space>
    <div>TIME</div>
</q-toolbar>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Layout_Top
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        computed: {
            displayRefresh() {
                return this.$route.path === DEF.ROUTE_HOME;
            }
        },
        methods: {
            cleanLogs() {
                const ui = uiHomeRoute.get();
                ui.cleanLogs();
            },
        },
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.Factory`});
