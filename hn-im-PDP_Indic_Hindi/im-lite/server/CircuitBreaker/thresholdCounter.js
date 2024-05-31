// RECOMMENDED_GET_PRODUCTDATA_URL: "/wservce/products/recommended/",
// RECOMM_PROD_URL : "/wservce/products/recommended/"
// ----REL_STDPROC_URL: "/wservce/StandardProduct/RelatedStandardProduct/"
// PDP_PROD_DETAIL_URL: "/wservce/products/detail/
// RECOMMENDED_GETRELATED_URL: "/UserAttributes/Getrelated/m/",
// RECOMMENDED_GET_BUYERDATA_URL: "/Buyerattributes/GetBuyerData/",
// RECOMMENDED_GET_RECOMMENDDATA_URL: "/Buyerattributes/GetMcatRecomendation/",
// RECOMMENDED_GET_BIGBRAND_URL: "/Buyerattributes/GetBigBrand/",
// RECOMMENDED_GET_ATTRIBUTES_URL: "/UserAttributes/GetAttributes/",
// ----RECOMMENDED_GET_CITYRECOMMENDATION_URL:"/Buyerattributes/GetCityRecomendation/glusrId/",
// PDP_PROD_DETAIL_URL
// COMPANY_URL
// PROD_SEARCH_URL
// PROD_MCAT_INFO
//MAPI_IM_CAT /wservce/im/category/
//BL_PROD_DETAIL wservce/Products/standardproduct/'
//MAPI_CITY_MCAT: "/wservce/products/citymcats/" //city index page
//MAPI_VIDEOS: "/wservce/products/McatVideoListing",//impcat page video listing
//MAPI_IM_CAT: "/wservce/products/listing/===> impcat page
// MSG_CONTACT_LIST_URL
// MSG_CONVER_LIST

