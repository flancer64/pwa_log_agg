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
    /** @type {typeof TeqFw_Web_Shared_Enum_Log_Type} */
    const TYPE = spec['TeqFw_Web_Shared_Enum_Log_Type$'];
    /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
    const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];

    // WORKING VARS
    const template = `
<div class="row q-gutter-xs t-grid-row" v-on:click="openDetails">
    <div class="col-auto t-grid-col-date">{{date}}</div>
    <div class="col-auto t-grid-col-type">
        <q-avatar size="xs" :color="iconLevelColor">{{iconLevelLetter}}</q-avatar>
    </div>
    <div class="col-auto t-grid-col-type">
        <q-avatar size="xs" :color="iconTypeColor">{{iconTypeLetter}}</q-avatar>
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
                const date = castDate(item?.date);
                return (date) ? formatDateTimeForLog(date) : 'n/a';
            },
            logType() {
                return this?.item?.meta?.type;
            },
            message() {
                return this?.item?.message;
            },
            iconLevelColor() {
                return (this?.item?.isError) ? 'red-2' : 'blue-2';
            },
            iconLevelLetter() {
                return (this?.item?.isError) ? 'E' : 'I';
            },
            iconTypeColor() {
                return (this.logType === TYPE.FRONT) ? 'red-2'
                    : (this.logType === TYPE.BACK) ? 'blue-2'
                        : 'grey-2';
            },
            iconTypeLetter() {
                return (this.logType === TYPE.FRONT) ? 'F'
                    : (this.logType === TYPE.BACK) ? 'B'
                        : '?';
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
