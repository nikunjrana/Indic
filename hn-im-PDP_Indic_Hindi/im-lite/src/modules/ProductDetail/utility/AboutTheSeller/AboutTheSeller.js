import React from 'react';
import { getCookie, getCookieValByKey } from '../../../../Globals/CookieManager';
import { getLastSeen } from '../ServiceHandler/fetchProductDetail';
import { setSellerDescriptionTitle, getSellerDescription, setAboutTheSellerDescription, modifyImgSrc, viewMoreAndLessOfAbtTheSeller, getVidId } from "./helper";
import "./AboutTheSeller.css";
import GetLatestPriceEnquiry from '../GetLatestPriceEnquiry/GetLatestPriceEnquiryHTML';
import ProductName from "../ProductName/ProductName";
import { checkUserStatus} from '../../../../Globals/MainFunctions';
import InlineChatWithSeller from "../ChatWithSeller/InlineChatWithSeller";
import CallEnquiryCTA from "../CTA/CallEnquiryCTA";
import { throttle } from 'throttle-debounce';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import { eventTracking, A2HSApp } from '../../../../Globals/GaTracking';
import { getFirstImg } from "../../utility/Carousel/helper";
import Shopify from '../Shopify/Shopify';
import { getMobileNum } from '../CTA/helper';
import { CallBtn4 } from '../../../CallNow/views/CallBtn4';
import {removalTextNodes} from '../../../../Globals/translatorPreact/translatorPatch';

export default class AboutTheSeller extends React.Component {
    constructor(props) {
        super(props);
        this.showAboutVideo = this.showAboutVideo.bind(this);
        this.state = {
            RelatedMoreProducts: '', showVideo: false, showAboutVideo: false, showProductVideo: false, showAboutVideoImg: true, showProductVideoImg: true,
            showVideoPopup: false,
            enqCtaDisabled: false,
            isCompInfoVisible: false,
            exportDetails: {},
            lastSeenStatus:'',
            callclick: false,
            companyInfoClick:'',
            sellerTabClick:''
        }
        this.export = {};
        this.showVideoModal = this.showVideoModal.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.mountRelatedProductsContainer = this.mountRelatedProductsContainer.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.getImgSrc = this.getImgSrc.bind(this);
        this.callClick=this.callClick.bind(this);
        this.setCompInfoVisible = this.setCompInfoVisible.bind(this);
        this.IsCompInfoVisible = this.IsCompInfoVisible.bind(this);
        this.getExportDetails = this.getExportDetails.bind(this);
        this.getOnlinePresence = this.getOnlinePresence.bind(this);
        this.checkEnquirySentRelated = this.checkEnquirySentRelated.bind(this);
        window.addEventListener('popstate', this.setCompInfoVisible);
        this.callRatingTab = this.callRatingTab.bind(this);
        this.setCompanyInfoClick = this.setCompanyInfoClick.bind(this);
        this.setsellerTabClick = this.setsellerTabClick.bind(this);
    }

