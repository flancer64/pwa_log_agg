/**
 * 'Config' route.
 *
 * @namespace Fl64_Log_Agg_Front_Widget_Settings_Route
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Front_Widget_Settings_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Fl64_Log_Agg_Front_Widget_Settings_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Fl64_Log_Agg_Front_Defaults} */
    const DEF = spec['Fl64_Log_Agg_Front_Defaults$'];
    /** @type {TeqFw_Web_Front_Mod_Sw_Control} */
    const swControl = spec['TeqFw_Web_Front_Mod_Sw_Control$'];

    // WORKING VARS
    const template = `
<layout-base>
    <q-scroll-area style="width:100%; height: calc(100vh - var(--dim-topBar-h)- var(--dim-bottomBar-h))"
    >
        <q-card>
            <q-card-section>
                <div class="text-subtitle2">{{$t('wg.settings.title')}}:</div> 
                <div class="q-gutter-xs">
                    <q-btn :label="$t('btn.clean')" color="primary" v-on:click="cacheClean"></q-btn>
                    <q-btn :label="$t('btn.disable')" v-if="cacheEnabled" color="primary" v-on:click="cacheDisable"></q-btn>
                    <q-btn :label="$t('btn.enable')" v-if="!cacheEnabled" color="primary" v-on:click="cacheEnable"></q-btn>
                    <q-btn dense flat round icon="lens" size="8.5px" :color="color" />
                </div>  
            </q-card-section>
        </q-card>
    </q-scroll-area>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Fl64_Log_Agg_Front_Widget_Settings_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                cacheEnabled: null
            };
        },
        computed: {
            color() {
                return (this.cacheEnabled) ? 'green' : 'grey';
            }
        },
        methods:{
            async cacheDisable() {
                await swControl.setCacheStatus(false);
                this.cacheEnabled = await swControl.getCacheStatus();
            },
            async cacheEnable() {
                await swControl.setCacheStatus(true);
                this.cacheEnabled = await swControl.getCacheStatus();
            },
            async cacheClean() {
                await swControl.cacheClean();
            },
        },
        async mounted() {
            this.cacheEnabled = await swControl.getCacheStatus();
        }
    };
}
