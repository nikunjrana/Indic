import '../css/callBtn2.css';
import '../css/callBtnCommon1.css'
import { eventTracking } from '../../../Globals/GaTracking';
import React from "react";
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';

export const CallBtn2 = (props) =>{
    let niHit = props.niHit ? props.niHit : true;
    let callBtnCss = props.ClickedFrom && props.ClickedFrom=="reqpopup" ? "callIcnNAB bkgImgPstnRpt" : (props.eventLabel && props.eventLabel.toLowerCase().includes("company")?props.isABtst?`${props.filledCallCta=='callonly'?'callIcnNAB':'callIcnN'}` : "comp_img comcallIcn" : props.eventLabel && props.eventLabel.toLowerCase().includes("impcat")? `${props.filledCallCta=='callonly'?'callIcnNAB':'mcatIconApp'} mt-2` : props.eventLabel && props.eventLabel.toLowerCase().includes("search")? props.isABtst?`${props.filledCallCta=='callonly'?'callIcnNAB':'callIcnN'}` :"search_img searcallIcn"
    :props.eventLabel && props.eventLabel.toLowerCase().includes("home")&&props.applikectahome? "callIcnN"
   :props.eventLabel && (props.eventLabel.includes("PNS") || props.eventLabel.toLowerCase().includes("call") || props.eventLabel.includes("product-detail") || props.eventLabel.includes("mini-pdp") || props.eventLabel.includes("StandardProd")|| props.eventLabel.includes("error-PDP"))? props.isABtst? props.ShowCallNowAfterEnquiry || props.inlineEnqFromPDP?`${props.inlineEnqFromPDP?" callIconM ":`${props.ispdf?"callIcnN":"callIcnNAB"}` } bkgImgPstnRpt ` : `${props.filledCallCta=='callonly'?'callIcnNAB':'callIcnN'} bkgImgPstnRpt`: "callIcnN bkgImgPstnRpt" :props.CallBtnonly?`${props.filledCallCta=='callonly'?'callIcnNAB':'callIcnN'} bkgImgPstnRpt mb2`:props.callIconforPDPnewCTA ?"callIcnNAB mt-2" : "mcatIconApp mt-2");
    
    return(
<span id={props.id} className={props.ClickedFrom && props.ClickedFrom =='reqpopup' ? "bgmim bxrd25 bxsdw clrw dib fs18 pd10 por w100" : props.pageName === 'PDP' ?(`${props.ClickedFrom=='ProdDesc'&&props.ispdf?"bgmim pof t10 r2 pd10 fs16 fw bxrd20 bgwhite w39 clr57b":props.ShowCallNowAfterEnquiry==true?`${props.showBoldCta?'fw':''} ${props.ClickedFrom=='ProdDesc'&&!props.companyCall?" dn ":`${props.companyCall?"bgmim poa W190  bxrd4   l95 b0 fw ":` bgmim  fs16 poa bxrd20 fw b0 W200 l101`} `} ${props.ClickedFrom=='ProdDesc'?"":" dib "} pd10 fs18  `:`${props.showBoldCta?'fw':''}  ${props.inlineEnqFromPDP?"bgmim fw":"compCl bxsdw"} dib   bxrd4 fs18 clrw por callBtnPDP pd10 w100`}`): props.applikectahome==true?`${props.showBoldCta?'fw':''} appLikeCta bxrd10 bxsdw dib fs14 mb10 mt10  ${props.advanceproduct?"pdb6 pdt6" : "pdb10 pdt10"} w40  `
:`${props.filledCallCta=='callonly' ?'bgmim clrw' :props.isABtst?"bdrmim clrmim ":'appLikeCta'} ${props.showBoldCta?'fw':''} dib bxsdw bxrd20 fs14 mb10  ${props.advanceproduct?"pdb6 pdt6 whwp  w80" : "pdb10 pdt10 w80"} `} 
            onClick={() =>{props.displayPopup();
            let eventLabel = props.eventLabel;
            if(window.pageName && window.pageName == "PDP" ) {
                let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                let status = checkUserStatus();
                eventLabel+=(status>=0 && status<=2 ? loginModeArray[status] : "");
            }
            let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
            let usermode = loginModes[checkUserStatus()];
            let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
            eventTracking("Click-To-Call",`${props.ispdf?"PDP_ProductDesc|Pdf":props.eventAction}`,eventLabel+`|${usermode}|${verfStatus}`,niHit)}}>
            <i className={`${callBtnCss} ${props.pageName === 'PDP' ?(props.ShowCallNowAfterEnquiry==true||props.inlineEnqFromPDP) ?"  ":"":""} mr5 dib vam objctFitSclDown`} width="14" height="14"></i>
            <span>{props.callText}</span>
            {props.companyContactNo ? <span id="pns1" class="dn">{props.companyContactNo}</span>:""}

        </span>
    );
}