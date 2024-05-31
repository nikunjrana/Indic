import React, { PureComponent } from 'react';
import { eventTracking } from '../../../Globals/GaTracking';
import {enqform,callObj,checkEnquirySent} from '../utility/helpercta';
import { getCookieValByKey,getCookie } from '../../../Globals/CookieManager';
class CtaComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.eventLabel = `Pg-${this.props.listNumber}-${this.props.productIndex}|Display:${this.props.product.dispId}`
        this.ctaName = "सर्वोत्तम मूल्य प्राप्त करें",
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this);
        this.CallClickhandler = this.CallClickhandler.bind(this);
        this.state = {enqsent:false};
    }
    checkEnquiryStatus() {
        this.setState({enqsent:checkEnquirySent(this.props.product.dispId)});
    }
    componentDidMount(){
        document.addEventListener("enquirySent",this.checkEnquiryStatus);
    }
    componentDidUpdate(){
        this.checkEnquiryStatus();
    }
    CallClickhandler(){
        let verfStatus = getCookie("ImeshVisitor")&&getCookieValByKey('ImeshVisitor', 'uv')=='V'?"Verified":"Non-Verified";
        eventTracking("Click-To-Call",this.props.product.compContctVal == "PNS" ? "Clicked-PNS" : "Clicked-NonPNS",this.eventLabel+`|${this.props.usermode}|${verfStatus}`,true)
    }
    
    render() {
        let enqLabel = `|EnquiryCTA|IMPCAT|${this.props.usermode}`
        let ecom_cart_url = this.props.product && this.props.product.ecom_cart_url  ? this.props.product.ecom_cart_url : this.props.product.ecom_landing_url ? this.props.product.ecom_landing_url : '';
        let ecom_store_name = this.props.product && this.props.product.ecom_store_name ? this.props.product.ecom_store_name : "";
        let dbProductName = "";
        const VERNACULAR_ARR = {'hi' : '1', 'en' : '0'}
        if (this.props.tracking.langCookie == VERNACULAR_ARR["hi"]) { dbProductName = this.props.product.pcItemSecondaryName ? this.props.product.pcItemSecondaryName : this.props.product.extraPrdName;
        } else {dbProductName = this.props.product.prdName ? this.props.product.prdName : this.props.product.extraPrdName;}
        return (
        <div id="newMcatCTA" className={this.props.listNumber?"pdt10 pdl5 tc w100 mtauto mb0":""}>
            {ecom_store_name && ecom_cart_url? (
            <>
              <a className="df jc clrw fs14 fw mb5 ml10 mr10 pdb12 pdt12 bxrd20 appLikeCtaG" href={ecom_cart_url} target="_blank" onClick={() => { eventTracking("ECOM_"+ecom_store_name, "Buynow-clicks", this.props.tracking.click + "-Page-Clicks" + "|GLID="+this.props.product.glId, true) }} >
                <i className="buyicn dib vam mr5 pdr14 pdb14"></i>
                Buy Now
              </a>
              <p className="tc fs11 clr5a">You will be redirected to the 3rd party webstore</p>
            </>
        ) 
        :
        (<>
        {this.props.product && this.props.product.compContct?
            <a href={'tel:'+this.props.product.compContct}><span id = {'McatCallprod_'+this.props.productIndex} className= {`${this.state.enqsent?"df jc ml10 mr10 bgmim bxrd20":"bdrmim clrmim fl tc bgw w47 ml5 mb1 bxrdNR"} pdb12 pdt12 ht42 fs14 fw`} onClick={(e)=>{this.props.callNowClick(callObj(this.props.product,this.props.mcatId, this.props.mcatName, this.props.tracking, this.props.isqTracking, this.props.lastgadigit, this.props.productIndex, this.props.utmText)); eventTracking(this.props.tracking.click, `Call-Now`, this.eventLabel, 1); this.CallClickhandler() }} >
              <i className={`${this.state.enqsent?"callIcnNAB":"callIcnN"} mr5 dib vam objctFitSclDown`} width="14" height="14"></i>
              <span className={this.state.enqsent?"dib clrw":"clrmim"}>कॉल करें</span>
              {this.props.product && this.props.product.compContct? <span id="pns1" className="dn">{this.props.product.compContct}</span> :''}
            </span></a> : ""}
            {/* {<span id="dispdesktop" class="dib dn tc clrw fw ht42 ripple fs14 pdb10 pdt12 w48 appLikeCtaG appLikeCtaGBrd"><i class=" whatsAppIcn vam dib mr5"><img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" class="poa whatsAppIcnpos" alt="WhatsApp Icon"/></i><span class="pdl5">get best price</span></span>} */}

            {
            <a  id={`whtsp_${this.props.productIndex}`} class="dib tc clrw fw ht42 ripple fs14 pdb10 pdt10 w48 appLikeCtaG appLikeCtaGBrd" href={`https://api.whatsapp.com/send/?phone=+919696969696&text=नमस्ते ${this.props.companyName}, क्या मैं ${this.props.productname} के लिए बेस्ट प्राइज पा सकता हूँ? ${this.props.pdpurl}&type=phone_number&app_absent=0`}><i class=" whatsAppIcn vam dib mr5"><img src="https://m.imimg.com/gifs/img/whatsapp-icon.svg" class="poa whatsAppIcnpos" alt="WhatsApp Icon"/></i><span class="pdl5">WhatsApp करें</span></a>
            }
            </>
            )}
        </div>);
    }
}

export default CtaComponent;