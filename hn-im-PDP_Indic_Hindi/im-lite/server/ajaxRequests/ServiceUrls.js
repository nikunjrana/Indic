const DEV_ENV = "dev";
const STG_ENV = "stg";
const GblFuncs = require("../GblComFunc");

const LEADS_SERVICES_ML = {
  DOMAIN: "http://10.127.7.10:8093",
  DEV_DOMAIN: "http://162.217.96.117:8093",
  STG_DOMAIN: "http://162.217.96.117:8093",
  BL_DISPLAY: "/wservce/buyleads/display/",
}
const LEADS_CDS_SERVICES = {
  DOMAIN: "http://cds.imutils.com",
  DEV_DOMAIN: "http://stg-cds.imutils.com",
  STG_DOMAIN: "http://stg-cds.imutils.com",
  BL_DISPLAY: "/wservce/buyleads/display/",
}
const LEADS_SERVICES = {
  DOMAIN: "http://leads.imutils.com",
  DEV_DOMAIN: "http://dev-leads.imutils.com",
  STG_DOMAIN: "http://stg-leads.imutils.com",
  BL_DISPLAY: "/wservce/buyleads/display/",
  BL_SHORTLISTED: "/wservce/buyleads/shortlisted/",
  BL_GROUP: "/wservce/buyleads/group/",
  BL_CATEGORY: "/wservce/buyleads/category/",
  BL_DEFAULT_DISPLAY:
    "/wservce/leads/defaultdisplay/?token=imobile1@15061981&modid=IMOB&offerType=",
  BL_NOT_INTERESTED: "/wservce/leads/notinterested/",
  BL_PURCHASE: "/wservce/buyleads/Purchase/",
  BL_MARKFAV: "/wservce/leads/markfav/",
  BL_CREDIT: "/wservce/users/credit/",
  BL_NI_QUESTIONS: "/wservce/buyleads/question_template/",
  BL_DETAIL: "/wservce/buyleads/detail/",
  BL_RELATED: "/wservce/buyleads/related_buyleads/", //Related Buyleads
  BL_TENDERS: "/wservce/tenders/",
  BL_INDUSTRY: "/wservce/tenders/group/?token=imobile1@15061981&modid=TDR",
  RFQ_DISPLAY: "/wservce/rfq/display/",
  BL_DELETE: "/wservce/buyleads/delete/",
  BL_PUSHTOPOP: "/wservce/buyleads/pushtotop/",
  BL_TENDERSUBCAT: "/wservce/tenders/cat/",
  BL_MCAT: "/wservce/buyleads/mcat_listing/",
  ENQUIRYBL_GENERATE_BL: "/wservce/rfq/add/",
  ENQUIRYBL_GETISQ: "/wservce/buyleads/getISQ/",
  ENQUIRYBL_SETISQ: "/wservce/leads/blsetisq/",
  ENQUIRYBL_DEL_QUES_TEMPLATE: "/wservce/buyleads/question_template/",
  LEADS_IMUTILS_GET_USER_LOC: "/wservce/enquiry/index.php/enquiry/getUserLoc/",
  BL_RELATED_MCAT: "/buyleads/related_mcat/"
};

const ENQ_SERVICES = {
  DOMAIN: "http://enq2.intermesh.net",
  DEV_DOMAIN: "http://dev-enq2.intermesh.net",
  STG_DOMAIN: "http://enqphp.intermesh.net",
  DEV_DOMAIN_INTENT: "http://stg-enq2.intermesh.net",
  STG_DOMAIN_INTENT: "http://stg-enq2.intermesh.net",
  ENQUIRYBL_GENERATE_ENQ: "/enquiry/saveEnquiry/",
  ENQUIRYBL_UPDATE_ENQ: "/enquiry/enrichEnquiry/",
  ENQUIRYBL_GENERATE_INTENT: "/enquiry/enquiryInterest",
  ENQUIRYBL_FINISH_ENQ: "/enquiry/finishEnquiry/",
  ADD_TEMP: "/enquiry/callEnquiryUnidentified/",
  READ_TEMP: "/enquiry/unidentifiedC2C/"
};

const SELLER_SERVICES = {
  DOMAIN: "http://seller.imutils.com",
  DEV_DOMAIN: "http://stg-mapi.indiamart.com",
  STG_DOMAIN: "http://stg-mapi.indiamart.com",
  SLR_FRGT_PSSWD: "/wservce/users/forgotpassword/",
  SLR_USR_DTL: "/wservce/users/detail/",
  SLR_OTR_DTL: "/wservce/users/otherdetail/",
  SLR_VRFY_DTL: "/wservce/users/verifiedDetail/",
  SLR_USR_LIST: "/wservce/products/userlisting/",
  SLR_PROD_DETAIL: "/wservce/products/detail/",
  SLR_CAT_DATA: "/wservce/products/categorydata/",
  SLR_GST_READ_DISPOSITION: "/wservce/users/attrdispositions/",
  SLR_GST_DISPOSITIONS_LIST: "/wservce/glmaster/detail/",
  NEG_MCAT: "/wservce/users/negativeMcat/",
};

