import React, { Component } from 'react';
import MenuList from './MenuList.js';
import { setCookie, getCookie } from '../../../Globals/CookieManager';
class SellMenu extends Component {
    constructor(props) {
        super(props);
        this.handleSellerTools = this.handleSellerTools.bind(this);
    }
    componentDidMount() {
        let divEle = document.getElementById('sellerTools');

        if (!getCookie("sellertool")) {

            if(document.getElementById('sellerToolsList'))
              document.getElementById('sellerToolsList').style.display = "none";

            divEle.addEventListener('click', (event) => {
                setCookie('sellertool', 'visible', 1);
                if(document.getElementById('sellerToolsList'))
                  document.getElementById('sellerToolsList').style.display = "block";
                divEle.innerHTML = "SELLER TOOLS";
                divEle.classList.remove("orngClr");
            });

            divEle.innerHTML = "SELLER TOOLS >";
            divEle.classList.add("orngClr");
        }
        else{
            divEle ? divEle.innerHTML = "SELLER TOOLS":"";
            divEle ? divEle.classList.remove("orngClr"):"";
            this.handleSellerTools();
        }
    }
    handleSellerTools() {
        if(document.getElementById('google_translate_element') && document.getElementById('google_translate_element').classList && getCookie("sellertool")) {
            document.getElementById('google_translate_element').classList.remove('googleDiv');
            if(document.getElementsByClassName('myTicketIcon') && document.getElementsByClassName('myTicketIcon')[0]) {
                document.getElementById('google_translate_element').classList.add('googleMsgSeller');
            } else document.getElementById('google_translate_element').classList.add('googleDivSeller');
        }
    }

    render() {
        return (
            (!document.referrer.includes("twa") ?<>
                <ul className="headList pdt15" onClick={() => this.handleSellerTools()}><li className="fw clr33" id="sellerTools" ></li></ul>
                <div className="brdbcb"></div>
                <ul className="menuList menuElip" id="sellerToolsList">
                    {this.props.checkUserStatus == 2 && (this.props.uType == 'F' || this.props.uType == 'P') && ["14", "16", "17", "23", "32"].indexOf(this.props.ucmid) > -1 ?
                        <MenuList toggleMenu={this.props.toggleMenu} icoClass="gstIcon1" name="Add/View GST Number" gstBox={this.props.gstBox} ga="Add-GST"></MenuList>
                        : ''}
                    <MenuList toggleMenu={this.props.toggleMenu} icoClass="blIcon" name="Latest BuyLeads" link="/bl/" linktype="href" ga="Latest-BL"></MenuList>
                    {this.props.uType == 'P' ? <MenuList icoClass="msgIcon" toggleMenu={this.props.toggleMenu} name="Messages" linktype="link" link="/messages/" ga="My-Messages"></MenuList> : ''}
                    <MenuList toggleMenu={this.props.toggleMenu} icoClass="prodIcon" name="Manage Products" linktype="href" link="/products/" ga="My-Products"></MenuList>
                    <MenuList toggleMenu={this.props.toggleMenu} name="Premium Services" icoClass="subscribeIcon" linktype="href" link="/bl/package.html" ga="Get-Credits"></MenuList>
                    {getCookie('ImeshVisitor')&&getCookie('im_iss')&&window.myticketTask?<MenuList toggleMenu={this.props.toggleMenu} icoClass="myTicketIcon" name="My Tickets" linktype="href" link="/myTicket" ga="MyTicekts"></MenuList>:''}
                </ul>
            </>:"")
        )
    }
}
export default SellMenu;