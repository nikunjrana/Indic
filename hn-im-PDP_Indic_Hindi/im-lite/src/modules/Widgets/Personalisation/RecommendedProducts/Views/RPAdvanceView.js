import React, { useEffect, useRef } from "react";
import styles from "../../../../../Globals/imageCss";
import { Link } from 'react-router';
import { CallBtn2 } from "../../../../CallNow/views/CallBtn2";
import { setCookie ,getCookieValByKey } from "../../../../../Globals/CookieManager";
import { modifyImgSrc } from "../../../../ProductDetail/utility/AboutTheSeller/helper";
import { callNowActionDispatcher } from "../../../../CallNow/actions/callNowActionDispatcher";
import { eventTracking,A2HSApp } from "../../../../../Globals/GaTracking";


const RPAdvanceView = (props) => {
    const callnow=useRef(props.callNowController);
    useEffect(()=>{
        eventTracking("w1_POI", 'display_impression', 'IMOB_' + props.page , false);
          
    },[])
    useEffect(()=>{
        if(callnow.current==""&&props.callNowController!="")
         {
            let buttonvalue=window.poicallclick?document.getElementById(window.poicallclick):''
            buttonvalue?buttonvalue.click():'';
            delete window.poicallclick;
            document.getElementById("blackCallBg") ? document.getElementById("blackCallBg").style.display = 'none':'';
         }
    },[props.callNowController])
   
        return (
           
        <div  className="mnH240 bgw  bdrBR">
            <p className="fs17 clrb pdt10 fw mb10 pdl10">Products of Your Interest</p>
            <ul className="relatedMoreCat scWrapx df mnH240 pdr6 scrbrH">
           { listItems(props) }
            </ul>
         
        </div>

       
    )
}
const callNowClickADV=(props,callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack,custtypeWeight,pos)=> {
   
    dbpagetrack= A2HSApp(true) ? dbpagetrack + A2HSApp(true)+'-'+(document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbpagetrack;
    let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'AdvanceProducts', custtypeWeight:custtypeWeight };
    eventTracking("w1_POI | Home-Page-Clicks-PWA",(props.trck_param ?props.trck_param : "") + 'cta_button_callnow|Advance Products |Products-of-your-interest'+(props.gaLastDigit?props.ABTEST:'')
    ,"IMOB_" + props.page + "|click-to-call",true);
    callNowActionDispatcher(true, callProps);
}



