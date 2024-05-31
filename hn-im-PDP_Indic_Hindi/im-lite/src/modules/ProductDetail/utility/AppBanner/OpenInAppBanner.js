import React  from 'react';
// import { checkisAppCookie } from '../../../CentralizePopUp/utility/App/helper';
import "./openInAppBanner.css";
// import bannerDeepLinking from '../../../CentralizePopUp/components/deepLinking';

export default function OpenInAppBanner(props) {
    
    return (
        (!document.referrer.includes("twa") ?
        <div id="appBanr" className="bgDcf  pdb5 pdt5 fs17 clrv pdl115 por bxsdw dn pdr5" onclick={() => { bannerDeepLinking('PDP_Listing_Banner', '', window.location.href) }} style={{ display: 'block' }}>
            <p className="mt10">Get best deals for</p>
            <p className="fw">{props.displayName}<span className="ml5 fwn dib vam">on the go!</span></p>
            <figure className="appBannerSprt dib starImg mt5 vam mr0 ml0 mb0" />
            <span className="fs15 dib vam mt5 pl5">
                4.6   </span>
            <figure className="appBannerSprt dib bannerMobImg poa bt0 lft0 m0" />
            <div onClick={() => {}} className="bgBlu clrw fs16 tc bxrd20 bxsdw w60  mb10 porp"> Open in App </div>
        </div> :"")
    )
}