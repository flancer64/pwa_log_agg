/**
 * Process one log item received from back.
 *
 * @namespace Fl64_Log_Agg_Front_Hand_Log_Received
 */
// MODULE'S CLASSES
export default class Fl64_Log_Agg_Front_Hand_Log_Received {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {Fl64_Log_Agg_Shared_Event_Back_Log_Added} */
        const esbAdded = spec['Fl64_Log_Agg_Shared_Event_Back_Log_Added$'];
        /** @type {Fl64_Log_Agg_Front_Mod_Logs} */
        const modLogs = spec['Fl64_Log_Agg_Front_Mod_Logs$'];

        // MAIN
        eventsFront.subscribe(esbAdded.getEventName(), onEvent);

        // FUNCS
        /**
         * New log entry is received from the back. Add log entry to internal store (model).
         * @param {Fl64_Log_Agg_Shared_Event_Back_Log_Added.Dto} data
         */
        function onEvent({data}) {
            modLogs.addEntry(data?.item);
        }

    }
}
