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
    // DEPS
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Layout_Top.vueCompTmpl} */
    const topBar = spec['Fl64_Log_Agg_Front_Layout_Top$'];

    // VARS
    const template = `
<q-layout view="lHr lpR lFr">

    <q-header bordered elevated class="bg-primary text-white">
        <top-bar/>
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
        components: {topBar},
        data() {
            return {
                title: 'TeqFW Logs Monitor',
            };
        },
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.Factory`});
