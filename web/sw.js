import webWorker from './src/@teqfw/web/Sw/Worker.mjs';

// create logger to trace installation process for Service Worker
const uuid = `sw-${self.crypto.randomUUID()}`; // UUID for every runtime instance
const log = function (msg, meta = {}) {
    const notes = (meta && (typeof meta === 'object') && (Object.keys(meta).length > 0)) ?
        `; ${JSON.stringify(meta)}` : '';
    console.log(`${uuid}: ${msg}${notes}`);
}

// setup all plugins related to SW and get all sw-handlers
let handlers = webWorker({log});

// setup current service worker
for (const key of Object.keys(handlers)) {
    self.addEventListener(key, handlers[key]);
}
log('Service Worker setup is done.');
