import React, {useState } from "react";
import { eventTracking } from '../../../../../Globals/GaTracking';
import styles from "../../../../../Globals/imageCss";
import { Link } from 'react-router';
import {CallBtn2} from '../../../../CallNow/views/CallBtn2';
import { setCookie, getCookieValByKey } from "../../../../../Globals/CookieManager";
import { checkUserMode, checkUserStatus } from "../../../../../Globals/MainFunctions";
import {removalTextNodes} from '../../../../../Globals/translatorPreact/translatorPatch';
import { modifyImgSrc } from "../../../../ProductDetail/utility/AboutTheSeller/helper";
import { convertIndianNumericFormatToNumeric, getPrice } from '../../../../../Globals/priceModification';

const RPDefaultView = (props) => {
    const isFilterAbTest = (!getCookieValByKey('googtrans'))&&props.page&&( props.page.toLowerCase().includes("search") || props.page.toLowerCase().includes("product-detail")) ? true : false;
    const [mcatClicked, setmcatClick] = useState(-1);
    
    const mcatClickHandler =(mcatid,index)=>{
        removalTextNodes();
        setmcatClick(mcatid);
        eventTracking(`${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + `${mcatid==-1?`cta_click_chip | All`:`cta_click_chip | ${index}`}`, 'IMOB_' + props.page, true);
    }
    const listmcats = (data) => {
        return data.map((it,ix) => {
            return(
                    <li className= {`bxrd20 dib fs14 fw lht35 ml4 mr5 pdl10 pdr10 ${mcatClicked==it.mcatid?'bdrmim clrmim':'bgclrw bdrg'}`} onClick={() =>mcatClickHandler(it.mcatid,ix)}>{it.name}</li>
             )
            }
        )
      }
    removalTextNodes();
        return (
            
       
        <div id="prodsViewedSection" className="oh mt10 pdb10 ">
            <p className="fs17 fw clr11 pdt15 pdb15 pdl15 por bgw">{props.head}</p>
            {isFilterAbTest && props.mcatData.length > 1? 
            <ul className='scWrap pl5  pdb10'>
            {<li className={`${props.page&&props.page.toLowerCase().includes("product-detail")?'':'w15'} bxrd20 dib fs14 fw lht35 ml4 mr5 pdl5 pdr5 tc ${mcatClicked==-1?'bdrmim clrmim ':' bdrg'}`} onClick={() =>mcatClickHandler(-1)}>{props.page&&props.page.toLowerCase().includes("product-detail")?'Exclusive':'All'}</li>}
            {listmcats(props.mcatData)}
            </ul>
            :''}
            <ul className="flx flwr lh18">
                {isFilterAbTest ? mcatClicked==-1?listItems(props,mcatClicked,0,10):listItems(props,mcatClicked,0,props.lslength+(props.data?props.data.length:'')) : listItems(props,mcatClicked,0,props.lslength+(props.data?props.data.length:''))}
            </ul>
     
        </div>
    )
}

const checkEnquirySent=(dispId) =>{
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData="";
    }
    var e = lsData ? lsData['displayId'] : "undef";
    if (e) {
        //e = decodeURIComponent(e);
        var dispIds = e.split(",");
        return dispIds.includes(dispId+'');
    }
    else
        return false;
}

const loginModes = {0: "Unidentified",1: "Identified",2: "Full-Login",3: "Unidentified-Existing"};
const listItems = (props,mcatClicked=-1,start = 0, length = 10) => {
    
    let ABTEST = props.gaLastDigit ? props.ABTEST? props.ABTEST:"": "";
    let enqSent = false;
    let data = (props && props.page && props.page.toLowerCase().includes("search") || (props.page.toLowerCase().includes("product-detail") && mcatClicked!=-1)) ? props.data.slice(start, length + start) : (props.dataCaps ? props.dataCaps.slice(start, length + start) : '');
    data = mcatClicked == -1? data : data.filter(item => item.mcatid==mcatClicked);
    data = data.length>10 ? data.slice(0,10) : (data.length%2 == 0 || data.length == 1) ? data : data.slice(0, -1);
    return data.map((items, index) => {
        let TransitionPDP = {
            displayId :  items.display_id,
            productName : items.name,
            glid : items.R_glusr_id,
            productMcatId :items.mcatid,
            imgUrl : items.image,
            companyName : items.company_name,
            city : items.city_name,
            price :items.price,
            price_seo:items.price_seo,
            companyContactNo : items.contactnumber!=''?items.contactnumber : items.mobile_number,
            companyContactVal :  'PNS',
            catFlname : items.name,
            unit :items.unit,
            cityOrigin : items.city_name,
             standardPrice : items.price_f?items.price_f.replace(/₹/g, ""):'',
             extraPrdName : items.name,
             ecom_landing_url:items.ecom_landing_url,
             ecom_store_name:'SHOPIFY'
            
        }

        checkEnquirySent(items.display_id)? enqSent = true:enqSent = false;
        // v1 -> chat, v2 -> call only, v3->current 
        const postEnqCta = enqSent ? 'callonly' : '';
        let isContnr125 = props && props.isContnr125? true :'';
        let page=props&&props.page&&props.page.toLowerCase().includes("product-detail") ?'PDP':props.page?props.page:'';
        let checkConnection = props && props.connectionType? !props.connectionType()? 'fastNetwork':'slowNetwork':'';
        let itemImgURL = props.page && props.page.includes("StandardProd") ? items.image : items.image_250x250? items.image_250x250:items.image;
        itemImgURL = itemImgURL.replace('http://', 'https://');
        let glid=getCookieValByKey('ImeshVisitor', 'glid');
        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
        return (
            <li className="w50   bdrBA">
                <div className="por tc bgw pdl5 pdr5   pdb5 pdt8 ">
                    
                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link className=" vam oh flx centerItems  h160px " to={items.url} alt={items.name} onClick={() => {
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP;
                        eventTracking(`${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_prdimage', 'IMOB_' + props.page+`${props.srchAbTest?props.srchAbTest:''}`, true)
                    }}>
                        <div className={`${items && items.image && (items.image.includes(".png") || items.image.includes(".gif")) ? "" : "bgimg"}`} >
                            <img className={`w160px h160px objctFitSclDown`} loading="lazy" alt={items.name} src={itemImgURL}></img>
                        </div>
                    </Link> : <a className=" vam oh flx centerItems  h160px " href={items.url} alt={items.name} onClick={(event) => {
                        window.location.href=(items.url);
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP;
                        setCookie("ImageData",modifyImgSrc(window.__TransitionData__.imgUrl));
                        eventTracking(`${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_prdimage', 'IMOB_' + props.page+`${props.srchAbTest?props.srchAbTest:''}`, true)
                        event.preventDefault();
                    }}>
                        <div className={`${items && items.image && (items.image.includes(".png") || items.image.includes(".gif")) ? "" : "bgimg"}`} >
                            <img className={`w160px h160px objctFitSclDown`} loading="lazy" alt={items.name} src={itemImgURL}></img>
                        </div>
                    </a>}
                    
                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={items.url} onClick={() => {
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP
                        eventTracking(`${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page+`${props.srchAbTest?props.srchAbTest:''}`, true)
                    }} className="tc clrBl db fs15 pdt7 mb7 txtElip">{items.name}</Link> : <a href={items.url} onClick={(event) => {
                        window.location.href=(items.url);
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP
                        eventTracking(`${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page+`${props.srchAbTest?props.srchAbTest:''}`, true)
                        event.preventDefault();
                    }} className="tc clrBl db fs15 pdt7 mb7 txtElip">{items.name}</a>}
                    {priceData(props, items, index,enqSent,page)}
                    <p className="tc fs12 clr7B  mt4 mb5">
                    {/* Sold by<br /> */}
                   
              {items.website_url.includes('company') ? <a
                href={items.website_url}
                className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                onClick={() => {
                    window.__TransitionData__ = null;
                    window.__TransitionData__ = TransitionPDP;
                  eventTracking(
                    `${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`,
                    props.trck_param + "cta_click_cmpny_nme",
                    "IMOB_" + props.page,
                    true
                  );
                }}
              >
                {items.company_name}
                        </a> : (glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                            to={items.website_url}
                            className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                            onClick={() => {
                                window.__TransitionData__ = null;
                                window.__TransitionData__ = TransitionPDP;
                                eventTracking(
                                    `${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`,
                                    props.trck_param + "cta_click_cmpny_nme",
                                    "IMOB_" + props.page,
                                    true
                                );
                            }}
                        >
                            {items.company_name}
                        </Link> : <a
                            href={items.website_url}
                            className="fs13 clrBl db pdl5 w100 pdr5 txtElip notranslate"
                            onClick={(event) => {
                                window.location.href=(items.website_url);
                                window.__TransitionData__ = null;
                                window.__TransitionData__ = TransitionPDP;
                                eventTracking(
                                    `${props.gaLastDigit1 % 2 == 0 ? 'w3_recently_viewed_even' : 'w3_recently_viewed_odd'}`,
                                    props.trck_param + "cta_click_cmpny_nme",
                                    "IMOB_" + props.page,
                                    true
                                );
                                event.preventDefault();
                            }}
                        >
                            {items.company_name}
                        </a> }
            
                    </p>
                    <p className="tc fs12  clr7B">
                            <span className="clr7B  tc txtElip db">
                                <i className='locIconPer mr2 wh13_12 dib clr7B'></i>{items.city_name}
                            </span>
                        </p>                    
                        <div className="  tc w100  mt10 ">
                        {items.ecom_flag && items.ecom_landing_url?'':<CallBtn2
                        showBoldCta={true}
                        filledCallCta = {postEnqCta}
                        key={items.contactnumber}
                        isABtst = {props.gaLastDigit}
                        callText={props.translatedText ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}
                        eventAction={items.contactnumber_type == "PNS" ? "Clicked-PNS" + ABTEST : "Clicked-NonPNS" + ABTEST}
                        eventLabel={props.page}
                        displayPopup={() => {
                            props.callNowClick("कॉल करें",
                            items.image,items.tsCode, items.company_name,
                            items.contactnumber, items.contactnumber_type, items.R_glusr_id,
                            items.display_id, items.name, items.mcatid, items.mcatName, props.callTxt + ABTEST,items.custtypeWeight,"",items.city_name,props.showRatingFeedback,props.setRatingInfo)
                        }} 
                        companyContactNo={items.contactnumber}
                    />}

                    { !(items.ecom_flag && items.ecom_landing_url) && enqSent?
                             postEnqCta=='callonly'? <div>{props.translatedText?props.translatedText.ENQ_LABEL:'Enquiry Sent'}</div> :
                                     <div id={"dispid" + items.display_id} style="background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;" className="dib bxsdw bxrd20 clrw pdt10 pdb10  fs14 w80">
                                      Enquiry Sent
                                     </div>
                                 :
                                 items.ecom_flag && items.ecom_landing_url ? 
                                 <div className={'pdl10 pdr10 minusMrgb6'} id={"dispid" + items.display_id}><a href={items.ecom_landing_url} onClick={() => {eventTracking(`${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + 'cta_button_buynow' + ABTEST, 'IMOB_' + props.page, true);}} target="_blank"><button className={`bxrd20 clrw fs14 pdb10 pdt10 bgmim tc w90`}><i className="lockIcon"></i>Buy Now</button></a><p className="msg3rdParty tc pdt15 mb10">You will be redirected to a 3rd party webstore</p></div> :
                        <div id={"dispid" + items.display_id} className={`${props.gaLastDigit?"bdrmim bgmim ":"bdrmim bgmim "}dib bxsdw bxrd20 clrw pdt10 pdb10 fs14 w80 fw`} onClick={(e) => {
                                if (e.target.innerHTML !== "Enquiry Sent") {
                                    props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image, items.tsCode,
                                    items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight);
                                    checkUserStatus() != 0 && props.page && props.page.toLowerCase() && props.page.toLowerCase().includes("search") ? (eventTracking('Search-Page-Clicks', 'Chat_with_Seller', `Get-Best-Price|EnquiryCTA|Search_Rec|${loginModes[checkUserStatus()]}${props.srchAbTest}|`, true)) : '';
                                    eventTracking("EnquiryCTA/"+loginModes[checkUserStatus()],(props && props.page=="product-detail"?"PDP":props && props.page && props.page.toLowerCase().includes("mini-pdp")?"Mini-PDP":props.page)+"/"+"Recommended-Products/","",true);
                                    eventTracking(`${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + 'cta_button_getquotes' + ABTEST+(props.page=='Search'?"|EnquiryCTA|"+page+'|'+checkUserMode():''), 'IMOB_' +props.page+(props.page=='Search'? '':("|EnquiryCTA|"+page+'|'+checkUserMode())), true);
                                }
                            }}>
                            <i className={`${props.gaLastDigit?'enqIcnGreen ':'enqIcnGreen '} dib vam mr2`}></i>
                            {props.translatedText ? props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}
                        </div>
                    }
                    </div>
                </div>
            </li>
        )
    });
}

const priceData = (props, items, index,enqSent,page) => {

    return ( (items.price_f || items.price_seo ||  (items.price && items.currency)) ?
        <p id={"pp" + items.display_id} className="clr33 tc fs16 fw txtElip notranslate"
            onClick={(e) => {
                if (!e.target.getAttribute('data-priceClicked') && !enqSent && !items.ecom_flag && !items.ecom_landing_url) {
                    checkUserStatus() != 0 && props.page && props.page.toLowerCase() && props.page.toLowerCase().includes("search") ? (eventTracking('Search-Page-Clicks', 'Chat_with_Seller', `Get-Best-Price|EnquiryCTA|Search_Rec|${loginModes[checkUserStatus()]}${props.srchAbTest}|`, true)) : ''
                    eventTracking(`${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_price'+( props.page=='Search'?"|EnquiryCTA|"+page+'|'+checkUserMode():''), 'IMOB_' + props.page+( props.page=='Search'?'':"|EnquiryCTA|"+page+'|'+checkUserMode()), true);
                     
                    props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_CLICKED', items.image, items.tsCode,items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
                }
            }}>
            {items.price_seo? items.price_seo:items.price_f? '₹ ' + convertIndianNumericFormatToNumeric(items.price_f):<> <i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>
        {getPrice(parseFloat(items.price), "", items.unit)} </>}

        </p>
        :
        enqSent?<p className="clrBlack tc fs16 fw txtElip">Price Requested</p>:<p id={"prcid" + items.display_id + "pr"} className="clrBl tc fs16 fw txtElip"
            onClick={(e) => {
                if (e.target.innerHTML !== "Price Requested" && !items.ecom_flag && !items.ecom_landing_url) {
                    eventTracking(`${props.gaLastDigit1%2==0 ? 'w3_recently_viewed_even':'w3_recently_viewed_odd'}`, props.trck_param + 'cta_click_price_request', 'IMOB_' + props.page+"|EnquiryCTA|"+page+'|'+checkUserMode, true);
                    props.callEnq(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_REQUESTED', items.image, items.tsCode,items.contactnumber, items.contactnumber_type, items.name, items.mcatName, props.callTxt, items.custtypeWeight)
                }
            }}>
            Get Latest Price
        </p>);
}

export default RPDefaultView;