    setCompInfoVisible() {
        let companyInfoFlag = (this.state.companyInfoClick === 'clickedFromViewMore' || (this.state.companyInfoClick==='clickedFromLable' && this.state.isCompInfoVisible) || (this.state.companyInfoClick==='clickedFromBlackBG' && this.state.isCompInfoVisible))?true:false;
        window.refUrl && window.refUrl[window.refUrl.length - 1] == "somePopUp" ? window.refUrl.pop() : '';
        if (this.state.isCompInfoVisible) {
            viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended, 'clickedFromOnLoad', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
        }
    }
    IsCompInfoVisible(isCompInfoVisible) {
        this.setState({showAboutVideo:false});
        this.setState({ isCompInfoVisible })
    }
    callClick(){
        this.setState({callclick: true})
    }
    setCompanyInfoClick(clickedFrom){
        this.setState({companyInfoClick:clickedFrom})
    }
    setsellerTabClick(clickedFrom){
        this.setState({sellerTabClick:clickedFrom})
    }
    mountRelatedProductsContainer() {
        if (!this.state.RelatedMoreProducts) {
            import(/* webpackChunkName:"RelatedMoreProducts" */ '../../../buyer/container/RelatedMoreProductContainer').then((module) => {
                this.setState({ RelatedMoreProducts: module.default });
            })
        
        }
    }
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack,PAID_TYPE='') {

        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
        if(this.props && this.props.showRatingFeedback && typeof this.props.showRatingFeedback === "function" && checkUserStatus() == 2) {
            this.props.showRatingFeedback();
        }
        callNowActionDispatcher(true, callProps);

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('popstate', this.setCompInfoVisible);
        window.onpopstate = () => {} ;
    }
    handleScroll() {
        throttle(1000, () => { this.mountRelatedProductsContainer() })();
    }
    componentDidMount() {
        if (!this.props.isExtended)
        window.addEventListener('scroll', this.handleScroll);
        if(!window.clickedOnCallNow)
        {  
            callNowActionDispatcher(false);
        }   
        // window.addEventListener('scroll', throttle(1000, () => { this.mountRelatedProductsContainer() }));
        this.getExportDetails();
        this.getOnlinePresence(this.props.data.GLUSR_USR_ID);
    }
    showAboutVideo(type) {
        if (type == "aboutseller") {
            this.setState({ showAboutVideoImg: false, showAboutVideo: true })
            eventTracking('Product-Page-Clicks', 'About-Seller', 'Inline-Video-Icon')
        }
        else {
            this.setState({ showProductVideoImg: false, showProductVideo: true })
            eventTracking('Product-Page-Clicks', 'Product-Description', 'Inline-Video-Icon')
        }
    }

    showVideoModal() {
        this.setState({ showVideoPopup: true })
        history.pushState({ imG: 'videoPopup' }, "", "");
        document.body.style.overflow = 'hidden';
        let x = document.querySelectorAll(".btn_enq");
        let y = document.querySelectorAll(".blakbg");
        let i;
        let j;
       
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("pf");
  }
  for (j = 0; j < y.length; j++) {
   y[j].style.display = "none"; 
  }
        
        

    }
    closePopUp() {  
        this.setState({ showVideoPopup: false,isCompInfoVisible:false });
        document.body.style.overflow = "";
        document.body.classList.contains("oh")?  document.body.classList.remove("oh"): '';
        document.body.style.top?document.body.style.top="":"";

    }
        


    componentDidUpdate(prevProps) {
        removalTextNodes();
        let that = this;
        if (this.state.showVideoPopup) {
            window.onpopstate = function (e) {
                e.preventDefault();
                that.closePopUp();
            }
        }

        if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
            if (document.getElementById("sellerDesc" + this.props.data["PC_ITEM_DISPLAY_ID"]) && document.getElementById("sellerDesc" + this.props.data["PC_ITEM_DISPLAY_ID"]).style.height == "auto")
                viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended, 'clickedFromVideoPop', this.IsCompInfoVisible,this.setCompanyInfoClick);
        }
        this.props.toggleEnqCTADisabled(this.props.data.PC_ITEM_DISPLAY_ID);
        let isIphone= navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0;
        isIphone?this.state.isCompInfoVisible?scrollTo(0,0):'':'';
        this.state.isCompInfoVisible && this.props.enqCtaDisabled==this.props.data.PC_ITEM_DISPLAY_ID?document.body.style.overflow='hidden':''
        this.state.isCompInfoVisible &&this.state.callclick?document.body.style.overflow="hidden":'';    
    }


    getImgSrc() {
        let imgSrc = getFirstImg(this.props.data);
        return modifyImgSrc(imgSrc);
    }

    getExportDetails() {
        let iso = getCookieValByKey('ImeshVisitor','iso') ? getCookieValByKey('ImeshVisitor','iso') : getCookieValByKey('iploc','gcniso');
        let pref_countries = this.props.data["TOP_EXPORT_COUNTRIES"];
        let extendedId = this.props.isExtended;
        let countryNames = pref_countries ? pref_countries.map(item=> item.name).slice(0,5).join(", ") : '';
        let exportsTo = '';
        if (iso && iso !== "IN" && pref_countries) {
            let country = pref_countries.filter(item => {
                if (item["iso"] === iso) {
                    return item;
                }
            });
            exportsTo = countryNames;
        }
        this.export= countryNames ? { countryNames : countryNames, exportsTo : countryNames} : {}; 
        this.setState({exportDetails : this.export});
        
    }
    
    getOnlinePresence(gluserid) {
        if(gluserid && sessionStorage && sessionStorage.getItem("LastSeenData") && sessionStorage.getItem("gluserid")==gluserid)
        {
           let result = JSON.parse(sessionStorage.getItem("LastSeenData"));
           if (result.Response && (result.Response.Code == "200" || result.Response.Code == "204") && result.Response.Data && result.Response.Data["latest_activity_data"].length>0){
            this.setState({lastSeenStatus:result.Response.Data["latest_activity_data"][0]});
            if(result.Response.Data["latest_activity_data"][0]["LastSeen"] === "Online") {
                eventTracking("Product-Page-Clicks","Seller Online",gluserid,false);
            }
            
        }
        }
        else if(gluserid) {
            getLastSeen(gluserid).then((res) => {
                if(res.response) {
                    let result = res.response;
                    sessionStorage && (sessionStorage.setItem("LastSeenData",JSON.stringify(result)) , sessionStorage.setItem("gluserid",gluserid));
                    if (result.Response && (result.Response.Code == "200" || result.Response.Code == "204") && result.Response.Data && result.Response.Data["latest_activity_data"].length>0){
                        this.setState({lastSeenStatus:result.Response.Data["latest_activity_data"][0]});
                        if(result.Response.Data["latest_activity_data"][0]["LastSeen"] === "Online") {
                            eventTracking("Product-Page-Clicks","Seller Online",gluserid,false);
                        }
                    }
                }
            }, 
            (error) => {
                //error block reached
            });
        }
    }
    checkEnquirySentRelated(dispId) {
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        var e = lsData ? lsData['displayId'] : "undef";
        if (e) {
            var dispIds = e.split(",");
            return dispIds.includes(dispId+'');
        }
        else
            return false;
    }

    callRatingTab(showContent, clickedFrom='',companyInfoFlag){
        if(clickedFrom== 'companyStrip'){
            eventTracking('Product-Page-Clicks', 'Company-Card', 'companyStrip');
            this.state.isCompInfoVisible?"":viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended , 'clickedFromBlackBG', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
            showContent('aboutUsTab', this.props.data['PC_ITEM_DISPLAY_ID'],this.setsellerTabClick);
        }else{
            eventTracking('Product-Page-Clicks', 'Company-Card', 'Ratings-Icon-Clicked');
            this.state.isCompInfoVisible?"":viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended , 'clickedFromBlackBG', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
            showContent('ratingTab', this.props.data['PC_ITEM_DISPLAY_ID'],this.setsellerTabClick);
        }
   }
    
    render() {
        let companyInfoFlag = (this.state.companyInfoClick === 'clickedFromViewMore' || (this.state.companyInfoClick==='clickedFromLable' && this.state.isCompInfoVisible) || (this.state.companyInfoClick==='clickedFromBlackBG' && this.state.isCompInfoVisible))?true:false;
        let aboutSellerTitle = setSellerDescriptionTitle(this.props.data.IS_PROD_SERV, this.props.translatedTxt);
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let translatedText = this.props.translatedTxt;
        let getSellerDesc = getSellerDescription(this.props.data);
        let pnsRatio = this.props.data['PNS_RATIO'] ? Math.round(this.props.data['PNS_RATIO']) : '';
        // TODO: Pass this data as props
        var numtype = '';
        var num = '';
        var titleJS = "jatin";
        let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        let cABTestPDP=this.props.cABTestPDP;
        cABTestPDP?cABTestPDP:'';
        let modifiedImgSrc = modifyImgSrc(getSellerDesc.logoImg);
        let productId = this.props.data['PC_ITEM_DISPLAY_ID'];
        let numObj = getMobileNum(this.props.data),
     isIphone = navigator.userAgent&&navigator.userAgent.indexOf("iPhone") > 0,
     scrollY = document.body.style.top,
    displayName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
     mcatname = this.props.data["BRD_MCAT_NAME"] ? this.props.data["BRD_MCAT_NAME"] : this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
     dbTrackText=this.props.isExtended ? ('IMOB_PDP_Catalog_Info_Extended|' +  this.props.pageLang ): ('IMOB_PDP_Catalog_Info'+ (this.state.lastSeenStatus && this.state.lastSeenStatus["LastSeen"]==="Online" ? "Online":"")+'|' +  this.props.pageLang);
    dbTrackText+=(window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
    dbTrackText+=this.props.track;
    let eventLabel=this.props.isExtended?"PDP_Extended_Company_Info":"PDP_Company_Info";
        let callProps =
        {
            type:"OnAboutTheSeller",
            CONTACT_NUMBER: numObj.num,
            CONTACT_TYPE: numObj.type,
            call_txt: "कॉल करें",
            compname: this.props.data['COMPANYNAME'] ? this.props.data['COMPANYNAME'] : '',
            contact_no: "contact_no",
            glusrid: this.props.data["GLUSR_USR_ID"],
            im_popup: "im_popup",
            itemId: this.props.data["PC_ITEM_DISPLAY_ID"],
            itemImage: this.props.data["PC_IMG_SMALL_100X100"] ? this.props.data["PC_IMG_SMALL_100X100"] : "https://m.imimg.com/gifs/background_image.jpg",
            mbgn_askpopup: "mbgn_askpopup",
            mcatid: this.props.data["BRD_MCAT_ID"] ? this.props.data["BRD_MCAT_ID"] : '',
            mcatname: mcatname,
            pagename: "product_detail_extended_PWA|" +  this.props.pageLang,
            dbpagetrack:A2HSApp(true) ? dbTrackText + A2HSApp(true)+ '-'+ (document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbTrackText+cABTestPDP,
            widgetTrackCatg: 'Extended_PDP_PWA',
            page: 'PDP',
            itemName: displayName,
            tscode: this.props.data["ETO_OFR_COMPANY_TSCODE"] ? this.props.data["ETO_OFR_COMPANY_TSCODE"] : '',
            eventAction:numObj.type == 'PNS'?'Clicked-PNS':"Clicked-NonPNS",        
            eventLabel: eventLabel,
            PAID_TYPE : this.props.data['URL_TYPE'] ? this.props.data['URL_TYPE'] : '',
            callclick:this.callClick
        };
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
            pnsRatio: pnsRatio,
            trackPageString: "main_pdp",
            num: num,
            numtype: numtype,
            titleJS: titleJS,
            langSelection: langSelection,
            translatedText: translatedText,
            modifiedImgSrc: modifiedImgSrc,
            isExtended: this.props.isExtended,
            serviceData: this.props.data,
            SELLER_RATING: getSellerDesc.SELLER_RATING,
            exportsTo : this.state.exportDetails ? this.state.exportDetails.exportsTo : '',
            countryNames : this.state.exportDetails ? this.state.exportDetails.countryNames : '',
            lastSeenStatus : this.state.lastSeenStatus
        };
        
        
        let catToTop = this.props.catToTop;


        let isEcom= this.props.data.PC_ITEM_IS_ECOM? this.props.data.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.data.ECOM_ITEM_LANDING_URL? this.props.data.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.data.ECOM_STORE_ENABLE_FLAG? this.props.data.ECOM_STORE_ENABLE_FLAG:'';
        let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1));

        let isButtonDisabled = this.checkEnquirySentRelated(this.props.data.PC_ITEM_DISPLAY_ID);
        let setSellerDescription = setAboutTheSellerDescription(mainSellerData, this.props.isExtended, this.showVideoModal, this.props.data, this.props.extendedId, this.props.pageLang, catToTop,this.callNowClick,showEcom,cABTestPDP, this.callRatingTab, isButtonDisabled,this.callClick,this.state.isCompInfoVisible,companyInfoFlag,this.setsellerTabClick,this.state.sellerTabClick,this.props.track);

        let sellerAboutVideo = "";
        let isOneTap= (checkUserStatus() == 2 && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.data;
        let queryRef = this.props.queryRef + (window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
        if (this.props.data['GLUSR_PROFILE_MEDIA_URL']) {
            if (this.state.showAboutVideoImg) {
                sellerAboutVideo =this.props.YouTubePlayer?<this.props.YouTubePlayer muted={true} width={"100%"} height={"200px"}
                    url={'https://www.youtube.com/watch?v=' + getVidId(this.props.data['GLUSR_PROFILE_MEDIA_URL'])}
                    controls
                    className="mt5 pd10 bxrd10"
                />:""
            }
            if (this.state.showAboutVideo) {
                sellerAboutVideo =this.props.YouTubePlayer?<this.props.YouTubePlayer muted={true} width={"100%"} height={"200px"}
                    url={'https://www.youtube.com/watch?v=' + getVidId(this.props.data['GLUSR_PROFILE_MEDIA_URL'])}
                    playing
                    controls
                    className="mt5 pd10 bxrd10"
                /> :''
            }


        }

        let view =
            !this.state.showVideoPopup

                ?

                <section class="w100 mt10 por">
                    
 <div id={"blak" + this.props.data['PC_ITEM_DISPLAY_ID']}  className={`blakbg ${companyInfoFlag?'db':'dn'}`}  onClick={() => {
                                viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended , 'clickedFromBlackBG', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
                            }}></div>

                    <div class={`animated bgw mb10 bxsdw ${companyInfoFlag?'dt_pos1 animate__slideInUpShare':''}`} id={"aboutDetail" + this.props.data['PC_ITEM_DISPLAY_ID']} >

                    <div id={"crossAbout" + this.props.data['PC_ITEM_DISPLAY_ID']}  
                        className={`poa  pd15 ${this.state.isCompInfoVisible&&!showEcom? 't5 l0': ' tpo rt0'} ${companyInfoFlag?'db':'dn'}`}  
                        onClick={() => {
                                    viewMoreAndLessOfAbtTheSeller("v_more2" + this.props.data["PC_ITEM_DISPLAY_ID"], this.props.data["PC_ITEM_DISPLAY_ID"], this.props.translatedTxt, this.props.isExtended , 'clickedFromCross', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);}}>
                    <i class="wh15 dib bgNorepeat closearrowSvg"></i></div>


                        <div>
                       <p id={"isAbtTSlr" + this.props.data['PC_ITEM_DISPLAY_ID']} 
                       className={` db fs15 mxht1000 clrb ${this.state.isCompInfoVisible&&!showEcom?' pd20 tc ':' pd10 '} fw brdb `} 
                       onClick={() => { this.setState({ showAboutVideoImg: true, showAboutVideo: false }); 
                            viewMoreAndLessOfAbtTheSeller("v_more2" + productId, productId, translatedText, this.props.extendedId , 'clickedFromLable', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
                            if (!this.props.isExtended) this.mountRelatedProductsContainer() }}>{translatedText.PDP_LABEL11}</p>
                            {!this.state.isCompInfoVisible?"":showEcom?'':<CallBtn4
                    key={callProps.CONTACT_NUMBER}
                    callText={callProps.call_txt}
                    callclick={callProps.callclick}
                    abtest={true}
                    eventAction={callProps.eventAction+cABTestPDP}
                    eventLabel={callProps.eventLabel}
                    displayPopup={() => {
                         this.callNowClick("कॉल करें",
                            callProps.itemImage.replace(/^http:\/\//i, 'https://'), callProps.tscode, callProps.compname,
                            callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                            callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack, callProps.PAID_TYPE);
                    }}
                    isAnimated={true}
                    isButtonDisabled={true}
                    companyContactNo={callProps.CONTACT_NUMBER}
                />}
                            
                            <div id={"isToggleAbtSlrId" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`${companyInfoFlag?'db':''}`}>
                                <div id={"about_box" + this.props.data['PC_ITEM_DISPLAY_ID']} className={`companyDescription ${companyInfoFlag?'ht430px ovato':'htato oh'}`}> 
                                    <div class="fs15 color7 ">
                                        
                                    
                                    
                                        {setSellerDescription}
                                        {this.props.isExtended?<div id={"hiddenSectionOfSeller"+ this.props.data['PC_ITEM_DISPLAY_ID']} className={`${companyInfoFlag?this.state.sellerTabClick?'mb101px':'mb100px':'ht0 oh mb0'}`}>
                                        
                                                {
                                                showEcom ? <Shopify pdpData={this.props.data} calledFrom={true} ClickedFrom={'CompanyInfo'} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} companyInfoFlag={companyInfoFlag}/> 
                                                :
                                                isOneTap && !isButtonDisabled? 
                
                                                <InlineChatWithSeller
                                                companyInfoFlag={companyInfoFlag}
                                                    toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                                    enqCtaDisabled = {this.props.enqCtaDisabled}
                                                    label="Request-Call-Back-Company" data={this.props.data} pageLang={this.props.pageLang} formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} isExtended={this.props.isExtended} queryRef={queryRef+this.props.track} extendedId={this.props.extendedId} pageName={"PDP"} translatedText={this.props.translatedTxt} showModal={this.props.showModal} cta_name={this.props.cta_name} pdpModrefType={this.props.pdpModrefType}
                                                    btnName={this.props.isExtended?"Company_Info_Extended":"Company_Info"} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP}/> 
                                                    :
                                                    <GetLatestPriceEnquiry
                                                    companyInfoFlag={companyInfoFlag}
                                                    toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
                                                    enqCtaDisabled = {this.props.enqCtaDisabled}
                                                    evntAction="GetBestPrice_CompanyCard"                                     
                                                    label="AboutUs" data={this.props.data} pageLang={this.props.pageLang} formId={"latestPriceEnqAbtSelr" + this.props.data['PC_ITEM_DISPLAY_ID']} isExtended={this.props.isExtended} queryRef={this.props.queryRef+"|pdp_first_fold"} extendedId={this.props.extendedId} pageName={"PDP"} translatedText={this.props.translatedTxt} showModal={this.props.showModal} cta_name={this.props.cta_name} pdpModrefType={this.props.pdpModrefType}  eventAction={"PDP_Company_Info_Enquiry_Sent"} PcItemName={this.props.data.PC_ITEM_NAME} isCompInfoVisible={this.state.isCompInfoVisible} companyCall={true}  track={this.props.track}/>
                                                }
                                        
                                                <div id={'midSection'+ this.props.data['PC_ITEM_DISPLAY_ID']} className={`${this.state.sellerTabClick=='ratingTab'?'dn':'db'}`}>
                                                {sellerAboutVideo}

                                                {this.state.RelatedMoreProducts ? <this.state.RelatedMoreProducts pageName="PDP" id={productId} glusrid={this.props.data.GLUSR_USR_ID} companylink={this.props.data.companylink} companyname={this.props.data.COMPANYNAME} num={num} numtype={numtype} mcatId={this.props.data.BRD_MCAT_ID} cityId={this.props.data.CITY_ID} isProdServ={this.props.data.IS_PROD_SERV} translatedText={this.props.translatedTxt} eventCategory={"Product-Page-Clicks"}/> : ''}
                                                </div>



                                        </div>:''}

                                    
                                    </div>
                                </div>

                            </div>


                            <div className={`bxshdw04 pd10 clrBl tc fs15 ${companyInfoFlag?'dn':''}`} 
                            id={"v_more2" + productId} 
                            onClick={() => { this.setState({ showAboutVideoImg: true, showAboutVideo: false }); 
                            viewMoreAndLessOfAbtTheSeller("v_more2" + productId, productId, translatedText, this.props.extendedId, 'clickedFromViewMore', this.IsCompInfoVisible,this.setCompanyInfoClick,companyInfoFlag);
                            if (!this.props.isExtended) this.mountRelatedProductsContainer() }} >
                                <p className='mxht1000'>{translatedText.CM_LABEL16}</p>
                            </div>

                        
                        </div>
                    </div>

                </section>

                :

                <div className="pdpZoomSctn">
                    <div className="pdp-modal-content"><div className="bgw tc bxtlrd10 poa w100 bxtrrd10" style={{ height: 'auto', top: '150px' }}>

                        {this.props.YouTubePlayer?<this.props.YouTubePlayer muted={true} width={"100%"} height={"300px"}
                            url={'https://www.youtube.com/watch?v=' + getVidId(this.props.data['GLUSR_PROFILE_MEDIA_URL'])}
                            playing
                            controls
                            className="mt5 mb20"
                        />:''}


                        <ProductName pageLang={this.props.pageLang} data={this.props.data} translatedTxt={this.props.translatedTxt} />
                        


    </div> 
                    </div>
                    <div class=" dib poa b0 pd10 w100 ">
                        <CallEnquiryCTA  isPdpHeader={true} pageLang={this.props.pageLang} data={this.props.data} translatedTxt={this.props.translatedTxt} pageName={"PDP"} callNowClick={this.callNowClick} queryRef={this.props.queryRef} cta_name={this.props.cta_name} 
                        eventLabel={this.props.isExtended?"PDP_Extended_Company_Video":"PDP_Company_Video"}  enqCtaDisabled={this.props.enqCtaDisabled} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} showModal={this.props.showModal} pdpModrefType={this.props.pdpModrefType} showVideoPopup={true} btnName={this.props.isExtended? "Company_Info_Video_PopUp_Extended": "Company_Info_Video_PopUp"}/>

                        </div>
                </div>
                


        return (
            <>
                {this.state.showVideoPopup ? <div id="carClss" onClick={this.closePopUp} className="pf tp0 r0 clr7c fw close fs22 bgw bxrd100 pl10 pr10 pdt5 pdb5 mt5 ml5 z1000">✕</div> : ''}
                {view}
            </>

        );
    }
}