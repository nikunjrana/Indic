import React, { useState } from "react";
import Image from "./../../MCATNEW/utility/Card/Image";
import ProductName from "./../../MCATNEW/utility/Card/productName";
import CompanyName from "./../../MCATNEW/utility/Card/CompanyName";
import ProductISQs from "./../../MCATNEW/utility/Card/productISQs";
import { eventTracking } from "../../../Globals/GaTracking";
import { checkUserStatus } from "../../../Globals/MainFunctions";
import { getCookie } from "../../../Globals/CookieManager";
import CtaComponent from "./CtaComponent";
import PriceCta from "./PriceCta";

function Card(props) {
  let usermode = props.loginModes[checkUserStatus()]
  let evenOrOdd = usermode!="Unidentified" ? props.glLastDigit && props.glLastDigit%2==0 ? "|Even":"|Odd":''
  const [eventLabel, seteventLabel] = useState(
    `Pg-${props.listNumber}-${props.productIndex}|Display:${props.product.displayId}`
  );
  let enqLabel = `|EnquiryCTA|IMPCAT|${props.usermode}`
  let checkEnquirySent = (dispId) => {
    let lsData=JSON.parse(localStorage.getItem("imEqGl"));
    if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
        localStorage.removeItem("imEqGl");
        lsData=""; }
    var e = lsData ? lsData['displayId'] : "undef";
    e+= '';
    if (e) {dispId += "";
        var dispIds = e.split(",");
        return dispIds.includes(dispId);
        return e == dispId}
    else return false; };
    let ecom_cart_url = props.product && props.product.ecom_cart_url  ? props.product.ecom_cart_url : props.product.ecom_landing_url ? props.product.ecom_landing_url : '';
  
  
  this.imageHeightWidth = window.outerWidth>500 ? 500*0.466 : window.outerWidth * 0.466;
  this.imgDimensionsInPx = this.imageHeightWidth + "px";
  let ctaID = localStorage.getItem('ctaID');
  if(window.elemNotFound && !getCookie('ImeshVisitor') && ctaID) {
    let whatsappProdObj = JSON.parse(localStorage.getItem('prodDetailsWhatsapp'));
    whatsappProdObj.whatsappLogin = true;
    props.showModal({
      whatsappProdObj,
      queryText: `${props.tracking.pageType}${props.isqTracking?"-ISQ":""}-product-overlay-GetBestPrice${props.lastgadigit%2==0?"|G-Ev":"|G-Od"}|pos-${props.listNumber}-${props.productIndex}|L-${props.tracking.lang.split("Lang")[1]}${props.utmText?props.utmText:""}`,
      ctaName: "सर्वोत्तम मूल्य प्राप्त करें",
      widgetType:"Listing"
    });
    delete window.elemNotFound;
  }
  return (  
    <>
      <ProductName
            url={props.product.url}
            urlType={props.product.urlType}
            tracking={props.tracking}
            eventLabel={eventLabel}
            openMiniPDP={props.openMiniPDP}
            id={props.id}
            name={props.product.productName}
            productSecondaryName={props.product.productSecondaryName}
            data={props}
            displayId={props.product.displayId}
            prodType={props.prodType}
            srcList={props.product.imgUrl}
            eventTracking={eventTracking}
            getCookie={getCookie}
          />
      <div className="df w100 mt10">
        <Image
          url={props.product.url}
          urlType={props.product.urlType}
          tracking={props.tracking}
          eventLabel={eventLabel}
          id={props.id}
          listNumber={props.listNumber}
          openMiniPDP={props.openMiniPDP}
          src={props.product.imgUrl_250 ? props.product.imgUrl_250 : props.product.imgUrl}
          extraPrdName={props.product.extraPrdName}
          displayId={props.product.displayId}
          name={props.product.productName}
          data={props}
          imageHeightWidth={this.imageHeightWidth}
          imgDimensionsInPx={this.imgDimensionsInPx}
          prodType={props.prodType}
          srcList={props.product.imgUrl_250 ? props.product.imgUrl_250 : props.product.imgUrl}
          eventTracking={eventTracking}
          getCookie={getCookie}
        />
        <div className="w100 oh ml15">
          
          {window.location && window.location.search == "?shopnow=1" && !ecom_cart_url ? <div class='fwb fs14'>Currently out of stock</div> : ''}
          <PriceCta
          product = {props.product}
          showModal={props.showModal}
          tracking = {props.tracking}
          usermode = {props.usermode}
          vernacularData={props.vernacularData}
          id={`prod_${props.id}`}
          loginModes={props.loginModes}
          mcatId={props.mcatId}
          mcatName={props.mcatName}
          lastgadigit={props.lastgadigit}
          utmText = {props.utmText}
          isqTracking = {props.isqTracking}
          listNumber={props.listNumber}
          catId={props.catId}
          productIndex={props.productIndex}
          checkUserStatus = {props.checkUserStatus}
      />
            
            <ProductISQs 
              ProductISQs = {props.product.prd_isq}
              eventTracking={eventTracking}
              tracking={props.tracking}
              eventLabel={eventLabel}
            />

            <CompanyName
              tracking={props.tracking}
              eventLabel={eventLabel}
              name={props.product.companyName}
              url={props.product.companyUrl}
              tsCode={props.product.tsCode}
              data={props}
              custTypeWeight={props.product.custTypeWeight}
              productMcatId={props.product.productMcatId}
              catFlname={props.product.catFlname}
              displayId={props.product.displayId}
              eventTracking={eventTracking}
            />
          <span class="clr5a truncateH por oh pdb5 pdl20 db ctIco fs13">
            {props.product.sellerlocation}
          </span>
           
        </div>
      </div>
      <CtaComponent
          product = {props.product}
          showModal={props.showModal}
          tracking = {props.tracking}
          usermode = {props.usermode}
          vernacularData={props.vernacularData}
          id={`prod_${props.id}`}
          loginModes={props.loginModes}
          callNowClick={props.callNowClick}
          mcatId={props.mcatId}
          mcatName={props.mcatName}
          lastgadigit={props.lastgadigit}
          utmText = {props.utmText}
          isqTracking = {props.isqTracking}
          listNumber={props.listNumber}
          catId={props.catId}
          productIndex={props.productIndex}
          checkUserStatus = {props.checkUserStatus}
      />
    </>
  );
}

export default Card;
