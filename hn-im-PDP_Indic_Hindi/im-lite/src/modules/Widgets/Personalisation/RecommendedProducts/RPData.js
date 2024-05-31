import React, { Component } from "react";
import { service_link } from '../../../../Globals/MainFunctions';
import { eventTracking, A2HSApp,prevname} from '../../../../Globals/GaTracking';
import { impressionTrack } from '../../../../Globals/impressionTrack';
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
import "../css/relatedWidgetsCss.css";
import {getCookie } from "../../../../Globals/CookieManager";
import { removalTextNodes } from "../../../../Globals/translatorPreact/translatorPatch";
import {checkUserStatus} from '../../../../Globals/MainFunctions';

class RPData extends Component {
    constructor(props) {
        super(props);
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.filterLSData = this.filterLSData.bind(this);
        this.filterLsMcatData = this.filterLsMcatData.bind(this);
        this.filterServiceData = this.filterServiceData.bind(this);
        this.imgData = this.imgData.bind(this);

        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal=this.showModal.bind(this);
        this.callEnq=this.callEnq.bind(this);
        //this.showEnqForm = this.showEnqForm.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.connectionChecking = this.connectionChecking.bind(this);
        this.ls = localStorage;
        this.state = {view:'',showEnqPopup:false, enqView:''}
        this.prop={};
        this.impressionTracker = '';
        this.finalDataList=[];
        this.finalDataListAdv=[];
        this.lastSeenMcat='';
        this.CAPsDataList=[];
        this.lsMcatData=[];
        let ga=getCookie("_ga")?getCookie('_ga'):'';
        this.gaLastDigit= ga[ga.length-1]?ga[ga.length-1]:'';
        this.evLabel='';

       
    }
    componentWillMount() {
        if (this.props.view && this.props.view.includes("Mcat") || (this.props.page && this.props.page=="product-detail" || this.props.page=="StandardProd") || (this.props.page&&this.props.page=="Home")) {
            
            window.addEventListener('click', this.loadEnquiryContainer, { passive: true });
            window.addEventListener('touchstart', this.loadEnquiryContainer, { passive: true });
            window.addEventListener('scroll', this.loadEnquiryContainer, { passive: true });
        }
        else
        {
            this.loadEnquiryContainer();
        }

        if (!this.state.view && this.props.view) {
            import(/*webpackChunkName:"RecommendedProducts"*/'./Views/' + this.props.view).then((module) => {
                this.setState({ view: module.default })
            })
        }
        this.evLabel = this.props.page=="Home"&&(this.gaLastDigit%10==0)?"|gridview":this.props.page=="Home"&&(this.gaLastDigit%10==1)?"|125image_resize":'';
        
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
    componentDidUpdate(){
        removalTextNodes();
    }
    componentDidMount() {
        // window.addEventListener("touchstart",this.loadEnquiryContainer);
     if(this.props.view && !this.props.view.includes("RPAdvanceView")){
        if(this.finalDataList&&this.finalDataList.length>0){
            let length;
            if(this.finalDataList.length>10){
                 length=10;
            }else
            length=this.finalDataList.length;
            this.impressionTracker =  impressionTrack("prodsViewedSection",(this.gaLastDigit%2==0)?"w3_recently_viewed_even":"w3_recently_viewed_odd", (this.props.trck_param ? this.props.trck_param : "") + "display_impression", "IMOB_" + this.props.page+" | "+length+this.evLabel,'',true);
        }else
       this.impressionTracker =  impressionTrack("prodsViewedSection", (this.gaLastDigit%2==0)?"w3_recently_viewed_even":"w3_recently_viewed_odd", (this.props.trck_param ? this.props.trck_param : "") + "display_impression", "IMOB_" + this.props.page+this.evLabel,'',true);
    }
    }
    componentWillUnmount(){
        // window.removeEventListener("touchstart",this.loadEnquiryContainer);
        if(this.impressionTracker)
        window.removeEventListener("scroll", this.impressionTracker);
    }
    loadEnquiryContainer() {
        window.removeEventListener('touchstart', this.loadEnquiryContainer);
        window.removeEventListener('scroll', this.loadEnquiryContainer);
        window.removeEventListener('click', this.loadEnquiryContainer);
        if (!this.state.enqView) {
            // import(/* webpackChunkName:"EnqBlPWA" */'../../../EnquiryBlForms/components/EnqBlMain').then((module) => {
            //     this.setState({ enqView: module.default });
            //     // window.removeEventListener("touchstart",this.loadEnquiryContainer);
            // })
        }
    }

    getCurrentDate() {
        let d = new Date();
        let DT = "" + d.getFullYear() + (((d.getMonth() + 1).toString().length < 2) ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString()) + ((d.getDate().toString().length < 2) ? '0' + d.getDate().toString() : d.getDate().toString()) + ((d.getHours().toString().length < 2) ? '0' + d.getHours().toString() : d.getHours().toString()) + ((d.getMinutes().toString().length < 2) ? '0' + d.getMinutes().toString() : d.getMinutes().toString()) + ((d.getSeconds().toString().length < 2) ? '0' + d.getSeconds().toString() : d.getSeconds().toString());
        return DT;
    }

    filterLSData(res) {
        let filterData = res.filter((items) => {
            if (!this.props.companyUrl || (this.props.companyUrl && items.website_url && !items.website_url.includes(this.props.companyUrl))) {
                return items;
            }
          })
        return filterData.map((items) => {
            items.image = this.imgData(items.image);
            items.image_250x250 = this.imgData(items.image_250x250);
            return items;
        })
    }
    imgData(img) {
        let imgurl = (img) ? img : "https://m.imimg.com/gifs/background_image.jpg";
        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
        imgurl = imgurl.replace('http://', 'https://');
        return imgurl;
    }
    filterLsMcatData(data,finalData) {
        let filterData = data.filter((items) => {
            if (items.name && finalData.filter(prod => items.mcatid==prod.mcatid).length > 0) {
                return items;
            }
        })
        return filterData

    }
    filterServiceData(data , CapsFlag=0) {
        let filterData = data.filter((items) => {
            if (items.IIL_DISPLAY_FLAG == "1" && (!this.props.companyUrl || (this.props.companyUrl && items.COMPANY_LINK && !items.COMPANY_LINK.includes(this.props.companyUrl)))) {
                return items;
            }
          })
          return filterData.map((items) => {
            if (items.IIL_DISPLAY_FLAG == "1") {
                let currentDT = this.getCurrentDate();
                let res = {};
                res.city_name=items.CITY_NAME?items.CITY_NAME:"";
                res.DT = currentDT;
                res.R_glusr_id = items.GLUSR_ID?items.GLUSR_ID + "":"";
                res.company_name = items.COMPANYNAME ?items.COMPANYNAME:"";
                res.mobile_number=CapsFlag?(items.CONTACT_NUMBER ? items.CONTACT_NUMBER :items.MOBILE?items.MOBILE:''):"";
                res.contactnumber = items.CONTACT_NUMBER ? items.CONTACT_NUMBER :'';
                res.contactnumber_type = items.CONTACT_TYPE?items.CONTACT_TYPE:CapsFlag?(items.CONTACT_NUMBER?"PNS":"M"):"";
                res.currency = items.CURRENCY?items.CURRENCY:"";
                res.d_flag = items.IIL_DISPLAY_FLAG;
                res.display_id = items.DISPLAY_ID + "";
                res.mcatName = items.GLCAT_MCAT_NAME?items.GLCAT_MCAT_NAME:"";
                res.filter_contact_no = items.CONTACT_NUMBER ? items.CONTACT_NUMBER : '';
                let imgurl = (items.IMAGE_125X125) ? items.IMAGE_125X125 : (items.IMAGE_250X250) ? items.IMAGE_250X250 : "https://m.imimg.com/gifs/background_image.jpg";
                res.image = this.imgData(imgurl);
                res.mcatid = items.MCAT_ID?items.MCAT_ID:"";
                res.name = items.ITEM_NAME?items.ITEM_NAME:"";
                res.price = items.PRICE?items.PRICE:"";
                res.price_seo =items.PRICE_SEO ?items.PRICE_SEO :'';
                res.unit = items.PRD_SEARCH_MOQ_UNIT_TYPE_NEW?items.PRD_SEARCH_MOQ_UNIT_TYPE_NEW:"";
                res.tsCode = items.ETO_OFR_COMPANY_TSCODE?items.ETO_OFR_COMPANY_TSCODE:"";
                res.custtypeWeight = items.CUSTTYPE_WEIGHT?items.CUSTTYPE_WEIGHT:"";
                let img250 = CapsFlag?(items.IMAGE_250X250?items.IMAGE_250X250:items.IMAGE_500X500?items.IMAGE_500X500:items.IMAGE_125X125):(items.IMAGE_250X250?items.IMAGE_250X250:items.IMAGE_500X500?items.IMAGE_500X500:IMAGE_LARGE?items.IMAGE_LARGE:items.GLCAT_MCAT_IMG1_250X250);
                res.image_250x250=this.imgData(img250);
                if (this.props.view && items.PDP_URL && (this.props.view.includes("Mcat") || (this.props.page && this.props.page =="Search"))) {
                    res.url = items.PDP_URL;
                }
                else
                    res.url = service_link(items.ITEM_NAME, items.DISPLAY_ID);
                res.price_f=items.PRICE_F?items.PRICE_F:"";
                let comp_url = items.COMPANY_URL;
                let COMPANY_LINK = items.COMPANY_LINK
                ? items.COMPANY_LINK
                : items.COMPANY_URL;
            COMPANY_LINK = COMPANY_LINK.replace('http://', 'https://');
            
                if (!COMPANY_LINK.includes('indiamart.com')) {
                   
                    COMPANY_LINK = "/company/" + res.R_glusr_id + "/"
                 
                }
                res.website_url = COMPANY_LINK;
                if(this.props.page && this.props.page.toLowerCase().includes('company')){
                    res.website_url = items.PLA_TRACKING_URL;
                }
                res.ecom_flag = items.FK_ECOM_STORE_MASTER_ID?items.FK_ECOM_STORE_MASTER_ID:'';
                res.ecom_landing_url = items.ECOM_ITEM_LANDING_URL?items.ECOM_ITEM_LANDING_URL:'';
                return res;
            }
        })
    }       

    callEnq(mcatid, eDISPLAY_ID, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, Source , IMG_URL, tsCode='', number='', type='', itemName='', mcatName='', dbpagetrack='',custtypeWeight=''){
        let data={}
        let callTxt='कॉल करें'
        data.isEnquiry=true;
        data.mcatId=mcatid;
        data.productImage=IMG_URL?IMG_URL:'https://m.imimg.com/gifs/img/prod-img.png';
        data.query='';
        data.ctaName='Send Enquiry';
        data.companyName=COMPANYNAME;
        data.displayId= eDISPLAY_ID + '';
        data.queryText=this.props.page=="Home"?this.props.queryText+this.evLabel:this.props.queryText+`${this.props.page=="product-detail"?this.props.track:""}`;
        data.receiverUserId= GLUSR_ID;
        data.page=this.props.page?this.props.page:'';
        data.productName=ITEM_NAME;
        data.modid='IMOB';
        data.EnqBlForm=this.state.showEnqPopup;
        data.callTxt=callTxt;
        data.image=IMG_URL,
        data.companyName=COMPANYNAME,
        data.contactNumber=number,
        data.contactType= type,
        data.glusrID=GLUSR_ID,
        data.dbpagetrack=A2HSApp(true) ? dbpagetrack + A2HSApp(true)+'-'+(document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbpagetrack;
        data.tsCode=tsCode,
        data.query_ref_id=mcatid,
        data.query_ref_type=mcatName;
        data.modrefid=eDISPLAY_ID,
        data.modrefname=itemName,   
        data.eventLabel= `${this.props.page}-RecommendedProducts`, 
        data.custtypeWeight=custtypeWeight,
        data.internaltrack=this.props.track
        data.widgetType="Recommended-Products"
        this.showModal(data);
     
    }
    showModal(prop){
        this.prop=prop;
        this.setState({showEnqPopup:!this.state.showEnqPopup});
    }





    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack,custtypeWeight,pos,city,showRatingFeedback="",setRatingInfo="") {
        dbpagetrack= A2HSApp(true) ? dbpagetrack + A2HSApp(true)+'-'+(document.getElementById("page_name") ? document.getElementById("page_name").value : '') : dbpagetrack+`${this.props.page=="product-detail"?this.props.track:""}`;
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack+`${this.props.srchAbTest?this.props.srchAbTest:''}`, eventLabel: 'RecommendedProducts', custtypeWeight:custtypeWeight,city:city };
        window.pageName&&window.pageName=='home'?eventTracking(`${(this.gaLastDigit%2==0)?'w3_recently_viewed_even|Home-Page-Clicks-PWA':'w3_recently_viewed_odd|Home-Page-Clicks-PWA'}`,(this.props.trck_param ? this.props.trck_param : "") + 'cta_button_callnow|आपके लिए प्रोडक्ट्स'+(this.props.gaLastDigit?this.props.ABTEST:'')
        ,"IMOB_" + this.props.page+this.evLabel+"|click-to-call-"+pos+'|'+prevname(),true): eventTracking((this.gaLastDigit%2==0)?"w3_recently_viewed_even":"w3_recently_viewed_odd",(this.props.trck_param ? this.props.trck_param : "") +`cta_button_callnow${this.gaLastDigit?this.props.ABTEST:''}${this.props.unidentified ? this.props.glLastDigit%2==0?"|Even":"|Odd" :''}` ,"IMOB_" + this.props.page+this.evLabel+`${this.props.srchAbTest?this.props.srchAbTest:''}`,true);
        if(showRatingFeedback&&setRatingInfo&&typeof setRatingInfo === "function" && typeof showRatingFeedback === "function" && checkUserStatus() == 2) {
            showRatingFeedback(glusrID);
            setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name);
        }
        callNowActionDispatcher(true, callProps);
    }
   

    render() {
        
        let lsData = [], serviceData = [];
        let lsLength = 0,lsmcatlen=0 ,recom_displayid=0;
        let initialIndex = this.props.excludeFirstItem ? this.props.excludeFirstItem : 0;
        

        if (this.ls.prodsViewed) {
            lsData = JSON.parse(this.ls.prodsViewed);
            lsLength = lsData.length;
            recom_displayid = lsData && lsData[0]? lsData[0].display_id:'';
            this.lastSeenMcat=(JSON.parse(this.ls.prodsViewed) && (JSON.parse(this.ls.prodsViewed))[0] && (JSON.parse(this.ls.prodsViewed))[0].mcatid ? JSON.parse(this.ls.prodsViewed)[0].mcatid:'')
            if (lsLength > 0) {              
                let lsCount = lsLength < this.props.count ? lsLength : this.props.count;
                lsData = this.filterLSData(lsData.slice(initialIndex, lsCount));
            }
        }
        
        if (this.props.recommendedData && this.props.recommendedData.length > 0) {
              serviceData = this.filterServiceData(this.props.recommendedData);
        }
        this.finalDataList = [...lsData, ...serviceData];
       
        if(this.props.CAPsData && this.props.CAPsData.length>0){
            this.CAPsDataList=this.filterServiceData(this.props.CAPsData,true,1);
        }else{
            this.CAPsDataList=serviceData;
        }
        this.CAPsDataList=this.CAPsDataList.filter(item => item.display_id!=recom_displayid && item.contactnumber!='')
        
        function uniqDispId(data,key){
            return [
                ...new Map(
                    data.map(x => [key(x), x])
               ).values() 
            ]
        }
        
        this.finalDataList=uniqDispId(this.finalDataList,it=>it.display_id);  
        if(this.props.page && !(this.props.page.toLowerCase().includes("product-detail") || this.props.page.toLowerCase().includes("pdp") || this.props.page.toLowerCase().includes("search") || this.props.page.toLowerCase() == "home")){
            initialIndex?this.finalDataList=this.finalDataList.slice(0,this.props.count-1): this.finalDataList=this.finalDataList.slice(0,this.props.count);
        }
        if(this.ls.recentMcats){
            this.lsmcatData = JSON.parse(this.ls.recentMcats);
            lsmcatlen = this.lsmcatData.length;
                if (lsmcatlen > 0) {              
                    this.lsmcatData = this.filterLsMcatData(this.lsmcatData.slice(0, 4),this.finalDataList);
                }
           }
          
        if(this.props.page && (this.props.page.toLowerCase().includes("product-detail") || this.props.page.toLowerCase().includes("pdp"))){
            this.finalDataListAdv = this.CAPsDataList.slice(0, 10 ); ;
            localStorage.setItem('RecomProd', JSON.stringify(this.finalDataListAdv));
          }

        if (this.finalDataList.length ||(this.props.page && (this.props.page.toLowerCase().includes("product-detail") || this.props.page.toLowerCase().includes("pdp")) && this.finalDataList.length>0)) {
            return(
                <>
                  {this.state.showEnqPopup && this.state.enqView!=''?<this.state.enqView closePopup={this.showModal} prop={this.prop}/>:''}
                {this.state.view ? 
                <this.state.view 
                callEnq={this.callEnq} 
                translatedText={this.props.translatedText} 
                data={this.finalDataList}
                dataCaps={this.CAPsDataList}
                mcatData={this.lsmcatData}
                lslength={lsLength}
                enqLabel={this.props.enqLabel} 
                trck_param={this.props.trck_param ? this.props.trck_param : ""} 
                page={this.props.page} 
                head={this.props.head} 
                callTxt={this.props.page=="Home"?this.props.callTxt+this.evLabel:this.props.callTxt} 
                callNowClick={this.callNowClick} 
                setRatingInfo={this.props.setRatingInfo}
                showRatingFeedback={this.props.showRatingFeedback}
                len={this.finalDataList.length}
                lenCaps={this.CAPsDataList.length}
                appLikeCta={this.props.appLikeCta}
                gaLastDigit = {this.props.gaLastDigit}
                gaLastDigit1 = {this.gaLastDigit}
                ABTEST = {this.props.ABTEST}
                isABtst={this.props.isABtst}
                cABTest = {this.props.cABTest}
                thankYouEnq = {this.props.thankYouEnq}
                isContnr125={this.props.isContnr125? this.props.isContnr125:''}
                connectionType={this.props.connectionType? this.props.connectionType:''}
                glLastDigit={this.props.glLastDigit}
                unidentified={this.props.unidentified}
                srchAbTest={this.props.srchAbTest}
                /> : ""}
                </>
            )
        }
    }

}
export default RPData;