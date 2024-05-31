import React, { Component } from "react";
import mcatApi from "../../../api/impcatApi";
import { getCookie, setCookie,getCookieValByKey} from "../../../Globals/CookieManager";
import { goToRoute} from "../../../Globals/routingFunction";
import mcatHelper from "../utility/helper";
import { personalisationActionDispatcher } from "../../Widgets/Personalisation/personalisationActionDispatcher"; 
import vernacularData from "../../../Globals/vernacularData";
import { LANG_COOKIE, VERNACULAR_ARR } from "../../../constants/constants";
import { eventTracking, trackPVForMcat } from "../../../Globals/GaTracking";
// import Header from "../../Header/HeaderContainer";
import McatFilter from "../../Mcatfilter/McatFilter";
import View from "./View";
import BreadCrumb from '../utility/BreadCrumb';
import { checkUserStatus } from "../../../Globals/MainFunctions";
import { geolocationHandler } from "../../../Globals/geoLocation";
import PopUpContainer from '../../CentralizePopUp/container/PopUpContainer'
import { update_variables } from '../../CentralizePopUp/utility/helper';
import {getUserCity } from "../../Widgets/LocationFilter/dispatchFilterLocations";
import McatTitle from "./../utility/McatTitle"
import { checkAndSetLS } from "../../../Globals/LsData";
import { createPreflocCookie } from "../../../Globals/preflocLS";