const listItems = (props) => {
    
    let ABTEST = props.gaLastDigit ? props.ABTEST? props.ABTEST:"": "";
    let enqSent = false;
   let RecomProd=JSON.parse(localStorage.getItem("RecomProd"));
    let data = RecomProd  && RecomProd.length>0 ? RecomProd: '';
    return data.map((items, index) => {

        let TransitionPDP = {
            displayId :  items.display_id,
            productName : items.name,
            glid : items.R_glusr_id,
            productMcatId :items.mcatid,
            imgUrl : items.image_250x250,
            companyName : items.company_name,
            city : items.city_name,
            price :items.price,
            companyContactNo : items.contactnumber,
            companyContactVal :  'PNS',
            catFlname : items.name,
            unit :items.unit,
            cityOrigin : items.city_name,
             standardPrice : items.price_f?items.price_f.replace(/₹/g, ""):'',
             extraPrdName : items.name,
            
        }

        
        let itemImgURL = items.image_250x250? items.image_250x250:items.image;
        itemImgURL = itemImgURL.replace('http://', 'https://');
        let postEnqCta = enqSent ? 'callonly' : '';
        let glid=getCookieValByKey('ImeshVisitor', 'glid');
        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
        return (
            <li className="listingWd flxGrw1 ml5 tc flxShrnk0">
                    <div className=" bxrd10 ht125px w125p ma  ">
                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link className="ma ht125px w125p db jc" to={items.url} alt={items.name} onClick={() => {
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP;
                        eventTracking("w1_POI | Home-Page-Clicks-PWA", props.trck_param + 'cta_click_prdimage | Products-of-your-interest', 'IMOB_' + props.page, true)
                    }}>
                            <div throttle={10} offsetVertical={300} className={"oh ht125px w125p  tc df jcc vam bxrd10 bdr"} >
                            <img className=" mxhw125 " loading={index > 2 ? 'lazy' : ""} alt={items.name} src={itemImgURL}></img>
                            </div>
                    </Link> :
                        <a className="ma ht125px w125p db jc" alt={items.name} onClick={(event) => {
                            window.location.href=(items.url); 
                            setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl));
                            eventTracking("w1_POI | Home-Page-Clicks-PWA", props.trck_param + 'cta_click_prdimage | Products-of-your-interest', 'IMOB_' + props.page, true)
                            event.preventDefault();
                        }}>
                            <div throttle={10} offsetVertical={300} className={"oh ht125px w125p  tc df jcc vam bxrd10 bdr"} >
                                <img className=" mxhw125 " loading={index > 2 ? 'lazy' : ""} alt={items.name} src={itemImgURL}></img>
                            </div>
                        </a>}
                    </div>
                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={items.url} alt={items.name} onClick={() => {
                        window.__TransitionData__ = null;
                        window.__TransitionData__ = TransitionPDP;
                        eventTracking('w1_POI | Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdname | Products-of-your-interest ', 'IMOB_' + props.page, true)
                    }} className="tc clr33 db pdt7 txtElip w90 ml10 fwb">{items.name}</Link> : <a href={items.url} alt={items.name} onClick={(event) => {
                        window.location.href=(items.url); 
                        setCookie("ImageData",modifyImgSrc(TransitionPDP.imgUrl));
                        eventTracking('w1_POI | Home-Page-Clicks-PWA', props.trck_param + 'cta_click_prdname | Products-of-your-interest ', 'IMOB_' + props.page, true)
                        event.preventDefault();
                    }} className="tc clr33 db pdt7 txtElip w90 ml10 fwb">{items.name}</a>}

                    <p className="clr7B fs12 pdt5 txtElip">
                            <div className="clr7B  tc ">
                                <i className={"mr4 wh13_12 dib clr7B locIconPer"}></i>{items.city_name}
                            </div>
                        </p>   
                    <p className="tc fs12 pdt5 clr7B notranslate">
                                    
            <a  href={items.website_url}
                className="fs13 clr7B db pdl5 w90  txtElip"
                onClick={() => {
                    window.__TransitionData__ = null;
                    window.__TransitionData__ = TransitionPDP;
                  eventTracking(
                    'w1_POI | Home-Page-Clicks-PWA',
                    props.trck_param + "cta_click_cmpny_nme | Products-of-your-interest",
                    "IMOB_" + props.page,
                    true
                  );
                }}
              >
                {items.company_name}
              </a> 
                    </p>
                    
                    <div className=" tc mt5 ">
                        <CallBtn2
                        id={"poicall"+index}
                        showBoldCta={true}
                        filledCallCta = {postEnqCta}
                        CallBtnonly={true}
                        key={items.contactnumber}
                        advanceproduct={true}
                        isABtst = {props.gaLastDigit}
                        callText={props.translatedText ? props.translatedText.HEADER_BTN_1 : "कॉल करें"}
                        eventAction={items.contactnumber_type == "PNS" ? "Clicked-PNS" + ABTEST : "Clicked-NonPNS" + ABTEST}
                        eventLabel={props.page}
                        displayPopup={() => {
                            callNowClickADV(props,"कॉल करें",
                            items.image, items.tsCode, items.company_name,
                            items.contactnumber, items.contactnumber_type, items.R_glusr_id,
                            items.display_id, items.name, items.mcatid, items.mcatName, props.callTxt, items.custtypeWeight,index);
                        }} 
                        companyContactNo={items.contactnumber}
                    />                
                    </div>
            </li>
        )
    });
}



export default RPAdvanceView;





