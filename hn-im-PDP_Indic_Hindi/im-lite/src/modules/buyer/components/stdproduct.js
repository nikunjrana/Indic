import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import { Link } from 'react-router';
import '../css/stdproductCss.css';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { checkUserMode, checkUserStatus } from '../../../Globals/MainFunctions';

class stdproduct extends Component {
    constructor(props) {
        super(props);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.onloadAPIHIT = this.onloadAPIHIT.bind(this);
        this.scrollWinright = this.scrollWinright.bind(this);
        this.scrollWinleft = this.scrollWinleft.bind(this);
        this.hideCarouselArrows = this.hideCarouselArrows.bind(this);
        this.divOnScreenstd = this.divOnScreenstd.bind(this);
        this.callBl = this.callBl.bind(this);
        this.callBLReact = this.callBLReact.bind(this);
        this.firePDPTracking = this.firePDPTracking.bind(this)
    }

    callBl(name,imgurl) {
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var obj = {};
        obj.product_name = name;
        obj.product_image=imgurl;
        obj.R_custtype_weight = "";
        obj.affiliation_id = '-133';
        obj.query = '';
        obj.query_text = 'standard-product-Click|' + langSelection;
        obj.modid = 'IMOB';
        obj.enqconv = 'on';
        obj.int_rec = '1';
        window.showEnquiryForm(obj);

        return;

    }
    
    callBLReact(name,imgurl, cABTestPDP='') {
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var obj = {};
        obj.prNtFndName = '';
        obj.CEF_form_type = '';
        obj.CefProdType = '';
        obj.R_custtype_weight = "";
        obj.affiliationId  = '-133';
        obj.mcatId  = '';
        obj.productName = name;
        obj.query = '';
        obj.queryText = 'standard-product-Click|' + langSelection + (window.pagename && window.pagename=="PDP" && window.TestIdArr && window.TestIdArr.length>0 ? "|"+window.TestIdArr.join("|"):"") + cABTestPDP+(window.pagename && window.pagename=="PDP"?this.props.track:'');
        obj.modid = 'IMOB';
        obj.productImage=imgurl;
        obj.isEnquiry=false;
        obj.ctaName='कोटेशन प्राप्त करें';
        obj.page= 'PDP';
          this.props.showModal(obj);
    }

    componentDidMount() {
        this.onloadAPIHIT();
    }
    componentDidUpdate() {
        document.getElementById('standard-carousel') ? document.getElementById('standard-carousel').addEventListener("scroll", this.hideCarouselArrows) : '';
    }
    onloadAPIHIT() {
        //if(this.glid)
        var std_mcat = '';
        var mcatids = this.props.mcatid.split(",");
        for (var i = 0; i < mcatids.length; i++) {
            if (mcatids[i] != ' ' && mcatids[i] != '') { std_mcat += mcatids[i] + ','; }
        }
        std_mcat = std_mcat.slice(0, -1);
        this.props.getstdproducts(std_mcat, this.props.counter);
    }
    scrollWinright() { var sCroll = document.getElementById("standard-carousel"); sCroll.scrollBy(((window.screen.width * 3) / 4) + 15, 0); }
    scrollWinleft() { var sCroll = document.getElementById("standard-carousel"); sCroll.scrollBy(-(((window.screen.width * 3) / 4) + 15), 0); }


    hideCarouselArrows() {
        this.divOnScreenstd(document.getElementsByClassName("itemFirststd")) ? document.getElementById("leftarrowstdCarousel").style.display = "none" : document.getElementById("leftarrowstdCarousel").style.display = "block";
        this.divOnScreenstd(document.getElementsByClassName("itemLaststd")) ? document.getElementById("rightarrowstdCarousel").style.display = "none" : document.getElementById("rightarrowstdCarousel").style.display = "block";
    }
    divOnScreenstd(b) {

        var a = $(window);
        var c = $(b);
        var o = {
            top: a.scrollTop(),
            left: a.scrollLeft()
        };
        o.right = o.left + a.width();
        o.bottom = o.top + a.height();
        var f = (b) ? $(b).offset() : '';
        return (f && f != '') && !(!f.top || !f.left) && (f.right = f.left + c.outerWidth(),
            f.bottom = f.top + c.outerHeight(),
            !(o.right < f.left || o.left > f.right || o.bottom < f.top || o.top > f.bottom))
    }
    firePDPTracking(category, action, label, cABTestPDP='') {
        if(window.pageName && window.pageName == "PDP" ) {
            let loginModeArray = ["-Unidentified", "-Identified", "-FullyIdentified"];
            let status = checkUserStatus();
            action+=(status>=0 && status<=2 ? loginModeArray[status] : "");
            action+= cABTestPDP;
        }
        eventTracking(category, action, label, true);
    }