const REL_PROD_SERVICES = {
  DOMAIN: "http://related.imutils.com",
  // DEV_DOMAIN: "http://related.imutils.com",
  DEV_DOMAIN: "http://stg-mapi.indiamart.com",
  STG_DOMAIN: "http://related.imutils.com",
  RECOMM_PROD: "/wservce/products/recommended/",
  REL_STDPROD: "/wservce/StandardProduct/RelatedStandardProduct/",
};

const CAPS_PROD_SERVICES = {
  DOMAIN: "http://caps.imutils.com",
  DEV_DOMAIN: "http://caps.imutils.com",
  STG_DOMAIN: "http://stg-caps.imutils.com",
  CAPS_PROD: "/wservce/products/capsrecommended/?",
};

const ADV_SEARCH_ISQ_SERVICES = {
  DOMAIN: 'https://utils.imimg.com',
  DEV_DOMAIN: 'https://utils.imimg.com',
  STG_DOMAIN: 'https://utils.imimg.com',
  ISQ_SRCH: '/McatSuggestionAndSellerIsq.php?'
}
const MSG_ENQ_SERVICES = {
  DOMAIN: "http://enq2.intermesh.net",
  DEV_DOMAIN: "http://dev-enq2.intermesh.net",
  STG_DOMAIN: "http://stg-enq2.intermesh.net",
  MSG_CONTACT_LIST: "/addressbook/listContact",
  MSG_CONVER_LIST: "/addressbook/conversationList",
  MSG_CONTACT_DETAIL: "/addressbook/detailContact/",
  MSG_INSTANT_RPLY: "/enquiry/InsertSendReply/",
  ENQ_FIND_MAIL: "/enquiry/findMail",
  MSG_UNREAD_COUNT: "/addressbook/unreadMessage/",
  MSG_UNREAD_LIST: "/addressbook/listContactUnread",
  CHAT_CREATE_USER: "/enquiry/chatCreateUser",
  C2CTRACK: "/enquiry/callEnquiry/",
  MSG_READ_RECEIPT: "/addressbook/readReceipt",
  SAVE_ENQUIRY: "/enquiry/saveEnquiry/",
  GET_TEMPLATE: "/enquiry/getTemplateList/",
  CREATE_TEMPLATE: "/enquiry/createTemplate/",
  MSG_IDENTIFIED_REPLY: "/enquiry/IdentifiedInsertSendReply"
};

const MSG_NEW_ENQ_SERVICES = {
  DOMAIN: "http://lms.imutils.com",
  DEV_DOMAIN: "http://dev-lms.imutils.com",
  STG_DOMAIN: "http://stg-lms.imutils.com",
  MSG_CONTACT_LIST: "/addressbook/listContact",
  MSG_CONVER_LIST: "/addressbook/conversationList",
  MSG_CONTACT_DETAIL: "/addressbook/detailContact/",
  MSG_UNREAD_COUNT: "/addressbook/unreadMessage/",
  MSG_UNREAD_LIST: "/addressbook/listContactUnread",
  MSG_READ_RECEIPT: "/addressbook/readReceipt",
  STARRED_MESSAGELIST: "/addressbook/markLeadAsStarred",
  MSG_GET_ORDER_DETAIL: "/orders/getOrderDetail",
  MSG_GET_DISPOSITION_LIST: "/orders/getDispositionList/",
  MSG_CANCEL_ORDER: "/orders/cancelOrder/",
  GET_ORDER_LIST: "/orders/getOrderList/",
  MSG_GENERATEORDER: "/orders/generateOrder",
  MSG_ENRICHORDER: "/orders/enrichOrder",
  MSG_FINISHORDER: "/orders/finishOrder",
  LATEST_TRANSACTION_DETAILS: "/addressbook/latestTransactionDetail/",
  MSG_GET_RESPONSE_RATE: "/addressbook/usuallyRepliesWithin"
};

const SRCH_SERVICES = {
  DOMAIN: "http://imsearch.indiamart.com:8983",
  DEV_DOMAIN: "http://fts-master.intermesh.net:8983",
  STG_DOMAIN: "http://fts-master.intermesh.net:8983",
  PROD_SEARCH: "/search/",
};

const BL_SRCH_SERVICES = {
  DOMAIN: "http://blsearch.indiamart.com:8983",
  DEV_DOMAIN: "http://dev-imsearch.indiamart.com:8983",
  STG_DOMAIN: "http://dev-imsearch.indiamart.com:8983",
  BL_SEARCH: "/search/buylead",
};

