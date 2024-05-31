import React, { Component } from 'react';
import {Link} from 'react-router';
import { getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking, gaTrack } from '../../../Globals/GaTracking';
import { checkUserMode } from '../../../Globals/MainFunctions';
import {removalTextNodes} from '../../../Globals/translatorPreact/translatorPatch';
class recommendedMcatidentified extends Component {
    constructor(props) {
        super(props);
                this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.onloadHIT = this.onloadHIT.bind(this);
        this.callBl = this.callBl.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal=this.showModal.bind(this);
        this.trackImpId = this.trackImpId.bind(this);
        this.state={showEnqPopup:false,view:''}
        this.prop={};
        this.cABTest = this.props.isABtst && (window.pageName &&window.pageName.toLowerCase().includes('company')||(window.pagename && window.pagename=="PDP"))?this.props.cABTest:'';
        this.applikectahome=this.props.applikectahome&&(window.pageName&&window.pageName.toLowerCase().includes('home'))?this.props.applikectahome:'';
    }
    componentDidUpdate(){
        removalTextNodes();
    }
    componentDidMount() {
        this.onloadHIT();
        this.trackImpId();
        window.addEventListener("scroll", this.trackImpId, {passive:true});
        this.loadEnquiryContainer();   
        // window.addEventListener("touchstart",this.loadEnquiryContainer);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.trackImpId, false);
        // window.removeEventListener("touchstart",this.loadEnquiryContainer);
    }
   
    loadEnquiryContainer(){
        // if(!this.state.view){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module) => {
        //     this.setState({ view: module.default });
        //     // window.removeEventListener("touchstart",this.loadEnquiryContainer);
        // })
        // }
    }
    showModal(prop){
        this.prop=prop;
        this.setState({showEnqPopup:!this.state.showEnqPopup});
    }
    trackImpId() {
        var newThis = this;
        var int = document.getElementById("recomIden");
        var margin = 200;
        let id1=this.glid?this.glid:'';
        newThis.remove = false;
        if (int) {
            newThis.bound = int.getBoundingClientRect();
            if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin))) {
                setTimeout(function () {
                    if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin)) && !newThis.remove) {
                        newThis.remove = true;
                        gaTrack.trackEvent(['w5_recommendations_for_you', 'display_impression_'+'IMOB_' + newThis.props.page+" | "+newThis.props.recommended.length,id1 , 0, false]);
                        window.removeEventListener('scroll', newThis.trackImpId, false);
                    }
                }, 3000)
            }
        }
    }
    onloadHIT() {
        if (this.glid)
            this.props.getrecommendedidentified(this.glid);
    }
    callBl(name, mcatid,page,productImage='') {
        var obj = {};
        obj.productName = name;
        obj.mcatId= mcatid;
        obj.R_custtype_weight = "";
        obj.affiliationId= page.includes('Company')? '-70' :(page.includes('StandardProd') ? "-73" :'-59');
        obj.query = '';
        obj.modid = 'IMOB';
        obj.enqconv = 'on';
        obj.int_rec = '1';
        obj.isEnquiry=false;
        obj.ctaName = 'कोटेशन प्राप्त करें';
        obj.productImage = productImage?productImage:'https://m.imimg.com/gifs/img/prod-img.png';
        obj.queryText=page.includes('StandardProd') ? this.props.queryText : this.props.page + '-page|PWA' + this.cABTest;
        obj.EnqBlForm=this.state.showEnqPopup;
        obj.page = this.props.page;
        obj.internaltrack=this.props.queryText;
        this.showModal(obj);
    }

    render() {
             var times = '', res1 = [];
        var res = this.props.recommended;
                var page = this.props.page;
        if (typeof res != 'undefined' && res.length) {
            if (res.length % 2 == 0) {
                times = res.length;
            } else {
                times = res.length - 1;
            }
            var listitems = '';
            for (let i = 0; i < times; i++) {
                res1[i] = res[i];
            }

            let classes = "fs17 fw clr11 pdt15 pdb15 pdl15 por bdrBR db";
             let id=this.glid?this.glid:'';
            listitems = res1.map((items, index) => {
                const url = items.detail['url'].replace('dir.indiamart.com', 'm.indiamart.com');
                const imgurl = items.detail['image_250'].replace(/http:/i, 'https:');
                return (<li class="w50 fl mnH260  bdrBA " key={index}>
                    <div class="  bgw mnH260 pd10 " >
                            <a class="dt ht160px w160px  ma" onClick={(event) => {window.location.href=(url); eventTracking(page+(this.props.page=="Home"? 'w5_recommendations_for_you | Home-Page-Clicks-PWA':'_w5_recommendations_for_you'), 'RecommendedCategory_cta_click_prdimage','IMOB_' + page, true); event.preventDefault()}} href={url}>                           <span className='dtc ht160px  w160px  vam'>
                                <div className='bgimg ht160px w160px'>
                                    <img class="ht160px  w160px  w160px " loading="lazy" alt={items.detail['fl_name']} src={imgurl}></img>
                                </div>
                                </span>
                                {/* <p class="clrBl db fs15 pdt10 mb10 txtElip" >{items.detail['name']}</p> */}
                            </a>
                        
                        <a className={this.props.page && this.props.page == "product-detail" ?'clr33 db fs15 pdt10 mb10 txtElip ' :"clrBl db fs15 pdt10 mb10 txtElip "} onClick={(event) => { window.location.href=(url); eventTracking(page+(this.props.page=="Home"? 'w5_recommendations_for_you | Home-Page-Clicks-PWA':'_w5_recommendations_for_you'),  'RecommendedCategory_cta_click_prdimage','IMOB_' + page, true); event.preventDefault()}} href={url}> {items.detail['name']}</a>
                        <div onClick={() => { this.callBl(items.detail['name'], items.detail['id'],page,items.detail['image_250']);
                        eventTracking(page+(this.props.page=="Home"? 'w5_recommendations_for_you | Home-Page-Clicks-PWA':'_w5_recommendations_for_you'),  'cta_button_getquotes_'+'IMOB_' + page + this.cABTest,id+(this.props.page=="Home"?'|BuyLeadCTA|Homepage|'+checkUserMode():(this.props.page&&this.props.page=="product-detail"?'|BuyLeadCTA|PDP|'+checkUserMode():this.props.page&&this.props.page=="Company-Home"?'|BuyLeadCTA|'+this.props.page+'|'+checkUserMode():'')) , true) }}>
                            <div class={`${this.props.isABtst||this.applikectahome?'bgmim ':'compCl '} dib bxsdw bxrd20 pdtb105 fw fs15 clrw w88 mb2 `} >{this.props.page == "product-detail" ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"}</div>
                        </div>

                    </div>
                </li>)
            });
            return (<div id="recomIden">
                {this.state.showEnqPopup && this.state.view!=''?<this.state.view closePopup={this.showModal} prop={this.prop}/>:''}
                <ul>
                    <section id="captioned-gallery"  >
                        <h2 className='mxht1000'><span class={classes} >{this.props.page == "product-detail" ? this.props.translatedText.CM_LABEL36 : this.props.page=='Home'?"Recommendations for you" :"Recommended Categories"}</span></h2>
                        < div class="crx tc">
                            {listitems}
                        </div>
                    </section>
                </ul>

            </div>)
        }
    }
}

export default recommendedMcatidentified;


