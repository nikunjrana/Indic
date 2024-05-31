import React, { Component } from 'react';
import InlineOneTap from './inlineOneTap';
import { getCookie,getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking, A2HSApp } from '../../../Globals/GaTracking';
import { getMobileNum } from '../../ProductDetail/utility/CTA/helper';
import {callNowActionDispatcher} from '../../CallNow/actions/callNowActionDispatcher';
import {CallBtn2} from '../../CallNow/views/CallBtn2';
import { checkUserStatus} from '../../../Globals/MainFunctions';
import "../css/inlineEnq.css";
import {validationCheck, handleQntChange, handleChange} from '../utilityInlineEnq/helper'

var cookieChangeFn = '';
class InlineEnquiry extends Component {

    constructor(props) {
        super(props);
        this.callUntillDefined = this.callUntillDefined.bind(this);
        this.checkCookie = this.checkCookie.bind(this);
        this.callEnqForm = this.callEnqForm.bind(this);
        this.gaCookie = getCookie("_ga");
        this.callNowClick=this.callNowClick.bind(this);
        this.getIsqforPDP = this.getIsqforPDP.bind(this);
        this.checkDNCUser = this.checkDNCUser.bind(this);
        this.optionList = [];
        this.DNCuser = this.checkDNCUser();
        let GaLastDigit=this.gaCookie&&this.gaCookie.length>1?this.gaCookie[this.gaCookie.length-1]:'';
        this.contactSeller=false;
    }
      checkDNCUser = () => {
        let userName = getCookie('ImeshVisitor') && getCookieValByKey('ImeshVisitor', 'fn') != "";
        let userCity = getCookie('ImeshVisitor') && getCookieValByKey('ImeshVisitor', 'ctid') != "";
        let userVerified = getCookie('ImeshVisitor') && getCookieValByKey('ImeshVisitor', 'uv') == "V";
        let userEmail = getCookie('ImeshVisitor') && getCookieValByKey('ImeshVisitor', 'em') != "";
        let DNCUserIndian = userName && userCity && userVerified;
        let DNCUserForeign = userName && userEmail;
        return DNCUserIndian || DNCUserForeign ? true : false;
    }
  

    callUntillDefined(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemName, dsplayId, ctaName, GetPdpImg) {

        var langSelection = getCookie("lang") == "1"
            ? "LangHi"
            : "LangEn";
        var enqDivId =  pcItemDsplId;
        let IS_PROD_SERV = this.props.isProdServ;
        let R_custtype_weight = this.props.GLUSR_USR_CUSTTYPE_WEIGHT;
        let catId = this.props.CAT_ID
            ? this.props.CAT_ID
            : '';

        let modreftype = 2;
        let query = "did=" + dsplayId + "&ctg=" + catId + "&ss=&locality=&modreftype=" + modreftype;
        let query_text = '';
        if (this.props.pageType == "fullPDP") {
            query_text = 'productdetail-product-inline-enquiry-form-js|' + IS_PROD_SERV + '|' + langSelection;
        } 
        else if(this.props.pageType == "miniPDP") {
            query_text = 'Mini-PDP-'+this.props.pageName1+'-InlineInquirySent|'+langSelection+this.props.isProdServ;
        }
        else {
            query_text = 'product_detail_inline_enquiry_PWA|' + IS_PROD_SERV + '|' + langSelection;
        }


        callUntillDefined('showEnquiryForm', 0, 50, [
            {
                'enq_mcat_id': mcatid,
                'enquiryDivId': enqDivId,
                'enq_item_price': itemPrice,
                'query': query,
                'query_text': query_text,
                'company': cmpName,
                'formType': 'overlay',
                'R_glusr_id': glUserId,
                'R_custtype_weight': R_custtype_weight,
                'R_title': PcItemName,
                'enqConv': 'on',
                'int_rec': '1',
                'modid': 'IMOB',
                'displayId': dsplayId,
                'CefProdType': IS_PROD_SERV,
                'product_name': PcItemName,
                'enq_sent_color': disableEnqBtn,
                'ctaName': ctaName,
                'product_image': GetPdpImg
            }
        ]);

    }

