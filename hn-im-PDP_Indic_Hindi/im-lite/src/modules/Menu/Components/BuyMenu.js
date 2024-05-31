import React, { Component } from 'react';
import MenuList from './MenuList.js';
import { getCookie, getCookieValByKey, deleteCookie } from '../../../Globals/CookieManager';
import { eventTracking } from '../../../Globals/GaTracking';
import { showToIndianUser } from '../utility/menuUtility';
import { goToRoute } from '../../../Globals/routingFunction';

class BuyMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let soiBarContent = 'Fill Business Details';
        let soiBarTracking = 'Tap&FillBusinessDetails_click';
        let soiBarLink = "/seller/";
        if (getCookieValByKey("ImeshVisitor", "cmid") == "9" && getCookie('im_iss')) {
            soiBarContent = 'Fill Product Details';
            soiBarTracking = 'Tap&FillProductDetails_click';
            soiBarLink = "/seller/add-products/";
        }
        if (getCookieValByKey("soiBar", "v") == '100')
            soiBarTracking = '';
        return (

            <>
                <ul className="headList pdt15"><li className="fw clr33">BUY</li></ul>
                <div className="brdbcb"></div>
                <ul className="menuList menuElip">
                    <MenuList toggleMenu={this.props.toggleMenu} name="सभी श्रेणियाँ देखें" icoClass="indusIcon" linktype="link" link="/dir/" ga="Business-Directory"></MenuList>
                    {(!this.props.uType || this.props.uType == 'N' || this.props.uType == 'F' || this.props.uType == '') ? <MenuList icoClass="msgIcon" toggleMenu={this.props.toggleMenu} linktype="link" name="मेसेजेस" link="/messages/" ga="My-Messages"></MenuList> : ''}
                    <MenuList toggleMenu={this.props.toggleMenu} name="खोजें" icoClass="searchIcon" link="/search.html" ga="Search"></MenuList>
                    <MenuList toggleMenu={this.props.toggleMenu} icoClass="pbrIcon" name="अपनी आवश्यकताएं पोस्ट करें" callBl={this.props.callBl} showEnqPopup={this.props.showEnqPopup} ga="Post-Buy-Requirement" ></MenuList>
                    <MenuList toggleMenu={this.props.toggleMenu} icoClass="mbrIcon" name="मेरे ऑर्डर्स" linktype="link" link="/buyer/managebl/" ga="Manage-Requirements"></MenuList>
                    {!document.referrer.includes("twa") ?((showToIndianUser()) && <MenuList toggleMenu={this.props.toggleMenu} icoClass="payIcon" name="IndiaMART से भुगतान करें" link="https://paywith.indiamart.com/msite_pwim" linktype="href" ga="Pay-With-IndiaMART"></MenuList>):""}
                    {!document.referrer.includes("twa") ?<MenuList toggleMenu={this.props.toggleMenu} icoClass="shipIcon" name="IndiaMART के साथ शिप करें" link="https://shipwith.indiamart.com/?utm_source=mobile_site&utm_medium=hamburger_menu" ga="Ship-With-IndiaMART" linktype="href"></MenuList>:""}
                    {!document.referrer.includes("twa") ?((showToIndianUser() && (this.props.uType == "N" || this.props.uType == "") && ((!getCookieValByKey("soiBar", "glid") || (getCookieValByKey("soiBar", "glid") && getCookieValByKey("soiBar", "glid") == '')))) ? <MenuList toggleMenu={this.props.toggleMenu} icoClass="soiIcon" name="IndiaMART पर बेचें" menutag="FREE" linktype="href" link="/seller/" ga={"Sell-On-IM"}></MenuList> : ''):""}
                    {(showToIndianUser() && this.props.uType == "N" && getCookieValByKey("soiBar", "glid") && getCookieValByKey("ImeshVisitor", "glid") == getCookieValByKey("soiBar", "glid")) ?
                        <MenuList toggleMenu={this.props.toggleMenu} icoClass="soiIcon" name="IndiaMART पर बेचें" link={getCookieValByKey("soiBar", "v") == '100' ? "/seller/soi-thank-you/" : '/seller/'} linktype="href" progressbar="true" ga={"Sell-On-IM" + (soiBarTracking ? ('|' + soiBarTracking) : '')}></MenuList>
                        : deleteCookie('soiBar')}
                    {(getCookieValByKey("soiBar", "v") && getCookieValByKey("soiBar", "v") !== '100') ? <span style="color:#00a699" className="fs14 clr5a dib grnClr ml50" onClick={() => { window.location.href = soiBarLink; this.props.toggleMenu("close"); eventTracking('Menu', 'Sell-On-IM', soiBarTracking, true) }}>{soiBarContent}<svg xmlns="http://www.w3.org/2000/svg" class="ml10" width="7" height="10" viewBox="0 0 7 13"> <path fill="rgb(0, 166, 153)" fill-rule="nonzero" d="M6.748 7.144l-5.28 5.59a.826.826 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.827.827 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643a.936.936 0 0 1-.252.644z"></path> </svg></span>
                        : ''}
                    <MenuList toggleMenu={this.props.toggleMenu} icoClass="shopIcon" name="शॉपिंग" menutag={"NEW"} link="https://shopping.indiamart.com/" ga={"Shop-With-IndiaMART"} linktype="href"></MenuList> 
                </ul>
            </>
        )
    }
}
export default BuyMenu;