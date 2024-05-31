import React, { Component } from "react";
import { eventTracking } from '../../../Globals/GaTracking';
import {validationCheck, handleQntChange, handleChange} from '../utility/InlineUtility/helper';
// import {checkDNCUser} from '../../CentralizePopUp/utility/helper'
import { getCookie,getCookieValByKey } from "../../../Globals/CookieManager";
import { removalTextNodes } from "../../../Globals/translatorPreact/translatorPatch";
class InlineBl extends Component {
    constructor(props) {
        super(props);
        this.callBl = this.callBl.bind(this);
        this.getIsqforMCAT = this.getIsqforMCAT.bind(this);
        this.optionList = [];
        this.DNCuser = '';
        this.ctaClass = localStorage.getItem('ctaClass');
        this.evenOrOdd = this.props.usermode!="Unidentified" ? props.glLastDigit && props.glLastDigit%2==0 ? "|Even":"|Odd":''
        if(this.ctaClass && window.elemNotFound && !getCookie('ImeshVisitor')) {
            this.callBl(this.props);
          }
    }
callBl(props) {
    let inlISQ = document.getElementById("qntInpInlMcat"+this.props.pbrCount)? document.getElementById("qntInpInlMcat"+this.props.pbrCount):"";
    let qtyUnit = document.getElementById("qntUnitInpInlMcat"+this.props.pbrCount)? document.getElementById("qntUnitInpInlMcat"+this.props.pbrCount):"";
    let otherPop = document.getElementById("otherPopupInlMcat"+this.props.pbrCount)? document.getElementById("otherPopupInlMcat"+this.props.pbrCount):"";
    let errorQty = document.getElementById("errQtyUnitInlMcat"+this.props.pbrCount) ? document.getElementById("errQtyUnitInlMcat"+this.props.pbrCount):"";
    let selOpt = document.getElementById("selectedOptInlMcat"+this.props.pbrCount) ? document.getElementById("selectedOptInlMcat"+this.props.pbrCount):"";
    let errorQtyMcat = document.getElementById("errQtyInlMcat"+this.props.pbrCount)? document.getElementById("errQtyInlMcat"+this.props.pbrCount):"";
    let passIsqVal, isIsqError = this.DNCuser ? validationCheck(inlISQ, qtyUnit, errorQty, otherPop, errorQtyMcat, selOpt):'';
    if((isIsqError == '' && this.DNCuser && this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity')){
        passIsqVal = {
            userFilledIsqData: {
            bResponse: [inlISQ ? inlISQ.value ? inlISQ.value : '' : '', 
            qtyUnit ? qtyUnit.value && qtyUnit.value != "Other" ? qtyUnit.value : (otherPop && otherPop.style.display == "block" && otherPop.value && (qtyUnit && qtyUnit.value == 'Other' ||  qtyUnit.value == 'other') ? otherPop.value : selOpt && selOpt.getAttribute('optionsdesc')) : ''],
            
            qDesc: ["Quantity", "Quantity Unit"],
            
            qId: [inlISQ ? inlISQ.getAttribute('qid') ? inlISQ.getAttribute('qid'): '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('qid') : ''],
            
            isqPriority: [inlISQ ? inlISQ.getAttribute('priority') ? inlISQ.getAttribute('priority') : '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('isqpriority') : ''],
           
            bId: [inlISQ ? inlISQ.getAttribute('bid') ? inlISQ.getAttribute('bid') : '' : '', qtyUnit ? qtyUnit.options[qtyUnit.selectedIndex].getAttribute('optionsid') : '']
        },
        
        callSetIsq: inlISQ && inlISQ.value && qtyUnit && (qtyUnit.value ? qtyUnit.value : selOpt && selOpt.getAttribute('optionsdesc')) && inlISQ.getAttribute('qid') != undefined && qtyUnit.options[qtyUnit.selectedIndex].getAttribute('qid') != null ? true : false,
   
        quantityShown: this.DNCuser && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == "Quantity" ? true : false,}
    }
    if((isIsqError == '' && this.DNCuser && this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity') || !this.DNCuser || !(this.props.mblIsqData && this.props.mblIsqData!='' && this.props.mblIsqData.status=="success" && this.props.mcatId!="" && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc && this.props.mblIsqData.data[0][0].qDesc=='Quantity')){
    var obj = {};
    obj.affiliationId = "-46";
    obj.productName = props.translated_name ? props.translated_name : props.searchKey;
    obj.mcatId = props.mcatId;
    obj.catid = props.catId;
    obj.query = '';
    obj.queryText = props.query_text;
    obj.ctaName = "Get Verified Seller";
    obj.modid = 'IMOB';
    obj.isEnquiry = false;
    obj.productImage = props.pbrImage ? props.pbrImage : 'https://m.imimg.com/gifs/img/prod-img.png';
    obj.EnqBlForm = props.showEnqPopup;
    obj.CEF_form_type = props.type;
    obj.CefProdType = props.prodType;
    obj.R_custtype_weight = "";
    obj.page = props.page;
    obj.inlineISQ = this.DNCuser ?true:false,
    obj.DNCuser = this.DNCuser ? this.DNCuser : '',
    obj.userFilledIsqData = isIsqError=='' && this.DNCuser ? passIsqVal? passIsqVal.userFilledIsqData:'':'',
    obj.callSetIsq = isIsqError=='' &&  this.DNCuser ? passIsqVal? passIsqVal.callSetIsq:'':'',
    obj.quantityShown = isIsqError=='' &&  this.DNCuser ? passIsqVal? passIsqVal.quantityShown:'':'',
    obj.whatsappLogin = window.location.href && window.location.href.includes('waId') && !getCookie('ImeshVisitor') ? true : false,
    obj.widgetType="Inline-Bl"
    props.showModal(obj);
    if(inlISQ && inlISQ.value) inlISQ.value = "";
    if(otherPop && otherPop.value) otherPop.value = "";
    if(otherPop && otherPop.style.display) otherPop.style.display="none";
    if(errorQty && errorQty.style.display) errorQty.style.display="none";
    }
}
    getIsqforMCAT(){
            if(this.props && this.props.isqType == 'ISQ' && this.DNCuser) {
                let data = this.props && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0] && this.props.mblIsqData.data[0][0].qDesc == 'Quantity' ? this.props.mblIsqData.data[0][1].qOptions : '';
                let quantityUnits = [];
                data ? quantityUnits = [...data] : '';
                    if(quantityUnits.length != 0) {
                        let optionValue=1;
                        let unit0 = quantityUnits[0];
                        quantityUnits.shift();
                        if (this.optionList.length == 0) {
                            this.optionList.push(<>
                                <option id={"selectedOptInlMcat"+this.props.pbrCount} selected qid={this.props.mblIsqData.data[0][1].qId} optionsdesc={unit0.optionsDesc} optionsid={unit0.optionsId} isqpriority={unit0.isqPriority} className="ttc" style="display:block;"> {unit0.optionsDesc}</option></>
                            );
                        }
                        if (optionValue >= this.optionList.length){
                        for (let n = 0; n < quantityUnits.length; n++) {
                            this.optionList.push(<>
                                <option value={quantityUnits[n].optionsDesc} optionsdesc={quantityUnits[n].optionsDesc} optionsid={quantityUnits[n].optionsId} qid={this.props.mblIsqData.data[0][1].qId} isqpriority={quantityUnits[n].isqPriority} className="ttc"> {quantityUnits[n].optionsDesc}</option></>
                            );
                        }
                    }
                    }
            }
            if(this.DNCuser && this.props.mblIsqData && this.props.mblIsqData.data && this.props.mblIsqData.data[0] && this.props.mblIsqData.data[0][0]){
                return(<div className='tl mt5 mb5'>
                    <div className="df mcatInline">
                            <div className="w80 mr5">
                                <input id={"qntInpInlMcat"+this.props.pbrCount} type="tel" maxLength="10" placeholder="Enter Quantity" className="brd008b80P fs14 pd9992 tc w100 ht35 bxrd4 fw brd1pxSB" qdesc={this.props.mblIsqData.data[0][0].qDesc} qid={this.props.mblIsqData.data[0][0].qId} priority={this.props.mblIsqData.data[0][0].priority} qtype={this.props.mblIsqData.data[0][0].qType} bid={this.props.mblIsqData.data[0][0].qOptions[0].optionsId} onChange={(event) => handleQntChange(event.target.value, this.props.pbrCount)}/>
                                <div id={"errQtyInlMcat"+this.props.pbrCount} className="eqerrmsg fs14 mt2"></div>
                            </div>
                            <div className="w55">
                            <div className="por">
                                <input id={"otherPopupInlMcat"+this.props.pbrCount} className="fs14 mt5 poa entrUnitMcat" placeholder="Unit" type="text" style="display:none" onChange={(event) => handleQntChange(event.target.value, this.props.pbrCount)}/>

                                <select id={"qntUnitInpInlMcat"+this.props.pbrCount} value='' optionsdesc='' optionsid='' qid='' isqpriority='' bid='' className="bgw brd008b80P bxrd4 fs14 ht35 pd8880 tc ttc w100" 
                                onChange={(event) => handleChange(event.target.value, document.getElementById("errQtyUnitInlMcat"+this.props.pbrCount), document.getElementById("otherPopupInlMcat"+this.props.pbrCount))} >
                            
                                {this.optionList}
                                </select>
                            </div>
                            <div id={"errQtyUnitInlMcat"+this.props.pbrCount} className="eqerrmsg fs14 mt2"></div>
                            </div>
                        </div>
                </div>)
            }
        }
render() {
    removalTextNodes();
    let refUrl = encodeURIComponent(window.location.href + "##" + this.props.query_text);
    return (
        <li id={`inlineEnqID${this.props.inlineCount}`} className="mt1 mb1 tc w100 bgw crb mnht99 bxsdw db pdrl15 por pbrArrow pbrArrowL pbrArrowR promptHandlingClass">
            <div className="df aic jc">
                {this.props.pbrImage ? <img  onClick={() => {
                eventTracking(this.props.ec, `PBR-Inline-Image-Results${this.props.ea}${this.evenOrOdd}`,`${this.props.translated_name ? this.props.translated_name : this.props.searchKey}|BuyleadCTA|IMPCAT|${this.props.usermode}` , true);
                if((this.props.mcatId == 69543 || this.props.mcatId == 42703 || this.props.mcatId == 84153 || this.props.mcatId == 168563 ||this.props.mcatId == 170577 || this.props.mcatId == 108469 || this.props.mcatId == 174817 || this.props.mcatId == 42705 || this.props.mcatId == 169034 || this.props.mcatId == 175594 ||this.props.mcatId == 68310 || this.props.mcatId == 172377 || this.props.mcatId == 171931 || this.props.mcatId == 173525 || this.props.mcatId == 32057 || this.props.mcatId == 171747 || this.props.mcatId == 168019 || this.props.mcatId == 170602 || this.props.mcatId == 171255 || this.props.mcatId == 175819 ||this.props.mcatId == 168751 || this.props.mcatId == 168851 || this.props.mcatId == 173477 || this.props.mcatId == 41692 || this.props.mcatId == 168850 || this.props.mcatId == 170187 || this.props.mcatId == 174689 || this.props.mcatId == 127555 || this.props.mcatId == 147220 || this.props.mcatId == 172721 || this.props.mcatId == 173133 || this.props.mcatId == 171918) && (!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN")){
                    window.location.href = "https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_impcat&utm_campaign=Inline+BL&afl_id=-901" + "&ref_url="+refUrl;
                }
                else { this.callBl(this.props); }
                     }} loading='lazy' className="objctFitSclDown mcatimgmar14 centerItems bgimg" height="100" width="100" src={this.props.pbrImage} alt={this.props.searchKey} /> : ""}
                <div className="aligCen ml9">
                    {this.props.lang == "1" ? <h3 className="fs17 lineClamp3 oh wb mt3 fcb">{this.props.searchKey} की तलाश में? </h3> : <h3 className="fs17 mt3 lineClamp3 wb oh fcb"><span>Looking for {this.props.searchKey}?</span></h3>}
                    {this.props.lang == "1" ? <p className="lh23 fs14 mt3 fc75">{this.props.translatedText.LABEL22}</p> : <p className="lh23 fs14 mt3 fc75">{this.props.translatedText.LABEL22}</p>}
                        {this.DNCuser ? this.getIsqforMCAT() :''}
                </div>
            </div>
            <button className="fillbtn bgmim clrw pd10 bdrmim bxrd4 bxsdw fs17 w100"
                onClick={() =>
                    requestAnimationFrame(() =>setTimeout(() => {
                    eventTracking("BLCTA/"+this.props.usermode,"MCAT/"+"Inline-BL/","",0);
                    eventTracking(this.props.ec, `PBR-Inline-Between-Results${this.props.ea}${this.evenOrOdd}`,`${this.props.translated_name ? this.props.translated_name : this.props.searchKey}|BuyleadCTA|IMPCAT|${this.props.usermode}` , true);
                    if((this.props.mcatId == 69543 || this.props.mcatId == 42703 || this.props.mcatId == 84153 || this.props.mcatId == 168563 ||this.props.mcatId == 170577 || this.props.mcatId == 108469 || this.props.mcatId == 174817 || this.props.mcatId == 42705 || this.props.mcatId == 169034 || this.props.mcatId == 175594 ||this.props.mcatId == 68310 || this.props.mcatId == 172377 || this.props.mcatId == 171931 || this.props.mcatId == 173525 || this.props.mcatId == 32057 || this.props.mcatId == 171747 || this.props.mcatId == 168019 || this.props.mcatId == 170602 || this.props.mcatId == 171255 || this.props.mcatId == 175819 ||this.props.mcatId == 168751 || this.props.mcatId == 168851 || this.props.mcatId == 173477 || this.props.mcatId == 41692 || this.props.mcatId == 168850 || this.props.mcatId == 170187 || this.props.mcatId == 174689 || this.props.mcatId == 127555 || this.props.mcatId == 147220 || this.props.mcatId == 172721 || this.props.mcatId == 173133 || this.props.mcatId == 171918) && (!this.props.country_value || this.props.country_value == "" || this.props.country_value == "IN")){
                        window.location.href = "https://shipwith.indiamart.com/book?utm_source=msite&utm_medium=im_impcat&utm_campaign=Inline+BL&afl_id=-901" + "&ref_url="+refUrl;
                    }
                    else {(this.callBl(this.props), localStorage.setItem("ctaClass", "fillbtn bgmim clrw pd10 bdrmim bxrd4 bxsdw fs17 w100"))}
                    },0))}>
                {this.props.translatedText.LABEL28}
                <div className="dib por vam mcatanimateArrow">
                    <div className="mcatarrowSpec mcatarrowSpec-first"></div>
                    <div className="mcatarrowSpec mcatarrowSpec-second"></div>
                </div>
            </button>
        </li>
    )
}
}
export default InlineBl;