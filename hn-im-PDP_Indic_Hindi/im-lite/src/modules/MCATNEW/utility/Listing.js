import React, { Component } from "react";
import CardFrame from "./CardFrame";
import LocationWidget from '../../MCATNEW/utility/LocationWidget/Location';
import { getCookie } from "../../../Globals/CookieManager";
import VideoWidgetContainer from "../../MCATNEW/utility/Videos/container/VideoWidgetContainer";
import CategoryBrandWidget from "../../MCATNEW/utility/CategoryWidget/CategoryBrandWidget";
import Isqfilterwidget from "../../MCATNEW/utility/Isqwidget/Isqfilterwidget";
// import InlineBl from '../utility/InlineBl';

const loginModes = {0: "Unidentified",1: "Identified",2: "Full-Login",3: "Unidentified-Existing",};
export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.rePositioning = this.rePositioning.bind(this);
    this.brandbillboard = {};
    this.pdpToMCAT = false;
    this.userFromGoogle = false;
    this.pbrIndex = {};
    this.locationIndex = "";
    this.faqIndex = "";
    this.videoIndex = "";
    this.relatedIndex = "";
    this.isBusTypeMcat = false;
    this.bbAds = this.bbAds.bind(this);
    // this.recCategoriesView = this.recCategoriesView.bind(this);
    // this.FilterwidgetChips = this.FilterwidgetChips.bind(this);
    // this.brandsView = this.brandsView.bind(this);
    this.faqView = this.faqView.bind(this);
    this.state = {
      RevampSoiBanner:'',
      InlineBl: '',
      faqWidget:'',
    }
    this.loadOnScroll = this.loadOnScroll.bind(this);
    let gaid=getCookie("_ga")?getCookie('_ga'):'';
    this.lastgadigit= gaid[gaid.length-1]?gaid[gaid.length-1]:'';
  }

  bbAds(type) {
    if(type == "bbbEkta"){
          this.brandbillboard = { 0: [1, '/3047175/Msite_Mcat_BB_Hybrid', 'div-gpt-ad-1631616801961-0']}
    }
    else if (type == "newMcat") {
          this.brandbillboard = { 1: [1, '/3047175/Msite_SWIM_320x150', 'div-gpt-ad-1638869187567-0'] }
    }else if((type == "new" || type == "old")){
      this.brandbillboard = { 1: [1, '/3047175/Msite_Mcat_BB_Hybrid', 'div-gpt-ad-1631616801961-0']}
    }
  }
  rePositioning(){
    let checkLocalItem = '';
    let prevPageURL = window.refUrl && window.refUrl.length == 1 && window.refUrl[0].includes("google")? window.refUrl[0]:"";
    if (prevPageURL =='' && localStorage.getItem('PDP404URL')) {
        checkLocalItem = JSON.parse(localStorage.getItem('PDP404URL'))
        prevPageURL = checkLocalItem.previousPageURL ? checkLocalItem.previousPageURL: prevPageURL;
    }
   this.pdpToMCAT = prevPageURL && prevPageURL.includes("/proddetail/") ? true : false;
   this.userFromGoogle = (prevPageURL == "" || prevPageURL==window.location.href || (window.refUrl && window.refUrl == "https://www.google.com/")) ? true : false;
  }

  componentWillMount() {
    //Indexing for Inline BL.
    this.pbrIndex = this.props.listNumber == 1 ? {  6: true, 20: true } :"" ;
    this.faqIndex = this.props.showFaq ? this.props.listing.length < 9 ? this.props.listing.length - 1 : 20 : -1;
    this.videoIndex = (this.props.showVideos) ? this.props.listing.length < 12 ? this.props.listing.length - 1 : 13 : -1;

    this.relatedIndex = this.props.listNumber == 1 ? {13:true} : ""

    if (this.props.brandBillboardAdShow)
      this.bbAds(this.props.brandBillboardAdShow);
    this.rePositioning();
    sessionStorage.setItem('ADVproduct',false)
  }
  componentDidUpdate() {
    if (this.props.brandBillboardAdShow)
      this.bbAds(this.props.brandBillboardAdShow);
    this.rePositioning();
  }
  componentDidMount() {
    if(window.location.href && window.location.href.includes('waId') && !getCookie('ImeshVisitor')) {
      let ctaID = localStorage.getItem('ctaID');
      let ctaClass = localStorage.getItem('ctaClass');
      ctaClass ? document.getElementsByClassName(ctaClass) && document.getElementsByClassName(ctaClass)[0] ? document.getElementsByClassName(ctaClass)[0].click() :  (window.elemNotFound = true) : '';
      ctaID ? document.getElementById(ctaID) ? document.getElementById(ctaID).click() : (window.elemNotFound = true) : '';
      this.loadOnScroll();
    }
    window.addEventListener("touchstart", this.loadOnScroll, { passive: true });
    window.addEventListener("scroll", this.loadOnScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadOnScroll);
    window.removeEventListener("touchstart", this.loadOnScroll);
  }
  loadOnScroll() {
    // if(!this.state.InlineBl){import(/* webpackChunkName:"InlineBl" */ "../../MCATNEW/utility/InlineUtility/IsqContainerMcat").then((module) => {this.setState({ InlineBl : module.default });});}
    // if(!this.state.RevampSoiBanner) {{import(/* webpackChunkName:"RevampSoiBanner" */ "../../SellOnIm/components/RevampSoiBanner").then((module) => {this.setState({ RevampSoiBanner: module.default });});}}
    // sssssss
    window.removeEventListener("scroll", this.loadOnScroll);
    window.removeEventListener("touchstart", this.loadOnScroll);
  }
  recCategoriesView(){
   if(this.props.categoriesData && this.props.categoriesData.length > 0) return(
      <CategoryBrandWidget
        widgetData={this.props.categoriesData}
        cityName={this.props.cityName ? this.props.cityName : ''}
        heading= {"Categories"}
        clickTracking={this.props.clickTracking}
        ea="Related-Products-Mcat-Name"
        listNumber={this.props.listNumber}
        cssClass = {"pdl5 por h205 pdt8 mb8"}
        idName="catInline"
      />
    )
  }
  FilterwidgetChips(type){
    if(type =="isq" && this.props.isqData && this.props.isqData.data && this.props.isqData.data.length>0)
      return(
        <Isqfilterwidget
          data={this.props.isqData.data}
          isqPresent={this.props.isqPresent}
          heading={"Specifications"}
          clickTracking={this.props.clickTracking}
          selected={this.props.isqData && this.props.isqData.CurrentArray && this.props.isqData.CurrentArray.Text ? this.props.isqData.CurrentArray.Text:""}
          />
      )
    if(type =="biz" && this.props.bizData && this.props.bizData.length>1)
      return(
        <Isqfilterwidget
          data={this.props.bizData}
          heading={"Seller Type"}
          clickTracking={this.props.clickTracking}
          selected={this.props.bizName == ""?"All":this.props.bizName}
        />
      )
    if(type =="city" && this.props.cityData && this.props.cityData.cities && this.props.cityData.cities.length>0)
      return(
        <LocationWidget
              pageNumber={this.props.listNumber}
              tracking={this.props.tracking}
              ea={"0"}
              inline = {true}
              cityData={this.props.cityData}
              cityName={this.props.cityName}
              flName={this.props.flName}
              vernacularData={this.props.vernacularData}
              searchParam={this.props.location.search}
              countryIso ={(this.props.country_value == "IN" || this.props.country_value=="" || !this.props.country_value) ? "IN": "F"}
            />
     )
  }
  brandsView(){
   if(this.props.cityName == '' && this.props.brandsData && this.props.brandsData.length > 0)
    return(
      <CategoryBrandWidget
        widgetData={this.props.brandsData}
        heading={"Brands"}
        clickTracking={this.props.clickTracking}
        ea="Brand-Name"
        listNumber={this.props.listNumber}
        cssClass = {"h205 pdl5 por mb8"}
        idName="brandInline"
      />
    )}
  faqView(){
    if(this.state.faqWidget && this.props.showFaq)return(
      <this.state.faqWidget
        mcatId={this.props.mcatId}
        mcatName={this.props.mcatName}
        cityName={this.props.cityName}
        vernacularData={this.props.vernacularData}
        tracking={this.props.tracking}
        uniqueId={this.props.uniqueId}
      />
    )
  }
  render() {
    //Ads - Ad position : [list Number , Ad Name , Ad Id]
    let utmText = this.props.location && this.props.location.query && this.props.location.query.utm_campaign && this.props.location.query.utm_source ? `|${this.props.location.query.utm_campaign}|${this.props.location.query.utm_source}` : ""
    const adsnameidForMcat = this.props.adsnameidForMcat;
    let finalAds = {};
    finalAds = adsnameidForMcat;
    let ecomCheck = window.location && window.location.search && window.location.search == "?shopnow=1" ? true:false;
    let pbrCount = 0;
    const ListingView = this.props.listing.map((productsArr, index) => {
      if (this.pbrIndex[index]) pbrCount++;
      let cardFrame = (
        <CardFrame
          showEnqPopup={this.props.showEnqPopup}
          showModal={this.props.showModal}
          openMiniPDP={this.props.openMiniPDP}
          usermode = {loginModes[this.props.checkUserStatus]}
          loginModes={loginModes}
          tracking={this.props.tracking}
          productIndex={index + 1}
          utmText = {utmText}
          listNumber={this.props.listNumber}
          id={index + 1}
          callNowClick={this.props.callNowClick}
          isqTracking = {this.props.isqTracking}
          productsArr={productsArr}
          catId={this.props.catId}
          mcatId={this.props.mcatId}
          mcatName={this.props.mcatName}
          vernacularData={this.props.vernacularData}
          prodType={this.props.mcatProd}
          checkUserStatus = {this.props.checkUserStatus}
          glLastDigit = {this.props.glLastDigit}
          lastgadigit={this.lastgadigit}
        />
      );
      let inlineBl = (<>
        <this.state.InlineBl
          pbrImage={this.props.mcatImg125}
          translatedText={this.props.vernacularData}
          searchKey={this.props.mcatCityCombinedName}
          translated_name={this.props.mcatName}
          ec={this.props.tracking.click}
          ea={`_pg_${this.props.listNumber}_${pbrCount}`}
          type={`inline${this.props.listNumber}`}
          usermode = {loginModes[this.props.checkUserStatus]}
          mcatId={this.props.mcatId}
          prodType={this.props.mcatProd}
          query_text={`${this.props.tracking.pageType}${this.props.isqTracking?"-ISQ":""}_pg_${this.props.listNumber}_${pbrCount}${this.lastgadigit%2==0?"|G-Ev":"|G-Od"}|P|L-${this.props.tracking.lang.split("Lang")[1]}${utmText}`}
          pbrCount= {`${this.props.listNumber}_${pbrCount}`}
          inlineCount={pbrCount}
          page={this.props.tracking.pageType}
          showEnqPopup={this.props.showEnqPopup}
          lang={this.props.tracking.langCookie}
          showModal={this.props.showModal}
          country_value={this.props.country_value}
          catId= {this.props.catId}
          isqType= {'ISQ'}
          glLastDigit = {this.props.glLastDigit}
        />
        </>)
      // bbb for converted users, index==0
      let view = (<>
        {this.brandbillboard[index] && index == 0?
          <div className="BBdiv" style={{ minHeight: "288px" }}>{(this.props.brandBillboardAdShow && ( this.props.brandBillboardAdShow == "bbbEkta") && this.props.BrandBillboard) ?
            <this.props.BrandBillboard name={this.brandbillboard[index][1]} id={this.brandbillboard[index][2]} mcatId={this.props.mcatId} catId={this.props.catId} oldOrNewAd={this.props.brandBillboardAdShow} /> : ""}
          </div>
          : ""
        }
        {(this.props.showAds && this.props.AdsComponent ? (finalAds[index] && index == 0 ? (finalAds[index][0] == this.props.listNumber && finalAds[index][2] ?
          <this.props.AdsComponent
            type={"mcat"}
            data={{
              name: finalAds[index][1],
              id: finalAds[index][2],
              mcatId: this.props.mcatId,
              catId: this.props.catId,
              res: this.props.adsResolutions
            }}
          /> : '') : ("")) : (""))}

        {cardFrame}
        {index == 3 &&this.props.listNumber==1 &&this.state&&this.state.RevampSoiBanner &&(!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN")? <this.state.RevampSoiBanner pageName="Impcat"
         isBusTypeMcat={(((JSON.parse(localStorage.getItem("sellerIntent")) && !JSON.parse(localStorage.getItem("sellerIntent")).CompanyName)|| !JSON.parse(localStorage.getItem("sellerIntent"))) && this.props.bus_type ?
      true : false)} flName={this.props.flName}/> : ''}
        {this.brandbillboard[index] && index != 0 ?
          <div className="BBdiv" style={{ minHeight: "288px" }}>{(this.props.brandBillboardAdShow && (this.props.brandBillboardAdShow == "old" || this.props.brandBillboardAdShow == "new" || this.props.brandBillboardAdShow == "newMcat") && this.props.BrandBillboard) ?
            <this.props.BrandBillboard name={this.brandbillboard[index][1]} id={this.brandbillboard[index][2]} mcatId={this.props.mcatId} catId={this.props.catId} oldOrNewAd={this.props.brandBillboardAdShow} />
            : ""}
          </div>
          : ""
        }
        {this.state.InlineBl && this.pbrIndex[index] ? inlineBl : ''}

        
        {index == this.videoIndex ? 
      <VideoWidgetContainer
      showModal={this.props.showModal}
      mcatImg125={this.props.mcatImg125}
      mcatId={this.props.mcatId}
      mcatName={this.props.mcatName}
      loginModes = {loginModes}
      clickTracking={this.props.clickTracking}
      pageType={this.props.tracking.pageType}
      heading={this.props.searchBarText}
      showEnqPopup={this.props.showEnqPopup}
      labelText={this.props.vernacularData}
      isqType= {'ISQ'}
      prodType={this.props.mcatProd}
      page={this.props.tracking.pageType}
      type={`inline${this.props.listNumber}`} 
      listNumber= {`${this.props.listNumber}`}
      searchKey={this.props.mcatCityCombinedName}
      translated_name={this.props.mcatName}
      catId= {this.props.catId}
      query_text={`${this.props.tracking.pageType}${this.props.isqTracking?"-ISQ":""}_pg_${this.props.listNumber}|P|L-${this.props.tracking.lang.split("Lang")[1]}`}
    />
        : ""}

        {this.faqIndex == 29 ? (this.props.listNumber == 2 && index == 1 ? this.faqView() : "") : (index == this.faqIndex && this.props.listNumber == 1 ? this.faqView() : "")}

        {index == 1 ? <div id={`autofetchcalling` + this.props.listNumber} ></div> : ''}

        {
          (this.props.showAds && this.props.AdsComponent ?
            finalAds[index] && index != 0 ?
              index != 11 ?
                finalAds[index][0] == this.props.listNumber && finalAds[index][2] ?
                  <this.props.AdsComponent
                    type={"mcat"}
                    data={{
                      name: finalAds[index][1],
                      id: finalAds[index][2],
                      mcatId: this.props.mcatId,
                      catId: this.props.catId,
                      res: this.props.adsResolutions
                    }}
                  />
                  : ""
                : finalAds[index][this.props.listNumber] && finalAds[index][this.props.listNumber][0] == this.props.listNumber ?
                  <this.props.AdsComponent
                    type={"mcat"}
                    data={{
                      name: finalAds[index][this.props.listNumber][1],
                      id: finalAds[index][this.props.listNumber][2],
                      mcatId: this.props.mcatId,
                      catId: this.props.catId,
                      res: this.props.adsResolutions
                    }}
                  />
                  : ("") : (""): ("") )}
      </>
      );
      return view;
    });
    return (
      <ul name={`articles_${this.props.listNumber}`}>
        {ListingView}
      </ul>
    );
  }
}