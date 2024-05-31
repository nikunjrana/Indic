import React from "react";
import "../../CSS/CompanyName.css";
import mcatHelper from '../helper';
import { Link } from "react-router";
import {getCookieValByKey, setCookie } from "../../../../Globals/CookieManager";

function CompanyName(props) {
  let verifiedIcon = props.custTypeWeight <= 699 ? "verifiedSvg" : (props.custTypeWeight > 699 && props.custTypeWeight < 1400)? "verifiedSvgGr" : "cmpIco";
  let icon = `mcatIcon wh15 mr5 poa lft0 tp0 ${(props.custTypeWeight == 149 || props.custTypeWeight == 179 || props.tsCode) ? "tseaIco" : (props.custTypeWeight != 750)? verifiedIcon: "cmpIco"}`;
  let pdlName = (props.custTypeWeight == 149 || props.custTypeWeight == 179 || props.tsCode) || (props.custTypeWeight < 1400 && props.custTypeWeight != 750)? "pdl20" : "pdl20 pdb5";
  let namePdb = (props.custTypeWeight == 149 || props.custTypeWeight == 179 || props.tsCode) || (props.custTypeWeight < 1400 && props.custTypeWeight != 750)? "pdb7" : "";
  function setTransitionData() {
     if(props.data && props.data.product){
      let cData = {
        COMPANY_LOGO: props.data.product.company_logo,
        CONTACTNO: props.data.product.companyContactNo,
        CONTACTTYPE: props.data.product.companyContactVal,
        CONTACTORG: props.data.product.companyContactNo,
        DIR_SEARCH_CITY: props.data.product.city,
        DIR_SEARCH_COMPANY: props.data.product.companyName,
        FREESHOWROOM_ALIAS: props.data.product.tsCode,
        GLUSR_USR_LOCALITY: props.data.product.locality,
        SLASH_DIR_SEARCH_COMPANY: props.data.product.companyName,
        gluserid:props.data.product.glid,
        BREADCRUMB_MCAT_ID: props.data.mcatId,
        PRDSERV: [],
      };
      let ccData = {
        companyData: cData,
        companyUrl: mcatHelper.CompanyUrl(props.url),
        callDbTracking: "company-home-Card-mcat",
        enqDbTracking: "company-homepage-mcat" + "-cheader-overlay-js",
        tracking: "Company-IntermedScreen-mcat",
        trackingg: "Home-IntermedScreen-mcat",
        from : "mcat"
      }
      window.companyTransition = ccData;}}
  let url = mcatHelper.CompanyUrl(props.url) + ((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?"?utm_source=Adwords":"")
  let glid = getCookieValByKey("ImeshVisitor","glid");
  let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
  let IntFlg = (props.catFlname && props.catFlname!= "new-items.html" && props.catFlname != "other-services.html" && props.catFlname !="other-products.html")? props.catFlname : '';
  return (
      url.includes('company') ? <a href={`/${url}`} onClick = {()=>{mcatHelper.CatToBrowseCookie({"company":url, "conditional_flag":"fortopcat", "brd_mcat_id":props.productMcatId, "category":props.catFlname,"displayid":props.displayId});props.eventTracking(props.tracking.click, "Product-Listing-Clicks-Company-Name", props.eventLabel, 1); }} className={`clr33 fs13 por oh mt5 whNr ${namePdb} db`}>
        <i className={icon}></i>
        <h3 className={"fw fs14 truncateH notranslate "+ pdlName}>{props.name}</h3>
     </a>
      :
      (glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined)) )?   <Link to={`/${url}`} onClick = {()=>{mcatHelper.CatToBrowseCookie({"company":url,"conditional_flag":"fortopcat","brd_mcat_id":props.productMcatId,"category":props.catFlname, "displayid":props.displayId });props.eventTracking(props.tracking.click, "Product-Listing-Clicks-Company-Name", props.eventLabel, 1);setTransitionData();}} className={`clr33 por fs13 oh mt5 whNr ${namePdb} db`}>
      <i className={"mcatIcon wh15 mr5 poa lft0 tp0 "+icon}></i>
      <h3 className={"fw fs14 truncateH notranslate "+ pdlName}>{props.name}</h3>
    </Link> :
      <a href={`/${url}`} onClick = {(event)=>{window.location.href=(`/${url}`);mcatHelper.CatToBrowseCookie({"company":url,"conditional_flag":"fortopcat","brd_mcat_id":props.productMcatId,"category":props.catFlname, "displayid":props.displayId });props.eventTracking(props.tracking.click, "Product-Listing-Clicks-Company-Name", props.eventLabel, 1);setTransitionData();event.preventDefault()}} className={`clr33 por fs13 oh mt5 whNr ${namePdb} db`}>
        <i className={icon}></i>
        <h3 className={"fw fs14 truncateH notranslate "+ pdlName}>{props.name}</h3>
      </a>
  );
}

export default CompanyName;