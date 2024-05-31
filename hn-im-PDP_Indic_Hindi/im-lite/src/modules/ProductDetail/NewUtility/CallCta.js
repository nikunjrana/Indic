import React from 'react';
import { getCookieValByKey,getCookie } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';


function CallCta(props) {

    function CallClickhandler(){
        let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
        let usermode = loginModes[checkUserStatus()];
        // console.log(usermode)
        let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        eventTracking("Click-To-Call",props.callProps.eventAction,props.eventLabel+`|${usermode}|${verfStatus}`,true)
    }
    let styleClass = "bdrmim  oh hw50  bxrd10  poa mr3  bgmim tp0 rt0";
    if(props.type=="alsoDealsIn") {
        styleClass = "db bdrmim  oh hw50  bxrd10 bgmim por "
    }
    return (
            <span onClick={(event)=>{requestAnimationFrame(()=>setTimeout(()=>{this.props.displayPopup("IMOB_PDP_Catalog_Info")}));CallClickhandler()}} className={styleClass}>
                <span className="mxhw imgCnt poa wCallIcon"></span>
                <span id="pns1" className="dn notranslate">{props.transformedNo}</span>
            </span>
    );
}

export default CallCta;