import { getCDNHost } from '../GblComFunc';
import Cache from '../Cache';

function getKeyType() {
    let key = '';
    if (typeof (process.env.NODE_ENV_M) == 'undefined' || process.env.NODE_ENV_M == 'prod') {
        key = 'PROD_URL';
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        key = 'STG_URL';
    }
    else {
        key = 'DEV_URL';
    }
    return key;
}

function getPath() {
    let path = '';
   
        path = __dirname + '/commonJSVersions.json';
    
    return path;
}

function clearVersionCache(filePath) {
    delete require.cache[filePath];
}

export const getVersions = () => {
    let pwaVersions = '',
        versionData = {},
        externalJSVersions = {},
        keyType = getKeyType(),
        filePath = getPath();
    pwaVersions = require('../version.json');


    if (Cache.getCache("versionData")) {
        versionData = Cache.getCache("versionData");
    }
    else {
        clearVersionCache(filePath);
        externalJSVersions = require(filePath)[keyType];
        versionData = { ...{ 'appUrl': getCDNHost() + 'main-min_' + pwaVersions.main_min + '.js', 'newRouteVersion': pwaVersions.newRouteVersion, 'mim_main_pwa': 'https://m.imimg.com/gifs/mim_main_pwa_v' + pwaVersions.mim_main_pwa + '.js' }, ...externalJSVersions };
        Cache.setCache("versionData", versionData, 600)
    }
    return versionData;
}

