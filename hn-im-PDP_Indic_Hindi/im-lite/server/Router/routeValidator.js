//need to identify /bl/    /bl/offer-id   /bl/string/    /bl/string/string/  //#endregion
var GblComFunc = require('../GblComFunc');

const SitePaths = {
   PDP:
   {
      URL: '/products/',
      REGX: /(^\/proddetail\/.*\$)/
   },
   IMPCAT_HOME:
   {
      URL: '/impcat/',
      REGX: /^\/impcat\/$/
   },
   IMPCAT_ALL_INDIA:
   {
      URL: '/impcat/:id/',
      REGX: /(^\/impcat\/.*\.html$)/
   },
   COMPANY_HOME_GLID:
   {
      URL: '/company/:glid/',
      REGX: /^\/company\/.[0-9]*\/$/
   },
   COMPANY_CAT_LINK:
   {
      URL: '/impcat/:glid/:catlink.html',
      REGX: /^\/company\/.[0-9]*\/.*\.html$/
   },
   PDP_REDIRECT:
   {
      URL: '/products/',
      REGX: /(^\/proddetail\.php$)/
   },
   API_REQUESTS:
   {
      URL: 'ajaxrequests*',
      REGX: /^\/ajaxrequest\/.*$/
   },
   HOME:
   {
      URL: '/',
      REGX: /^\/$/
   },
   SEARCH:
   {
      URL: '/isearch.php',
      REGX: /^\/isearch.php$/
   },
   MESSAGES:
   {
      URL: '/messages/',
      REGX: /^\/messages\/$/
   },
   MESSAGES_CONTACT_DETAIL:
   {
      URL: '/messages/contactdetail/',
      REGX: /^\/messages\/contactdetail\/$/
   },
   MESSAGES_CONVERSATION_ID:
   {
      URL: '/messages/conversation/:id',
      REGX: /^\/messages\/conversation\/.*\/$/
   },
   MESSAGES_CONVERSATION:
   {
      URL: '/messages/conversation/',
      REGX: /^\/messages\/conversation\/$/
   },
   MBR:
   {
      URL: '/buyer/managebl/',
      REGX: /^\/buyer\/managebl\/$/
   },
   MBR_DETAILS:
   {
      URL: '/managebl/suppliers/',
      REGX: /^\/managebl\/suppliers\/$/
   },
   PRODUCTS:
   {
      URL: '/products/',
      REGX: /^\/products\/$/
   },
   PDP:
   {
      URL: '/products/',
      REGX: /(^\/proddetail\/.*\.html$)/
   },
   SELLER:
   {
      URL: '/seller/',
      REGX: /^\/seller\//
   },
   BL:
   {
      URL: '/bl/',
      REGX: /^\/bl\/?$/
   },
   BL_OFFER:
   {
      URL: '/bl/offerid',
      REGX: /^\/bl\/[0-9].*$/
   },
   BL_LOCATION:
   {
      URL: '/bl/locpref',
      REGX: /^\/bl\/locpref\/$/
   },
   BL_CATEGORY:
   {
      URL: '/bl/category/',
      REGX: /^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z][-a-zA-Z]+\/$/
   },
   BL_SUBCATEGORY:
   {
      URL: '/bl/category/subcategory/',
      REGX: /^\/bl\/(?!tenders)(?!tender\-notice)(?!dir)(?!blpurchaseresponse)[a-zA-Z]+[-a-zA-Z]+\/[a-zA-Z]+[-a-zA-Z]+[-a-zA-Z]\/$/
   },
   BL_SEARCH:
   {
      URL: '/bl/search.php',
      REGX: /^\/bl\/search\.php$/
   },
   BL_TENDER:
   {
      URL: '/bl/tenders/',
      REGX: /^\/bl\/tenders\/?$/
   },
   BL_TENDER_OFFER:
   {
      URL: '/bl/tenders/offerid',
      REGX: /^\/bl\/tenders\/[0-9]+\/$/
   },
   BL_PACKAGE_PAGE:
   {
      URL: '/bl/package.html',
      REGX: /^\/bl\/package\.html$/
   },
   BL_DIR:
   {
      URL: '/bl/dir/',
      REGX: /^\/bl\/dir\/$/
   },
   BL_PURCHASE_RESPONSE:
   {
      URL: '/bl/blpurchaseresponse',
      REGX: /^\/bl\/blpurchaseresponse\/$/
   },
   BL_TENDER_STATE:
   {
      URL: '/bl/tenders/state/',
      REGX: /^\/bl\/tenders\/state\/$/
   },
   BL_TENDER_AUTHORITY:
   {
      URL: '/bl/tenders/authority/',
      REGX: /^\/bl\/tenders\/authority\/$/
   },
   BL_TENDER_INDUSTRY:
   {
      URL: '/bl/tenders/industry/',
      REGX: /^\/bl\/tenders\/industry\/$/
   },
   BL_TENDER_STATE_ID:
   {
      URL: '/bl/tenders/state/:stateId',
      REGX: /^\/bl\/tenders\/state\/.*\/$/
   },
   BL_TENDER_AUTHORITY_ID:
   {
      URL: '/bl/tenders/authority/:authorityId',
      REGX: /^\/bl\/tenders\/authority\/.*\/$/
   },
   BL_TENDER_INDUSTRY_NOTICE:
   {
      URL: '/bl/tender-notice/:industryId',
      REGX: /^\/bl\/tender\-notice\/.*\/$/
   },
   BL_TENDER_SUBCAT_INDUSTRY:
   {
      URL: '/bl/tenders/:industryId',
      REGX: /^\/bl\/tenders\/.*\/$/
   },
   BL_MCAT:
   {
      URL: '/bl/:group/:subcat/:mcatid',
      REGX: /^\/bl\/.*\/.*\/.*\/$/
   },
   DIR:
   {
      URL: '/dir',
      REGX: /^\/dir\/$/
   },
   GRP:
   {
      URL: '/dir/:flname',
      REGX: /^\/dir\/.*\/$/
   },
   SUBCAT:
   {
      URL: '/suppliers/:flname',
      REGX: /^\/suppliers\/.*\/$/
   },
   ENQ:
   {
      URL: '/enq/',
      REGX: /^\/enq\/$/
   },
   PDP_ERROR:
   {
      URL: '/proddetail/*',
      REGX: /(^\/proddetail\/.*$)/
   },
   FAVICON_ICON:
   {
      URL: '/favicon.ico',
      REGX: /^\/favicon.ico\/$/
   },
   COMPANY_CAT_LINK_OR_IMPCAT_CITY_INDEX:
   {
      URL: '/:id/:nid .html',
      REGX: /^\/((?!\/).)*\/((?!\/).)*\.html$/
   },
   COMPANY_OR_IMPCAT_CITY:
   {
      URL: '/:city or /:company_alias',
      REGX: /^\/((?!\/).)*\/$/
   }
   // SERVICE_WORKER:
   // {
   //    URL:'/service-worker.js',
   //    REGX:/^\/service-worker.js$/
   // },
}


function checkRedirectReq(req) {
   if (GblComFunc.objIsEmpty(req.query)) {
      if (req.url.charAt(req.url.length - 1) != '/' && req.url.indexOf('.') == -1) {
         return true;
      }
      else {
         return false;
      }
   }
}


function test(req, res) {
   if (!/^\/ajaxrequest\/.*$/.test(req.path) && checkRedirectReq(req))//needs re-direction
   {
      GblComFunc.ON_PAGE = 'REDIRECTED';
   }
   else {
      for (let key in SitePaths) {
         if (req.path.match(SitePaths[key].REGX)) {
            GblComFunc.ON_PAGE = key;
            return;

         }
      }
      GblComFunc.ON_PAGE = 'PAGE_NOT_FOUND';
   }
   return;
}

module.exports = test;



