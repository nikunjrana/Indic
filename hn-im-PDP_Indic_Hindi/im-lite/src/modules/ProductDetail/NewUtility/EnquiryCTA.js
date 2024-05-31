import React from 'react';
import { callEnqForm } from '../utility/helper';
import { eventTracking } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';


function EnquiryCTA(props) {
    function enquiryClick() {
    let loginModeArray = ["Unidentified", "Identified", "FullyIdentified"];
    let status = checkUserStatus();
    let eventLabel = props.index ?  "Get-Best-Price-"+(props.index+1) : "Get-Best-Price"+"-"+loginModeArray[status];
    let eventAction = props.eventAction?props.eventAction+"|"+loginModeArray[status]:'More_product_from_same_seller';
    let query_text = props.queryText?props.queryText+"|"+loginModeArray[status]:"IMOB_PDP_More-Products-from-this-seller|";
    eventTracking('Product-Page-Clicks', eventAction, eventLabel, true)
    props.data && requestAnimationFrame(()=>setTimeout(()=>{callEnqForm(
        props.data.BRD_MCAT_ID,props.data.PRICE_F,props.callProps.compname, props.callProps.glusrid,
        props.data.PC_ITEM_DISPLAY_NAME ? props.data.PC_ITEM_DISPLAY_NAME : props.data.PC_ITEM_NAME ? props.data.PC_ITEM_NAME : props.callProps.itemName, props.data.PC_ITEM_DISPLAY_ID,props.imgSrc,"सर्वोत्तम मूल्य प्राप्त करें",
        props.cat_ID,props.callProps,props.showModal, '', {}, query_text)}))
    }
    function callClick() {
        eventTracking("Click-To-Call", props.callProps.eventAction, props.callProps.eventLabel, true)
        props.callNowClick("कॉल करें",
        props.callProps.itemImage,props.callProps.tscode, props.callProps.compname,
        props.callProps.CONTACT_NUMBER, props.callProps.CONTACT_TYPE, props.callProps.glusrid,
        props.callProps.itemId, props.callProps.itemName,props.callProps.mcatid,props.callProps.mcatname,props.callProps.dbpagetrack)
    }
    let styleEnqClass = "bdrmim bgmim clrw w95 fs15 ma bxrd4 clrw pdt12 pdb12 fw por dflex jstyfyCenter algnCenter";
    let outerEnqClass = "";
    let iconEnqClass = "enqIcn dib vam mr2";
    let styleCallClass = "bdrmim bgmim clrw w95 ma bxrd4 clrw fs18 pdt12 pdb12 fw por dflex jstyfyCenter algnCenter",
    iconCallClass = "callIcnNAB mt-2 mr5 dib vam objctFitSclDown"
    if(props.type=="alsoDealsIn") {
        if(props.isEnquirySent) {
            styleCallClass = "bgmim bdrmim bxrd20 pd10 clrw db mt10 mr5 ml5 fw ",
            iconCallClass = "mr5 dib vam bkgImgPstnRpt callIcnNAB"
        }
        else {
        styleEnqClass = "bdrmim bgmim pd10 db clrw fs14 bxsdw bxrd20 mt10 mr5 ml5 fw"
        outerEnqClass = "bgw w100";
        iconEnqClass = "enqIcn dib vam mr5"
        }
    }
    if(props.type=="Pdfenquiry") {
        if(props.isEnquirySent) {
            styleCallClass = "bgw w125p bdrmim bxrd20 pd10 clrmim db mt10 mr5 ml5 fw ",
            iconCallClass = "mr5 dib vam bkgImgPstnRpt callIcnN"
        }
        else {
        styleEnqClass = "bdrmim bgw pd10 db clrmim fs14 bxsdw bxrd20 mt10 mr5 ml5 fw"
        outerEnqClass = "bgw w100";
        iconEnqClass = "enqIcnAB dib vam mr5"
        }
    }

    return (
        <React.Fragment>
             {props.isEnquirySent ? <span onClick={()=>{callClick()}} class={styleCallClass}><span class={iconCallClass}></span><span>कॉल करें</span><span id="pns1" class="dn">{props.transformedNo}</span></span>
            :
            <span className={outerEnqClass} onClick={()=>{enquiryClick()}}><span className={styleEnqClass}><i className={iconEnqClass}></i>सर्वोत्तम मूल्य प्राप्त करें</span></span>
        }
        </React.Fragment>
    );
}

export default EnquiryCTA;