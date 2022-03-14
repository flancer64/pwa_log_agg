/**
 * 'Home' route.
 *
 * @namespace Fl64_Log_Agg_Front_Ui_Home_Route
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Ui_Home_Route';
const LIMIT = 20;

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Fl64_Log_Agg_Front_Ui_Home_Route
 */
class IUiComp {
    /**
     * Force UI rendering for the widget.
     */
    refreshUi() {}

    /**
     * Set log entries to display.
     *
     * @param {Fl64_Log_Agg_Shared_Dto_Log.Dto[]} items
     */
    setLogs(items) {}
}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Ui_Home_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Ui_Home_Details.vueCompTmpl} */
    const uiDialogDetails = spec['Fl64_Log_Agg_Front_Ui_Home_Details$'];
    /** @type {Fl64_Log_Agg_Front_Ui_Home_Filters.vueCompTmpl} */
    const uiFilters = spec['Fl64_Log_Agg_Front_Ui_Home_Filters$'];
    /** @type {Fl64_Log_Agg_Front_Ui_Home_Item.vueCompTmpl} */
    const uiLogItem = spec['Fl64_Log_Agg_Front_Ui_Home_Item$'];
    /** @type {Fl64_Log_Agg_Front_Widget_Home_Route} */
    const wgHomeRoute = spec['Fl64_Log_Agg_Front_Widget_Home_Route$'];
    /** @type {Fl64_Log_Agg_Front_Proc_Load_Logs.process|function} */
    const procLoad = spec['Fl64_Log_Agg_Front_Proc_Load_Logs$'];
    /** @type {Fl64_Log_Agg_Front_Mod_Logs} */
    const modLogs = spec['Fl64_Log_Agg_Front_Mod_Logs$'];

    // VARS
    const template = `
<layout-base>
    <div class="t-grid rows" style="grid-template-rows: auto 1fr; width: 100%; justify-items: center;">
        <ui-filters/>
        <q-scroll-area
            :key="uiRenderKey" 
            style="width:100%; height: calc(100vh - var(--dim-topBar-h)- var(--dim-bottomBar-h))"
        >
            <ui-log-item v-for="(item) in items" :item="item"></ui-log-item>
        </q-scroll-area>
    </div>
    <ui-dialog-details/>
</layout-base>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Ui_Home_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiFilters, uiLogItem, uiDialogDetails},
        data() {
            return {
                items: [],
                uiRenderKey: 0,
            };
        },
        methods: {
            refreshUi() {
                debugger
                this.uiRenderKey++;
            },
            setLogs(items) {
                this.items = items;
                this.uiRenderKey++;
            },
        },
        async mounted() {
            wgHomeRoute.set(this);
            const {items} = await procLoad({limit: LIMIT});
            modLogs.setEntries(items);
        }
    };
}
