import React from "react";
import { getCookie, getCookieValByKey } from "../../../Globals/CookieManager";
import { A2HSApp, gaTrack } from "../../../Globals/GaTracking";
import { userType } from "../../../Globals/UserType";
import "../styles/ads.css";

class Ads extends React.Component {
  constructor(props) {
    super(props);
    window.pdpAd = [];
    this.changeAdSpecs = this.changeAdSpecs.bind(this);
    this.hideAdLoader = this.hideAdLoader.bind(this);
    this.collapseGoogleAdsDiv = this.collapseGoogleAdsDiv.bind(this);
    this.maxHeight = 0;
    this.removeadtext=false;
    this.pageType = ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) ? 'imlite' : 'msite';
    this.bannerSlots = [
      "/3047175/Msite_home_PWA_Above_Premium_Brands",
      "/3047175/Msite_home_PWA_above_top_industries",
      "/3047175/Msite_home_PWA_between_related_products",
      "/3047175/Msite_Home_PWA_Below_Recommended_Products",
      "/3047175/Msite_home_PWA_between_related_products_31Jan",
      "/3047175/Msite_home_PWA_footer_31Jan",
      "/3047175/Msite_home_PWA_between_related_products_sections",
      "/3047175/Msite_home_PWA_Between_MSNY"
    ];
    this.companyCollapseSlots = [
      '/3047175/Msite_Company_Foreign_after1stlisting',
      '/3047175/Msite_Company_Category_Foreign_after1stlisting',
      "/3047175/msite_company_morecategories_btw_catindex",
      // '/3047175/Msite_Company_After_fourth_Listing_Internal_Landing',
      // '/3047175/Msite_Company_After_fourth_Listing',
      '/3047175/Msite_Company_After_Contactinfo',
      '/3047175/Msite_Company_Home_After_Fourth_Listing'
    ];
    this.state = {
      isShowingLoader: true,
      isShowingAd: true,
      backupBanner: null,
      isAdsByGoogle : false,
      hasAdLoaded: false
    };
  }
  changeAdSpecs(name) {
    var adsMapping = {
      "/3047175/Msite_Home_Top_UAWB":[
        "/3047175/Msite_HomeA2HS_Top_UAWB",
        "div-gpt-ad-1629114328905-0",
      ],
      "/3047175/Msite_home_PWA_Above_Premium_Brands": [
        "/3047175/Msite_HomeA2HS_PWA_Above_Premium_Brands",
        "div-gpt-ad-1568786372255-0",
      ],
      "/3047175/Msite_home_PWA_above_top_industries": [
        "/3047175/Msite_HomeA2HS_PWA_above_top_industries",
        "div-gpt-ad-1568787385946-0",
      ],
      "/3047175/Msite_home_PWA_between_related_products_sections": [
        "/3047175/Msite_HomeA2HS_PWA_between_related_products_sections",
        "div-gpt-ad-1568788369782-0",
      ],
      "/3047175/Msite_home_PWA_between_related_products": [
        "/3047175/Msite_HomeA2HS_PWA_between_related_products",
        "div-gpt-ad-1568788666703-0",
      ],
      "/3047175/Msite_Home_PWA_Below_Recommended_Products": [
        "/3047175/Msite_HomeA2HS_PWA_Below_Recommended_Products",
        "div-gpt-ad-1568788843700-0",
      ],
      "/3047175/Msite_home_PWA_between_related_products_31Jan": [
        "/3047175/Msite_HomeA2HS_PWA_between_related_products_31Jan",
        "div-gpt-ad-1568788957880-0",
      ],
      "/3047175/Msite_home_PWA_footer_31Jan": [
        "/3047175/Msite_HomeA2HS_PWA_footer_31Jan",
        "div-gpt-ad-1568789136614-0",
      ],
      "/3047175/Msite_Message_section": [
        "/3047175/Msite_Message_section",
        "div-gpt-ad-1586930474295-0",
      ],
    };
    return adsMapping[name];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.isShowingLoader && this.state.isShowingLoader) {
      return true;
    } else if (!nextState.isShowingAd && this.state.isShowingAd) {
      return true;
    } else if (nextState.A2hsAdBanner !== null) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
      if (
        this.props.type == "EnquiryForm" ||
        this.props.type == "BlForm"
      ) {
      if (window.googletag && window.googletag.destroySlots) {
        window.googletag.destroySlots([window.EnquiryAds]);
        delete window.EnquiryAds;
      }
    }
    else{
      if (window.googletag && window.googletag.destroySlots) {
        window.googletag.destroySlots();
      }
    }
    if(this.props.type=="product detail" && !this.props.isService){
    window.pdpAd=[];
    window.removeEventListener("message", this.collapseGoogleAdsDiv)
    }
 }
  componentWillMount() {
    if (!(window.googletag && window.googletag.pubads)) {
      if(!window.gpt){
        window.gpt=true;
      const script = document.createElement("script");
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.async = true;
      document.body.appendChild(script);
    }}

    if (this.props.type === "home" || this.props.type === "messages" || this.props.type === "mcat" || this.props.type === "product detail" || this.props.type === "company" || this.props.type === "search") {
      const resArr = this.props.data.res;
      for (let dimension of resArr) {
        if (this.maxHeight < dimension[1]) {
          this.maxHeight = dimension[1];
        }
      }
    }
  }

  collapseGoogleAdsDiv(event) {
      try {
          let message = JSON.parse(event.data);
          // let message = event.data
          if (message.msg_type === 'resize-me') {
              let shouldCollapseAd = false;
              for (let index in message.key_value) {
                  let key = message.key_value[index].key;
                  let value = message.key_value[index].value;
                  if (key === 'r_nh' && value === '0') {
                      shouldCollapseAd = true;
                  }
              }
              if (shouldCollapseAd) {
                this.setState({isShowingLoader:true, isAdsByGoogle:true});
              }
          }
      } catch (e) {
      }
      // window.removeEventListener("message", this.collapseGoogleAdsDiv);
  }

  componentDidMount() {
    let country_value = '';
    if (getCookie('iploc')) { country_value = getCookieValByKey('iploc', 'gcniso');} 
    
    if ((country_value == '' || country_value == 'IN') && getCookieValByKey('ImeshVisitor', 'iso') && getCookieValByKey('ImeshVisitor', 'iso') != 'IN') 
    {
      country_value = getCookieValByKey('ImeshVisitor', 'iso') ? getCookieValByKey('ImeshVisitor', 'iso') : '';
    }
    if(country_value == '' || country_value=="IN"){
      country_value = 0;
    }
    else{
      country_value = 1;
    }
    let userConverted  = 0;
    if (sessionStorage.getItem("forAds") && sessionStorage.getItem("forAds") == 'converted') {
      userConverted = 1;
    }
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      if (this.props.type === "mcat") {
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 300,
          renderMarginPercent: 300,
          mobileScaling: 1.0,
        });
      }
      else if(this.props.type === "home"){
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 200,
          renderMarginPercent: 200,
          mobileScaling: 1.0,
        });
      }
      else if(this.props.type === "search"&&window.googletag&& window.googletag.pubads()){
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 300,
          renderMarginPercent: 300,
          mobileScaling: 1.0,
        });
      }
      else if(this.props.type === "product detail"){
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 300,
          renderMarginPercent: 300,
          mobileScaling: 1.0,
        });
      }
      else if(this.props.type === "company") {
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 300,
          renderMarginPercent: 300,
          mobileScaling: 1.0,
        });
      }else {
        window.googletag.pubads().enableLazyLoad({
          fetchMarginPercent: -1,
          renderMarginPercent: -1,
        });
      }
    });

    if (this.props.type==='home'|| this.props.type === "messages" || this.props.type === "search" || this.props.type === "company" || this.props.type === "mcat" || this.props.type === "product detail") {
      window.googletag.cmd.push(() => {
        window.googletag
          .pubads()
          .addEventListener("slotOnload", (event) =>
            this.hideAdLoader(event, "slotOnload")
          );
          window.googletag.pubads().addEventListener("slotRequested",function(event){
            let slot = event.slot;
            let d = new Date();
            let dm = d.toISOString();
          });
          window.googletag.pubads().addEventListener("slotResponseReceived",function(event){
            let slot = event.slot;
            let d = new Date();
            let dm = d.toISOString();
          });
          window.googletag.pubads().addEventListener("slotRenderEnded",function(event){
            let slot = event.slot;
            let d = new Date();
            let dm = d.toISOString();
          })
        window.googletag
          .pubads()
          .addEventListener("slotResponseReceived", (event) => 
            this.hideAdLoader(event, "slotResponseReceived")
          );
      });
    }

    let that = this;

    var nameId = {},
      AdName = "",
      AdId = "";

    nameId =
      A2HSApp() && this.props.type == "home"
        ? this.changeAdSpecs(that.props.data.name, that.props.data.id)
        : "";
    if (nameId && nameId.length) {
      AdName = nameId[0];
      AdId = nameId[1];
    } else {
      AdName = that.props.data.name;
      AdId = that.props.data.id;
    }
    var usertype = userType();
    let someSearchAds = [
      "/3047175/Msite_Search_PWA_Between_Products2",
      "/3047175/Msite_Search_PWA_Between_Products3",
      "/3047175/Msite_Search_PWA_Between_Products4",
    ];

    window.googletag.cmd.push(function () {
     if (that.props.type == "product detail") {
        let groupid = that.props.pdpdata && that.props.pdpdata.BRD_GRP_ID ? that.props.pdpdata.BRD_GRP_ID : "";
        let mcatId = 
          that.props.pdpdata && that.props.pdpdata.BRD_MCAT_ID
            ? that.props.pdpdata.BRD_MCAT_ID
            : "";
        let catId =
          that.props.pdpdata && that.props.pdpdata.CAT_ID
            ? that.props.pdpdata.CAT_ID
            : "";
        let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }

        if (window.pdpAd.length==0 || (window.pdpAd.length>0 && !window.pdpAd.includes(AdId))) {
          window.pdpAd.push(AdId)
          window.googletag
            .defineSlot(AdName, that.props.data.res, AdId)
            .setTargeting(mcatKey[mcatId % 2], [mcatId])
            .setTargeting("catid", [catId])
            .setTargeting("groupid", [groupid])
            .setTargeting("pagetype", [that.pageType])
            .setTargeting('user-mode', userConverted)
            .setTargeting('User_Indian_Foreign', country_value)
            .setCollapseEmptyDiv(true)
            .addService(window.googletag.pubads());
            
        }
      }
      else if (that.props.type == "mcat") {
        let mcatId = that.props.data.mcatId ? that.props.data.mcatId : "";
        let catId = that.props.data.catId ? that.props.data.catId : "";
        let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }
        window.googletag
          .defineSlot(AdName, that.props.data.res, AdId)
          .setTargeting(mcatKey[mcatId % 2], [mcatId])
          .setTargeting('catid', [catId])
          .setTargeting("pagetype", [that.pageType])
          .setTargeting('user-mode',userConverted)
          .setTargeting('User_Indian_Foreign', country_value)
          .setCollapseEmptyDiv(true)
          .addService(window.googletag.pubads());
      }
      else if (that.props.type == "company" ) {
        let groupid = that.props.data.groupid ? that.props.data.groupid : "";
        let mcatId = that.props.data.mcatId ? that.props.data.mcatId : "";
        let catId = that.props.data.catId ? that.props.data.catId : "";
        let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }
        window.googletag
          .defineSlot(AdName, that.props.data.res, AdId)
          .setTargeting(mcatKey[mcatId % 2], [mcatId])
          .setTargeting('catid', [catId])
          .setTargeting('groupid', [groupid])
          .setTargeting("pagetype", [that.pageType])
          .setTargeting('user-mode',userConverted)
          .setTargeting('User_Indian_Foreign', country_value)
          // .setCollapseEmptyDiv(true)
          .addService(window.googletag.pubads());
      }
      else if( that.props.type == "search" &&
      someSearchAds.includes(AdName)){
        let mcatId = that.props.data.mcatId ? that.props.data.mcatId : "";
        let catId = that.props.data.catId ? that.props.data.catId : "";
        let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }
        window.googletag
          .defineSlot(AdName, that.props.data.res, AdId)
          .setTargeting(mcatKey[mcatId % 2], [mcatId])
          .setTargeting('catid', [catId])
          .setTargeting("pagetype", [that.pageType])
          .setTargeting('user-mode',that.props.userConverted)
          .setTargeting('User_Indian_Foreign', country_value)
          // .setCollapseEmptyDiv(true)
          .addService(window.googletag.pubads());
      }
      else if (that.props.type == "sid" ) {
        let groupid = that.props.groupid ? that.props.groupid : "";
        let mcatId = that.props.mcatId ? that.props.mcatId : "";
        let catId = that.props.catId ? that.props.catId : "";
        let mcatKey = { 0: 'mcatid', 1: 'mcatid2' }
        window.googletag
          .defineSlot(AdName, that.props.data.res, AdId)
          .setTargeting(mcatKey[mcatId % 2], [mcatId])
          .setTargeting('catid', [catId])
          .setTargeting('groupid', [groupid])
          .setTargeting("pagetype", [that.pageType])
          .setTargeting('user-mode',userConverted)
          .setCollapseEmptyDiv(true)
          .addService(window.googletag.pubads());
      }
      else if (that.props.type == "EnquiryForm" || that.props.type == "BlForm") {
        let mcatId = that.props.mcatId ? that.props.mcatId : "";
        let catId = that.props.catId ? that.props.catId : "";
        window.EnquiryAds = window.googletag
          .defineSlot(AdName, that.props.data.res, AdId)
          .setTargeting('mcatid', [mcatId])
          .setTargeting('catid', [catId])
          .setTargeting("pagetype", [that.pageType])
          .setTargeting('User_Indian_Foreign', country_value)
          .setCollapseEmptyDiv(true)
          .addService(window.googletag.pubads());
      }
      else {
        if (window.location.pathname == "/") {
          window.googletag
            .defineSlot(AdName, that.props.data.res, AdId)
            .setTargeting("usertype", [usertype])
            .setTargeting("pagetype", [that.pageType])
          .setTargeting('User_Indian_Foreign', country_value)
          .setCollapseEmptyDiv(true)
            .addService(window.googletag.pubads());
        } else {
          window.googletag
            .defineSlot(AdName, that.props.data.res, AdId)
            .setTargeting("pagetype", [that.pageType])
            .setTargeting('User_Indian_Foreign', country_value)
          .setCollapseEmptyDiv(true)
            .addService(window.googletag.pubads());
        }
      }

      window.googletag.enableServices();
    });

    window.googletag.cmd.push(function () {
      window.googletag.display(AdId);
    });
  }

  hideAdLoader(event, eventType) {
    var nameId = {},
      AdName = "",
      AdId = "";

    nameId =
      A2HSApp() && this.props.type == "home"
        ? this.changeAdSpecs(this.props.data.name, this.props.data.id)
        : "";
    if (nameId && nameId.length) {
      AdName = nameId[0];
      AdId = nameId[1];
    } else {
      AdName = this.props.data.name;
      AdId = this.props.data.id;
    }
   if((eventType === "slotOnload"||eventType === "slotResponseReceived")&& AdName === event.slot.getAdUnitPath()&&this.props.type === 'home'){
            this.removeadtext=true;
    if (eventType === "slotResponseReceived" &&AdName === event.slot.getAdUnitPath() &&
              event.slot.getResponseInformation() === null) {
              import(/* webpackChunkName: "AppAdBanner" */ "./AppAdBanner").then(
                  (module) => {
                    this.setState({ backupBanner: true });
                    window.backupBanner = module.default
                  }
                );       
                this.setState({
                  isShowingAd: false,
                });
   }}
   else{
    if (eventType === "slotOnload" && AdName === event.slot.getAdUnitPath()) {
      this.setState({
        isShowingLoader: false,
      });
      // if(this.props.type === "product detail" && !this.props.isService) {
      //   window.addEventListener("message", this.collapseGoogleAdsDiv, {passive:true});
      // } 
    }
    if(this.props.type === 'company' && eventType === "slotResponseReceived" &&
    AdName === event.slot.getAdUnitPath() &&
    event.slot.getResponseInformation() == null){
      let ele=document.getElementById(this.props.data.id);
      ele?ele.classList.add("dn"):"" 
    }
    else if(this.props.type === "product detail" && eventType === "slotResponseReceived" &&
    AdName === event.slot.getAdUnitPath()){
      if(event.slot.getResponseInformation() == null){
        let ele=document.getElementById(this.props.data.id);
        ele?ele.classList.add("dn"):"" 
      }
      else {
        this.setState({hasAdLoaded: true})
      }
    }
    else if(this.props.type === "mcat" && eventType === "slotResponseReceived" &&
    AdName === event.slot.getAdUnitPath() &&
    event.slot.getResponseInformation() == null){
      let ele=document.getElementById(this.props.data.id);
      ele?ele.classList.add("dn"):"" 
    }
    else if(this.props.type === "search" && eventType === "slotResponseReceived" &&
    AdName === event.slot.getAdUnitPath() &&
    event.slot.getResponseInformation() == null){
      let ele=document.getElementById(this.props.data.id);
      ele?ele.classList.add("dn"):"" 
    }
     else if (
      eventType === "slotResponseReceived" &&
      AdName === event.slot.getAdUnitPath() &&
      event.slot.getResponseInformation() === null
    ) {
      // if (window.deferredPromptA2hs) {
      //   import(/* webpackChunkName: "A2hsAdBanner" */ "./A2hsAdBanner").then(
      //     (module) => {
      //       this.setState({ backupBanner: true });
      //       window.backupBanner = module.default
      //     }
      //   );
      // } else{
        import(/* webpackChunkName: "AppAdBanner" */ "./AppAdBanner").then(
          (module) => {
            this.setState({ backupBanner: true });
            window.backupBanner = module.default
          }
        );
      
      this.removeadtext=false;
      this.setState({
        isShowingAd: false,
      });
      if(this.props.type === "product detail" && !this.props.isService) {
        window.addEventListener("message", this.collapseGoogleAdsDiv, {passive:true});
      } 
    }
  }
  }
  render() {

    document.getElementById("footerIM") &&
      (document.getElementById("footerIM").style.display = "block");
    var nameId = {},
      AdId = "";

    nameId =
      A2HSApp() && this.props.type == "home"
        ? this.changeAdSpecs(this.props.data.name, this.props.data.id)
        : "";
    if (nameId && nameId.length) {
      AdId = nameId[1];
    } else {
      AdId = this.props.data.id;
    }
    let id = AdId;
    // let adLabel = (<span className="poa fs10 clr7B adText zIn100">Advertisement</span>);

    let adSlot;
    if (this.props.type === "home" || this.props.type === "messages" || this.props.type === "mcat" || this.props.type === "product detail" ) {
      let loaderBackground = null;
      if (this.state.isShowingLoader) {
        loaderBackground = {
          backgroundColor: "#ffffff",
          height: this.maxHeight + "px",
        };
      } else {
          loaderBackground = { height: this.maxHeight + "px"};
      }
      if (this.props.type=="messages"){
        if (this.state.isShowingLoader) {
          loaderBackground = {
            backgroundColor: "#e2e2e2",
            minHeight:"50px",
            maxHeight: this.props.checkGlid && this.maxHeight != 0 ? this.maxHeight + 20 + "px" : this.maxHeight + "px",
          };
        } else {
            loaderBackground = { maxHeight: this.props.checkGlid && this.maxHeight != 0 ? this.maxHeight + 20 + "px" : this.maxHeight + "px"};
        }
      }
      if (this.props.name === "stickyFooter") {
        adSlot = (
          <div  className="Adslots oh bgw tc w100 btm0 z999 pf bgw df jcc aic btm590 ma" style="max-height:50px !important;" >
            <div id={id} className="z1"></div>
            </div>
        );
      }
      else {
        if(this.props.type === "home"){
        adSlot = (
           <>
          {!this.props.topAds && this.state.isShowingAd?<div></div>:""}
          <div style="max-height:300px !important;" className="bgef" >
            <div id={id} className="z1 Adslots tc ma pr w100 df jcc aic bgw ma oh  bdrTR bdrBR">
          </div>
          </div>
            {this.state.isShowingAd?<div class='mb6'></div>:""}
            </>
        );
        }
        else {
          if(this.props.type === "mcat"){

            adSlot=(
              <>
              <li className="tc oh w100 ma bgw mt4 mb5 bxsdw" style="max-height:300px !important;overflow:hidden;">
              <div data-placeholder='Ad' className="ads df jc oh">
                <div id={id} className="mb6"></div>
               </div> 
             </li>
            </>
            )
          }
          else if(this.props.type === "product detail") {
            adSlot = (
              <>
              <div style="max-height:300px !important;overflow:hidden;"><div id={id} className={!this.state.hasAdLoaded ? "":"z1 Adslots tc ma pr w100 df jcc aic bgw mt4 grytp grybt"}></div> </div> </> );
          }
          else{
          adSlot = (
            <>
              <div style="max-height:300px !important;overflow:hidden;">
              <div id={id} className={this.props.checkGlid ? "z1 Adslots tc ma pr w100 df jcc aic pdt10 pdb10 slBg bgw mt4"  : `z1 Adslots tc ma pr w100 df jcc aic bgw mt4 ${(this.props.type && this.props.type == "product detail") ? " grytp grybt" : "mt10 mb10"}`}>
              </div>
           {/* {this.state.isShowingLoader  && !this.state.isAdsByGoogle ? (
            this.removeadtext?'':<span className="poa brd9e pd210 bxrd4 fs10">Ad</span>
            ) : this.state.isAdsByGoogle && this.props.type == "product detail"? adLabel : null} */}
          
          </div>
          </>
          );
          }
        }
      }

      if (!this.state.isShowingAd && this.props.type && this.props.type != "home") {
        if (this.bannerSlots.indexOf(this.props.data.name) > -1) {
          adSlot = this.state.backupBanner ? (
            <window.backupBanner
              page={this.props.type}
              slotName={this.props.data.name}
            ></window.backupBanner>
          ) : null;
        } else {
          adSlot = null;
        }
      }
    }
    else if(this.props.type === "company"|| this.props.type === "search"){
      let elms = document.querySelectorAll("[id='abtAddCs']")?document.querySelectorAll("[id='abtAddCs']"):'';
      for(let i = 0; i < elms.length; i++) 
      elms[i]?elms[i].style.display='none':'';
      let loaderBackground = null;
      if (this.state.isShowingLoader) {
        loaderBackground = {
          backgroundColor: "#e2e2e2",
          height: this.maxHeight + "px",
          overflow: "hidden"
        };
      } else {
        loaderBackground = { height: this.maxHeight + "px",overflow: "hidden"};
      }
      adSlot = (
        <>
        <div style="max-height:300px !important;overflow:hidden;">
        <div id={id} className={` z1 Adslots tc ma pr w100 df jcc aic bgw mt4 ${(this.props.type == "search") ? "mb6":"grybt"}`}>
      </div>
      </div>
      </>
      );
    } else if (
      this.props.type == "EnquiryForm" ||
      this.props.type == "BlForm"
    ) {
      adSlot = (
        <div
          className="AdslotsEnq tc pa b43"
          onClick={() =>
            gaTrack.trackEvent([
              this.props.type,
              this.props.userStatus,
              "StickyAd",
              0,
              true,
            ])
          }
        >
          <div id={id}></div>
        </div>
      );
    } else {
      adSlot = (
        <div className={`Adslots tc oh ${(this.props.type && this.props.type == "product detail") ? "ma mt4" : "mt10 mb10" }`} style={`${(this.props.type && this.props.type == "product detail") ?"max-height:300px !important;overflow:hidden;": "" }`}>
          <div id={id}></div>
        </div>
      );
    }
    return adSlot;
  }
}

export default Ads;