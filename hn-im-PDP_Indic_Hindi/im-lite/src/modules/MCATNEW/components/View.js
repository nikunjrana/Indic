import React, { Component } from "react";
import Listing from "../utility/Listing";
import "../CSS/FirstFold.css";
import { callNowActionDispatcher } from "../../CallNow/actions/callNowActionDispatcher";
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMiniPdp: false,
      MiniPDP: "",
      miniPDPeventLabel: "",
      miniPDPData: {},
      showEnqPopup: false,
      BrandBillboard: "",
      AutofetchCont: "",
      FeaturedCategoriesContainer: "",
      AdsComponent: "",
      ratingForm:false,ratingFormUi:'',sellerComany:'',sellerGlid:'',
    };
    this.arr=[];
    this.mblPropForeignNew = {};
    this.mblProp = {};
    this.enqProps = {};
    this.adultFlag = this.props.mcatData.showAds;
    this.connectionChecking = this.connectionChecking.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeMiniPDP = this.closeMiniPDP.bind(this);
    this.openMiniPDP = this.openMiniPDP.bind(this);
    this.loadAdsJs = this.loadAdsJs.bind(this);
    this.mcatAds = this.mcatAds.bind(this);
    this.loadComponent=this.loadComponent.bind(this);
    this.loadEnqCallContainer= this.loadEnqCallContainer.bind(this);
    this.callNowClick = this.callNowClick.bind(this);
    // this.checkCallDuration = this.checkCallDuration.bind(this);
    this.adsnameidForMcat = {};
    this.adsnameidForGeneric = {};
    this.adsnameidForCity = {};
    this.mcatAds();
    this.sellerIntent = JSON.parse(localStorage.getItem("sellerIntent"));
		this.companyalready=this.sellerIntent&&this.sellerIntent.CompanyName?true:false;
    this.eventType = 'pointerdown';
    if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
        this.eventType = 'click';
    }
  }

  mcatAds() {
    // list-Indian and Foreign Both
      
         this.adsnameidForMcat = {
          13: [1, "/3047175/Msite_MCAT_listings_6", "div-gpt-ad-1533625403831-0"],
          20: [1, "/3047175/msite_category_listings_36", "div-gpt-ad-1528289882840-2"],
          27: [1, "/3047175/msite_category_footer", "div-gpt-ad-1528289882840-0"]
        };
}
 checkCallDuration=(glusrID, companyName)=>{
  if (this.props.checkUserStatus == 2) {
    let flag = 1;
    let valueComp = localStorage.getItem("CompanyGlID") ? (localStorage.getItem("CompanyGlID")) : '';
    flag = valueComp && valueComp.includes(glusrID) ? 0:1;
    let time = new Date();
    localStorage.setItem("SetCallCompany", time);
    let lsData = (localStorage.getItem("SetCallCompany"));
    let visibilityChange, visibilityState;
    if (typeof document.visibilityState !== 'undefined') {
      visibilityChange = 'visibilitychange';
      visibilityState = 'hidden';
    } else if (typeof document.mozHidden !== 'undefined') {
      visibilityChange = 'mozvisibilitychange';
      visibilityState = 'mozVisibilityState';
    }
  document.addEventListener(visibilityChange, newFun)
  let that = this;
  function newFun() {
    if (lsData) {
      if (!document[visibilityState]) {
        let oldTime = new Date(lsData);
        let t = new Date();
        let diff = (t.getTime() - oldTime.getTime()) / 1000;
        if (diff > 60) {
        let seller_id = glusrID ? glusrID : '';
        if (sessionStorage.getItem("ratingInfo")) {
        let arr = JSON.parse(sessionStorage.getItem("ratingInfo"));
         for (let i in arr) {
           if (arr[i] == seller_id) {
            flag = 0;
            break; }
          }}
    if(flag){
  that.showRatingForm(glusrID, companyName);
  that.arr.push(glusrID)
  localStorage.setItem("CompanyGlID", JSON.stringify(that.arr));
    }
       window.refUrl ? window.refUrl.push("somePopUp") : "";
       }
      localStorage.removeItem("SetCallCompany");
      document.removeEventListener(visibilityChange, newFun)}
      }
    }
  }
}
loadEnqCallContainer() {
  if (!this.state.EnqBlView) {
    import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module) => {
      this.setState({ EnqBlView: module.default });
    })
  }
  if (!this.state.CallView) {
    import(/* webpackChunkName:"CallPWA" */'../../CallNow/container/CallNowContainer').then((module) => {
      this.setState({ CallView: module.default  });
    })
  }
  window.removeEventListener(this.eventType, this.loadEnqCallContainer, { passive: true });
  window.removeEventListener('scroll', this.loadEnqCallContainer, { passive: true });
  window.removeEventListener('click', this.loadEnqCallContainer, { passive: true });
}
showRatingForm = (glusrID, companyName) => {
  if(!this.state.ratingFormUi){import(/* webpackChunkName:"ratingFormMailCompant" */'../../Messages/container/RatingFormContainer').then((module) => {this.setState({ ratingFormUi: module.default, ratingForm: true, sellerGlid: glusrID, sellerComany: companyName }); });
  } else {this.setState({ ratingForm: true, sellerGlid: glusrID, sellerComany: companyName });}
}
hideFeedback = () => {this.setState({ ratingForm: false });}

  closeMiniPDP(currentPosition) {
    history.state == "minipdp" ?  history.back() : '';

    this.setState({ showMiniPdp: false });
    let b = setInterval(() => {
      let a = document.getElementById(currentPosition);
      if (a) {
        a.scrollIntoView();
        clearInterval(b);
      }
    });
  }
