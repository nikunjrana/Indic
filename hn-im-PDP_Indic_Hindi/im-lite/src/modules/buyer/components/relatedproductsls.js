import React, {Component} from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import LazyLoad from 'react-lazy-load';
import styles from "../../../Globals/imageCss";
import CallNow from '../container/callNowWidgetContainer';

import {getCookie, getCookieValByKey} from '../../../Globals/CookieManager';
import {eventTracking} from '../../../Globals/GaTracking';
import {getPriceWithoutCurrency} from '../../../Globals/priceModification';
import {pns_prefix} from '../../../Globals/pnsModification';
import {service_link} from '../../../Globals/MainFunctions';
class RelatedProductsLS extends Component {
    constructor(props) {
        super(props);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        var self = this;
        this.callUntillDefined = this.callUntillDefined.bind(this);
        this.ctr_trk=1;
        if(localStorage.getItem('relProds2'))
            this.ctr_trck=2;    
    }

    callUntillDefined(mcatid, eDISPLAY_ID, PRICE, COMPANYNAME, GLUSR_ID, ITEM_NAME, DISPLAY_ID, IMG_URL) {
        var modreftype = 2;
        var page_track = (this.props.page)?this.props.page:'Home'
        var query = "did=" + DISPLAY_ID + "&ctg=&ss=&locality=&modreftype=" + modreftype;
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var query_text = (this.props.page) =="product-detail" ? "product_detail_product_recommended_PWA|"+langSelection : page_track+'-related-products|PWA';
        callUntillDefined('showEnquiryForm', 0, 50, [
            {
                'enq_mcat_id': mcatid,
                'enquiryDivId': 'dispid' + eDISPLAY_ID,
                'enq_sent_color': disableEnqBtn,
                'enq_item_price': PRICE,
                'query': query,
                'company': COMPANYNAME,
                'formType': 'overlay',
                'query_text': query_text,
                'R_glusr_id': GLUSR_ID,
                'R_custtype_weight': '',
                'R_title': ITEM_NAME,
                'enqConv': 'on',
                'int_rec': '1',
                'modid': 'IMOB',
                'displayId': DISPLAY_ID,
                'traffic_source': '',
                'product_image': IMG_URL, 
                'cta_name': 'सर्वोत्तम मूल्य प्राप्त करें'
            }
        ])

    }
    
