// MODULE'S IMPORT
import {createLogger, setup as mainSetup} from './src/@teqfw/web/Sw/Worker.mjs';

// MAIN

// create logger to trace installation process for Service Worker
const rnd = Math.floor(Math.random() * 1000000); // pseudo UUID to mark logs for one front on a server
const uuid = `sw-${rnd}`;
const log = createLogger(uuid);
const logFactory = (tailId) => createLogger(`${uuid}-${tailId}`);
log('[sw.js]: import is done and log related functions are created.');

// setup current service worker
mainSetup({scope: self, logFactory});
log('[sw.js]: TeqFw_Web_Sw_Worker is setup.');
