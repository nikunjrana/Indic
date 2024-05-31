import { getCookie,getCookieValByKey } from "../../../Globals/CookieManager";
import { getCityName, getCityWithLatLong } from "./ServiceHandler/fetchProductDetail";
import { checkUserStatus } from "../../../Globals/MainFunctions";
import { eventTracking } from "../../../Globals/GaTracking";

export function modifyImgSrc(image) {
    if (typeof image != "undefined" && image != 'no_image' && image != '') {
        image = image.replace(/^http:\/\//i, 'https://');
        image = image.replace('imghost.indiamart.com', '1.imimg.com');
        image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        return image;
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
            num: num, type: type
        }
    }
    else
        return '';
}
export function callEnqForm(mcatid, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, imgurl, ctaName, cat_ID,callProps,showModal,track, params={},query_Text='',ProdData={},pdpModrefType="") {
    let pdpModref_Type = pdpModrefType?(pdpModrefType=="3"&&(mcatid=="168563" || mcatid=="172377" || mcatid=="84153" || mcatid=="42703" || mcatid=="69543"))?"":pdpModrefType:'';
    let query = (ProdData.DATATYPE === "preference") ? 'did=' + DISPLAY_ID + '&ctg=' + cat_ID + '&ss=&locality=&modreftype=9' : 'did=' + DISPLAY_ID + '&ctg=' + cat_ID + '&ss=&locality=&modreftype='+pdpModref_Type ;
    let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
    let query_text = query_Text+langSelection;
    let data ={};
        data.isEnquiry= true;
        data.productName= ITEM_NAME;
        data.page= window.pageName?window.pageName:"";
        data.receiverUserId= GLUSR_ID;
        data.mcatId= mcatid;
        data.queryText= query_text ;
        data.displayId= DISPLAY_ID +'';
        data.productImage= imgurl?imgurl:'https=//m.imimg.com/gifs/img/prod-img.png';
        data.companyName= COMPANYNAME;
        data.ctaName= ctaName;
        data.affiliationId="-1";
        data.catid= cat_ID;
        data.modid= 'IMOB';
        data.query= query;
        data.pdpModrefType=pdpModref_Type;
        data.enq_item_price= PRICE? PRICE:'';
        data.eventLabel=callProps.eventLabel;
        data.contactNumber=callProps.CONTACT_NUMBER;
        data.contactType= callProps.CONTACT_TYPE;
        data.glusrID=callProps.glusrid;
        data.itemId=callProps.itemId;
        data.itemName=callProps.itemName;
        data.mcatname=callProps.mcatname;
        data.dbpagetrack=callProps.dbpagetrack;
        data.custtypeWeight=callProps.custtypeWeight;
        data.tsCode=callProps.tscode;
        data.callTxt=callProps.call_txt;
        data.query_ref_id=callProps.query_ref_id;
        data.query_ref_type=callProps.query_ref_type;
        data.modrefid=callProps.modrefid;
        data.modrefname=callProps.modrefname;
        data.widgetType="Listing";
        data.internaltrack=track;
        if(ctaName=="Contact Seller") {
            data.inlineISQ=params.inlineISQ;
            data.DNCuser= params.DNCuser;
            data.userFilledIsqData=params.userFilledIsqData
            data.callSetIsq=params.callSetIsq
            data.quantityShown=params.quantityShown
            data.isIsqError=params.isIsqError
            data.widgetType=params.widgetType
        }
        showModal(data);
}

export function checkEnquirySentRelated(dispId) {        
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData="";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    if (e) {
        var dispIds = e.split(",");
        return dispIds.includes(dispId+'');
    }
    else
        return false;
}
 
export function filterCities(sellerLoc = { cityname: '', cityid: '' }, cookie) {
    return new Promise(function (resolve) {
        constructCityData(sellerLoc, cookie).then(data => {
        resolve(data);
        })
    })
}

