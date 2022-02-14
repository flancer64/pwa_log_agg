/**
 * Base layout widget.
 *
 * @namespace Fl64_Log_Agg_Front_Layout_Base
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Layout_Base';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl64_Log_Agg_Front_Layout_Base
 * @returns {Fl64_Log_Agg_Front_Layout_Base.vueCompTmpl}
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    const {ref} = spec['TeqFw_Vue_Front_Lib_Vue'];
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];


    // DEFINE WORKING VARS & PROPS
    const template = `
<q-layout view="lHr lpR lFr">

    <q-header reveal class="bg-primary text-white">
        <q-toolbar>
            <q-space></q-space>
            <q-toolbar-title>{{title}}</q-toolbar-title>
            <q-space></q-space>
            <q-btn dense flat round icon="home" to="${DEF.ROUTE_HOME}"/>
            <q-btn dense flat round icon="settings" to="/config"/>
        </q-toolbar>
    </q-header>

    <q-page-container style="display: grid; height: 100vh; justify-items: center;">
        <slot/>
    </q-page-container>

</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Layout_Base
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                title: 'TeqFW Logs Monitor',
            };
        },
        methods: {},
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.Factory`});
