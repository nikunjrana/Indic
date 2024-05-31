import React from "react";
import './headerSection.css';
import { browserHistory } from 'react-router';
import { checkUserStatus } from '../../../../Globals/MainFunctions';
import MessagesIconAsreq from '../../../messageIcon/messageIconAsReq';
import { updatePageSearchBox } from '../../../PDP/utility/ExtendedPDP/helper';
import HamburgerMenu from '../../../Menu/Components/HamburgerMenu';
import SearchAutoSuggest from '../../../Search/components/SearchAutoSuggest';
export default class HeaderSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.getProdTitle = this.getProdTitle.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
    }
    getProdTitle() {
        if (this.props.page && this.props.page == 'product-detail') {
            if (this.props.pageLang == "LangEn") {
                return this.props.translatedText.PDP_LABEL9 + ' ' + this.props.prodTitle;
            }
            else {
                return this.props.translatedText.PDP_LABEL9 + ' ' + this.props.prodTitle + ' ' + this.props.translatedText.PDP_LABEL10;
            }
        }
        else {
            return this.props.translatedText.WID_RECOM_HEADING2;
        }
    }
    removeElement(elem) {
        elem ? elem.parentNode.removeChild(elem) : '';
    }
    goToHome() {
        browserHistory.push('/')
    }
    fixTheHead() {
        let fixTheHead = document.getElementById('fixTheHead');
        let pdpPwaHeader = document.getElementById('pdpPwaHeader') ? document.getElementById('pdpPwaHeader') : document.getElementById('pdpPwaHeaderClient');
        let menuIcon = document.getElementById('menuIcon');
        pdpPwaHeader ? pdpPwaHeader.classList.add('stilheadPDP') : '';
        fixTheHead ? fixTheHead.style.height = '45px' : '';
        menuIcon ? menuIcon.setAttribute("style", "position:fixed !important") : '';
    }
    removeFixFromHead() {
        let fixTheHead = document.getElementById('fixTheHead');
        let pdpPwaHeader = document.getElementById('pdpPwaHeader') ? document.getElementById('pdpPwaHeader') : document.getElementById('pdpPwaHeaderClient');
        let menuIcon = document.getElementById('menuIcon');
        pdpPwaHeader ? pdpPwaHeader.classList.remove('stilheadPDP') : '';
        fixTheHead ? fixTheHead.removeAttribute('style') : '';
        menuIcon ? menuIcon.removeAttribute('style') : '';

    }
    getDisplayName() {
        return (this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME);
    }
    handleScroll() {
        let scroldBody = window.pageYOffset;
        let fixTheHead = document.getElementById('fixTheHead');
        if (fixTheHead) {
            if (scroldBody > fixTheHead.offsetTop) {
                this.fixTheHead();
            } else {
                this.removeFixFromHead();
            }
        }
    }
    componentWillUnmount() {
        let serverheaderSec = document.getElementById('pdpPwaHeader');
        if (serverheaderSec)
            this.removeElement(serverheaderSec);
        window.removeEventListener("scroll", this.handleScroll);
    }
    attachClicks() {
        document.getElementById('homePDPBanner').addEventListener('click', this.goToHome);
        document.getElementById('homePDPIcon').addEventListener('click', this.goToHome);
    }
    componentDidMount() {

        //useful when header from pdp Shell---------
        document.getElementById('smlSrchIcon').classList.remove('dn');
        //------------------------
        window.addEventListener("scroll", this.handleScroll);
        this.attachClicks();

        // Message icon on PDP
        if (checkUserStatus() != 0) {
            import(/* webpackChunkName:"unreadMessageCount" */'../../../../Globals/unreadMessageCount').then((module) => { module.countUnreadMessages() });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.removeFixFromHead();
        }
    }
    headSec() {
        if (document.getElementById('pdpPwaHeader')) {//page rendered through pdp-shell
            return (
                <>
                    <HamburgerMenu ga="PDP" setTranslatedTxt={this.props.onLangChange} />
                    <SearchAutoSuggest page="PDP" />
                    {(checkUserStatus() != 0) ? <MessagesIconAsreq page={"Product-Page-Clicks"} classes={"messageicon"} /> : ""}
                </>
            )
        }
        else //page loaded from SPA
        {
            //remove Existing Header and create custom header
            let imHeader = document.getElementById('im-header');
            document.getElementById('root').classList.remove('mt88');
            if (imHeader) {
                this.removeElement(imHeader);
            }
            return (
                <div id="pdpPwaHeaderClient" className="headPDP">
                    <HamburgerMenu ga="PDP" setTranslatedTxt={this.props.onLangChange} />
                    <SearchAutoSuggest page="PDP" />

                    <a id="homePDPBanner" className="tbSp logoPDP"></a>

                    <a id="homePDPIcon" className="dib fl dn tbSp smllogoPDP pd10"></a>

                    {(checkUserStatus() != 0) ? <MessagesIconAsreq page={"Product-Page-Clicks"} classes={"messageicon"} /> : ""}

                    <div className="bigSrcBlk bgw bxrd4 txtElip z99 bxdw2 pr fw fs14 dn clr33 ht30">
                        <span id="dpnameUpdate">{this.props.data ? this.getDisplayName() : ''}</span>
                        <i className="fr poa"></i></div>

                    <div id="smlSrchIcon" className="pd10 dib fr smlSrchIcon"><svg height="21px" width="21px" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 65.06 64.41"><rect x="59.35" y="40.79" width="7.59" height="32.8" rx="1.91" ry="1.91" transform="translate(-33.52 55.13) rotate(-45)" style="fill: rgb(255, 255, 255);"></rect><circle cx="35.65" cy="30.34" r="23.08" transform="translate(-22.59 27.83) rotate(-45)" style="fill: none; stroke: rgb(255, 255, 255); stroke-miterlimit: 10; stroke-width: 2px;"></circle></svg></div>
                </div>
            )
        }
    }

    render() {
        // im-header
        return (
            this.headSec()
        )
    }

}
