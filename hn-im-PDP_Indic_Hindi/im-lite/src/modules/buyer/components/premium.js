import React, { Component } from 'react';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';
import styles from "../../../Globals/imageCss";
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import { eventTracking,prevname } from '../../../Globals/GaTracking';

class premium extends Component {
    constructor(props) {
        super(props);

        this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.ga = getCookie('_ga');
        this.onloadAPIHIT = this.onloadAPIHIT.bind(this);
        this.userModeN = checkUserStatus();
    }
    componentDidMount() {
        this.onloadAPIHIT();

    }
    handleImageLoaded(index) {
        let elem = document.getElementsByClassName("listitemdiv");
        elem[index].style = '';
    }
    onloadAPIHIT() {
        if (this.userModeN == '2') {
            let mode = '';
            mode = '3';
            this.props.getpremium(this.glid, '', mode);
        }
    }

    render() {
        var res = '';
        var listitems = '';
        let TrackPage = this.props.page + '-Page-PWA-Clicks';
        let label = '';
        if (this.props.page.indexOf('Home') > -1)
            label = 'IMOB_Home'
        if (this.props.premium_brands.hasOwnProperty('brand_suppliers') && this.props.premium_brands['brand_suppliers'].length > 0 && this.props.getbrands == true) {
            res = this.props.premium_brands['brand_suppliers'];
            listitems = res.map((items, index) => {
                const check = (items.p_url.includes('www.indiamart.com')) ? 'true' : 'false';
                const companyurl = (items.p_url.includes('www.indiamart.com')) ? '/' + items.p_url.substring(26) : 'https://' + window.location.host + '/company/' + items.id + '/';
                const imgurl = items.logo.replace(/http:/i, 'https:');
                return (<li className="w48  fl-sh  vat bgw    pd10 ">
                    <div className=" tc fs15 vam ">
                        {check === "true" &&
                            <Link to={companyurl} className="db">
                                <div style={!imgurl ? styles.imageCss().bgimg : ''} className="por ht125px w125p ma listitemdiv" onClick={() => eventTracking('w8_premium_brands', 'cta_click_name', label, true)}>
                                    <LazyLoad throttle={20} onContentVisible={() => this.handleImageLoaded(index)}>
                                        <img src={imgurl} alt={items.c_name} className='lazy poa' style='top: 50%;left: 50%;transform: translate(-50%,-50%);'></img>
                                    </LazyLoad>
                                </div>
                                <div className="clr33 whNr oh fw mt5" onClick={() => eventTracking('w8_premium_brands', 'cta_click_name', label, true)}>{items.c_name}</div>
                            </Link>}
                        {check === 'false' &&
                            <a href={companyurl} className="db">
                                <div style={!imgurl ? styles.imageCss().bgimg : ''} className="por ht125px w125p ma listitemdiv" onclick={() => eventTracking('w8_premium_brands', 'cta_click_name', label, true)}>
                                    <LazyLoad throttle={20} offsetHorizontal={300} onContentVisible={() => this.handleImageLoaded(index)}>
                                        <img src={imgurl} alt={items.c_name} className='lazy poa' style='top: 50%;left: 50%;transform: translate(-50%,-50%);'></img>
                                    </LazyLoad>
                                </div>
                                <div className="clr33 whNr oh  fw mt5" onClick={() => eventTracking('w8_premium_brands', 'cta_click_name', label, true)}>{items.c_name}</div>
                            </a>}
                    </div>
                </li>)
            });
        }
        else {
            let glid=getCookieValByKey('ImeshVisitor', 'glid');
            let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
            if (this.userModeN == '0' || !(this.props.premium_brands.hasOwnProperty('brand_suppliers'))) {
                let industries = [['3m-india', '3m-india', '3M India'], ['boston-scientific', 'boston-scientific', 'Boston Scientific'], ['catgci', 'catgci', 'Caterpiller'],['exxonmobil-lubricants', 'exxonmobil-lubricants', 'Exxon'], ['hul-vendingmachines', 'hul-vendingmachines', 'Hindustan Unilever Limited'], ['hyundai-construction', 'hyundai-construction', 'Hyundai'],  ['mahindra-farm-implements', 'mahindra-farm-implements', 'Mahindra'], ['philipsrespironics', 'philipsrespironics', 'Philips India Limited'],  ['pidiliteindustries', 'pidiliteindustries', 'Pidilite'],  ['shell-india-markets-private-limited', 'shell-india-markets-private-limited', 'Shell'], ['tata-tiscon', 'tata-tiscon', 'Tata Steel Limited'],  ['schneiderups', 'schneiderups', 'Schneider'],  ['greavespower', 'greavespower', 'Greaves Cotton Limited'], ['haier-hvac', 'haier-hvac', 'Haier Appliances India Private Limited'],   ['tryloctite', 'tryloctite', 'Henkel'],   ['hp-india-sales', 'hp-india-sales', 'HP'], ['jaquarbathroomsolutions', 'jaquarbathroomsolutions', 'Jaquar'],  ['saintgobainweber', 'saintgobainweber', 'Saint Gobain']];
                listitems = industries.map((items, index) => {
                    if (index!=1 && index!=17 && index!=4 &&index !=6 && index !=9 && index !=15 && index !=   16) {                    
                        let companyurl = '/' + items[0] + '/';
                        return (<li className="w50 dib  vat fl-sh">
                            <div className="bgw tc  fs15 vam">
                                {(glid == '5414044002' || (multi_purpose && multi_purpose.userViewCount==5 && (glid == undefined)) || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link id={'brand' + index} className="por ht125px w125p ma db" to={companyurl} onClick={() => {this.props.page&&this.props.page.toLowerCase().includes('home')?eventTracking('Home-Page-Clicks-PWA', 'Premium Brands', items[1] +'|'+ prevname() +'|NextPageName-Company', true):eventTracking(TrackPage, 'Top-brands', items[1], true) }}>
                                    <span style={styles.imageCss().topIBg} className={'cnterN poa tbrndsBG topb' + (index + 1)} ></span></Link> : <a id={'brand' + index} className="por ht125px w125p ma db" href={companyurl} onClick={(event) => {window.location.href=(companyurl); this.props.page&&this.props.page.toLowerCase().includes('home')?eventTracking('Home-Page-Clicks-PWA', 'Premium Brands', items[1] +'|'+ prevname() +'|NextPageName-Company', true):eventTracking(TrackPage, 'Top-brands', items[1], true); event.preventDefault() }}>
                                    <span style={styles.imageCss().topIBg} className={'cnterN poa tbrndsBG topb' + (index + 1)} ></span></a>}
                            </div>
                        </li>
                        )
                    }
                });

            }
        }
        if (listitems && listitems.length) {
            return (<div id='premiumbrands'>
                <ul>
                    <section id="captioned-gallery" className="mt10">
                        <div className='fs17 fw clr11 pdt15 pdb15 pdl15 por bgw bdrBR   '  >Premium Brands</div>
                        <div className="flx tc flxwrp">
                            {listitems}
                        </div>
                    </section>
                </ul>
            </div>)
        }
    }
}


export default premium;