const PAY_SERVICES = {
  DOMAIN: "https://pay.indiamart.com",
  DEV_DOMAIN: "https://dev-pay.indiamart.com",
  STG_DOMAIN: "https://dev-pay.indiamart.com",
  PAY_INDEX: "/index.php",
};
const PAY_SERVICES_MESSAGES = {
  DOMAIN: "https://paywith.indiamart.com",
  DEV_DOMAIN: "https://dev-paywith.indiamart.com",
  STG_DOMAIN: "https://stg-paywith.indiamart.com",
  PAY_INDEX: "/index.php",
};
const INTERMESH_SERVICES = {
  DOMAIN: "http://service.intermesh.net",
  DEV_DOMAIN: "http://service.intermesh.net",
  STG_DOMAIN: "http://stg-service.intermesh.net",
  SELLER_ACTIVITY: "/seller_activity",
  SELLER_DETAILS: "/details",
  SELLER_USER_VERIFICATION: "/user/verification",
  SELLER_USER_UPDATE: "/user/update",
  SELLER_GST_DISPOSITION: "/user/dispositon",
  SELLER_DB_TRACKING: "/user/sellonimlog",
  FOREIGN_TNCACCEPTANCE: "/user/tncacceptance",
  SUPPLIER_RATING: "/supplierrating",
  ENQUIRYBL_USER_UPDATE: "/user/add",
  PROD_API: "/product",
  PROD_API: "/product",
  ADD_PROD_GRP: "/groups",
  SRCH_FEEDBACK: '/feedback',
  RATING_USEFULNESS: '/rating_usefulness',
  BLOCK_USER: '/user/user_block_unblock'
};

const LOGIN_SERVICES = {
  DOMAIN: "http://login.indiamart.com",
  DEV_DOMAIN: "http://login.indiamart.com",
  STG_DOMAIN: "http://stg1-login.indiamart.com",
  USER_REAUTH: "/user/reauthenticate/",
  USER_IDENTIFY: "/user/identify/",
  OTP_VERIFICATION: "/users/OTPverification/",
  USER_AUTH: "/user/authenticate/",
  TRUECALLER_POLL: "/user/tcverified/",
  LOGIN_WITH_GOOGLE: "/user/loginwithgoogle_first/",
  CHANGE_PASSWORD: "/user/changepassword",
  USER_TOKEN: "/user/getKey/",
  USER_PNSVERIFICATION: "/user/PNSVerified/",
  LOGIN_WITH_SMS: "/user/loginwithsms/",
  LOGIN_WITH_WHATSAPP: "/user/loginbroker/",
  LOGOUT: "/user/logout/"

};

const MAPI_SERVICES = {
  DOMAIN: "http://mapi.indiamart.com",
  DEV_DOMAIN: "http://stg-mapi.indiamart.com",
  STG_DOMAIN: "http://stg-mapi.indiamart.com",
  MAPI_PROD_DELETE: "/wservce/products/delete/",
  MAPI_PROD_UPLOAD: "/wservce/products/uploadimage/",
  MAPI_PROD_UPDATE: "/wservce/products/update/",
  MAPI_PROD_ADD: "/wservce/products/add/",
  MAPI_USER_EDIT: "/wservce/users/edit/",

};

// const PDP_SERVICES = {
//   DOMAIN: "http://pdp.imutils.com",
//   DEV_DOMAIN: "http://stg-mapi.indiamart.com",
//   STG_DOMAIN: "http://stg-mapi.indiamart.com",
//   PDP_PROD_DETAIL: "/wservce/products/detail/",
// };

const PDP_SERVICES = {
  DOMAIN: "pdpindic.imutils.com:80 ",
  DEV_DOMAIN: "http://stg-mapi.indiamart.com",
  STG_DOMAIN: "http://stg-mapi.indiamart.com",
  // PDP_PROD_DETAIL: "/wservce/products/detail/",
};

const RECOMMENDED_SERVICES = {
  DOMAIN: "http://recommend.imutils.com",
  DEV_DOMAIN: "http://recommend.imutils.com",
  STG_DOMAIN: "http://recommend.imutils.com",
  RECOMMENDED_GETRELATED: "/UserAttributes/Getrelated/m/",
  RECOMMENDED_GET_BUYERDATA: "/Buyerattributes/GetBuyerData/",
  RECOMMENDED_GET_RECOMMENDDATA: "/Buyerattributes/GetMcatRecomendation/",
  RECOMMENDED_GET_BIGBRAND: "/Buyerattributes/GetBigBrand/",
  RECOMMENDED_GET_ATTRIBUTES: "/UserAttributes/GetAttributes/",
  RECOMMENDED_GET_CITYRECOMMENDATION:
    "/Buyerattributes/GetCityRecomendation/glusrId/",
};

const SUGGEST_IMIMG_SERVICES = {
  DOMAIN: "http://suggest.imimg.com",
  DEV_DOMAIN: "http://stg-suggest.imimg.com",
  STG_DOMAIN: "http://stg-suggest.imimg.com",
  GET_SUGGESTION: "/suggest/suggest.php/",
  GET_SUGGEST_PDM: "/suggest/suggest_pdm.php/",
};

