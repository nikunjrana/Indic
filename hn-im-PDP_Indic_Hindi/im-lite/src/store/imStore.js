import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imReducer from "../reducer";

const promiseMiddleware = (store) => (next) => (action) => {
  if (typeof action !== "function") {
    return next(action);
  }

  return next(action);
};

export const PWAAppState = () => {
    return (
        { get_relatedproducts: {}, hasMoreFolders: true, isFetchingFolders: false, desktopLink: '', prodError: false, authenticated: false, enquiries: [], hasMoreItems: true, isFetching: false, updateMessage: '', myProducts: [], wfobpCount: false, isFetchingMyProducts: false, hasMoreMyProducts: true, myWFOBProducts: [], folders: '', prodDetail: [], catData: {}, isUploadingImage: false, imageData: {}, imageUploaded: false, updatedItemId: false, itemUpdatedMyProduct: [], start: 0, end: 20, pageType: 'All', enqType: 'A', folderValue: 1, buyleads: [], hasMoreBuyleads: true, isFetchingBuyleads: true, offerData: [], purchaseCreditResult: [], orderId: [], loc_count: [], listing_val: {}, blstart: 0, blend: 10, leadCount: 0, lead_purchase: [], blPageType: 0, offerDataExists: false, expired: false, suggested: [], requesting: true, enqError: false, returnCC: "IN", success: false, purchase: false, decodePackageBuyResp: '', blpopState: true, refresh: false, expiredShortlist: 0, searchlist: [], searchstart: 0, objBl: {}, searchData: {}, searchend: 0, tabValue: "", isFetchingSearch: false, isloadedSearch: false, hasMoreSearch: true, get_products: [], searchsuggested: [], get_recentsearches: [], premium_brands: [], products_loading: false, searches_loading: false, country_ip: [], country_iso: [], country_name: 'IN', message_listing: {}, messages: [], isloadedList: false, isFetchingMessages: false, hasMoreMessages: true, from: 0, to: 30, message_Detail: [], isFetchingmsgdetail: true, subgroups: [], src: '', total_count: 0, blSearchSuggested: [], blSearchKwd: '', expired_leads_count: 0, ofr_type: '', markstatus: 0, purchaseIndex: '', similarleads: '', SimilarIndex: '', blfilterSuggestions: {}, mcatBrowse: '', TrendingBL: '', shorturl: '', forceLogin: false, markOffer: '', offerFlag: '', sBlPosUrl: '', sIndex: '', scrollPos: '', selectionType: '', errorBL: false, blCatError: false, blOfferError: false, crumbData: {}, payxResponse: '', blToastData: '', purchaseData: '', mailPurBLData: {}, NIofferType: '', blResponseCode: '', get_recentrelatedmcats: [], results_loading: false, getbrands: true, get_latestenqbls: '', updatebrands: false, updatecats: false, updateprods: false, voicedata: [], hitCount: 0, get_dashboard_data: false, pbr_data: '', tenders: [], miniPdpData: [], blPageLoc: '', citySearch: '', shrtBLCnt: 0, stdproducts: [], pdp404: false, srchFrstFold: false, gaSearchData: {}, msgFrstFold: false, userRating: 0, ratingFetched: false, ratingStatus: false, avgRating: 0, lastSeen: {}, lastSeenStatus: false, isRatingDisplay: false, imgUpldErr: false, imgUpldErrReason:'',dir_category: '', grp_category: '', sub_category: '', subcats: '', flname: '', sname: '', dirError: false, grpError: false, scatError: false, status: "", listdata: [], mbrdetails: [], mbrdeleteResp: [], mbrdeleteErr: '', needSuppResp: [], mbrReqStatus: '', loadResults: false, avgRatingFetched: false, mcat_long_name: '', searchEngagement: '', recommendedMcat: '', recommendedData: '',recommendedDataNew: '', recommendedDatamore:'',CAPsData:'',selectedCityInFilter: '', cityListInFilter: '', metaKeywords:'',err: '', displayCallNow:false, purchasedValue: '' ,blMailData: {},pageError:'',isWType: false,isBType: false,last_transaction_id:'',last_transaction_refid:'', isDisplayRating: false, productSuggestions: [], searchErrorCode:"", nameTC:"", cityTC:"", isqData:'',productName:"", existing:"", screenName:"" ,deleteStatus:2, otpsent:false,offerId:'', queryDestination:'', emailVerify1:'',toggleFlag:true, loginErr : '',otpErr:'', screen : "",niLeads:[],ratingType:'',imgId: [], ratingImage:[],ratingImageOrg: [], ratingImage500: [],companyCatIndex: [],truecallerLogin:false
    ,mblIsqData:'',mblScreen:"",mcatId:"", unreadStart: 0, unreadEnd: 20, hasMoreUnreadMsg: true, toggleState: false, handleCitySelect: '',payMsgData:'',c2c_ID:'',XmppCompanyList:[],starList:false,replySentCom:[],bubbleLoader:false,replyText:[],iciciUserdata:'',xmppAlert:false,unreadCount:0, BLBanner : ''});
    }

let initialState = PWAAppState();

if (typeof window !== "undefined" && window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__;
}

export const imStore = createStore(
  imReducer,
  initialState,
  applyMiddleware(promiseMiddleware, thunk)
);