    callEnqForm(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemName, dsplayId, ctaName, GetPdpImg, pdpModrefType, cityNamePDP, localityPDP,PrdPricePDP,callProps,cABTestPDP='',getIsqVariant2='',getIsqVariantElsCase='') {
        var langSelection = getCookie("lang") == "1"? "LangHi": "LangEn";
        var enqDivId =  pcItemDsplId;
        let IS_PROD_SERV = this.props.isProdServ;
        let R_custtype_weight = this.props.GLUSR_USR_CUSTTYPE_WEIGHT;
        let gaid=this.gaCookie && parseInt(this.gaCookie[this.gaCookie.length-1])%2==0?true:false;
        let catId = this.props.CAT_ID
            ? this.props.CAT_ID
            : '';
        // let modreftype = 2;
        let pdpModref_Type = pdpModrefType?pdpModrefType:'';
        let query = "did=" + dsplayId + "&ctg=" + catId + "&ss=&locality=&modreftype=" + pdpModref_Type;

        let query_text = '';
        if (this.props.pageType == "fullPDP") {
            let getIsqVrntTrck = getIsqVariant2?'-variant-2':'';
            query_text = 'productdetail-product-inline-enquiry-form-js'+`${this.contactSeller?"|Contact-The-Seller-Clicked":""}`+getIsqVrntTrck+'|' + IS_PROD_SERV + '|' + langSelection+this.props.track;
        }
        else if(this.props.pageType == "miniPDP") {
            query_text = `Mini-PDP-`+this.props.pageName1+'-InlineInquiry|'+langSelection;
        }
        else {query_text = 'product_detail_inline_enquiry_PWA|' + IS_PROD_SERV + '|' + langSelection;}

        let isShowRevampEnq = false, isNameCity=false;
        // if(this.props){if(this.props.pageType && this.props.pageType=='fullPDP'){
        //     this.gaCookie && gaid==true ?isShowRevampEnq=true:isShowRevampEnq=false; isNameCity=false}}
        query_text+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"")
        query_text+= cABTestPDP;
        