export function constructCityData(sellerLoc, cookie) {
        return new Promise(function (resolve) {
            let cityData = new Map();
            getGeoLocCity(cookie).then(geoLoc => {
                if (geoLoc !== 'Not Found') {
                    cityData.set(geoLoc.cityid, geoLoc.cityname);
                }
                let userloc = getUserLocCity(cookie);
                if (userloc !== 'Not Found' && !cityData.has(userloc.cityid)) {
                    cityData.set(userloc.cityid, userloc.cityname);
                }
                getUserCity(cookie).then(userCity => {
                    if (userCity !== 'Not Found' && !cityData.has(userCity.cityid)) {
                        cityData.set(userCity.cityid, userCity.cityname);
                    }
                    let iploc = getIpLocCity(cookie);
                    if (iploc !== 'Not Found' && !cityData.has(iploc.cityid)) {
                        cityData.set(iploc.cityid, iploc.cityname);
                    }
                    if (sellerLoc.cityname && sellerLoc.cityid && !cityData.has(sellerLoc.cityid)) {
                        cityData.set(sellerLoc.cityid, sellerLoc.cityname.toLowerCase());
                        resolve(cityData);
                    }
                    else if(!sellerLoc.cityname && sellerLoc.cityid && !cityData.has(sellerLoc.cityid)) {
                        getSellerCity(sellerLoc.cityid).then(sellerCity=>{
                        if(sellerCity!== "Not Found" &&  !cityData.has(sellerLoc.cityid)) {
                        cityData.set(sellerLoc.cityid, sellerCity.cityname.toLowerCase());
                        }
                        resolve(cityData);
                        });
                    }
                })
            })
        })
    }

    export     function getGeoLocCity(cookie) {
        return new Promise(function (resolve, reject) {
            let lat = getCookieNameKey('iploc', 'GeoLoc_lt', cookie);
            let long = getCookieNameKey('iploc', 'lg', cookie);
            if (lat && long) {
                getCityWithLatLong(lat, long).then(data => { //check once
                    if (data.response.CODE == 200) {
                        resolve({
                            cityname: data.response.cityname.toLowerCase().split('+').join(' ').trim(),
                            cityid: data.response.cityid
                        });
                    }
                    else {
                        resolve('Not Found');
                    }
                }, error => {
                    resolve('Not Found');
                })
            }
            else {
                resolve('Not Found');
            }
        })
    }

    export  function getUserLocCity(cookie) {
        try {
            let userloc = cookie["userlocName"];
            if (userloc) {
                userloc = decodeURIComponent(userloc);
                let cityname = userloc.split('||')[0],
                    cityid = userloc.split('||')[1];
                return ({
                    cityname: cityname.toLowerCase().split('+').join(' ').trim(),
                    cityid: cityid
                });
            }
            else {
                return ('Not Found');
            }
        }
        catch (err) {
            console.log(err);
            return ('Not Found');
        }
    }

    export function getUserCity(cookie) {
        return new Promise(function (resolve, reject) {
            let userCityId = getCookieNameKey('ImeshVisitor', 'ctid', cookie);
            let userCountry = getCookieNameKey('ImeshVisitor', 'iso', cookie);
            if (userCityId && userCountry == 'IN') {
                getCityName(userCityId).then(data => {
                    resolve({
                        cityname: data ? data.toLowerCase().split('+').join(' ').trim() : '',
                        cityid: userCityId
                    })
                }, error => {
                    resolve('Not Found');
                    console.log(error);
                })
            }
            else {
                resolve('Not Found');
            }
        })
    }

    export function getSellerCity(sellercity) {
        return new Promise(function (resolve, reject) {
            if (sellercity) {
                getCityName(sellercity).then(data => {
                    let cityNameVal = data && data.toLowerCase().split('+').length>0 ? data.toLowerCase().split('+').join(' ').trim() : ""
                    resolve({
                        cityname: cityNameVal,
                        cityid: sellercity
                    })
                }, error => {
                    resolve('Not Found');
                    console.log(error);
                })
            }
            else {
                resolve('Not Found');
            }
        })
    }

    export  function getIpLocCity(cookie) {
        try {
            let cityname = getCookieNameKey('iploc', 'gctnm', cookie),
                cityid = getCookieNameKey('iploc', 'gctid', cookie);
            if (cityname && cityid) {
                return ({
                    cityname: cityname.toLowerCase().split('+').join(' '),
                    cityid: cityid
                })
            }
            else {
                return 'Not Found';
            }
        }
        catch (err) {
            console.log(err);
            return 'Not Found';
        }
    }


