import '../css/callBtn1.css';
import '../css/callBtnCommon1.css'
import { eventTracking } from '../../../Globals/GaTracking';
import React, { useState } from "react";
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';

export const CallBtn1 = (props) =>{
    const [clickAnimation, setClickAnimation] = useState("")
    let isIndic = getCookieValByKey("googtrans") ? true : false;
    let niHit = props.niHit ? props.niHit : true
    let srchGridCall = <span data-click="" class="rt10 t5" ><span class="phone"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 90 90" style={{height: '18px', width: '18px', margin: '0px 2px -5px 0'}}><path d="M64.5,78.2c1.7-1.9,3.6-3.6,5.4-5.4c2.6-2.7,2.7-5.9,0-8.6c-3.1-3.2-6.3-6.3-9.4-9.4  c-2.6-2.6-5.8-2.6-8.4,0c-2,1.9-3.9,3.9-5.9,5.9c-0.1,0.1-0.3,0.2-0.4,0.3l-1.3,1.3c-0.4,0.2-0.7,0.2-1.2,0c-1.3-0.7-2.6-1.2-3.8-2c-5.7-3.6-10.5-8.2-14.7-13.4c-2.1-2.6-4-5.3-5.3-8.4c-0.2-0.5-0.2-0.9,0.1-1.3l1.3-1.3c0.1-0.1,0.1-0.2,0.2-0.3c0.6-0.6,1.2-1.1,1.8-1.7c1.4-1.3,2.7-2.7,4.1-4.1c2.7-2.7,2.7-5.9,0-8.6c-1.5-1.5-3.1-3.1-4.6-4.6c-1.6-1.6-3.2-3.2-4.8-4.8c-2.6-2.5-5.8-2.5-8.4,0c-2,1.9-3.9,3.9-5.9,5.9c-1.9,1.8-2.8,3.9-3,6.5c-0.3,4.1,0.7,8,2.1,11.8
    C5.2,43.8,9.6,50.7,15,57.1c7.2,8.6,15.9,15.4,26,20.4c4.6,2.2,9.3,3.9,14.4,4.2C58.9,81.8,62,81,64.5,78.2z"></path><path d="M41.1,15.7
    c-0.7,0-1.5,0.1-2.2,0.4c-1.7,0.8-2.5,2.8-2,4.8c0.4,1.8,2,3,3.9,3c4.6,0.1,8.6,1.5,12,4.6c3.7,3.4,5.4,7.7,5.6,12.8
    c0,0.9,0.4,1.9,0.9,2.6c1.1,1.5,3,1.9,4.8,1.2c1.6-0.6,2.5-2,2.5-3.9c-0.1-7-2.6-12.9-7.5-18.1C54.1,18.4,48.1,15.8,41.1,15.7z"></path><path d="M69,11.4c8.5,8.7,12.5,18.1,12.8,29.1c0.1,2.5-1.5,4.2-3.9,4.3c-2.6,0.1-4.3-1.4-4.4-4c-0.1-5.4-1.4-10.5-4-15.2
    C63.5,14.9,54.2,9.3,42,8.6c-1.4-0.1-2.6-0.2-3.6-1.3c-1.2-1.4-1.3-3-0.7-4.6c0.7-1.6,2-2.4,3.8-2.4c8,0.1,15.3,2.4,22,6.8
    C65.7,8.6,67.8,10.4,69,11.4z"></path></svg></span></span>;
    let callBtnCss = (props.eventLabel && props.eventLabel.toLowerCase().includes("enquiry-thankyou-") || props.isButtonDisabledMcat||(props.disablebutton)||(props.isButtonDisabled && props.pageName=="Company") || props.pageName=="CallNowBanner" ? "callIcnNAB" : props.bigIcon?"callIcnBig":"callIcnN")
    let classProperty = '';
    let newClassProperty=`${props.noMargin?"bxrd4 w33 bgclrw ml5 pdt12":props.enqsent?"bxrd4 w80 bgclrw ml7 pdt7":`ml10 ${props.addedClass?"":"bxrdNR"} w45 pdt12`}`;
    if(props.eventLabel && props.eventLabel.toLowerCase().includes("enquiry-thankyou-")) {
        classProperty = `${props.isABTest ? "bdrmim bgmim bxrdNRAB clrw fr tc fs14 tst pdt12 pdb12 w49 fw" : ""}`;}
    else if(props.pageName=="Search"){
            if (props.isButtonDisabledMcat){
                classProperty='bdrmim clrmim fl tc tst pdt10 w100 pdb10 fw bgmim bxrd20 srchM8 fs14'
            } else {
                classProperty = `bdrmim clrmim fl tc bgw  fw w47 mb1 bxrdNR fs14 pdb12 pdt12 htmx42`
            }
    }
    else{classProperty =`${props.isButtonDisabled || props.isButtonDisabledMcat||(props.disablebutton) ?` ${props.pageName == "Mcat" || (props.page == "Home")? `pdb12 pdt12 df jc fs14 fw flex1 ${props.advanceproduct?"ht35" :"htmn42" } ml10 mr10` :"bdrmim clrmim fl tc tst pdt12 w100 fs15 pdb12 fw ht45"} bgmim bxrd20`: `bdrmim clrmim fl tc bgw ${props.pageName == 'PDP'?"":props.advanceproduct?"ht35" :isIndic?"htmn42":"ht42" } ${props.pageName == 'PDP'?'fs15 fw ht45':'fs14 htmn42'}  fw pdb12 ${props.advanceproduct?newClassProperty:'pdt12'} ${props.pageName == 'PDP'? `w49 mb0 ${props.addedClass?"":" bxrdNR"}` : window.pagename == 'Search-PWA' && props.gridView ? "dib bxsdw bxrd20 mb10 pdt10 pdb10 w80" : `${(!props.advanceproduct)?`w48 ml5 ${props.addedClass?"":"bxrdNR"}`:''}`}`}`}
    if(props.isWhatsappCta && props.pageName == 'PDP') {
        classProperty = ("bxrdNR fs15 fw bdrmim clrmim mt5 mb5 ht45 pdb12 pdt12 bgmim clrw fl tc ") + (props.isButtonDisabled ? "w49" : "w34");
    }
    return(
            <span id={props.id} data-click={props.dataClick ? props.dataClick :""} 
            className={`${props.addedClass? classProperty + props.addedClass : classProperty} ${clickAnimation ? "por" :''}`} 
            onClick={!clickAnimation ? () =>{props.displayPopup();
                if(props.pageName == "Search"){
                    setClickAnimation(" CallCTALoader");
                    setTimeout(()=>{
                        setClickAnimation("");
                    },1500);
                }
                let eventLabel = props.eventLabel;
                if(window.pageName && window.pageName == "PDP" ) {
                    let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                    let status = checkUserStatus();
                    eventLabel+=(status>=0 && status<=2 ? loginModeArray[status]: "");
                }
                let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
                (sellerIntent && sellerIntent.Intent&&checkUserStatus()==2 )?eventTracking(props.isMessages ? "Messages" : "Click-To-Call",props.eventAction,props.eventLabel+" SOI-button",niHit):"";
                let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
                let usermode = loginModes[checkUserStatus()];
                let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
                let eventLabelSrchAbtest=props.SrchPageAbtest?props.SrchPageAbtest:'';
                eventTracking(props.isMessages ? "Messages" : "Click-To-Call",props.eventAction+eventLabelSrchAbtest,eventLabel+`|${usermode}|${verfStatus}`,niHit)
                }:''}>
                <span className={clickAnimation}></span>
            {props.pageName == 'PDP'?
                props.isButtonDisabled || props.isWhatsappCta?
                    <span className='isFirstFold phone vam'>
                     <span class="mr5 dib vam bkgImgPstnRpt callIcnNAB "></span>
                    </span>
                
                :<i className='callIcnN mr5 dib vam'></i>
                
                
            
                :window.pagename && window.pagename.toLowerCase().includes("search") && props.gridView ? srchGridCall : <i className={`${callBtnCss} mr5 dib vam objctFitSclDown ${props.noMargin?"minusMrgt7 ml4 ":""}`} width="14" height="14"></i>}
            <span className={props.eventLabel && props.eventLabel.toLowerCase().includes("enquiry-thankyou-")?"mr15":"" + (props.isButtonDisabled && (props.pageName == 'PDP'||props.pageName=="Company")? "clrw": ((props.pageName == "Mcat" ||props.pageName=="Search")&& props.isButtonDisabledMcat)||(props.page=='Home'&&props.disablebutton) ||(props.page=="error-mcat" && props.disablebutton) ||(props.page=="error-PDP" && props.disablebutton) ||(props.page=="error-company" && props.disablebutton) || props.pageName=="CallNowBanner"? "dib clrw" : " ")}>{props.callText}</span>
            {props.companyContactNo ? <span id="pns1" class="dn notranslate">{props.companyContactNo}</span> :''}
            </span>
     
    );
}
