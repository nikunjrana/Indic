import React, { useState, useEffect } from 'react';
import { callEnqForm,fireOnClicktracking } from '../utility/helper';
import { getCookieValByKey,getCookie } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
// import { callEnqForm } from './CTA/helper';
import { checkUserStatus } from '../../../Globals/MainFunctions';

function BarEnqCta(props) {
  const {
    enqSent: initialEnqSent,
    mcatId,
    Price,
    CompanyName,
    GlusrId,
    ItemName,
    DisplayId,
    imgurl,
    ctaName,
    catID,
    callProps,
    showModal,
    calledCTAsFrom,
    queryRef,
    pdpModrefType,
    pageLang,
    eventLabel,
    track,
    transformedNo,
  } = props;

  // Initialize state with the enqSent prop
  const [enqSent, setEnqSent] = useState(initialEnqSent);
  function CallClickhandler(){
    let loginModes = {0:'Unidentified',1:'Identified',2:'Full-Login',3:'Unidentified-Existing'};
    let usermode = loginModes[checkUserStatus()];
    // console.log(usermode)
    let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
    eventTracking("Click-To-Call",callProps.eventAction,eventLabel+`|${usermode}|${verfStatus}`,true)
}
  function handleClick(){
    callEnqForm(mcatId, Price, CompanyName, GlusrId, ItemName, DisplayId, imgurl, ctaName, catID, callProps, showModal,pdpModrefType,queryRef,pageLang,track)
    fireOnClicktracking(false, false,0,false,"PDP" ,DisplayId ,'', calledCTAsFrom)
  }
  useEffect(() => {
    // Update the state whenever the enqSent prop changes
    setEnqSent(initialEnqSent);
  }, [initialEnqSent]);

  return (
    <div id="bottomLayerEnqCTA" className="db pdb10 pdl10 pdt5 pdr10">
      <div>
        <span
          id="pdpcallnowBlyr" onClick={(event)=>{this.props.displayPopup();CallClickhandler()}}
          className={`w100 fs16 bxrd20 bgmim bottomLayer fl tc tst pdt12 pdb12 fw ${enqSent ? '' : 'dn'}`}
        >
          <i id={'callicn'+DisplayId} className={`mr5 dib vam bkgImgPstnRpt ${enqSent ? 'callIcnNAB' : 'callIcnN'}`}></i>
          <span id={'calltxt'+DisplayId} className={`clrw ${enqSent ? '' : 'dn'}`}>कॉल करें</span>
          <span id="pns1" className="dn">{transformedNo}</span>
        </span>
        <button
          id="pdpgbpBLyr"
          onClick={(event) =>handleClick() }
          className={`bdrmim bgw bxrd20 bxsdw clrmim fs14 fw500 pdb12 pdt12 tc w100 ${enqSent ? 'dn' : ''}`}
        >
          <i className="enqIconBgGreen dib vam mr2"></i>
          <span>Request For Best Deal</span>
        </button>
        <p className="clrBoth"></p>
      </div>
    </div>
  );
}

export default BarEnqCta;
