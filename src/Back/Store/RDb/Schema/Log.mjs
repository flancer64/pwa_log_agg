/**
 *  Meta data for '/app/log' entity.
 *  @namespace Fl64_Log_Agg_Back_Store_RDb_Schema_Log
 */
// MODULE'S VARS
const NS = 'Fl64_Log_Agg_Back_Store_RDb_Schema_Log';
/**
 * Path to the entity in plugin's DEM.
 * @type {string}
 */
const ENTITY = '/app/log';

/**
 * @memberOf Fl64_Log_Agg_Back_Store_RDb_Schema_Log
 * @type {Object}
 */
const ATTR = {
    DATE: 'date',
    ID: 'id',
    LEVEL: 'level',
    MESSAGE: 'message',
    META: 'meta',
    SOURCE: 'source',
};

// MODULE'S CLASSES
/**
 * @memberOf Fl64_Log_Agg_Back_Store_RDb_Schema_Log
 */
class Dto {
    static namespace = NS;
    /**
     * Aggregation date.
     * @type {Date}
     */
    date;
    /** @type {number} */
    id;
    /**
     * Log entry level. Any custom unsigned numbers.
     * @type {number}
     */
    level;
    /**
     * Log message.
     * @type {string}
     */
    message;
    /**
     * Some metadata.
     * @type {Object}
     */
    meta;
    /**
     * Log source (namespace, filename, process id, ...).
     * @type {string}
     */
    source;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Fl64_Log_Agg_Back_Store_RDb_Schema_Log {
    constructor(spec) {
        /** @type {Fl64_Log_Agg_Back_Defaults} */
        const DEF = spec['Fl64_Log_Agg_Back_Defaults$'];
        /** @type {TeqFw_Db_Back_RDb_Schema_EntityBase} */
        const base = spec['TeqFw_Db_Back_RDb_Schema_EntityBase$'];

        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
