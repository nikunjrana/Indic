import React from 'react';
import StdproductContainer from '../../buyer/container/StdproductContainer';
import { modifyImgSrc } from "../utility/PDPSingleImage/helpers";
import { getFirstImg } from "../utility/Carousel/helper"
import BreadCrumbs from "../utility/BreadCrumb/BreadCrumbs";
import RecommendedMcatIdentifiedContainer from '../../buyer/container/RecommendedMcatIdentifiedContainer';
import dispatchFilterLocations from '../../Widgets/LocationFilter/dispatchFilterLocations.js';
import { checkUserStatus } from '../../../Globals/MainFunctions';
// import { syncDataCheck } from '../../home/utility/HomeUtility';
import { personalisationActionDispatcher } from '../../Widgets/Personalisation/personalisationActionDispatcher';
import FeaturedCategoriesContainer from '../../Widgets/Personalisation/FeaturedCategories/FeaturedCategoriesContainer';
import RecommendedProductsContainer from '../../Widgets/Personalisation/RecommendedProducts/RecommendedProductsContainer';
import { getCookieValByKey,getCookie } from '../../../Globals/CookieManager';
import { eventTracking } from "../../../Globals/GaTracking";
import { getSellerDescription, isqShowme } from '../utility/AboutTheSeller/helper';
// import { impressionTrackAppinstall } from '../../CentralizePopUp/utility/App/helper';
// import { checkUserConverted } from '../../CentralizePopUp/utility/helper';
import { getDisplayName } from "../utility/ExtendedPDP/helper";
import getPDPUrl from "../utility/ExtendedPDP/getPDPUrl";
import {InstagramVideoComponent} from '../utility/Carousel/helper';
import InlineChatWithSeller from '../utility/ChatWithSeller/InlineChatWithSeller';
import GetLatestPriceEnquiry from '../utility/GetLatestPriceEnquiry/GetLatestPriceEnquiryHTML';


