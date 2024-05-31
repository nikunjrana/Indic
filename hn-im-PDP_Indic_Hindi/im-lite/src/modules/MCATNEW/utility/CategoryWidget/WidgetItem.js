import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../../Globals/GaTracking';
const WidgetItem = ({ glid,index, ItemData: { NAME, LINK, IMAGE}, clickTracking, ea, listNumber }) => {
  let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
 return (
    ((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ?
    <Link to={LINK + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} className={`dib tc vat mr8 por ht120 bgw widgetBorder`} onClick={() => { eventTracking(clickTracking, ea, `${listNumber}_${index}`, 1); }}>
      <div className={`flx centerItems ${IMAGE.includes(".png") ? "" : "bgimg"}`}>
        <img src={IMAGE} alt={NAME} loading='lazy' className="relatedimg70 vam objctFitSclDown" width="70" height="70" />
      </div>
      <div className="clr33 tc pdt4 fs12 lineClamp whNr lh1_3em">
        {NAME}
      </div>
    </Link> :
    <a href={LINK + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")} className={`dib tc vat mr8 por ht120 bgw widgetBorder`} onClick={(event) => { window.location.href=(LINK + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? "?utm_source=Adwords" : "")) ;eventTracking(clickTracking, ea, `${listNumber}_${index}`, 1); event.preventDefault()}}>
      <div className={`flx centerItems ${IMAGE.includes(".png") ? "" : "bgimg"}`}>
        <img src={IMAGE} alt={NAME} loading='lazy' className="relatedimg70 vam objctFitSclDown" width="70" height="70" />
      </div>
      <div className="clr33 tc pdt4 fs12 lineClamp whNr lh1_3em">
        {NAME}
      </div>
    </a>

  )
}

export default WidgetItem;