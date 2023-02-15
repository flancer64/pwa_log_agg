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
/**
 * @implements TeqFw_Web_Front_Api_IApp
 */
export default class Fl64_Log_Agg_Front_App {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {function} */
        const createApp = spec['TeqFw_Vue_Front_Ext_Vue.createApp'];
        const {createRouter, createWebHashHistory} = spec['TeqFw_Vue_Front_Ext_Router'];
        /** @type {Fl64_Log_Agg_Front_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Ui_Quasar_Front_Lib} */
        const quasar = spec['TeqFw_Ui_Quasar_Front_Lib'];
        /** @type {Fl64_Log_Agg_Front_Layout_Base} */
        const layoutBase = spec['Fl64_Log_Agg_Front_Layout_Base$'];
        /** @type {Fl64_Log_Agg_Front_Layout_Top.vueCompTmpl} */
        const topBar = spec['Fl64_Log_Agg_Front_Layout_Top$'];
        /** @type {TeqFw_Web_Event_Front_Web_Connect_Stream_Open.act|function} */
        const connReverseOpen = spec['TeqFw_Web_Event_Front_Web_Connect_Stream_Open$'];
        /** @type {TeqFw_Web_Front_Mod_Config} */
        const modCfg = spec['TeqFw_Web_Front_Mod_Config$'];
        /** @type {TeqFw_Web_Event_Front_Mod_Identity_Front} */
        const modIdFront = spec['TeqFw_Web_Event_Front_Mod_Identity_Front$'];
        /** @type {TeqFw_I18n_Front_Mod_I18n} */
        const modI18n = spec['TeqFw_I18n_Front_Mod_I18n$'];

        // VARS
        let _isInitialized = false; // application is initialized and can be mounted
        let _print; // function to printout logs to UI or console
        let _root; // root vue component for the application

        // MAIN
        logger.setNamespace(this.constructor.namespace);

        // INSTANCE METHODS

        this.init = async function (fnPrintout) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {function(string)} fn
             * @return {function(string)}
             */
            function createPrintout(fn) {
                return (typeof fn === 'function') ? fn : (msg) => console.log(msg);
            }

            /**
             * Create processes that start on events.
             * TODO: this should be done using 'teqfw.json' descriptor
             * @param {TeqFw_Di_Shared_Container} container
             */
            async function initEventProcessors(container) {
                // TODO: init from 'teqfw.json'
                // Some processes (authentication) should be subscribed to events before Reverse Stream can be opened.
                await container.get('Fl64_Log_Agg_Front_Listen_Connect_Manager$');
                await container.get('Fl64_Log_Agg_Front_Listen_Log_Received$');
            }

            /**
             * Setup working languages and fallback language and add translation function to the Vue.
             *
             * @param {Object} app
             * @return {Promise<void>}
             * @memberOf Fl64_Log_Agg_Front_App.init
             */
            async function initI18n(app) {
                await modI18n.init(['en', 'ru'], 'en');
                const i18n = modI18n.getI18n();
                // add translation function to Vue
                const appProps = app.config.globalProperties;
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
            let res = true;
            _print = createPrintout(fnPrintout);
            _print(`TeqFW App is initializing...`);

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
            await modCfg.init({}); // this app has no separate 'doors' (entry points)
            _print(`Application config is loaded.`);
            await initI18n(_root);
            _print(`i18n resources are loaded.`);
            await modIdFront.init();
            _print(`Front UUID: ${modIdFront.getFrontUuid()}.`);
            try {
                await initEventProcessors(container);
                _print(`Frontend processes are created.`);
                await connReverseOpen();
                _print(`Stream for backend events is opened.`);
                initQuasarUi(_root, quasar);
                initUiComponents(_root);
                _print(`Data sources are initialized.`);
                initRouter(_root, DEF, container);
                _print(`Vue app is created and initialized.`);
                _isInitialized = true;
            } catch (e) {
                // TODO: place IDB cleanup here for re-installs
                _print(e.message);
                res = false;
            }
            return res;
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

        /**
         * @param {Element|string} elRoot
         */
        this.reinstall = function (elRoot) {
            _print(`
It is required to reinstall app. Please clean up all data in DevTools 
(F12 / Application / Storage / Clear site data).
Then reload this page.
`);
        }
    }
}