        //For Get Isq Handling
        let passIsqVal, isIsqError = this.DNCuser &&(getIsqVariant2)? validationCheck():'';
        if(isIsqError == '' && this.DNCuser &&(getIsqVariant2) && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0]){
            passIsqVal = {
                userFilledIsqData: {
                bResponse: [document.getElementById("qntInpInl") ? document.getElementById("qntInpInl").value ? document.getElementById("qntInpInl").value : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").value && document.getElementById("qntUnitInpInl").value != "Other" ? document.getElementById("qntUnitInpInl").value : (document.getElementById("otherPopupInl") && document.getElementById("otherPopupInl").style.display == "block" && document.getElementById("otherPopupInl").value && (document.getElementById("qntUnitInpInl") && document.getElementById("qntUnitInpInl").value == 'Other' ||  document.getElementById("qntUnitInpInl").value == 'other') ? document.getElementById("otherPopupInl").value : document.getElementById("selectedOptInl") && document.getElementById("selectedOptInl").getAttribute('optionsdesc')) : ''],
                
                qDesc: ["Quantity", "Quantity Unit"],
                
                qId: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('qid') ? document.getElementById('qntInpInl').getAttribute('qid'): '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('qid') : ''],
                
                isqPriority: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('priority') ? document.getElementById('qntInpInl').getAttribute('priority') : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('isqpriority') : ''],
               
                bId: [document.getElementById('qntInpInl') ? document.getElementById('qntInpInl').getAttribute('bid') ? document.getElementById('qntInpInl').getAttribute('bid') : '' : '', document.getElementById("qntUnitInpInl") ? document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('optionsid') : '']
            },
            callSetIsq: document.getElementById("qntInpInl") && document.getElementById("qntInpInl").value && document.getElementById("qntUnitInpInl") && (document.getElementById("qntUnitInpInl").value ? document.getElementById("qntUnitInpInl").value : document.getElementById("selectedOptInl") && document.getElementById("selectedOptInl").getAttribute('optionsdesc')) && document.getElementById('qntInpInl').getAttribute('qid') != undefined && document.getElementById("qntUnitInpInl").options[document.getElementById("qntUnitInpInl").selectedIndex].getAttribute('qid') != null ? true : false,

            quantityShown: this.DNCuser && this.props.pagename != "impcat" && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == "Quantity" ? true : false,}
         }

        
        let valueEnquiryForm = 
        {
            isEnquiry: true,
            productName: PcItemName,
            page: this.props.pageName,
            receiverUserId: glUserId? glUserId:'',
            mcatId: mcatid ? mcatid : '',
            queryText: query_text ,
            displayId: dsplayId,
            productImage: GetPdpImg?GetPdpImg:'https://m.imimg.com/gifs/img/prod-img.png',
            companyName: cmpName,
            ctaName: ctaName,
            affiliationId:"-1",
            catid:catId,
            'modid': 'IMOB',
            'query': query,
            'enquiryDivId': enqDivId,
            'enq_item_price': itemPrice,
            'R_custtype_weight': R_custtype_weight,
            'CefProdType': IS_PROD_SERV,
            pdpModrefType: pdpModref_Type,
            showRevampEnq:isShowRevampEnq,
            nameCity:isNameCity,
            cityName:cityNamePDP,
            localityName:localityPDP, 
            prdPricePDP:PrdPricePDP,
            callTxt:"कॉल करें",
            eventLabel :"Call-Icon",
            tsCode:callProps.tscode,
            contactNumber:callProps.CONTACT_NUMBER,
            contactType:callProps.CONTACT_TYPE,
            glusrID:callProps.glusrid,
            itemId:callProps.itemId,
            itemName:callProps.itemName,
            mcatname:callProps.mcatname,
            dbpagetrack:callProps.dbpagetrack,
            custtypeWeight:R_custtype_weight,
            modrefid:callProps.itemId,
            modrefname:callProps.itemName,
            query_ref_id:callProps.mcatid,
            query_ref_type:callProps.mcatname,
            inlineISQ:this.DNCuser&&(getIsqVariant2) ?true:false,
            DNCuser: this.DNCuser ? this.DNCuser : '',
            userFilledIsqData: isIsqError=='' && this.DNCuser&&(getIsqVariant2) ? passIsqVal? passIsqVal.userFilledIsqData:'':'',
            callSetIsq:isIsqError=='' &&  this.DNCuser&&(getIsqVariant2) ? passIsqVal? passIsqVal.callSetIsq:'':'',
            quantityShown:isIsqError=='' &&  this.DNCuser &&(getIsqVariant2)? passIsqVal? passIsqVal.quantityShown:'':'',
            isIsqError:isIsqError=='' &&(getIsqVariant2||getIsqVariantElsCase)?true:false,
            widgetType:"First-Fold-Inline-Enquiry"
        }
        return valueEnquiryForm;

    }
    

    callNowClick(callTxt, image, tsCode, name, number, type, glusrID, itemId, itemName, mcatId, mcatName, dbpagetrack, PAID_TYPE='') {
        let callProps = { callTxt: callTxt, image: image, tsCode: tsCode, companyName: name, contactNumber: number, contactType: type, glusrID: glusrID, modrefid: itemId, modrefname: itemName, query_ref_id: mcatId, query_ref_type: mcatName, dbpagetrack: dbpagetrack, eventLabel: 'PDP', PAID_TYPE : PAID_TYPE };
        if(this.props && this.props.showRatingFeedback&&this.props.setRatingInfo&&typeof this.props.setRatingInfo=== "function"&& typeof this.props.showRatingFeedback === "function" && checkUserStatus() == 2) {
            this.props.showRatingFeedback(glusrID);
            this.props.setRatingInfo(mcatId,mcatName,itemName,itemId,glusrID,name)
        }
        callNowActionDispatcher(true, callProps);
    } 
    
    checkCookie(props) {
        cookieChangeFn = setInterval(function () {
            if (props.enqCtaDisabled != props.PC_ITEM_DISPLAY_ID)
                props.toggleEnqCTADisabled(props.PC_ITEM_DISPLAY_ID);
        }, 50);
    }
    scrllview(){
        let divsion=document.getElementById("inline_enquiry")
        divsion&&divsion.scrollIntoView()
    }

    getIsqforPDP(){    
    
        if(this.props && this.props.isqType == 'ISQ' && this.DNCuser) {
            let data = this.props && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == 'Quantity' ? this.props.mblIsqData.data[0][1].qOptions : '';
            let quantityUnits = [];
            data ? quantityUnits = [...data] : '';
                if(quantityUnits.length != 0) {
                    let unit0 = quantityUnits[0];
                    quantityUnits.shift();
                    if (unit0) {
                        this.optionList.push(<>
                            <option id="selectedOptInl" selected qid={this.props.mblIsqData.data[0][1].qId} optionsdesc={unit0.optionsDesc} optionsid={unit0.optionsId} isqpriority={unit0.isqPriority} className="ttc" style="display:block;"> {unit0.optionsDesc}</option></>
                        );
                    }
                    for (let n = 0; n < quantityUnits.length; n++) {
                        this.optionList.push(<>
                            <option value={quantityUnits[n].optionsDesc} optionsdesc={quantityUnits[n].optionsDesc} optionsid={quantityUnits[n].optionsId} qid={this.props.mblIsqData.data[0][1].qId} isqpriority={quantityUnits[n].isqPriority} className="ttc"> {quantityUnits[n].optionsDesc}</option></>
                        );
                    }
                    let pdpUnit = this.props && this.props.pdpData && this.props.pdpData.PC_ITEM_MOQ_UNIT_TYPE ? this.props.pdpData.PC_ITEM_MOQ_UNIT_TYPE : '';
                    if (quantityUnits == "" && pdpUnit !="") {
                        for (let n = 0; n < quantityUnits.length; n++) {
                            if(quantityUnits[n].optionsDesc==pdpUnit){
                                return true;
                            }
                            else if(n==quantityUnits.length){
                                this.optionList.push(<>
                                    <option value={pdpUnit} className="ttc"> {pdpUnit}</option></>
                                );
                            }
                        }
                    } 
                }   
        } 
        
        if(this.DNCuser && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0]){
            return(<div className='tl mt5 mb5'>
                <p className='mb5 fs14 fw pdt2'>Quantity</p>
                <div className="df">
                        <div className="w50 mr5">
                            <input id="qntInpInl"onClick={()=>this.scrllview()}type="tel" maxLength="10" placeholder="Quantity" className="brd008b80P fs16 pd5 tl w100 bxrd4 ht31" qdesc={this.props.mblIsqData.data[0][0].qDesc} qid={this.props.mblIsqData.data[0][0].qId} priority={this.props.mblIsqData.data[0][0].priority} qtype={this.props.mblIsqData.data[0][0].qType} bid={this.props.mblIsqData.data[0][0].qOptions[0].optionsId} onChange={(event) => handleQntChange(event.target.value)}/>
                            <div id="errQtyInl" className="eqerrmsg fs12 mt2"></div>
                        </div>
                        <div className="w50">
                        <div className="por">
                            <input id="otherPopupInl" className="fs16 pd10 poa entrUnit" placeholder="Unit" type="text" style="display:none" onChange={(event) => handleQntChange(event.target.value)}/>
                            <select id="qntUnitInpInl" value='' optionsdesc='' optionsid='' qid='' isqpriority='' bid='' className="bgw brd008b80P bxrd4 fs16 pd5 tl ttc w100 ht31" 
                            onChange={(event) => handleChange(event.target.value)} >
                        
                            {this.optionList}
                            </select>
                        </div>
                        <div id="errQtyUnitInl" className="eqerrmsg fs12 mt2"></div>
                        </div>
                    </div>
            </div>)
        }
    }

