import React from "react";
import '../css/soiOnHomePage.css';
import {Link} from 'react-router';
import {eventTracking} from '../../../Globals/GaTracking';
import {yandexTrackingMultiLevel} from "../../../Globals/yandexTracking";
import { getCookieValByKey } from "../../../Globals/CookieManager";
export default function SoiOnHomePage(props) {

  let sellerIntent  = JSON.parse(localStorage.getItem("sellerIntent"));
  let glid=getCookieValByKey('ImeshVisitor', 'glid');
  let variant = sellerIntent && (sellerIntent['ViewCount'] < 10 )? (glid%10<2) ? 1 : (glid%10==2 || glid%10==3)? 2: 5 : 5;
   if(variant==1 || variant==2){
     yandexTrackingMultiLevel(`SOIHomeBanner-V${variant}`,'Total views');
   }
    if(variant==5){
      return (<div></div>)
    }
    else {
    return (
      <div class="mb10 ml5 mr5 mt10 tc">
      <Link to='/seller/'  onClick={() => { eventTracking('SOI_banner', 'click',`SOI-Home-banner-V${variant}`, true) }}>
      <img src={`https://m.imimg.com/gifs/img/SOINewBanner_small_v${variant}.png`} className = "w100" style="height: 109px;"/>
      </Link>
      </div>
    )
    }
}