    addslashes(str){
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '\\"');
        str = str.replace(/\0/g, '\\0');
        return str;
    }

    render() {
        try{
        var listitems = '';
        let recentmcatscount = '';
        let relink_url='';
        let host_link = '';
        let check_for_undefined = '';
        let page_name_track = (this.props.page)?this.props.page:'Home';
        let langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        let call_txt = (this.props.page) =="product-detail" ? "product_detail_product_recommended_PWA|"+langSelection :  self.props.page+'-related-products';
        if (localStorage.getItem('relProds2')) {
            var head = 'Just For you';
            if(this.props.type == 'back')
                head = 'You may also like';
            listitems = JSON.parse(JSON.parse(localStorage.getItem('relProds2')));
            //let looplimit = listitems.length;
            //recentmcatscount = JSON.parse(localStorage.getItem("recentMcats")).length;
            // if(recentmcatscount == 2){
            //   looplimit = 6;
            //    }else if(recentmcatscount > 2){
            //   looplimit = 4;
            //    }
            let looplimit = 5;

            if(listitems.length>0){
            listitems = listitems.slice(0,looplimit).map((items, index) => {
                if(index==0)
                    {
                     
                        head = items.GLCAT_MCAT_NAME;
                     if(items.GLCAT_MCAT_FLNAME){
                        relink_url = 'https://'+window.location.host+'/impcat/'+items.GLCAT_MCAT_FLNAME+".html";    
                        check_for_undefined = items.GLCAT_MCAT_FLNAME
                     }
                     
                    }
                const mcatname = items.ITEM_NAME;
                const CONTACT_TYPE = items.CONTACT_TYPE;
                
                const COMPANYNAME = items.COMPANYNAME;
                var CONTACT_NUMBER = (items.CONTACT_NUMBER.indexOf("+91")>-1)?items.CONTACT_NUMBER:pns_prefix(items.CONTACT_NUMBER);

                var COMPANY_LINK = items.COMPANY_LINK
                    ? items.COMPANY_LINK
                    : items.COMPANY_URL;
                COMPANY_LINK = COMPANY_LINK.replace('http://', 'https://');

                var strLocal = items.SDA_GLUSR_USR_LOCALITY;
                var locality = strLocal.replace("\n", "");
                var localityChk = (locality != null && locality != '')
                    ? locality.substr(0, 70) + ', '
                    : '';
                const Address = localityChk + items.CITY_NAME;

                host_link = service_link(items.ITEM_NAME,items.DISPLAY_ID);

                var price = items.PRICE;
                 if (price) {
                    var PRICEshow = <p className="pdt10 fs16 fw ">
                        <i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>{getPriceWithoutCurrency(parseFloat(price)) + ((items.PRD_SEARCH_MOQ_UNIT_TYPE && items.PRD_SEARCH_MOQ_UNIT_TYPE.trim() != '') ? (' / ' +items.PRD_SEARCH_MOQ_UNIT_TYPE) : '')}
                    </p>;
                }

                var itemId = (items.DISPLAY_ID)?items.DISPLAY_ID:items.ITEM_ID;
                var imgurl = (items.IMAGE_125X125)
                    ? items.IMAGE_125X125
                    : (items.image)
                        ? items.image
                        : "https://m.imimg.com/gifs/background_image.jpg";
                imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                imgurl = imgurl.replace('http://', 'https://');
               
                
                let callProps= {im_popup:'im_popup', CONTACT_NUMBER:CONTACT_NUMBER,glusrid:items.GLUSR_ID, CONTACT_TYPE:CONTACT_TYPE, mbgn_askpopup:'mbgn_askpopup' ,call_txt:'call_txt', contact_no:'contact_no' ,itemId:itemId, mcatname:mcatname, translatedText:this.props.translatedText, compname:COMPANYNAME,  pagename:document.getElementById("page_name").value ,  dbpagetrack:call_txt,  widgetTrackCatg:''+page_name_track+'-Page-Clicks-PWA', widgetTrack :'Related-Products-Section-1', widgetTrackPage:'Call-Now-' + (index + 1)}    ; 

                return (
                    <div>
                        <div className="por bgw mb5 crx bxsdw pd10 brd5 mb10" key={itemId} id={itemId}>
                            <div className="tl w100 por crb">
                                <div className="fl tc ht125px w125p oh">
                                    <a
                                        onClick={() => {
                                        eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1', 'Product-Image-' + index + 1, true)
                                    }}
                                        href={(items.COMPANY)?items.COMPANY_URL:host_link}
                                        className="dtc ht125px w125p vam">
                                        <LazyLoad throttle={10} offsetVertical={300} style={styles.imageCss().bgimg} className="fl tc">
                                        <img className="lazy" src={imgurl} alt={mcatname}/>
                                      </LazyLoad>
                                        </a>
                                </div>

                                <div className="vat pdl130 crx">
                                    <div className="mnht99 tl pdl5">
                                        <p className="pdb7 fs17 por oh lh">
                                            <a className="clr11 wr fadElip maxh40 oh dib"
                                                onClick={() => {
                                                eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1', 'Product-Name-' + index + 1, true)
                                            }}
                                                
                                                href={(items.COMPANY)?items.COMPANY_URL:host_link}>{mcatname}</a>
                                        </p>

                                        <p className="por oh fs14 pdb5">
                                            <a
                                                onClick={() => {
                                                eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1','Company-Name-' + index + 1, true)
                                            }}
                                                href={COMPANY_LINK}
                                                className="clr33 fs14 ellipsis dib">
                                                {COMPANYNAME}</a>
                                        </p>

                                        <p className="por oh fs14 pdb5">
                                            <span className="clr5a ellipsis fl">
                                                <i style={styles.imageCss().mim_bg} className="cLocIn wh13 fl"></i>{Address}</span>
                                        </p>
                                        {PRICEshow}
                                    </div>
                                </div>

                                <div className="por w100 btm0 tc mt10 dib ">



<CallNow  {...callProps}/>
<span
    id={"dispid" + itemId}
    className="fr pdt12 pdb12 w45 clrw mr10 fs14 ripple bxsdw compBl bxrd20 fw"
    onClick={(e) => {
    if (e.target.innerHTML !== "Enquiry Sent") {
        this.callUntillDefined(items.mcatid, items.DISPLAY_ID, items.PRICE, items.COMPANYNAME, items.GLUSR_ID, this.addslashes(items.ITEM_NAME), items.DISPLAY_ID, imgurl);
    };
    eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1', 'Get-Best-Price-' + index + 1, true)
}}><i class="enqIcn vam dib mr5"></i>{this.props.translatedText != undefined ? this.props.translatedText.LISTING_BTN_1 : "सर्वोत्तम मूल्य प्राप्त करें" }</span>

</div>

                            </div>
                        </div>
                    </div>
                )
            })}
        }
        if (localStorage.getItem('relProds2') && JSON.parse(JSON.parse(localStorage.getItem('relProds2'))).length>0) {
            return (
                <div id="recentMcat" className="pd10 rlprodls">
                    <div class="pdb10 pdt10 brd5 pl5">
                    {this.props.translatedText !=undefined ? <div class="fs18">{this.props.translatedText.WID_RECOM_HEADING2}</div> : <div class="fs18">More sellers near you for <a class="tun col2b" href={relink_url} onClick={()=>{eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1','View-All', true)}}><span className="fw">{head}</span></a></div>}
                </div>
                    {listitems}
                    { check_for_undefined && <div><a className="db clr33 pdlr15 fs16 brdD bxrd4 fw bgCce tc pd15 bxsdw" href={relink_url} onClick={()=>{eventTracking(''+page_name_track+'-Page-Clicks-PWA', 'Related-Products-Section-1','View-All', true)}}> 
                    { this.props.translatedText != undefined ?     this.props.translatedText.WID_RECOM_LABEL1 : "View all similar products"} &gt;
                    
            </a></div>}
                </div>
            )
        }
    }catch(err){
        
    }
    }
}
export default RelatedProductsLS;