render() {

        let ga = getCookie('_ga');
        let gaLastDigit = true;
        let cABTestPDP = '';
        let isABtst = '';
        let isPageNamePDP = window.pagename && window.pagename=="PDP"? true:'';
        if(gaLastDigit && isPageNamePDP){
        isABtst = 1;
        }

        let getIsqVariant2 = false, getIsqVariantElsCase = false, isBigImg = false;
        let isISQAvailable = this.props && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0]?true:'';
        
        if(checkUserStatus() == 1 && this.DNCuser && isPageNamePDP){
            isBigImg = true;
            isISQAvailable? getIsqVariant2 = true : getIsqVariantElsCase = true;
        }else{
            getIsqVariantElsCase = true;}


        if (this.props.enqCtaDisabled && cookieChangeFn) { 
            clearInterval(cookieChangeFn);
         }
         let  isA2HS = false;
        if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true){
            isA2HS = true;
        }
        let glUserId = this.props.GLUSR_USR_ID;
        let itemPrice = this.props.FOB_PRICE;
        let mcatid = this.props.BRD_MCAT_ID;
        let mcatname=this.props.BRD_MCAT_NAME;
        let pcItemDsplId = this.props.PC_ITEM_DISPLAY_ID;
        let PcItemName = this.props.pcItemName;
        let PcItemDsplyName = this.props.pdpData && this.props.pdpData.PC_ITEM_DISPLAY_NAME? this.props.pdpData.PC_ITEM_DISPLAY_NAME:this.props.pdpData.PC_ITEM_NAME;
        let GetPdpImg = this.props.getPdpImg;
        let imgBlkStyle = 'color: #757575;text-overflow: ellipsis;white-space:nowrap;overflow: hidden;';
        let imgStyle = 'max-width:100px;max-height:100px; object-fit: scale-down';
        const ctaNamePDP = <span className='t_tc'>{this.props.translatedText? this.props.translatedText.Continue : 'Continue'}
        <span className='dib ml5 doubleArrow'></span></span>
        const lableforPDP = this.props.translatedText ? this.props.translatedText.AskMoreVariants : "Ask More Variants";

        let ctaText = <span className="ENQ_LABEL3">{this.props.translatedText ? this.props.translatedText.ENQ_LABEL3 : "Continue"}</span>;
        let ctaTextPDP = <span className="Contact_Seller dib">{this.props.pageType == "fullPDP"? ctaNamePDP : this.props.pageType=="miniPDP" ? this.props.translatedText ? this.props.translatedText.ENQ_LABEL3 : "Continue" : this.props.translatedText.Continue}</span>;
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let ctaName = this.props.cta_name ? this.props.cta_name : '';

        let PcItemNameSection = <div className={`${getIsqVariant2?'clr33 fw ':'clr33 '} fs14`}><p className='mxht1000'>{PcItemName}</p></div>;
        let cmpName = this.props.COMPANYNAME;
        let cityName = <span>, {this.props.pdpData && this.props.pdpData.CITY ? this.props.pdpData.CITY : this.props.cityName ? this.props.cityName : ''}</span>;
        let cDetail = <div className={this.props.enqInAboutSeller?'fs12 clr69 cDtl':"pdt7 fs12 clr69"}><p className='mxht1000'><span className='notranslate'>by:{cmpName}</span>{cityName}</p></div>
        let cntSellerLable =  getIsqVariantElsCase?(<p className="clrBl fw tl mb12 fs17"><span onClick={() =>{
            this.contactSeller=true;
            let eventAction = 'Inline-Enquiry';
            let loginModeArray1=["Unidentified", "Identified", "Full-Login"];
        let standardEnqLable = '', identifyUserStatus = '';
            if(window.pageName && window.pageName == "PDP" ) {
                let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
                let status = checkUserStatus();
                eventAction+=(status>=0 && status<=2 ? loginModeArray[status] : "");
                eventAction+= cABTestPDP;
                identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
                standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;
                eventTracking("EnquiryCTA/"+loginModeArray1[status],"PDP/"+"FF-Inline/","",true)
            }
            (this.props.toggleEnqCTADisabled && this.props.enqCtaDisabled != (pcItemDsplId)) ? this.checkCookie(this.props) :'';
            this.props.showModal(this.callEnqForm(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemDsplyName, pcItemDsplId, "Ask more Variants", GetPdpImg, this.props.pdpModrefType, cityNamePDP, localityPDP, prdPricePDP,callProps,cABTestPDP,getIsqVariant2,getIsqVariantElsCase));
        
            (this.props.pageType == 'miniPDP') 
            ? (eventTracking('Mini-PDP-'+this.props.pageName1, 'Inline-Enquiry', pcItemDsplId, true),eventTracking("EnquiryCTA/"+loginModeArray1[checkUserStatus()],"Mini-PDP/"+"Inline-Enquiry/","",true))
            :    eventTracking('Product-Page-Clicks', eventAction, 'Contact-This-Seller-Clicks' +standardEnqLable, true);
            
        }} className="ENQ_LABEL2">{isPageNamePDP? lableforPDP : this.props.translatedText ? this.props.translatedText.ENQ_LABEL2 : "Contact this seller" }</span></p>):'';
        
        let numObj = getMobileNum(this.props.pdpData);
        let dbpagetrackVal = A2HSApp(true) ? "enqSent" + A2HSApp(true) + '-' + (document.getElementById("page_name") ? document.getElementById("page_name").value : '') : this.props.enqInAboutSeller? (this.props.pageType=="miniPDP" ? 'Mini-PDP-'+this.props.pageName1+`-InlineInquirySent`+langSelection+'|'+this.props.isProdServ: `IMOB_PDP_Enquiry_Sent`) : "product-detail-enqSent";
        dbpagetrackVal+=(window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"") + cABTestPDP+this.props.track;
        let callProps = {
            im_popup: 'im_popup', CONTACT_NUMBER: numObj.num, glusrid: glUserId, CONTACT_TYPE: numObj.type, mbgn_askpopup: 'mbgn_askpopup', call_txt: this.props.translatedText ? this.props.translatedText.HEADER_BTN_1 :"कॉल करें", contact_no: 'contact_no', itemId: pcItemDsplId, mcatid: mcatid, mcatname: (mcatname?mcatname:(this.props.pdpData&&this.props.pdpData.BRD_MCAT_NAME?this.props.pdpData.BRD_MCAT_NAME:"")), translatedText: this.props.translatedText, compname:cmpName,
            pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '',
            dbpagetrack: dbpagetrackVal,
            itemName: PcItemName, eventAction: numObj.type == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS",
            tscode:this.props.tsCode?this.props.tsCode:"",
            custtypeWeight:this.props.custtypeWeight?this.props.custtypeWeight:"",
            PAID_TYPE: this.props.pdpData&&this.props.pdpData['URL_TYPE'] ? this.props.pdpData['URL_TYPE'] : ''
        };
        let cityNamePDP = this.props.pdpData && this.props.pdpData.CITY ? this.props.pdpData.CITY : this.props.cityName ? this.props.cityName : '';
        let localityPDP = this.props.pdpData && this.props.pdpData.LOCALITY ? this.props.pdpData.LOCALITY :'';
        let prdPricePDP = this.props.pdpData && this.props.pdpData.PRODUCT_PRICE ? this.props.pdpData.PRODUCT_PRICE :'';
        
        let inlEnqCta = ((checkUserStatus() == 2 && this.props.isPdpHeader && getCookieValByKey('ImeshVisitor', 'ctid') && getCookieValByKey('ImeshVisitor', 'fn')  && (getCookieValByKey('ImeshVisitor', 'usts') != 1)) && this.props.pdpData? 
        <InlineOneTap
            toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled}
            enqCtaDisabled = {this.props.enqCtaDisabled}
            label="Request-Call-Back-Company" 
            data={this.props.pdpData} 
            pageLang={this.props.pageLang} 
            formId={"latestPriceEnqAbtSelr" + this.props.pdpData['PC_ITEM_DISPLAY_ID']} 
            isExtended={this.props.isExtended} 
            queryRef={this.props.queryRef} 
            extendedId={this.props.extendedId} 
            pageName={"PDP"} 
            translatedText={this.props.translatedText} 
            showModal={this.props.showModal} 
            cta_name={this.props.cta_name} 
            pdpModrefType={this.props.pdpModrefType} 
            btnName={"Inline_Enquiry"}
            isABtst={isABtst}
            isAbtstWithBluCTA={true}
            /> 
            :
            <div id={pcItemDsplId} className="bgBlu  clrw fs18  pd10 por bxrd4 fw  "
                onClick={() => {
                    let eventAction = 'Inline-Enquiry';
                    let standardEnqLable = '', identifyUserStatus = '';
                    let isLoginMode1=["Unidentified","Identified","Full-Login"];
                    if(window.pageName && window.pageName == "PDP" ) {
                        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"]; 
                        let status = checkUserStatus();
                        eventAction+=(status>=0 && status<=2 ? loginModeArray[status] : "");
                        eventAction+= cABTestPDP;
                        identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
                        standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;
                        eventTracking("EnquiryCTA/"+isLoginMode1[status],"PDP/"+"Inline-Enquiry/","",true);
                    }
                    (this.props.toggleEnqCTADisabled && this.props.enqCtaDisabled != (pcItemDsplId)) ? this.checkCookie(this.props) :'';
                    this.props.showModal(this.callEnqForm(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemDsplyName, pcItemDsplId, "Continue", GetPdpImg, this.props.pdpModrefType, cityNamePDP, localityPDP, prdPricePDP,callProps,cABTestPDP,getIsqVariant2,getIsqVariantElsCase));
                
                    (this.props.pageType == 'miniPDP') 
                    ? (eventTracking('Mini-PDP-'+this.props.pageName1, 'Inline-Enquiry', pcItemDsplId, true),eventTracking("EnquiryCTA/"+isLoginMode1[checkUserStatus()],"Mini-PDP/"+"Inline-Enquiry/","",true))
                    :    eventTracking('Product-Page-Clicks', eventAction, 'continue-clicks'+standardEnqLable, true);
                    
                }}>{ctaTextPDP}
                
            </div>);
        

        let inlEnq ='';
        if(this.props.enqInAboutSeller == true){
            inlEnq = this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) ? "" : (

                
                <section id={"inline_enquiry" + pcItemDsplId} className="pdpInlineInquiry">
                    <div id="inline_enquiry" className={this.props.pageType=="miniPDP" ? "promptHandlingClass ":"promptHandlingClass mt10 mb10"}>
                    <div className={this.props.pageType=="miniPDP" ? "bxsdw fs15 crb tc pd10 bgw" : `bxsdw fs15 crb tc mt10 mb10 pdr10 pdl10 ${getIsqVariant2?" pdt8 ":" pdt5 "} pdb10 bgw` } >
                        
                        <div className="boxMain flx">
                            <div className='wd135pxl flxShrnk0'>
                            <div className={`${getIsqVariant2? 'bdrLtGry ':` `} fs14 tc mr5  mb2 ht125px`}><img src={GetPdpImg} alt={PcItemName} width={'125'} height={ '125 '}  className="dib vam mr5 imgCntnr mhw125 " /></div>
                                 </div>
                                
                            <div className={getIsqVariant2? 'boxMidl-1':"boxMidl"}>
                                {cntSellerLable}
                            <div className="tl">
                                {getIsqVariant2 || getIsqVariantElsCase? PcItemNameSection:''}
                                {getIsqVariant2 || getIsqVariantElsCase? cDetail:''}
                                
                            </div>
                            
                            {checkUserStatus() == 1 && this.DNCuser && getIsqVariant2? this.getIsqforPDP():''}
                            </div>
                        </div>
                        {getIsqVariant2 || getIsqVariantElsCase? <div className='mt5'>{inlEnqCta}</div>:''}
         
                        
                        </div>
                    </div>
                </section>

            );
        }else{
            inlEnq = this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) ? "" : (
                <section id={"inline_enquiry" + pcItemDsplId}>
                    <div id="inline_enquiry" className="promptHandlingClass  mt10 mb10 ">
                        <div className="bxsdw fs15 crb tc mt10 mb10 pd10 "  style="    background: #ebfdfc;" >
                           

                            <div className="flx " style="align-items: center; justify-content: center">
                                <div className="fs14 tc mr5 w100p ">
                                    <img src={GetPdpImg} style={imgStyle} alt={PcItemName} className="dib vam mr5" />
                                </div>
                                <div  className="pd10"  style="flex: 1 0;">
                                    <div>  <p className=" fw mb10 tl" style="font-size:17px">
                                <span className="ENQ_LABEL2">{this.props.translatedText ? this.props.translatedText.ENQ_LABEL2 : "Contact this seller"}</span>
                            </p>
                                <div className="tl">
                                    {PcItemNameSection}
                                    {cDetail}
                                </div>
                                </div>
                                </div>
                            </div>


                            <div id={pcItemDsplId} className="bdrBlu bgBlu clrw bxrd4_t bxrd4_b bxsdw fs18 mt10"
                                style="padding:14px" onClick={() => {
                                    (this.props.toggleEnqCTADisabled && this.props.enqCtaDisabled != (pcItemDsplId)) ? this.checkCookie(this.props) :'';
                                    this.callUntillDefined(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemName,
                                        pcItemDsplId, ctaName, GetPdpImg);
                                    let eventAction = 'Inline-Enquiry';
                                    let standardEnqLable = '', identifyUserStatus = '';
                                    if(window.pageName && window.pageName == "PDP" ) {
                                        let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
                                        let isLoginMode = ["Unidentified", "Identified", "FullyIdentified"];
                                        let status = checkUserStatus();
                                        eventAction+=(status>=0 && status<=2 ? loginModeArray[status] : "");
                                        identifyUserStatus= (status>=0 && status<=2 ? isLoginMode[status] : "");
                                        standardEnqLable = '|EnquiryCTA|PDP|'+identifyUserStatus;
                                    }
                                    this.props.pageType == "fullPDP"
                                        ?
                                        eventTracking('Product-Page-Clicks', 'Inline-Enquiry', 'continue-clicks', true)
                                        :
                                        eventTracking('PWA_Product_Detail', eventAction, 'Continue_clicked'+standardEnqLable, true);
                                }}>{ctaText}</div>

                        </div>
                    </div>
                </section>
            );
        } 

        let showCallAfterEnqpdp='';
        if(this.props.enqInAboutSeller == true){
             showCallAfterEnqpdp= <section id="callAfterEnqpdp"  style={this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) ? "display: block;" : "display: none;"}>
            
                <div className={this.props.pageType=="miniPDP" ? "bxsdw fs15 crb tc pdr10 pdl10" :" bxsdw fs15 crb tc mt10 mb10 pdr10 pdl10 pdt10 lh21 bgw"} >
                {this.props.pageType=="miniPDP" ?<i className="eqIc dib"></i>:""}
                    <div className="boxMain flx">
                    <div className='wd135pxl flxShrnk0'>
                    <div className='br1 tc mr5 mb5 ht125px'><img src={GetPdpImg}  alt={PcItemName} width={'125'} height={'125'}  className="dib vam mr5 imgCntnr mhw125" /></div>
                    </div>
                     <div className='boxMidl tl ml5'>   
                        <div  className="ENQ_LABEL6 fs16 fw por"><span className='tickIcon'></span>{this.props.translatedText ? this.props.translatedText.ENQ_LABEL : "कोटेशन प्राप्त करें"}</div>
                        <span className="fs14 pdt7">to {cmpName}{cityName}</span>
                        <span className="ENQ_LABEL7 pdl5">&#8203;</span>
                    </div>
                    </div>                
                    
            
                    <div className="fs15 crb tc mt5 pdb5 callBtnCntnrPDP por">
                            {this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) && !this.props.noNumFlag?
                            <CallBtn2
                            key={callProps.CONTACT_NUMBER}
                            callText={callProps.call_txt}
                            eventAction={callProps.eventAction}
                            eventLabel={"Call-Icon"}
                            pageName={this.props.pageName}
                            displayPopup={() => {
                                this.callNowClick("कॉल करें",
                                GetPdpImg, callProps.tscode, callProps.compname,
                                    callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                                    callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack, callProps.PAID_TYPE)
                                    if(this.props.pageType=="miniPDP") {
                                        eventTracking("Mini-PDP-"+this.props.pageName1, 'Inquiry-Sent-Call-Now',pcItemDsplId, true)
                                    }
                                }} isABtst={isABtst} inlineEnqFromPDP={true} />
                            : ""}
                    </div>
                </div>
            </section>
        }else{ 
             showCallAfterEnqpdp= <section id="callAfterEnqpdp" className=" pdb10" style={this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) ? "display: block;" : "display: none;"}>
            
            <div className="bgw bxsdw fs15 crb tc pd10 mt10 ">
                <i className="eqIc dib"></i>
                <div className="pdt10 fs16 pdl5">
                <div  className="ENQ_LABEL6  fw por pdb10"><div style="background-image: url(https://m.imimg.com/gifs/img/new-ack.png);background-repeat: no-repeat;width: 40px;height: 44px;position: absolute;background-position: -22px 0;left: 70px;top: -18px;transform: scale(.7);"></div>{this.props.translatedText ? this.props.translatedText.ENQ_LABEL : "कोटेशन प्राप्त करें"}</div>
                     <span className="fs14 pd7">to {cmpName}{cityName}</span>
                     <span className="ENQ_LABEL7 pdl5">&#8203;</span>
                </div>
                <div className="fs17 clr5a pdt20 mb10 ENQ_LABEL8">{this.props.translatedText ? this.props.translatedText.ENQ_LABEL8 : "For a Quick Response"}</div>

                <div class="por">
                {this.props.enqCtaDisabled && this.props.enqCtaDisabled == (this.props.PC_ITEM_DISPLAY_ID) ?
                <CallBtn2
                                    key={callProps.CONTACT_NUMBER}
                                    callText={callProps.call_txt}
                                    eventAction={"call-post-enquiry"}
                                    eventLabel={"Call-Icon"}
                                    pageName
                                    displayPopup={() => {
                                        this.callNowClick("कॉल करें",
                                        GetPdpImg, callProps.tscode, callProps.compname,
                                            callProps.CONTACT_NUMBER, callProps.CONTACT_TYPE, callProps.glusrid,
                                            callProps.itemId, callProps.itemName, callProps.mcatid, callProps.mcatname, callProps.dbpagetrack, callProps.PAID_TYPE)
                                    }}
                                />
                : ""}
                    </div>
                </div>
            </section> 
        }

        return (
            <div>
                {inlEnq}
                {showCallAfterEnqpdp}
            </div>
        );
    }
}

export default InlineEnquiry;