/**
 * Process to load logs from the back on startup.
 *
 * @namespace Fl64_Log_Agg_Front_Proc_Load_Logs
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Proc_Load_Logs';

// MODULE'S FUNCTIONS
export default function (spec) {
    // DEPS
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_App_Connect_Event_Direct_Portal} */
    const portalBack = spec['TeqFw_Web_Front_App_Connect_Event_Direct_Portal$'];
    /** @type {TeqFw_Web_Front_App_Event_Bus} */
    const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
    /** @type {Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request} */
    const esfReq = spec['Fl64_Log_Agg_Shared_Event_Front_Load_Logs_Request$'];
    /** @type {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response} */
    const esbRes = spec['Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response$'];

    // FUNCS
    /**
     * @param {number} limit
     * @return {Promise<{items: Fl64_Log_Agg_Shared_Dto_Log.Dto[]}>}
     * @memberOf Fl64_Log_Agg_Front_Proc_Load_Logs
     */
    async function process({limit} = {limit: 20}) {
        return new Promise((resolve) => {
            // VARS
            let idFail, subs, eventUuid;

            // FUNCS
            /**
             * @param {Fl64_Log_Agg_Shared_Event_Back_Load_Logs_Response.Dto} data
             */
            function onResponse({data}) {
                if (data.requestEventUuid === eventUuid) {
                    clearTimeout(idFail);
                    eventsFront.unsubscribe(subs);
                    resolve({items: data?.items});
                }
            }

            /**
             * Unsubscribe callback handler and return.
             */
            function onTimeout() {
                eventsFront.unsubscribe(subs);
                resolve({items: []});
            }

            // MAIN

            // subscribe to response event from back and setup timeout response
            subs = eventsFront.subscribe(esbRes.getEventName(), onResponse);
            idFail = setTimeout(onTimeout, DEF.TIMEOUT_EVENT_RESPONSE); // return after timeout

            // create event message and publish it to back
            const event = esfReq.createDto();
            event.data.limit = limit;
            eventUuid = event.meta.uuid;
            portalBack.publish(event);
        });
    }

    // MAIN
    Object.defineProperty(process, 'namespace', {value: `${NS}.process`});
    return process;
}