callNowClick(callObj) {
    let callProps = {
      callTxt: callObj.callTxt,
      image: callObj.image,
      tsCode: callObj.tsCode,
      companyName: callObj.companyName,
      contactNumber: callObj.contactNumber,
      contactType: callObj.contactType,
      glusrID: callObj.glusrID,
      modrefid: callObj.modrefid,
      modrefname: callObj.modrefname,
      query_ref_id: callObj.query_ref_id,
      query_ref_type: callObj.query_ref_type,
      dbpagetrack:callObj.dbpagetrack + '-Impcat',
      eventLabel: callObj.eventLabel,
      custtypeWeight: callObj.custTypeWeight,
      PAID_TYPE : callObj.custTypeWeight <= 699 ? "PAID" : "FREE"
    };
    callNowActionDispatcher(true, callProps);
    this.checkCallDuration(callObj.glusrID, callObj.companyName);
  }
  connectionChecking() {
    if (navigator && navigator.connection && navigator.connection.effectiveType) {
      const connectionType = navigator.onLine
        ? navigator.connection.effectiveType
        : 'offline';
      if (/\slow-2g|2g|slow-3g|3g/.test(connectionType)) {
        return true;
      }
      return false;
    }
    return false;
  }
  loadAdsJs() {
    if (!this.state.AdsComponent) {
      import(
        /* webpackChunkName:"GoogleDFP" */ '../../App/components/GoogleDFP'
      ).then((module) => {
          this.setState({ AdsComponent: module.default })
        });
    }
    window.removeEventListener("scroll", this.loadAdsJs, { passive: true });
  }
  componentDidMount() {
    this.URLPREV=sessionStorage && sessionStorage.getItem("queryParams")?sessionStorage.getItem("queryParams"):""
    this.prevPageUrl=this.URLPREV?this.URLPREV && this.URLPREV.toLowerCase().includes("utm_medium")?true:false:"";
    if(this.prevPageUrl && (!window.location.search.toLowerCase().includes("utm_medium"))){
      if(window.location.search){
        history.replaceState(null,"",window.location.href+"&"+this.URLPREV)
      }else{
        history.replaceState(null,"",window.location.href+"?"+this.URLPREV)
      }
    }
    this.multi_purposeVal = localStorage.getItem("multi_purpose") ? JSON.parse(localStorage.getItem("multi_purpose")) : "";
    this.viewCount = this.multi_purposeVal ? this.multi_purposeVal["userViewCount"] : "";
    if (!this.connectionChecking() && (this.viewCount <= 1) && !window.location.href.includes('waId')) {
      window.addEventListener(this.eventType, this.loadEnqCallContainer, { passive: true });
      window.addEventListener('scroll', this.loadEnqCallContainer, { passive: true });
      window.addEventListener('click', this.loadEnqCallContainer, { passive: true });
    }
    else {
       this.loadEnqCallContainer();
    }
    if (!this.state.BrandBillboard && this.props.mcatData.brandBillboardAdShow) {
      import(
        /* webpackChunkName:"BrandBillboard" */'../../App/components/BrandBillboard'
      ).then((module) => {
        this.setState({ BrandBillboard: module.default });
      });
    }
    window.addEventListener(this.eventType, this.loadComponent, { passive: true });
    window.addEventListener('scroll', this.loadComponent, { passive: true });
   window.addEventListener("scroll", this.loadAdsJs, { passive: true }); 

  }
  loadComponent(){
    if(!this.state.belowListing){
    import(/* webpackChunkName:"McatBelowlisting" */'./BelowListing').then((module)=> {
      this.setState({belowListing: module.default });
    });}
    if (!this.state.AutofetchCont) {
      import(/* webpackChunkName:"Autofetch" */'./Autofetch').then(module => { this.setState({ AutofetchCont: module.default }) })
    }
    if (!this.state.FeaturedCategoriesContainer) {
      import(/* webpackChunkName:"FeaturedCategories" */ "../../Widgets/Personalisation/FeaturedCategories/FeaturedCategoriesContainer").then((module) => {this.setState({ FeaturedCategoriesContainer: module.default }); });
    }
    window.removeEventListener(this.eventType, this.loadComponent, { passive: true });
    window.removeEventListener("scroll", this.loadComponent, { passive: true });
 }

 componentWillUnmount()
 {
  window.removeEventListener("scroll", this.loadAdsJs, { passive: true });
 }
  componentDidUpdate(prevProps) {
    if ((this.props.mcatData.uniqueId != prevProps.mcatData.uniqueId) && this.props.mcatData.foreignCampaignMiniBl) {
      document.getElementById("McatForeignMBL")?document.getElementById("McatForeignMBL").style.display="block":'';
    }
    if (this.props.mcatData.showAds && this.props.mcatData.uniqueId != prevProps.mcatData.uniqueId) {
      this.setState({ AdsComponent: "" })
      this.mcatAds();
    }
    if (this.state.showMiniPdp && prevProps.mcatData.uniqueId != this.props.mcatData.uniqueId) {
      this.setState({ showMiniPdp: false })
    }
    if (this.props.mcatData.brandBillboardAdShow && this.props.mcatData.uniqueId != prevProps.mcatData.uniqueId) {
      this.setState({ BrandBillboard: "" });
      import(
          /* webpackChunkName:"BrandBillboard" */'../../App/components/BrandBillboard'
      ).then((module) => {
        this.setState({ BrandBillboard: module.default });
      });
    }
  }
  openMiniPDP(CardData, currentPosition, eventLabel) {
    let modifiedCardData = {
      displayid: CardData.product.displayId,
      mcatid: CardData.mcatId,
      glusrid: CardData.product.glid ? CardData.product.glid.toString() : '',
      companylink: `/${CardData.product.companyUrl}`,
      companyname: CardData.product.companyName,
      image: CardData.product.imgUrl,
      title: CardData.product.productName,
      CONTACTNO: CardData.product.companyContactNo,
      CONTACTTYPE: CardData.product.companyContactVal,
      currentPos: currentPosition,
      tscode: CardData.product.tsCode,
      dbProductName: CardData.product.extraPrdName,
      adultFlag:!this.adultFlag,
    };
    window.refUrl.push("somePopUp");

    this.setState({
      showMiniPdp: true, miniPDPData: modifiedCardData,
      miniPDPeventLabel: `mini-Pdp-${eventLabel}`,
    });
    let that = this;
    if (!this.state.MiniPDP) {
      import(
        /* webpackChunkName:"MiniPDP" */ "../../centralizeMiniPDP/miniPDPContainer"
      ).then(function (module) {
        that.setState({
          MiniPDP: module.default,

        });
      });
    }
  }
  showModal(prop) {
    this.enqProps = prop;
    this.enqProps.adultFlag = this.adultFlag;
    prop.whatsappProdObj ? this.enqProps = this.enqProps.whatsappProdObj : '';
    this.setState({ showEnqPopup: !this.state.showEnqPopup });
  }
  render() {
    let bizId;
    if(window.location.href){
      bizId=window.location.href[window.location.href.length-2]+window.location.href[window.location.href.length-1];
    }
    this.mblProp = {
      searchKey: '',
      showSuggestion: 'showSuggestion',
      queryText: `${this.props.mcatData.tracking.pageType}${this.props.isqTracking?"-ISQ":""}|P|L-${this.props.mcatData.tracking.lang.split("Lang")[1]}`,
      miniBl: true,
      productName: this.props.mcatData["mcatCityCombinedName"],
      productImage: this.props.mcatData.mcatImg125,
      page: this.props.mcatData.tracking.pageType,
      affiliationId: "-140",
      mcatId: this.props.mcatData.mcatId,
      catid: this.props.mcatData.catId,
      EnqBlForm: this.state.showEnqPopup,
      bizId:bizId
    }
    this.mblPropForeignNew = {
      searchKey: '',
      showSuggestion: 'showSuggestion',
      queryText: `${this.props.mcatData.tracking.pageType}${this.props.isqTracking?"-ISQ":""}|P|L-${this.props.mcatData.tracking.lang.split("Lang")[1]}|McatNewForeignBl`,
      miniBl: true,
      productName: this.props.mcatData["mcatCityCombinedName"],
      productImage: this.props.mcatData.mcatImg125,
      page: this.props.mcatData.tracking.pageType+"|McatNewForeignBl",
      affiliationId: "-140",
      mcatId: this.props.mcatData.mcatId,
      catid: this.props.mcatData.catId,
      EnqBlForm: this.state.showEnqPopup,
      bizId:bizId
    }
    let pageTypeTracking = this.props.mcatData.tracking.pageType;
    let adsResolutions = [
      [336, 280],
      [320, 150],
      [320, 200],
      [300, 150],
      [300, 100],
      [320, 250],
      [300, 200],
      [300, 250],
      [320, 100]
    ]
    window.outerWidth >= 400 ? adsResolutions.push([400, 300]):"";
    return (
      <>
       {this.state.ratingForm && this.state.ratingFormUi ? <this.state.ratingFormUi rating_val={''} mcatId = {this.props.mcatData.mcatId} mcatName= {this.props.mcatData.mcatName} prodName= {""} ratingType={"B"} seller_id={this.state.sellerGlid?this.state.sellerGlid:''} buyer_id={this.props.getCookieValByKey('ImeshVisitor', 'glid')?this.props.getCookieValByKey('ImeshVisitor', 'glid'):''} modrefId={""} hideFeedback={this.hideFeedback} isMail={false} pageName={'Mcat'} company={this.state.sellerComany?this.state.sellerComany:'Indiamart User'} postCallRatingForm={true} askForReview={''} ratefromlist={""} rateAfterCall={false} showInfu ={false} listCallRate={false} newCallback={true}/>: ''}
        {this.state.EnqBlView && !this.state.showMiniPdp && this.props.mcatData.foreignCampaignMiniBl && (this.props.country_value && this.props.country_value != "" && this.props.country_value != "IN") && <this.state.EnqBlView prop={this.mblPropForeignNew} logged={true}  companyalready={this.companyalready} showEnqPopup={this.state.showEnqPopup} mcatForeignBl="mcatForeignBl" out_tot_unq_count={this.props.mcatData.totalProductCount}/>}
        {this.props.mcatData && this.props.mcatData.firstListData.length > 0 ? (
          <Listing
            showEnqPopup={this.state.showEnqPopup}
            searchBarText={this.props.searchBarText}
            location = {this.props.location}
            mcatCityCombinedName={this.props.mcatData["mcatCityCombinedName"]}
            showModal={this.showModal}
            isqPresent = {this.props.isqPresent}
            isqTracking = {this.props.isqTracking}
            isqData = {this.props.mcatData.isq_filter}
            bizData={this.props.mcatData.bizData}
            bizName = {this.props.mcatData.bizName}
            callNowClick={this.callNowClick}
            openMiniPDP={this.openMiniPDP}
            showAds={this.props.mcatData.showAds}
            listing={this.props.mcatData.firstListData}
            tracking={this.props.mcatData.tracking}
            mcatImg125={this.props.mcatData["mcatImg125"]}
            mcatImg250={this.props.mcatData["mcatImg250"]}
            mcatProd={this.props.mcatData["mcatProd"]}
            listNumber={1}
            categoriesData={this.props.mcatData.categoriesData}
            exploreCategories={this.props.mcatData.exploreCategories}
            brandsData={this.props.mcatData.brandsData}
            cityName={this.props.mcatData.cityName}
            flName={this.props.mcatData.flName}
            mcatId={this.props.mcatData.mcatId}
            catId={this.props.mcatData.catId}
            BrandBillboard={this.state.BrandBillboard}
            mcatName={this.props.mcatData.mcatName}
            uniqueId={this.props.mcatData.uniqueId}
            cityData={this.props.cityData}
            showVideos={this.props.mcatData.cityName ? false : true}
            showFaq={true}
            vernacularData={this.props.vernacularData}
            clickTracking={this.props.mcatData.tracking.click}
            AdsComponent={this.state.AdsComponent}
            isfirstListing={true}
            country_value={this.props.country_value}
            adsnameidForMcat={this.adsnameidForMcat}
            brandBillboardAdShow={this.props.mcatData.brandBillboardAdShow}
            adsResolutions={adsResolutions}
            bus_type= {this.props.mcatData.bus_type}
            checkUserStatus = {this.props.checkUserStatus}
            getCookieValByKey = {this.props.getCookieValByKey}
            glLastDigit={this.props.glLastDigit}
          />
        ) : ''}
        {this.state.AutofetchCont ? <this.state.AutofetchCont
          showEnqPopup={this.state.showEnqPopup}
          location = {this.props.location}
          showModal={this.showModal}
          openMiniPDP={this.openMiniPDP}
          mcatData={this.props.mcatData}
          batchSize={14}
          showFaq={true}
          categoriesData={this.props.mcatData.categoriesData}
          firstListLength={this.props.mcatData.firstListData.length}
          uniqueId={this.props.mcatData.uniqueId}
          totalProductCount={this.props.mcatData.totalProductCount}
          vernacularData={this.props.vernacularData}
          searchBarText={this.props.searchBarText}
          callNowClick={this.callNowClick}
          isqPresent = {this.props.isqPresent}
          isqTracking = {this.props.isqTracking}
          AdsComponent={this.state.AdsComponent}
          country_value={this.props.country_value}
          adsnameidForMcat={this.adsnameidForMcat}
          adsnameidForGeneric={this.adsnameidForGeneric}
          adsnameidForCity={this.adsnameidForCity}
          adsResolutions={adsResolutions}
          mcatInline={this.props.mcatInline}
          mcatImg250={this.props.mcatData["mcatImg250"]}
          checkUserStatus = {this.props.checkUserStatus}
          glLastDigit={this.props.glLastDigit}
          getCookieValByKey = {this.props.getCookieValByKey}
        /> : ""}
         {this.state.belowListing ? <this.state.belowListing
          data={this.props.mcatData}
          vernacularData={this.props.vernacularData}
          getCookieValByKey = {this.props.getCookieValByKey}
          glLastDigit={this.props.glLastDigit}
        /> :'' }
        
        {this.state.EnqBlView && this.state.showEnqPopup && <this.state.EnqBlView closePopup={this.showModal}
          prop={this.enqProps} EnqBlForm={this.state.showEnqPopup}
          showEnqPopup={this.state.showEnqPopup} out_tot_unq_count={this.props.mcatData.totalProductCount}/>}

        {this.state.FeaturedCategoriesContainer ? (
        <this.state.FeaturedCategoriesContainer
          translatedText={this.props.translatedTxt}
          page="Impcat"
          count="10"
          queryText={"MCAT-Featured-Category-Product-Click|" + this.props.mcatData.tracking.lang.split("Lang")[1]}
        />) :''}

        { this.state.EnqBlView && !this.state.showMiniPdp && (!this.props.mcatData.foreignCampaignMiniBl || (this.props.mcatData.foreignCampaignMiniBl && (this.props.country_value || this.props.country_value == '' || this.props.country_value == "IN")))  ? <this.state.EnqBlView prop={this.mblProp} showEnqPopup={this.state.showEnqPopup} out_tot_unq_count={this.props.mcatData.totalProductCount} logged={true}  companyalready={this.companyalready}/> :''}

        {this.state.CallView ? <this.state.CallView /> :""}
       {this.state.showMiniPdp && this.state.MiniPDP ? (
          <this.state.MiniPDP
            showEnqPopup={this.state.showEnqPopup}
            desktopLink={""}
            pageName="Mcat"
            translatedText={this.props.vernacularData}
            closeMiniPDP={this.closeMiniPDP}
            CardData={this.state.miniPDPData}
            showModal={this.showModal}
            pageType={`${pageTypeTracking}${this.props.isqTracking?"-ISQ":""}-mini-pdp`}
            eventCategory={this.props.mcatData.tracking.click}
            eventLabel={this.state.miniPDPeventLabel}
            lang={this.props.mcatData.tracking.lang}
            trackPageView="/mini-pdp-mcat/"
          />
        ) : (
          ""
        )}
      </>
    );
  }
}
