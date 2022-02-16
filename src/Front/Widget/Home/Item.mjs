/**
 * 'Log Item' widget.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Home_Item
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Home_Item';

// MODULE'S FUNCTIONS
/**
 * Convert date as UTC to HH:MM:SS.MMM.
 * @param {Date} date
 * @return {string}
 */
function formatDateTimeForLog(date) {
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    const m = `${date.getUTCMilliseconds()}`.padStart(3, '0');
    return `${h}:${i}:${s}.${m}`;
}


/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Home_Item.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Rx_Details} */
    const rxDetails = spec['Fl64_Log_Agg_Front_Rx_Details$'];

    // WORKING VARS
    const template = `
<div class="row q-gutter-xs t-grid-row" v-on:click="openDetails">
    <div class="col-auto t-grid-col-date">{{date}}</div>
    <div class="col-auto t-grid-col-type">
        <q-avatar size="xs" :color="iconColor">{{iconLetter}}</q-avatar>
    </div>
    <div class="col" style="height:20px; overflow: hidden;">{{message}}</div>
</div>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Home_Item
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        props: {
            /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto} */
            item: null,
        },
        computed: {
            date() {
                /** @type {Fl64_Log_Agg_Shared_Dto_Log.Dto} */
                const item = this?.item;
                return (item?.date instanceof Date) ? formatDateTimeForLog(item.date) : 'n/a';
            },
            message() {
                return this?.item?.message;
            },
            iconColor() {
                return (this?.item?.isError) ? 'red-2' : 'blue-2';
            },
            iconLetter() {
                return (this?.item?.isError) ? 'E' : 'I';
            }
        },
        methods: {
            openDetails() {
                rxDetails.setItem(this.item);
                rxDetails.setDisplay(true);
            }
        },
        async mounted() {

        }
    };
}