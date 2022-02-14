/**
 * 'Home' route.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Home_Route
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Home_Route';
const LIMIT = 20;

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Home_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {Fl64_Log_Agg_Front_Widget_Home_Item.vueCompTmpl} */
    const logItem = spec['Fl64_Log_Agg_Front_Widget_Home_Item$'];
    /** @type {TeqFw_Web_Front_App_Event_Bus} */
    const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
    /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
    const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
    /** @type {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request} */
    const esfLogsReq = spec['Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request$'];
    /** @type {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response} */
    const esbLogsRes = spec['Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response$'];

    // WORKING VARS
    const template = `
<layout-base>
    <q-scroll-area style="width:100%; height: calc(100vh - var(--dim-topBar-h)- var(--dim-bottomBar-h))"
    >
        <log-item v-for="(item) in items" :item="item"></log-item>
    </q-scroll-area>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Home_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {logItem},
        data() {
            return {
                items: [],
            };
        },
        async mounted() {
            // ENCLOSED FUNCS
            function requestItems() {
                return new Promise((resolve) => {
                    // ENCLOSED VARS
                    let idFail, subs;

                    // ENCLOSED FUNCTIONS
                    /**
                     * @param {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto} data
                     */
                    function onResponse({data}) {
                        clearTimeout(idFail);
                        const dtoRes = esbLogsRes.createDto({data});
                        resolve(dtoRes.data.items);
                        eventsFront.unsubscribe(subs);
                    }

                    // MAIN
                    // subscribe to response event from back and create timeout response
                    subs = eventsFront.subscribe(esbLogsRes.getEventName(), onResponse);
                    idFail = setTimeout(() => {
                        eventsFront.unsubscribe(subs);
                        resolve();
                    }, DEF.TIMEOUT_EVENT_RESPONSE); // return nothing after timeout

                    // create event message and publish it to back
                    const event = esfLogsReq.createDto();
                    event.data.limit = LIMIT;
                    portalBack.publish(event);
                });

            }

            // MAIN
            this.items = await requestItems();

        }
    };
}