export default class BelowTheFold extends React.Component {
    constructor(props) {
        super(props);
        this.getImgSrc = this.getImgSrc.bind(this);
        this.country_value = '';
        this.state = {
            enqCtaDisabled: false,
            openInAppBanner:'',
            GoogleAds:'',
            isOnetimeExplr: true,
            isOnetimeFindPopular: true,
            Extended: '',
            Footer:'',
            RelatedProductContainer:"",
        }
        this.mblProp={};
        this.isMCATIDsNull = this.isMCATIDsNull.bind(this);
        this.std_mcat=this.isMCATIDsNull();
        this.closeSimilar = this.closeSimilar.bind(this);
        this.getExportDetails = this.getExportDetails.bind(this);
        this.closeSimilarOnBack = this.closeSimilarOnBack.bind(this);
        this.loadRelatedcontainer = this.loadRelatedcontainer.bind(this);
        this.loadExtended = this.loadExtended.bind(this);
        this.showExtended=this.showExtended.bind(this);
        window.addEventListener('popstate', this.closeSimilarOnBack , {passive: true});
        this.loadRecommendedWidgets = this.loadRecommendedWidgets.bind(this);    }
    showExtended(targetid,loadExtended){
        let target = document.getElementById(targetid);
        if(target){
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
          }
          let observer = new IntersectionObserver(handleIntersect, options);
          observer.observe(target);
          function handleIntersect(entries) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loadExtended();
                observer.unobserve(target);
              }
            });
        }  
    }
    }

    componentDidUpdate(prevProps) {
        this.showExtended("relatedMcatsTitle",this.loadExtended);
    }
    loadRelatedcontainer(){
        if(!this.state.RelatedProductContainer) {
            import(
                /* webpackChunkName:"RelatedProductContainer" */ '../../buyer/container/RelatedProductContainer'
                ).then((module) => {
                    this.setState({ RelatedProductContainer: module.default });
                });
        }
    }
    componentDidMount() {
        dispatchFilterLocations({ cityname: this.props.data.CITY, cityid: this.props.data.CITY_ID});
        this.props.data.PC_ITEM_STATUS_APPROVAL === "9"?this.loadRelatedcontainer():"";
        // impressionTrackAppinstall("appBanr",`PDP_Listing_Banner`);
        // syncDataCheck();
        this.props.handleRecentMcatWidget();
        personalisationActionDispatcher(false);
        // window.addEventListener(this.props.eventType, this.loadRecommendedWidgets, {passive: true});
        // window.addEventListener("scroll", this.loadRecommendedWidgets, {passive: true});
        let ecom = {
            ecomflag: this.props.data.PC_ITEM_IS_ECOM,
            masterid:this.props.data.ECOM_STORE_NAME?this.props.data.ECOM_STORE_NAME=="SHOPIFY"?'1':this.props.data.ECOM_STORE_NAME=="SHIPROCKET"?"2":"":"",
            landing_url:this.props.data.ECOM_ITEM_LANDING_URL
        };
        window.localStorage.setItem('ecom', JSON.stringify(ecom));
        let isVideoPresent = this.props.data.ITEM_DOCS != undefined && this.props.data.ITEM_DOCS.pc_item_doc_type == "VIDEO" && this.props.data.ITEM_DOCS.pc_item_doc_path ? true : false;
        let productVideoURL = this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path;
        productVideoURL && (productVideoURL.includes("shorts/") ? productVideoURL = productVideoURL.replace("shorts/", "watch?v=") : "");
        let showProductVideo = isVideoPresent ? (<div id="videoInBelowthefold" className="mt10 pdb10">
            <p className="bgef db fs15 mxht1000 clrb fw brdb pd10">Product Video</p>
            {this.props.YouTubePlayer ? <this.props.YouTubePlayer muted={true} url={productVideoURL} width={"100%"} height={"250px"} controls /> : ''}
        </div>) : '';
        let iscompvideopresent=this.props.data.GLUSR_PROFILE_MEDIA_URL?true:false;
        let compvideo=this.props.data.GLUSR_PROFILE_MEDIA_URL;
        compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
        let showCompanyVideo = iscompvideopresent ? (<div id="videoInBelowthefold" className="mt10 pdb10">
        <p className="bgef db fs15 mxht1000 clrb fw brdb pd10">Company Video</p>
        {this.props.YouTubePlayer ? <this.props.YouTubePlayer muted={true} url={compvideo} width={"100%"} height={"250px"} controls /> : ''}
    </div>) : '';

    }
    loadExtended() {
        if (!this.state.Extended) {
            import(
              /* webpackChunkName:"ExtendedPDP2" */ "../../ProductDetail/utility/ExtendedPDP/Extended.js"
            ).then((module) => {
              this.setState({ Extended: module.default });
            });
            // window.removeEventListener("pointerdown", this.loadExtended);
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('popstate', this.closeSimilarOnBack);
        window.removeEventListener("scroll", this.loadRecommendedWidgets);
        window.removeEventListener(this.props.eventType, this.loadRecommendedWidgets);
    //    window.__TransitionData__ = null;
    }

    closeSimilarOnBack(){
        document.body.classList.remove("oh");
        // window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        let shwSml = document.getElementById('vwSmlSection');
        shwSml? shwSml.style.display="none":'';
        let fltldng= document.getElementById('fltldng');
        fltldng? fltldng.style.display="none":'';
    }
    closeSimilar(){
        eventTracking("Product-Page-Clicks","ViewSimilar-Close",this.props.data.PC_ITEM_DISPLAY_ID,true);
        document.body.classList.remove("oh");
        // window.refUrl &&  window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        let shwSml = document.getElementById('vwSmlSection');
        shwSml? shwSml.style.display="none":'';
        let fltldng= document.getElementById('fltldng');
        fltldng? fltldng.style.display="none":'';
    }

    getImgSrc() {
        let imgSrc = getFirstImg(this.props.data);
        return modifyImgSrc(imgSrc);
    }

    loadRecommendedWidgets(){
        this.isInViewport();
        if (!this.state.Footer) {
            import(
                /* webpackChunkName:"Footer" */ '../../App/container/FooterContainer'
                ).then((module) => {
                    this.setState({ Footer: module.default });
                });
            }
        if (!this.state.openInAppBanner) {
            import(
                /* webpackChunkName:"openInAppBanner" */ "../utility/AppBanner/OpenInAppBanner"
                ).then((module) => {
                    this.setState({ openInAppBanner: module.default });
                });
            }
        if(!this.state.GoogleAds) {
            import(
                /* webpackChunkName:"GoogleDFP" */ "../../App/components/GoogleDFP"
                ).then((module) => {
                    this.setState({ GoogleAds: module.default });
                });
        }
        window.removeEventListener("scroll", this.loadRecommendedWidgets);
        window.removeEventListener(this.props.eventType, this.loadRecommendedWidgets);
    }
    isMCATIDsNull()
    {
        let std_mcat = '';
        let mcatids = this.props.data ? this.props.data.PC_ITEM_GLCAT_MCAT_ID_LIST.split(","): "";
        for (var i = 0; i < mcatids.length; i++) {
            if (mcatids[i] != ' ' && mcatids[i] != '') { std_mcat += mcatids[i] + ','; }
        }
        std_mcat = std_mcat.slice(0, -1);
        return std_mcat;
    }

    

        

    isInViewport = () => {
        const explSmlr = this.exploreSimilar? (this.exploreSimilar.getBoundingClientRect()):'', 
        explSmlrTop = explSmlr.top, 
        explSmlrBottom =  explSmlr.bottom;
        const findPopularRef = this.FindPopular? (this.FindPopular.getBoundingClientRect()):'',
        findPopularRefTop = findPopularRef.top, 
        findPopularRefBottom =  findPopularRef.bottom;
        const checkFirstAd =document.querySelector('#div-gpt-ad-1580806668794-0')?document.querySelector('#div-gpt-ad-1580806668794-0'):'';
        const checkFistAdIframe= checkFirstAd && checkFirstAd.getElementsByTagName("iframe")[0];

        
        let isAdVisible='';
        checkFistAdIframe? isAdVisible='-AdVisible':isAdVisible='';
            
        if((explSmlrTop >= 0) && (explSmlrBottom <= window.innerHeight)){
            if(this.state.isOnetimeExplr){
                this.setState({ isOnetimeExplr: false})
            }
        }else{this.setState({ isOnetimeExplr: true})}

        if(findPopularRefTop < window.innerHeight && findPopularRefBottom >= 0){
            if(this.state.isOnetimeFindPopular){
                this.setState({ isOnetimeFindPopular: false})
            }
        }else{this.setState({ isOnetimeFindPopular: true})}
    };

    getExportDetails() {
        let iso = getCookieValByKey('ImeshVisitor','iso') ? getCookieValByKey('ImeshVisitor','iso') : getCookieValByKey('iploc','gcniso');
        let pref_countries = this.props.data["TOP_EXPORT_COUNTRIES"];
        let extendedId = this.props.isExtended;
        let countryNames = pref_countries ? pref_countries.map(item=> item.name).slice(0,5).join(", ") : '';
        let exportsTo = '';
        if (iso && iso !== "IN" && pref_countries) {
            exportsTo = countryNames;
        }
        this.export= countryNames ? { countryNames : countryNames, exportsTo : exportsTo} : {}; 
        
        return this.export;
        
    }


    render() {
        
        let setRefExploreSimilar = (el) => {this.exploreSimilar = el;};
        let setRefFindPopular = (el) => {this.FindPopular = el;};

        const isFirstAdID =document.querySelector('#div-gpt-ad-1580806668794-0')?document.querySelector('#div-gpt-ad-1580806668794-0'):'';
        const isFirstAdIframe= isFirstAdID && isFirstAdID.getElementsByTagName("iframe")[0];
        let setAdRef='';
        isFirstAdIframe? setAdRef=true:setAdRef=false;
        let ABTestVal = (window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"");
        let cABTestPDP= this.props.cABTestPDP?this.props.cABTestPDP:'';

        let BRD_MCAT_NAME = this.props.data.BRD_MCAT_NAME && this.props.data.BRD_MCAT_NAME !== '' ? this.props.data.BRD_MCAT_NAME : (this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME : '');

        let BRD_MCAT_FLNAME = this.props.data.BRD_MCAT_FLNAME && this.props.data.BRD_MCAT_FLNAME !== '' ? this.props.data.BRD_MCAT_FLNAME : (this.props.data.PARENT_MCAT.GLCAT_MCAT_FLNAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_FLNAME : '');

        let cityName = this.props.data.CITY.toLowerCase();
        let brdMcatFlNameUrl = '/' + BRD_MCAT_FLNAME + '.html';
        let cityUrl = 'https://m.indiamart.com/city/' + cityName + brdMcatFlNameUrl;
        let queryTXT="Inline_PBR"; 
        let prodImg=this.getImgSrc(); 
        let brdMcat=this.props.data.BRD_MCAT_NAME && this.props.data.BRD_MCAT_NAME !== '' ? this.props.data.BRD_MCAT_NAME : (this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME : '') ;
        let glcatMcatList = this.props.data["PC_ITEM_GLCAT_MCAT_ID_LIST"] ? this.props.data["PC_ITEM_GLCAT_MCAT_ID_LIST"].split(",") : [];
        let nonEmptyMcatList = glcatMcatList.filter(item => {
            if(item && (/\S/.test(item))) {
                return item;
            }
        });
        let isOOS=this.props.data.PC_ITEM_STATUS_APPROVAL && this.props.data.PC_ITEM_STATUS_APPROVAL === "9";
        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let showEcom = (isEcom && isEcomStoreFlag  == 1&&!isOOS);
        let productItemName=this.props && this.props.data && this.props.data.PC_ITEM_NAME? this.props.data.PC_ITEM_NAME:'';
        this.mblProp={searchKey:brdMcat,productName:productItemName,ctaName:'Get Verified Sellers',
         miniBl:true,affiliationId:"-48",productImage:prodImg, queryText:queryTXT ,mcatId:this.props.data.BRD_MCAT_ID,catId:this.props.data.CAT_ID, page:'PDP',EnqBlForm:this.props.showEnqPopup,track:''} 
        let multipurpose = localStorage && localStorage.multi_purpose ? JSON.parse(localStorage.multi_purpose) : '';
        let isUserConverted ='';
        let getSellerDesc = getSellerDescription(this.props.data);
        let mainSellerData = {
            yearOfEstablishment: getSellerDesc.yearOfEstablishment,
            legalStatus: getSellerDesc.legalStatus,
            bizType: getSellerDesc.bizType,
            numberOfEmp: getSellerDesc.numberOfEmp,
            turnOver: getSellerDesc.turnOver,
            imMemeberSince: getSellerDesc.imMemeberSince,
            tradeMembership: getSellerDesc.tradeMembership,
            glusrFirstName: getSellerDesc.glusrFirstName,
            glusrLastName: getSellerDesc.glusrLastName,
            deliveryLocation: getSellerDesc.deliveryLocation,
            sellerTitle: getSellerDesc.sellerTitle,
            logoImg: getSellerDesc.logoUrl,
            companyUrl: getSellerDesc.companyUrl,
            video_link: getSellerDesc.video_link,
            pcItemName: getSellerDesc.pcItemName,
            isProdServ: getSellerDesc.isProdServ,
            GLUSR_USR_ID: getSellerDesc.GLUSR_USR_ID,
            BRD_MCAT_ID: getSellerDesc.BRD_MCAT_ID,
            PC_ITEM_DISPLAY_ID: getSellerDesc.PC_ITEM_DISPLAY_ID,
            FOB_PRICE: getSellerDesc.FOB_PRICE,
            CAT_ID: getSellerDesc.CAT_ID,
            DATATYPE: getSellerDesc.DATATYPE,
            trackPageString: "main_pdp",
            serviceData: this.props.data,
            SELLER_RATING: getSellerDesc.SELLER_RATING,
            exportsTo : this.getExportDetails() ? this.getExportDetails().exportsTo : '',
            countryNames : this.getExportDetails() ? this.getExportDetails().countryNames : '',
            translatedText: this.props.translatedTxt
        };

        let isVideoPresent = this.props.data.ITEM_DOCS != undefined && this.props.data.ITEM_DOCS.pc_item_doc_type == "VIDEO" && this.props.data.ITEM_DOCS.pc_item_doc_path ? true : false;
        let productVideoURL = this.props.data.ITEM_DOCS && this.props.data.ITEM_DOCS.pc_item_doc_path;
        let check = this.props.data.ITEM_DOCS.pc_item_doc_type_id;
        let queryRef = 'IMOB_PDP_Catalog_Info' + (window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
        productVideoURL && (productVideoURL.includes("shorts/") ? productVideoURL = productVideoURL.replace("shorts/", "watch?v=") : "");
        let showProductVideo = isVideoPresent ? (<div id="videoInBelowthefold" className="mt10 pdb10">
            <p className=" pd10 fw fs17 mxht1000 btmtop mt10 pdt20">Product Video of {productItemName?productItemName:displayName?displayName:''} </p>
            <div className='pdr10 pdl10'>
            {(check==1||check==2) && this.props.YouTubePlayer ? <this.props.YouTubePlayer muted={true} url={productVideoURL} width={"100%"} height={"250px"} controls />
            :(check==3||check==4)?
              <div className="New_Fb tp10">
                <iframe
                src={`https://www.facebook.com/plugins/video.php?href=${this.props.data.ITEM_DOCS.pc_item_doc_path}&width=500&show_text=false&height=500&appId&autoPlay=1`}
                width="100%"
                height="330px"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                allowFullScreen
                ></iframe>
              </div>
            :(check==5||check==6)?<InstagramVideoComponent url={this.props.data.ITEM_DOCS.pc_item_doc_path} check={check}/>
            :''}
            </div>

<div className='mt5'>
    {
        this.props.data.PC_ITEM_IS_ECOM&&showEcom&& this.props.data.ECOM_ITEM_LANDING_URL? ''
        :
        isOneTap && !checkEnquirySentRelated(data.PC_ITEM_DISPLAY_ID)? 

        <InlineChatWithSeller
        
            toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
            enqCtaDisabled = {this.props.enqCtaDisabled}
            label="Request-Call-Back-ProductVideo" data={this.props.data} pageLang={this.props.pageLang} formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_ProductVideo"+track}  pageName={"PDP"} translatedText={translatedTxt} showModal={this.props.showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}
            btnName={"ProductVideo"} isABtst={true} companyInfoFlag={true}/> 
            :
            <GetLatestPriceEnquiry
            
            toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
            enqCtaDisabled = {this.props.enqCtaDisabled}
            pdpcompany={true}
            callIconforPDPnewCTA={true}
            evntAction="GetBestPrice"                                     
            label="ProductVideo" data={this.props.data} pageLang={this.props.pageLang} formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} isExtended={false} queryRef={"IMOB_PDP_ProductVideo|pdp_first_fold"}  pageName={"PDP"} translatedText={this.props.translatedTxt} showModal={this.props.showModal} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} pdpModrefType={'3'}  eventAction={"PDP_ProductVideo_Enquiry_Sent"} PcItemName={this.props.data.PC_ITEM_NAME} isCompInfoVisible={true} companyCall={true}  track={''} companyInfoFlag={true}/>
        }
        </div>
        </div>
        ) : '';
        let iscompvideopresent=this.props.data.GLUSR_PROFILE_MEDIA_URL && !this.props.data.empty_video_flag ?true:false;
        let compvideo=!this.props.data.empty_video_flag ? this.props.data.GLUSR_PROFILE_MEDIA_URL: "";
        compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
        let showCompanyVideo = iscompvideopresent ? (<div id="videoInBelowthefold" className="mt10 pdb10">
        <p className="pd10 fw fs17 mxht1000 btmtop mt10 pdt20">Company Video of {this.props.data.COMPANYNAME?this.props.data.COMPANYNAME:'this Product'}</p>
        {this.props.YouTubePlayer ? <div className='pdr10 pdl10'><this.props.YouTubePlayer muted={true} url={compvideo} width={"100%"} height={"250px"} controls /></div> : ''}
    </div>) : '';
let isOneTap= (checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.data;
        return (
            <belowTheFold>
                <div id="hideStickyN"></div>

                {/* <div ref={setRefExploreSimilar}>{exploreSimilarDiv}</div> */}
            

                <div id="fixTheHead"></div>

                {(this.props.data.PC_ITEM_STATUS_APPROVAL === "9")&&this.state.RelatedProductContainer ?
                    <div id='vwSmlSection' className="pf bt0 zIn100 showViewSimilar dn">
                        <div id="vSblakbg" className="blakbgVS" onClick={(props) => { this.closeSimilar(props) }}></div>
                        <div className=" animate__slideInUpShare animatedShare">
                            <this.state.RelatedProductContainer location={this.props.location} 
                                geoLocLabel="Similar-Product-PDP-Clicks"
                                pdpdata={this.props.data}
                                companylink={this.props.data.companylink} companyname={this.props.data["COMPANYNAME"]} mcatId={this.props.data.BRD_MCAT_ID} cityId={this.props.data.CITY_ID} city_name={this.props.data.CITY} type='' page='product-detail' translatedText={this.props.translatedTxt} pageLang={this.props.pageLang} prodTitle={this.props.data.BRD_MCAT_NAME && this.props.data.BRD_MCAT_NAME !== '' ? this.props.data.BRD_MCAT_NAME : (this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME : '')} widgetCalled='fullPDP' cta_name={'सर्वोत्तम मूल्य प्राप्त करें'}
                                eventAction="Location-Widget-Similar-Product"
                                eventCategory="Similar-product-pdp"
                                pageType={"PDP"} cat_ID={this.props.data.CAT_ID}
                                showModal={this.props.showModal} enqCtaDisabled={this.props.enqCtaDisabled}
                                showEnqPopup={this.props.showEnqPopup}
                                viewSimilar={"viewSimilar"}
                                closeSimilar={this.closeSimilar}
                                country_value={this.country_value}
                                track={this.props.track}
                            />
                        </div>
                    </div>
                    : ''}
                    {showProductVideo}
                    {isqShowme(mainSellerData,showCompanyVideo,this.props.toggleEnqCTADisabled,this.props.pageLang,this.props.translatedTxt,this.props.showModal,'',isOneTap,this.props.enqCtaDisabled,showEcom,this.props,this.props.showRatingFeedback,this.props.setRatingInfo)}
                <div> {this.props.EnqBlMain ? <this.props.EnqBlMain prop={this.mblProp} class={'PDPSpecificUI'}/> : ""}</div>
                {/* {<EnqBlMain prop={this.mblProp} logged={true}  companyalready={this.companyalready}  class={'PDPSpecificUI'} />} */}
              {this.std_mcat? <StdproductContainer page="Product-Detail" translatedText={this.props.translatedTxt} mcatid={this.props.data.PC_ITEM_GLCAT_MCAT_ID_LIST} counter="10" product_name={this.props.data.PC_ITEM_NAME}
                showModal={this.props.showModal} pageName={'PDP'} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} isContnr125={true}  track={''}/> : ""}
                
                {/* {<RecommendedProductsContainer view="RPDefaultView" queryText={'product-detail-rcv-' + ((!getCookieValByKey('ImeshVisitor', 'glid')) ? 'U' : 'I') + '|' + this.props.pageLang+ABTestVal + cABTestPDP} translatedText={this.props.translatedTxt}
                    excludeFirstItem={true} page='product-detail' count="11" trck_param={(!getCookieValByKey('ImeshVisitor', 'glid')) ? 'u_' : ''} enqLabel={this.props.translatedTxt != undefined ? this.props.translatedTxt.HEADER_BTN_4 : "Send Enquiry"} head={this.props.translatedTxt != undefined ? this.props.translatedTxt.WID_RECENT_HEADING1 : 'आपके लिए प्रोडक्ट्स'} callTxt={'product_detail_recently_viewed_PWA|' + this.props.pageLang+ABTestVal} gaLastDigit={true} ABTEST={''} isContnr125={true}
                    connectionType={this.props && this.props.connectionType?this.props.connectionType:''}  track={''} showRatingFeedback={this.props.showRatingFeedback} setRatingInfo={this.props.setRatingInfo}
                    /> } */}
                 

                    {(this.state.GoogleAds && this.props.data.GLUSR_USR_ADULT_FLAG === 0) ?
                        <this.state.GoogleAds pdpdata={this.props.data} type={'product detail'} data={{ name: '/3047175/Msite_PDP_PWA_Below_you_may_also_interested', id: 'div-gpt-ad-1580807336291-0', res: [[320, 100], [300, 100], [320, 150], [320, 250], [300, 150], [300, 250], [336, 280], [400, 300]] }}/>: ''}
               
               {/* {<FeaturedCategoriesContainer page='product-detail' count="10" trck_param={(!getCookieValByKey('ImeshVisitor', 'glid')) ? 'u_' : ''} queryText={'Recommended-product_detailRecomended-Product-Click|' + this.props.pageLang+ABTestVal+ this.props.cABTestPDP+''} affiliation_id={(!getCookieValByKey('ImeshVisitor', 'glid')) ? '-57' : '-89'} track={''}/>} */}

                {(checkUserStatus() == 2)? <RecommendedMcatIdentifiedContainer translatedText={this.props.translatedTxt} page="product-detail" isABtst={this.props.isABtst} cABTest={this.props.cABTestPDP} queryText={''} /> : ''}
                
                        { (this.state.GoogleAds && this.props.data.GLUSR_USR_ADULT_FLAG === 0) ?
                            <this.state.GoogleAds pdpdata={this.props.data} type={'product detail'} data={{ name: '/3047175/Msite_PDP_More_product_between_similar_product', id: 'div-gpt-ad-1580806944382-0', res: [[300, 150], [300, 100], [320, 150], [320, 100], [320, 250], [336, 280], [300, 250], [400, 300]] }}/>: ''}
                           
                    
                    
                    {this.state.openInAppBanner? <this.state.openInAppBanner displayName={this.props.data.BRD_MCAT_NAME && this.props.data.BRD_MCAT_NAME !== '' ? this.props.data.BRD_MCAT_NAME : (this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME ? this.props.data.PARENT_MCAT.GLCAT_MCAT_NAME : '')} />:''}
                    

                     {/* <RecentSearchesContainer type={'product detail'} page="Product-Detail" translatedText={this.props.translatedTxt} /> */}

                     { <BreadCrumbs isExtended={false} data={this.props.data} />}
                    {this.props.data && !this.props.data.METATITLE ? ' ' :this.props.data&&this.props.data["BRD_MCAT_ID"]&&this.state.Extended?<this.state.Extended  firstViewpdpdata={this.props.data} location={this.props.location} initialDispId={this.props.data.PC_ITEM_DISPLAY_ID} intialDispName={getDisplayName(this.props.data)} initialTitle={this.props.data["METATITLE"]} initialUrl={getPDPUrl(this.props.data.PC_ITEM_NAME, this.props.data.PC_ITEM_DISPLAY_ID, null, "src")} pageLang={this.props.pageLang} translatedTxt={this.props.translatedTxt} mcatid={this.props.data["BRD_MCAT_ID"]} cityid={this.props.data["CITY_ID"]} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} enqCtaDisabled={this.props.enqCtaDisabled} showModal={this.props.showModal} isABtst={true} cABTestPDP={false} track={''} YouTubePlayer={this.props.YouTubePlayer} loadYoutubePlayer={this.props.loadYoutubePlayer} />:""}

                    {this.state.Footer && this.props.data ? <this.state.Footer pageStatus="good" desktopLink={this.props.desktopLink} pageName="PDP" /> : ''}
            </belowTheFold>
        )
    }
}