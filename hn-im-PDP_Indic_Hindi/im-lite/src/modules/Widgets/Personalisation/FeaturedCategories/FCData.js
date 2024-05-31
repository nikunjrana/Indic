import React, { Component } from "react";
import { FCDefaultView } from "./FCDefaultView";
import { impressionTrack } from '../../../../Globals/impressionTrack';
import "../css/relatedWidgetsCss.css";
// import EnquiryFlow from '../../../EnquiryBlForms/components/EnqBlMain';
import { removalTextNodes } from "../../../../Globals/translatorPreact/translatorPatch";
class FCData extends Component {
    constructor(props) {
        super(props);
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.filterLSData = this.filterLSData.bind(this);
        this.filterServiceData = this.filterServiceData.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.imgData = this.imgData.bind(this);
        this.callBl = this.callBl.bind(this);
        this.showModal=this.showModal.bind(this);
        this.state={showEnqPopup:false,view:'' }
        this.prop={};
        this.impressionTracker = '';
        this.finalDataList =[];
    }
    componentDidUpdate(){
        removalTextNodes();
    }
    componentDidMount() {
        // window.addEventListener("touchstart",this.loadEnquiryContainer);
        if(this.finalDataList&&this.finalDataList.length>0){
            let length;
            if(this.finalDataList.length>10){
                 length=10;
            }else
            length=this.finalDataList.length;
            this.impressionTracker = impressionTrack("relatedMcats",(this.props.isfallback?"w3_recently_viewed_mcat_fb":'w3_recently_viewed_mcat'), (this.props.trck_param ? this.props.trck_param : "") + "display_impression", "IMOB_" + this.props.page+" | "+length,'',true);
        }else
        this.impressionTracker = impressionTrack("relatedMcats", "w3_recently_viewed_mcat", (this.props.trck_param ? this.props.trck_param : "") + "display_impression", "IMOB_" + this.props.page,'',true);
    }
    componentWillMount(){
        if(this.props.page && this.props.page=="product-detail" || this.props.page=="StandardProd") {
            window.addEventListener('touchstart', this.loadEnquiryContainer, { passive: true });
            window.addEventListener('scroll', this.loadEnquiryContainer, { passive: false });
        } else {
        this.loadEnquiryContainer();
    }
    }

