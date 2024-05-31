import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import LazyLoad from 'react-lazy-load';
import styles from "../../../Globals/imageCss";
import CallNow from '../container/callNowWidgetContainer';

import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking, gaTrack } from '../../../Globals/GaTracking';
import { service_link } from '../../../Globals/MainFunctions';
import { getPrice } from '../../../Globals/priceModification';

import { Link } from 'react-router';

class products extends Component {
    constructor(props) {
        super(props);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.callUntillDefined = this.callUntillDefined.bind(this);
        this.removed = this.removed.bind(this);
        this.handler = this.handler.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.tracksprods = this.tracksprods.bind(this);
    }


    componentWillUnmount() {
        this.removed();
    }

    componentDidMount() {
        window.addEventListener('load', this.getProducts(), {passive:true});
        (this.props.syncService) ? this.setState({ syncService: this.props.syncService }) : '';
        this.tracksprods();
    }

    getProducts() {
        var count = 0;
        var len = 0;
        var serviceCount = 0, localCount = 0;
        var pr = '';
        var mcats = '';
        if (this.props.page == 'Home')
            count = 10;
        else
            count = 8;

        if (localStorage.getItem("recentMcats") && localStorage.getItem("recentMcats").length > 0) {
            var recentMcats = JSON.parse(localStorage.getItem("recentMcats"));
        }

        if (localStorage.getItem("prodsViewed") && localStorage.getItem("prodsViewed").length > 0) {
            var localProdsViewed = JSON.parse(localStorage.getItem("prodsViewed"));
        }

        if (recentMcats && localStorage.getItem("recentMcats").length > 0 && localProdsViewed && localProdsViewed.length > 0) {
            serviceCount = count - localProdsViewed.length;
        } else if (localProdsViewed == null) {
            serviceCount = count;
        } else if (!recentMcats && localStorage.getItem("recentMcats").length == 0) {
            serviceCount = 0;

        }

        if (serviceCount && recentMcats) {
            var len = 0;
            if (recentMcats.length > 4) {
                len = 4;
            }
            else {
                len = recentMcats.length;
            }
            mcats = '';
            for (var i = 0; i < len; i++) {
                if (recentMcats[i].mcatid != '') {
                    mcats = mcats + "," + recentMcats[i].mcatid;
                }
            }
            mcats = mcats.substr(1);
        }

        if (serviceCount > 0 && localProdsViewed && localProdsViewed.length < (count + 1)) {
            localCount = localProdsViewed.length;
        }
        else {
            localCount = count;
        }



        this.setState({ serviceCount: serviceCount, localCount: localCount });


        if (serviceCount > 0 && !this.props.relData) {
            this.props.getproducts('IMOB', mcats, serviceCount);
        }
    }
    removed() {
        window.removeEventListener('scroll', this.handler, false);
    }

