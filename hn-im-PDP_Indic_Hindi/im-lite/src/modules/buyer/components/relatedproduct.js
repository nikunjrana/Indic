import React, { Component } from 'react';
import styles from "../../../Globals/imageCss";
import imApi from "../../../api/imApi";
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking,A2HSApp, gaTrack } from '../../../Globals/GaTracking';
import { getCityNameId } from '../../../Globals/BuyerUtility';
import { pns_prefix } from '../../../Globals/pnsModification';
import { service_link } from '../../../Globals/MainFunctions';
import { Link } from 'react-router';
// import Ads from "../../App/components/GoogleDFP";
import FilterContainer from '../../Widgets/LocationFilter/FilterContainer';
import { setCookie } from '../../../Globals/CookieManager';
import { CallBtn1 } from '../../CallNow/views/CallBtn1';
import { callNowActionDispatcher } from '../../CallNow/actions/callNowActionDispatcher';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import Shopify from '../../ProductDetail/utility/Shopify/Shopify';
import {removalTextNodes} from '../../../Globals/translatorPreact/translatorPatch';
import { modifyImgSrc } from '../../ProductDetail/utility/Carousel/helper';
import { formatINRPrice } from '../../../Globals/priceModification';

class RelatedProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { cityDt: { type: 'prodCity' }, userLocCity: '', userLocId: '', geoLocError: false , isOnetimeState: true, Ads:''}
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.ab = this.glid % 2 == 1;
        this.isFullLogin = checkUserStatus() === 2;
        var self = this;
        this.callUntillDefined = this.callUntillDefined.bind(this);
        this.getMCATS = this.getMCATS.bind(this);
        this.getHitCount = this.getHitCount.bind(this);
        this.geoLocState = this.geoLocState.bind(this);
        this.callApi = this.callApi.bind(this);
        this.catToTop = this.catToTop.bind(this);
        this.getProdTitle = this.getProdTitle.bind(this);
        this.ctr = 51;
        this.callNowClick = this.callNowClick.bind(this);
        this.callEnqForm = this.callEnqForm.bind(this);
        this.checkEnquirySentRelated = this.checkEnquirySentRelated.bind(this);
        this.callRelatedApi = this.callRelatedApi.bind(this);
        this.firePDPTracking = this.firePDPTracking.bind(this);
        this.callAdsJS = this.callAdsJS.bind(this);
        this.removeBelowtheFold = this.removeBelowtheFold.bind(this);
        this.ga=getCookie('_ga');
        this.gaLastDigit= true;
        this.cABTest = '';
        this.mode=checkUserStatus() === 0 ? "Unidentified":checkUserStatus() === 1 ? "Identified":"FullyIdentified";
        this.mode1=checkUserStatus() === 0 ? "Unidentified":checkUserStatus() === 1 ? "Identified":"Full-Login";
        this.foreignCheck = getCookieValByKey("iploc","gcniso") !="IN";
        this.selectedCity ="You" ;
        this.sellerDist ="You";
        this.isABtst = ''
        if(this.gaLastDigit &&this.props.page){
            this.isABtst = 1;
            this.cABTest = '';
            
          }
          else{
            this.isABtst = 0;
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

    getProdTitle() {
    
        if (this.props.page && this.props.page == 'product-detail') {
            let textHeading = this.props.outOfStock && this.props.relatedABTest? "Similar Products From Other Sellers!": this.foreignCheck ?
            `आस-पास लोकप्रिय विक्रेता खोजें${this.sellerDist? this.sellerDist: this.props.city_name}` : this.selectedCity == 'All India' ? 'Find Popular Sellers!' : `आस-पास लोकप्रिय विक्रेता खोजें${this.selectedCity ? this.selectedCity : this.props.city_name}`
            return (
                <p className="db pdt10 pdb10 ml10 mr10 mxht1000 clrb fs17 fw mt5 t_tc" id="pdpRelatedWidget" dangerouslySetInnerHTML={{ __html: textHeading }}>
                </p>)
        } else if(this.props.page && (this.props.page.includes('Company') || this.props.page == 'mini-pdp')) {
            let textHeading = this.props.outOfStock && this.props.relatedABTest? "Similar Products From Other Sellers!": this.foreignCheck ?
            `आस-पास लोकप्रिय विक्रेता खोजें${this.sellerDist? this.sellerDist: this.props.city_name}` : this.selectedCity == 'All India' ? `आस-पास लोकप्रिय विक्रेता खोजें${this.props.city_name}` : `आस-पास लोकप्रिय विक्रेता खोजें${this.selectedCity ? this.selectedCity : this.props.city_name}`
            this.props.setLoadRecm ? this.props.setLoadRecm() : '';
            return (
                 <p className="db pdt10 pdb10 ml10 mr10 mxht1000 clrb fs17 fw mt5 t_tc" id="pdpRelatedWidget" dangerouslySetInnerHTML={{ __html: textHeading }}>
                </p>)
        }
          else if (this.props.page.includes('mini-pdp') && (this.props.page.includes('Mcat') || this.props.page.includes('Search')||this.props.page.includes('Company'))){
            return  <span className="db pdt10 pdb10 mr10 clrb fs17 fw mt5">{this.props.translatedText ? this.props.translatedText.PDP_FsellerLble : "अपने आस-पास लोकप्रिय विक्रेता खोजें!"}</span>;
        }
        else if (this.props.page && this.props.page.includes('Error404PDP')) {
            return (
                <p className="pdt10 clrb fs18 fw">
                    {(this.props.translatedText.PDP_FsellerLble) != '' ?
                        <span>{this.props.translatedText.PDP_FsellerLble} </span> : 'अपने आस-पास लोकप्रिय विक्रेता खोजें!'}
                </p>)
        }
        else {
            return this.props.translatedText.WID_RECOM_HEADING2;
        }
    }


    catToTop(company, category, displayId, brdMcatId) {
        if (category && category != 'new-items.html' && category != 'other-services.html' && category != 'other-products.html') {
            let catparams = {};
            catparams.conditional_flag = "fortopcat"; catparams.brd_mcat_id = brdMcatId; catparams.category = category, catparams.displayid = displayId, catparams.company = (company && company.includes('/'))? company.slice(0, -1) : company, catparams.cat_name = "";

            let data = "conditional_flag=" + catparams.conditional_flag + "|" + "brd_mcat_id=" + catparams.brd_mcat_id + "|" + "category=" + catparams.category + "|" + "displayid=" + catparams.displayid + "|" + "company=" + catparams.company;

      localStorage.setItem("cattoBrowsed", data);


        }
    }

    callAdsJS() {
        if(!this.state.Ads) {
            this.props.page && this.props.page=="Company-Catindex"?this.props.showAds?import(
            /* webpackChunkName:"GoogleDFP" */ "../../App/components/GoogleDFP"
            ).then((module) => {
                this.setState({Ads: module.default });
            }):"":import(
                /* webpackChunkName:"GoogleDFP" */ "../../App/components/GoogleDFP"
                ).then((module) => {
                    this.setState({Ads: module.default });
                })   
        }
        window.removeEventListener("scroll", this.callAdsJS)
    }

    removeBelowtheFold()
    {
        let belowtfold = document.getElementById("belowtfold");
        belowtfold ? belowtfold.parentNode.removeChild(belowtfold) : "";
    }

    callRelatedApi(){
        if(this.props.page && this.props.page.includes("Error404PDP")){
            this.props.getrelatedproducts(this.props.mcatId, this.props.cityId, 10, "", this.props.pageType);
        }
    }

    componentDidMount() {
        removalTextNodes();
        if(this.props.page && this.props.page.includes("Error404PDP")){this.callRelatedApi()}
        window.addEventListener("scroll", this.callAdsJS, {passive:true})
        // this.props.updatestate();
        if (this.props.page !== "product-detail"  && (this.props.page && !this.props.page.includes("Company"))) {
            this.getMCATS();
        }
        if (this.props.selectedCityInFilter && this.props.selectedCityInFilter.cityname && (this.props.page == "product-detail" || this.props.page.includes("Company"))){
            this.getMCATS(this.props.selectedCityInFilter.cityid);
        }
        //fetch userLocCity
        let userLocN = decodeURIComponent(getCookie('userlocName'));
        if (userLocN != "undefined") {
            let userLoc = userLocN.split('||'), cityName, cityId;
            cityName = userLoc[0].charAt(0).toUpperCase() + userLoc[0].substr(1);
            cityId = userLoc[1];
            this.setState({ userLocCity: cityName, userLocId: cityId })
        }
        // callNowActionDispatcher(false);
    }
    
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack) {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP' };
        if(this.props && this.props.showRatingFeedback&&this.props.setRatingInfo&&typeof this.props.setRatingInfo=== "function"&& typeof this.props.showRatingFeedback === "function" && checkUserStatus() == 2) {
            this.props.showRatingFeedback(glusrID);
            this.props.setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name)
        }
        callNowActionDispatcher(true, callProps);
       
    }
    shouldComponentUpdate(){
        return true;
    }
    componentDidUpdate(prevProps) {
        removalTextNodes();
        if (this.props.page && ( (this.props.page && this.props.page.includes("Company"))) && (this.props.RelProdStatus == "loading" || this.props.RelProdStatus == "Failed")) {
            if (this.props.get_relatedproducts && this.props.get_relatedproducts['RECOMMENDED DATA']) {
                this.props.updateStatus('RelProd', 'Done');
            }
            else {
                this.props.updateStatus('RelProd', 'Failed')
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCityInFilter
            &&
            (this.props.selectedCityInFilter.cityname !== nextProps.selectedCityInFilter.cityname)
            || (this.props.selectedCityInFilter && this.props.mcatId !== nextProps.mcatId)
        ) {
        this.getMCATS(nextProps.selectedCityInFilter.cityid);
        }
    }
    getHitCount(mcats) {
        if (mcats.length >= 3)
            return [4, 3]
        else if (mcats.length == 2)
            return [6, 2]
        else if (mcats.length == 1)
            return [12, 1]
    }

    geoLocState(...results) {
        let that = this;
        if (results[0] == "denied" || results[0] == "prompt-denied" || results[0] == "denied-phone") {
            this.setState({ geoLocError: true })
        }
        else {
            if (results[0] == 'granted' || results[0] == 'prompt-granted') {
            }
            imApi.findCityWithLatLong(results[1], results[2]).then(function (res) {
                that.getMCATS(res.cityid);
                that.setState({ cityDt: { selCity: res.cityname, type: 'nearme' } })
            })
        }
    }
    callApi(p, data, city) {
        

            let ctr = 0;
            if (localStorage.getItem('relProds2'))
                ctr = 1;
            for (let i = ctr; i < p[1]; i++) {
                this.props.getrelatedproducts(data[i].mcatid, city, p[0], "", this.props.pageType);

            }
        
     }
    getMCATS(cityID) {
        let city = cityID ? cityID : this.props.cityId;

        if(this.props.page == 'product-detail' || (this.props.page && (this.props.page.includes("Company") || this.props.page.includes("mini-pdp")))){ 
        if(this.props.mcatId && !isNaN(this.props.mcatId)) {
            if(this.props.page=="product-detail" && (this.props.pdpdata && this.props.pdpdata.PC_ITEM_IS_ECOM && this.props.pdpdata.ECOM_ITEM_LANDING_URL && this.props.pdpdata.ECOM_STORE_ENABLE_FLAG)){
          this.props.getrelatedproducts(this.props.mcatId, "", 10, 1, this.props.pageType);
            }
        else{
            this.props.getrelatedproducts(this.props.mcatId, city, 10, "" , this.props.pageType);
        }   
        }
        else{
            this.props.setLoadRecm ? this.props.setLoadRecm() : '';
        }
        }
        else {
            this.recentMcats = localStorage.getItem("recentMcats");
            this.recentMcats = JSON.parse(this.recentMcats);
            if (this.props.mail && this.props.mail.query && this.props.mail.query.mcatid) {
                this.recentMcats = [{ mcatid: this.props.mail.query.mcatid }]
            }
            var that = this;
            if (this.recentMcats && this.recentMcats.length > 0) {
                let p = this.getHitCount(this.recentMcats);
                this.ctr += 1;
                getCityNameId().then(
                    function (response) {
                        // GET DATA WITH CITY
                    }, function (response) {
                        that.callApi(p, that.recentMcats, '');
                    }
                )
            }
        }

    }

    callUntillDefined(mcatid, eDISPLAY_ID, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, imgurl, ctaName) {
        var modreftype = 2;
        var query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var page_track = (this.props.page) ? this.props.page : 'Home'
        var query_text = (this.props.page) == "product-detail" ?
            (this.props.widgetCalled) == 'fullPDP' ? "Product-recommended-GetBestPrice-js|" + langSelection
                : "product_detail_product_recommended_PWA|" + langSelection : page_track + '-related-products|PWA';

        callUntillDefined('showEnquiryForm', 0, 50, [
            {
                'enq_mcat_id': mcatid,
                'enquiryDivId': 'dispid' + eDISPLAY_ID,
                'enq_sent_color': disableEnqBtn,
                'enq_item_price': PRICE,
                'query': query,
                'query_text': query_text,
                'company': COMPANYNAME,
                'formType': 'overlay',
                'R_glusr_id': GLUSR_ID,
                'R_custtype_weight': '',
                'R_title': ITEM_NAME,
                'enqConv': 'on',
                'int_rec': '1',
                'modid': 'IMOB',
                'displayId': DISPLAY_ID,
                'traffic_source': '',
                'product_image': imgurl,
                'cta_name': ctaName
            }
        ])

    }


    callEnqForm(mcatid, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, imgurl, ctaName, cat_ID,callProps) {
        var modreftype = 2;
        var query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var page_track = (this.props.page) ? this.props.page : 'Home'
        var query_text = (this.props.page) == "product-detail" ?
            (this.props.widgetCalled) == 'fullPDP' ?
            this.props.relatedInFistFold? 'IMOB_PDP_Converted_User_Sellers_Near_You|'+ langSelection
            :this.props.viewSimilar? 'PDP-ViewSimilarOverlay|'+ langSelection
            :this.props.priceOnRequest?'IMOB_PDP_Sellers_Near_You|Price_on_request|' + langSelection+`${this.props.page.includes("product-detail")?this.props.track:''}`
                : "IMOB_PDP_Sellers_Near_You|" + langSelection+`${this.props.page.includes("product-detail")?this.props.track:''}`
                : "product_detail_product_recommended_PWA|" + langSelection : page_track + '-related-products|PWA'+`${this.props.page.includes("product-detail")?this.props.track:''}`;
        if (this.props.page && this.props.page.includes("-mini-pdp") && this.props.eventCategory) {
            let isPageNameP = this.props.eventCategory == 'Company'? 'Catalog': this.props.eventCategory;
            query_text = isPageNameP +'-SimilarProducts|'+langSelection;
        }
        query_text+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"") + this.cABTest;
        
        let data ={};
            data.isEnquiry= true;
            data.productName= ITEM_NAME;
            data.page= window.pageName?window.pageName:"";
            data.receiverUserId= GLUSR_ID;
            data.mcatId= mcatid;
            data.queryText= query_text ;
            data.displayId= DISPLAY_ID +'';
            data.productImage= imgurl?imgurl:'https=//m.imimg.com/gifs/img/prod-img.png';
            data.companyName= COMPANYNAME;
            data.ctaName= ctaName;
            data.affiliationId="-1";
            data.catid= cat_ID;
            data.modid= 'IMOB';
            data.query= query;
            data.enq_item_price= PRICE? PRICE:'';
            data.eventLabel=callProps.eventLabel,
            data.contactNumber=callProps.CONTACT_NUMBER,
            data.contactType= callProps.CONTACT_TYPE,
            data.glusrID=callProps.glusrid,
            data.itemId=callProps.itemId,
            data.itemName=callProps.itemName,
            data.mcatname=callProps.mcatname,
            data.dbpagetrack=callProps.dbpagetrack,
            data.custtypeWeight=callProps.custtypeWeight,
            data.tsCode=callProps.tscode,
            data.callTxt=callProps.call_txt,
            data.query_ref_id=callProps.query_ref_id,
            data.query_ref_type=callProps.query_ref_type;
            data.query_ref_id=callProps.query_ref_id,
            data.modrefid=callProps.modrefid,
            data.internaltrack=this.props.track,
            data.modrefname=callProps.modrefname,
            data.widgetType="Listing"
            this.props.showModal(data);
    }

    firePDPTracking(category, action, label,track) {
        if(window.pageName && window.pageName == "PDP" ) {
            let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
            let loginModeArray1=["Unidentified", "Identified", "FullyIdentified"]
            let status = checkUserStatus();
            action+=(status>=0 && status<=2 ? loginModeArray[status] : "");
            action+= this.cABTest;
            label+= '|EnquiryCTA|PDP|'+loginModeArray1[status]+track?track:""
            eventTracking("EnquiryCTA/"+loginModeArray1[status],"PDP/"+"Find-Popular/","",true)
        }
        eventTracking(category, action, label, true);
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    addslashes(str) {
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '\\"');
        str = str.replace(/\0/g, '\\0');
        return str;
    }

    render() {
        removalTextNodes();
        this.selectedCity =sessionStorage.getItem("selectedCity")!=''? sessionStorage.getItem("selectedCity") : "You" ;
        this.sellerDist =sessionStorage.getItem("sellerDist")!=''? sessionStorage.getItem("sellerDist") : "You";
        let self = this;
        let ctaName = '';
        let cat_ID= this.props.cat_ID?this.props.cat_ID:'';
        let viewSimilar = this.props.viewSimilar? this.props.viewSimilar == "viewSimilar":'';
        let relatedInFistFold = this.props.relatedInFistFold? true :'';
        let isContnr125 = this.props && this.props.isContnr125? true :'';
        let checkConnection = this.props && this.props.connectionType? !this.props.connectionType()? 'fastNetwork':'slowNetwork':'';
        
        if (this.props.page == 'product-detail') { ctaName = this.props.cta_name; } else { ctaName = "सर्वोत्तम मूल्य प्राप्त करें" }

        let page_name_track = (this.props.page && this.props.page == 'product-detail') ? 'Product' : ((this.props.page) ? this.props.page : 'Home');
        let page_name_track_append = (this.props.page && (this.props.page == 'product-detail' || this.props.page.includes("Company"))) ? '-Page-Clicks' : '-Page-Clicks-PWA';
        var listitems = '';
        let relink_url = '';
        var res = this.props.get_relatedproducts;
        let host_link = '';
        let hitcounts_trck = this.props.hitCount;
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let mcat_url_link = '';
        let call_txt = (this.props.page) == "product-detail" ? "IMOB_PDP_Sellers_Near_You|" + langSelection : self.props.page + '-related-products|PWA';
        let isPageName = this.props.eventCategory == 'Mini-PDP-Company'? 'Mini-PDP-Catalog': this.props.eventCategory;
        let isEcom= this.props.pdpdata && this.props.pdpdata.PC_ITEM_IS_ECOM?this.props.pdpdata.PC_ITEM_IS_ECOM:'',
        isEcomURL= this.props.pdpdata && this.props.pdpdata.ECOM_ITEM_LANDING_URL?this.props.pdpdata.ECOM_ITEM_LANDING_URL:'',
        isEcomStoreFlag= this.props.pdpdata && this.props.pdpdata.ECOM_STORE_ENABLE_FLAG? this.props.pdpdata.ECOM_STORE_ENABLE_FLAG:'';
        let Ecom_store_name= this.props.pdpdata && this.props.pdpdata.ECOM_STORE_NAME? this.props.pdpdata.ECOM_STORE_NAME:'';
        let showEcom = (isEcomURL && (isEcom && isEcomStoreFlag  == 1)); 
       
        if (this.props.page && this.props.page.includes("-mini-pdp") && this.props.eventCategory) {
           call_txt = isPageName + '-SimilarProducts|' + langSelection+'|'+this.props.isProdServ;
        }
        call_txt+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
        if (localStorage.getItem('relProds2')) {
            hitcounts_trck += 1;
        }
        let SetAdRef = this.props.SetAdRef? '-AdVisible':'';
        let eventLabel =(this.props.page && (this.props.page == 'product-detail' || this.props.page.includes("Company"))) ?
         this.props.relatedInFistFold?'Converted-User-Related-Products': 'Related-Products' +SetAdRef : 'Related-Products-Section-' + hitcounts_trck+(this.props.pdpdata?this.props.pdpdata.GLUSR_ID:'');
        if (res != undefined && !this.isEmpty(res)) {

            var head = 'Just For you';
            if (this.props.type == 'back')
                head = 'You may also like';

            if (this.props.page && this.props.page == 'product-detail') {
                let relProdLSData =localStorage.getItem('relProds2')? JSON.parse(JSON.parse(localStorage.getItem('relProds2'))):[];
                let datProds = this.props.get_relatedproducts['RECOMMENDED DATA'];
                let relProd = {};
                let relProds = [];
                
                
                if (datProds && datProds.length > 0) {
                    for (let i = 0; i < datProds.length; i++) {
                        //relProds2
                        relProd = { 'ITEM_NAME': datProds[i]['ITEM_NAME'], 'CONTACT_TYPE': datProds[i]['CONTACT_TYPE'], 'COMPANYNAME': datProds[i]['COMPANYNAME'], 'CONTACT_NUMBER': datProds[i]['CONTACT_NUMBER'], 'COMPANY_LINK': datProds[i]['COMPANY_LINK'], 'COMPANY_URL': datProds[i]['COMPANY_URL'], 'SDA_GLUSR_USR_LOCALITY': datProds[i]['SDA_GLUSR_USR_LOCALITY'], 'CITY_NAME': datProds[i]['CITY_NAME'], 'PRICE': datProds[i]['PRICE'],'MOQ_PER_UNIT': datProds[i]['MOQ_PER_UNIT'], 'ITEM_ID': datProds[i]['ITEM_ID'], 'IMAGE_125X125': datProds[i]['IMAGE_125X125'],'IMAGE_250X250': datProds[i]['IMAGE_250X250'],'IMAGE_500X500': datProds[i]['IMAGE_500X500'], 'DISPLAY_ID': datProds[i]['DISPLAY_ID'], 'GLCAT_MCAT_FLNAME': datProds[i]['GLCAT_MCAT_FLNAME'], 'GLCAT_MCAT_NAME': datProds[i]['GLCAT_MCAT_NAME'], 'PRD_SEARCH_MOQ_UNIT_TYPE': datProds[i]['PRD_SEARCH_MOQ_UNIT_TYPE'], 'GLUSR_ID': datProds[i]['GLUSR_ID'], 'mcatid': datProds[i]['MCAT_ID'], 
                        'PRICE_SEO': datProds[i]['PRICE_SEO'],'price_f': datProds[i]['PRICE_F'],'pagekey':"|PDP" ,PDP_URL:datProds[i]['PDP_URL'],'ECOM_ITEM_LANDING_URL':datProds[i]['ECOM_ITEM_LANDING_URL'],'ECOM_CART_URL':datProds[i]['ECOM_CART_URL'],'FK_ECOM_STORE_MASTER_ID':datProds[i]['FK_ECOM_STORE_MASTER_ID']};
                        relProds.push(relProd);

                    }
                    let finalData = [...relProds,...relProdLSData];
                    let uniqueArray = Array.from(new Set(finalData.map(obj => obj.DISPLAY_ID))).map(DISPLAY_ID => finalData.find(obj => obj.DISPLAY_ID === DISPLAY_ID));
                    uniqueArray=uniqueArray?uniqueArray.slice(0,10):''; 
                    localStorage.setItem('relProds2', JSON.stringify([JSON.stringify(uniqueArray)]));
                }
            }

            listitems = this.props.get_relatedproducts['RECOMMENDED DATA'];

            if (this.props.page && this.props.page == 'product-detail' && this.props.isRecommendedData == 'isRecommendedData' && listitems && this.state.isOnetimeState) {
                if (listitems.length == 0) {
                    let dsplyId = this.props.pdpdata.PC_ITEM_DISPLAY_ID;
                    dsplyId ? dsplyId = '-' + dsplyId : dsplyId = '';
                    let mCatID = this.props.mcatId;
                    mCatID ? mCatID = '-' + mCatID : mCatID = '';
                    let updatedCity = this.props.selectedCityInFilter.cityname == "All India" ? 'allindia' : this.props.selectedCityInFilter.cityid;
                    let updatedCityShow = updatedCity ? updatedCity = '-' + updatedCity : updatedCity = '';

                }
            }



            let new_rel_identifier = '';
            self = this;
            this.key = 0;

            if (listitems) {
                if (this.props.page && this.props.page === "product-detail" || (this.props.page && this.props.page.includes("Error404PDP"))) {
                    if ((listitems.length) >= 7) {
                        
                        let trim = listitems.slice(0, 6);
                        trim[6] = { "VIEW_SIMILAR_PRODS": "links" };
                        listitems = trim;
                    }
                    else {
                        // listitems.shift();
                        listitems[listitems.length] = { "VIEW_SIMILAR_PRODS": "links" };
                    }
                } 

                if ((this.props.page && this.props.page.includes("Company"))) {
                    if ((listitems.length) >= 7) {

                        let trim = listitems.slice(0, 6);
                        trim[6] = { "VIEW_SIMILAR_PRODS": "links" };
                        listitems = trim;
                    }
                    else {
                        // listitems.shift();
                        listitems[listitems.length] = { "VIEW_SIMILAR_PRODS": "links" };
                    }
                } 
               
                let pdpDsplId= (this.props.pdpdata && this.props.pdpdata.PC_ITEM_DISPLAY_ID) ? this.props.pdpdata.PC_ITEM_DISPLAY_ID : '';
                let isFilterCreated=false;
                listitems = listitems.map((items, index) => {
                    let productisq = [];
        
                    if(items.ISQ_RESPONSE && items.ISQ_RESPONSE.length)
                    {   
                        let productisqs = items.ISQ_RESPONSE.split('::');

                        for(let i=0;i<productisqs.length;i++)
                    {
                       let splited = productisqs[i]?productisqs[i].split('=='):'';           
                       const objToBePushed = {};
                       objToBePushed['MASTER_DESC'] = splited[0]; 
                       objToBePushed['OPTIONS_DESC'] = splited[1];
                       productisq.push(objToBePushed);
                    }
                    }
                    let TransitionPDP = {
                        displayId : items.DISPLAY_ID,
                        productName : items.PC_ITEM_DISPLAY_NAME,
                        glid : items.GLUSR_ID,
                        productMcatId : items.MCAT_ID,
                        imgUrl : items.IMAGE_125X125,
                        companyName : items.COMPANYNAME,
                        city : items.CITY_NAME,
                        price : items.PRICE,
                        companyContactNo : items.CONTACT_NUMBER,
                        companyContactVal :  'PNS',
                        catFlname : items.GLCAT_MCAT_FLNAME,
                        unit : items.PRD_SEARCH_MOQ_UNIT_TYPE,
                        cityOrigin : items.CITY_NAME,
                        standardPrice : items.PRICE_F?items.PRICE_F.replace(/₹/g, ""):'',
                        prd_isq : productisq,
                        locality : items.SDA_GLUSR_USR_LOCALITY,
                        tsCode : items.ETO_OFR_COMPANY_TSCODE,
                        custTypeWeight : items.CUSTTYPE_WEIGHT,
                        district : items.DIST_NAME,
                        extraPrdName : items.ITEM_NAME,
                        small_desc : items.SMALL_DESC,
                        companySearchUrl : items.URL,
                        ecom_landing_url : items.ECOM_ITEM_LANDING_URL,
                        ecom_store_name : "SHOPIFY"
                    }
                    const data = {
                        GLUSR_USR_ID:items.GLUSR_ID,
                        MOBILE_PNS:items.CONTACT_TYPE?items.CONTACT_TYPE == 'PNS'? items.CONTACT_NUMBER:'':'',
                        MOBILE:items.CONTACT_TYPE?items.CONTACT_TYPE == 'MOBILE'?items.CONTACT_NUMBER:'':'',
                        PHONE:items.CONTACT_TYPE?items.CONTACT_TYPE == 'PHONE'?items.CONTACT_NUMBER:'':'',
                        PC_ITEM_DISPLAY_ID:items.DISPLAY_ID?items.DISPLAY_ID + '':'',
                        PC_ITEM_IMG_SMALL:items.GLCAT_MCAT_IMG1_125X125?items.GLCAT_MCAT_IMG1_125X125:items.GLCAT_MCAT_IMG1_250X250?items.GLCAT_MCAT_IMG1_250X250:'',
                        COMPANYNAME:items.COMPANYNAME?items.COMPANYNAME:'',
                        CITY:items.CITY_NAME?items.CITY_NAME:'',
                        PC_ITEM_DISPLAY_NAME:items.ITEM_NAME?items.ITEM_NAME:'',
                        BRD_MCAT_ID:items.MCAT_ID?items.MCAT_ID:'',
                        GLUSR_USR_STATE:items.STATE_NAME?items.STATE_NAME:'',
                        MOBILE_VERIFIED: 1,
                        isCompany:true
                      }
                    let keys = this.key;
                    let view_more = '';
                    let response_data = '';
                if((pdpDsplId =='' || (pdpDsplId && pdpDsplId != items.DISPLAY_ID))){
                    if (items && items.ITEM_NAME) {
                        let mcatid= items.MCAT_ID;
                        let mcatname = items.ITEM_NAME;
                        const CONTACT_TYPE = items.CONTACT_TYPE;
                        const COMPANYNAME = items.COMPANYNAME;
                        const glUsrId=items.GLUSR_ID;
                        var CONTACT_NUMBER = (items.CONTACT_NUMBER.indexOf("+91") > -1) ? items.CONTACT_NUMBER : pns_prefix(items.CONTACT_NUMBER);
                        mcat_url_link = items.GLCAT_MCAT_FLNAME;
                        let head = "";
                        if (!isFilterCreated  || new_rel_identifier == 1) {
                            isFilterCreated=true;
                            head = items.GLCAT_MCAT_NAME;
                            new_rel_identifier = '';
                        }
                        var COMPANY_LINK = items.COMPANY_LINK
                            ? items.COMPANY_LINK
                            : items.COMPANY_URL;
                        COMPANY_LINK = COMPANY_LINK.replace('http://', 'https://');
                        if(this.props.page && this.props.page.toLowerCase().includes("company")){
                            COMPANY_LINK = items.PLA_TRACKING_URL;
                        }
                        var strLocal = (items.SDA_GLUSR_USR_LOCALITY) ? items.SDA_GLUSR_USR_LOCALITY : '';
                        var locality = strLocal.replace("\n", "");
                        var localityChk = (locality != null && locality != '')
                            ? locality.substr(0, 70) + (items.CITY_NAME&&locality.substr(0, 70)&&items.CITY_NAME===locality.substr(0, 70)?'':', ')
                            : '';
                        let cityName=(items.CITY_NAME&&locality.substr(0, 70)&&items.CITY_NAME===locality.substr(0, 70)?'':items.CITY_NAME);     
                        const Address = localityChk + cityName;
                        let tscode= items.ETO_OFR_COMPANY_TSCODE;

                        host_link = service_link(items.ITEM_NAME, items.DISPLAY_ID);
                       
                        var itemId = (items.DISPLAY_ID) ? items.DISPLAY_ID : items.ITEM_ID;
                        let enqSent= false;
                        this.checkEnquirySentRelated(itemId)? enqSent = true:enqSent = false;
                        var imgurl = isContnr125 && items.IMAGE_250X250 && (checkConnection=='fastNetwork' || this.props.pageType&&this.props.pageType=='PDP') ? items.IMAGE_250X250
                        :(items.IMAGE_125X125)
                            ? items.IMAGE_125X125
                            : (items.image)
                                ? items.image
                                : "https://m.imimg.com/gifs/background_image.jpg";
                        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                        imgurl = imgurl.replace('http://', 'https://');
                        let cityNme = this.state.cityDt.type == "prodCity" ? this.props.city_name : this.state.cityDt.type == "nearme" ? this.state.cityDt.selCity : this.state.userLocCity;
                        
                        var price = items.PRICE ? items.PRICE_SEO ? items.PRICE_SEO : '₹ '  + formatINRPrice(items.PRICE)  + (items.PRD_SEARCH_MOQ_UNIT_TYPE? ' / ' + items.PRD_SEARCH_MOQ_UNIT_TYPE:'') :'';
                        let product_url = items.PDP_URL;
                        if (price) {
                            var PRICEshow = <p className={this.props.relatedInFistFold?'mt10 fs16 fw lineC1 oh' :"pdt5 pdb5 fs16 fw notranslate"}>
                                {this.props.page && this.props.page == "product-detail"? <Link onClick={() => { eventTracking('' + page_name_track + page_name_track_append, eventLabel, `${(this.props.page == "product-detail"  && this.props.pdpdata.PC_ITEM_IS_ECOM)?'BuyNow-Product-Price-':'Product-Price-'}`+ (keys + 1), true) }} className="clr33 notranslate" to={product_url}>{price}</Link>
                                : price }
                            </p>;
                        }else if(this.props.pageType&&this.props.pageType=='PDP'&&this.props.priceOnRequest){
                            
                            enqSent? PRICEshow=<p className="clrBlack mt5 mb5 fs16 fw">Price Requested</p>:
                            PRICEshow=<p className='pdt5 pdb5 fs16 fw clrBl'
                                onClick={(e) => {
                                    if (e.target.innerHTML !== "Price Requested") {
                                        this.callEnqForm(items.MCAT_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, 'Get Latest Price', cat_ID, callProps);       
                                    };
                                    eventTracking('Product-Page-Clicks', 'Related-Products','लेटेस्ट रेट पाएं'+'|EnquiryCTA|PDP|'+this.mode, true)
                                }}>Get Latest Price</p>
                           
                        }

                        

                        
                        if(this.props.page && (this.props.page.includes("Company") || this.props.page.includes("product-detail"))){
                            cityNme = "";
                            if(this.props.selectedCityInFilter && this.props.selectedCityInFilter.cityname != "All India"){
                                cityNme = this.props.selectedCityInFilter.cityname;
                            }
                        }
                        cityNme = cityNme ? cityNme.toLowerCase().replace(/\s+/g, '-') : 'impcat';
                        relink_url = cityNme == 'impcat' ? 'https://' + window.location.host  + '/' +  cityNme + '/' + mcat_url_link + ".html" :  'https://' + window.location.host + '/city/' + cityNme + '/' + mcat_url_link + ".html";
                        let callTracking = 'PDP_Find_Nearby_Seller_Prod_';
                        if(this.props.page && this.props.page.includes("Company")){
                            callTracking = this.props.page + "-Related-Products_";
                        }
                        let callProps = {
                            im_popup: 'im_popup', CONTACT_NUMBER: CONTACT_NUMBER, glusrid: items.GLUSR_ID, CONTACT_TYPE: CONTACT_TYPE, mbgn_askpopup: 'mbgn_askpopup', call_txt: this.props.translatedText ? this.props.translatedText.HEADER_BTN_1 : "कॉल करें", contact_no: 'contact_no', itemId: itemId, mcatid: mcatid, mcatname: mcatname, translatedText: this.props.translatedText, compname: COMPANYNAME, pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '',
                            dbpagetrack: A2HSApp(true) ? call_txt + A2HSApp(true) + '-' + (document.getElementById("page_name") ? document.getElementById("page_name").value : '') + this.cABTest : call_txt + this.cABTest+`${this.props.page.includes("product-detail")?this.props.track:''}`,
                            widgetTrackCatg: '' + page_name_track + page_name_track_append, widgetTrack: eventLabel, widgetTrackPage: 'Call-Now-' + (index + 1), itemName: items.ITEM_NAME, eventLabel: callTracking+(index+1),tscode:items.ETO_OFR_COMPANY_TSCODE?items.ETO_OFR_COMPANY_TSCODE:"", eventAction: CONTACT_TYPE == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS",custtypeWeight:items.CUSTTYPE_WEIGHT?items.CUSTTYPE_WEIGHT:"",query_ref_id: mcatid, query_ref_type:mcatname,modrefid: itemId, modrefname: items.ITEM_NAME,   
                        };
                        
                        let companyUrl = items.PLA_TRACKING_URL? items.PLA_TRACKING_URL : COMPANY_LINK;
                        let glid=getCookieValByKey('ImeshVisitor', 'glid');
                        let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
                        response_data = <div className={relatedInFistFold? 'relInFstFld oh':''}>
                            {head && <div 
                                className={this.props.page == "product-detail" 
                                ? viewSimilar?'dn': relatedInFistFold?'':" pdb5 pl5 " 
                                : (this.props.page && this.props.page.includes("Company")?
                                (!this.props.country_value || this.props.country_value== "" || this.props.country_value == "IN" ? 
                                "btmBorder pdl10 mb10 pdt5 mt10" : "btmBorder pdl10 mb10 pdt5 pdb10 mt10")
                                :"pdl10 mb10 brd5 mt10")}>

                                {viewSimilar||relatedInFistFold? '': this.props.translatedText != undefined ? <div class="fs18">{this.getProdTitle()}
                                
                                { viewSimilar || relatedInFistFold ?'':this.props.pdpdata && this.props.pdpdata.PC_ITEM_IS_ECOM?"":
                                <FilterContainer cityname={this.props.city_name} cityid={this.props.cityId} eventAction={this.props.eventAction}
                                        eventCategory={this.props.eventCategory}
                                        translatedText={this.props.translatedText} pageType={this.props.pageType} country_value={this.props.country_value}
                                        />
                                }
                                
                                    {/* {this.similarProdCityFilter()} */}
                                </div> : <div class="fs18 pdt10">More sellers near you for <Link class="tun col2b" to={relink_url} onClick={() => { 
                                    window.__TransitionData__ =  null;
                                    window.__TransitionData__ =  TransitionPDP;
                                    eventTracking('' + page_name_track + page_name_track_append, eventLabel, 'View-All', true);}}> <span className="fw">{head}</span></Link></div>}                                            

                            </div>}
                           { product_url ? <div className={this.props.page == "product-detail" || (this.props.page && this.props.page.includes("Company")) ||  this.props.page.includes("Error404PDP") ? viewSimilar? "por bgw mb5 crx pd10 w100 bxrd10 bdrCB": this.props.page.includes("Error404PDP")? 'por bgf4 mb5 crx pd10 w100': relatedInFistFold?'por bgw mb5 crx pd5 w100':"por bgw mb5 crx pd10 w100" : "por bgw mb5 crx bxsdw pd10 brd5 mb10"} key={itemId} id={itemId}>
                                <div className={relatedInFistFold?'tc w100 por crb':"tl w100 por crb"}>
                                    <div className={ relatedInFistFold?'ht125px w125p oh dib':viewSimilar?'tc ht125px w125p oh':this.props.page.includes("Error404PDP") ? "fl tc ht125px w125p oh bgw": this.props.calledFrom=="relatedPDP"?"fl tc ht150px w150p oh":"fl tc ht125px w125p oh"}>
                                       
                                    { viewSimilar?
                                        <a onClick={() => {
                                            window.__TransitionData__ =  null;
                                            window.__TransitionData__ =  TransitionPDP;
                                            eventTracking('Product Page Clicks', 'ProductImage-ViewSimilarOverlay', itemId, true)
                                        }}
                                        href={product_url}
                                        className="dtc ht125px w125p vam viewSimlar">
                                            <img className="lazy objctFitSclDown" src={imgurl} alt={mcatname} width="100" height="100" />
                                        </a>
                                        :
                                       (glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                                       onClick={() => {
                                           window.__TransitionData__ =  null;
                                           window.__TransitionData__ =  TransitionPDP;
                                           eventTracking('' + page_name_track + page_name_track_append+`${isEcom==1?"|Ecom_"+Ecom_store_name:''}`, eventLabel,`${(this.props.page == "product-detail"  && this.props.pdpdata.PC_ITEM_IS_ECOM)?'BuyNow-Product-Image-':'Product-Image-'}`+ (keys + 1)+'|'+'Gl_id:'+glUsrId, true)
                                       }}
                                       to={product_url}
                                       className="dtc ht125px w125p vam">
                                       <div style={styles.imageCss().bgimg} className="tc">
                                           {this.props.page && this.props.page.includes("mini-pdp") || relatedInFistFold ? <img className={relatedInFistFold?'objctFitSclDown':"lazy objctFitSclDown"} loading="lazy" src={imgurl} alt={mcatname} width="100" height="100" /> :
                                       <div className={`${imgurl && imgurl.includes(".png")?"":"bgimg"}`}>
                                       {isContnr125 ? <img className="lazy objctFitSclDown mnW125" loading="lazy" src={imgurl} alt={mcatname} width="125" height="125" />
                                       :<img className="lazy objctFitSclDown" loading="lazy" src={imgurl} alt={mcatname} width="100" height="100" />}
                                       </div>}
                                       </div>
                                   </Link> : <a
                                            onClick={(event) => {
                                                window.location.href=(product_url);
                                                window.__TransitionData__ =  null;
                                                window.__TransitionData__ =  TransitionPDP;
                                                setCookie("ImageData",modifyImgSrc(window.__TransitionData__.imgUrl));
                                                eventTracking('' + page_name_track + page_name_track_append+`${isEcom==1?"|Ecom_"+Ecom_store_name:''}`, eventLabel,`${(this.props.page == "product-detail"  && this.props.pdpdata.PC_ITEM_IS_ECOM)?'BuyNow-Product-Image-':'Product-Image-'}`+ (keys + 1)+'|'+'Gl_id:'+glUsrId, true)
                                                event.preventDefault();
                                            }}
                                            href={product_url}
                                            className={this.props.calledFrom=="relatedPDP"?"dtc ht150px w150p vam":"dtc ht125px w125p vam"}>
                                            <div style={styles.imageCss().bgimg} className="tc">
                                                {this.props.page && this.props.page.includes("mini-pdp") || relatedInFistFold ? <img className={relatedInFistFold?'objctFitSclDown':"lazy objctFitSclDown"} loading="lazy" src={imgurl} alt={mcatname} width="100" height="100" /> :
                                            <div className={`${imgurl && imgurl.includes(".png")?"":"bgimg"}`}>
                                            {isContnr125 ? this.props.calledFrom=="relatedPDP"? <img className="lazy2 objctFitSclDown mnW150" loading="lazy" src={imgurl} alt={mcatname} width="150" height="150" /> : <img className="lazy objctFitSclDown mnW125" loading="lazy" src={imgurl} alt={mcatname} width="125" height="125" />
                                            :<img className="lazy objctFitSclDown" loading="lazy" src={imgurl} alt={mcatname} width="100" height="100" />}
                                            </div>}
                                            </div>
                                        </a>
                                 }
                                    </div>

                                    <div className={relatedInFistFold?'dib crx pdt5':viewSimilar ?'crx pdt5':this.props.calledFrom=="relatedPDP"? "pdl155 crx" : "pdl130 crx"}>
                                        <div className={relatedInFistFold?'db mnht70 tl pdl5':viewSimilar? 'db tl pdl5': "db mnht99 tl pdl5"}>
                                            <p className="fs17 por pTitle oh lh18 mr20">
                                                {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                                                    onClick={() => {
                                                        window.__TransitionData__ = null;
                                                        window.__TransitionData__ = TransitionPDP;
                                                        eventTracking('' + page_name_track + page_name_track_append + `${isEcom == 1 ? "|Ecom_" + Ecom_store_name : ''}`, eventLabel, `${(this.props.page == "product-detail" && this.props.pdpdata.PC_ITEM_IS_ECOM) ? 'BuyNow-Product-Name-' : 'Product-Name-'}` + (keys + 1) + '|' + 'Gl_id:' + glUsrId, true)
                                                    }}
                                                    className={viewSimilar ? 'fs15 wr clr33 fadElip maxh60 oh dib lh20' : (this.props.page && this.props.page.includes("Error404PDP")) ? "wr clr33 fw oh dib" : relatedInFistFold ? 'wr pTitle oh lh20 lineC2 mnht40' : "wr pTitle maxh60 oh dib lh20"}
                                                    to={product_url}>{mcatname}</Link> : <a
                                                        onClick={(event) => {
                                                            window.location.href=(product_url);
                                                            window.__TransitionData__ = null;
                                                            window.__TransitionData__ = TransitionPDP;
                                                            setCookie("ImageData",modifyImgSrc(window.__TransitionData__.imgUrl));
                                                            eventTracking('' + page_name_track + page_name_track_append + `${isEcom == 1 ? "|Ecom_" + Ecom_store_name : ''}`, eventLabel, `${(this.props.page == "product-detail" && this.props.pdpdata.PC_ITEM_IS_ECOM) ? 'BuyNow-Product-Name-' : 'Product-Name-'}` + (keys + 1) + '|' + 'Gl_id:' + glUsrId, true)
                                                            event.preventDefault();
                                                        }}
                                                        className={viewSimilar ? 'fs15 wr clr33 fadElip maxh60 oh dib lh20' : (this.props.page && this.props.page.includes("Error404PDP")) ? "wr clr33 fw oh dib" : relatedInFistFold ? 'wr pTitle oh lh20 lineC2 mnht40' : "wr pTitle maxh60 oh dib lh20"}
                                                        href={product_url}>{mcatname}</a>}
                                            </p>
                                            {viewSimilar?'' : PRICEshow}
                                        { viewSimilar|| relatedInFistFold?'':
                                            <p className="por oh fs14 pdb5">
                                                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link
                                                        onClick={() => {
                                                            window.__TransitionData__ = null;
                                                            window.__TransitionData__ = TransitionPDP;
                                                            eventTracking('' + page_name_track + page_name_track_append + `${isEcom == 1 ? "|Ecom_" + Ecom_store_name : ''}`, eventLabel, 'Company-Name-' + (keys + 1) + '|' + 'Gl_id:' + glUsrId, true)
                                                        }}
                                                        to={companyUrl}
                                                        className="clr33 fls14 elipsis dib notranslate">
                                                        {COMPANYNAME}</Link> : <a
                                                            onClick={(event) => {
                                                                window.location.href=(companyUrl);
                                                                window.__TransitionData__ = null;
                                                                window.__TransitionData__ = TransitionPDP;
                                                                eventTracking('' + page_name_track + page_name_track_append + `${isEcom == 1 ? "|Ecom_" + Ecom_store_name : ''}`, eventLabel, 'Company-Name-' + (keys + 1) + '|' + 'Gl_id:' + glUsrId, true)
                                                                event.preventDefault();
                                                            }}
                                                            href={companyUrl}
                                                            className="clr33 fls14 elipsis dib notranslate">
                                                        {COMPANYNAME}</a>}
                                            </p>
                                        }
                                            {relatedInFistFold?'':
                                            <p className="por oh fs14 pdb5">
                                                 <span className="clr5a ellipsis fl">
                                                    <i className={this.props.page && this.props.page.toLowerCase().includes("company")?"comp_img comp_cLocIco mr5 wh13 fl":(this.props.page && this.props.page.toLowerCase().includes("product-detail"))?"fl mml5 locationIcn":"mim_bg cLocIn wh13 fl"}></i>{Address}
                                                </span>
                                            </p>
                                            }
                                        </div>
                                    </div>

                                    <div className="por w100 btm0 tc mt10 df gapc10 ">
                                    {viewSimilar || relatedInFistFold ?'':this.props.pdpdata && showEcom? <Shopify pdpData={{ECOM_CART_URL:items.ECOM_CART_URL,ECOM_ITEM_LANDING_URL:items.ECOM_ITEM_LANDING_URL,ECOM_STORE_NAME:Ecom_store_name,GLUSR_ID:glUsrId,PC_ITEM_DISPLAY_ID:items.DISPLAY_ID,eventLabel:'BuyNow-' + (index + 1)}} ClickedFrom={'Related-Products'} isABtst={this.isABtst} cABTestPDP={this.cABTest} />:
                                        <CallBtn1
                                                key={callProps.CONTACT_NUMBER}
                                                isABtst={this.isABtst}
                                                callText={callProps.call_txt}
                                                eventAction={callProps.eventAction + this.cABTest}
                                                eventLabel={callProps.eventLabel}
                                                pageName={this.props.pageType}
                                                isButtonDisabled={this.props.pageType== 'PDP'||this.props.page.includes("Company")?this.checkEnquirySentRelated(itemId):''}
                                                track={this.props.track}
                                                displayPopup={() => {
                                                    this.callNowClick("कॉल करें",
                                                        imgurl, callProps.tscode, callProps.compname,
                                                        callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                                                        callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack);
                                                    if (this.props.page && this.props.page.includes("-mini-pdp")) {
                                                        eventTracking(this.props.eventCategory, 'Call-Now', 'SimilarProducts|' + (keys + 1) + '|'+itemId, true);
                                                    }
                                                }
                                            }
                                            companyContactNo={'+91-' +callProps.CONTACT_NUMBER}

                                            />
                                       
                                        }
                                    
                                    {this.props.pageType== 'PDP'? 
                                        this.checkEnquirySentRelated(itemId)&&isEcom!==1? 
                                            <span id={"dispid" + itemId} style="background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;" 
                                            className={viewSimilar ?'db pdt10 pdb10 clrw mr10 fs14 ripple bxsdw compBl bxrd4 fw'
                                            : relatedInFistFold?'pdt12 pdb12 db clrw fs14 ripple bxsdw compBl bxrd20 fw'
                                            : ` ${this.isABtst? 'bdrmim bgmim bxrdNL  ':'compBl bxrd20 ' } fr pdt12 pdb12  dn w45 clrw mr10 fs14 ripple bxsdw fw`}>
                                                <i className={`${this.isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr2`}></i>
                                                <span>Enquiry Sent</span>
                                            </span>
                                        :
                                        viewSimilar ? 
                                            <span
                                                id={"dispid" + itemId}
                                                className={`${this.isABtst? 'bdrmim bgmim ' : 'compBl '} db pdt10 pdb12 flGrow1 clrw fs14 bxsdw bxrd4`}
                                                onClick={(e) => {
                                                    if (e.target.innerHTML !== "Enquiry Sent") {
                                                        this.checkEnquirySentRelated(itemId);
                                                        this.callEnqForm(items.MCAT_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, ctaName, cat_ID,callProps);       
                                                    };
                                                    eventTracking('Product Page Clicks', 'GetQuote-ViewSimilarOverlay'+this.cABTest ,itemId+'|EnquiryCTA|PDP|'+this.mode, true)
                                                }}>
                                                <i className={`${this.isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr5`}></i>
                                                {this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}</span>

                                        :this.props.pdpdata && showEcom?"":
                                            this.checkEnquirySentRelated(itemId)?"":
                                            <span
                                            id={"dispid" + itemId}
                                            className={relatedInFistFold? `${this.isABtst? 'bdrmim bgmim ' : 'compBl '} pdt12 pdb12 db clrw fs14 ripple bxsdw bxrd20 ht42`
                                            : `${this.isABtst?  'bdrmim bgmim bxrdNL ' : 'compBl bxrd20 '} ${window.pagename && window.pagename=="PDP" ? ' fs15  ht45 fw w49': 'w45 fs14 bxsdw ht42 mr10'} ripple fr pdt12 pdb12  clrw   `} 
                                            onClick={(e) => {
                                                if (e.target.innerHTML !== "Enquiry Sent") {
                                                    requestAnimationFrame(() => setTimeout(() => {
                                                    this.checkEnquirySentRelated(itemId);
                                                this.callEnqForm(items.MCAT_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, ctaName, cat_ID,callProps);
                                                },0));
                                            };
                                                this.firePDPTracking('' + page_name_track + page_name_track_append, eventLabel, 'Get-Best-Price-' + (keys + 1),this.props.track?this.props.track:"")
                                            }}>
                                                <i className={`${this.isABtst? 'enqIcnGreen ':'enqIcn ' } dib vam mr5`}></i>
                                                {this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}
                                            </span>
                                    
                                    : this.checkEnquirySentRelated(itemId) ? 
                                    (this.props.page.includes("Company")?"":
                                        <span id={"dispid" + itemId} style="background: rgb(109, 109, 109); border: 1px solid rgb(73, 73, 73); font-weight: 600;" className={`${this.isABtst?"bxrdNL ":"bxrd20 "}fr pdt12 pdb12 w45 clrw mr10 fs14 ripple bxsdw compBl fw`}>
                                            <i class={`${this.isABtst?"enqIcnGreen ":"enqIcn "} dib vam mr2`}></i>
                                            <span>Enquiry Sent</span>
                                        </span> )
                                        :
                                        (this.isFullLogin) ? <Link
                                        id={"dispid" + itemId}
                                        className={`${this.isABtst?"bdrmim bgmim bxrdNL ":"ripple compBl bxrd20 "}fr pdt12 pdb12 w49 clrw fs14 bxsdw`}
                                        to={{
                                            pathname: '/messages/conversation/?sup_glid=' + btoa(items.GLUSR_ID.toString()) + '&ref=' + "OneTapCOMPANY", state: {
                                                contactglid: items.GLUSR_ID.toString(),
                                                pdpUrl: location.pathname,
                                                data: data, pageLang: this.props.langSelection, queryRef: this.props.queryRef,
                                                pageName: this.props.pageName, isExtended: this.props.isExtended, cta_name: this.props.cta_name, btnName: this.props.photoGallery?'':this.props.btnName, A2HS: false,
                                                qDesc:""
                                            }
                                        }}
                                        onClick={(e) => {
                                            if (e.target.innerHTML !== "Enquiry Sent") {
                                                this.checkEnquirySentRelated(itemId);
                                            };
                                            if(this.props.page && this.props.page.includes("-mini-pdp")) {
                                                eventTracking(this.props.eventCategory,'Get-Best-Price','SimilarProducts|'+(keys+1)+'|'+itemId,true)
                                            }
                                            else {
                                                eventTracking('' + page_name_track + page_name_track_append, eventLabel + this.cABTest, 'Get-Best-Price-' + (keys + 1)+'|EnquiryCTA|'+this.props.page+'|'+this.mode, true)
                                            }
                                        }}><i class={`${this.isABtst?"enqIcnGreen ":"enqIcn "} vam dib mr5`}></i>{this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}</Link>
                                        : <span
                                        id={"dispid" + itemId}
                                        className={`${this.isABtst?"bdrmim bgmim bxrdNL ":"ripple compBl bxrd20 "}fr pdt12 pdb12 w49 clrw fs14 bxsdw`}
                                        onClick={(e) => {
                                            if (e.target.innerHTML !== "Enquiry Sent") {
                                                requestAnimationFrame(() => setTimeout(() => {
                                                // this.callUntillDefined(items.MCAT_ID, items.DISPLAY_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, ctaName);
                                                this.checkEnquirySentRelated(itemId);
                                                this.callEnqForm(items.MCAT_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl, ctaName, cat_ID,callProps);
                                                },0));
                                                    eventTracking("EnquiryCTA/"+this.mode1,(this.props && this.props.page && this.props.page.toLowerCase().includes("mini-pdp")?"Mini-PDP":this.props.page)+"/"+"Find-Popular/","",true);
                                            };
                                            // setTimeout(() => {
                                            //     this.forceUpdate();       
                                            //     this.checkEnquirySentRelated(itemId);
                                           
                                            // }, 1500);
                                            if(this.props.page && this.props.page.includes("-mini-pdp")) {
                                                eventTracking(this.props.eventCategory,'Get-Best-Price','SimilarProducts|'+(keys+1)+'|'+itemId,true)
                                            }
                                            else {
                                                eventTracking('' + page_name_track + page_name_track_append, eventLabel + this.cABTest, 'Get-Best-Price-' + (keys + 1)+'|EnquiryCTA|'+this.props.page+'|'+this.mode, true)
                                            }
                                        }}><i class={`${this.isABtst?"enqIcnGreen ":"enqIcn "} vam dib mr5`}></i>{this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें"}</span>
                                    }
                                    </div> 
                                </div> 
                            </div> :""}
                                  
                                {this.props.isRecommendedData == 'isRecommendedData' && this.props.page == "product-detail" && listitems.length-1>3 && index == 2 && this.state.Ads && (this.props.pdpdata.GLUSR_USR_ADULT_FLAG === 0) ? 
                                <this.state.Ads pdpdata={this.props.pdpdata} 
                                type={'product detail'} 
                                data={{ name: '/3047175/Msite_PDP_Between_Similar_Products', id: 'div-gpt-ad-1580806668794-0', res: [[320, 100], [300, 100], [320, 150], [320, 250], [300, 150], [300, 250], [336, 280], [400, 300]] }} /> : ""}
                                
                                { viewSimilar || relatedInFistFold?'':
                                (this.props.isMiniPdp && !this.props.adultFlag && ((listitems.length >= 3  && (keys == 2)) || (listitems.length<3 && listitems.length>=1 && (keys+1)==(listitems.length)))) && this.state.Ads?
                                 <this.state.Ads data={{name: "/3047175/Msite_MiniPDP1", id: "div-gpt-ad-1632917475891-0", res: [[300, 100], [300, 150], [336, 280], [300, 200], [300, 250], [320, 100]] }} keys={keys}/> : ''}
                           

                        </div>
                        this.key += 1;
                    } else if (listitems[index - 1] && JSON.stringify(listitems[index - 1]) != JSON.stringify({ "VIEW_SIMILAR_PRODS": "links" })) {
                        this.props.setLoadRecm ? this.props.setLoadRecm() : '';
                        let rghtArw = <span className={(this.props.page && this.props.page == "product-detail") || (this.props.page && this.props.page.includes("Company")) ? "fr" : ""}>&#62;</span>;
                        let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
                        let glid=getCookieValByKey('ImeshVisitor', 'glid');
                        let showViewAllTxt = this.props.page && this.props.page == "product-detail"?  this.props.prodTitle? <span className='dib w90 vat'>View all products in {this.props.prodTitle}</span> : <span className='dib w90 vat'>View All</span> 
                        :(this.props.page && this.props.page.includes("Company")) ? "View All" : "View all similar products";

                        this.key = 0;
                        viewSimilar || ((pdpDsplId && pdpDsplId != items.DISPLAY_ID) && listitems.length<=2) ||relatedInFistFold? view_more = '':
                        view_more = <div> {((SSR && (SSR["userViewCount"] == 5)) || glid=='5414044002' || (localStorage.getItem("truecallerimpression") && (glid==undefined))) ? <Link className={this.props.page === "product-detail" ? "db clr33 pdt15 pdlr15 pdb15 fs16 brdD m10 bxrd20 fw bdrmim mb5 mxht1000" : (this.props.page && this.props.page.includes("Company") ? "db clr33 pdt15 pdlr15 pdb15 fs16 brdD m10 bxrd4 fw bgef mxht1000" : "db clr33 pdlr15 fs16 brdD bxrd4 fw bgCce tc pd15 bxsdw")}     to={relink_url} onClick={() => { if(this.props.page && this.props.page.includes("-mini-pdp")) {eventTracking(this.props.eventCategory,'SimilarProducts','View-All',true);} else {eventTracking('' + page_name_track + page_name_track_append, eventLabel, this.props.page !== "product-detail" ? 'View-All' : "View-All-Mcat", true);}}}> 
                         {showViewAllTxt}{rghtArw}
                        </Link> : <a className={this.props.page === "product-detail" ? "db clr33 pdt15 pdlr15 pdb15 fs16 brdD m10 bxrd20 fw bdrmim mb5 mxht1000" : (this.props.page && this.props.page.includes("Company") ? "db clr33 pdt15 pdlr15 pdb15 fs16 brdD m10 bxrd4 fw bgef mxht1000" : "db clr33 pdlr15 fs16 brdD bxrd4 fw bgCce tc pd15 bxsdw")} href={relink_url} onClick={(event) => { window.location.href=(relink_url) ; if(this.props.page && this.props.page.includes("-mini-pdp")) {eventTracking(this.props.eventCategory,'SimilarProducts','View-All',true);} else {eventTracking('' + page_name_track + page_name_track_append, eventLabel, this.props.page !== "product-detail" ? 'View-All' : "View-All-Mcat", true);} event.preventDefault();}}> 
                         {showViewAllTxt}{rghtArw}
                        </a>}</div>
                        new_rel_identifier = 1;

                        response_data = view_more
                    }
                    else{
                        this.props.setLoadRecm ? this.props.setLoadRecm() : '';
                    }
                }
                    return (
                        <div className={viewSimilar ?'vsSectStart oh':''}>
                            {response_data}
                        </div>
                    )
                })
            }

            let listItemdiv = listitems &&  listitems.length ? 
                <div id="recentMcat" style={listitems ? "display:block" : "display:none"} 
                className={(this.props.page == "product-detail" || (this.props.page && this.props.page.includes("mini-pdp"))  || (this.props.page && this.props.page.includes("Company"))  || this.props.page.includes("Error404PDP")) 
                ? viewSimilar ? 'rlprod bgw oh': this.props.page.includes("Error404PDP")? "rlprod bgw bxrd10 oh  pd5": `${this.props.page == "product-detail" ? " rlprod bgw btmtop pdt5   oh" : "rlprod bgw bxrd10 oh"}`   : "pl10 pr10 pdb10 rlprod"} >
                
                {this.props.viewSimilar=='viewSimilar'? 
                    <>
                    <div className="pdb5 pl5 z1002 por bgw">
                        <span className="poa rt0 closeContainer" onClick={this.props.closeSimilar}><span className="dib closeIcon"></span></span>
                        <p className="db pdt15 pdb5 ml10 mr10 clrb fs18 fw">
                            {this.props.translatedText != undefined?
                            this.props.translatedText.WID_RECOM_HEADING2:'Similar Products'}
                        </p>
                    </div>
                    </>
                :''}
                {relatedInFistFold?<p className='pdt15 pdb10 ml10 mr10 clrb fs15 fw btmBorder'>You may also like!</p>:''}
                <div className={this.props.viewSimilar=='viewSimilar'?'wsnw flowAuto z1002 por bgw pdl10':relatedInFistFold?'dflex oa scrbrH':''}>{listitems}</div>
            </div>:'';
             
            return (
                <div>
                    {listItemdiv}
                </div>
            )

        }
        else{

            ''
        }
    }
}
export default RelatedProducts;