    componentWillUnmount(){
        // window.removeEventListener("touchstart",this.loadEnquiryContainer);
        if(this.impressionTracker)
            window.removeEventListener("scroll", this.impressionTracker);
    }
    loadEnquiryContainer(){
        // if(!this.state.view){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../../EnquiryBlForms/components/EnqBlMain').then((module) => {
        //     this.setState({ view: module.default });
        //     // window.removeEventListener("touchstart",this.loadEnquiryContainer);
        // })
        // }
              
    }
    getCurrentDate() {
        let d = new Date();
        let DT = "" + d.getFullYear() + (((d.getMonth() + 1).toString().length < 2) ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1).toString()) + ((d.getDate().toString().length < 2) ? '0' + d.getDate().toString() : d.getDate().toString()) + ((d.getHours().toString().length < 2) ? '0' + d.getHours().toString() : d.getHours().toString()) + ((d.getMinutes().toString().length < 2) ? '0' + d.getMinutes().toString() : d.getMinutes().toString()) + ((d.getSeconds().toString().length < 2) ? '0' + d.getSeconds().toString() : d.getSeconds().toString());
        return DT;
    }
    imgData(img) {
        let imgurl = (img) ? img : "https://m.imimg.com/gifs/background_image.jpg";
        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
        imgurl = imgurl.replace('http://', 'https://');
        return imgurl;
    }
    filterLSData(res) {
        let lsData = res.map((items) => {
            let img250=items.image250?items.image250:items.image;
            items.image = this.imgData(items.image);
            items.image250=this.imgData(img250);
            return items;
        })
        return lsData;
    }
    filterServiceData(data) {
        let currentDT = this.getCurrentDate();
        let serviceData = data.map((items) => {
            let imgurl =(items.GLCAT_MCAT_IMG1_125X125) ? items.GLCAT_MCAT_IMG1_125X125 : (items.GLCAT_MCAT_IMG1_250X250) ? items.GLCAT_MCAT_IMG1_250X250 : "https://m.imimg.com/gifs/background_image.jpg";
            let imgurl250 = (items.GLCAT_MCAT_IMG1_250X250) ? items.GLCAT_MCAT_IMG1_250X250 : (items.GLCAT_MCAT_IMG1_125X125) ? items.GLCAT_MCAT_IMG1_125X125 : "https://m.imimg.com/gifs/background_image.jpg";
            let res = {};
            res.DT = currentDT;
            res.fl_name = items.GLCAT_MCAT_FLNAME;
            res.image = this.imgData(imgurl);
            res.image250 = this.imgData(imgurl250);res.mcatid = items.GLCAT_MCAT_ID + "";
            res.name = items.GLCAT_MCAT_NAME;
            res.city = items.GL_CITY_NAME;
            return res;
        })
        return serviceData;
    }
    callBl(name, mcatid, product_image) {
        var obj = {};
        obj.productName = name;
        obj.widgetType="Featured-Categories";
        obj.mcatId= mcatid;
        obj.R_custtype_weight = "";
        obj.affiliationId= this.props.affiliation_id;
        obj.query = '';
        obj.modid = 'IMOB';
        obj.enqconv = 'on';
        obj.int_rec = '1';
        obj.isEnquiry=false;
        obj.ctaName = 'कोटेशन प्राप्त करें';
        obj.productImage = product_image?product_image:'https://m.imimg.com/gifs/img/prod-img.png';
        obj.queryText= this.props.queryText+`${this.props.srchAbTest?this.props.srchAbTest:''}`;
        obj.page = this.props.page;
        obj.internaltrack=this.props.track;
        this.showModal(obj);

     
    }
    showModal(prop){
        this.prop=prop;
        this.setState({showEnqPopup:!this.state.showEnqPopup});
    }
    render() {
        let lsData = [];
        let lsCount = 0;
        // let finalDataList = [];
        if (localStorage.getItem("recentMcats")) {
            lsData = localStorage.getItem("recentMcats");
            if (lsData.length > 0) {
                let count = 0;
                lsData = JSON.parse(lsData);
                let LsData = []
                let x = lsData
                x = x.map((items)=>{
                    if((items.mcat_live && items.mcat_live == "1") || (!items.mcat_live)){
                        LsData.push(items)
                    }
                })  
                lsData = LsData
                let localDatafiltered = lsData.filter(function (item) {
                    return item.fl_name != "";
                });
                count = localDatafiltered.length;
                lsCount = (count < this.props.count) ? count : this.props.count;
                lsData = this.filterLSData(localDatafiltered.slice(0, lsCount));
            }
        }
        let serviceData = [];
        if (this.props.recommendedMcat && this.props.recommendedMcat.length > 0 && lsCount < this.props.count) {
            let serviceDatafiltered = this.props.recommendedMcat.filter(function (item) {
                 return lsData.map(ls => ls.mcatid).indexOf(item.GLCAT_MCAT_ID + "") == -1 
            });
            // let serviceCount = serviceDatafiltered.length - lsCount;
            let serviceCount = ((serviceDatafiltered.length<10)?(((10-lsCount)<=serviceDatafiltered.length)?(10-lsCount):serviceDatafiltered.length):serviceDatafiltered.length-lsCount);
            serviceData = this.filterServiceData(serviceDatafiltered.slice(0, serviceCount));
        }
        this.finalDataList =this.props.isfallback?[...serviceData]:[...lsData, ...serviceData];       
        if (this.finalDataList.length) {
            return( 
            <div>
            {this.state.showEnqPopup && this.state.view!=''?<this.state.view closePopup={this.showModal} prop={this.prop}/>:''}
            <FCDefaultView data={this.finalDataList} trck_param={this.props.trck_param ? this.props.trck_param : ''} page={this.props.page} lang={this.props.lang} callBl={this.callBl} enqLabel={this.props.translatedText != undefined ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"} appendProdPosition={this.props.appendProdPosition?this.props.appendProdPosition:''} applikectahome={this.props.applikectahome} isfallback={this.props.isfallback} srchAbTest={this.props.srchAbTest}/>
            </div>
            )
        }
    }

}
export default FCData;