const VERSION_SERVICE = {
  DOMAIN: "https://m.indiamart.com",
  DEV_DOMAIN: "https://dev-m.indiamart.com",
  STG_DOMAIN: "https://stg-m.indiamart.com",
  VERSION: "/phpajax/version/",
};

const USER_IMUTILS_SERVICES = {
  DOMAIN: "http://users.imutils.com",
  DEV_DOMAIN: "http://dev-users.imutils.com",
  STG_DOMAIN: "http://stg-users.imutils.com",
  USER_IMUTILS_SELLER_ADDRESS: "/wservce/LatlongToAddress/AddressFields/",
  USER_IMUTILS_HOTLEADS: "/wservce/users/seller/",
  USER_IMUTILS_GET_USER_LOC: "/wservce/enquiry/index.php/enquiry/getUserLoc/",
  USER_IMUTILS_PROD_ADD: "/wservce/products/add/",
  BL_NI_UNIT: "/wservce/im/McatDetail/",//token/immenu@7851/mcatid/3/modid/MY/req_datafield/UNIT/" users.imutils.com
  GET_RATINGS: "/wservce/users/supplierrating/",
  GET_INFLU_PARAM: "/wservce/users/getinfluparams/",
  LOCALITY: "/wservce/im/localityPincode/",
  MINI_DETAILS: "/wservce/users/MiniDetail/",
  BUYER_PROFILE: "/wservce/users/buyerprofile/",
  PNS_DETAILS: "/wservce/users/pnssetting/",
  USER_SETTING_DETAILS: "/wservce/users/setting/",
  USER_APP_DETAILS: "/wservce/apps/checkuser/",
  GET_SUBCAT: "/wservce/im/category/"
};
const USER_BIZFEED_SERVICES = {
  DOMAIN: "http://bizfeed.imutils.com",
  DEV_DOMAIN: "https://admin:admin@dev-mapi2.indiamart.com/MY",
  STG_DOMAIN: "https://admin:admin@dev-mapi2.indiamart.com/MY",
  USER_LAST_SEEN: "/MyActivity/Getactivitystatus/",
};
const IMPCAT_UTILS_SERVICES = {
  DOMAIN: "http://impcat.imutils.com",
  DEV_DOMAIN: "http://stg-mapi.indiamart.com",
  STG_DOMAIN: "http://stg-mapi.indiamart.com",
  MAPI_IM_CAT: "/wservce/im/category/",
  BL_PROD_DETAIL: "/wservce/Products/standardproduct/",
  STANDARD_HOME_DETAIL: "/wservce/Products/StandardProductHomePage/",
  MAPI_CITY_MCAT: "/wservce/products/citymcats/",
  USER_IMUTILS_GET_ENGAGEMENT_DATA: "/wservce/Viewcount/getviewcount/",
  MAPI_VIDEOS: "/wservce/products/McatVideoListing",
};
//Not used anymore
const PROD_MCAT_SERVICES = {
  DOMAIN: "http://searchtools.intermesh.net:8983",
  DEV_DOMAIN: "http://fts-master.intermesh.net:8983",
  STG_DOMAIN: "http://fts-master.intermesh.net:8983",
  PROD_MCAT_INFO: "/tools/related_info",
};

const PRODUCT_MCAT_SERVICES = {
  DOMAIN: "http://10.128.0.15:8983",
  DEV_DOMAIN: "http://162.217.96.116:8983",
  STG_DOMAIN: "http://162.217.96.116:8983",
  PRODUCT_MCAT_INFO: "/tools/related_info",
};

const IMPCAT_SERVICES = {
  DOMAIN: "impcatindic.imutils.com:80",
  // DEV_DOMAIN: "http://dev-mapi.indiamart.com",
  // STG_DOMAIN: "http://impcat.imutils.com",
  // MAPI_IM_CAT: "/wservce/products/listing/",
};

const SUGGESTIVE_REPLY_SERVICES = {
  DOMAIN: "http://suggestive.imutils.com",
  DEV_DOMAIN: "http://34.93.121.162",
  STG_DOMAIN: "http://34.93.121.162",
  ML_SERVICE: "/",
};
const COMPANY_SERVICES = {
  DOMAIN: "http://company.imutils.com",
  DEV_DOMAIN: "http://company.imutils.com",
  STG_DOMAIN: "https://stg-company.imutils.com/",
  COMPANY_DETAIL: "/wservce/company/detail/",
};
const TWITTER_SERVICE = {
  DOMAIN: "https://api.twitter.com/2/tweets/search/recent",
  POSTS_SERVICE: "",
};
const MERP_SERVICES = {
  DOMAIN: "https://merp.intermesh.net",
  DEV_DOMAIN: "https://dev-merp.intermesh.net",
  STG_DOMAIN: "https://dev-merp.intermesh.net",
  VIEW_TICKET: "/index.php/tickets/viewtickets/",
  TICKET_ISSUE: "/index.php/Tickets/TicketIssue",
  FEEDBACK: "/index.php/Custfeedback/helpfeedback",
  ENTERPRIZE: "/index.php/seller/Listing/isEnterprise",
};

