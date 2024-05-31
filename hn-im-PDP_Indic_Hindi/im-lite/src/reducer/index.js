import { getQueryStringValue, removeEnqStyletagspdp, removeEnqStyletags, getUrlVars } from "../Globals/MainFunctions";
import { gaTrack } from '../Globals/GaTracking';
import { setCookie, getCookie, getCookieValByKey } from '../Globals/CookieManager'; 
export const imReducer = (state, action) => {
    switch (action.type) {

        //***************Group************        
        case 'GET_GRP_CAT':
            var res = {
                ...state, ...{
                    grp_category: action.result.scats,
                    flname: action.flname,
                    grpError: false,
                    status: action.status
                }

            }
            return res;
        case 'GET_GRP_CAT_FAIL':
            if (!action.success) {
                return {
                    ...state, ...{
                        grpError: true,
                        status: action.status,
                        flname: action.flname
                    }
                };
            }
        //****************SUBCAT********************//
        case 'REQUEST_SUB_CAT':
            var reqps = {
                ...state, ...{
                    loadResults: action.loadResults
                }
            }
            return reqps;
        case 'GET_SUB_CAT':
            var mcats, request_parts = location.pathname.split('/')[2];
            if (action.result.mcats) {
                if (state.subcats && state.sname == request_parts) {
                    mcats = state.subcats.concat(action.result.mcats.mcat);
                } else {
                    mcats = action.result.mcats.mcat;
                }
                var res = {
                    ...state, ...{
                        subcats: mcats,
                        sub_category: action.result.mcats,
                        sname: action.sname,
                        scatError: false,
                        loadResults: false
                    }

                }
                return res;
            }
        case 'GET_SUB_CAT_FAIL':
            if (!action.success) {
                return {
                    ...state, ...{
                        scatError: true,
                        status: action.status,
                        loadResults: false
                    }
                };
            }
// **************************************EnquiryBl
    case 'SET_SCREEN_NAME':
    var res={
        ...state,...{
            screenName:action.screenName
        }
    }
    return res;      
    case 'ENQBL_BL_SENT_SUCCESS':
    let blSent=false;
        if(action.success==true){
            
            blSent=true;
            
        }
        var res={
            ...state,...{
                offerId:action.result.ofr,
                blSent:blSent
                
            }
        }
    return res;  

    case 'ENQBL_ENQUIRY_SENT_SUCCESS':
    let enquirySent=false;
    if(action.success==true){
        
        enquirySent=true
    }
    var res={
        ...state,...{
            offerId:action.result.queryid,
            queryDestination:action.result.query_destination,
            enquirySent:enquirySent
            
        }
    }
    
    return res; 
    case 'ENQBL_INTENT_SENT_SUCCESS':
    let intentSent=false;
        
        if(action.success==true)
        intentSent=true;
        var res={
            ...state,...{
                intentSent:intentSent
            }
        }
    return res;
    case 'RESET_ONETAP_ENQ_DETAILS':
        var res={
            ...state,...{
                ofr_id:'',
                qDestination : ''
            }
        }
    return res;
    case 'RESET_Message_Screen_Val':
        var res={
            ...state,...{
                screen:''
            }
        }
        return res;
    case 'RESET_ONETAP_PROPS':
        var res={
            ...state,...{
                suggestiveReply: [],
                receivedSuggReply: false,
                screen:''
            }
        }
    return res;
    case 'FINISH_ENQ_SUCCESS':
        return ({ ...state, ...{finishEnq:true} })

    case 'GENERATE_ENQUIRY_RESPONSE':
        return ({ ...state, ...{ ofr_id: action.payload.response ? action.payload.response.queryid: '', qDestination: action.payload.response ? action.payload.response.query_destination: ''  } })  
    case 'SET_ISQ_RESPONSE':
        return ({ ...state, ...{setIsqHit:true,isAPiHit:true} })
    case 'IS_ISQ':
            return ({ ...state, ...{isIsq:action.payload} })
    case 'RESET_IS_ISQ':
                return ({ ...state, ...{isIsq:action.payload} })        
    case 'SET_IMEQGL':
        if(sessionStorage.getItem("forAds") && sessionStorage.getItem("forAds") == 'notconverted'){
            sessionStorage.setItem("forAds", "converted");
        }   
        let value=action.result ? action.result : action.payload ? action.payload : '' ;
        let imEqGlLS = {};
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        // let cookieData = getCookie('imEqGl');
        let cookieDataArray = new Array();
        let cookieDataStr = "";
        if (lsData) {
            let cookieData = lsData['displayId'];
            cookieDataArray = cookieData.split("|");
            if (cookieDataArray[0] == "undef") {
                cookieDataArray.pop()
            } else {
                if (cookieDataArray.length >= 30) {
                    cookieDataArray.pop()
                }
            }
            cookieDataArray.unshift(value);
            cookieDataStr = cookieDataArray.toString()
            
            imEqGlLS['displayId']=cookieDataStr;
            imEqGlLS['date']=lsData['date'];
        } else {
            let nextday=new Date();
            nextday.setHours(nextday.getHours() + 24);
            cookieDataStr = value;
            imEqGlLS['displayId']=cookieDataStr;
            imEqGlLS['date']=nextday;
        }
        localStorage.setItem("imEqGl", JSON.stringify(imEqGlLS));
        if(window.pageName == "Search-PWA"){
            let searchDivId = "search"+value;
            if(document.getElementById(searchDivId)&& document.getElementById(searchDivId).style ){
                document.getElementById(searchDivId).style.display="none"; 
                // document.getElementById(searchDivId).innerText="Enquiry Sent";
            }
            let srchCTADivId="#SrchCta"+value+'>span';
            if(document.querySelector(srchCTADivId)){
                document.querySelector(srchCTADivId).setAttribute('class',"bdrmim clrmim fl tc tst pdt10 w100 fs16 pdb10 fw bgmim bxrd20 srchM8")
                document.querySelector(srchCTADivId+'>i')?document.querySelector(srchCTADivId+'>i').setAttribute('class',"callIcnNAB mr5 dib vam objctFitSclDown"):''
                document.querySelector(srchCTADivId+'>span')?document.querySelector(srchCTADivId+'>span').setAttribute('class',"dib clrw"):''

            }
        }
        // setCookie(
        //     "imEqGl",
        //     cookieDataStr,
        //     "1"
        // );
        if(window.pageName == "Search-PWA"){
            let res={
                ...state,...{
                    srchEnquiryValue: "EnqSentSrchDN"+value
                }
            }
            return res;
        }
        return state;
    case 'SET_MBL':	
        let lsMbl = {};	
          let mblCookie = JSON.parse(localStorage.getItem("mBl"));	
          if (mblCookie && (mblCookie['date'] < (JSON.parse(JSON.stringify(new Date()))))) {	
              localStorage.removeItem("mBl");	
              mblCookie = "";	
          }	
         let mcatId=action.result.mcatId ? action.result.mcatId : '';	
         let offerId=action.result.offerId ? action.result.offerId :'';	
          let dt=new Date();	
          let curTimeStamp = dt.getTime();	
          let mblVal="offerId="+offerId+"&&mcatId="+mcatId+"&&timestamp="+curTimeStamp;	
            
          let mblCookieData = mblCookie && mblCookie != 'undefined' ? (mblCookie['data'] + '||' + (mblVal)) : (mblVal);	
          if (mblCookie) {	
            lsMbl['data'] = mblCookieData;	
            lsMbl['date'] = mblCookie['date'];	
          } else { 	
              let newDay = new Date();	
              newDay.setHours(newDay.getHours() + 24);	
              lsMbl['data'] = mblCookieData;	
              lsMbl['date'] = newDay;	
          }	
          // setting local storage mbl	
          localStorage.setItem("mBl", JSON.stringify(lsMbl));	
            
    case 'UPDATE_PRODUCT':
        var res={
            ...state,...{
                productName:action.productName
            }
        }
        return res;
    case 'GET_ISQ':
        let mcatid = action.quest.mcatId?action.quest.mcatId:'';
        window.isFetchingIsqDetails = false;
            var res={
                ...state,...{
                    isqData: action.quest,
                    screen: action.screen,
                    isqmcatId: mcatid
                }
            }
            return res;
        case 'GET_ISQ_FAIL':	
            var res={	
                ...state,...{	
                    screen: action.screen	
                }	
            }	
        return res;	
        case 'GET_ISQ_MBL':	
            let mcat = action.quest.mcatId?action.quest.mcatId:''	
            var res={	
                ...state,...{	
                    mblIsqData: action.quest,	
                    mblScreen: action.screen,	
                    mcatIdMbl: mcat	
                }	
            }	
            
            return res;
            case 'GET_ISQ_POPUP':
                var res={	
                    ...state,...{	
                        popupIsqData: action.quest,	
                    }	
                }	
            return res;
    case 'GET_USER_MINI_DETAIL':
            var res={  
                ...state,...{  
                    glusr_usr_companyname:action.result.Response.Data.glusr_usr_companyname,
                    IS_URL_AVAILABLE :action.result.Response.Data.IS_URL_AVAILABLE 
                }      
            }
            return res;
    case 'PINCODE_DATA_NOT_FOUND':
        var res={  
            ...state,...{  
                pincodeNotFound:true
            }      
        }
        return res;

    case 'REQUEST_CANCEL':
        var res={
            ...state,...{
                reqCancel:true
            }
        }
        return res;
    case 'UPDATE_USER_CANCEL':
        var res={
            ...state,...{
                userupdateCancel:true
            }
        }
        return res;
        
    case 'GET_INFLU_PARAM':
        var res = action.response;        
        var influParam=''
        if(res.Response.Code == 200 && res.Response.Data){
            influParam= res.Response.Data
        }
        var updatedState={ ...state, ...{
            influParam: influParam,
            }
        }
        return updatedState;
    case 'GET_REASON' :
        var res={
            ...state,...{
                deleteReason:action.result.Response
            }
        }
        return res;
    case 'BL_DELETE' :
        let deleteStatus;
        if(action.success==true && action.result.RESPONSE.MESSAGE=='SUCCESS'){
            deleteStatus=1;
        }    
        else{
            deleteStatus=0;
        }
        var res={
            ...state,...{
                deleteStatus:deleteStatus
            }
        }
        return res;
    case 'RESET_BLDELETE_Val':
            return {
                ...state, ...{
                    deleteStatus:2
                        }
                    };
    case 'BlOCKED_LOGIN':
            var res={
                ...state,...{
                    blockedUser:true,
                    mobileNumber:action.mobileNumber
                }
            }
            return res;

    case 'UPDATE_NAME_USER' :
        var res={
            ...state,...{
                nameUpdate:action.result.Response
            }
        }
        return res;


         /** *********************************************** **/
        /* END for ENQUIRYBL Module **   */
        /** *********************************************** **/
        // case 'GET_REASON_FAIL' :
        /** *********************************************** **/
        /* Start for Buyleads Module **   */
        /** *********************************************** **/

        case 'GET_DIR_CAT':
            var res = {
                ...state, ...{
                    dir_category: action.result.grps,
                    dirError: false
                }
            }
            return res;
        case 'GET_DIR_CAT_FAIL':
            if (!action.success) {
                return {
                    ...state, ...{
                        dirError: true,
                        status: "503"
                    }
                };
            }

        case 'DECODE_PAYX_RESPONSE':
            if (action.success) {
                return {
                    ...state, ...{
                        payxResponse: action.resp
                    }
                }
            }
            else {
                return state
            }
        case 'SHORT_URL':
            return {
                ...state, ...{
                    shorturl: action.shorturl
                }
            }
        case 'TRENDING_BL':
            if (action.success) {
                if (action.src == "tenderUn") {
                    return {
                        ...state, ...{
                            buyleads: action.TrendingBL,
                            hasMoreBuyleads: false,
                            src: 'TrendingBLUndef'

                        }
                    }
                }
                else if (action.src == "tendersForBuyer") {
                    let bls = [];
                    bls = UniqueBls(state.buyleads.concat(action.TrendingBL));
                    return {
                        ...state, ...{
                            buyleads: bls,
                            hasMoreBuyleads: false,
                            src: 'tendersForBuyer'

                        }
                    }
                }
                else {
                    return {
                        ...state, ...{
                            TrendingBL: action.TrendingBL
                        }
                    }
                }
            }
            return state;
            
         case 'CLEAR_LEADS': 
            return {
                ...state,...{
                    similarleads: '',
                }
            }
          
        case 'SIMILAR_LEADS':
            if (!action.success)//server failed to retrieve data
            {
                if (state.searchFrom == "tenders" || state.src == "tenders") {
                    return {
                        ...state, ...{
                            similarleads: 'fail',
                            blToastData: 'Currently no Similar Tenders',
                        }
                    }
                } else {
                    return {
                        ...state, ...{
                            similarleads: 'fail',
                            blToastData: 'Currently no Similar Leads',
                        }
                    }
                }
            }
            else {
                let similarList = action.srchbls.DisplayList ? action.srchbls.DisplayList : [];
                similarList = similarList.filter(function (obj) {
                    return obj['ETO_OFR_ID'] !== action.smlrOfferId;
                });
                if (similarList.length > 0) {
                    return {
                        ...state, ...{
                            similarleads: similarList,
                            SimilarIndex: action.SimilarIndex
                        }
                    }
                }
                else {
                    if (state.searchFrom == "tenders" || state.src == "tenders") {
                        return {
                            ...state, ...{
                                similarleads: 'fail',
                                blToastData: 'Currently no Similar Tenders'
                            }
                        }
                    } else {
                        return {
                            ...state, ...{
                                similarleads: 'fail',
                                blToastData: 'Currently no Similar Leads'
                            }
                        }
                    }
                }
            }
        case 'PACKAGE_REQUEST':

            return {
                ...state, ...{
                    ofr_type: action.ofr_type
                }
            };
           case 'CLOSE_POPUP' : 
            return {
             ...state, ...{
                purchasedValue: ''
             }

            }; 
        case 'BUY_MAIL' :
            var data = {};
             data.buyerId =  action.buyerId;
             data.mobNo = action.phNo;
             data.cCode = action.cCode;
             data.offerId = action.offerId;
             data.offerName = action.offerName;
          return {
              ...state, ...{
                 purchasedValue : 'success',
                 blMailData : data 
              }
          }   
        case 'PURCHASE_REQUEST':

            if (action.success == true) {
                var index = action.purchaseIndex;
                var purchaseData;
                var buyleads = state.buyleads;
                if (state.buyleads.length > 0) {
                    buyleads[index].purchaseData = action.purchasedOfferData;
                    purchaseData = '';
                }
                else {
                    purchaseData = action.purchasedOfferData;
                }
                return {
                    ...state, ...{
                        ofr_type: action.ofr_type,
                        blResponseCode: 200,
                        purchaseIndex: index,
                        buyleads: buyleads,
                        purchaseData: purchaseData

                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        // blToastData:action.status.replace(/<(?:.|\n)*?>/gm, '')
                        blToastData: '',
                        msgFailed: action.status,
                    }
                };
            }

        case 'RECEIVE_FAV':
            var buyleads = state.buyleads;
            if (action.flag != 'D') {
                buyleads[action.index]['SHORTLISTED'] = 'YES';
                buyleads[action.index]['SHORTLIST_STATUS'] = 'LikeIt';
            }
            else {
                buyleads[action.index]['SHORTLISTED'] = 'YES';
                buyleads[action.index]['SHORTLIST_STATUS'] = 'NO';
                if (action.source == "wishlist" || action.source == "wishlistE")
                    buyleads = buyleads.filter(function (obj) {
                        return obj['ETO_OFR_ID'] !== action.ofr;
                    });
            }

            return {
                ...state, ...{
                    buyleads: buyleads,
                    markstatus: !state.markstatus

                }
            };

        case 'EMPTY_BUYLEAD':
            let newState = {};
            if (typeof action.src == "object") {
                newState = {
                    buyleads: [],
                    blSearchKwd: action.src.srchVal,
                    hasMoreBuyleads: true,
                    similarleads: '',
                    SimilarIndex: '',
                    errorBL: false,
                    shrtBLCnt: 0
                }
            }
            else {
                newState = {
                    buyleads: [],
                    hasMoreBuyleads: true,
                    src: action.src,
                    similarleads: '',
                    SimilarIndex: '',
                    errorBL: false,
                    shrtBLCnt: 0
                }
            }
            return { ...state, ...newState };


        case 'RECEIVE_SHORTLISTED_BUYLEADS':
            var buyleadData = action.buyleads;
            if (action.success) {
                var hasMoreBuyleads, updata, expired_leads_count;
                var totalBuylead = buyleadData["TotalBuylead"];
                if (buyleadData.hasOwnProperty('DisplayList') && buyleadData['DisplayList'].length > 0) {
                    var buyLeadList = buyleadData.DisplayList;
                    buyLeadList = buyLeadList.filter(function (obj) {
                        return obj['SHORTLIST_STATUS'] !== "NO";
                    });
                    updatedArray = typeof state.buyleads != 'undefined' && (state.buyleads).concat(buyLeadList);

                    hasMoreBuyleads = !buyleadData.hasOwnProperty(["TotalBuylead"]) ? true : (state.shrtBLCnt + 25) < Number(totalBuylead);

                }
                else {
                    totalBuylead = 0;
                    updatedArray = state.buyleads;
                    hasMoreBuyleads = false;
                }
                if (updatedArray.length == 0) {

                    updata = {
                        ...state, ...{
                            errorBL: true
                        }
                    };
                }
                else {
                    updata = {
                        ...state, ...{
                            buyleads: UniqueBls(updatedArray),
                            blResponseCode: 200,
                            shrtBLCnt: state.shrtBLCnt + 25,
                            hasMoreBuyleads: hasMoreBuyleads,
                            src: action.source,
                            total_count: totalBuylead,
                            expired_leads_count: expired_leads_count,
                            blPageLoc: buyleadData.blPageLoc ? buyleadData.blPageLoc : ''
                        }
                    };
                }
            }
            else {
                updata = {
                    ...state, ...{
                        buyleads: [],
                        hasMoreBuyleads: false,
                        success: 0,
                        src: action.source
                    }
                };
            }
            return updata;



        case 'RECEIVE_BUYLEADS':
            var buyleadData = action.buyleads;
            if (action.success) {
                var hasMoreBuyleads, updata, expired_leads_count;
                var totalBuylead = buyleadData["TotalBuylead"];
                if (buyleadData.hasOwnProperty('DisplayList') && buyleadData['DisplayList'].length > 0) {
                    var buyLeadList = buyleadData.DisplayList;
                    if (action.expiredOrActive) {
                        buyLeadList = buyLeadList.filter(function (obj) {
                            return obj['SHORTLIST_STATUS'] !== "NO";
                        });
                        if (buyLeadList.length) {
                            buyLeadList.forEach(function (element) {
                                if (element['expiryStatus'] != 'N')
                                    element['expiryStatus'] = action.expiredOrActive;
                            });
                        }

                    }
                    updatedArray = typeof state.buyleads != 'undefined' && (state.buyleads).concat(buyLeadList);

                    hasMoreBuyleads = !buyleadData.hasOwnProperty(["TotalBuylead"]) ? true : updatedArray.length < totalBuylead;


                    if (action.source == "wishlistE") {
                        expired_leads_count = state.expired_leads_count + buyleadData.DisplayList.length;
                    }
                    else {
                        expired_leads_count = 0;
                    }


                }
                else {
                    totalBuylead = 0;
                    updatedArray = state.buyleads;
                    hasMoreBuyleads = false;
                }
                //get suggested cities and countries
                let blfSuggestions = {};
                blfSuggestions = { cities: buyleadData['cities'], countries: buyleadData['countries'], categories: buyleadData['Categories'], orderValue: buyleadData['OrderValue']}
                if (state.blfilterSuggestions['categories'])
                    blfSuggestions['categories'] = (Object.keys(state.blfilterSuggestions['categories']).length > Object.keys(blfSuggestions['categories']).length ? state.blfilterSuggestions['categories'] : blfSuggestions['categories']);
                if (action.locpref != 3 && state.blfilterSuggestions['cities']) {
                    blfSuggestions['cities'] = Object.keys(state.blfilterSuggestions['cities']).length > Object.keys(blfSuggestions['cities']).length ? state.blfilterSuggestions['cities'] : blfSuggestions['cities'];
                }
                else if (action.locpref == 3 && state.blfilterSuggestions['countries']) {
                    blfSuggestions['countries'] = Object.keys(state.blfilterSuggestions['countries']).length > Object.keys(blfSuggestions['countries']).length ? state.blfilterSuggestions['countries'] : blfSuggestions['countries'];
                }
                updata = {
                    ...state, ...{
                        buyleads: UniqueBls(updatedArray),
                        blResponseCode: 200,
                        blfilterSuggestions: blfSuggestions,
                        hasMoreBuyleads: hasMoreBuyleads,
                        src: action.source,
                        total_count: totalBuylead,
                        expired_leads_count: expired_leads_count,
                        blPageLoc: buyleadData.blPageLoc ? buyleadData.blPageLoc : ''
                    }
                };
            }
            else {
                updata = {
                    ...state, ...{
                        buyleads: [],
                        hasMoreBuyleads: false,
                        success: 0,
                        src: action.source
                    }
                };
            }
            return updata;

        case 'BL_MARK_NOT_INTERESTED':
            if (action && action.result && action.result.CODE == 200) {
                let bls = [];
                let empty = false;
                bls = state.buyleads;
                // bls = bls.filter(function (obj) {
                //     return obj['ETO_OFR_ID'] !== action.offer;
                // });
                let niLeads = [...state.niLeads];
                niLeads.push(action.offer);
                if (bls.length == 0) {
                    empty = true;
                }
                return {
                    ...state, ...{
                        buyleads: bls,
                        errorBL: empty,
                        niLeads: niLeads
                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        blToastData: action.result['MESSAGE']
                    }
                };
            }

        case 'RECEIVE_SUBGROUP_LEADS':
            if (action.success) {
                return {
                    ...state, ...{
                        buyleads: UniqueBls(state.buyleads.concat(action.sub_group_bls)),
                        src: action.source,
                        hasMoreBuyleads: true
                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        hasMoreBuyleads: false
                    }
                };
            }


        case 'RECEIVE_SUBCAT_LEADS':
            return {
                ...state, ...{
                    buyleads: UniqueBls(state.buyleads.concat(action.subcat_bls)),
                    src: action.source,
                    hasMoreBuyleads: false
                }
            };
        case 'RECEIVE_MCAT_LEADS':
            {
                return {
                    ...state, ...{
                        buyleads: UniqueBls(state.buyleads.concat(action.mcatBls.DisplayList)),
                        src: action.source,
                        hasMoreBuyleads: action.mcatBls.hasMoreBuyleads
                    }
                };
            }
        case 'MARK_CONTACT':
            return{
                ...state, ...{
                    messages:action.data,
                    markStar:!state.markStar
                }
            };    
        case 'STAR_LISTING':
            return{
                ...state,...{
                    starList:!state.starList
                }
            }    
        case 'REQUEST_UNREAD_LIST':
            return {
                ...state, ...{
                    hasUnreadMsg: true,
                }
            };
        case 'RECEIVE_UNREAD_LIST':
                var res;
                var updatedArray =[]
                if(state.messageUnreadList && state.messageUnreadList.length>0){
                    updatedArray = state.messageUnreadList
                }
                res= (action.response) ? action.response : ''
                if (res && Array.isArray(action.response.result) ){
                    updatedArray = (updatedArray).concat(action.response.result)
                }            
                else {
                    updatedArray: [];
                }            
                return {
                    ...state, ...{
                        messageUnreadList: updatedArray,
                        hasUnreadMsg: false,
                        hasMoreUnreadMsg: (res && res.hasOwnProperty('result')) ? (res.result.length > 0 && res.result.length == 20 && res.code !=204) ? true : false : "",
                        unreadStart: state.unreadEnd + 1,
                        unreadEnd: state.unreadEnd + 20
                    }
                };
        case 'RECEIVE_UNREAD_LIST_NEW':
            return {
                ...state, ...{
                    messageUnreadList: action.new_list,
                }
            };    
        case 'EMPTY_UNREAD_LIST':    
            return {
                ...state, ...{
                    messageUnreadList: '',
                    unreadStart : 0,
                    unreadEnd : 20
                }
            };         
        case 'UPDATE_UNREAD_MSG_COUNT':
            {
                return ({ ...state, ...{ messages: action.payload } })
            }
        case 'SET_MSG_SCROLL_POSITION': 
            {
                return ({...state, ...{msgScrollposition: action.payload}})
            }
        case 'RECEIVE_INDUSTRY_TENDERS': {
            if (action.success) {
                return {
                    ...state, ...{
                        buyleads: UniqueBls(state.buyleads.concat(action.bls)),
                        //src: action.source,
                        hasMoreBuyleads: true
                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        //src: action.source,
                        hasMoreBuyleads: false
                    }
                }
            }

        }


        case 'SET_BL_TOAST':
            return {
                ...state, ...{
                    blToastData: action.msg
                }
            };

        case 'RESET_MSG_FAIL':
            return {
                ...state, ...{
                    msgFailed: ''
                }
            };

        case 'BL_PAGE_ERROR':
            if (!action.success && (state.buyleads.length == 0)) {
                return {
                    ...state, ...{
                        errorBL: true
                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        errorBL: false,
                        blCatError: false,
                        blOfferError: false,
                        hasMoreBuyleads: false
                    }
                };
            }


        case 'NO_MORE_BLS':
            return {
                ...state, ...{
                    hasMoreBuyleads: false
                }
            }

        case 'BL_SEARCH_SUGGESTIONS':
            return {
                ...state, ...{
                    blSearchSuggested: action.suggestionData.product
                }
            }
        
        case 'BUYLEAD_RELATED_MCAT':
            return {
                ...state, ...{
                    blrelatedmcats: '',
                }
            }

        case 'RECEIVE_BUYLEAD_RELATED_MCAT':
            if(action.success){
                return {
                    ...state, ...{
                        blrelatedmcats: action.response && action.response.DATA ? action.response.DATA : '',
                    }
                }
            }

        case 'RECEIVE_RELATEDBLS':
            var tenders = state.tenders;
            if (action.success) {
                if (action.relatedbls && action.relatedbls['status'] == 'failed')//server failed to retreive data
                {
                    return {
                        ...state, ...{
                            buyleads: [],
                            hasMoreBuyleads: false,
                            relatedBLHeadSplit: {}
                        }
                    }
                }
                else {
                    var bls = [];
                    bls = UniqueBls(state.buyleads.concat(action.relatedbls.DisplayList));

                    return {
                        ...state, ...{
                            buyleads: bls,
                            hasMoreBuyleads: false,
                            isFetchingBuyleads: true,
                            errorBL: false,
                            blCatError: false,
                            blOfferError: false,
                            relatedBLHeadSplit: action.relatedbls.relatedBLHeadSplit,
                        }
                    }
                }
            }



        case 'RECEIVE_SRCHBLS':
            var tenders = state.tenders;
            if (action.success) {
                if (action.srchbls && action.srchbls['status'] == 'failed')//server failed to retreive data
                {
                    return {
                        ...state, ...{
                            buyleads: [],
                            hasMoreBuyleads: false,
                            blSearchKwd: ''
                        }
                    }
                }
                else {
                    //get suggested cities and countries
                    let blfSuggestions = {}, searchFrom = '';
                    if (state.searchFrom && state.searchFrom == 'tenders') {
                        blfSuggestions = { cities: action.srchbls['cities'], categories: action.srchbls['categories'] }
                        searchFrom = "tenders"
                    }
                    else {
                        if (!(action.blCountry || action.blState || action.blCity || action.blNearCity || action.blCategory || action.Locpref)) {
                            blfSuggestions['cities'] = action.srchbls['cities'];
                            blfSuggestions['countries'] = action.srchbls['countries'];
                            blfSuggestions['categories'] = action.srchbls['categories'];

                        }
                        else
                            blfSuggestions = state.blfilterSuggestions;
                    }
                    var bls = [];
                    bls = UniqueBls(state.buyleads.concat(action.srchbls.DisplayList));
                    var hasMoreBuyleads = bls.length < action.srchbls.TotalBuyleads && bls.length > 0;
                    if (action.src == "tender") {
                        tenders = action.srchbls.DisplayList;
                        hasMoreBuyleads = state.hasMoreBuyleads
                    }

                    return {
                        ...state, ...{
                            buyleads: bls,
                            blSearchKwd: action.searchKwd,
                            hasMoreBuyleads: hasMoreBuyleads,
                            blfilterSuggestions: blfSuggestions,
                            isFetchingBuyleads: true,
                            errorBL: false,
                            blCatError: false,
                            blOfferError: false,
                            tenders: tenders,
                            searchFrom: searchFrom,
                            blCountry: action.blCountry,
                            blState: action.blState,
                            blCity: action.blCity,
                            blNearCity: action.blNearCity,
                            blCategory: action.blCategory,
                            Locpref: action.Locpref
                        }
                    }
                }
            }
            else {
                if (action.src == "tender") {
                    return {
                        ...state, ...{
                            tenders: 'fail',
                        }
                    }
                }

            }
        case 'RECEIVE_SRCHTNDRS':
            if (action.srchbls && action.srchbls['status'] == 'failed')//server failed to retreive data
            {
                return {
                    ...state, ...{
                        buyleads: [],
                        hasMoreBuyleads: false,
                        blSearchKwd: '',
                        errorBL: true
                    }
                }
            }
            //saloni
            if (action.srchbls && action.srchbls['status'] == 'empty')//server failed to retreive data
            {
                return {
                    ...state, ...{
                        buyleads: [],
                        hasMoreBuyleads: false,
                        stateName: '',
                        authorityName: '',
                        errorBL: true
                    }
                }
            }
            //saloni
            else {
                //get suggested cities and countries
                let blfSuggestions = {};
                if (action.srchbls.states) {
                    blfSuggestions['states'] = action.srchbls.states;
                }
                blfSuggestions['cities'] = action.srchbls.cities;
                blfSuggestions['categories'] = action.srchbls.categories;
                var bls = [];
                bls = UniqueBls(state.buyleads.concat(action.srchbls.DisplayList));
                return {
                    ...state, ...{
                        buyleads: bls,
                        hasMoreBuyleads: bls.length < action.srchbls.TotalBuyleads && bls.length > 0,
                        blfilterSuggestions: blfSuggestions,
                        isFetchingBuyleads: true,
                        errorBL: false,
                        blCatError: false,
                        blOfferError: false,
                        src: 'tendersStateAuth',
                        searchFrom: "tenders"
                    }
                }
            }

        case 'RECEIVE_GROUP_BLS':
            return {
                ...state, ...{
                    buyleads: action.buyleads,
                    hasMoreBuyleads: false
                }
            };

        case 'SET_BL_DATA':
            return {
                ...state, ...{
                    markOffer: action.markOffer,
                    offerFlag: action.offerFlag,
                    sBlPosUrl: action.sBlPosUrl,
                    sIndex: action.sIndex,
                    scrollPos: action.scrollPos,
                    selectionType: action.selectionType,
                    NIofferType: action.NIofferType
                }
            };


        /** *********************************************** **/
        /* Start for Enquiries Module **   */
        /** *********************************************** **/

        case 'REQUEST_ENQUIRIES':
            action.updateMessage = state.updateMessage;
            if (state.folderValue != action.folderValue || state.enqType != action.enqType) {
                action.enquiries = [];
                action.updateMessage = false;
            }
            return { ...state, ...action };

        case 'RECEIVE_ENQUIRIES':
            var updatedArray, start, end;
            if (action.success) {
                if (state.pageType != action.pageType) {
                    updatedArray = action.enquiries;
                    start = action.end + 1;
                    end = action.end + 20;
                } else {
                    updatedArray = (state.enquiries).concat(action.enquiries);
                    start = state.end + 1;
                    end = state.end + 20;
                }
                return {
                    ...state, ...{
                        pageType: action.pageType,
                        enquiries: updatedArray,
                        isFetching: false,
                        isloaded: false,
                        start: start,
                        end: end,
                        enquirydetail: [],
                        enqType: action.enqType,
                        folderValue: action.folderValue,
                        hasMoreItems: updatedArray.length > 0 ? (updatedArray.length < updatedArray[0]["TOTAL_COUNT"]) : false,
                        enqError: false,
                    }
                };
            } else {
                return {
                    ...state, ...{
                        enquiries: [],
                        isFetching: false,
                        isloaded: false,
                        enquirydetail: [],
                        hasMoreItems: false,
                        enqError: action.error
                    }
                };
            }

        case 'REQUEST_SEND_REPLY':
            return { ...state, ...action };
            break;

        case 'RESPONSE_SEND_REPLY':
            var date = new Date();
            date = date.toString();
            var replyObj = {
                "SUBJECT": action.subject,
                "FK_GLUSR_USR_RECEIVER_ID": action.rGlid,
                "FK_GLUSR_USR_SENDER_ID": action.sGlid,
                "MESSAGE": action.msg,
                "DIR_QUERY_REPLY_SEQUENCE": state.enquirydetail.length + 1,
                "DIR_QUERY_REPLY_ID": action.queryId,
                "DATE_RE": date, "SENDERNAME": action.sName,
                "SENDER_EMAIL": action.sEmail,
                "R_NAME": action.rName,
                "REC_EMAIL": action.rEmail,
                "ATTACHMENT1": action.filename,
                "ATTACHMENT2": null,
                "ATTACHMENT3": null,
                "ATTACHMENT4": null,
                "SIZE1": null,
                "SIZE2": null,
                "SIZE3": null,
                "SIZE4": null,
                "FK_IIL_RFQ_QUOTATION_ID": null,
                "READ_STATUS": "0",
                "ToEmailID": action.rEmail
            };
            var updatedDetail = state.enquirydetail.concat(replyObj);
            var updatedState = {
                ...state, ...{
                    enquirydetail: updatedDetail,
                    isReplySent: true,
                    isloaded: true,
                    imageData: {},
                    imageUploaded: false,
                    isUploadingImage: false,
                }
            };
            if (document.getElementsByClassName('eqMe b-dot')[0]) document.getElementsByClassName('eqMe b-dot')[0].remove();
            return updatedState;

        case 'REQUEST_ENQUIRY_DETAIL':
            return {
                ...state, ...{
                    enquiries: [],
                    isFetching: true,
                    isloaded: false,
                    start: 0,
                    end: 20,
                    enquirydetail: [],
                    hasMoreItems: true,
                    imageUploaded: false,
                    imageData: {},
                    isUploadingImage: false,
                    updateMessage: false
                }
            };
            break;

        case 'RECEIVE_ENQUIRY_DETAIL':
            if (action.success) {
                if (!Array.isArray(action.enquirydetail)) {
                    return {
                        ...state, ...{
                            isloaded: false,
                            enqError: { status: '404' },
                            updateMessage: false,
                            isFetching: false,
                            start: 0, end: 20
                        }
                    };
                }
                return {
                    ...state, ...{
                        enquirydetail: action.enquirydetail,
                        isloaded: true,
                        updateMessage: false,
                        isFetching: false,
                        start: 0, end: 20
                    }
                };
            }
            else {
                return {
                    ...state, ...{
                        isloaded: false,
                        enqError: action.error,
                        updateMessage: false,
                        isFetching: false,
                        start: 0, end: 20
                    }
                };
            }



        case 'REQUEST_SAVE_QRF_FEEDBACK':
            return { ...state, ...action };
            break;

        case 'RECEIVE_SAVE_QRF_FEEDBACK':
            return {
                ...state, ...{
                    Feedback_Id: action.response.Response.Feedback_Id
                }
            };
        /* START..........TO FETCH USER'S FOLDERS FOR ENQUIRY */


        /* START..........TO FETCH USER'S FOLDERS FOR ENQUIRY */
        case 'REQUEST_FOLDER':
            return { ...state, ...action };

        case 'RECEIVE_FOLDER':
            var folder = action.folders;
            var updatedFolders = [];
            folder.map(function (b) {
                let c = { "Name": b.GL_USR_MAIL_FOLDER_NAME, "Value": b.GL_USR_MAIL_FOLDER_ID };
                updatedFolders.push(c);
            });
            return {
                ...state, ...{
                    folders: (state.folders).concat(updatedFolders),
                    isFetchingFolders: false,
                    hasMoreFolders: false,
                }
            };

        case 'REQUEST_FILE_UPLOAD':
            var reqps = { ...state, ...action };
            return reqps;
        case 'RECIEVE_FILE_UPLOAD':
            var data = {},
                fileUploaded;
            if (action.result) {
                data = action.result,
                    fileUploaded;
                if (data.hasOwnProperty('CODE') && data.CODE == 200) {
                    fileUploaded = true;
                    gaTrack.trackEvent(["Enquiry-Detail-PWA", "Attachment-Success", '', 0, true]);
                } else if (data.hasOwnProperty('eno')) {
                    fileUploaded = false;
                }
            } else if (action.success == false) {
                data["eno"] = 1;
                fileUploaded = false;
            }
            var imageData = {
                ...state, ...{
                    imageData: data,
                    imageUploaded: fileUploaded,
                    isUploadingImage: false
                }
            };
            return imageData;
        /* END..........TO FETCH USER'S FOLDERS FOR ENQUIRY */
        case 'REQUEST_MOVE_TO_FOLDER':
            var reqps = { ...state, ...action };
            return reqps;

        case 'RECIEVE_MOVE_TO_FOLDER':
            var response = action.result,
                reqps;
            if (action.success && response.status == "Success") {
                reqps = {
                    ...state, ...{
                        isFetching: false,
                        updateMessage: "Moved to " + action.foldername,
                        hasMoreItems: true,
                        enquiries: [],
                        start: 0,
                        end: 20,
                    }
                };
            } else {
                reqps = {
                    ...state, ...{
                        isFetching: false,
                        updateMessage: "Unable move to " + action.foldername + ". Please try again later.",
                        hasMoreItems: true,
                        enquiries: [],
                        start: 0,
                        end: 20,
                    }
                };
            }
            return reqps;
        case 'EMPTY_ATTACH':
            reqps = {
                ...state, ...{
                    imageUploaded: false,
                    imageData: {},
                    isUploadingImage: false
                }
            };

            return reqps;
        case 'EMPTY_ENQ':
            reqps = {
                ...state, ...{
                    enqError: false,
                    enqType: "A",
                    enquiries: [],
                    folderValue: 1,
                    folders: ENQUIRY_FOLDER_NAMES,
                    //hasMoreFolders:true,
                    hasMoreItems: true,
                    isFetching: false,
                    isFetchingFolders: false,
                    start: 0,
                    end: 20,
                    updateMessage: false,
                    refresh: false
                }
            };
            return reqps;
        /** *********************************************** **/
        /*** End for Enquiries Module **   **/
        /** *********************************************** **/


        /** *********************************************** **/
        /* Start for My Products Module **  */
        /** *********************************************** **/

        case 'REQUEST_PRODUCTS':

            var reqps = { ...state, ...action };
            return reqps;


        case 'RECEIVE_PRODUCTS':
            var updatedArray, prodError, wfobpCount;

            if (action.success) {
                if (Array.isArray(action.myProducts)) {
                    updatedArray = (state.myProducts).concat(action.myProducts);
                    prodError = false;
                    wfobpCount = state.myProducts.length > 0 ? state.myProducts[0].CAT_DATA.PRODUCT_COUNT_WITHOUT_PRICE : action.myProducts.length > 0 ? action.myProducts[0].CAT_DATA.PRODUCT_COUNT_WITHOUT_PRICE : false;
                } else {
                    updatedArray = [];
                    wfobpCount = false;
                    prodError = false;
                }
            } else {
                updatedArray = state.myProducts;
                prodError = action.error;
            }
            var ups = {
                ...state, ...{
                    wfobpCount: wfobpCount,
                    myProducts: updatedArray,
                    isFetchingMyProducts: false,
                    hasMoreBuyleads: true,
                    hasMoreMyProducts: updatedArray.length >= 20 ? (updatedArray.length < updatedArray[0]["CNT"]) : false,
                    prodError: prodError,
                }
            };
            return ups;

        case 'RECEIVE_WFOBPRODUCTS':
            var wFOBProduct = (state.myWFOBProducts).concat(action.myWFOBProducts);
            var wFOBData = {
                ...state, ...{
                    myWFOBProducts: wFOBProduct,
                    myProducts: [],
                    isFetchingMyProducts: false,
                    hasMoreMyProducts: wFOBProduct.length >= 20 ? (wFOBProduct.length < wFOBProduct[0]['CAT_DATA']["PRODUCT_COUNT_WITHOUT_PRICE"]) : false,
                    itemUpdatedMyProduct: []
                }
            };
            return wFOBData;
        case 'ADD_PRICE':
            return {
                ...state, ...{
                    isUpdatingPrice: action.isUpdatingPrice,
                }
            };
        case 'ADD_PRICE_SUCCESS':
            var response = action.response,
                ind = action.index,
                z;
            if (response.debug_msg == 'ITEM UPDATED') {
                var itemUpdated = state.itemUpdatedMyProduct.concat(ind);
                z = {
                    ...state, ...{
                        itemUpdatedMyProduct: itemUpdated,
                        isUpdatingPrice: false
                    }
                };
            }
            return z;
        case 'EMPTY_PROD_DATA':
            return {
                ...state, ...{
                    prodDetail: [],
                    catData: {},
                    updatedItemId: false,
                    updateMessage: "",
                    imageData: {},
                    imageUploaded: false,
                    isUploadingImage: false,
                    myProducts: [],
                    myWFOBProducts: [],
                    hasMoreMyProducts: true,
                    buyleads: [],
                    itemUpdatedMyProduct: [],
                    refresh: false,
                }
            };

        case 'PRODETAIL':
            var prodArray = action.prodDetail;
            var prod = {};
            if (action.success) {
                prod = {
                    ...state, ...{
                        prodDetail: prodArray,
                        prodError: false,
                    }
                };
            } else
                prod = {
                    ...state, ...{
                        prodError: action.error,
                    }
                };
            return prod;

        case 'CATDATA':
            var catArray = action.getcatData;
            var cat = {
                ...state, ...{
                    catData: catArray,
                    updateMessage: false
                }
            };
            return cat;
        case 'REQUEST_IMAGE_UPLOAD':
            var reqps = { ...state, ...action };
            return reqps;

        case 'IMAGE_UPLOAD':
            var data = {},
                imageUploaded;
            if (action.result) {
                data = action.result,
                    imageUploaded;
                if (data.hasOwnProperty('v') && data.v == "1") {
                    imageUploaded = true;
                    gaTrack.trackEvent(["Edit-Product-PWA", "Edit-Image-Success", '', 0, true])
                } else if (data.hasOwnProperty('eno')) {
                    imageUploaded = false;
                }
            } else if (action.success == false) {
                imageUploaded = false;
                data["eno"] = 1;
            }
            var imageData = {
                ...state, ...{
                    imageData: data,
                    imageUploaded: imageUploaded,
                    isUploadingImage: false
                }
            };
            return imageData;

        case 'EDITDETAIL':
            var result = action.result,
                success = action.success,
                res = {},
                msg = '',
                item_id = '';
            if (success && result.CODE == 200) {
                msg = action.action == 'edit_product' ? "Updated Successfully" : "Added Successfully";
                item_id = result.item_id;
            } else if (result && result.hasOwnProperty('debug_msg')) {
                msg = result.debug_msg;
                item_id = result.item_id;
            } else {
                msg = "Unable to " + (action.action == 'edit_product' ? "Update" : "Add") + " Product. Please Try Again.";
            }
            res = {
                ...state, ...{
                    myProducts: [],
                    hasMoreMyProducts: true,
                    updatedItemId: item_id,
                    updateMessage: msg
                }
            };
            return res;

        case 'REQUEST_DELETE_PRODUCTS':

            var reqps = { ...state, ...action };
            return reqps;

        case 'DELETE_PRODUCTS':
            var delProd = {}, wfobpCount = state.wfobpCount;
            const collection = state.myProducts;
            if (action.result.STATUS) {
                if (!state.myProducts[action.prod_index].PC_ITEM_FOB_PRICE) {
                    wfobpCount = wfobpCount - 1;
                }
                delProd = {
                    ...state, ...{
                        myProducts: update(state.myProducts, { $splice: [[action.prod_index, 1]] }),
                        isFetchingMyProducts: false,
                        updateMessage: "Product (" + action.name + ") Deleted Successfully",
                        wfobpCount: wfobpCount,
                        itemUpdatedMyProduct: []
                    }
                };
            } else {
                delProd = {
                    ...state, ...{
                        isFetchingMyProducts: false,
                        updateMessage: "Unable to Delete Product (" + action.name + "). Please Try Again."
                    }
                };
            }
            return delProd;
        /** *********************************************** **/

        /** *********************************************** **/
        /* End for My Products Module **  */
        /** *********************************************** **/


        /** *********************************************** **/
        /* Start for Buyleads Module **  */
        /** *********************************************** **/


        /** *********************************************** **/
        /* End for Buyleads Module **  */
        /** *********************************************** **/


        /** *********************************************** **/
        /* Start for Login Module **  */
        /** *********************************************** **/

        case 'OTP_REQUEST':
            var ups = {
                ...state, ...{
                    authenticated: false,
                    purblAfterLogin: false,
                    requesting: true,
                }
            };
            return ups;
        case 'MISSCALL_FAIL':
            return{
                ...state,...{
                    err:action.error,
                    otpErr : action.error
                }
            }
        case 'OTP_SUCCESS':
            var errorMsg = '';
            var alreadySentMsg = '';
            var pendingOtpMsg = '';
            var res = action.response;
            let otpErr='';
            let loginFail=''
            if (document.getElementById("fullLoader")) document.getElementById("fullLoader").style.display = "none";
            if (location.pathname == '/seller/enter-otp/') {
                if (res.Response.code && res.Response.code != "200" && res.Response.code != "204") {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-otp', "otp-service-failure-" + res.Response.code, 0, true]);
                }
                else if (res.Response.Code && res.Response.Code != "200" && res.Response.Code != "204") {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-otp', "otp-service-failure-" + res.Response.Code, 0, true]);
                }
            }
            if (res.Response.code == "200" || res.Response.Code == "200" || res.Response.Error == "") {
                alreadySentMsg = res.Response.Message.includes('already sent') ? res.Response.Message : '';
                otpErr = res.Response.Message.includes('already sent') ? res.Response.Message : '';
            }
            else if (res.Response.code == "204" || res.Response.Code == "204" || res.Response.Error == "Auth code mismatch") {
                errorMsg = "Entered OTP is incorrect";
                pendingOtpMsg = res.Response.Error.includes('Pending OTP record not found') ? 'OTP you have entered is expired, Please click on resend to get a new OTP' : '';
                res.Response.Error == "Auth code mismatch"? otpErr = "Please enter correct OTP":''
                res.Response.Error.includes('Pending OTP record not found') ? otpErr='OTP you have entered is expired, Please click on resend to get a new OTP' : '';
            }


            if (location.pathname == '/seller/') {
                if (res.Response.code == '200' || res.Response.Code == '200') {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-mobile-Number', "otp-generated", 0, true]);
                }
                else if ((res.Response.code != "200" || res.Response.Code != "200") && (res.Response.code != "204" || res.Response.Code != "204")) {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-mobile-Number', "otp-generation-failure-" + res.Response.code, 0, true]);
                }

            }
            if (errorMsg != '' && document.getElementById('vrfValAutoID') != null && document.getElementById('vrfVal') != null) {
                (getQueryStringValue('autoidentify') ? document.getElementById('vrfValAutoID').value = '' : document.getElementById('vrfVal').value = '');
            }
            if (res.Response.Code == 200) {
                var otpSuccess = true;
            }
            if(res.Response.Code=="429")
            {
                loginFail=res.Response.Message
            }

            return {
                ...state, ...{
                    otpsent: true,
                    otpSuccess: otpSuccess ? true : false,
                    err: errorMsg,
                    errMsg: errorMsg,
                    otpErr : otpErr,
                    requesting: false,
                    otpType: action.type,
                    alreadySentMsg: alreadySentMsg,
                    pendingOtpMsg: pendingOtpMsg,
                    otpUniqueId: res.unique_id,
                    glUsrId: res.Response.Glusrid,
                    loginFail:loginFail
                }
            };  
        case 'XMPPALERT_ADDED':
            return {
                ...state, ...{
                    xmppAlert: true
                }
            }

        case 'GET_SELLER_COMPANY':
            return {
                ...state, ...{
                    sellerRes: true
                }
            };
        case 'SET_XMPPALERT':
            return {
                ...state, ...{
                    sellerRes: true,
                    xmppDetail:action.xmppDetail?action.xmppDetail:'',
                    unreadCount:action.unreadCount
                }
            }
        case 'REMOVE_XMPPALERT':
            return {
                ...state, ...{
                    sellerRes: false,
                    xmppDetail:'',
                    unreadCount:''
                }
            }
        case 'RESET_SELLER_COMPANY':
            return {
                ...state, ...{
                    sellerDetail: ''
                }
            }
        case 'RESET_XMPP_COMPANY':
            return{
                ...state, ...{
                    XmppCompanyList : []
                }
            };
        case 'RESET_OTP_ERR_MSG':
            return {
                ...state, ...{
                   errMsg: '',
                }
            };
        case 'LOGIN_REQUEST':

            var ups = {
                ...state, ...{
                    isauthenticated:false,
                    requesting: true,
                    authenticated: false,
                    purblAfterLogin: false,
                    err: '',
                    loginErr : ''
                }
            };

            return ups;

            case 'LOGIN_SUCCESS':
            var cookies = action.response ? action.response.Response.LOGIN_DATA : action.requestLogin ? action.requestLogin : '';
            var accessCode = cookies.access;
            var imeshCookie = cookies.DataCookie;
            var v4iilexCookie = cookies.LoginCookie;
            var im_iss = cookies.im_iss;
            var ciso = action.ciso || "IN", errorMsg = '', imeshDataString = '', v4DataString = '', ups;
            var loginStatus  = -1;
		 var changeScreen= action.changeScreen?action.changeScreen:'';
            localStorage.removeItem("userState");
            if (imeshCookie) {
                for (var key in imeshCookie) {
                    imeshDataString += key + '=' + imeshCookie[key] + '|';
                }
                setCookie('ImeshVisitor', imeshDataString, 730);
                loginStatus = 1;
            }
            if(v4iilexCookie){
                for (var data in v4iilexCookie) {
                    v4DataString += data + '=' + v4iilexCookie[data] + '|';
                }                
                setCookie('v4iilex', v4DataString, 30);
				
            } 
            // else if (imeshCookie && !v4iilexCookie) {
            //     for (var key in imeshCookie) {
            //         imeshDataString += key + '=' + imeshCookie[key] + '|';
            //     }
            //     if (document.cookie && document.cookie.indexOf('v4iilex') > -1 && window.ENQUIRY_IDENTIFY_LOGOUT==false) {
            //         let currDate = new Date();
            //         let domain = '.indiamart.com';
            //         currDate.setTime(currDate.getTime() - 1);
            //         if (document.domain === 'localhost')
            //             document.cookie = "v4iilex=;expires=" + currDate.toGMTString() + ";path=/";
            //         else
            //             document.cookie = "v4iilex=;expires=" + currDate.toGMTString() + ";domain=" + domain + ";path=/";
            //     }
            //     setCookie('ImeshVisitor', imeshDataString, 730);
            //     window.ENQUIRY_IDENTIFY_LOGOUT=false;
			// 	loginStatus = 1;
            // }
            if (im_iss) {
                if (typeof im_iss == "object") {
                    var im_cookie = "t=" + im_iss['t'];
                }
                else {
                    var im_cookie = im_iss;
                }
                setCookie('im_iss', im_cookie, 30);
                loginStatus = 2;
            }
            // window.dispatchEvent(event_login);
            if (accessCode == 0) {
                if (action.requestLogin.message == "ISO MisMatch") {
                    errorMsg = "Please select the correct country";
                    errorMsg= action.requestLogin.msg;
                } else if (action.requestLogin.code && action.requestLogin.code != "200") {
                    if(action.requestLogin.msg == "Mandatory Param missing for User identification"){
                        errorMsg = "Some error occurred. Try again!";
                    }
                    else{
                        errorMsg = action.requestLogin.msg;
                    }
                }
                else {
                    errorMsg = action.requestLogin.message || 'Details are incorrect';
                }
                ups = {
                    ...state, ...{
                        isauthenticated:false,
                        authenticated: false,
                        isidentified: false,
                        purblAfterLogin: false,
                        requesting: false,
                        ciso: ciso,
                        err: errorMsg,
						loginStatus : loginStatus,
                        loginErr : errorMsg,
                        callver: action.callver ? action.callver : false,
                        existing:cookies.msg!="New User created via User creation service"?"3":"l",
                        // userStatus:cookies.msg!="New User created via User creation service"?"3":state.userStatus,
                        toggleFlag: changeScreen=='1'?!state.toggleFlag:state.toggleFlag ,
              
                        
                        
                    }
                };
            } else {
                let sellerdetails = localStorage.getItem("sellerIntent") ? JSON.parse(localStorage.getItem("sellerIntent")) : '';
                if(getCookieValByKey('ImeshVisitor', 'utyp')=='N' && !sellerdetails["CompanyName"] ){
                    import(
                        /* webpackChunkName:"UtilityComponent" */'../api/utilityApi'
                      ).then((module) => {
                          let utilityApi = module.default
                          utilityApi.checkForSoiBanner(this);
                      });
                }
                ups = {
                    ...state, ...{
                        isauthenticated:true,
                        authenticated: true,
                        isloggedin: true,
                        isidentified: true,
                        purblAfterLogin: true,
                        requesting: false,
                        user: action.requestLogin,
                        ciso: ciso,
                        isRestricted: false,
                        err: errorMsg,
						            loginStatus : loginStatus,
                        loginErr : errorMsg,
                        srchFrstFold: false,
                        callver: action.callver ? action.callver : false,
                        existing:cookies.msg!="New User created via User creation service"?"3":"",
                        toggleFlag: changeScreen=='1'?!state.toggleFlag:state.toggleFlag ,

                       
                    }
                };
            }
            return ups;

        case 'REQUEST_FORGOTPASSWORD':
            var res = {
                ...state, ...{
                    err: ''
                }
            };
            return res;

        case 'GETCOUNTRY':
            var res = {
                ...state, ...{
                    returnCC: action.response.country
                }
            };
            return res;
        case 'PURCAHSE_STATUS':
            var res = { ...state, ...action };
            return res;

        case 'REQUEST_SUGGESTER':
            var ups = {
                ...state, ...{

                }
            };
            return ups;

        case 'RECEIVE_SUGGESTER':
            var errorMsg = '';
            var res = action.response;
            var list = [];
            return {
                ...state, ...{
                    suggested: res
                }
            };

        case 'LOGIN_FAILURE':
            return {
                ...state, ...{
                    authenticated: false
                }
            };

        case 'RECEIVE_MINIPDP':
            if (action.response == '') {
                return {
                    ...state, ...{
                        miniPdpData: [],
                        pdp404: false
                    }
                };
            }
            else if (action.response.Status == 404) {
                return {
                    ...state, ...{
                        pdp404: true
                    }
                };
            }
            else {
                setTimeout(function () { if (window.changeColorEnqAlreadySentBtn != undefined) { removeEnqStyletagspdp(); window.changeColorEnqAlreadySentBtn() } }, 500);
                let serviceData = [];
                serviceData = state.miniPdpData;
                let allPdpdData = [];
                if (action.response[0] != undefined) {
                    allPdpdData = serviceData.concat(action.response[0]);
                }
                else {
                    allPdpdData = serviceData
                }

                return {
                    ...state, ...{
                        miniPdpData: allPdpdData,
                        pdp404: false
                    }
                };
            }
            
            case 'RECEIVE_MINIPDP_NEW':
                if (!action.response) {
                    return {
                        ...state, ...{
                            pdp5XX: true
                        }
                    };
                }
                else if (action.response == '') {
                    return {
                        ...state, ...{
                            miniPdpData: [],
                            pdp404: false,
                            pdp5XX : false
                        }
                    };
                }
                else if (action.response && (action.response.Status == 404 || action.response.Status == 400)) {
                    return {
                        ...state, ...{
                            pdp404: true
                        }
                    };
                }
                else {
                    setTimeout(function () { if (window.changeColorEnqAlreadySentBtn != undefined) { removeEnqStyletagspdp(); window.changeColorEnqAlreadySentBtn() } }, 500);
                    let serviceData = [];
                    serviceData = state.miniPdpData;
                    let allPdpdData = [];
                    if (action.response[0] != undefined) {
                        allPdpdData = action.response;
                    }
                    else {
                        allPdpdData = serviceData
                    }
    
                    return {
                        ...state, ...{
                            miniPdpData: allPdpdData,
                            pdp404: false,
                            pdp5XX : false
    
                        }
                    };
                }
    
            case 'REMOVE_MINIPDP_DATA':
                return {
                    ...state, ...{
                        miniPdpData: [],
                        pdp404: false,
                        pdp5XX: false
                    }
                };               
           
        /** *********************************************** **/
        /* End for Login Module **  */
        /** *********************************************** **/

        case 'SHOW_REFRESH_BUTTON':
            return {
                ...state, ...{
                    refresh: true,
                    url: action.url
                }
            };

        case 'REQUEST_SEARCH':
            var reqps = {
                ...state, ...{
                    hasMoreSearch: action.hasMoreSearch,
                    isFetchingSearch: action.isFetchingSearch,
                    isUpdating: action.isUpdating,
                    isloadedSearch: action.isloadedSearch
                }
            };
            return reqps;


        case 'RECEIVE_SEARCH':
            let resObj1 = {};
            let a1 = ''
            if (action.engagementData) {
                if (action.engagementData.CODE == 200) {
                    action.engagementData.DATA.RECORDS.forEach(element => {
                        resObj1[element.fk_pc_item_display_id] = {
                            dispid: element.fk_pc_item_display_id,
                            pageViews: element.page_views,
                            enqCount: element.enq_count,
                            callCount: element.call_count

                        }
                    });
                }

                if (state.searchEngagement && action.engagementData.CODE == 200) {
                    a1 = { ...state.searchEngagement, ...resObj1 }
                }
                else if (action.engagementData.CODE == 200) {
                    a1 = resObj1
                } else {
                    a1 = 'blank'
                }
            }
            if (action.success && action.imsearch !== null && action.imsearch.status != '404' && action.imsearch.status != '503') {
                if (action.imsearch['error'] && action.imsearch['error'] == 'OnlyLocationInQuery') {
                    document.getElementsByClassName("App")[0].style.display = "none";
                    document.getElementsByTagName("footer")[0].style.display = "none";
                    if (action.imsearch.city && action.imsearch.city[0]) {
                        let cityNm = action.imsearch.city[0];
                        cityNm = cityNm.toLowerCase().replace(" ", '-');
                        cityNm = cityNm.replace(" ", '-');
                        window.location.replace("https://" + window.location.hostname + "/city/" + cityNm + "/?ref=isearch")
                    }
                    else {
                        return {
                            ...state, ...{
                                isFetchingSearch: false,
                                isloadedSearch: true,
                                searchData: [],
                            }
                        };
                    }
                }
                else {
                    if (action.shouldReload == true) {

                        state.searchlist = [];
                        state.isUpdating = true;
                        if (document.getElementById("searchListing")) {
                            setTimeout(function () { if (window.changeColorEnqAlreadySentBtn != undefined) { removeEnqStyletags(); window.changeColorEnqAlreadySentBtn() } }, 500);
                        }
                    }
                    else {
                        state.isUpdating = false;
                    }

                    setTimeout(function () { if (window.changeColorEnqAlreadySentBtn != undefined) { removeEnqStyletags(); window.changeColorEnqAlreadySentBtn() } }, 500);
                    var updatedArray, searchstart, searchend, searchl;
                    searchl = action.imsearch.results;
                    updatedArray = state.searchlist;
                    searchstart = 1;
                    searchend = 14;


                    var limit = (action.imsearch.total_results) && (action.imsearch.total_results > 200) ? 200 : action.imsearch.total_results;

                    if (Array.isArray(action.imsearch.results)) {
                        updatedArray = (updatedArray).concat(searchl)
                    }
                    else {
                        updatedArray: [];
                    }

                    // Show Adunits on basis of adultDetected
                    if ((action.imsearch.adultDetected === '0' || action.imsearch.adultDetected === ':') && (action.imsearch.query_type !== "TrademarkKeyword" && action.imsearch.query_type !== "BannedKeyword")) {
                        state.isAdsVisible = true;
                    } else {
                        state.isAdsVisible = false;
                    }

                    // Create search data for GA for one Hit and logic is same implemented in non-pwa
                    if (updatedArray.length < 20) {
                        if (window.navigator.userAgent.indexOf("Chrome") > -1 && window.startTime !== undefined) {
                            var node_static, main_min;
                            window.performance.getEntries().forEach(element => {//element.name.indexOf("node-static")>-1?node_static=element:'';
                                element.name.indexOf("main-min") > -1 ? main_min = element : '';
                            });

                            var search_service_response;
                            window.performance.getEntries().forEach(element => { element.name.lastIndexOf("ajaxrequest/search?token") >= -1 ? search_service_response = element : ''; });
                        }
                        window.startTime = 0;
                        window.searchServiceResponse = 0;

                        var url_string = window.location.href;
                        var url_param = getUrlVars();
                        var c = url_param.cq;
                        var p = url_param.pr;
                        var b = url_param.biz;
                        var cq = (c ? c : '');
                        var pr = (p ? p : 0);
                        var biz = (b ? b : '');
                        var userMode = '';
                        var group_id = '';
                        var cat_id = '';
                        var top_mcat = '';
                        var CD_List_Count = '';
                        var cat_id = '';
                        var topmost_mcat = '';
                        var CD_Miscellaneous = '';
                        // if(action.imsearch.live_mcats.length>0){
                        //     group_id =action.imsearch.live_mcats[0].groupid!== undefined?action.imsearch.live_mcats[0].groupid : 0;}
                        cat_id = action.imsearch.catid_of_topmost_mcat !== undefined ? action.imsearch.catid_of_topmost_mcat : 0;
                        top_mcat = (action.imsearch.topmost_mcat && action.imsearch.topmost_mcat.id !== undefined ? action.imsearch.topmost_mcat.id : 0);
                        var bannedProduct, data_implicit_info_city, data_implicit_info_latlong, data_implicit_info_city_id;
                        var filters = "Filter";
                        if ((cq === undefined || cq === '') && (pr === undefined || pr === 0) && (biz === undefined || biz === '')) {
                            filters = filters + 'NA';
                        }
                        if (cq != undefined && cq != '') {
                            filters = filters + 'L';
                        }
                        if (pr != undefined && pr != 0) {
                            filters = filters + 'P';
                        }
                        if (biz != undefined && biz != '') {
                            filters = filters + 'B';
                        }
                        data_implicit_info_latlong = '';
                        if (action.imsearch.query_type == "BannedKeyword") {
                            bannedProduct = action.imsearch.queryDataType + "B"
                        } 
                        // else if (action.imsearch.query_type == "Normal") {
                        //     bannedProduct = action.imsearch.queryDataType + "N"
                        // } 
                        else if (action.imsearch.query_type == "OnlyLocationInQuery") {
                             bannedProduct = "rPO";
                        } 
                        // else {
                        //     bannedProduct = "PN";
                        // }



                        if ((action.imsearch.query_type !== "BannedKeyword") && (action.imsearch.live_mcats && action.imsearch.live_mcats[0]) && (action.imsearch.live_mcats[0].isgeneric) && (action.imsearch.live_mcats[0].isgeneric == "true")) {
                            bannedProduct = "PNG";

                        }

                        if (userMode === undefined) {
                            userMode = '';
                        }
                        if (group_id === undefined) {
                            group_id = '';
                        }

                        if (top_mcat === undefined) {
                            top_mcat = '';
                        }
                        if (CD_List_Count === undefined) {
                            CD_List_Count = '';
                        } if (CD_Miscellaneous === undefined) {
                            CD_Miscellaneous = '';
                        } if (cat_id === undefined) {
                            cat_id = '';
                        }
                        if (topmost_mcat === undefined) {
                            topmost_mcat = '';
                        }
                        if (data_implicit_info_city === undefined) {
                            data_implicit_info_city = '';
                        }
                        if (bannedProduct === undefined) {
                            bannedProduct = '';
                        }
                        if (action.imsearch.extended_type === undefined) {
                            action.imsearch.extended_type = '';
                        }
                        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
                        CD_Miscellaneous = 'imob-Search|' + filters + bannedProduct + '|' + action.imsearch.extended_type + '|' + langSelection;
                        if (action.imsearch.cdMiscellaneous) {
                            Object.keys(action.imsearch.cdMiscellaneous).forEach(function(key){
                                let value = action.imsearch.cdMiscellaneous[key];
                                CD_Miscellaneous += ('|' + key + ':' + value)
                            });
                            CD_Miscellaneous += (action.imsearch.cdMiscellaneous && action.imsearch.cdMiscellaneous["CityName"] ? "CitySearch" : "AllIndiaSearch")
                        }
                        let abTestTracking = ''
                        let glid = getCookieValByKey("ImeshVisitor","glid");
                        if (glid){
                            glid = glid[glid.length - 1]
                            if (getCookie('ImeshVisitor') !== '' && getCookie('im_iss') !== '' && (glid == '1' || glid == '2') ){
                                abTestTracking = 'MSS_ABTEST' 
                            }
                        }
                        CD_Miscellaneous += action.imsearch.contextInfo.applied ? ('|ctxt_add:' + ((action.imsearch.contextInfo.applied == "true") ? ('true|ctxt_id:' + action.imsearch.contextInfo.catid) : 'false')) : '';
                        let isGoogle = action.imsearch.total_results && action.imsearch.total_results.length ==0 && action.imsearch.googleResults && action.imsearch.googleResults.results && action.imsearch.googleResults.results.length >0 ? true : false;
                        CD_List_Count = (action.imsearch.total_results.length == 0 && isGoogle == true) ? action.imsearch.googleResults.results.length : action.imsearch.total_results;
                        let gglSrch = isGoogle == true ? 'googleProgrammable-search' :''; 
                        if(!window.location.href.includes("qu-tr=1") && !window.location.href.includes("qu-cx=1") && action.imsearch.urlLangSpell){
                            let pageUrl = window.location.href + action.imsearch.urlLangSpell;
                            history.replaceState(null, null, pageUrl);
                        }

                        let cdMisAppend = CD_Miscellaneous+(action.imsearch.cdMiscAppend?action.imsearch.cdMiscAppend:'')+(action.imsearch.query_type && (action.imsearch.query_type == "PartialBannedKeyword" || action.imsearch.query_type == "all_num") ? "|kwd_type:"+action.imsearch.query_type:'') + abTestTracking;
                        gaTrack.trackSearchPageViewWithCustomDimension("/vpv/pwa" + window.location.pathname , window.location.search, 'Indiamart Mobile Site - ' + (gglSrch?gglSrch:'search'), group_id, cat_id, top_mcat, cdMisAppend, CD_List_Count);
                    }
                    let CD_Source = '';
                    if (localStorage && localStorage.getItem("PDP404URL")){
                        let lsData = JSON.parse(localStorage.getItem("PDP404URL"))
                        CD_Source = lsData.previousPageURL
                    }
                    return {
                        ...state, ...{
                            searchlist: updatedArray,
                            isFetchingSearch: false,
                            isloadedSearch: true,
                            searchstart: state.searchstart + 14,
                            searchend: action.start + 14,
                            searchData: action.imsearch,
                            hasMoreSearch: ((updatedArray.length < limit)) ? true : false,
                            gaSearchData: { "CD_Group": group_id, "CD_Subcat": cat_id, "CD_MCAT": top_mcat, "CD_Miscellaneous": (CD_Miscellaneous+action.imsearch.cdMiscAppend), "CD_List_Count": CD_List_Count, "CD_Source": CD_Source},
                            isAdsVisible: state.isAdsVisible,
                            total_results: limit,
                            srchFrstFold: false,
                            searchEngagement: a1,
                            searchErrorCode:(updatedArray.length == 0)?"no-results":"",
                        }
                    }


                }
            }
            else if ((!action.success) || (action.imsearch && action.imsearch.status == '404')) {

                let searchObj ={
                    success: true,                    
                    hasMoreSearch: false,
                    isAdsVisible: true,
                    isFetchingSearch: false,
                    isloadedSearch: true,
                    srchFrstFold: false,
                    searchData: action.imsearch ? action.imsearch : [],
                    searchlist: [],
                    searchErrorCode:""
                };

                if(action.imsearch && action.imsearch.status && action.imsearch.status == 404){
                    searchObj.searchErrorCode = "404";
                    if(state&&action&&action.loadMoreDataFromSearch){
                        searchObj.searchlist = state.searchlist ? state.searchlist : [];
                        searchObj.searchData = state.searchData ? state.searchData : [];
                    }
                }
                else{                   
                switch(action.status){
                    case 0: searchObj.searchErrorCode = "no-internet";
                    case 404: searchObj.searchErrorCode = "404";
                    if(state&&action&&action.loadMoreDataFromSearch){
                        searchObj.searchlist = state.searchlist ? state.searchlist : [];
                        searchObj.searchData = state.searchData ? state.searchData : [];
                    }
                    break;

                    // break;

                    case 500: searchObj.searchErrorCode = "5xx";
                    break;

                    case 501: searchObj.searchErrorCode = "5xx";
                    break;

                    case 502: searchObj.searchErrorCode = "5xx";
                    break;

                    case 503: searchObj.searchErrorCode = "5xx";
                    break;

                    default: searchObj.searchErrorCode = "unknown-err";
                    break;
                }

                }

                return {
                    ...state, ...searchObj
                };
            }
            else {
                return {
                    ...state, ...{
                        success: true,
                        hasMoreSearch: false,
                        isAdsVisible: true,
                        isFetchingSearch: false,
                        isloadedSearch: true,
                        searchErrorCode:"5xx",
                        srchFrstFold: false,
                        searchData: [],
                        searchlist: []
                    }
                };
            };

        case 'REQUEST_SEARCH_SUGGESTER':
            var ups = {
                ...state
            };
            return ups;


        case 'RECEIVE_SEARCH_SUGGESTER':
            var errorMsg = '';
            var res = action.response;
            return {
                ...state, ...{
                    searchsuggested: JSON.parse(res)
                }
            };
            break;
        case 'RECEIVE_ENGAGEMENT_DATA':
            let resObj = {};
            if (action.response.CODE == 200) {
                action.response.DATA.RECORDS.forEach(element => {
                    resObj[element.fk_pc_item_display_id] = {
                        dispid: element.fk_pc_item_display_id,
                        pageViews: element.page_views,
                        enqCount: element.enq_count,
                        callCount: element.call_count

                    }
                });
            }

            let a = ''
            if (state.searchEngagementList && action.response.CODE == 200) {
                a = { ...state.searchEngagementList, ...resObj }
            }
            else if (action.response.CODE == 200) {
                a = resObj
            }
            return {
                ...state, ...{
                    searchEngagement: a,
                    searchEngagementList: a
                }
            }
            break;
        case 'RECEIVE_ENGAGEMENT_DATA_FAILURE':
            if (!state.searchEngagement) {
                return {
                    ...state, ...{
                        searchEngagement: 'error'
                    }
                }
            }
            return { ...state };
            break;
        case 'REQUEST_RECENT_SEARCH_SUGGESTER':
            var ups = {
                ...state, ...{
                }
            };
            return ups;

        case 'RECEIVE_RECENT_SEARCH_SUGGESTER':
            var errorMsg = '';
            var res = action.response;
            return {
                ...state, ...{
                    recentsearchdata: JSON.parse(res)
                }
            };
            break;


        case 'HIDE_REFRESH_BUTTON':
            return {
                ...state, ...{
                    refresh: false,
                    url: ""
                }
            }

        case 'GET_CITY_FROM_LATLONG':
           {
            var data = {};
            if (action.response) {
                data = action.response;
                if (data.hasOwnProperty('CODE') && data.CODE == 200) {


                }
            }
            var res = {
                ...state, ...{

                    city_data: data,
                    isFetchingLocation: false
                }
            };
            return res;
           }
           case 'GET_CITY_FROM_LATLONG_ENQ':
            {
             var data = {};
             if (action.response) {
                 data = action.response;
                 if (data && data.response && data.response.CODE == 200) {
                    window.cityEnq=data.response.cityname;
                    window.cityId=data.response.cityid;
 
                 }
             }
             var res = {
                 ...state, ...{
 
                     city_data_enq: data,
                     isFetchingLocationEnq: false
                 }
             };
             return res;
            }
        case 'GET_CITY_FROM_LATLONG_MCAT':
            var data = {};
            if (action.response) {
                data = action.response;


                if (data.hasOwnProperty('CODE') && data.CODE == 200) {


                }
            }
            var res = {
                ...state, ...{

                    city_data_mcat: data,
                    isFetchingLocation_mcat: false
                }
            };
            return res;

        case 'GET_PRODUCTS':
            var data = action.result;
            var res = {
                ...state, ...{

                    get_products: data,
                    products_loading: true
                }
            };
            return res;

        case 'GET_RECENTSEARCHES':
            var data = action.result;
            var res = {
                ...state, ...{
                    get_recentsearches: data,
                    searches_loading: true
                }
            };

            return res;
        case 'GET_RECENTSEARCHES_FAIL':

            return state;


        case 'GET_PRODUCTS_FAIL':
            return state;

        case 'REQUEST_CITY_SEARCHSOI_SUGGESTER':
            return {
                ...state, ...{
                    suggested: ''
                }
            };
            break;

        case 'RECEIVE_CITY_SEARCH_SUGGESTER':
            var errorMsg = '';
            var res = action.response;
            return {
                ...state, ...{
                    suggested: res
                }
            };
            break;



        case 'REQUEST_SAVE_SEARCH_FEEDBACK':
            return { ...state, ...action };
            break;

        case 'RECEIVE_SAVE_SEARCH_FEEDBACK':
            return state
            break;
        case 'RECEIVE_SAVE_SEARCH_SUGGESTER':
            return state
            break;

        case 'COUNTRY_ISO':
            var res = {
                ...state, ...{
                    country_name: action.response.country_iso,
                    country_ip: action.response.country_ip,
                    country_iso: action.response.country,
                    uniqueId : action.id
                }
            };
            return res;
            break;
        case 'SEARCH_FAIL':
            var res = {
                ...state, ...{
                    state_fail: true,
                }
            };
            return res;
            break;

        case 'REQUEST_PROFILE_UPDATE':
            var res = {
                ...state, ...{
                    userreauth: '',
                    userupdate: '',
                    userUpdateEmailErr: '',
                    userUpdateError: ''

                }
            };
            return res;
            break;

        case 'PROFILE_UPDATE_SUCCESS':
            let actionreq = action.request;
            var res = {
                ...state, ...{
                    userupdate: actionreq && actionreq.CODE == 200 ? actionreq.MESSAGE : '',
                    userUpdateEmailErr: actionreq && actionreq.CODE != 200 && actionreq.ERR_MSG['EMAIL'] && actionreq.ERR_MSG['EMAIL'].toLowerCase() == "duplicate" ? "Email id is already registered" : '',
                    userUpdateError: actionreq && actionreq.CODE != 200 ? "Something went wrong" : '',
                    userUpdateErr: actionreq && actionreq.CODE == 500 ? "Invalid Input" : '',
                    userupdateFailed: false
                }
            };
            return res;
            break;

        case 'PROFILE_UPDATE_FAILURE':
            let failurecode = action.request ? JSON.parse(action.request.success): '';
            if (failurecode &&failurecode.RESPONSE&& failurecode.RESPONSE.CODE != '200') {
                if (location.pathname == '/seller/register-details/') {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-personal-details', "update-details-failure-" + failurecode.RESPONSE.CODE, 0, true])
                }
                if (location.pathname == '/seller/address-details/') {
                    gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-address-details', "update-details-failure-" + failurecode.RESPONSE.CODE, 0, true])
                }
            }
            var res = {
                ...state, ...{
                    userupdateFailed: true
                }
            }
            return res;

        case 'REQUEST_PRODUCT_ADD':
            var res = {
                ...state, ...{
                    product_result: ''
                }
            };

        case 'RECEIVE_PRODUCT_ADD1':
            if (action.response)
            {
                
                let product= state&&state.product_result?state.product_result:[];
                product["product1"]=action.response
                var res = {
                    ...state, ...{
                        product_result: product
                    }
                };
            }
            return res;
        case 'RECEIVE_PRODUCT_ADD2':
            if (action.response)
            {
                
                let product=state&&state.product_result?state.product_result:[];
                product["product2"]= action.response
                var res = {
                    ...state, ...{
                        product_result:product
                    }
                };
            }
            return res;
        case 'RECEIVE_PRODUCT_ADD3':
            if (action.response)
            {
                
                let product=state&&state.product_result?state.product_result:[];
                product["product3"]= action.response
                var res = {
                    ...state, ...{
                        product_result: product
                    }
                };
            }
            return res;

        case 'REQUEST_HOTLEADS':
            return state

        case 'RECEIVE_HOTLEADS':
            if (action.response) {
                let hotleadResponse = action.response.success && JSON.parse(action.response.success) ? JSON.parse(action.response.success) : action.response;
                if (hotleadResponse.Response.Code) {
                    if (hotleadResponse.Response.Code === '200') {
                        gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-personal-details', "hotleads-success", 0, true])
                    }
                    else {
                        gaTrack.trackEvent(['Sell-on-Indiamart', 'Enter-personal-details', "hotleads-failure-" + hotleadResponse.Response.Code, 0, true])
                    }
                }


                var res = {
                    ...state, ...{
                        hotlead: hotleadResponse
                    }
                };
            }
            return res;

        case 'REAUTHENTICATE_SUCCESS':

            var imeshCookie = action.reauthenticate.DataCookie;
            var v4iilexCookie = action.reauthenticate.LoginCookie;
            var im_iss = action.reauthenticate.im_iss;
            var ciso = "IN", errorMsg = '', imeshDataString = '', v4DataString = '', ups;
            if (imeshCookie) {
                for (var key in imeshCookie) {
                    imeshDataString += key + '=' + imeshCookie[key] + '|';
                }
                setCookie('ImeshVisitor', imeshDataString, 730);
            }
            if(v4iilexCookie){
                for (var data in v4iilexCookie) {
                    v4DataString += data + '=' + v4iilexCookie[data] + '|';
                }
                
                setCookie('v4iilex', v4DataString, 182);
            } 
            // else if (imeshCookie && !v4iilexCookie) {
            //     for (var key in imeshCookie) {
            //         imeshDataString += key + '=' + imeshCookie[key] + '|';
            //     }
            //     if (document.cookie && document.cookie.indexOf('v4iilex') > -1) {
            //         let currDate = new Date();
            //         let domain = '.indiamart.com';
            //         currDate.setTime(currDate.getTime() - 1);
            //         if (document.domain === 'localhost')
            //             document.cookie = "v4iilex=;expires=" + currDate.toGMTString() + ";path=/";
            //         else
            //             document.cookie = "v4iilex=;expires=" + currDate.toGMTString() + ";domain=" + domain + ";path=/";
            //     }
            //     setCookie('ImeshVisitor', imeshDataString, 730);
            // }
            if (im_iss) {
                if (typeof im_iss == "object") {
                    var im_cookie = 't=' + im_iss['t'];
                }
                else {
                    var im_cookie = im_iss;
                }
                setCookie('im_iss', im_cookie, 730);
            }
            if (location.pathname.indexOf('seller') > -1) {
                ups = {
                    ...state, ...{
                        authenticated: true,
                        purblAfterLogin: true,
                        requesting: false,
                        user: action.reauthenticate,
                        userreauth: action.reauthenticate,
                        ciso: ciso,
                        err: errorMsg,
                        personal: true
                    }
                };
            }
            else {
                ups = {
                    ...state, ...{
                        authenticated: true,
                        purblAfterLogin: true,
                        requesting: false,
                        userreauth: action.reauthenticate,
                        user: action.reauthenticate,
                        ciso: ciso,
                        err: errorMsg
                    }
                };
            }


            return ups;

        case 'REAUTHENTICATE_FAILURE':
            var res = {
                ...state, ...{
                    authenticated: false
                }
            };
            return res;


        case 'REQUEST_USER_DETAILS':
            var res = {
                ...state, ...{
                    userdata: '',
                    userUpdateEmailErr: '',
                    userUpdateError: ''
                }
            };
            return res;

        case 'UPDATE_USER_DATA':
            return {
                ...state, ...{
                    userdata: {...state.userdata, glusr_usr_state: action.state, glusr_usr_ph_mobile: action.mobileNo}
                }
            }

        case 'RECEIVE_USER_DETAILS':
            if(action.response && action.response.glusr_usr_state) {
                localStorage.setItem('userState', JSON.stringify(action.response.glusr_usr_state));
            }
            var res = {
                ...state, ...{
                    userdata: action.response
                }
            };
            return res;
        case 'RECEIVE_USER_CONTACT_DETAILS':
            var res = {
                ...state, ...{
                    userContactData: action.response
                }
            };
            return res;
        case 'REQUEST_PRODUCT_COUNT':
            var res = {
                ...state, ...{
                    myProductsCount: ''
                }
            };
            return res;

        case 'GET_PRODUCT_COUNT':

            var res = {
                ...state, ...{
                    myProductsCount: action.response && action.response[0] && action.response[0] != 'undefined' && action.response[0]['CNT'] ? action.response[0]['CNT'] : 0,
                    productName1: action.response && action.response[0] && action.response[0] != 'undefined' && action.response[0]['ITEM_NAME'] ? action.response[0]['ITEM_NAME'] : '',
                    productName2: action.response && action.response[1] && action.response[1] != 'undefined' && action.response[1]['ITEM_NAME'] ? action.response[1]['ITEM_NAME'] : '',
                    productName3: action.response && action.response[2] && action.response[2] != 'undefined' && action.response[2]['ITEM_NAME'] ? action.response[2]['ITEM_NAME'] : '',
                }
            };
            return res;

        case 'REQUEST_MESSAGES':

            var req = {
                ...state, ...{

                    isFetchingMessages: true,
                    hasMoreMessages: true,
                    message_Detail: [],
                    isFetchingmsgdetail: true,
                    get_contdetails: {},
                    isReqCancld: false,
                    loadMoreData: false
                }
            };
            return req;
            break;


        case 'RECEIVE_MESSAGES':
            var updatedArray, res, start, end;

            res = (action.response) ? action.response : '';
            //res = (action.response)?action.response.Response.Data:'';
            updatedArray = state.messages;

            if (res && Array.isArray(action.response.result)) {
                updatedArray = (updatedArray).concat(action.response.result)
            }
            else {
                updatedArray: [];
            }

            return {
                ...state, ...{
                    message_listing: res,
                    messages: updatedArray,
                    start: state.end + 1,
                    end: state.end + 20,
                    hasMoreMessages: (res && res.hasOwnProperty('result')) ? (res.result.length > 0 && res.result.length == 20 && res.code !=204) ? true : false : "",
                    isFetchingMessages: false,
                    isloaded: false,
                    isReqCancld: (action.error && typeof (action.error.isMsgMod) != 'undefined') ? action.error.isMsgMod : false,
                    loadMoreData : res && res.result && res.result.length == 20 && state.start == 0 && state.end == 20 ? true : false
                }
            };

            break;

        case 'RECEIVE_MESSAGES_HOME':
            var updatedArray=[];
            res = (action.response) ? action.response : '';
            if (res && Array.isArray(action.response.result)) {
                updatedArray = (updatedArray).concat(action.response.result)
            }
            else {
                updatedArray: [];
            }
            return {
                ...state, ...{
                    messageListing: updatedArray,
                    isFetchingMessages: false,
                }
            };

        case 'UPDATE_MESSAGE_LIST':
        {
            let updatedMessageList = state.messages ? state.messages.filter((item) => item.contacts_glid != action.blocked_glid) : [];
            return {
                ...state, ...{
                    messages: updatedMessageList
                }
            };
        }

        case 'BLANK_MESSAGES':
            return {
                ...state, ...{
                    message_listing: {},
                    messages: [],
                    start: 0,
                    end: 20,
                    hasMoreMessages: true,
                    isFetchingMessages: false,
                    isloaded: false,
                }
            };

        case 'GETLIST_MY_ORDER':
            var respdata = [];
            if (action.response.code == 200) {
                respdata = action.response && action.response.orderlist ? action.response.orderlist : '';
            }
            return {
                ...state, ...{
                    orderdata: respdata,
                    error_orderdata: false,
                }
            }
        case 'GETLIST_MY_ORDER_ERROR':
            return {
                ...state, ...{
                    error_orderdata: true,
                }
            }
        case 'GETLIST_MBR':
            var respdata = [];
            if (action.response && action.response.RESPONSE && action.response.RESPONSE.CODE && action.response.RESPONSE.CODE == 200) {
                respdata = action.response.RESPONSE.DATA;
            }
            return {
                ...state, ...{
                    listdata: respdata,
                    mbrReqStatus: 200
                }
            }
            break;
        case 'RECIEVE_TICKET_DETAILS':
            var respdata = [];
            if (action && action.response) {
                respdata = action.response;
            }
            return {
                ...state, ...{
                    TicketResponse: respdata,
                }
            }
            break;
        case 'RECIEVE_TICKET_DETAILS_PAST':
            var respdata = [];
            if (action && action.response) {
                respdata = action.response;
            }
            return {
                ...state, ...{
                    TicketResponsePAST: respdata,
                }
            }
            break;
        case 'RECIEVE_TICKET_FEEDBACK':
            var respdata = [];
            if (action && action.response) {
                respdata = action.response;
            }
            return {
                ...state, ...{
                    ticketFeedback: respdata,
                }
            }
            break;
        case 'RECIEVE_TICKET_ISSUE':
            var respdata = [];
            if (action && action.response) {
                respdata = action.response;
            }
            return {
                ...state, ...{
                    tickerIssueFeedBack: respdata,
                }
            }
            break;
        case 'FEED_BACK_TICKET_PARAM':
            var respdata = [];
            if (action && action.feedBackParam) {
                respdata = action.feedBackParam;
            }
            return {
                ...state, ...{
                    feedbackParamUpdateState: respdata,
                }
            }
            break;

        case 'SET_USER_CALLER_ID':
            return {
                ...state, ...{
                    c2c_ID: action.c2cId
                }
            }
        case '4XX_ERROR_HANDLE':
            return {
                ...state, ...{
                    c2cMsg: action.c2cMsg
                }
            }    
        case 'RESET_USER_CALLER_ID':
            return {
                ...state, ...{
                    c2c_ID: ''
                }
            }
            case 'GETDETAILS_MBR':
                var respdata = [];
                return {
                    ...state, ...{
                        mbrdetails: action.response,
                        mbrdetailsResponse:true,
                    }
                } 
                break;
            case 'RECEIVED_RATINGS_MBR':
                {
                    if (action.response) {
                        let sellerid = action.seller_id;
                        var rating = 0;
                        var ratingImgs = ''
                        var ratComment = '';
                        var imgOrg = [], img125 = [], img500 = [], imgId = [], influ = []
                        var res = action.response.Response;
                        if (res && res.Code == "200" && res.Message == 'data found' && typeof res.Data.rating_list != 'undefined' && res.Data.rating_list != 'undefined' && res.Data.rating_list != null) {
                            var arr = res.Data.rating_list;
                            rating = Object.keys(arr).reduce(function (a, b) { return arr[a] > arr[b] ? a : b });  // get maximum index 
                            ratingImgs = (arr[rating] && arr[rating].RATING_IMGS != "null") ? JSON.parse(arr[rating].RATING_IMGS) : ''
                            influ = (arr[rating] && arr[rating].RATING_INFLU_PARAMS != "null") ? JSON.parse(arr[rating].RATING_INFLU_PARAMS) : ''
                            ratComment = (arr[rating] && arr[rating].GLUSR_RATING_COMMENTS) ? arr[rating].GLUSR_RATING_COMMENTS : ''
                            rating = (arr[rating] && typeof (arr[rating].GLUSR_RATING_VALUE) != 'undefined') ? arr[rating].GLUSR_RATING_VALUE : 0;
                        }
                        if (ratComment) {
                            try {
                                ratComment = decodeURIComponent(ratComment);
                            } catch {
    
                            }
                        }
                        if (ratingImgs) {
                            ratingImgs = Object.values(ratingImgs);
                            for (let i = 0; i < ratingImgs.length; i++) {
                                imgOrg.push(ratingImgs[i].IMG_DOC_PATH);
                                img125.push(ratingImgs[i].IMG_DOC_125X125);
                                img500.push(ratingImgs[i].IMG_DOC_500X500);
                                imgId.push(ratingImgs[i].IMG_ID);
                            }
                        }
                        return {
                            ...state, ...{
                                userRating: rating,
                                ratingFetched: true,
                                ratingImage: img125,
                                ratingImageOrg: imgOrg,
                                ratingImage500: img500,
                                imgId: imgId,
                                influ: influ,
                                ratComment: ratComment,
                                seller_id: sellerid,
                            }
                        };
                    }
                    else
                    return {
                        ...state, ...{
                            ratingFetched: false,
                            seller_id: '',
                            userRating: 0,
                            ratingFetched: false,
                            ratingImage: state.ratingImage,
                            ratingImageOrg: '',
                            ratingImage500: '',
                            imgId: '',
                            influ: '',
                            ratComment: '',
                            seller_id: ''
                        }
                    }
                }
            case 'RESET_RATINGS_MBR':
                {
                    return {
                        ...state, ...{
                            userRating: 0,
                            ratingFetched: false,
                            ratingImage: state.ratingImage,
                            ratingImageOrg: '',
                            ratingImage500: '',
                            imgId: '',
                            influ: '',
                            ratComment: '',
                            seller_id: ''
                        }
                    };
                }
            case 'RECEIVED_RATINGS_MBR_PROPS':
                {
                    return {
                        ...state, ...{
                            imgId: action.imgId,
                            influ: action.influ,
                            ratComment: action.ratComment,
                            ratingImage: action.ratingImage,
                            ratingImage500: action.ratingImage500,
                            ratingImageOrg: action.ratingImageOrg,
                            userRating: action.userRating,
                        }
                    };
                }
            case 'SUBMITTED_RATINGS_MBR_PROPS':
                {
                    if (action.seller_id_rating)
                        return {
                            ...state, ...{
                                seller_id_rating: action.seller_id_rating,
                                rating_submitted_mbr: true,
                            }
                        };
                    else return {
                        ...state, ...{
                            seller_id_rating: '',
                            rating_submitted_mbr: false,
                        }
                    };
                }
            case 'IS_DISPLAY_RATINGS_MBR':
                {
                    var isDisplay = action && action.response && action.response.response && action.response.response.rating_details && action.response.response.rating_details.is_rating_display ? action.response.response.rating_details.is_rating_display : '';
                    if (action.seller_id_rating && isDisplay)
                        return {
                            ...state, ...{
                                is_display_hit: true,
                                seller_id_rating: action.seller_id_rating,
                                is_display: isDisplay,
                            }
                        };
                    else return {
                        ...state, ...{
                            is_display_hit: false,
                            seller_id_rating: '',
                            rating_submitted_mbr: false,
                        }
                    };
                }
            case 'RESET_IS_DISPLAY_RATINGS_MBR':
                {
                    return {
                        ...state, ...{
                            is_display_hit: false,
                            seller_id_rating: '',
                            rating_submitted_mbr: false,
                        }
                    };
                }
        case 'DELETE_MBR':
            var respdata = [];
            if (action.response.RESPONSE != undefined && action.response.RESPONSE.CODE != undefined && action.response.RESPONSE.CODE == 200) {
                resp = 'success';
            } else {
                resp = 'fail';
            }
            return {
                ...state, ...{
                    mbrdeleteResp: resp
                }
            }
            break;
        case 'DELETE_MBR_ERR':
            var respdata = [];
            return {
                ...state, ...{
                    mbrdeleteErr: "error"
                }
            }
            break;
        case 'MORESUPPLIER_MBR':
            var respdata = [];
            if (action.response.RESPONSE != undefined && action.response.RESPONSE.CODE != undefined && action.response.RESPONSE.CODE == 200) {
                resp = 'success';
            } else {
                resp = 'fail';
            }
            return {
                ...state, ...{
                    needSuppResp: resp
                }
            }
            break;
        //GET_CONT_DETAILS,RECEIVED_CONT_DETAILS   get_contdetails:{}, received_contdetails:false
        case 'GET_CONT_DETAILS':
            var res = (action.response) ? action.response : '';
            //var res = (action.response)?action.response.Response.Data:'';
            return {
                ...state, ...{
                    get_contdetails: res,
                    received_contdetails: true,
                    isReqCancld: false
                }
            };
            break;
        case 'FAILED_CONT_DETAILS':
            return {
                ...state, ...{
                    isReqCancld: (action.error && typeof (action.error.isMsgMod) != 'undefined') ? action.error.isMsgMod : false
                }
            };

            break;
        case 'GET_BUYER_PROFILE':
            var res = (action.response) ? action.response: '';
            //var res = (action.response)?action.response.Response.Data:'';
            return {
                ...state, ...{
                    get_buyer_details: res,
                    received_buyer_details: true,
                    isReqCancld: false
                }
            };
            break;

        case 'FAILED_BUYER_PROFILE':
            return {
                ...state, ...{
                    isReqCancld: (action.error && typeof (action.error.isMsgMod) != 'undefined') ? action.error.isMsgMod : false
                }
            };

        case 'REQUEST_MSGDETAIL':
            var msgs = [], qId='',qType='',pname, mcat_name = '', mcat_id = '';
            if (!action.morerows) {
                msgs = [];
                qId = ''
                qType = ''
                pname = ''
            } else {
                msgs = state.message_Detail;
                qId = state.last_transaction_id;
                qType = state.query_Type;
                pname = state.last_transaction_prodName;
                mcat_name = state.last_mcat_name
                mcat_id = state.last_mcat_id
            }
            var ups = {
                ...state, ...{
                    isFetching: true,
                    isFetchingmsgdetail: true,
                    message_Detail: msgs,
                    isReqCancld: false,
                    isRatingDisplay: false,
                    last_transaction_id: qId,
                    query_Type : qType,
                    last_transaction_prodName: pname,
                    last_mcat_name: mcat_name,
                    last_mcat_id: mcat_id
                }
            };
            return ups;

        case 'RECEIVE_MSGDETAIL':
            if (!action.response) {
                return {
                    ...state, ...{
                        message_Detail: '',
                        isloadedList: true,
                        from: from,
                        to: to,
                        isFetching: false,
                        isFetchingmsgdetail: false,
                        resCode: 503,
                        hasMoreItems: false,
                        isReqCancld: (action.error && typeof (action.error.isMsgMod) != 'undefined') ? action.error.isMsgMod : false

                    }
                };
            }
            //state.last_transaction_type=action.response.response.last_transaction_type;
            var updatedArray = action.response.response.result, from, to;
            if (!action.morerows) {
                state.message_Detail = [];
                state.from = 0;
                state.to = 30;
            }
            var res = action.response.response.result;
            if (Array.isArray(res)) {
                updatedArray = (state.message_Detail).concat(res)
            }
            else if (action.response.code == 204) {
                updatedArray = (state.message_Detail);
            }
            else {
                updatedArray: [];
            }
            //     if(action.morerows){
            //     from=state.to + 1;
            //     to=state.to + 30;
            // } else {
            //  from=0;
            //     to=30;
            // }

            from = state.to + 1;
            to = state.to + 30;

            if (action.start == 0) {
                let ls = JSON.parse(localStorage.getItem('reply_details'));
                if (ls) {
                    for (let property in ls) {
                        if (ls[property].glid == action.contact_glid && ls[property].reply_id && ls[property].reply_id != updatedArray[0].msg_ref_id && ls[property].reply_id > updatedArray[0].msg_ref_id) {
                            var date = new Date();
                            date = " " + (date.getDate()) + "-" + (date.getMonth() + 1) + "-" + (date.getYear() + 1900) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            var replyObj = {
                                "msg_alignment": "right",
                                "msg_attach1": '',
                                "msg_attach1_url": '',
                                "msg_attach2": "",
                                "msg_attach2_url": "",
                                "msg_attach3": "",
                                "msg_attach3_url": "",
                                "msg_attach4": "",
                                "msg_attach4_url": "",
                                "msg_call_caller_number": "",
                                "msg_call_duration": "",
                                "msg_call_receiver_number": "",
                                "msg_call_status": "",
                                "msg_date": date,
                                "msg_isq": "",
                                "msg_mcat_id": "",
                                "msg_prod_image_url": "",
                                "msg_prod_name": "",
                                "msg_query_id": 1,
                                "msg_query_type": 'C',
                                "msg_read_status": "",
                                "msg_receiver_id": action.contact_glid,
                                "msg_ref_id": ls[property].reply_id,
                                "msg_ref_type": "REPLY",
                                "msg_remind_date": "",
                                "msg_sender_id": action.user_glid,
                                "msg_sub": '',
                                "msg_text": ls[property].msg,
                            };


                            var msgDetail = (updatedArray) ? updatedArray.reverse() : [];
                            msgDetail = msgDetail.concat(replyObj);
                            msgDetail = msgDetail.reverse();
                            updatedArray = msgDetail;
                        }
                    }
                }
            }

            return {
                ...state, ...{
                    message_Detail: updatedArray,
                    isloadedList: true,
                    from: from,
                    to: to,
                    isFetching: false,
                    isFetchingmsgdetail: false,
                    resCode: action.response.code,
                    hasMoreItems: (updatedArray && updatedArray.length > 0 && action.response.code !== 204) ? (updatedArray.length < action.response.response.total_count) : false,
                    isReqCancld: (action.error && typeof (action.error.isMsgMod) != 'undefined') ? action.error.isMsgMod : false,
                    last_transaction_refid: (action.response.response.last_transaction_refid) ? action.response.response.last_transaction_refid : '',last_transaction_prodName: action.response.response.last_transaction_prodName ? action.response.response.last_transaction_prodName: '',
                    last_mcat_id: action.response.response.last_mcat_id ? action.response.response.last_mcat_id : '',
                    last_transaction_id: (action.response.response.last_transaction_id) ? action.response.response.last_transaction_id : '',
                    last_transaction_type: (action.response.response.last_transaction_type) ? action.response.response.last_transaction_type : '',
                }
            };
            
            if (document.getElementsByClassName('lh18 crb por wr msgCn pd10 eqright b-dot')[0]) document.getElementsByClassName('lh18 crb por wr msgCn pd8 eqright fr b-dot')[0].remove();
            break; 

        case 'REQUEST_ORDERGENERATE':
            return {
                ...state, ...{
                    isfetchingOrderDetail: true,
                }
            };

        case 'RECIEVE_ORDERGENERATE':
            var res = (action.response.code == 200) ? action.response.order_id : '';
            return {
                ...state, ...{
                    orderId: res,
                    isfetchingOrderDetail: false,
                }
            };

        case 'REQUEST_ENRICHORDER':
            return {
                ...state, ...{
                    isfetchingOrderDetail: true,
                }
            };

        case 'RECIEVE_ENRICHORDER':
            var enrichRes=false;
            var errorMsg='';
            if (action.response.code == 200) {
                enrichRes=true
            }
            else{
                errorMsg=action.response.message;
            }
            return {
                ...state, ...{
                    enrichOrder: enrichRes,
                    isfetchingOrderDetail: false,
                    errorhandle:errorMsg,
                }
            };

        case 'RESET_ERROR':
            return{
                ...state,...{
                    errorhandle:false,
                }
            };

        case 'REQUEST_FINISHORDER':
            return {
                ...state, ...{
                    isfetchingOrderDetail: true,
                }
            };

        case 'RECIEVE_FINISHORDER':
            if (action.response.code == 200) {
                return {
                    ...state, ...{
                        finishOrder: true,
                        isfetchingOrderDetail: false,
                    }
                }
            }    

        case 'REQUEST_GETORDERDETAIL':
                return {
                    ...state,...{
                        isfetchingOrderDetail:true
                    }
                };     
            
        case 'RECIEVE_GETORDERDETAILS':
                var res=(action.response) ? action.response: '';   
                return {
                    ...state,...{
                        orderDetail:res,
                        cancelOrderRes:'',
                        recievedOrderDetail:true,
                        isfetchingOrderDetail:false
                    }
                }; 

        case 'RESET_CANCEL_ORDER_RES':
            return {
                ...state, ...{
                    cancelOrderRes: false,
                }
            };

        case 'RESET_ORDER_DETAIL':
            return {
                ...state, ...{
                    orderDetail: '',
                    recievedOrderDetail: false,
                    productDetail:''
                }
            };
            
        case 'REQUEST_DISPOSITION_LIST':
            return{
                ...state,...{
                    isfetchingOrderDetail:true
                }
            }  
            
            
        case 'RECIEVE_DISPOSITION_LIST':
            var res=(action.response) ? action.response: '';  
            return{
                ...state, ...{
                    dispositionList:res,
                    isfetchingOrderDetail:false
                }
            };   
            
        case 'REQUEST_CANCEL_ORDER':
            return{
                ...state,...{
                    isfetchingOrderDetail:true
                }
            }    
            
        case 'RECIEVE_CANCEL_ORDER':
                var res=(action.response) ? action.response: '';  
                return{
                    ...state, ...{
                        cancelOrderRes:res,
                        isfetchingOrderDetail:false
            
                    }
                };  
                
        case 'MSG_PRODETAIL':
            var res=(action.response)?action.response:'';
            window.isFetchingProdDetail = false
            return{
                ...state, ...{
                    productDetail:res
                }
            }   
                        
                
        case 'REQUEST_SEND_REPLYY': ;
            return state;
        case 'LISTING_REPLY_RESET':
            var res = {
                ...state, ...{
                    listingReplySent: 0
                }
            };
            return res;
        case 'SET_PRIVACY_SETTING_ID':
            var res = {
                ...state, ...{
                    privacyId: action.id
                }
            };
            return res;
        case 'SET_PRIVACY_SETTING':
            var res = {
                ...state, ...{
                    userPrivacy: true
                }
            };
            return res;
        case 'LISTING_REPLY_RESPONSE':
            var res = {
                ...state, ...{
                    listingReplySent: 1,
                    listReplyData: action.reply.REPLY_ID
                }
            };
            return res;

        case 'LISTING_REPLY_FAIL':
            var res = {
                ...state, ...{
                    listingReplySent: 2
                }
            };
            return res;

        case 'FAILED_REPLY':
            var res = {
                ...state, ...{
                    replyFailed: true
                }
            };
            return res;

        case 'RESPONSE_GET_LIST':
            var updatedState = {
                ...state, ...{
                    messages: action.new_list,
                }
            };
            return updatedState;

        case 'RESPONSE_GET_NEW_LIST':
            var updatedState = {
                ...state, ...{
                    messages: action.new_contact_list,
                }
            };
            return updatedState;
        case 'SET_VERIFICATION_STATUS' :
            var status = state.verifydata
            var status2 = state.verifyDetails ?state.verifyDetails.Data :''
            if(status && status[action.id] && status[action.id].Status){
                status[action.id].Status = 'Verified';
            }
            if(status2 && status2[action.id] && status2[action.id].Status){
                status2[action.id].Status = 'Verified';
            }
            var res = {
                ...state, ...{
                    verifydata : status,
                    primaryMob : action.id == 121 ? true : '',
                    secondaryMob : action.id == 48 ? true : '',
                    primaryEmail : action.id == 109 ? true : '',
                    secondaryEmail : action.id == 157 ? true : ''
                }
            };
            return res;
        case 'REQUEST_SEND_REPLYY_HOME':
           
            var res={
                ...state,...{
                    bubbleLoader:action.key,
                } 
            };
            
            return res;
        case 'RESPONSE_SEND_REPLYY_HOME': 
        let arrList = [];
            if(action.replySentarr){
                arrList=action.replySentarr;
            }
            arrList[arrList.length]=action.key;
            let replyList=[];
            if(action.prevReply){
                replyList=action.prevReply;
            }
            replyList[action.key]=action.replyText;
            var res={
                ...state,...{
                    replySentCom:arrList,
                    bubbleLoader:false,
                    replyText:replyList,
                
                }
            }
           
            return res;
        case 'SEND_REPLYY_HOME_FAIL':
            var res={
                ...state,...{
                    bubbleLoader:false,
                    failFlag:action.key,

                }
            }
            return res;
        case 'ENQBL_UPDATE_ENQUIRY_SENT_MESSAGE':
            var res={
                ...state,...{
                    singleClickUpdate:action.success,
                    isAPiHit:true
                }
            }
            return res;    
        case 'RESPONSE_SEND_REPLYY':
            var date = new Date();
            date = " " + (date.getDate()) + "-" + (date.getMonth() + 1) + "-" + (date.getYear() + 1900) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var res = action.reply;
            var xmppData = action.subject?action.subject:''; // Temperory handling of XMPP Packets
            var replyObj = {
                "is_ask_for_review_initiated": action.is_ask_for_review_initiated ? action.is_ask_for_review_initiated : '',
                "message_id":xmppData['message_id']?xmppData['message_id']:'',
                "msg_alignment": xmppData['msg_alignment']? xmppData['msg_alignment'] :(action.alignment) ? action.alignment : "right",
                "msg_attach": xmppData['msg_attach'] ? xmppData['msg_attach'] : (action.attach_array) ? action.attach_array: [],
                "msg_attach1": (action.attach1) ? action.attach1: '',
                "msg_attach1_url": (action.msg_attach1_url) ? action.msg_attach1_url: '',
                "message_product_img_variants":xmppData['message_product_img_variants']?xmppData['message_product_img_variants']:action.productImgUrl?action.productImgUrl:'',
                "msg_attach2": "",
                "msg_attach2_url": "",
                "msg_attach3": "",
                "msg_attach3_url": "",
                "msg_attach4": "",
                "msg_attach4_url": "",
                "msg_call_caller_number": xmppData['msg_call_caller_number']?xmppData['msg_call_caller_number']:"",
                "msg_call_duration": xmppData['msg_call_duration']?xmppData['msg_call_duration']:"",
                "msg_call_receiver_number": xmppData['msg_call_receiver_number']?xmppData['msg_call_receiver_number']:"",
                "msg_call_status": xmppData['msg_call_status']?xmppData['msg_call_status']:"",
                "msg_date": xmppData['msg_date']?xmppData['msg_date']:date,
                "msg_isq": "",
                "msg_mcat_id": xmppData['msg_mcat_id']?xmppData['msg_mcat_id']:"",
                "msg_mcat_name": xmppData['msg_mcat_name']?xmppData['msg_mcat_name']:"",
                "msg_prod_image_url": "",
                "msg_modref_id":xmppData['msg_modref_id']?xmppData['msg_modref_id']:"",
                "msg_prod_name": xmppData['msg_prod_name']?xmppData['msg_prod_name']:"",
                "message_ref_modid":xmppData['message_ref_modid']?xmppData['message_ref_modid']:'',
                "msg_query_id": xmppData['msg_query_id']?xmppData['msg_query_id']:action.queryId,
                "msg_query_type": xmppData['msg_query_type']?xmppData['msg_query_type']:action.queryType,
                "msg_read_status": xmppData['msg_read_status']?xmppData['msg_read_status']:"",
                "msg_receiver_id": action.rGlid,
                "msg_ref_id": xmppData['msg_ref_id']?xmppData['msg_ref_id']:(action.msg_reply_id) ? action.msg_reply_id :res && res.REPLY_ID,
                "msg_ref_type": xmppData['msg_ref_type']?xmppData['msg_ref_type']:action.msg_ref_type?action.msg_ref_type:"REPLY",
                "msg_remind_date": "",
                "msg_sender_id": xmppData['from']?xmppData['from']:action.sGlid,
                "msg_sub": action.subject,
                "msg_text_json": xmppData['msg_text_json']?xmppData['msg_text_json']:JSON.stringify({message_text:action.msg.replace(/\n/g, "<br />"),isq:null,enrichment:null,additional_details:null}),
                "local_date":true,
                "rating_influ_parameter":xmppData['rating_influ_parameter']?xmppData['rating_influ_parameter']:'',
                "rating_value":xmppData['rating_value']?xmppData['rating_value']:'',
                "show_order_now":xmppData['show_order_now']?xmppData['show_order_now']:'',
                "std_prod_id":xmppData['std_prod_id']?xmppData['std_prod_id']:''
            };

            var updatedDetail = (state.message_Detail != undefined) ? state.message_Detail.reverse() : [];
            if (action.alignment == "left") {
                for (i = 0; i < updatedDetail.length; i++) {
                    updatedDetail[i].msg_read_status = "-1";
                }
            }
            updatedDetail = updatedDetail.concat(replyObj);
            updatedDetail = updatedDetail.reverse();
            var updatedState = {
                ...state, ...{
                    message_Detail: updatedDetail,
                    replySent: true,
                }
            };
            if (document.getElementsByClassName('lh18 crb por wr msgCn padd8 eqright fr b-dot')[0]) document.getElementsByClassName('lh18 crb por wr msgCn padd8 eqright fr b-dot')[0].remove();
            return updatedState;
            case 'UPDATE_RATING_BOX':
                let internalGlids = ['71157313', '39174173', '909543', '14321376'];
                let glid = getCookieValByKey("ImeshVisitor","glid");
                var updatedDetail = (state.message_Detail != undefined) ? state.message_Detail.reverse() : [];
                if(updatedDetail && updatedDetail.length > 0 && !internalGlids.includes(glid))
                for (i = 0; i < updatedDetail.length; i++) {
                    if(updatedDetail[i].msg_ref_type == "FEEDBACK" && updatedDetail[i].msg_alignment=="right"){
                        updatedDetail.splice(i, 1);
                        break;
                    }
                }
                updatedDetail = updatedDetail.concat(action.replyObj);                 
                updatedDetail = updatedDetail.reverse();
                var updatedState = {
                    ...state, ...{
                        message_Detail: updatedDetail,
                    }
                };
                return updatedState;
            case 'ONE_TAP_REPLY':
                var date = new Date();
                date = " " + (date.getDate()) + "-" + (date.getMonth() + 1) + "-" + (date.getYear() + 1900) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                var res = action.reply;
                var replyObj = {
                    "msg_alignment": (action.alignment) ? action.alignment : "right",
                    "msg_attach": (action.attach_array) ? action.attach_array: [],
                    "msg_attach1": (action.attach1) ? action.attach1: '',
                    "msg_attach1_url": (action.msg_attach1_url) ? action.msg_attach1_url: '',
                    "msg_attach2": "",
                    "msg_attach2_url": "",
                    "msg_attach3": "",
                    "msg_attach3_url": "",
                    "msg_attach4": "",
                    "msg_attach4_url": "",
                    "msg_call_caller_number": "",
                    "msg_call_duration": "",
                    "msg_call_receiver_number": "",
                    "msg_call_status": "",
                    "msg_date": date,
                    "msg_isq": "",
                    "msg_mcat_id": "",
                    "msg_prod_image_url": "",
                    "msg_prod_name": "",
                    "msg_query_id": action.queryId,
                    "msg_query_type": action.queryType,
                    "msg_read_status": "",
                    "msg_receiver_id": action.rGlid,
                    "msg_ref_id": (action.msg_reply_id) ? action.msg_reply_id : res.REPLY_ID,
                    "msg_ref_type": "REPLY",
                    "msg_remind_date": "",
                    "msg_sender_id": action.sGlid,
                    "msg_sub": action.subject,
                    "msg_text": action.msg?action.msg.replace(/\n/g, "<br />"):'',
                    "isQuantityMsg": action.isQuantityMsg ? action.isQuantityMsg : false,
                };
                var updatedDetail = (state.message_OneTap != undefined) ? state.message_OneTap.reverse() : [];
                if (action.alignment == "left") {
                    for (i = 0; i < updatedDetail.length; i++) {
                        updatedDetail[i].msg_read_status = "-1";
                    }
                }
                updatedDetail = updatedDetail.concat(replyObj);
                updatedDetail = updatedDetail.reverse();
                var updatedState = {
                    ...state, ...{
                        message_OneTap: updatedDetail,
                        lastReply: true,
                    }
                };
                if (document.getElementsByClassName('lh18 crb por wr msgCn pad8 eqright fr b-dot')[0]) document.getElementsByClassName('lh18 crb por wr msgCn pad8 eqright fr b-dot')[0].remove();
                if (document.getElementsByClassName('lh18 crb por wr msgCn pad8 enqright bgw fr b-dot')[0]) document.getElementsByClassName('lh18 crb por wr msgCn pad8 enqright bgw fr b-dot')[0].remove();    
                return updatedState;    

    	case 'RECEIVE_RATING_IMAGE':
            var res1 = action.msg_attach1_url ? action.msg_attach1_url: []
            var res2 = action.msg_attach1_url ? action.msg_attach2_url: []
            var res3 = action.msg_attach1_url ? action.msg_attach3_url: []
            var image_id = action.imageId
            var updatedImage1 = (state.ratingImage != undefined) ? state.ratingImage.concat(res1) : []
            var updatedImage2 = (state.ratingImageOrg != undefined) ? state.ratingImageOrg.concat(res2) : []
            var updatedImage3 = (state.ratingImage500 != undefined) ? state.ratingImage500.concat(res3) : []    
            var updatedId = (state.imgId != undefined) ? state.imgId.concat(image_id) : []      
            var ups = {
                ...state, ...{
                    ratingImage: updatedImage1,
                    ratingImageOrg : updatedImage2,
                    ratingImage500 : updatedImage3,
                    imgId : updatedId
                }
            };
            return ups;
        case 'REMOVE_RATING_IMAGE':
            var ups = {
                ...state, ...{
                    ratingImage: action.img125,
                    ratingImageOrg: action.imgOrg,
                    ratingImage500: action.img500,
                    imgId : action.imagesId
                }
            };
            return ups;
        case 'RESET_RATING_IMAGE': 
            var ups = {
                ...state, ...{
                    ratingImage: [] ,
                    ratingImageOrg: [] ,
                    ratingImage500: [],
                    imgId : []
                }
            };
            return ups;
        case 'RESET_IMG_ERR':
            var ups = {
                ...state, ...{
                    imgUpldErr: false,
                    imgUpldErrReason:''
                }
            };
            return ups;
        case 'RESET_REPLY_STATUS':
            var ups = {
                ...state, ...{
                    replyFailed: false,
                }
            };
            return ups;
        case 'REQUEST_GET_GST':
            var ups = {
                ...state, ...{
                    gstdata: "",
                    errGst: '',
                    addgstErr: ''
                }
            };
            return ups;

        case 'GET_GST_SUCCESS':
            var ups = {
                ...state, ...{
                    gstdata: action.response.Response.Code == 200 && action.response.Response.Data ? action.response.Response.Data : "",
                    errGst: action.response.Response.Code != 200 ? action.response.Response.Data.Message : ''
                }
            };
            return ups;


        case 'GET_GST_FAILURE':
            return state;

        case 'REQUEST_ADD_GST':
            var ups = {
                ...state, ...{
                    addgst: '',
                    addgstErr: ''
                }
            };
            return ups;

        case 'ADD_GST_SUCCESS':

            var ups = (action.type && action.type == 'menu') ? {
                ...state, ...{
                    addgstMenu: action.response.CODE == 200 ? action.response : '',
                    addgstErrMenu: action.response.CODE == 500 ? action.response.MESSAGE : ''
                }
            } : {
                    ...state, ...{
                        addgst: action.response.CODE == 200 ? action.response : '',
                        addgstErr: action.response.CODE == 500 ? action.response.MESSAGE : ''
                    }
                };
            return ups;


        case 'ADD_GST_FAILURE':
            return state;
        
        case 'REQUEST_ADD_PAN':
            var ups = {
                ...state, ...{
                    addpan: '',
                    addpanErr: ''
                }
            };
            return ups;

        case 'ADD_PAN_SUCCESS':

            var ups = {
                    ...state, ...{
                        addpan: action.response && action.response.CODE == 200 ? action.response : '',
                        addpanErr: action.response && action.response.CODE == 500 ? action.response.MESSAGE : ''
                    }
                };
            return ups;


        case 'ADD_PAN_FAILURE':
            return state;

        case 'REQUEST_ADD_CIN':
            var ups = {
                ...state, ...{
                    addcin: '',
                    addcinErr: ''
                }
            };
            return ups;

        case 'ADD_CIN_SUCCESS':

            var ups = {
                    ...state, ...{
                        addcin: action.response && action.response.CODE == 200 ? action.response : '',
                        addcinErr: action.response && action.response.CODE == 500 ? action.response.MESSAGE : ''
                    }
                };
            return ups;


        case 'ADD_CIN_FAILURE':
            return state;

        case 'RECEIVE_VERIFICATION':
            var res = {
                ...state, ...{
                    verifyuserdata: (action && action.response &&  action.response.Response == null) ? action.response.glusr_disabled_reason : '',
                    verifydata: (action &&  action.response && action.response.Response && action.response.Response.Code == 200) ? action.response.Response.Data : '',

                }
            };

            return res;
        case 'RECEIVE_UPLOADIMAGE':
            var ups = {
                ...state, ...{
                    imgpath: ((action && action.response != null && action.response.Code == 200 && action.response.Data != null && action.response.Data.AwsPath != null && action.response.Data.AwsPath.Image_Original_Path != null) ? action.response.Data.AwsPath.Image_Original_Path : ''),
                    imgUpldErr: (action && action.response != null && action.response.Code != 200) ? true : false,
                    imgUpldErrReason: (action && action.response != null && action.response.Code != 200 && action.response.Reason) ? action.response.Reason : ''
                }
            };
            return ups;
        case 'GET_RECENTRELATEDMCATS':
            var data = action.result;

            var res = {
                ...state, ...{
                    get_recentrelatedmcats: data,
                    results_loading: true

                }
            };
            return res;
        case 'GET_RECENTRELATEDMCATS_FAIL':
            return state

        case 'GET_LATESTBUYLEADS':
            var data = action.result;

            var res = {
                ...state, ...{
                    get_latestenqbls: data.RESPONSE,
                    searches_loading: true
                }
            };
            return res;

        case 'GET_LATESTBUYLEADS_FAIL':
            return state;
        //abhishek
        case 'GET_RELATEDMCAT':
            var data = {};
            if (action.result["RECOMMENDED MCAT DATA"]) {
                data = action.result;
            }
            var res = {
                ...state, ...{
                    get_relatedmcat: data,
                    searches_loading: true,
                    updatecats: true,
                }
            };
            return res;
        case 'GET_RELATEDMCAT_FAIL':
            var data = action.result;
            var res = {
                ...state, ...{
                    updatecats: true,
                }
            };

            return res
        case 'GET_PREMIUM_BRANDS':

            var data = action.result;
            if (data.code == 200) {
                var res = {
                    ...state, ...{
                        premium_brands: data,
                        updatebrands: true,
                    }
                };

            } else {

                var res = {
                    ...state, ...{
                        getbrands: false,
                        updatebrands: true,
                    }
                };

            }

            return res;
        case 'GET_PREMIUM_BRANDS_FAIL':

            var res = {
                ...state, ...{
                    updatebrands: true,
                    getbrands: false,
                }
            };

            return res





        //hsingh
        case 'GET_RELATEDPRODUCTS':
            if (action.result["RECOMMENDED DATA"] && !action.result["RECOMMENDED DATA"]["Response"] || action.result["Data"]) {
                var data = action.result;
                /*concat data with existing info*/
                if (location.pathname.indexOf('proddetail') == -1 && location.pathname !== "/isearch.php" && state.get_relatedproducts && state.get_relatedproducts["RECOMMENDED DATA"]) {
                    let new_states = (action.result["RECOMMENDED DATA"]).concat(state.get_relatedproducts["RECOMMENDED DATA"])
                    data["RECOMMENDED DATA"] = new_states;
                }
                if (location.pathname.indexOf('proddetail') == -1 && data["RECOMMENDED DATA"])
                    data["RECOMMENDED DATA"] = data["RECOMMENDED DATA"].concat({ "VIEW_SIMILAR_PRODS": "links" })
                var res = {
                    ...state, ...{
                        get_relatedproducts: data,
                        searches_loading: true,
                        updateprods: true,
                        hitCount: state.hitCount + 1
                    }
                };
            } else {
                var res = {
                    ...state, ...{
                        get_relatedproducts: {},
                        searches_loading: true,
                        updateprods: true,
                        hitCount: state.hitCount + 1
                    }
                };
            }
            return res;

        case 'GET_RELATEDPRODUCTS_FAIL':
            var data = {};
            if (state.get_relatedproducts) {
                let new_states = state.get_relatedproducts["RECOMMENDED DATA"]
                data["RECOMMENDED DATA"] = new_states;
            }
            var res = {
                ...state, ...{
                    get_relatedproducts: data,
                    searches_loading: true,
                    updateprods: true,
                }
            };
            return res;


            authenticated

        case 'GET_MORE_RELATEDPRODUCTS':
            var data = action.result;
            var res = {
                ...state, ...{
                    get_more_relatedproducts: data
                }
            };
            return res;

        case 'GET_MORE_RELATEDPRODUCTS_FAIL':
            var data = {};
            var res = {
                ...state, ...{
                    get_more_relatedproducts: data
                }
            };
            return res;

        case 'GET_MORE_RELATEDPRODUCTS_MESSAGES':
            var data = action.result;
            var displayID = action.edisplayID;
            var res = {
                ...state, ...{
                    get_more_relatedproducts_messages: {...state.get_more_relatedproducts_messages,[displayID]: data}
                }
            };
            return res;

        case 'GET_SELLERNEARME':
            var data = action.result;
            var res = {
                ...state, ...{
                    get_sellernearme: data
                }
            };
            return res;

        case 'GET_SELLERNEARME_FAIL':
            var data = {};
            var res = {
                ...state, ...{
                    get_sellernearme: data
                }
            };
            return res;



        case 'REL_PRODS_UPDATE':
            var res = {
                ...state
            };
            return res;

        case 'GET_INVOICEBANNER':
            var data = action.result;
            var res = {
                ...state, ...{
                    get_invoicebanner: data.Response
                }
            };
            return res;

        case 'GET_INVOICEBANNER_FAIL':
            return state;

        case 'GET_CITY_RECOMMENDED_MCAT':
            var res = {
                ...state, ...{
                    service_response: data
                }
            };
            return res;

        case 'GET_CITY_RECOMMENDED_MCAT_FAIL':
            return state;

        case 'GET_RECOMMENDED_CAT':
            var data = action.result;
            if (data.code == 200) {
                var res = {
                    ...state, ...{
                        recommended: action.result.mcats,
                        updatemcats: true,
                    }
                };

            } else {
                var res = {
                    ...state, ...{
                        getmcats: false,
                        updatemcats: true,
                    }
                };

            }

            return res;
        case 'GET_RECOMMENDED_CAT_FAIL':
            var res = {
                ...state, ...{
                    updatebrands: true,
                    updatemcats: true,
                }
            };
            return res;
        case 'GET_RECOMMENDED_SEARCH_CAT':
            var data = action.result;
            if (data && data.code == 200) {
                var res = {
                    ...state, ...{
                        recommendedSearch: action.result.mcats,
                    }
                };
            } 
            return res;

        case 'REQUEST_ADDRESS_DETECT':
            return state

        case 'RECEIVE_ADDRESS_DETECT':
            var res = {
                ...state, ...{
                    addressdata: (action.response && action.response.CODE == 200) ? action.response : ''
                }
            };
            return res;
        case 'REQUEST_VERIFY_DETAILS':
            var details = {
                ...state, ...{
                    userreauth: '',
                    verifyDetails: ''
                }
            };
            return details;

        case 'RECEIVE_VERIFY_SUCCESS':
            var details = {
                ...state, ...{
                    verifyDetails: action.response.Response,
                }
            };
            return details;

        case 'REQUEST_VERIFY_EMAIL_WITHOUT_OTP':
            var details = {
                ...state, ...{
                    verifygmailotp: '',
                }
            };
            return details;

        case 'RECEIVE_SUCEESS_VERIFY_EMAIL_WITHOUT_OTP':
            var details = {
                ...state, ...{
                    verifygmailotp: action.response,
                }
            };
            return details;

        case 'GET_STD_PRODUCTS':
            var data = action.result;
            if (data.CODE == 200) {
                var res = {
                    ...state, ...{
                        stdproducts: data.DATA,
                        //   updatebrands : true,
                    }
                };

            } else {
                var res = {
                    ...state, ...{
                        stdproducts: []
                    }
                };
            }
            return res;
        case 'GET_STD_PRODUCTS_FAIL':
            return state


        case 'REQUEST_GST_DISPOSITION_UPDATE':
            var ups = {
                ...state, ...{
                    gstDispUpdate: '',
                    gstDispUpdateErr: ''
                }
            };
            return ups;


        case 'RECEIVE_GST_DISPOSITION_UPDATE':
            var ups = {
                ...state, ...{
                    gstDispUpdate: action.response.CODE == 200 ? action.response : '',
                    gstDispUpdateErr: action.response.CODE == 500 ? action.response.MESSAGE : ''
                }
            };
            return ups;


        case 'REQUEST_GST_DISPOSITION_DATA':
            var ups = {
                ...state, ...{
                    gstDispositionRead: '',
                    gstDispositionErr: ''
                }
            };
            return ups;

        case 'RECEIVE_GST_DISPOSITION_DATA':
            let resp = action.response.RESPONSE;
            if (resp.CODE == 200 && localStorage.getItem("GST_Dispositions") == null && resp.Data.length > 0) {
                let gst_disp_date = resp.Data[0].glusr_disposition_add_date.toString();
                let year_gst = gst_disp_date.slice(0, 4);
                let month_gst = gst_disp_date.slice(4, 6) - 1;
                let day_gst = gst_disp_date.slice(6, 8);
                let data = [{
                    Disp_name: resp.Data[0].glusr_disposition,
                    time: new Date(year_gst, month_gst, day_gst).getTime()
                }];
                localStorage.setItem('GST_Dispositions', JSON.stringify(data));
            }
            var ups = {
                ...state, ...{
                    gstDispositionRead: resp.CODE == 200 ? resp : '',
                    gstDispositionErr: resp.CODE == 500 ? resp.MESSAGE : ''
                }
            };
            return ups;



        case 'REQUEST_CITY_SEARCH':
            return {
                ...state, ...{
                    citySearch: ''
                }
            };
            break;

        case 'RECEIVE_CITY_SEARCH':
            var errorMsg = '';
            var res = action.response;
            return {
                ...state, ...{
                    citySearch: res
                }
            };
            break;
        case 'REQUEST_SOIDB_TRACKING':
            var ups = {
                ...state, ...{
                    soidbtracking: ''
                }
            };
            return ups;


        case 'RECEIVE_SOIDB_TRACKING':
            var res = action.response;
            if (action.response.CODE == "200") {
                localStorage.setItem("SOI_LOG_ID", action.response.LOG_ID);
            }
            var ups = {
                ...state, ...{
                    soidbtracking: action.response.CODE == "200" ? action.response : ''
                }
            };
            return ups;

        case 'REQUEST_SOI_DISPOSITION_LIST':
            var ups = {
                ...state, ...{
                    soiDispositonList: ''
                }
            };
            return ups;

        case 'RECEIVE_SOI_DISPOSITION_LIST':
            var ups = {
                ...state, ...{
                    soiDispositonList: action.response.Response.Code == 200 ? action.response.Response.Data : ''
                }
            };
            return ups;
        case 'IS_OTP_MANUALLY_ENTERED':
            {
                if (action.webOTPprefilled)
                    return {
                        ...state, ...{
                            webOTPprefilled: action.webOTPprefilled,
                        }
                    };
                else return {
                    ...state, ...{
                        webOTPprefilled: '',
                    }
                };
            }
        case 'SOI_ORGANIC':
            {   
                if (action) {
                    return {
                        ...state, ...{
                            organicSoiLanding:action.organicSoiLanding
                        }

                    };
                }
                else {
                    return {
                        ...state
                    }
                }
                
            }
        case 'OTP_ERROR':
            var res = {
                ...state, ...{
                    err: 'Invalid OTP'
                }
            };
            return res;

        case 'C2C_TRACKING':

            var res = {
                ...state, ...{
                    trackresponse: ''
                }
            };
            return res;
        case 'REQUEST_C2C_TRACKING':

            var res = {
                ...state, ...{
                    trackresponse: action.response.code == 200 ? action.response.response : ''
                }
            };
            return res;
        case 'REQUEST_C2C_TRACKING_ERROR':
            var res = {
                ...state, ...{
                    err: 'Error'
                }
            }
            return res;

        case 'RECEIVE_BL_NOTICE':

            var buyleadData = action.data;

            var buyLeadList = [];
            var states = [];
            var grpid = '';
            if (action.success) {
                var hasMoreBuyleads, updata, expired_leads_count;
                if (buyleadData.hasOwnProperty('DisplayList') && buyleadData['DisplayList'].length > 0) {
                    buyLeadList = buyleadData.DisplayList;
                    states = buyleadData.states;
                    grpid = buyleadData.grpid;

                }
                let blfSuggestions = {};
                blfSuggestions = { states: states, grpid: grpid, cities: buyleadData['cities'], countries: buyleadData['countries'], categories: buyleadData['categories'] }
                if (state.blfilterSuggestions['categories']) {
                    blfSuggestions['categories'] = (Object.keys(state.blfilterSuggestions['categories']).length > Object.keys(blfSuggestions['categories']).length ? state.blfilterSuggestions['categories'] : blfSuggestions['categories']);
                }
                if (action.locpref != 3 && state.blfilterSuggestions['cities']) {
                    blfSuggestions['cities'] = Object.keys(state.blfilterSuggestions['cities']).length > Object.keys(blfSuggestions['cities']).length ? state.blfilterSuggestions['cities'] : blfSuggestions['cities'];
                }
                else if (action.locpref == 3 && state.blfilterSuggestions['countries']) {
                    blfSuggestions['countries'] = Object.keys(state.blfilterSuggestions['countries']).length > Object.keys(blfSuggestions['countries']).length ? state.blfilterSuggestions['countries'] : blfSuggestions['countries'];
                }

                updata = {
                    ...state, ...{
                        buyleads: buyLeadList,
                        hasMoreBuyleads: false,
                        blResponseCode: 200,
                        blfilterSuggestions: blfSuggestions,
                        success: 0,
                        src: action.source
                    }
                };

            }
            else {
                updata = {
                    ...state, ...{
                        buyleads: buyLeadList,
                        blResponseCode: 200,
                        blfilterSuggestions: blfSuggestions,
                        hasMoreBuyleads: false,
                        success: 0,
                        src: action.source
                    }
                };
            }
            return updata;



        case 'HANDLE_SRCH_FIRST_FOLD':
        if(action.reset=="erase"){
            return {
                ...state, ...{
                    srchFrstFold: false,
                }
            };
        } 
        else if (!action.srchResults) {

                return {
                    ...state, ...{
                        srchFrstFold: false,
                        searchlist: []
                    }
                };

            }
            else {//need to be removed after client clean up.
                return {
                    ...state, ...{
                        searchlist: action.srchResults.results
                    }
                };
            }

        case 'RESET_FILTER_SUGGESTIONS':
            {
                return {
                    ...state, ...{
                        blfilterSuggestions: {}
                    }
                };
            }


        case 'HANDLE_MSG_FIRST_FOLD':
            {
                return {
                    ...state, ...{
                        msgFrstFold: false,
                        messages: action.data.result,
                        loadMoreData : action.data && action.data.result && action.data.result.length == 20 ? true : false
                    }
                };
            }
        case 'RESET_RATINGS':
            {
                return {
                    ...state, ...{
                        userRating: 0,
                        ratingFetched: false
                    }
                };
            }
        case 'REMOVE_CAMERA_ICON':
            {
                return {
                    ...state, ...{
                        isCameraHide: action.isRemove,
                    }
                };
            }

        case 'RECEIVED_RATINGS':
            {
                var rating = 0;
                var ratingImgs = ''
                var ratComment='';
                var imgOrg=[], img125=[], img500=[], imgId =[], influ=[]
                var res = action.response.Response;
                if (res && res.Code == "200" && res.Message == 'data found' && typeof res.Data.rating_list != 'undefined' && res.Data.rating_list != 'undefined' && res.Data.rating_list != null) {
                    var arr = res.Data.rating_list;
                    rating = Object.keys(arr).reduce(function (a, b) { return arr[a] > arr[b] ? a : b });  // get maximum index 
                    ratingImgs = (arr[rating] && arr[rating].RATING_IMGS != "null") ? JSON.parse(arr[rating].RATING_IMGS) : ''
                    influ = (arr[rating] && arr[rating].RATING_INFLU_PARAMS != "null") ? JSON.parse(arr[rating].RATING_INFLU_PARAMS) : ''
                    ratComment = (arr[rating] &&  arr[rating].GLUSR_RATING_COMMENTS) ? arr[rating].GLUSR_RATING_COMMENTS : ''
                    rating = (arr[rating] && typeof (arr[rating].GLUSR_RATING_VALUE) != 'undefined') ? arr[rating].GLUSR_RATING_VALUE : 0;
                }
                if(ratComment){
                    try {
                        ratComment = decodeURIComponent(ratComment);
                    } catch {
            
                    }
                }
                if(ratingImgs){
                    ratingImgs = Object.values(ratingImgs);
                    for(let i =0; i<ratingImgs.length;i++){
                        imgOrg.push(ratingImgs[i].IMG_DOC_PATH);
                        img125.push(ratingImgs[i].IMG_DOC_125X125);
                        img500.push(ratingImgs[i].IMG_DOC_500X500);
                        imgId.push(ratingImgs[i].IMG_ID);
                    }
                }
                return {
                    ...state, ...{
                        userRating: rating,
                        ratingFetched: true,
                        ratingImage: img125,
                        ratingImageOrg : imgOrg,
                        ratingImage500 : img500,
                        imgId : imgId,
                        influ : influ,
                        ratComment : ratComment
                    }
                };

            }
        case 'RESET_AVG_RATINGS':
            {
                return {
                    ...state, ...{
                        avgRatingFetched: false,
                        avgRating: 0,
                        isDisplayRating: false,
                        sellerRatings: ''
                    }
                };
            }
        case 'RECEIVED_SELLER_AVG_RATINGS':
            var res = action.response.Response;
            var ratings = '';
            if (res && res.Code == "200" && res.Message == 'data found' && typeof res.Data.rating_counts != 'undefined' && typeof res.Data.rating_counts.avg_rating != 'undefined') {
                ratings = res.Data
            }
            return {
                ...state, ...{
                    sellerRatings: ratings
                }
            }
        case 'RECEIVED_AVG_RATINGS':
            {
                var avgRating = 0;
                var res = action.response.Response;
                if (res && res.Code == "200" && res.Message == 'data found' && typeof res.Data.rating_counts != 'undefined' && typeof res.Data.rating_counts.avg_rating != 'undefined') {
                    avgRating = parseFloat(res.Data.rating_counts.avg_rating);
                    avgRating = avgRating.toFixed(1);
                    avgRating = avgRating.replace('.0', '');
                }
                return {
                    ...state, ...{
                        avgRatingFetched: true,
                        avgRating: avgRating,
                        isDisplayRating: (res.Data.is_display && res.Data.is_display != 0) ? true : false
                    }
                };
            }
        case 'SUBMIT_RATINGS':
            {
                return {
                    ...state, ...{
                        ratingStatus: true,
                        ratComment : action.rating_comments ? action.rating_comments :'',
                        influ: action.influ_param ? action.influ_param : ''
                    }
                };
            }
        case 'GET_LAST_SEEN':
            {
                return {
                    ...state, ...{
                        lastSeen: {},
                        lastSeenStatus: false
                    }
                };
            }
        case 'SET_LAST_SEEN':
            {
                var data = (action.response) ? action.response : {};
                var lastSeen = {};
                if (action.isoneTap) {
                    lastSeen = data
                }
                else {
                    if (data.Response && data.Response.Code == "200" && data.Response.Status
                        == "Data found") {
                        lastSeen = (data.Response.Data.latest_activity_data && data.Response.Data.latest_activity_data[0]) ? data.Response.Data.latest_activity_data[0] : "";
                    }
                    else if (data.Response && data.Response.Code == "204" && data.Response.Data && data.Response.Data.latest_activity_data) {
                        lastSeen = (data.Response.Data.latest_activity_data && data.Response.Data.latest_activity_data[0]) ? data.Response.Data.latest_activity_data[0] : ''
                    }
                }
                return {
                    ...state, ...{
                        lastSeen: lastSeen,
                        lastSeenStatus: true
                    }
                };
            }

        case 'REQUEST_DUPLICATE_EMAIL':
            return {
                ...state, ...{
                    duplicateEmail: ''
                }
            };
        case 'RECEIVE_DUPLICATE_EMAIL':
            let cust_ids = ["1", "2", "5", "10", "12", "16", "17", "23", "24", "32", "34", "35", "37", "38", "39"];
            let cust_match = false;
            if (action.response.code == "200" && action.response.hasOwnProperty('cust_id') && action.response.cust_id.length > 0) {
                if (!Array.isArray(action.response.cust_id)) {
                    if (cust_ids.indexOf(action.response.cust_id.toString()) > -1) {
                        cust_match = true;
                    }
                } else {
                    for (var i = 0; i < action.response.cust_id.length; i++) {
                        if (cust_ids.indexOf(action.response.cust_id[i].toString()) > -1) {
                            cust_match = true;
                            break;
                        }
                    }
                }
            }
            return {
                ...state, ...{
                    duplicateEmail: action.response.code == "200" && action.response.hasOwnProperty('cust_id') && action.response.cust_id.length > 0 && cust_match ? 'yes' : 'no'
                }
            };
        case 'RESET_SENT_STATUS':
            {
                return {
                    ...state, ...{
                        resSentStatus: false
                    }
                };
            }
        case 'RESET_DETAILS_PROPS':

            var ups = {
                ...state, ...{
                    userRating: 0,
                    ratingFetched: false,
                    avgRatingFetched: false,
                    avgRating: 0,
                    privacyId: '',
                    userPrivacy: false,
                    suggestiveReply: [],
                    receivedSuggReply: false,
                    timeoutSuggReply : false,
                    payMsgData: '',
                    screen:''
                }
            };
            return ups;
        case 'USER_REJ_LOGIN':
            window.truecallerRej = true;
            var ups = {
                ...state, ...{
                    rejLogin: true
                }
            };
            return ups;

        case 'GET_SUGGESTIVE_REPLY':
            {
                return {
                    ...state, ...{
                        suggestiveReply: [],
                        receivedSuggReply: false,
                        timeoutSuggReply : false
                    }
                };
            }
        case 'SET_SUGGESTIVE_REPLY':
            {
                var data = (action.response) ? action.response : '';
                return {
                    ...state, ...{
                        suggestiveReply: data&&data.reply?data.reply:[],
                        receivedSuggReply: true,
                        timeoutSuggReply : action. isTimeOut ? false : true
                    }
                };
            }
            case 'SET_RESPONSE_RATE':
            {
                var data = action.response && action.response.code == 200 ? action.response : '';
                if(Object.keys(data).length <= 4) {
                    return {
                        ...state, ...{
                            sellerResponseRate: data,
                        }
                    }
                }
                else
                {
                    return {
                        ...state, ...{
                            sellerResponseRates: {...state.sellerResponseRates, ...data},
                        }
                    }
                }
            }
            case 'IS_DISPLAY_RATINGS_MESSAGES':
            {
                let ratingDetails = action && action.response && action.response.response && action.response.response.rating_details ? action.response.response.rating_details : {};
                return {
                    ...state, ...{
                        isRatingDisplay: ratingDetails.is_rating_display ? true : false,
                        ratingType : ratingDetails.bs_rating_type ? ratingDetails.bs_rating_type : 'B',
                        isWType: ratingDetails.rating_txn_reftype && ratingDetails.rating_txn_reftype == 'W' ? true : false,
                        isBType: ratingDetails.rating_txn_reftype && ratingDetails.rating_txn_reftype == 'B' ? true : false,
                        query_Type : ratingDetails.rating_txn_reftype ? ratingDetails.rating_txn_reftype : state.query_Type,
                        last_transaction_id: ratingDetails.rating_txn_refid ? ratingDetails.rating_txn_refid : state.last_transaction_id,
                        last_transaction_prodName: ratingDetails.rating_txn_prodname ? ratingDetails.rating_txn_prodname : state.last_transaction_prodName,
                        last_mcat_name: ratingDetails.mcat_name ? ratingDetails.mcat_name : state.last_mcat_name,
                        last_mcat_id: ratingDetails.mcat_id ? ratingDetails.mcat_id : state.last_mcat_id
                    }
                }
            }
            case 'RECIEVE_MCAT_DETAILS':
                var res = action.response && action.response.Response && action.response.Response.Code == 200 ? action.response.Response.Data : '';
                return {
                    ...state,...{
                        mcatDetails: res
                    }
                }
            case 'REQUEST_TEMPLATECREATE':
                return {
                    ...state, ...{
                        isTemplateCreated: false,
                        tempstatus:[]
                    }
                };
            
            case 'RECIEVE_TEMPLATECREATE':
                var res = action.response ? action.response : '';
                return {
                    ...state, ...{
                        istemplateCreated:true,
                        tempStatus: res,
                    }
                };
    
            case 'REQUEST_TEMPLATEGET':
                return {
                    ...state, ...{
                        isTemplateObt: false,
                        templateList:[]
                    }
                };
    
    
            case 'RECIEVE_TEMPLATEGET':
                var res = action.response ? action.response : '';
                return {
                    ...state, ...{
                        isTemplateObt:true,
                        templateList: res&&res.response?res.response:'',
                    }
                };    
        case 'RESET_IMG_ERR':
            {
                var ups = {
                    ...state, ...{
                        imgUpldErr: false,
                        imgUpldErrReason: ''
                    }
                };
                return ups;
            }
        case 'RELATED_SERVICE_HIT':
            {
                return {
                    ...state, ...{
                        recommendedMcat: action.data.response ? action.data.response['RECOMMENDED MCAT DATA'] : '',
                        recommendedData: action.data.response ? action.data.response['RECOMMENDED DATA'] : ''
                    }
                };
            }
        case 'RELATED_SERVICE_HIT_MCAT':
                {
                         return {
                            ...state, ...{
                              recommendedMcat:(action && action.data && action.data.response) ? action.data.response['RECOMMENDED MCAT DATA'] : '',
                              recommendedDatamore: action.data.response ? action.data.response['RECOMMENDED DATA'] : ''
                            }
                     };
                }
         case 'CAPS_PROD_SERVICES_HIT':  
                {
                      return {
                           ...state, ...{
                             CAPsData: ( action && action.data && action.data && action.data.response.Data) ? action.data.response.Data : ''
                         }
                         };
                 }         
        case 'SET_LOCATIONS_FILTER_WIDGET': {
            let res = { ...state, ...{ cityListInFilter: action.cityList, selectedCityInFilter: action.selCity}};
            return res;
        }

        case 'SET_HANDLE_CITY_SELECT': {
            let res = { ...state, ...{ handleCitySelect: action.handleCitySel} };
            return res;
        }

        case 'UPDATE_LOCATION_TOGGLE_STATE': {
            let res = { ...state, ...{ toggleState: action.detectMyLocClicked} };
            return res;
        }


        /************************************************* **/
        /***      CallNow Module ***  /
        /************************************************* **/
        case 'DISPLAY_CALLNOW':
            return {
                ...state, ...{
                    displayCallNow: true,
                    callProps: action.callProps
                }
            }

        case 'HIDE_CALLNOW':
            return {
                ...state, ...{
                    displayCallNow: false,
                    callProps: ''
                }
            }
            
        case 'CWI_LOGIN':
            return {
                ...state, ...{
                    CWILogin:action.value
                }
            }

        case 'UPDATE_AUTHENTCATED': {
            return { ...state, ...action.payload }
        }

        case 'SET_PAGE_ERROR':{
            return {...state,...action.payload}
        }

        case 'PRODUCT_SUGGESTIONS':
            return {
                ...state, ...{
                    productSuggestions: action.suggestionData?action.suggestionData.product:'',
                    productInput: action.productInput
                }
            }

            case 'EMPTY_PRODUCT_SUGGESTIONS':
            return {
                ...state, ...{
                    productSuggestions: ''
                }
            };
	  case "COMPANY_CATINDEX_DATA":
      return { ...state, companyCatIndex: action.data };
      case 'LOGIN_EMAIL':
            var ems = {
                ...state, ...{
                    emailVerify1:true
                }
            };
            return ems;
      case 'TrueCaller_Succ':
            let truecallerLogin;
            if (action.success == true && action.result.message == 'Success') {
                truecallerLogin = true;
                window.truecallerLogin = true;
            }
            return {
                ...state, ...{
                    truecallerLogin: truecallerLogin,
                    TC_City: action.result.TC_DATA.Tc_ct ? action.result.TC_DATA.Tc_ct : '',
                    TC_Email: action.result.TC_DATA.Tc_em ? action.result.TC_DATA.Tc_em : '',
                    TC_Name: action.result.TC_DATA.TC_Fn ? action.result.TC_DATA.TC_Fn : ''
                }
            };

            case 'WhatsApp_Succ':
                let whatsAppLogin;
                if (action.success == true && action.requestLogin && action.requestLogin.Response && action.requestLogin.Response.Code && action.requestLogin.Response.Code == '200') {
                    whatsAppLogin = true;
                    window.whatsAppLogin = true;
                }
                return {
                    ...state, ...{
                        whatsAppLogin: whatsAppLogin,
                        WA_Name: action.requestLogin.Response.CookieData && action.requestLogin.Response.CookieData.DataCookie && action.requestLogin.Response.CookieData.DataCookie.fn && action.requestLogin.Response.CookieData.DataCookie.fn
                        ? action.requestLogin.Response.CookieData.DataCookie.fn
                        : ''
                    }
                };
            case 'RESET_Enq_Val_Truecaller':
            window.truecallerRej ? window.truecallerRej = false :'';
            return {
                ...state, ...{
                    offerId:'',
                    screen:"",
                    rejLogin:false,
                    pincodeNotFound:false,
                    reqCancel:'',
                    userupdateCancel:''
                        }
                    };
            case 'RESET_Enq_Val':
            window.truecallerRej ? window.truecallerRej = false :'';
            return {
                ...state, ...{
                    offerId:'',
                    screen:"",
                    isqData:'',
                    rejLogin:false,
                    pincodeNotFound:false,
                    reqCancel:'',
                    userupdateCancel:''
                        }
                    };
                    case 'RESET_Mbl_Val':
                    return {
                        ...state, ...{
                            offerId:'',
                            mblScreen:'',
                            mblIsqData:'',
                            mcatIdMbl:''
                                }
                            };
            case 'REQUEST_ONETAP':
            return {
                ...state,...action.payload};
                
            case 'DIFFERENT_USER':
                return {
                    ...state,...{
                        notMe: true,
                        truecallerLogin: false
                    }};
            
            case 'LOGIN_RESTRICTED':
            var cookies = action.response ? action.response.Response.LOGIN_DATA : action.loginData ? action.loginData : '';
            var ciso = action.ciso || "IN", ups;
            var errorMsg = '';
            if (action.requestLogin.message == "ISO MisMatch") {
                errorMsg = "Please select the correct country";
                errorMsg= action.requestLogin.msg;
            } else if (action.requestLogin.code && action.requestLogin.code != "200") {
                if(action.requestLogin.msg == "Mandatory Param missing for User identification"){
                    errorMsg = "Some error occurred. Try again!";
                }
                else{
                    errorMsg = action.requestLogin.msg;
                }
            }
            else {
                errorMsg = action.requestLogin.message || 'Details are incorrect';
            }
            return {
                ...state,...{
                    authenticated: false,
                    isloggedin: false,
                    isidentified: false,
                    requesting: false,
                    username: action.loginData.use,
                    ciso: ciso,
                    isRestricted: true,
                    err: errorMsg,
                }
            }; 
                       

        default: return state;
    }

    function UniqueBls(arr) {
        var unique = {};
        var distinct = [];
        if (arr.length > 0) {
            arr.forEach(function (x) {
                if (x && x.ETO_OFR_ID) {
                    if (!unique[x.ETO_OFR_ID]) {
                        distinct.push(x);
                        unique[x.ETO_OFR_ID] = true;
                    }
                }
            });
        }
        return distinct;
    }


};

export default imReducer;