//new change 1
class Page extends Component { 
  constructor(props) {
    super(props);
    this.suggObj = [];
    this.pmcat='';
    this.pmcatnew = '';
    this.pageUrl = '';
    this.prevUrlMcat ='';
    window.refUrl = [document.referrer];
    const dataObj = this.initializeData();
    !window.location.href.includes('waId') ? update_variables() : '';
    this.state = {
      pageData: dataObj.pageData,
      code: dataObj.code,
      error404View: "",
      error5xxView: "",
      mcatData: dataObj.mcatData,
      searchBarText: dataObj.searchBarText,
      vernacularData: dataObj.vernacularData,
      isLoader :false,
      relData:  false,
      currentUrl : location.pathname,
      footer:'',
      update: false,
      cityObj : ''
    };
    this.prPgName = window.pageName;
    this.mcatLcp = window.isMcatLcp ? window.isMcatLcp : false;
    this.country_value = '';
    this.code5xx = 503;
    this.code404 = 404;
    this.code200 = 200;
    this.createView = this.createView.bind(this);
    this.getMcatData = this.getMcatData.bind(this);
    this.setMcatData = this.setMcatData.bind(this);
    this.setMcatLSnPersnlisatn = this.setMcatLSnPersnlisatn.bind(this);
    this.langChangeHandler = this.langChangeHandler.bind(this);
    this.getSoiBanner = this.getSoiBanner.bind(this);
    this.loadComponent=this.loadComponent.bind(this);
    this.relatedData = this.relatedData.bind(this);
    typeof getCookie(LANG_COOKIE) == "undefined"
      ? setCookie(LANG_COOKIE, 0)
      : "";
    window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
    window.pageName = "mcat";
    window.pagename = "mcat";
    sessionStorage.setItem('isback',true) //home bckj for ads
    let glid=getCookieValByKey('ImeshVisitor','glid')?getCookieValByKey('ImeshVisitor','glid'):'';
    this.glLastDigit= glid[glid.length-1]?glid[glid.length-1]:'';
    this.unmountDiv = this.unmountServerDiv.bind(this);
    window.mcat='mcatconstructor';
    this.cityarr = [];
    this.checkBlFormOpen=(window && window.location && window.location.href && window.location.href.includes("blformopen") && window.location.href[window.location.href.length-1]=='1')?true:false;
    const urlSearchParams = window.location && window.location.search ? new URLSearchParams(window.location.search) : '';
        this.params = {};
        if (urlSearchParams) {
            urlSearchParams.forEach((value, key) => {
            this.params[key] = value;
            });
        }
    this.eventType = 'pointerdown';
    if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
        this.eventType = 'click';
    }
    }

    componentWillMount(){
      if (getCookie('iploc') && getCookie('gstate')) { this.country_value = getCookieValByKey('iploc', 'gcniso');}
      else {geolocationHandler().then((data) => {this.country_value = data.country_iso;})}
      if ((this.country_value == '' || this.country_value == 'IN') && getCookieValByKey('ImeshVisitor', 'iso') && getCookieValByKey('ImeshVisitor', 'iso') != 'IN') {
        this.country_value = getCookieValByKey('ImeshVisitor', 'iso') ? getCookieValByKey('ImeshVisitor', 'iso') : '';}
      if(Object.getPrototypeOf(this).constructor.STATE && window.browserBack && this.state.currentUrl == Object.getPrototypeOf(this).constructor.STATE.currentUrl)
      {
      this.setState(Object.getPrototypeOf(this).constructor.STATE || {});
      }  
    }
    loadComponent(){
    if(!this.state.footer){
      import(/* webpackChunkName:"Footer" */'../../App/container/FooterContainer').then((module) => {
        this.setState({footer: module.default });
      });
    }
    import(/* webpackChunkName:"RUMTracking"*/"../../CentralizePopUp/utility/App/TTFBtracking").then(module=>{module.TTFBtracking('IMPCAT')});
    window.removeEventListener(this.eventType, this.loadComponent, { passive: true });
    window.removeEventListener("scroll", this.loadComponent, { passive: true });
    }
    relatedData(){
    let margin = 200;
    if(this.state.mcatData && this.state.mcatData.firstListData && this.state.mcatData.firstListData.length == 28){
      let productCardCount1 = document.getElementById('prod_20');
      let boundA = productCardCount1 ? productCardCount1.getBoundingClientRect(): '';
      if((boundA.top < (window.innerHeight - margin) && (boundA.top > (-1 * (boundA.height - margin)))) && !this.state.relData){
        personalisationActionDispatcher();
        this.setState({relData: true})   
        }
    }
    else if(this.state.mcatData && this.state.mcatData.firstListData && (this.state.mcatData.firstListData.length >10 && this.state.mcatData.firstListData.length < 28)){
     let productCardCount2 = document.getElementById('prod_'+(this.state.mcatData.firstListData.length - 8));
     let boundB = productCardCount2 ? productCardCount2.getBoundingClientRect() :'';
     if((boundB.top < (window.innerHeight - margin) && (boundB.top > (-1 * (boundB.height - margin)))) && !this.state.relData){
        personalisationActionDispatcher();
        this.setState({relData: true})   
        }
    }
    }
    unmountServerDiv() {
      window.callClick ? document.body.style.overflow =  "" :'' ;
      let lcpDiv = document.getElementById("LcpDiv");
      lcpDiv ? lcpDiv.parentNode.removeChild(lcpDiv) :"";
      let mcatFilter = document.getElementById("mcatFilter");
      mcatFilter ? mcatFilter.parentNode.removeChild(mcatFilter):"";
      let mcatHeader = document.getElementById("belowHeader");
      mcatHeader ? mcatHeader.parentNode.removeChild(mcatHeader):"";
        document.getElementById("mcatloader")? document.getElementById("mcatloader").style.visibility="hidden":'';
        window.callClick && window.mcatCardIndex!=="undefined" && document.getElementById("McatCallprod_"+(window.mcatCardIndex+1)) ? document.getElementById("McatCallprod_"+(window.mcatCardIndex+1)).click() : '';
        window.enquiryClick && window.mcatCardIndex!=="undefined" && document.getElementById("dispid"+window.mcatCardIndex) ? document.getElementById("dispid"+window.mcatCardIndex).click() : '';
        window.cityFilterPop && document.getElementById("cityFilter") ?document.getElementById("cityFilter").click() :'';
        window.catFilterPop && document.getElementById("catFilter") ?document.getElementById("catFilter").click() :'';
        window.brandFilterPop && document.getElementById("brandFilter") ?document.getElementById("brandFilter").click() :'';
        window.bizFilterPop && document.getElementById("bizFilter") ?document.getElementById("bizFilter").click() :'';
        window.isMcatLcp && window.scrollTo(0, 0);
      }

  getSuggobj(mcatData) {
    let obj = {
      "searches": mcatData.mcatName,
      "cities": mcatData.cityName || mcatData.rehitCityName || "",
      "cats": mcatData.catId ? mcatData.catId : "",
      "mcats": mcatData.mcatId
        ? mcatData.mcatId
        : "",
      "mcatnames": mcatData.mcatName
    };
    return obj;
  }

  processMcatData(data,rehit=false) {
    let mcatData = data;
    let language = getCookie(LANG_COOKIE);
    let cityName = this.props.params.cityORalias
      ? this.props.params.cityORalias
      : "";
    //Rehit true in case of city pages where city data not present
   mcatData['rehit'] = rehit;
    (mcatData["currentUrl"] = this.props.location.pathname),
    mcatData["cityName"] = !rehit ? cityName : '';
    mcatData["rehitCityName"] = rehit ? cityName : '';
    mcatData["tracking"] = mcatHelper.getTrackingLabels(
      language,
      mcatData["mcatgenric_flag"],
      mcatData["districtFlag"],
      cityName,
      mcatData["rehitCityName"],
    );
    mcatData["mcatCityCombinedName"] = mcatHelper.getMcatCityCombinedName(mcatData,language);
    mcatData["dirUrl"] = mcatData["dirUrl"] ? mcatData["dirUrl"]:mcatHelper.getDirUrl(this.props.location.pathname);
    mcatData["ORGUrL"] = mcatData.isq_filter && mcatData.isq_filter.CurrentID && mcatData.isq_filter.CurrentArray && mcatData.isq_filter.CurrentArray.Path ? "https://dir.indiamart.com"+mcatData.isq_filter.CurrentArray.Path : mcatData["ORGUrL"] ? mcatData["ORGUrL"]:mcatHelper.getDirUrl(this.props.location.search?this.props.location.pathname + this.props.location.search :this.props.location.pathname);
    return mcatData;
  }

  initializeData() {
    let vernacularData = this.getVernacularData();
    if (window.__MCATSTATE__) {
      let pageData = { ...window.__MCATSTATE__ };
      let code = pageData.header_status;
      let searchBarText = '';
      let mcatData = {};
      if(code == 200){
        let cityName = mcatData.cityName || mcatData.rehitCityName;
        let data = this.setMcatData(pageData,pageData["rehit"],cityName)
        mcatData  = data.mcatData;
        searchBarText = data.searchBarText;
        pageData = {}
      }
      this.hideLoader()
      return {
        pageData: pageData,
        code: code,
        mcatData: mcatData,
        searchBarText: searchBarText,
        vernacularData: vernacularData,
      };
    }
    else{
        this.showLoader();
        return {
          pageData: "",
          code: 0,
          mcatData: {},
          searchBarText: "",
          vernacularData: vernacularData,
        };
    }
  }

  getMcatData(rehit = false,langChange) {
    let flName = this.props.params.cityindORcatlink;
    let bizValue = this.props.location &&
      this.props.location.query && this.props.location.query.biz
        ? this.props.location.query.biz
        : "";
    let isCorrectBiz = true;
    if(bizValue){
        let bizArray = ["10","20","30","40"]
        isCorrectBiz = bizArray.includes(bizValue) ? true : false;
    }
    let ecomValue = this.props.location && this.props.location.query && this.props.location.query.shopnow ? this.props.location.query.shopnow : '';
    const regex = /^[0-9]+$/;
    let isqFilter = this.props.location && this.props.location.search && this.props.location.search.includes("?q-") ?this.props.location.search.split("-")[1]:this.props.params && this.props.params.isq_quote && this.props.params.isq_quote.split("-q")?this.props.params.isq_quote.split("-q")[1]:""
    let isIsqFilter = isqFilter ? regex.test(isqFilter)?true:false: true;
    // handling of price query param
    let price_flag = this.props.location && this.props.location.query && this.props.location.query.price ? 1 : 0;
    if(!(isCorrectBiz && isIsqFilter)){
      let msg = "Incorrect Biz/Isq value";
      this.loadErrorView(this.code404,{header_status:404,msg:msg})
    }
    else if(flName && (isCorrectBiz || isIsqFilter)){
      let lang = getCookie(LANG_COOKIE) === "1" ? "hi" : "en";
      let start = 1;
      let end = 28;
      let cityName = this.props.params.cityORalias 
      ? this.props.params.cityORalias
      : "";
      let cityParam = !rehit ? cityName : '';
      let that = this;
      mcatApi
        .getMcatData(flName, cityParam, start, end, lang, bizValue,ecomValue,isqFilter,price_flag)
        .then((data) => {
          //error check - service time out or client error or server errors
          let response = data.response ? data.response : '';
          if(response == ''){
            throw(data)
          }
          let code = response.header_status;
          if(code == 404 && response.msg == "rehit"){
            let rehit = true;
            that.getMcatData(rehit)
          }
          else if(code == 301 && response['alternate_mcat_name']){
            let redirectStatus = 301;
            let page = cityName ? `city/${cityName}` : 'impcat';
            let redirectUrl = `/${page}/${response['alternate_mcat_name']}.html`;
            goToRoute({status :redirectStatus,pathname : redirectUrl})
          }
          else if(code==301 && response["Reason"] == "BANNED_CITY" ){
            let redirectStatus = 301;
            let reqPath = window.location.href && window.location.href.split("/") ? window.location.href.split("/") : [];
            let page = reqPath && reqPath.length>5 && reqPath[5] ? reqPath[5] : "";
            let redirectUrl = `/impcat/${page}` ;
            goToRoute({status :redirectStatus,pathname : redirectUrl})
          }
          else if(code==301 && response["Reason"] == "NO DATA FOR FILTER"){
            let redirectStatus = 301;
            let reqPath = window.location.href && window.location.href.split("/") ? window.location.href.split("/") : [];
            let page = reqPath && reqPath.length>4 && reqPath[4] ? reqPath[4] : "";
            let redirectUrl = `/impcat/${page}` ;
            goToRoute({status :redirectStatus,pathname : redirectUrl})
          }
          else if (code == 200) {
            that.hideLoader();
            let data = this.setMcatData(response,rehit,cityName)
            this.setMcatLSnPersnlisatn(data.mcatData);
            window.addEventListener('scroll',this.getSoiBanner, {passive : true});
            let vernacularData = langChange
              ? that.getVernacularData()
              : that.state.vernacularData;
            that.setState({
              pageData: response,
              code: 200,
              mcatData: data.mcatData,
              searchBarText: data.searchBarText,
              vernacularData: vernacularData,
              isLoader :false
            });
          } 
          else {
            that.loadErrorView(code, response);
          }
        })
        .catch((error) => {
         
          if(error && error.status && error.status == 404){
            that.loadErrorView(this.code404, error);
          }
          else
          that.loadErrorView(this.code5xx, error);
        });
      }
    else{
      let msg = "null flname";
      this.loadErrorView(this.code404,{header_status:404,msg:msg})
    }
  }
  setMcatData(response,rehit,cityName){
    let mcatData = this.processMcatData(response,rehit);
    let path = mcatData.ORGUrL;
  let cityName2 = path && !path.includes("/impcat/") && path.split("/") && path.split("/")[3] ? path.split("/")[3] : '';
  let mcatName = path && !path.includes("/impcat/") && path.split('/') && path.split("/")[4] ? path.split("/")[4] :'';
  cityName2 = cityName2.toLowerCase();
  cityName2 = cityName2 && !cityName2.endsWith("%20") && cityName2.includes('%20') ? cityName2.replace('%20', '-') : cityName2;
  while(cityName2 && cityName2.includes('%20')){
    cityName2 = cityName2.replace('%20', '')}
  path = `https://dir.indiamart.com/${cityName2}/${mcatName}`
  mcatData.ORGUrL = mcatData.ORGUrL.includes("/impcat/") ? mcatData.ORGUrL : path;
        if ( document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href=mcatData.ORGUrL; 
    } else {
        let link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', mcatData.ORGUrL);
        document.head.appendChild(link);
    }
    if(document.querySelector("title")) {
      document.querySelector("title").innerText = mcatData.title;
    }
    window.autofetch = 1;
    window.optimizeEvent = true;
    this.suggObj = this.getSuggobj(mcatData);
    let isqtext = mcatData.isq_filter && mcatData.isq_filter.CurrentArray && mcatData.isq_filter.CurrentArray.Text ? mcatData.isq_filter.CurrentArray.Text + " ":""
    let searchBarText = isqtext + mcatHelper.getSearchBarText(mcatData);
    // cityName ? mcatHelper.setMcatCookies(cityName, mcatData.cityid) : "";
    cityName ? mcatHelper.setMcatCookies(cityName, mcatData.cityid) : mcatHelper.deleteMcatCookies();
    //PV Tracking and Custom Dimensions
    this.pmcat = mcatData && mcatData.mcatgenric_flag && mcatData.mcatgenric_flag == "1"?"PMCAT":"MCAT";
    this.pmcat = this.pmcatnew ? this.pmcatnew : this.pmcat;
    this.pageUrl = this.prevUrlMcat ? this.prevUrlMcat : window.refUrl && window.refUrl.length == 1 && window.refUrl[0].includes("google")? window.refUrl[0]:"";
    this.isqPresent = mcatData && mcatData.isq_filter && mcatData.isq_filter.CurrentID? 1:0
    window.location.href && window.location.href.includes('waId') && !getCookie('ImeshVisitor') && localStorage.getItem('ctaID') ? "" : trackPVForMcat(mcatData,this.pmcat,this.prPgName,this.pageUrl,this.isqPresent);
    return ({mcatData,searchBarText})
  }
  setMcatLSnPersnlisatn(mcatData){
    mcatHelper.setLocalStorage(mcatData);
    document.getElementById("page_name").value = mcatData.tracking.pageType;
    window.pageName = mcatData.tracking.pageType;
    window.pagename = mcatData.tracking.pageType;
    window.mcatType = mcatData.tracking.pageType;
    if(mcatData && mcatData.firstListData && mcatData.firstListData.length < 10){
    personalisationActionDispatcher();
    }
  }
  loadErrorView(code, response) {
    if (code == this.code5xx) {
      import(
        /* webpackChunkName:"Error5xx" */ "../utility/Error5xx/Error5XX"
      ).then((module) => {
        this.hideLoader();
        this.setState({
          error5xxView: module.default,
          pageData: response,
          code: code,
          mcatData: {},
          isLoader:false
        });
      });
    } else {
      import(
        /* webpackChunkName:"Error404" */ "../utility/Error404/Error404"
      ).then((module) => {
        this.hideLoader();
        this.setState({
          error404View: module.default,
          pageData: response,
          code: code,
          mcatData: {},
          isLoader :false
        });
      });
    }
  }

  showLoader(){
    let loader = document.getElementById("gblLoader");
    if(loader && loader.style.display == 'none')
      loader.style.display = "block";
  }

  hideLoader() {
    let loader = document.getElementById("gblLoader");
    if(loader && loader.style.display == 'block')
       loader.style.display = "none";
  }

  componentDidMount() {
    // Remarketing Tag: <!-- Google tag (gtag.js) only for pcd-pharma-franchise -->
    if(this.state.mcatData && this.state.mcatData.mcatId == "178449"){
      mcatHelper.loadScript("https://www.googletagmanager.com/gtag/js?id=AW-1067418746",()=>{
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ dataLayer.push(arguments);}
        window.gtag('js', new Date());
        window.gtag('config', 'AW-1067418746');
      });
      mcatHelper.loadScript("https://www.googletagmanager.com/gtag/js?id=AW-11323352026",()=>{
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ dataLayer.push(arguments);}
        window.gtag('js', new Date());
        window.gtag('config', 'AW-11323352026');
        window.gtag('event', 'conversion', {'send_to': 'AW-11323352026/bjsZCJLGwfQYENrHspcq'});
      });
    }
    let checkforSession=sessionStorage && sessionStorage.getItem("blformopen") && JSON.stringify(sessionStorage.getItem("blformopen"));
    this.checkBlFormOpen && !checkforSession?(eventTracking("M-Site","Remarketing","Impression-blformopen/"+this.params.utm_campaign,true),sessionStorage.setItem("blformopen",true)):"";
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      eventTracking('MCAT_Page',msg, `${url} | ${lineNo} | ${columnNo}`,true);
      return true;}
    window.addEventListener(this.eventType, this.loadComponent, { passive: true });
    window.addEventListener('scroll', this.loadComponent, { passive: true });
    //Backbutton Journey
    this.setState({update:true})
    if (history.state && history.state.type == "modifyBack") {//back from some php page
      window.addEventListener('popstate', this.onPopHistoryPHP, { passive: true });
    }
    else if (window.refUrl.length == 1 && (window.refUrl[0] == '' || window.refUrl[0].indexOf('indiamart.com') === -1)) {
      history.pushState({ type: "modifyBack" }, location.pathname, "")
        window.addEventListener('popstate', this.onPopHistory, { passive: true });
    }
    if (window.__MCATSTATE__) {
        window.__MCATSTATE__ = null; 
        if (this.state.code == this.code200){
          this.setMcatLSnPersnlisatn(this.state.mcatData)
          window.addEventListener('scroll',this.getSoiBanner, {passive : true});
        }
        else
        {
          this.loadErrorView(this.state.code, this.state.pageData);
        }
    } 
    else{
      if(!Object.getPrototypeOf(this).constructor.STATE || (Object.getPrototypeOf(this).constructor.STATE && Object.getPrototypeOf(this).constructor.STATE.currentUrl!=this.state.currentUrl) )
      {
      this.showLoader();
      this.getMcatData();
      }
      else
      { 
        this.showLoader();
        this.getMcatData();
        this.hideLoader();
      }
    }
    window.addEventListener("scroll",this.relatedData,{ passive: true });
    this.unmountServerDiv();
    window.onpopstate = function () {
      if( window.isSearchImpcat)window.IMPCAT_SEARCH_BACK=true;
  };
    
  }
  