/*
getSrvcUrl Definition:
arg2:pass Service url 
arg3:pass DEV_ENV / STG_ENV to connect DEV or STG in Local environment.
*/

module.exports = {
  BL_DISPLAY_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_DISPLAY
  ),
  BL_ML_DISPLAY_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES_ML,
    LEADS_SERVICES_ML.BL_DISPLAY
  ),
  BL_DISPLAY_CDS_URL: GblFuncs.getSrvcUrl(
    LEADS_CDS_SERVICES,
    LEADS_CDS_SERVICES.BL_DISPLAY
  ),
  //Related Buyleads
  BL_RELATED_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_RELATED
  ),
  BL_SHORTLISTED_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_SHORTLISTED
  ),
  BL_GROUP_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_GROUP),
  BL_CATEGORY_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_CATEGORY
  ),
  BL_DEFAULT_DISPLAY_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_DEFAULT_DISPLAY
  ),
  BL_NOT_INTERESTED_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_NOT_INTERESTED
  ),
  BL_PURCHASE_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_PURCHASE
  ),
  BL_MARKFAV_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_MARKFAV
  ),
  BL_CREDIT_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_CREDIT),
  BL_NI_QUESTIONS_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_NI_QUESTIONS,
    STG_ENV
  ),
  BL_DETAIL_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_DETAIL),
  BL_MCAT_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_MCAT),
  BL_RELATED_MCAT_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_RELATED_MCAT
  ),
  BL_TENDERS_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_TENDERS
  ),
  BL_TENDERS_INDUSTRY_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_INDUSTRY
  ),
  BL_TENDERS_SUBCAT_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_TENDERSUBCAT
  ),
  LEADS_GET_USER_LOC_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.LEADS_IMUTILS_GET_USER_LOC
  ),
  BL_STANDARD_PROD_URL: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.BL_PROD_DETAIL
  ),
  BL_STANDARD_HOME_URL: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.STANDARD_HOME_DETAIL
  ),
  //Dir
  MAPI_IM_CAT_URL: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.MAPI_IM_CAT, DEV_ENV
  ),

  MBR_LIST_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.RFQ_DISPLAY),

  MBR_DELETE_URL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_DELETE),
  MBR_PUSHTOPOP_URL: GblFuncs.getSrvcUrl(
    LEADS_SERVICES,
    LEADS_SERVICES.BL_PUSHTOPOP
  ),

  SLR_FRGT_PSSWD_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_FRGT_PSSWD
  ),
  SLR_USR_DTL_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_USR_DTL
  ),
  SLR_OTR_DTL_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_OTR_DTL
  ),
  SLR_VRFY_DTL_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_VRFY_DTL
  ),
  SLR_USR_LIST_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_USR_LIST
  ),
  SLR_PROD_DETAIL_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_PROD_DETAIL,
    STG_ENV
  ),
  SLR_CAT_DATA_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_CAT_DATA,
    STG_ENV
  ),
  SLR_GST_READ_DISPOSITION_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_GST_READ_DISPOSITION
  ),
  SLR_GST_DISPOSITIONS_LIST_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.SLR_GST_DISPOSITIONS_LIST
  ),
  NEG_MCAT_URL: GblFuncs.getSrvcUrl(
    SELLER_SERVICES,
    SELLER_SERVICES.NEG_MCAT,
    STG_ENV
  ),

  REL_STDPROC_URL: GblFuncs.getSrvcUrl(
    REL_PROD_SERVICES,
    REL_PROD_SERVICES.REL_STDPROD,
  ),
  RECOMM_PROD_URL: GblFuncs.getSrvcUrl(
    REL_PROD_SERVICES,
    REL_PROD_SERVICES.RECOMM_PROD
  ),

  CAPS_PROD_SERVICES_URL: GblFuncs.getSrvcUrl(
    CAPS_PROD_SERVICES,
    CAPS_PROD_SERVICES.CAPS_PROD
  ),
  SRCH_FEEDBACK_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SRCH_FEEDBACK
  ),
  ADV_ISQ_URL: GblFuncs.getSrvcUrl(
    ADV_SEARCH_ISQ_SERVICES,
    ADV_SEARCH_ISQ_SERVICES.ISQ_SRCH
  ),
  MSG_CONTACT_LIST_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_CONTACT_LIST,
    DEV_ENV
  ),
  STAR_LIST_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.STARRED_MESSAGELIST,
    STG_ENV
  ),
  MSG_GET_RESPONSE_RATE: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_GET_RESPONSE_RATE,
    STG_ENV
  ),
  MSG_GENERATEORDER: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_GENERATEORDER,
    STG_ENV
  ),
  MSG_ENRICHORDER: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_ENRICHORDER,
    STG_ENV
  ),
  MSG_FINISHORDER: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_FINISHORDER,
    STG_ENV
  ),
  MSG_GET_ORDER_DETAIL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_GET_ORDER_DETAIL,
    STG_ENV
  ),
  MSG_GET_DISPOSITION_LIST: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_GET_DISPOSITION_LIST,
    STG_ENV
  ),
  MSG_CANCEL_ORDER: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_CANCEL_ORDER,
    STG_ENV
  ),
  MSG_CONVER_LIST_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_CONVER_LIST,
    DEV_ENV
  ),
  GET_ORDER_LIST_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.GET_ORDER_LIST,
    STG_ENV
  ),
  CREATE_TEMPLATE: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.CREATE_TEMPLATE,
    STG_ENV
  ),
  GET_TEMPLATE: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.GET_TEMPLATE,
    STG_ENV
  ),
  RATING_USEFULNES_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.RATING_USEFULNESS,
    DEV_ENV
  ),
  BLOCK_USER_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.BLOCK_USER,
    STG_ENV
  ),

  MSG_CONTACT_DETAIL_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_CONTACT_DETAIL,
    DEV_ENV
  ),
  LATEST_TRANSACTION_DETAILS_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.LATEST_TRANSACTION_DETAILS,
    DEV_ENV
  ),
  BUYER_PROFILE_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.BUYER_PROFILE,



  ),
  /*AppBanner Migration*/
  CHECK_APP_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_APP_DETAILS
  ),
  /*---------*/
  MSG_INSTANT_RPLY_URL: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.MSG_INSTANT_RPLY,
    DEV_ENV
  ),
  MSG_IDENTIFIED_REPLY: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.MSG_IDENTIFIED_REPLY,
    DEV_ENV
  ),
  ENQ_FIND_MAIL_URL: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.ENQ_FIND_MAIL,
    DEV_ENV
  ),
  MSG_UNREAD_COUNT_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_UNREAD_COUNT,
    STG_ENV
  ),
  MSG_UNREAD_LIST_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_UNREAD_LIST,
    STG_ENV
  ),
  C2CTRACK_URL: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.C2CTRACK,
    STG_ENV
  ),
  MSG_READ_URL: GblFuncs.getSrvcUrl(
    MSG_NEW_ENQ_SERVICES,
    MSG_NEW_ENQ_SERVICES.MSG_READ_RECEIPT,
    DEV_ENV
  ),

  COMPANY_SAVE_ENQUIRY: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.SAVE_ENQUIRY,
    DEV_ENV
  ),
  CHAT_CREATE_USER_URL: GblFuncs.getSrvcUrl(
    MSG_ENQ_SERVICES,
    MSG_ENQ_SERVICES.CHAT_CREATE_USER,
    STG_ENV
  ),

  PROD_SEARCH_URL: GblFuncs.getSrvcUrl(SRCH_SERVICES, SRCH_SERVICES.PROD_SEARCH),
  BL_SEARCH_URL: GblFuncs.getSrvcUrl(BL_SRCH_SERVICES, BL_SRCH_SERVICES.BL_SEARCH),

  PAY_INDEX_URL: GblFuncs.getSrvcUrl(PAY_SERVICES,
    PAY_SERVICES.PAY_INDEX
  ),
  PAY_INDEX_MESSAGES_URL: GblFuncs.getSrvcUrl(PAY_SERVICES_MESSAGES,
    PAY_SERVICES_MESSAGES.PAY_INDEX,
    DEV_ENV
  ),
  USER_SETTING_DETAILS_URL: GblFuncs.getSrvcUrl(USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_SETTING_DETAILS,
  ),
  COMPANY_URL: GblFuncs.getSrvcUrl(
    COMPANY_SERVICES,
    COMPANY_SERVICES.COMPANY_DETAIL,
  ),

  SELLER_ACTIVITY_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_ACTIVITY,
    STG_ENV
  ),
  SELLER_DETAILS_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_DETAILS,
    STG_ENV
  ),
  SELLER_USER_VERIFICATION_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_USER_VERIFICATION
  ),
  SELLER_USER_UPDATE_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_USER_UPDATE
  ),
  SELLER_GST_DISPOSITION_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_GST_DISPOSITION
  ),
  SELLER_DB_TRACKING_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SELLER_DB_TRACKING
  ),
  FOREIGN_TNCACCEPTANCE_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.FOREIGN_TNCACCEPTANCE
  ),
  PROD_API_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.PROD_API,
    STG_ENV
  ),
  ADD_PROD_GRP_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.ADD_PROD_GRP,
    STG_ENV
  ),

  USER_REAUTH_URL: GblFuncs.getSrvcUrl(
    LOGIN_SERVICES,
    LOGIN_SERVICES.USER_REAUTH,
    DEV_ENV
  ),
  USER_IDENTIFY_URL: GblFuncs.getSrvcUrl(
    LOGIN_SERVICES,
    LOGIN_SERVICES.USER_IDENTIFY
  ),
  USER_CHANGE_PASSWORD: GblFuncs.getSrvcUrl(
    LOGIN_SERVICES,
    LOGIN_SERVICES.CHANGE_PASSWORD
  ),
  OTP_VERIFICATION_URL: GblFuncs.getSrvcUrl(
    LOGIN_SERVICES,
    LOGIN_SERVICES.OTP_VERIFICATION,
    DEV_ENV
  ),
  LOGIN_WITH_SMS: GblFuncs.getSrvcUrl(
    LOGIN_SERVICES,
    LOGIN_SERVICES.LOGIN_WITH_SMS,
    DEV_ENV
  ),
  USER_AUTH_URL: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.USER_AUTH),
  LOGOUT: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.LOGOUT),
  MAPI_PROD_DELETE_URL: GblFuncs.getSrvcUrl(
    MAPI_SERVICES,
    MAPI_SERVICES.MAPI_PROD_DELETE
  ),
  MAPI_PROD_UPLOAD_URL: GblFuncs.getSrvcUrl(
    MAPI_SERVICES,
    MAPI_SERVICES.MAPI_PROD_UPLOAD
  ),
  MAPI_PROD_UPDATE_URL: GblFuncs.getSrvcUrl(
    MAPI_SERVICES,
    MAPI_SERVICES.MAPI_PROD_UPDATE
  ),
  MAPI_PROD_ADD_URL: GblFuncs.getSrvcUrl(
    MAPI_SERVICES,
    MAPI_SERVICES.MAPI_PROD_ADD
  ),
  MAPI_USER_EDIT_URL: GblFuncs.getSrvcUrl(
    MAPI_SERVICES,
    MAPI_SERVICES.MAPI_USER_EDIT
  ),

  // PDP_PROD_DETAIL_URL: GblFuncs.getSrvcUrl(PDP_SERVICES, PDP_SERVICES.PDP_PROD_DETAIL),
  PDP_PROD_DETAIL_URL: GblFuncs.getSrvcUrl(PDP_SERVICES, ''),

  RECOMMENDED_GETRELATED_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GETRELATED),
  RECOMMENDED_GET_PRODUCTDATA_URL: GblFuncs.getSrvcUrl(REL_PROD_SERVICES, REL_PROD_SERVICES.RECOMM_PROD),
  RECOMMENDED_GET_BUYERDATA_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GET_BUYERDATA),
  RECOMMENDED_GET_RECOMMENDDATA_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GET_RECOMMENDDATA),
  RECOMMENDED_GET_BIGBRAND_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GET_BIGBRAND),
  RECOMMENDED_GET_ATTRIBUTES_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GET_ATTRIBUTES),
  RECOMMENDED_GET_CITYRECOMMENDATION_URL: GblFuncs.getSrvcUrl(RECOMMENDED_SERVICES, RECOMMENDED_SERVICES.RECOMMENDED_GET_CITYRECOMMENDATION),


  GET_SUGGESTION_URL: GblFuncs.getSrvcUrl(SUGGEST_IMIMG_SERVICES, SUGGEST_IMIMG_SERVICES.GET_SUGGESTION),
  GET_SUGGEST_PDM_URL: GblFuncs.getSrvcUrl(SUGGEST_IMIMG_SERVICES, SUGGEST_IMIMG_SERVICES.GET_SUGGEST_PDM),

  USER_IMUTILS_SELLER_ADDRESS_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_IMUTILS_SELLER_ADDRESS
  ),
  USER_IMUTILS_HOTLEADS_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_IMUTILS_HOTLEADS
  ),
  GET_SUBCAT_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.GET_SUBCAT
  ),
  USER_IMUTILS_PROD_ADD_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_IMUTILS_PROD_ADD
  ),
  USER_IMUTILS_GET_USER_LOC_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.USER_IMUTILS_GET_USER_LOC
  ),
  USER_IMUTILS_GET_ENGAGEMENT_DATA: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.USER_IMUTILS_GET_ENGAGEMENT_DATA, DEV_ENV
  ),
  USER_IMUTILS_GET_MINI_DETAILS: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.MINI_DETAILS
  ),
  IMPCAT_URL: GblFuncs.getSrvcUrl(IMPCAT_SERVICES, IMPCAT_SERVICES.MAPI_IM_CAT),
  MAPI_CITY_URL: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.MAPI_CITY_MCAT
  ),
  IMPCAT_VIDEOS_URL: GblFuncs.getSrvcUrl(
    IMPCAT_UTILS_SERVICES,
    IMPCAT_UTILS_SERVICES.MAPI_VIDEOS, DEV_ENV
  ),
  USER_NI_UNIT_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.BL_NI_UNIT
  ),
  USER_LAST_SEEN_URL: GblFuncs.getSrvcUrl(
    USER_BIZFEED_SERVICES,
    USER_BIZFEED_SERVICES.USER_LAST_SEEN
  ),
  VERSION_URL: GblFuncs.getSrvcUrl(VERSION_SERVICE, VERSION_SERVICE.VERSION),
  GET_RATINGS_URL: GblFuncs.getSrvcUrl(
    USER_IMUTILS_SERVICES,
    USER_IMUTILS_SERVICES.GET_RATINGS,
    DEV_ENV
  ),
  GET_INFLU_PARAM_URL: GblFuncs.getSrvcUrl(USER_IMUTILS_SERVICES, USER_IMUTILS_SERVICES.GET_INFLU_PARAM, STG_ENV),
  SUPPLIER_RATING_URL: GblFuncs.getSrvcUrl(
    INTERMESH_SERVICES,
    INTERMESH_SERVICES.SUPPLIER_RATING,
    DEV_ENV
  ),
  USER_DETAIL_SERVICE: GblFuncs.getSrvcUrl(
    SELLER_SERVICES, SELLER_SERVICES.SLR_USR_DTL
  ),
  SUGGESTIVE_REPLY_URL: GblFuncs.getSrvcUrl(
    SUGGESTIVE_REPLY_SERVICES,
    SUGGESTIVE_REPLY_SERVICES.ML_SERVICE,
    DEV_ENV
  ),

  //EnquiryBl
  GENERATE_BL: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.ENQUIRYBL_GENERATE_BL),
  GENERATE_ENQ: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.ENQUIRYBL_GENERATE_ENQ, STG_ENV),
  UPDATE_ENQ: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.ENQUIRYBL_UPDATE_ENQ, STG_ENV),
  GENERATE_INTENT: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.ENQUIRYBL_GENERATE_INTENT, STG_ENV),
  GET_ISQ: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.ENQUIRYBL_GETISQ),
  SET_ISQ: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.ENQUIRYBL_SETISQ),
  DEL_REQ: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.BL_DELETE),
  FINISH_ENQ: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.ENQUIRYBL_FINISH_ENQ, STG_ENV),
  ENQUIRYBL_TRUECALLER_POLL: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.TRUECALLER_POLL),
  IDENTIFY_URL: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.USER_IDENTIFY),
  DEL_QUES_TEMPLATE: GblFuncs.getSrvcUrl(LEADS_SERVICES, LEADS_SERVICES.ENQUIRYBL_DEL_QUES_TEMPLATE),
  ENQUIRYBL_USER_UPDATE: GblFuncs.getSrvcUrl(INTERMESH_SERVICES, INTERMESH_SERVICES.ENQUIRYBL_USER_UPDATE),
  ENQUIRYBL_USER_IDENTIFY_URL: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.USER_IDENTIFY),
  USER_MINI_DETAIL: GblFuncs.getSrvcUrl(USER_IMUTILS_SERVICES, USER_IMUTILS_SERVICES.MINI_DETAILS),
  ENQUIRYBL_LOGIN_WITH_WHATSAPP: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.LOGIN_WITH_WHATSAPP),
  PROD_MCAT_INFO_URL: GblFuncs.getSrvcUrl(PROD_MCAT_SERVICES, PROD_MCAT_SERVICES.PROD_MCAT_INFO),
  PRODUCT_MCAT_INFO_URL: GblFuncs.getSrvcUrl(PRODUCT_MCAT_SERVICES, PROD_MCAT_SERVICES.PROD_MCAT_INFO, STG_ENV),

  PINCODE_LOCALITY: GblFuncs.getSrvcUrl(USER_IMUTILS_SERVICES, USER_IMUTILS_SERVICES.LOCALITY),

  TWITTER_URL: GblFuncs.getSrvcUrl(TWITTER_SERVICE, TWITTER_SERVICE.POSTS_SERVICE),
  ENQUIRYBL_LOGIN_WITH_GOOGLE: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.LOGIN_WITH_GOOGLE),
  PNS_SERVICE_DETAILS: GblFuncs.getSrvcUrl(USER_IMUTILS_SERVICES, USER_IMUTILS_SERVICES.PNS_DETAILS),

  //Call
  USER_TOKEN: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.USER_TOKEN),
  USER_PNSVERIFICATION: GblFuncs.getSrvcUrl(LOGIN_SERVICES, LOGIN_SERVICES.USER_PNSVERIFICATION),

  ADD_TEMP: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.ADD_TEMP),
  READ_TEMP: GblFuncs.getSrvcUrl(ENQ_SERVICES, ENQ_SERVICES.READ_TEMP),

  VIEW_TICKET_URL: GblFuncs.getSrvcUrl(
    MERP_SERVICES,
    MERP_SERVICES.VIEW_TICKET
  ),
  TICKET_ISSUE_URL: GblFuncs.getSrvcUrl(
    MERP_SERVICES,
    MERP_SERVICES.TICKET_ISSUE
  ),
  FEEDBACK_URL: GblFuncs.getSrvcUrl(
    MERP_SERVICES,
    MERP_SERVICES.FEEDBACK
  ),
  ENTERPRIZE_URL: GblFuncs.getSrvcUrl(
    MERP_SERVICES,
    MERP_SERVICES.ENTERPRIZE, DEV_ENV),
}  