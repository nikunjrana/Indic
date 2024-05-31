import '../css/callBtnCommon1.css'
import { eventTracking } from '../../../Globals/GaTracking';
import React from "react";
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';

export const CallNowBtn = (props) => {
    return (
        <div id={props.id}>
            <span data-click={props.dataClick ? props.dataClick : ""} className="bgmim bdrmim bxrd20 pd10 clrw db mt10 mr5 ml5 fw"
                onClick={() => {
                    props.displayPopup();
                    props.callclick ? props.callclick() : '';
                    let eventLabel = props.eventLabel;
                    if (window.pageName && window.pageName == "PDP") {
                        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                        let status = checkUserStatus();
                        eventLabel += (status >= 0 && status <= 2 ? loginModeArray[status] : "");
                    }
                    let loginModes = { 0: 'Unidentified', 1: 'Identified', 2: 'Full-Login', 3: 'Unidentified-Existing' };
                    let usermode = loginModes[checkUserStatus()];
                    let verfStatus = getCookie("ImeshVisitor") && getCookieValByKey('ImeshVisitor', 'uv') == 'V' ? "Verified" : "Non-Verified";
                    eventTracking("Click-To-Call", props.eventAction, eventLabel + `|${usermode}|${verfStatus}`, true)
                }}>
                <span class="mr5 dib vam bkgImgPstnRpt callIcnNAB "></span>
                <span>कॉल करें</span>
                {props.companyContactNo ? <span id="pns1" class="dn">{props.companyContactNo}</span> : ""}
            </span>
        </div>
    );
}