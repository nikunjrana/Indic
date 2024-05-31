import React, { Component } from 'react';
import MenuList from './MenuList.js';
import { getCookie, getCookieValByKey} from '../../../Globals/CookieManager';

class MoreMenuItems extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        //let uType = getCookieValByKey('ImeshVisitor', 'utyp');
        return (
            <>
                <ul className="headList pdt15"><li className="fw clr33">MORE</li></ul>
                <div className="brdbcb"></div>
                <ul className="menuList">
                    {!this.props.isGlid && <MenuList name ="Language" icoClass="langIcon" ga="Choose-Language" toggleMenu={this.props.toggleMenu} langBox={this.props.langBox} setTranslatedTxt={this.props.setTranslatedTxt}></MenuList>}
                    <MenuList name="IndiaMART के बारे में" icoClass="aboutIcon" linktype="href" link="https://corporate.indiamart.com/about-us/" ga="About-Us"></MenuList>
                    {!document.referrer.includes("twa") ?<MenuList name="ऐप में खोलें" icoClass="appIcon" ga="App-Banner" toggleMenu={this.props.toggleMenu}></MenuList>:""}
                    {!getCookie("ImeshVisitor")||getCookieValByKey("ImeshVisitor", "utyp") == "N"?(!document.referrer.includes("twa") ?(deferredPromptA2hs ? <MenuList name="PwaAppInstall" icoClass="appIcon" ga="App-Banner" toggleMenu={this.props.toggleMenu}></MenuList>:''):""):""}
                    <MenuList name="हेल्प एंड सपोर्ट" icoClass="careIcon" linktype="href" link="https://help.indiamart.com" ga="Customer-Care"></MenuList>
                    {getCookieValByKey("ImeshVisitor", "utyp") == "F"?<MenuList name="Call Customer Support" icoClass="customerCareIcon" linktype="href" link={'tel:+919696969696'} ga="Call-Customer-Support"></MenuList>:''}
                    <MenuList name="और ऐप" icoClass="moreIcon " linktype="href" link="/mobile-apps/" ga="More-Apps"></MenuList>
                </ul>
                </>
            
        )
    }
}
export default MoreMenuItems;
