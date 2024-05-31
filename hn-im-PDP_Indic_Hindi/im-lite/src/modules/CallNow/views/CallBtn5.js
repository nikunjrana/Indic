import "../css/callBtn5.css";
import "../css/callBtnCommon1.css";
import { eventTracking } from "../../../Globals/GaTracking";
import React from "react";
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";
import { checkUserStatus } from "../../../Globals/MainFunctions";

export const CallBtn5 = (props) => {
  let niHit = props.niHit ? props.niHit : true
  let stickytrack = props.sticky?props.sticky:''
  return (
    <div className="tc" id={props.id}>
      <span id = {props.c_id ? props.c_id:''} style={props.footer?'':props.whatsapp=="enabled"?(props.c_id=="CompCrdCall"||(props.c_id&&props.c_id.includes("compCallDiv"))?(props.catindex!="y"&&!props.stkyCss?"width:34%":""):""):''}
        data-click={props.dataClick ? props.dataClick : ""}
        className={
           props.stkyCss? props.stkyCss :props.footer?'bdrmim clrmim fl fs14 fw pdb10 pdt10 w50':(props.isABtst ? `${props.addedClass.includes("bxrd20")?'':'bxrdNR '}fs14 fw bdrmim clrmim mt5 mb5 ` :"compCl bxsdw bxrd20 fs14 tst clrw  mb5 mt5 fw ")
           + props.addedClass + (props.css=="enqSent"?" bgmim clrw ":"")
        }
        //file conflict
        onClick={() => requestAnimationFrame(()=> setTimeout(()=>{
          props.displayPopup();
          let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
          let usermode = loginModes[checkUserStatus()];
          let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
          eventTracking(
            "Click-To-Call"+stickytrack,
            props.eventAction,
            props.eventLabel+`|${usermode}|${verfStatus}`,
            niHit
          );
            let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
            (sellerIntent && sellerIntent.Intent&&checkUserStatus()==2  )? eventTracking(
            "Click-To-Call"+stickytrack,
            props.eventAction,
            props.eventLabel+" SOI-Button",
            niHit
          ):"";
        },0))}
      >
        <i className= {props.css && props.css == "stickyComp"? "CalIcon  db poa tlr50" : props.eventLabel && props.eventLabel.toLowerCase().includes("company")? props.isABtst?`${props.whatsapp=="enabled" || props.css=="enqSent"?"callW ":"callIcnN "}mr5 dib vam `:"comp_img comcallIcn mr5 dib vam":props.eventLabel && props.eventLabel.toLowerCase().includes("search")?"search_img searcallIcn mr5 dib vam objctFitSclDown":"mim_bg  callIcn mr5 dib vam"}></i>
        {props.css == "stickyComp"?'':props.callText}
        {props.companyContactNo ? <span id="pns1" class="dn">{props.companyContactNo}</span> :''}
      </span>
    </div>
  );
};