getSoiBanner(){
  if((checkUserStatus() == '2' && getCookieValByKey('ImeshVisitor', 'utyp')=='N' && getCookieValByKey("soiBar", "v") != '100') || (checkUserStatus()=='1' && getCookieValByKey('ImeshVisitor', 'utyp')=='N')){
    import(
      /* webpackChunkName:"UtilityComponent" */'../../../api/utilityApi'
    ).then((module) => {
        let utilityApi = module.default
        utilityApi.checkForSoiBanner(this);
    });
  }

  window.removeEventListener('scroll',this.getSoiBanner, { passive: true })
  
}
onPopHistoryPHP() {
    if (window.refUrl[window.refUrl.length - 1] == "somePopUp") {
      window.refUrl.pop();}
    else { history.replaceState("", "", "/");
      window.location.reload();}
}
onPopHistory() {
    if (window.refUrl[window.refUrl.length - 1] != "somePopUp" && window.refUrl.length == 1 && (window.refUrl[0] == '' || window.refUrl[0].indexOf('indiamart.com') === -1)) {
      history.replaceState("", "", "/");
        window.location.reload();}
    window.refUrl.pop();    
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.code == this.code200){
      window.pageName = this.state.mcatData.tracking.pageType;
      window.pagename = this.state.mcatData.tracking.pageType;
    }
    this.pmcatnew = prevState.mcatData.mcatgenric_flag == "1" ? "PMCAT" : "MCAT"
    let checkLocalItem = '';
    this.prevUrlMcat = window.refUrl && window.refUrl.length == 1 && window.refUrl[0].includes("google")? window.refUrl[0]:"";
    if(this.prevUrlMcat == '' && localStorage.getItem('PDP404URL')){
        checkLocalItem = JSON.parse(localStorage.getItem('PDP404URL'))
        this.prevUrlMcat = checkLocalItem.previousPageURL?checkLocalItem.previousPageURL: this.prevUrlMcat;
        this.prevUrlMcat == window.location.href ? this.prevUrlMcat ='':'';
    }
    if(!this.state.cityObj){
      getUserCity().then((res)=>{this.setState({cityObj : res ? res : ''})})
    }
    let prefLoc = createPreflocCookie(((this.state.mcatData&&this.state.mcatData.cityName)?this.state.mcatData.cityName:""),(this.state.cityObj?this.state.cityObj.cityname:''));
    prefLoc && prefLoc.cityName ? checkAndSetLS("prefLoc",prefLoc) : '';
    
    let hitService = mcatHelper.isNewUrl(prevProps, this.props);
    if (hitService) {
      !window.location.href.includes('waId') ? update_variables() : '';
      window.popUpMcat = true;
      if (window.refUrl[window.refUrl.length - 1] !== this.props.location.pathname)
      window.refUrl.push(prevProps.location.pathname)
      this.showLoader();
      this.getMcatData();
      this.setState({currentUrl:location.pathname})
      document.documentElement.scrollTop = 0
    }
  }
  
  componentWillUnmount(){
    window.refUrl = [location.href];
    window.removeEventListener('popstate', this.onPopHistory);
    window.removeEventListener('popstate', this.onPopHistoryPHP);
    document.getElementById("gblLoader") ? document.getElementById("gblLoader").style.display = "none" : '';
    window.removeEventListener("scroll", this.relatedData);
    delete window.optimizeEvent;
    delete window.autofetch;
    Object.getPrototypeOf(this).constructor.STATE = {};
    Object.getPrototypeOf(this).constructor.STATE.code = this.state.code;
    Object.getPrototypeOf(this).constructor.STATE.mcatData = this.state.mcatData;
    Object.getPrototypeOf(this).constructor.STATE.currentUrl = this.state.currentUrl;
    let lcpCallDiv = document.getElementById("pdpcalldiv");
    lcpCallDiv ? lcpCallDiv.parentNode.removeChild(lcpCallDiv) : "";
    let lcpEnquiryDiv = document.getElementById("pdpenquirydiv");
    lcpEnquiryDiv ? lcpEnquiryDiv.parentNode.removeChild(lcpEnquiryDiv) : "";
    delete window.callClick; delete window.enquiryClick; delete window.mcatCardIndex; delete window.cityFilterPop; delete window.catFilterPop; delete window.brandFilterPop; delete window.bizFilterPop;
    delete window.isMcatLcp;
    delete window.isSearchImpcat;
    delete window.elemNotFound;
  }
  langChangeHandler() {
    //Show Loader
    this.showLoader();
    let langChange = true;
    this.getMcatData(false,langChange); 
  }

  getVernacularData() {
    let lang =
      getCookie(LANG_COOKIE) === "1"
        ? VERNACULAR_ARR["hi"]
        : VERNACULAR_ARR["en"];
    let data = vernacularData.getVernacularData();
    return data[lang];
  }
  createView() {
    let pageView = "";
    if (this.state.code == this.code200) {
      let isqText = this.state.mcatData && this.state.mcatData.isq_filter && this.state.mcatData.isq_filter.CurrentArray && this.state.mcatData.isq_filter.CurrentArray.Text ? this.state.mcatData.isq_filter.CurrentArray.Text : ''
      let isqHead = this.state.mcatData && this.state.mcatData.isq_filter && this.state.mcatData.isq_filter.CurrentArray && this.state.mcatData.isq_filter.CurrentArray.Head ? this.state.mcatData.isq_filter.CurrentArray.Head : ''
      let isqPresent = this.state.mcatData.isq_filter && this.state.mcatData.isq_filter.data && this.state.mcatData.isq_filter.data.length>0 ? 1:0
      let clickTracking = this.state.mcatData.tracking.click;
      if(this.state.mcatData && this.state.mcatData.tracking && this.state.mcatData.tracking.click && isqText){
        this.state.mcatData.tracking.click = this.state.mcatData.tracking.click.includes("ISQ")?this.state.mcatData.tracking.click: this.state.mcatData.tracking.click + "-ISQ"
      }
      let placeholdermcat = location.pathname.includes("/city/")? this.state.searchBarText ? this.state.searchBarText : (this.state.mcatData.mcatName + " in " + this.state.mcatData.cityName) : (this.state.mcatData.mcat_display_name ? this.state.mcatData.mcat_display_name : this.state.mcatData.mcatName);
      placeholdermcat = `${isqText?isqText:''} ${placeholdermcat}`;
      pageView = (
        <>  
     
   
          <McatFilter
              tracking={this.state.mcatData.tracking}
              mcatName={this.state.mcatData.mcatName}
              location={this.props.location}
              cityData={this.state.mcatData.cityData}
              bizData={this.state.mcatData.bizData}
              bizName ={this.state.mcatData.bizName}
              ecomValue = {this.state.mcatData.ecom}
              ecomData = {this.state.mcatData.ecomData}
              categoriesData={this.state.mcatData.categoriesData}
              brandsData={this.state.mcatData.brandsData}
              isqData = {this.state.mcatData.isq_filter}
              isqPresent = {isqPresent}
              selectedISQ = {isqText}
              selectedISQHeading = {isqHead}
              uniqueId={this.state.mcatData.uniqueId}
              flName={this.state.mcatData.flName}
              cityName={this.state.mcatData.cityName}
              rehit = {this.state.mcatData.rehit}
              rehitCityName = {this.state.mcatData.rehitCityName}
              page="Mcat"
              vernacularData={this.state.vernacularData}
              getModifiedCityName = {mcatHelper.getModifiedCityName}
              country_value={this.country_value}
              categoryPath = {this.state.mcatData.flName?this.state.mcatData.cityName?`/city/${this.state.mcatData.cityName}/${this.state.mcatData.flName}.html`:`/impcat/${this.state.mcatData.flName}.html`:""}
              />
               {
               <><div className = "bgef">
                 <View
                  location={this.props.location}
                  mcatData={this.state.mcatData}
                  vernacularData={this.state.vernacularData}
                  searchBarText={this.state.searchBarText}
                  country_value={this.country_value}
                  isqTracking = {this.isqPresent}
                  isqPresent = {isqPresent}
                  cityData={(this.cityarr && this.cityarr.cities)? this.cityarr : this.state.mcatData.cityData}
                  checkUserStatus = {checkUserStatus()}
                  getCookieValByKey = {getCookieValByKey}
                  glLastDigit={this.glLastDigit}
                />
              </div>
              <BreadCrumb
                links={this.state.mcatData.breadcrumb}
              />
             {this.state.footer ? <this.state.footer
              pageStatus="good"
              pageName={this.state.mcatData.tracking.pageType}
              desktopLink = {this.state.mcatData.dirUrl}
              />:''}
              </>
            }
        </>
      );
    } else if (this.state.code == this.code5xx && this.state.error5xxView) {
      pageView = (
        <this.state.error5xxView
          location={this.props.location}
          pageData={this.state.pageData}
        />
      );
    } else if (this.state.code == this.code404 && this.state.error404View) {
      pageView = (
        <this.state.error404View
          location={this.props.location}
          pageData={this.state.pageData}
          pageName = {'mcat'}
        />
      );
    } else {
      pageView = "";
    }
    return pageView;
  }

  render() {
   let pageView = this.createView();
   return (
      <>
        <PopUpContainer pageUrl={window.location.href} pageName={"impcat"}/>
        {pageView}
      </>
   );
  }
}

export default Page;