import React from 'react';
import CompanyInformation from '../../NewUtility/CompanyInformation';
// import AboutTheSeller from "../AboutTheSeller/AboutTheSeller";
import ProductImage from "../ProductImage";
import ProductName from '../../NewUtility/ProductName';
import CompanyName from '../../NewUtility/CompanyName';
import { getDisplayName } from './helper';
import getPDPUrl from "./getPDPUrl";
import CallEnquiryCTA from "../CTA/CallEnquiryCTA";
import ProductDescription from '../../NewUtility/ProductDescription';
import ProductPrice from '../../NewUtility/ProductPrice';
import { gaTrack } from '../../../../Globals/GaTracking';
import BreadCrumbs from '../BreadCrumb/BreadCrumbs';
import { getCookie } from '../../../../Globals/CookieManager';
import vernacularData from '../VernacularData';
import { getMobileNum } from '../../utility/CTA/helper';
import ExtendedBL from "../../utility/ExtendedBL/ExtendedBL";
import { callNowActionDispatcher } from '../../../CallNow/actions/callNowActionDispatcher';
export default class ExtendedElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageLang: '', translatedTxt: '', enqCtaDisabled:'' };
        this.checkPageLang = this.checkPageLang.bind(this);
        this.callNowClick = this.callNowClick.bind(this);
        this.checkPageLang(false);
        this.toggleEnqCTADisabled=this.toggleEnqCTADisabled.bind(this);
        this.numData = getMobileNum(props.data);
    }
    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='') {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE: PAID_TYPE };
        callNowActionDispatcher(true, callProps);
       
    }
       getPageLang() {
        let langSelection = getCookie('lang') == "1" ? "LangHi" : "LangEn";
        return langSelection;
    }
    toggleEnqCTADisabled(dispid) {
        let lsData=JSON.parse(localStorage.getItem("imEqGl"));
        if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
            localStorage.removeItem("imEqGl");
            lsData="";
        }
        var cookieData = lsData ? lsData['displayId'] : "undef";


        if (cookieData != "undef"  && (!this.state.enqCtaDisabled || (this.state.enqCtaDisabled != dispid))) {
            var cookieDataArray = cookieData.split(",");
            for (let i = 0; i < cookieDataArray.length; i++) {
                let c = cookieDataArray[i]; 
                let cid=c.replace(/[^0-9\.]+/g, "");
                if (document.getElementById(c)  && (!this.state.enqCtaDisabled || (this.state.enqCtaDisabled != dispid))) {
                    if(cid == dispid) {
                        this.setState({ enqCtaDisabled: cid});
                    }
                    document.getElementById(c).disabled = true;
                }
            }
        }
    }

    checkPageLang(needRender = true) {
        let lngCookie = getCookie('lang') ? getCookie('lang') : "0",
            langSelection = lngCookie == "1" ? "LangHi" : "LangEn";
        if (needRender)
            this.setState({ pageLang: langSelection, translatedTxt: vernacularData.getVernacularData()[Number(lngCookie)] });
        else
            this.state = { pageLang: langSelection, translatedTxt: vernacularData.getVernacularData()[Number(lngCookie)] };
    }

    componentDidUpdate() {
        typeof changeColorEnqAlreadySentBtn == 'function' ? changeColorEnqAlreadySentBtn() : '';

    }

    componentDidMount() {
        if(!this.props.firstPDPLoad) {
            this.props.setFirstPDPLoad();
        }
        let glUsrId = this.props && this.props.data && this.props.data.GLUSR_USR_ID? this.props.data.GLUSR_USR_ID :'';

        this.props.setProdInfo("#pdp" + this.props.data.PC_ITEM_DISPLAY_ID, getPDPUrl(this.props.data.PC_ITEM_NAME, this.props.data.PC_ITEM_DISPLAY_ID), getDisplayName(this.props.data), this.props.data["METATITLE"]);
        gaTrack.trackPageView("/pwa/proddetail-extended" + getPDPUrl(this.props.data.PC_ITEM_NAME, this.props.data.PC_ITEM_DISPLAY_ID, true)+ this.props.cABTestPDP, this.props.data.PC_ITEM_NAME, '','','','','', glUsrId, '');
        // callNowActionDispatcher(false);
        if(!window.clickedOnCallNow)
        {  
            callNowActionDispatcher(false);
        }  
        let isVideoNeeded = (this.props.data.ITEM_DOCS != undefined &&this.props.data.ITEM_DOCS.pc_item_doc_type == "VIDEO" && this.props.data.ITEM_DOCS.pc_item_doc_path)||(this.props.data.GLUSR_PROFILE_MEDIA_URL )?
        true:false;
        if(isVideoNeeded && this.props.loadYoutubePlayer && typeof this.props.loadYoutubePlayer=="function"){
            window.addEventListener(this.props.eventType,this.props.loadYoutubePlayer);
            window.addEventListener("scroll",this.props.loadYoutubePlayer)
        } 
    }
    componentWillReceiveProps() {
        this.checkPageLang();
    }
    productDetailSetupExtended() {
        return (
            <section className="por negativeMargin">
                <div className="db pd10 bgw boxEffect" id="fixProdName">
                    <ProductName data={this.props.data}/>
                    <ProductPrice data={this.props.data} showModal={this.props.showModal} toggleEnqCTADisabled={this.props.toggleEnqCTADisabled} enqCtaDisabled={this.props.enqCtaDisabled}/>
                    <CompanyName data={this.props.data}/>
                    <CallEnquiryCTA  pageLang={this.state.pageLang} data={this.props.data} translatedTxt={this.state.translatedTxt} isExtended={true} isExtendedIndex={this.props.prodCount} queryRef={"productdetail-product-header-overlay-js"} pageName={"PDP"} cta_name={'सर्वोत्तम मूल्य प्राप्त करें'} callNowClick={this.callNowClick} eventLabel={"PDP_Extended_Header"}  enqCtaDisabled={this.state.enqCtaDisabled} toggleEnqCTADisabled={this.toggleEnqCTADisabled} showModal={this.props.showModal} isPdpHeader={true}  btnName={"First_Fold_Extended"}  track={this.props.track}/>
                </div>
            </section>
        )
    }



    render() {
        return (
            <div className='robotoFont'>
               
                <div className="bgw tc mt10 mb10 por pdt10 fs18 pdb10 lnHt0"><p className={`dividNxt ${this.condition ? 'bgef' : 'bgw'} poa cntr`}>{this.state.translatedTxt.PDPEXT_LABEL1}</p><div className="dividLn" /></div>
                <ProductImage  category="Extended-Product-Page-Clicks" action="Call-Now" label={"PDP_Extended_Image_Zoom"} location={this.props.location} translatedTxt={this.state.translatedTxt} pageLang={this.state.pageLang} data={this.props.data} isExtended={true} isExtendedIndex={this.props.prodCount} showModal={this.props.showModal} enqCtaDisabled={this.state.enqCtaDisabled} track={this.props.track} YouTubePlayer={this.props.YouTubePlayer}/>
                <div id={"pdp" + this.props.data.PC_ITEM_DISPLAY_ID}></div>
                {this.productDetailSetupExtended()}
               
                <ProductDescription data={this.props.data} isExtended={true}/>
                
               
                <CompanyInformation data={this.props.data}/>
                <ExtendedBL  data={this.props.data} translatedTxt={this.state.translatedTxt} showModal={this.props.showModal} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP} track={this.props.track} extendedId={this.props.prodCount}/>
                <BreadCrumbs isExtended={true} data={this.props.data} extendedId={this.props.prodCount} />
            </div>)
    }
}