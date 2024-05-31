import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import LazyLoad from 'react-lazy-load';

import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';

class recentRelatedMcats extends Component {
    constructor(props) {
        super(props);
        this.getMcats = this.getMcats.bind(this);
        this.callBl = this.callBl.bind(this);
        this.trackImp = this.trackImp.bind(this);
        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        self = this;
    }
    componentDidMount() {
        if (this.getMcats() != '' && !this.props.relData)
            this.props.getrecentrelatedmcats(this.getMcats());
        this.getMcats();
        this.trackImp();
        window.addEventListener("scroll", this.trackImp, {passive:true});

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.trackImp, false);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.updateprops != nextProps.updateprops) {
            if (this.getMcats() != '' && !this.props.relData)
                this.props.getrecentrelatedmcats(this.getMcats());

        }

    }


    trackImp() {
        var trck_param = '';
        if (this.glid) {
            trck_param = '';
        }
        else {
            trck_param = 'u_';
        }
        var newThis = this;
        var int = document.getElementById("relatedmcats");
        var margin = 200;
        newThis.remove = false;
        if (int) {
            newThis.bound = int.getBoundingClientRect();
            if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin))) {
                setTimeout(function () {
                    if (newThis.bound.top < (window.innerHeight - margin) && newThis.bound.top > (-1 * (newThis.bound.height - margin)) && !newThis.remove) {
                        newThis.remove = true;
                        eventTracking('w3_recently_viewed_mcat', trck_param + 'display_impression', 'IMOB_' + newThis.props.page, false);
                        window.removeEventListener('scroll', newThis.trackImp, false);
                    }
                }, 3000)
            }
        }
    }

    getMcats() {
        let count = 10;
        let localdatafiltered = "";
        let localdata = localStorage.getItem("recentMcats") ? JSON.parse(localStorage.getItem("recentMcats")) : "";
        if (localdata && localdata !== null) {
            localdatafiltered = localdata.filter(function (itm) {
                return itm.fl_name != "";
            });
        }
        let countservice = 0; let countlocal = 0;
        if (localdatafiltered && localdatafiltered !== null && count > localdatafiltered.length) {
            countservice = count - localdatafiltered.length;
        }
        if (countservice > 0 && localdatafiltered.length < count) {
            countlocal = localdatafiltered.length;
        }
        else {
            countlocal = count;
        }

        this.setState({ countservice: countservice, countlocal: countlocal });

        var data = '';
        if (localStorage.getItem("recentMcats") && localStorage.getItem("recentMcats").length > 1) {
            var mcats = JSON.parse(localStorage.getItem("recentMcats"));
            data = [];
            if (mcats) {
                data = "";
                var length = mcats.length;
                var i;
                for (i = 0; i < ((length < 4) ? length : 4); i++) {
                    let k = i + 1;
                    data = data + "MCAT_ID" + k + "/" + (mcats[i]['mcatid']) + "/";
                }
            }
        }
        return data;
    }

    callBl(name, mcatid, product_image) {
        var langSelection = getCookie("lang") == "1" ? "LangHi" : "LangEn";
        var obj = {};
        obj.product_name = name;
        obj.enq_mcat_id = mcatid;
        obj.R_custtype_weight = "";
        if (this.glid) {
            obj.affiliation_id = (this.props.page) == "product-detail" ? '-89' : '-89';
        }
        else {
            obj.affiliation_id = (this.props.page) == "product-detail" ? '-57' : '-62';
        }

        obj.query = '';
        obj.query_text = (this.props.page) == "product-detail" ? 'Recommended-product_detailRecomended-Product-Click|' + langSelection : this.props.page + '-page|PWA';
        obj.modid = 'IMOB';
        obj.enqconv = 'on';
        obj.int_rec = '1';
        obj.cta_name= 'कोटेशन प्राप्त करें';
        obj.product_image=product_image;

        window.showEnquiryForm(obj);

        return;

    }

    render() {
        var trck_param = '';
        if (this.glid) {
            trck_param = '';
        }
        else {
            trck_param = 'u_';
        }

        let localdata = '';
        let listItemsService = '';
        let listItemsLocal = '';

        let className = 'dn';
        let pdpFeturCat = '';

        (this.props.page) == "product-detail" ? pdpFeturCat = ' bgw ' : pdpFeturCat = '';

        if (localStorage.getItem("recentMcats") && localStorage.getItem("recentMcats").length > 1) {
            localdata = JSON.parse(localStorage.getItem("recentMcats"));
            let localdatafiltered = localdata.filter(function (itm) {
                return itm.fl_name != "";
            });

            listItemsLocal = localdatafiltered.slice(0, this.state.countlocal).map((items, index) => {
                items.image = items.image.replace("http:", "https:");
                return (

                    <li className="w50 fl hh246">
                        <div className="pd10 bxdw2 brd5 bgw mr10 mb10">

                            <a className="dt ht125px w125p ma" href={"https://" + location.hostname + "/impcat/" + items.fl_name + ".html"} onClick={() => { eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_click_prdimg', 'IMOB_' + this.props.page, true); }} >
                                <span className="dtc w125p ht125p vam">
                                    <LazyLoad throttle={10} offsetVertical={300}>
                                        <img src={items.image} alt={items.image} className="favImg" />
                                    </LazyLoad>
                                </span>
                            </a>
                            <a className="db clrb mb5 pl10 pr10" onClick={() => { eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_click_prdname', 'IMOB_' + this.props.page, true); }} href={"https://" + location.hostname + "/impcat/" + items.fl_name + ".html"}>
                                <span className="db ht35 oh tc fs15 mt10" id="prod_name" >{items.name}</span>
                            </a>

                            <div onClick={() => {
                                this.callBl(items.name, items.mcatid, items.image); eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_button_getquotes', 'IMOB_' + this.props.page, true);
                            }}
                                className="bxrd20 dib bxsdw clrw pdtb105 bgmim fs14 w70 compCl fw" >{this.props.translatedText != undefined ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"}</div>

                        </div>
                    </li>

                )

            });

            if ((this.props.relData && this.props.relData.response['RECOMMENDED MCAT DATA'] && this.props.relData.response['RECOMMENDED MCAT DATA'].length > 0)|| (this.props.get_recentrelatedmcats.hasOwnProperty('RECOMMENDED MCAT DATA') && this.props.get_recentrelatedmcats['RECOMMENDED MCAT DATA'].length > 0)) {
                let service_array;
		let local_array = JSON.parse(localStorage.getItem("recentMcats"));
                if((this.props.relData && this.props.relData.response['RECOMMENDED MCAT DATA'])){
                 service_array = this.props.relData.response['RECOMMENDED MCAT DATA'];}
                else{
                 service_array = this.props.get_recentrelatedmcats['RECOMMENDED MCAT DATA'];}                
                for (let i = service_array.length - 1; i >= 0; i--) {
                    for (let j = 0; j < local_array.length; j++) {
                        if (service_array[i] && (service_array[i].GLCAT_MCAT_ID == local_array[j].mcatid)) {
                            service_array.splice(i, 1);
                        }
                    }
                }

                listItemsService = service_array.slice(0, this.state.countservice).map((items, index) => {
                    items.GLCAT_MCAT_IMG1_250X250 = items.GLCAT_MCAT_IMG1_250X250.replace("http:", "https:");
                    return (

                        <li className="w50 fl hh246">
                            <div className="pd10 bxdw2 brd5 bgw mr10 mb10">

                                <a className="dt ht125px w125p ma" href={"https://" + location.hostname + "/impcat/" + items.GLCAT_MCAT_FLNAME + ".html"} onClick={() => { eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_click_prdimg', 'IMOB_' + this.props.page, true); }} >
                                    <span className="dtc w125p ht125p vam">
                                        <LazyLoad throttle={10} offsetVertical={300}>
                                            <img src={items.GLCAT_MCAT_IMG1_250X250} alt={items.GLCAT_MCAT_FLNAME} className="favImg" />
                                        </LazyLoad>
                                    </span>
                                </a>
                                <a className="db clrb mb5 pl10 pr10" onClick={() => { eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_click_prdname', 'IMOB_' + this.props.page, true); }} href={"https://" + location.hostname + "/impcat/" + items.GLCAT_MCAT_FLNAME + ".html"}>
                                    <span className="db ht35 oh tc fs15 mt10" id="prod_name" >{items.GLCAT_MCAT_NAME}</span>
                                </a>

                                <div onClick={() => {
                                    this.callBl(items.GLCAT_MCAT_NAME, items.GLCAT_MCAT_ID, items.GLCAT_MCAT_IMG1_250X250); eventTracking('w3_recently_viewed_mcat', trck_param + 'cta_button_getquotes', 'IMOB_' + this.props.page, true);
                                }}
                                    className="bxrd20 dib bxsdw clrw pdtb105 bgmim fs14 w70 compCl fw" >{this.props.translatedText != undefined ? this.props.translatedText.ENQ_LABEL1 : "कोटेशन प्राप्त करें"}</div>

                            </div>
                        </li>

                    )
                });

                className = '';
            }

        }

       if(listItemsLocal || listItemsService){
        return (
            <div id='relatedmcats' className={className + pdpFeturCat} >
                <section className="oh w100 brd5"><p className="fs18 fw clrb pd10">आपके लिए कैटेगरीज</p>
                    <div className="fs14 pl10 pdb10"> <ul className="crx tc">
                        {listItemsLocal}
                        {listItemsService}


                    </ul>

                    </div>
                </section>
            </div>)
       }
    }
}


export default recentRelatedMcats;