    render() {
        var res = '';
        var listitems = '';
        let TrackPage = this.props.page + '-Page-PWA-Clicks';
        let label = '';
        let cABTestPDP= this.props.cABTestPDP? this.props.cABTestPDP:'';
        let glid = getCookieValByKey("ImeshVisitor","glid");
        let multi_purpose = localStorage.getItem("multi_purpose") ? JSON.parse(localStorage.getItem("multi_purpose")) : "";
        if (this.props.page == 'Home')
            label = 'IMOB_ProductDetail'
        if (this.props.stdproducts.hasOwnProperty('SID_RLTD_PRD') && this.props.stdproducts['SID_RLTD_PRD'].length > 0) {
            res = this.props.stdproducts['SID_RLTD_PRD'];
            listitems = res.map((items, index) => {
                const stdurl = 'https://' + window.location.host + '/' + items.GL_SID_VARIANT_URL;
                const imgurl = items.GL_SID_VARIANT_IMAGE.replace(/http:/i, 'https:');
                return (<li className={`${this.props.isContnr125?'h245 ':'h220 '}  w40 dib por gcnt mt5 mb5 bgw fs15 mr10  tc  vat` + (index == 0 ? 'itemFirststd' : (index == res.length - 1 ? 'itemLaststd' : ''))} >
                    {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={stdurl} class="pdt4 pdb10 pdl5 pdr5 db tc">

                        <div class="dib" onclick={() => eventTracking('Product-Page-Clicks', 'Standard-Product-Listing', 'listing' + (index + 1), true)}>
                            <span className={`${this.props.isContnr125?'ht125 ':'h100 '} tc dtc vam w40 lazy`}>
                            <div className={`${imgurl && imgurl.includes(".png")?"":"bgimg"}`}>
                                <img src={imgurl} alt={items.GL_SID_VARIANT_NAME} loading="lazy" width="100" height="100" className={`${this.props.isContnr125?'mnW125 mnH125 ':''} mxhw100 objctFitSclDown`} />
                            </div>
                            </span>
                        </div><div class="clr33 lh18 whNr fs13 oh fadElip por eelpst h55">{items.GL_SID_VARIANT_NAME}</div></Link> : <a href={stdurl} class="pdt4 pdb10 pdl5 pdr5 db tc" onClick={(event) => { window.location.href=(stdurl); event.preventDefault();}}>

<div class="dib" onclick={() => eventTracking('Product-Page-Clicks', 'Standard-Product-Listing', 'listing' + (index + 1), true)}>
    <span className={`${this.props.isContnr125?'ht125 ':'h100 '} tc dtc vam w40 lazy`}>
    <div className={`${imgurl && imgurl.includes(".png")?"":"bgimg"}`}>
        <img src={imgurl} alt={items.GL_SID_VARIANT_NAME} loading="lazy" width="100" height="100" className={`${this.props.isContnr125?'mnW125 mnH125 ':''} mxhw100 objctFitSclDown`} />
    </div>
    </span>
</div><div class="clr33 lh18 whNr fs13 oh fadElip por eelpst h55">{items.GL_SID_VARIANT_NAME}</div></a>}
                    
                    {this.props.pageName=='PDP'? 
                        <a class="dib  clrw pdtb105 fs15 w90 bxrd20 bgmim  fw pdpdpdpdpd" 
                        onClick={() => { this.callBLReact(items.GL_SID_VARIANT_NAME, imgurl, cABTestPDP);
                        this.firePDPTracking('Product-Page-Clicks', 'Standard-Product', 'get_quotes-' + (index + 1)+"|BuyleadCTA|"+this.props.pageName+"|"+checkUserMode() ,cABTestPDP) }}>
                         {this.props.translatedText ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"}</a>
                         : 
                         <a class="dib  clrw pdtb105 fs14 w70 bxrd20 bgmim  fw" 
                         onClick={() => { this.callBl(items.GL_SID_VARIANT_NAME,imgurl);
                          eventTracking('Product-Page-Clicks', 'Standard-Product', 'get_quotes-' + (index + 1)+"|BuyleadCTA|"+this.props.pageName+"|"+checkUserMode(), true) }} >
                              {this.props.translatedText ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"}</a>}
                    

                </li>)



            });
        } else {

        }
        return (<div>
            {listitems != '' ?
                <section id="stdProduct" class="crx fs13 bgw por"><p class="pd10 fw fs17 mxht1000 btmtop mt10 pdt20">
                    <span class="LABEL2_1">{this.props.translatedText ? this.props.translatedText.LABEL2_1 :"Popular in"}</span>
                    <span className="fw ml5 mr5">{this.props.product_name}</span>
                    <span class="LABEL2_2">{this.props.translatedText ? this.props.translatedText.LABEL2_2 : ""}</span></p>
                    <div className={`${this.props.isContnr125? 'h255 ':'h230 '} oh`}>
                        <ul id="standard-carousel" class="crx scWrap pdb10 pdl5">



                            {listitems}

                        </ul>

                        {listitems.length > 2 ? <div>
                            <div class="arrowCarousel-rt z3 poa rt0 fs20 bt0 arTop0 arrCarous dgray arrows" id="rightarrowstdCarousel" onclick={() => { this.scrollWinright(); }} >
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="14" height="14">
                                    <g>
                                        <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" style="fill: white" />
                                    </g>
                                </svg>
                            </div>
                            <div class="arrowCarousel-lft z3 poa lft0 fs20 bt0 arTop0 dn arrCarous arrows dgray" id="leftarrowstdCarousel" onclick={() => { this.scrollWinleft(); }} style="">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xmlSpace="preserve" width="14" height="14">
                                    <g>
                                        <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" style="fill: white" />
                                    </g>
                                </svg>
                            </div></div> : ''}

                    </div>

                </section>
                : ''}
        </div>)
    }
}


export default stdproduct;
