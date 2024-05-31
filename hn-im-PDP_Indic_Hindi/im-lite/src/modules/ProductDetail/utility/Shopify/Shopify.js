import React, { Component } from 'react';
import { eventTracking } from '../../../../Globals/GaTracking';
// import './Shopify.css';
class Shopify extends Component {
constructor(props) {
    super(props);
}

    createShopifyCTA(){
        let cABTestPDP= this.props.cABTestPDP?this.props.cABTestPDP:'';
        let PdpData= this.props.pdpData?this.props.pdpData:'',
        Ecom_store_name= this.props.pdpData && this.props.pdpData.ECOM_STORE_NAME? this.props.pdpData.ECOM_STORE_NAME:'',
        isEcomURL= PdpData&&PdpData.ECOM_CART_URL? PdpData.ECOM_CART_URL : PdpData && PdpData.ECOM_ITEM_LANDING_URL? PdpData.ECOM_ITEM_LANDING_URL:'',
        displayId= PdpData?PdpData.PC_ITEM_DISPLAY_ID? PdpData.PC_ITEM_DISPLAY_ID:'':'',
        isZoom= this.props.isZoom? this.props.isZoom:false,
        clickedFrom = this.props.ClickedFrom?this.props.ClickedFrom: isZoom?'ImageZoom':'FirstFold',
        shopifyCTA='';

        let gl_id =(this.props.pdpData?(this.props.ClickedFrom=="Related-Products"?(this.props.pdpData.GLUSR_ID?this.props.pdpData.GLUSR_ID:""):(this.props.pdpData.GLUSR_USR_ID?this.props.pdpData.GLUSR_USR_ID:"")):"")

        shopifyCTA= (<div className={this.props.cta=="ShopNow"?'fs16 tdu clr6 cp df aic':this.props.calledFrom ?`btn_enq w100 b0 bgw pdt10 pdb5 pdl10 pdr10 ${this.props.prodDescFlag || this.props.companyInfoFlag?'pf':''}`:'w100'} id={displayId}><a href={isEcomURL} onClick={() => {eventTracking("Product-Page-Clicks"+"|Ecom_"+Ecom_store_name, `${clickedFrom=="Related-Products"?clickedFrom + cABTestPDP :"BuyNow-"+ clickedFrom + cABTestPDP}`, gl_id, true)}} target="_blank"><button className={this.props.cta=="ShopNow"?'fs16 tdu bgw pdt5 pdb12':`${this.props.isABtst? 'bgmim ':'shopifyBtn ' }  tc bxrd20 fs14 clrw pdt10 pdb10 w100 fw`}>
        {this.props.cta=="ShopNow"?
        <i className="shopNowIcon"></i>
        :<i className="lockIcon"></i>}
        {this.props.cta=="ShopNow"?"Shop Now":"Buy Now"}
        </button></a>
        {this.props.cta=="ShopNow"?'':<p className="msg3rdParty tc pdt10">You will be redirected to a 3rd party webstore</p>}</div>);

        return shopifyCTA;
    }
    render(){ return this.createShopifyCTA(); }

}
export default Shopify;