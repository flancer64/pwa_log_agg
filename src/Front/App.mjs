/**
 * Web application.
 *
 * Initialization:
 * - Load config and i18n from server (WAPI).
 * - Init UUID for front & back.
 * - Init processes and bind it to events.
 * - Open reverse events stream.
 * - Init Vue (add router, Quasar UI, i18next),
 *
 * Then create and mount root vue component to given DOM element.
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_App';

// MODULE'S CLASSES
export default class Fl64_Log_Agg_Front_App {
    constructor(spec) {
        // EXTRACT DEPS
        const {createApp} = spec['TeqFw_Vue_Front_Lib_Vue'];
        const {createRouter, createWebHashHistory} = spec['TeqFw_Vue_Front_Lib_Router'];
        /** @type {Fl64_Log_Agg_Front_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_I18n_Front_Lib} */
        const I18nLib = spec['TeqFw_I18n_Front_Lib$'];
        /** @type {TeqFw_Ui_Quasar_Front_Lib} */
        const quasar = spec['TeqFw_Ui_Quasar_Front_Lib'];
        /** @type {Fl64_Log_Agg_Front_Layout_Base} */
        const layoutBase = spec['Fl64_Log_Agg_Front_Layout_Base$'];
        /** @type {Fl64_Log_Agg_Front_Layout_Top.vueCompTmpl} */
        const topBar = spec['Fl64_Log_Agg_Front_Layout_Top$'];
        /** @type {TeqFw_Web_Front_Mod_Config} */
        const config = spec['TeqFw_Web_Front_Mod_Config$'];
        /** @type {TeqFw_Web_Front_Mod_App_Front_Identity} */
        const frontIdentity = spec['TeqFw_Web_Front_Mod_App_Front_Identity$'];
        /** @type {TeqFw_Web_Front_App_Connect_Event_Reverse} */
        const streamBf = spec['TeqFw_Web_Front_App_Connect_Event_Reverse$'];
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventBus = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {TeqFw_Web_Shared_Event_Back_Stream_Reverse_Authenticated} */
        const esbAuthenticated = spec['TeqFw_Web_Shared_Event_Back_Stream_Reverse_Authenticated$'];
        /** @type {TeqFw_Web_Shared_Event_Back_Stream_Reverse_Failed} */
        const esbFailed = spec['TeqFw_Web_Shared_Event_Back_Stream_Reverse_Failed$'];
        /** @type {TeqFw_Web_Front_Mod_App_Alive} */
        const modAlive = spec['TeqFw_Web_Front_Mod_App_Alive$'];

        // VARS
        let _isInitialized = false; // application is initialized and can be mounted
        let _root; // root vue component for the application

        // MAIN
        logger.setNamespace(this.constructor.namespace);

        // INSTANCE METHODS

        /**
         * Initialize application.
         *
         * @param {string} cssSelector DIV to trace initialization process
         * @return {Promise<void>}
         */
        this.init = async function (cssSelector) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {string} css
             * @return {(function(string))|*}
             */
            function createPrintout(css) {
                const elDisplay = document.querySelector(cssSelector);
                return function (msg) {
                    if (elDisplay) elDisplay.innerText = msg;
                    else console.log(msg);
                }
            }

            /**
             * Create processes that start on events.
             * TODO: this should be done using 'teqfw.json' descriptor
             * @param {TeqFw_Di_Shared_Container} container
             */
            async function initEventProcessors(container) {
                // TODO: init from 'teqfw.json'
                // Some processes (authentication) should be subscribed to events before Reverse Stream can be opened.
                await container.get('Fl64_Log_Agg_Front_Hand_Connect_Manager$');
                await container.get('Fl64_Log_Agg_Front_Hand_Log_Received$');
            }

            /**
             * Wait until back-to-front events stream will be opened and authenticated before continue.
             * @param {TeqFw_Di_Shared_Container} container
             * @return {Promise<TeqFw_Web_Front_Event_Connect_Event_Reverse_Opened.Dto>}
             * @memberOf Fl64_Log_Agg_Front_App.init
             */
            async function initEventStream(container) {
                return new Promise((resolve, reject) => {
                    streamBf.open();
                    const subsSuccess = eventBus.subscribe(esbAuthenticated.getEventName(), (evt) => {
                        eventBus.unsubscribe(subsSuccess);
                        logger.info(`Events reverse stream is opened on the front and authenticated by back.`);
                        resolve(evt);
                    });
                    const subsFailed = eventBus.subscribe(esbFailed.getEventName(), (evt) => {
                        // TODO: this event is not published by back yet
                        eventBus.unsubscribe(subsFailed);
                        debugger
                        reject(new Error(evt?.data?.reason));
                    });
                });
            }

            /**
             * Setup working languages and fallback language and add translation function to the Vue.
             *
             * @param {Object} app
             * @param {TeqFw_I18n_Front_Lib} I18nLib
             * @return {Promise<void>}
             * @memberOf Fl64_Log_Agg_Front_App.init
             */
            async function initI18n(app, I18nLib) {
                await I18nLib.init(['en', 'ru'], 'en');
                const appProps = app.config.globalProperties;
                const i18n = I18nLib.getI18n();
                // add translation function to Vue
                // noinspection JSPrimitiveTypeWrapperUsage
                appProps.$t = function (key, options) {
                    // add package name if namespace is omitted in the key
                    // noinspection JSUnresolvedVariable
                    const ns = this.$options.teq?.package;
                    if (ns && key.indexOf(':') <= 0) key = `${ns}:${key}`;
                    return i18n.t(key, options);
                }
            }

            function initQuasarUi(app, quasar) {
                app.use(quasar, {config: {}});
                // noinspection JSUnresolvedVariable
                quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
            }

            function initUiComponents(app) {

            }

            function initRouter(app, DEF, container) {
                /** @type {{addRoute}} */
                const router = createRouter({
                    history: createWebHashHistory(),
                    routes: [],
                });
                // setup application routes (load es6-module on demand with DI-container)
                router.addRoute({
                    path: DEF.ROUTE_HOME,
                    component: () => container.get('Fl64_Log_Agg_Front_Ui_Home_Route$'),
                });
                router.addRoute({
                    path: DEF.ROUTE_SETTINGS,
                    component: () => container.get('Fl64_Log_Agg_Front_Ui_Settings_Route$'),
                });

                app.use(router);
                return router;
            }

            // MAIN
            const print = createPrintout(cssSelector);
            print(`TeqFW App is initializing...`);

            // create root vue component
            _root = createApp({
                teq: {package: DEF.SHARED.NAME},
                name: NS,
                data() {
                    return {
                        canDisplay: false
                    };
                },
                template: '<router-view v-if="canDisplay"/><div class="launchpad" v-if="!canDisplay">App is starting...</div>',
                async mounted() {
                    logger.info(`Started with route: '${JSON.stringify(this.$router.currentRoute.value)}'`);
                    this.canDisplay = true;
                }
            });

            // ... and add global available components
            _root.component('LayoutBase', layoutBase);
            _root.component('TopBar', topBar);


            // other initialization
            // logger.pause(false);
            if (await modAlive.check()) {
                await config.init({}); // this app has no separate 'doors' (entry points)
                print(`Application config is loaded.`);
                await initI18n(_root, I18nLib);
                print(`i18n resources are loaded.`);
                await frontIdentity.init();
                print(`Front UUID: ${frontIdentity.getUuid()}.`);
                try {
                    await initEventStream(container);
                    print(`Backend events stream is opened.`);
                    await initEventProcessors(container);
                    print(`Frontend processes are created.`);
                    initQuasarUi(_root, quasar);
                    initUiComponents(_root);
                    print(`Data sources are initialized.`);
                    initRouter(_root, DEF, container);
                    print(`Vue app is created and initialized.`);
                    _isInitialized = true;
                } catch (e) {
                    // TODO: place IDB cleanup here for re-installs
                    print(e.message);
                }
            } else {
                print(`Backend server is not alive. Cannot continue.`);
            }
        }

        /**
         * Mount root vue component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            if (_isInitialized) _root.mount(elRoot);
        }
    }
}
