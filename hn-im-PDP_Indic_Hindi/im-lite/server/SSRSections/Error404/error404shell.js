import { PWAAppState } from '../../../src/store/imStore';
var chunkVersion = require('../../version.json');
var GblComFunc = require('../../GblComFunc');
var appShell = GblComFunc.APP_SHELL_STRUCTURE();
const ERROR = 'SERVICE CONNECT FAILED';
var Cache = require('../../Cache');
var mnMinbase = 'https://m.imimg.com';
typeof (process.env.NODE_ENV_M) == 'undefined' ? mnMinbase = '' : process.env.NODE_ENV_M == 'dev' ? mnMinbase = 'https://dev-m.imimg.com' : process.env.NODE_ENV_M == 'stg' ? mnMinbase = 'https://stg-m.imimg.com' : mnMinbase = 'https://m.imimg.com';

function preloadedChunks() {
    return (` 
    <link rel="preconnect" href="https://m.imimg.com/" crossorigin >     
    <link rel="preload" href="${mnMinbase + '/pwagifs/main-min_' + chunkVersion["main_min"] + '.js'}" as="script" >
    <link rel="preload" href="${mnMinbase + '/pwagifs/dir.pwa' + chunkVersion["jsChunks"] + '.js'}" as="script" >

    
    `);
}

function indexShellStruct() {
    appShell.TITLE = '<title>Error 404 Not Found</title>';
    appShell.META = '';
    appShell.CANONICAL_LINKS = '';
    appShell.HEAD_SCRIPTS = `${preloadedChunks()}`;
    appShell.STATUS = 404;
    appShell.FOOTER_LINK = 'https://m.indiamart.com/desktopredirect/?url=https://dir.indiamart.com/';
    appShell.FOOTER = 'NFP';

}

function error404(req, res, shellCallBck) {
    indexShellStruct();
    shellCallBck(res, appShell)
}

module.exports = error404;