export const getCookieNameKey = (name, key, cookie) =>{
    let decodedCookie = decodeURIComponent(cookie[name])
    let cArr = decodedCookie && decodedCookie.split("|");
    for(let i=0;i<cArr.length;i++) {
        let valArr = cArr[i].split("=");
        if(valArr.length>1) {
            if(valArr[0]==key) {
                return valArr[1];
            }
        }
    }
    return ""
}
export function fireOnClicktracking (isZoom, isExtended, isExtendedIndex, isMinipdp = '', pgName = '', displayid = '', cABTestPDP = '', calledCTAsFrom) {
    let eventAction = '', eventLabel='';

    if (calledCTAsFrom === 'middleLayer') {
        eventAction = 'Ask-More-Detail';
    } else if (calledCTAsFrom === 'bottomLayer') {
        eventAction = 'Ask-Seller-For-Best-Deal';
    } else if(calledCTAsFrom === "relatedProducts") {
        eventAction = "Related-Products";
        eventLabel = `Get-Best-Price-${isExtendedIndex}`
    } else {
        eventAction = 'Get-Best-Price' + cABTestPDP;
    }

    let standardEnqLable = '';
    let identifyUserStatus = '';
    let status = checkUserStatus();

    if (window.pageName && window.pageName === "PDP") {
        const loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
        const isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
        eventAction += (status >= 0 && status <= 2 ? loginModeArray[status] : "");
        isZoom && (eventAction += '|ImageZoom');
        identifyUserStatus = (status >= 0 && status <= 2 ? isLoginMode[status] : "");
        standardEnqLable = '|EnquiryCTA|PDP|' + identifyUserStatus;
    }

    if (isZoom && !isExtended && !isMinipdp) {
        eventTracking('Product-Page-Clicks', eventAction, "page" + standardEnqLable, true);
    } else if (isZoom && isExtended) {
        eventTracking('Extended-Product-Page-Clicks', eventAction, "page-extended-" + isExtendedIndex + standardEnqLable, true);
    } else if(calledCTAsFrom === "relatedProducts") {
        eventTracking('Product-Page-Clicks', eventAction, eventLabel, true);
    }
    else if (!isZoom && !isExtended) {
        eventTracking('Product-Page-Clicks', eventAction, "with-price-page-index" + standardEnqLable, true);
    } else if (!isZoom && isExtended) {
        eventTracking('Extended-Product-Page-Clicks', eventAction, "page-extended-" + isExtendedIndex + standardEnqLable, true);
    }

    if (isZoom && isMinipdp) {
        eventTracking('Mini-PDP' + '-' + pgName, eventAction, "ImageZoom|" + displayid, true);
    }
}

export function checkDNCUser(cookie) {
    if(cookie && cookie.ImeshVisitor) {
        try {
            let userName = getCookieNameKey('ImeshVisitor', 'fn', cookie) != "";
        let userCity = getCookieNameKey('ImeshVisitor', 'ctid', cookie) != "";
        let userVerified = getCookieNameKey('ImeshVisitor', 'uv', cookie) == "V";
        let userEmail = getCookieNameKey('ImeshVisitor', 'em', cookie) != "";
        let DNCUserIndian = userName && userCity && userVerified;
        let DNCUserForeign = userName && userEmail;
        return DNCUserIndian || DNCUserForeign ? true : false;
        }
        catch(err) {
            return false
        }
    }
    return false
    
}
export function generateUniqueKey() {
    let timestamp = Date.now(); 
    let randomValue = Math.random();
    let uniqueKey = `${timestamp}_${randomValue}`;
  
    return uniqueKey;
  }

export const checkUserStatusFromCookie = (cookie) => {
    let status = 0;
    if (cookie) {
        var c = cookie;
        if (c['ImeshVisitor'] && c['im_iss'] && c['ImeshVisitor'] !== '' && c['im_iss'] !== '') status = 2;
        else if (c['ImeshVisitor'] && c['ImeshVisitor'] !== '') status = 1;
    }
    return status;
}
