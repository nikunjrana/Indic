import React from "react";
import { useEffect } from "react";
import { eventTracking } from "../../../Globals/GaTracking";
import { checkUserStatus } from "../../../Globals/MainFunctions";
import { getCookie,getCookieValByKey } from "../../../Globals/CookieManager";
import { impressionTrack } from "../../../Globals/impressionTrack";
export const LetsTalk = (props) => {

    useEffect(() => {
        window.letsTalkShell && document.getElementById("LetsTalkPDPcsr") ? document.getElementById("LetsTalkPDPcsr").click() : '';
       impressionTrack("LetsTalkPDPcsr",'Product-Page-Clicks','Widget_Impression','Interested_In_Product','',false,false)
      }, []);

    return (<div id={props.id} className="ltCntr bxrd10 pd10 m10 flx fleCntr fw fs14"
        onClick={() => {
            props.displayPopup();
            let eventLabel = props.eventLabel;
            let track = props.track? props.track:'';
            let loginModes = { 0: 'Unidentified', 1: 'Identified', 2: 'Full-Login', 3: 'Unidentified-Existing' };
            let usermode = loginModes[checkUserStatus()];
            let verfStatus = getCookie("ImeshVisitor") && getCookieValByKey('ImeshVisitor', 'uv') == 'V' ? "Verified" : "Non-Verified";
            eventTracking("Click-To-Call", props.eventAction, eventLabel + `${track}`+ `|${usermode}|${verfStatus}`, true)
        }}>

        <div className="mr2 clr33 flGrow1">Contact Seller Instantly,<div>Its Free!!</div></div>
        <div id={"pdpcallnowLetstalk"} buttontype={`Call|${props.IsPns}|Letstalk`} data-image={props.imgurl} data-compname={props.CompanyName} data-contact={props.transformedNo} className="fleCntr ltCntr pd10 bxrd20 w40 tc">
            <span buttontype={`Call|${props.IsPns}|Letstalk`} data-image={props.imgurl} data-compname={props.CompanyName} data-contact={props.transformedNo} className="mr5 dib vam callIconBoldGreen wh15"></span>
            <span buttontype={`Call|${props.IsPns}|Letstalk`} data-image={props.imgurl} data-compname={props.CompanyName} data-contact={props.transformedNo}>Let's Call</span>
            {props.companyContactNo ? <span id="pns1" className="dn">{props.companyContactNo}</span> : ""}
        </div>
    </div>
    );
}