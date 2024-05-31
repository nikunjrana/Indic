import { getFirstImg, modifyImgSrc } from '../../utility/Carousel/helper';
import { eventTracking } from '../../../../Globals/GaTracking';

function showOfflineInfo() {
    eventTracking('PWA PDP-Offline', 'Get-Best-Price-Explicit-Offline', 'datatype_preference', true)

    document.getElementById("offline_span").innerHTML = "It seems you are offline. Tap कॉल करें to call this seller for the best price";

    document.getElementById("offline_pop").style.bottom = "60px";
    document.getElementById("offline_pop").style.display = "block";

    eventTracking('PWA_Search_Offline', 'Offline_Message_Viewed', 'Enq_Offline_Clicks', true);

    setTimeout(function () {
        document.getElementById("offline_pop").style.display = "none";
        document.getElementById("offline_pop").style.bottom = "45px";
    }, 6000)
}

export function openEnqForm(data, pageLang, event, enqDivId, queryRef, pageName, isExtended, isExtendedIndex, ctaName, toggleLoader) {

    if (window.navigator.onLine == false) {
        showOfflineInfo();
    }
    else if (event.target.innerHTML.indexOf("Enquiry Sent") == -1 && window.navigator.onLine == true) {
        let displayName = data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME;
        let catID = data.CAT_ID ? data.CAT_ID : '';
        let query_text = '';

        if (pageName == "PDP") {
            if (isExtended == true) {
                query_text = queryRef + '|extended' + isExtendedIndex;

            } else {
                query_text = queryRef;
            }

        } else { query_text = 'product_detail_extended_PWA' }

        

        let interval = setInterval(function () {
              if (window.showEnquiryForm && window.page) {
                window.showEnquiryForm(
                    {
                        'query': (data.DATATYPE === "preference") ? 'did=' + data.PC_ITEM_DISPLAY_ID + '&ctg=' + catID + '&ss=&locality=&modreftype=9' : 'did=' + data.PC_ITEM_DISPLAY_ID + '&ctg=' + catID + '&ss=&locality=&modreftype=2',
                        'CefProdType': (data.DATATYPE === 'product') ? 'P' : 'S',
                        'company': data.COMPANYNAME,
                        'enquiryDivId': enqDivId,
                        'enq_sent_color': window.disableEnqBtn,
                        'query_text': query_text + '|' + pageLang,
                        'R_glusr_id': data.GLUSR_USR_ID,
                        'R_custtype_weight': data.GLUSR_USR_CUSTTYPE_WEIGHT,
                        'R_title': displayName,
                        'modid': 'IMOB',
                        'displayId': data.PC_ITEM_DISPLAY_ID,
                        'product_image': 'https://m.imimg.com/gifs/img/prod-img.png',
                        'enq_mcat_id': data.BRD_MCAT_ID ? data.BRD_MCAT_ID : '',
                        'callBakReq': 'callBakReqTrue',
                        'cta_name': ctaName
                    })
                clearInterval(interval);
                if(toggleLoader)
                toggleLoader();
                return;
            }

        }, 100);
     

    }
}

function handleNumPrefix(mob, type) {
    switch (type) {
        case 'MOBILE':
        case 'PNS':
            {
                if (mob.length == 10)//requires +91
                {
                    mob = '+91' + mob;
                }
                else {
                    if (mob.indexOf('+91') == -1) {
                        mob = '+' + mob;
                    }
                }
                break;
            }
        case 'PHONE':
            {
                if (mob.indexOf('+91') == -1 && mob.indexOf('91') != 0) {
                    mob = '+91' + mob;
                }
                else if (mob.indexOf('91') == 0) {
                    mob = '+' + mob;
                }
                break;
            }
    }

    // As due to - we were not able to send call

    // Spl symbols regex have been applied

    // let desired = mob.replace(/[^\w\s]/gi, '')
    let desired = mob.replace(/-/g,"");
    return desired;
}

export function directLanding(){
    let prevAndCurrURLS = localStorage && localStorage.getItem("PDP404URL") ?  JSON.parse(localStorage.getItem('PDP404URL')) : null;
    let previousPageURL= prevAndCurrURLS && prevAndCurrURLS.previousPageURL?prevAndCurrURLS.previousPageURL:'';
    let currentPageURL = prevAndCurrURLS? prevAndCurrURLS.currentPageURL?prevAndCurrURLS.currentPageURL:'':'';
    let isPdpPage = prevAndCurrURLS?currentPageURL? currentPageURL.includes('proddetail')?currentPageURL.includes('proddetail'):'':'':'';
    let isIsGoogle = (previousPageURL== '' && currentPageURL&& currentPageURL.includes('proddetail'))? true:false;


    if(isPdpPage){
        if(isIsGoogle){
            return(true);
        }
        else{
            return(false);
        }

    }
    else{
        return('notPDP');
    }

}