    handler() {
        var trck_param = '', trck_param_category;

        if (this.glid) {
            trck_param = '';
        }
        else {
            trck_param = 'u_';
        }
        var prV = (localStorage.getItem("prodsViewed") && localStorage.getItem("prodsViewed").length > 1) ? JSON.parse(localStorage.getItem("prodsViewed")) : [];

        if (prV.length > 0) {
            trck_param_category = '';
        }
        else {
            trck_param_category = '';
        }
        var newThis = this;
        var int = document.getElementById("prodsViewedSection");
        var margin = 200;
        newThis.remove = false;
        if (int) {
            newThis.bound = int.getBoundingClientRect();
            if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin))) {
                setTimeout(function () {
                    if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin)) && !newThis.remove) {
                        newThis.remove = true;
                        gaTrack.trackEvent(['w3_recently_viewed' + trck_param_category, trck_param + 'display_impression', 'IMOB_' + newThis.props.page, 0, false])
                        newThis.removed();
                    }
                }, 3000)
            }
        }

    }
    tracksprods() {

        this.handler();
        window.addEventListener("scroll", this.handler, {passive:true});

    }
    componentWillReceiveProps(nextProps) {
        (nextProps.syncService) ? this.setState({ syncService: nextProps.syncService }) : '';
        if (this.props.updateprops != nextProps.updateprops || this.props.loginProps != nextProps.loginProps) {
        }

    }

    callUntillDefined(mcatid, id, price, company, s_id, name, e, trck_param_category, enqType, img) {
        let disableBtn, enqDivId, priceClickTrack = '';
        switch (enqType) {
            case 'PRICE_REQUESTED':
                enqDivId = 'dispid' + id + 'pr';
                disableBtn = disableEnqBtn2;
                break;
            case 'PRICE_CLICKED':
                enqDivId = 'pp' + id;
                disableBtn = disableEnqBtn2;
                priceClickTrack = 'pp';
                break;
            default:
                enqDivId = 'dispid' + id;
                disableBtn = disableEnqBtn;

        }
        if (window.navigator.onLine == false) {
            document.getElementById("offline_span").innerHTML = "It seems you are offline. Tap कॉल करें to call this seller for the best price";
            document.getElementById("offline_pop").style.bottom = "60px";
            document.getElementById("offline_pop").style.display = "block";
            eventTracking('PWA_' + page + '_Offline', 'Offline_Message_Viewed', 'Enq_Offline_Clicks', true);
            setTimeout(function () {
                document.getElementById("offline_pop").style.display = "none";
                document.getElementById("offline_pop").style.bottom = "45px";
                document.getElementById("offline_span").innerHTML = "You seems to be offline";
            }, 6000)
        }
        else {
            var querytxt;
            var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
            if (this.glid) {
                querytxt = this.props.page && this.props.page == 'product-detail' ?
                    (this.props.widgetCalled) == 'fullPDP' ? 'product-detail-rcv-I|' + langSelection
                        : 'product-detail-rcv-I|' + langSelection
                    : document.getElementById('page_name').value + '-rcv-I' + trck_param_category + priceClickTrack + '|PWA';
            }
            else {
                querytxt = this.props.page && this.props.page == 'product-detail' ? 'product-detail-rcv-U|' + langSelection : document.getElementById('page_name').value + '-rcv-U' + trck_param_category + priceClickTrack + '|PWA'
            }

            callUntillDefined('showEnquiryForm', 0, 50, [{ 'enq_mcat_id': mcatid, 'enquiryDivId': enqDivId, 'enq_sent_color': disableBtn, 'enq_item_price': price, 'CefProdType': '', 'query': '', 'company': company, 'formType': 'overlay', 'query_text': querytxt, 'R_glusr_id': s_id, 'R_custtype_weight': '', 'R_title': name, 'enqConv': 'on', 'int_rec': '1', 'modid': 'IMOB', 'displayId': id, 'traffic_source': '', 'product_image': img, 'cta_name': 'Send Enquiry' }])

        }
    }

    render() {
        var res = '';
        var listitems = '';
        var listitems_service = '';
        var listitems_local = '';

        var head = '';
        // head = 'Based on your browsing history';
        // head = 'Your recently viewed products';
        head = (this.glid) ? (this.props.page == 'Home') ? this.props.translatedText != undefined ? this.props.translatedText.WID_RECENT_HEADING2 : 'आपके लिए प्रोडक्ट्स' : this.props.translatedText.WID_RECENT_HEADING2
            : (this.props.page == 'Home') ? this.props.translatedText != undefined ? this.props.translatedText.WID_RECENT_HEADING2 : 'आपके लिए प्रोडक्ट्स' : this.props.translatedText.WID_RECENT_HEADING1;
        var classes = 'dn';
        var count = 0;
        var len = 0;
        var page = this.props.page;
        var trck_param = '', trck_param_category = '';
        var pr = '';
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        if (this.props.page == 'Home') {
            var call_txt = (this.props.page) == "product-detail" ? "product_detail_recently_viewed_PWA|" + langSelection : 'home-rcv';
        }
        else if (this.props.page == 'Search') {
            var call_txt = (this.props.page) == "product-detail" ? "product_detail_recently_viewed_PWA|" + langSelection : 'Search-rcv';

        } else if (this.props.page == 'product-detail') {
            var call_txt = (this.props.page) == "product-detail" ? "product-detail-recently-viewed|" + langSelection : 'home-rcv';
        }
        if (this.glid) {
            trck_param = '';
        }
        else {
            trck_param = 'u_';
        }


        // Here is the view for data from local
        if ((localStorage.getItem("prodsViewed") && localStorage.getItem("prodsViewed").length > 1)) {
            var prV = (localStorage.getItem("prodsViewed") && localStorage.getItem("prodsViewed").length > 1) ? JSON.parse(localStorage.getItem("prodsViewed")) : [];

            //var pr = prV.concat(prB);

            if (prV.length > 0) {
                pr = prV;
                trck_param_category = '';
            }
            else {
                // pr = prB;
                trck_param_category = '';
            }
            
            (this.props.page != 'Home' && this.props.page != 'product-detail') ? getCookie("lang") == "1" ? trck_param_category += "|langHi" : trck_param_category += "|langEn" : '';

            if (this.state.localCount) {

                listitems_local = pr ? pr.map((items, index) => {
                    while (index < this.state.localCount && (this.props.page !== "product-detail"  || (this.props.page == "product-detail" && items['display_id'] != this.props.dispId))) {
                        let imgurl = (items.image) ? items.image : "https://m.imimg.com/gifs/background_image.jpg";
                        imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                        imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                        imgurl = imgurl.replace('http://', 'https://');


                        let callProps = { im_popup: 'im_popup', CONTACT_NUMBER: items.contactnumber, glusrid: items.R_glusr_id, CONTACT_TYPE: items.contactnumber_type, mbgn_askpopup: 'mbgn_askpopup', call_txt: 'call_txt', contact_no: 'contact_no', itemId: items.mcatid, mcatname: items.name, translatedText: this.props.translatedText, compname: items.company_name, pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '', prodcss: 1, dbpagetrack: call_txt, widgetTrackCatg: 'w3_recently_viewed' + trck_param_category, widgetTrack: trck_param + 'cta_button_callnow', widgetTrackPage: 'IMOB_' + page };

                        const companyurl = (items.website_url) ? items.website_url : '';
                        const companydata = (items.website_url) ? <p className="tc fs12 pdt5 clr7B">Sold by<br /><a href={items.website_url} onClick={() => { eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_cmpny_nme', 'IMOB_' + page, true); }} className="fs13 clrBl db txtElip pdl5 w100 pdr5" >{items.company_name}</a></p> : <p className="fw pdt5 txtElip">{items.company_name}</p>;
                        return (
                            <li className={page == 'product-detail' ? "w50 fl bdrBed bdrLtOdd" : "w50 fl"}>

                                <div className={page == 'product-detail' ? "pd10 por mnH335 bdRLted mr10 tc" : "pd10 por mnH335 bdRLted mt10 mr10 tc bdrBed bdrLtOdd bxdw2 brd5 bgw"}>
                                    <div className="ht125px dib oh">
                                        <Link className="dtc vam ht125px" to={items.url} onClick={() => eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_prdimage', 'IMOB_' + page, true)}>
                                            <LazyLoad throttle={10} offsetVertical={300}>
                                                <img className="favImg" alt={items.name} src={imgurl}></img>
                                            </LazyLoad>
                                        </Link>
                                    </div>
                                    <p className="crb"></p>
                                    <a href={items.url} onClick={() => eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_prdname', 'IMOB_' + page, true)} className="tc clrBl db fs15 pdt10 mb10 txtElip">{items.name}</a>

                                    {(items.price && items.currency) ?
                                        <p id={"pp" + items.display_id} className="clr33 tc fs16 fw txtElip notranslate" onClick={(e) => {
                                            if (!e.target.getAttribute('data-priceClicked')) {
                                                eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_price', 'IMOB_' + page, true);
                                                this.callUntillDefined(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, e, trck_param_category, 'PRICE_CLICKED', imgurl)
                                            }
                                        }}><i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>{getPrice(parseFloat(items.price), '', items.unit)}</p> :
                                        <p id={"prcid" + items.display_id + "pr"} className="clrBl tc fs16 fw txtElip" onClick={(e) => {
                                            if (e.target.innerHTML !== "Price Requested") {
                                                eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_price_request', 'IMOB_' + page, true), this.callUntillDefined(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, e, trck_param_category, 'PRICE_REQUESTED', imgurl)
                                            }
                                        }}>
                                            लेटेस्ट रेट पाएं</p>

                                    }
                                    {companydata}


                                    <div className="poa tc w100 bt10 lft0">


                                        {/* <div onClick={()=>{eventTracking('w3_recently_viewed'+trck_param_category,trck_param+'cta_button_callnow','IMOB_'+page,true);askNumber('im_popup', items.filter_contact_no , items.R_glusr_id, items.contactnumber_type, 'mbgn_askpopup',call_txt && call_txt!= '' ? call_txt: page+'-recently-viewed'+trck_param_category+'|PWA', 'contact_no', items.display_id, items.name);}} className="dib bxsdw bxrd20 pdb7 pdt7 fw fs14 bdrmim clrw w80 mb10 compCl">
                                <i className="mim_bg mcallIco wh15 dib vam mr5"></i>{(this.props.page == 'Home') ?  this.props.translatedText!=undefined ? this.props.translatedText.HEADER_BTN_1 :   'कॉल करें':this.props.translatedText.HEADER_BTN_1 }</div> */}

                                        <CallNow  {...callProps} />


                                        <div id={"dispid" + items.display_id} onClick={(e) => { this.callUntillDefined(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, e, trck_param_category, '', imgurl); eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_button_getquotes', 'IMOB_' + page, true); }} className={this.props.page == 'product-detail' ? "dib bxsdw bxrd20 clrw pdt10 pdb10 compBl fs14 w80" : "dib bxsdw clrw pdb7 pdt7 bgmim fs14 w80 bxrd20 compBl fw"}>
                                            {this.props.page == 'product-detail' ? <i class="enqIcn dib vam mr2"></i> : ''}

                                            {this.props.translatedText != undefined ? this.props.translatedText.HEADER_BTN_4 : "Send Enquiry"}</div>



                                    </div>
                                </div>
                            </li>
                        )
                    }
                }) : '';
            }
            classes = "oh mt10 mb10 brd5 pdb10 pl10";
        }
        // Here is the view for data from service
        if (this.state.serviceCount > 0 && ((this.props.get_products.hasOwnProperty('RECOMMENDED DATA') && this.props.get_products['RECOMMENDED DATA'].length > 0) || (this.props.relData && this.props.relData.response['RECOMMENDED DATA'] && this.props.relData.response['RECOMMENDED DATA'].length > 0))) {

            if(this.props.relData && this.props.relData.response['RECOMMENDED DATA'])
            res = this.props.relData.response['RECOMMENDED DATA'];
            else
            res = this.props.get_products['RECOMMENDED DATA'];
            var type;
            head = (this.props.page == 'Home') ? this.props.translatedText != undefined ? this.props.translatedText.WID_RECENT_HEADING2 : 'आपके लिए प्रोडक्ट्स' : this.props.translatedText.WID_RECENT_HEADING2;
            (((pr.length + res.length) % 2) != 0) ? res.pop() : '';
            listitems_service = res.map((items, index) => {
                let contact_number = items.CONTACT_NUMBER ? items.CONTACT_NUMBER : '';
                let items_id = items.DISPLAY_ID
                let contact_type = items.CONTACT_TYPE
                let company_name = items.COMPANYNAME
                let mcatid = items.MCAT_ID
                let iil_display_flag = items.IIL_DISPLAY_FLAG
                let item_name = items.ITEM_NAME
                let dir_url = items.URL
                let image_125x125 = items.IMAGE_125X125
                let website_url = items.COMPANY_URL
                let s_id = items.GLUSR_ID
                let price = items.PRICE
                let currency = items.CURRENCY
                let unit = items.PRD_SEARCH_MOQ_UNIT_TYPE
                let image = items.IMAGE_250X250

                let callProps = { im_popup: 'im_popup', CONTACT_NUMBER: contact_number, glusrid: s_id, CONTACT_TYPE: contact_type, mbgn_askpopup: 'mbgn_askpopup', call_txt: 'call_txt', contact_no: 'contact_no', itemId: mcatid, mcatname: name, translatedText: this.props.translatedText, compname: company_name, pagename: document.getElementById("page_name") ? document.getElementById("page_name").value : '', prodcss: 1, dbpagetrack: call_txt, widgetTrackCatg: 'w3_recently_viewed', widgetTrack: trck_param + 'cta_button_callnow', widgetTrackPage: 'IMOB_' + page };

                while (index < this.state.serviceCount) {

                    var numb;
                    if (contact_number.length == 13) { numb = '+91' + contact_number.substring(3); type = 'MOBILE'; } else { numb = '+91' + contact_number; type = 'PNS'; }
                    const url = (iil_display_flag == 1) ? service_link(item_name, items_id) : "https://" + window.location.hostname + '/isearch.php?s=' + dir_url.substring(dir_url.indexOf('=') + 1);
                    let imgurl = (image_125x125) ? image_125x125 : (image) ? image : "https://m.imimg.com/gifs/background_image.jpg";
                    imgurl = imgurl.replace('imghost.indiamart.com', '1.imimg.com');
                    imgurl = imgurl.replace('imghost1.indiamart.com', '2.imimg.com');
                    imgurl = imgurl.replace('http://', 'https://');
                    const companyurl = (website_url && !website_url.match("indiamart")) ? 'https://' + window.location.hostname + '/company/' + s_id : (website_url && website_url.match("indiamart")) ? (website_url.match("http:")) ? website_url.replace('http://www.indiamart.com', 'https://' + window.location.hostname) : website_url.replace('https://www.indiamart.com', 'https://' + window.location.hostname) : '';
                    const companydata = (companyurl) ? <p className="tc fs12 poa w100 bt95 lft0 clr7B">Sold by<br /><a onClick={() => { eventTracking('w3_recently_viewed', trck_param + 'cta_click_cmpny_nme', 'IMOB_' + page, true); }} href={companyurl} className="fs13 clrBl db txtElip pdl5 w100 pdr5" >{company_name}</a></p> : <p className="fw poa w100 bt95 lft0 pdl5">{company_name}</p>

                    return (
                        <li className={page == 'product-detail' ? "w50 fl bdrBed bdrLtOdd" : "w50 fl"} key={index}>
                            <div className={page == 'product-detail' ? "pd10 por mnH335 bdRLted mr10 tc" : "pd10 por mnH335 bdRLted mt10 mr10 tc bdrBed bdrLtOdd bxdw2 brd5 bgw"}>
                                <div className="ht125px w125p dib oh">

                                    <Link className="dtc vam ht125px" onClick={() => eventTracking('w3_recently_viewed', trck_param + 'cta_click_prdimage', 'IMOB_' + page, true)} to={url}>
                                        <LazyLoad throttle={10} offsetVertical={300}>
                                            <img className="favImg" alt={item_name} src={imgurl}></img>
                                        </LazyLoad>
                                    </Link>


                                </div>

                                <a href={url} onClick={() => eventTracking('w3_recently_viewed', trck_param + 'cta_click_prdname', 'IMOB_' + page, true)} className="tc clrBl db fs15 pdt10 mb10 txtElip">{item_name}</a>
                                {(price && currency) ?
                                    <p id={"pp" + items_id} className="clr33 tc fs16 fw txtElip" onClick={(e) => {

                                        if (!e.target.getAttribute('data-priceClicked')) {
                                            eventTracking('w3_recently_viewed' + trck_param_category, trck_param + 'cta_click_price', 'IMOB_' + page, true);
                                            this.callUntillDefined(mcatid, items_id, price, company_name, s_id, item_name, e, trck_param_category, 'PRICE_CLICKED', imgurl)
                                        }
                                    }}><i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>{getPrice(parseFloat(price), '', unit)}</p> :
                                    <p id={"prcid" + items_id + "pr"} className="clrBl tc fs16 fw txtElip" onClick={(e) => {
                                        if (e.target.innerHTML !== "Price Requested") {
                                            eventTracking('w3_recently_viewed', trck_param + 'cta_click_price_request', 'IMOB_' + page, true), this.callUntillDefined(mcatid, items_id, price, company_name, s_id, item_name, e, trck_param_category, 'PRICE_REQUESTED', imgurl)
                                        }
                                    }}>लेटेस्ट रेट पाएं</p>
                                }

                                {companydata}
                                <div className="poa tc w100 bt10 lft0">


                                    {/* <div onClick={()=>{eventTracking('w3_recently_viewed',trck_param+'cta_button_callnow','IMOB_'+page,true);askNumber('im_popup', numb, items.s_id, type, 'mbgn_askpopup', call_txt && call_txt!= '' ? call_txt : page+'-recently-viewed'+trck_param_category+'|PWA', 'contact_no', items.id, items.name);}} className="dib bxsdw bxrd20 pdb7 pdt7 fw fs14 bdrmim clrw w80 mb10 compCl">
<i className="mim_bg mcallIco wh15 dib vam mr5"></i>{(this.props.page == 'Home') ? this.props.translatedText!= undefined ? this.props.translatedText.HEADER_BTN_1 : 'कॉल करें':this.props.translatedText.HEADER_BTN_1 }</div> */}

                                    <CallNow  {...callProps} />




                                    <a id={"dispid" + items_id} className={this.props.page == 'product-detail' ? "dib bxsdw bxrd20 clrw pdt10 pdb10 compBl fs14 w80" : "dib bxsdw clrw pdb7 pdt7 bgmim fs14 w80 bxrd20 compBl fw"} onClick={(e) => { if (e.target.innerHTML !== "Enquiry Sent") { this.callUntillDefined(mcatid, items_id, price, company_name, s_id, item_name, e, trck_param_category, '', imgurl); eventTracking('w3_recently_viewed', trck_param + 'cta_button_getquotes', 'IMOB_' + page, true); } }}>
                                        {this.props.page == 'product-detail' ? <i class="enqIcn dib vam mr2"></i> : ''}
                                        {this.props.translatedText != undefined ? this.props.translatedText.HEADER_BTN_4 : "Send Enquiry"}</a>


                                </div>
                            </div>
                        </li>)
                }
            });
        }
        page == 'product-detail' ? classes = "oh mt10 mb10 brd5 pdt10 pl10 pdb10 bgw" : classes = "oh mt10 mb10 brd5 pl10 pdb10";
        if (listitems_local || listitems_service) {
            return (
                <div id="prodsViewedSection" className={classes}>
                    <p className={page == 'product-detail' ? 'fs18 fw clrb pdt10 pdb10 bdrBed' : "fs18 fw clrb pdt10 pdb10"}>{head}</p>
                    <ul className="crx" id="productsViewed">{listitems_local}{listitems_service}</ul>
                </div>
            )
        }

    }
}


export default products;