const thresholdCounter_PROD_ENV = {
    'http://related.imutils.com/wservce/products/recommended/' :40,
    'http://related.imutils.com/wservce/StandardProduct/RelatedStandardProduct/' : 40,
    'http://recommend.imutils.com/Buyerattributes/GetBigBrand/':40,
    'http://recommend.imutils.com/UserAttributes/GetAttributes/':40,
    'http://recommend.imutils.com/Buyerattributes/GetMcatRecomendation/':40,
    'http://recommend.imutils.com/Buyerattributes/GetBuyerData/':40,
    'http://company.imutils.com/wservce/company/detail/':40,
    'http://pdp.imutils.com/wservce/products/detail/':40,
    'http://imsearch.indiamart.com:8983/search/':40,
    'http://impcat.imutils.com/wservce/im/category/':40,
    'http://impcat.imutils.com/wservce/Products/standardproduct/':40,
     'http://impcat.imutils.com/wservce/products/citymcats/':40,
    'http://impcat.imutils.com/wservce/products/McatVideoListing':40,
    'http://impcat.imutils.com/wservce/products/listing/':40,
    'http://leads.imutils.com/wservce/buyleads/display/':40,
    'http://leads.imutils.com/wservce/buyleads/shortlisted/':40,
    'http://leads.imutils.com/wservce/buyleads/group/':40,
    'http://leads.imutils.com/wservce/buyleads/category/':40,
    'http://leads.imutils.com/wservce/leads/defaultdisplay/token/imobile1@15061981/modid/IMOB/offerType/':40,
    'http://leads.imutils.com/wservce/leads/notinterested/':40,
    'http://leads.imutils.com/wservce/buyleads/related_buyleads/':40,
    'http://leads.imutils.com/wservce/tenders/group/?token=imobile1@15061981&modid=TDR' :40,
    'http://leads.imutils.com/wservce/tenders/cat/':40,
    'http://leads.imutils.com/wservce/buyleads/mcat_listing/':40,
    'http://lms.imutils.com/addressbook/listContact':30,
    'http://lms.imutils.com/addressbook/conversationList':30,
    'http://lms.imutils.com/addressbook/detailContact/':30,
    'http://lms.imutils.com/addressbook/unreadMessage/':30,
    'http://lms.imutils.com/addressbook/listContactUnread':30,
    'http://lms.imutils.com/addressbook/readReceipt':30,
    'http://seller.imutils.com/wservce/users/forgotpassword/':30,
    'http://seller.imutils.com/wservce/users/detail/':30,//Done
    'http://seller.imutils.com/wservce/users/otherdetail/':30,//Done
    'http://seller.imutils.com/wservce/users/verifiedDetail/':30,//DoneNoTest
    'http://seller.imutils.com/wservce/products/userlisting/':30,//Done
    'http://seller.imutils.com/wservce/products/detail/':30,
    'http://seller.imutils.com/wservce/products/categorydata/':30,
    'http://seller.imutils.com/wservce/users/attrdispositions/':30,//Done
    'http://seller.imutils.com/wservce/wservce/glmaster/detail/':30,//Done
    'http://seller.imutils.com/wservce/users/negativeMcat/':30,
    'http://leads.imutils.com/wservce/buyleads/Purchase/':40,
    'http://leads.imutils.com/wservce/leads/markfav/':40,
    'http://leads.imutils.com/wservce/users/credit/':40,
    'http://leads.imutils.com//wservce/buyleads/detail/':40,
    'http://leads.imutils.com/wservce/rfq/display/':40,
    'http://leads.imutils.com/wservce/buyleads/delete/':40,
    'http://leads.imutils.com/wservce/rfq/add/':40,
    'http://leads.imutils.com/wservce/buyleads/getISQ/':40,
    'http://leads.imutils.com/wservce/leads/blsetisq/':40,
    'http://leads.imutils.com/wservce/buyleads/question_template/':40,
    'http://enq2.intermesh.net/enquiry/saveEnquiry/':30,
    'http://enq2.intermesh.net/enquiry/enrichEnquiry/':30,
    'http://enq2.intermesh.net/enquiry/enquiryInterest':30,
    'http://enq2.intermesh.net/enquiry/finishEnquiry/':30,
    'http://login.indiamart.com/user/identify/':40,
    'http://login.indiamart.com/users/OTPverification/':40,
    'http://login.indiamart.com/user/authenticate/':40,
    'http://login.indiamart.com/user/tcverified/':200,
    'http://login.indiamart.com/user/loginwithgoogle_first/':40,
    'http://bizfeed.imutils.com/MyActivity/Getactivitystatus/':40,
    'http://users.imutils.com/wservce/LatlongToAddress/AddressFields/':40,
    'http://users.imutils.com/wservce/users/seller/':40,
    'http://users.imutils.com/wservce/enquiry/index.php/enquiry/getUserLoc/':40,
    'http://users.imutils.com/wservce/products/add/':40,
    'http://users.imutils.com/wservce/users/supplierrating/':40,
    'http://users.imutils.com/wservce/users/getinfluparams/':40,
    'http://users.imutils.com/wservce/im/localityPincode/':40,
    'http://users.imutils.com/wservce/users/MiniDetail/':40,
    'http://users.imutils.com/wservce/users/buyerprofile/':40,
    'http://enq2.intermesh.net/enquiry/InsertSendReply/':40,
    'http://enq2.intermesh.net/enquiry/chatCreateUser':40,
    'http://suggestive.imutils.com/':40,
    'https://pay.indiamart.com/index.php':30
    // 'http://searchtools.intermesh.net:8983/tools/related_info':5
    // 'http://recommend.imutils.com/UserAttributes/Getrelated/m/':5
    // 'http://recommend.imutils.com/Buyerattributes/GetCityRecomendation/glusrId/':5,
}
const thresholdCounter_STG_ENV = {
    'http://related.imutils.com/wservce/products/recommended/' :40,
    'http://related.imutils.com/wservce/StandardProduct/RelatedStandardProduct/' : 40,
    'http://recommend.imutils.com/Buyerattributes/GetBigBrand/':40,
    'http://recommend.imutils.com/UserAttributes/GetAttributes/':40,
    'http://recommend.imutils.com/Buyerattributes/GetMcatRecomendation/':40,
    'http://recommend.imutils.com/Buyerattributes/GetBuyerData/':40,
    'http://company.imutils.com/wservce/company/detail/':40,
    'http://pdp.imutils.com/wservce/products/detail/':40,
    // 'http://recommend.imutils.com/UserAttributes/Getrelated/m/':5
    // 'http://recommend.imutils.com/Buyerattributes/GetCityRecomendation/glusrId/':5,
    // 'http://pdp.imutils.com/wservce/products/detail/' :5,
    'http://impcat.imutils.com/wservce/im/category/':40,
    'http://impcat.imutils.com/wservce/Products/standardproduct/':40,
    'http://impcat.imutils.com/wservce/products/citymcats/':40,
    'http://impcat.imutils.com/wservce/products/McatVideoListing':40,
    'http://impcat.imutils.com/wservce/products/listing/':40,
    'http://leads.imutils.com/wservce/buyleads/display/':40,
    'http://leads.imutils.com/wservce/buyleads/shortlisted/':40,
    'http://leads.imutils.com/wservce/buyleads/group/':40,
    'http://leads.imutils.com/wservce/buyleads/category/':40,
    'http://leads.imutils.com/wservce/leads/defaultdisplay/token/imobile1@15061981/modid/IMOB/offerType/':40,
    'http://leads.imutils.com/wservce/leads/notinterested/':40,
    'http://leads.imutils.com/wservce/buyleads/related_buyleads/':40,
    'http://leads.imutils.com/wservce/tenders/group/?token=imobile1@15061981&modid=TDR' : 40,
    'http://leads.imutils.com/wservce/tenders/cat/':40,
    'http://leads.imutils.com/wservce/buyleads/mcat_listing/':40,
    'http://leads.imutils.com/wservce/buyleads/Purchase/':40,
    'http://leads.imutils.com/wservce/leads/markfav/':40,
    'http://leads.imutils.com/wservce/users/credit/':40,
    'http://leads.imutils.com//wservce/buyleads/detail/':40,
    'http://leads.imutils.com/wservce/rfq/display/':40,
    'http://leads.imutils.com/wservce/buyleads/delete/':40,
    'http://leads.imutils.com/wservce/rfq/add/':40,
    'http://leads.imutils.com/wservce/buyleads/getISQ/':40,
    'http://leads.imutils.com/wservce/leads/blsetisq/':40,
    'http://leads.imutils.com/wservce/buyleads/question_template/':40,
    'http://bizfeed.imutils.com/MyActivity/Getactivitystatus/':40,
    'http://users.imutils.com/wservce/LatlongToAddress/AddressFields/':40,
    'http://users.imutils.com/wservce/users/seller/':40,
    'http://users.imutils.com/wservce/enquiry/index.php/enquiry/getUserLoc/':40,
    'http://users.imutils.com/wservce/products/add/':40,
    'http://users.imutils.com/wservce/users/supplierrating/':40,
    'http://users.imutils.com/wservce/users/getinfluparams/':40,
    'http://users.imutils.com/wservce/im/localityPincode/':40,
    'http://users.imutils.com/wservce/users/MiniDetail/':40,
    'http://users.imutils.com/wservce/users/buyerprofile/':40
  
}
const thresholdCounter_DEV_ENV = {
    'http://related.imutils.com/wservce/products/recommended/' :40,
    'http://related.imutils.com/wservce/StandardProduct/RelatedStandardProduct/' : 40,
    'http://recommend.imutils.com/Buyerattributes/GetBigBrand/':40,
    'http://recommend.imutils.com/UserAttributes/GetAttributes/':40,
    'http://recommend.imutils.com/Buyerattributes/GetMcatRecomendation/':40,
    'http://recommend.imutils.com/Buyerattributes/GetBuyerData/':40,
    'http://company.imutils.com/wservce/company/detail/':40,
    'http://pdp.imutils.com/wservce/products/detail/':40,
    // 'http://recommend.imutils.com/UserAttributes/Getrelated/m/':5
    // 'http://recommend.imutils.com/Buyerattributes/GetCityRecomendation/glusrId/':5,
    // 'http://pdp.imutils.com/wservce/products/detail/' :5,
   'http://impcat.imutils.com/wservce/im/category/':40,
   'http://impcat.imutils.com/wservce/Products/standardproduct/':40,
   'http://impcat.imutils.com/wservce/products/citymcats/':40,
   'http://impcat.imutils.com/wservce/products/McatVideoListing':40,
   'http://impcat.imutils.com/wservce/products/listing/':40,
   'http://leads.imutils.com/wservce/buyleads/display/':40,
    'http://leads.imutils.com/wservce/buyleads/shortlisted/':40,
    'http://leads.imutils.com/wservce/buyleads/group/':40,
    'http://leads.imutils.com/wservce/buyleads/category/':40,
    'http://leads.imutils.com/wservce/leads/defaultdisplay/token/imobile1@15061981/modid/IMOB/offerType/':40,
    'http://leads.imutils.com/wservce/leads/notinterested/':40,
    'http://leads.imutils.com/wservce/buyleads/related_buyleads/':40,
    'http://leads.imutils.com/wservce/tenders/group/?token=imobile1@15061981&modid=TDR' :40,
    'http://leads.imutils.com/wservce/tenders/cat/':40,
    'http://leads.imutils.com/wservce/buyleads/mcat_listing/':40,
    'http://leads.imutils.com/wservce/buyleads/Purchase/':40,
    'http://leads.imutils.com/wservce/leads/markfav/':40,
    'http://leads.imutils.com/wservce/users/credit/':40,
    'http://leads.imutils.com//wservce/buyleads/detail/':40,
    'http://leads.imutils.com/wservce/rfq/display/':40,
    'http://leads.imutils.com/wservce/buyleads/delete/':40,
    'http://leads.imutils.com/wservce/rfq/add/':40,
    'http://leads.imutils.com/wservce/buyleads/getISQ/':40,
    'http://leads.imutils.com/wservce/leads/blsetisq/':40,
    'http://leads.imutils.com/wservce/buyleads/question_template/':40,
    'http://bizfeed.imutils.com/MyActivity/Getactivitystatus/':40,
    'http://users.imutils.com/wservce/LatlongToAddress/AddressFields/':40,
    'http://users.imutils.com/wservce/users/seller/':40,
    'http://users.imutils.com/wservce/enquiry/index.php/enquiry/getUserLoc/':40,
    'http://users.imutils.com/wservce/products/add/':40,
    'http://users.imutils.com/wservce/users/supplierrating/':40,
    'http://users.imutils.com/wservce/users/getinfluparams/':40,
    'http://users.imutils.com/wservce/im/localityPincode/':40,
    'http://users.imutils.com/wservce/users/MiniDetail/':40,
    'http://users.imutils.com/wservce/users/buyerprofile/':40

}

function getThreshold(domain) {
    if ((process.env.NODE_ENV_M == 'prod') || (typeof (process.env.NODE_ENV_M) == 'undefined')) {
        return thresholdCounter_PROD_ENV[domain];
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        return thresholdCounter_STG_ENV[domain];
    }
    else {
        return thresholdCounter_DEV_ENV[domain];
    }
}
module.exports = getThreshold;