export function getMobileNum(data) {
    let num = '', type = '';
    if (data) {
        if (data["MOBILE_PNS"]) {
            num = data["MOBILE_PNS"];
            type = "PNS";
        }
        else if (data["MOBILE"]) {
            num = data["MOBILE"];
            type = "M";
        }
        else if (data["PHONE"]) {
            num = data["PHONE"];
            type = "M";
        }

        return {
            num: handleNumPrefix(num, type), type: type

        }
    }
    else
        return '';
}

export function callEnqForm(data, pageLang, queryRef, pageName, isExtended, isExtendedIndex, ctaName, pdpModrefType,isZoom,btnName,eventLabel="",callProps="", cABTestPDP="",track='', setMsgForGMPhoto='') {
    let displayName = data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME;
    let catID = data.CAT_ID ? data.CAT_ID : '';
    let query_text = '';
    let pdpModref_Type = pdpModrefType?(pdpModrefType=="3" && data && (data.BRD_MCAT_ID=="168563" || data.BRD_MCAT_ID=="172377" || data.BRD_MCAT_ID=="84153" || data.BRD_MCAT_ID=="42703" || data.BRD_MCAT_ID=="69543"))?"":pdpModrefType:'';

    if ((pageName == "PDP") || (pageName == "Minipdp")) {
         if (pageName=="Minipdp" && isZoom){
            query_text = queryRef +'|'+'ImageZoom'; }  
        else if (!isExtended && isZoom) {query_text = queryRef +'Image_Zoom|'+track}
        else if (isExtended && isZoom){query_text = queryRef.substr(0,9) + 'Image_Zoom_Extended'+ '|extended' + isExtendedIndex+track}
        else if (isExtended && !isZoom && queryRef.includes("Product_Details_Extended")){
            query_text = queryRef+track} 
        else if (isExtended && !isZoom && !queryRef.includes("Catalog_Info")){
            query_text = queryRef +'_Extended' + '|extended' + isExtendedIndex+track}
        else if (isExtended && !isZoom && queryRef.includes("Catalog_Info")){
                query_text = queryRef+track} 
        else if (!isExtended && !isZoom && btnName=="Company_Info_Video_PopUp"){
                    query_text = "IMOB_PDP_Catalog_Info_Video_PopUp|pdp_first_fold"+track}  
        else {query_text = queryRef}
    } 
    else { query_text = 'product_detail_extended_PWA' }
    query_text+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    query_text+=cABTestPDP? cABTestPDP:'';

    let valueEnquiryForm = 
        {
            isEnquiry: true,
            productName: displayName,
            page: pageName,
            receiverUserId: data.GLUSR_USR_ID?data.GLUSR_USR_ID:'',
            mcatId: data.BRD_MCAT_ID ? data.BRD_MCAT_ID : '',
            queryText: query_text + '|' + pageLang ,
            displayId: data.PC_ITEM_DISPLAY_ID,
            productImage: modifyImgSrc(getFirstImg(data))?modifyImgSrc(getFirstImg(data)):'https://m.imimg.com/gifs/img/prod-img.png',
            companyName: data.COMPANYNAME?data.COMPANYNAME:'',
            ctaName: ctaName,
            affiliationId:"-1",
            catid:catID,
            'query': (data.DATATYPE === "preference") ? 'did=' + data.PC_ITEM_DISPLAY_ID + '&ctg=' + catID + '&ss=&locality=&modreftype=9' : 'did=' + data.PC_ITEM_DISPLAY_ID + '&ctg=' + catID + '&ss=&locality=&modreftype='+pdpModref_Type ,
            'CefProdType': (data.DATATYPE === 'product') ? 'P' : 'S',
            'modid': 'IMOB',
            pdpModrefType: pdpModref_Type,
            showRevampEnq:false,
            flName:data.BRD_MCAT_FLNAME,
            nameCity:false,
            cityName:data.CITY?data.CITY:'',
            localityName:data.LOCALITY?data.LOCALITY:'',
            prdPricePDP:data.PRODUCT_PRICE?data.PRODUCT_PRICE:'',
            eventLabel:eventLabel,
           callTxt:"कॉल करें",
            image:callProps.itemImage,
            tscode:callProps.tscode,
            CONTACT_NUMBER:callProps.CONTACT_NUMBER,
            CONTACT_TYPE:callProps.CONTACT_TYPE,
            glusrid:callProps.glusrid,
            itemId:callProps.itemId,
            itemName:callProps.itemName,
            mcatname:callProps.mcatname,
            dbpagetrack:callProps.dbpagetrack,
            custtypeWeight:data.GLUSR_USR_CUSTTYPE_WEIGHT,
            query_ref_id:data.BRD_MCAT_ID ? data.BRD_MCAT_ID : '',
            query_ref_type:callProps.mcatname,
            modrefid:callProps.itemId,
            modrefname:callProps.itemName,
            getmorephotoCTA: setMsgForGMPhoto,
            internaltrack:track,
            widgetType:setMsgForGMPhoto?(setMsgForGMPhoto.includes('free') ?"Get-Free-Quote" :"Get-More-Photos"):queryRef && queryRef.toLowerCase().includes("first_fold")?"First-Fold":""
        }
        return valueEnquiryForm;
    }