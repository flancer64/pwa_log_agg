/**
 * Display time.
 *
 * @namespace Fl64_Log_Agg_Front_Layout_Top_Time
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Layout_Top_Time';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Fl64_Log_Agg_Front_Layout_Top_Time
 * @returns {Fl64_Log_Agg_Front_Layout_Top_Time.vueCompTmpl}
 */
export default function Factory(spec) {
    // DEPS
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Util_Format.timeUtc|function} */
    const formatTime = spec['TeqFw_Core_Shared_Util_Format.timeUtc'];

    // VARS
    const template = `
<div>{{time}} UTC</div>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Layout_Top_Time
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                intervalId: null,
                time: formatTime(),
            };
        },
        created() {
            if (this.intervalId === null)
                this.intervalId = setInterval(() => this.time = formatTime(), 1000);
        },
        unmounted() {
            if (this.intervalId !== null)
                clearInterval(this.intervalId);
        }
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'name', {value: `${NS}.Factory`});
