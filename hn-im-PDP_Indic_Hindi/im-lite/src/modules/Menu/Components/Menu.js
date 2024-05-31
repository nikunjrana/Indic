import React, { Component } from 'react';
import '../css/Menu.css';
import MenuList from './MenuList.js'
import {Link} from 'react-router';
import MoreMenuItems from './MoreMenuItems.js';
import BuyMenu from './BuyMenu.js';
import SellMenu from './SellMenu.js';
//import EnqBlComponent from '../../App/components/EnqBlComponent';
import { gaTrack, prevname } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookieValByKey, getCookie, setCookie } from '../../../Globals/CookieManager';
//import { goToRoute } from '../../../Globals/routingFunction';
//import VernacularMenu from './VernacularMenu';
//import { countUnreadMessages } from '../../../Globals/unreadMessageCount';
import {removalTextNodes} from '../../../Globals/translatorPreact/translatorPatch';
import glidArr from '../../../../server/GlidsForIndic';
import { loadscript } from "../../Menu/Components/GoogleTranslate";

class MenuLayout extends Component {
    constructor(props) {
        super(props);
        this.state = { langBox: false, gstBox: false, MenuLayout: true, GSTMenuWidgetContainer: '',
        //EnqBlComponent: '',
        view:'' ,showEnqPopup:false,
        VernacularMenu:''};
        this.langBox = this.langBox.bind(this);
        this.gstBox = this.gstBox.bind(this);
        this.loadEnquiryContainer=this.loadEnquiryContainer.bind(this);
        this.showModal=this.showModal.bind(this);
        this.callBl=this.callBl.bind(this);
        this.prop={};
        let glid = getCookieValByKey('ImeshVisitor', 'glid') ? getCookieValByKey('ImeshVisitor', 'glid') : '';
        let gaid=getCookie("_ga")?getCookie('_ga'):'';
        let lastgadigit= gaid && gaid.length && gaid[gaid.length-1]?gaid[gaid.length-1]:'';
        let lastDigitArr = ["1","2","3","4","5"];
        this.isGlid = (glid && glidArr && glidArr.includes(glid)) || (lastgadigit && lastDigitArr && lastDigitArr.includes(lastgadigit)) ? true : false;
        //this.mountEnqBlComponent = this.mountEnqBlComponent.bind(this);
        document.getElementById("gblLoader")?document.getElementById("gblLoader").style.display = "none":'';
    }

    componentWillMount(){
        window.addEventListener('touchstart', this.loadEnquiryContainer, {passive:true});
        if(this.isGlid && !window.googleTranslateElementInit){
            loadscript();
        }
    }
    componentDidUpdate(){
        let googleLogo = document.getElementsByClassName('VIpgJd-ZVi9od-l4eHX-hSRGPd');
        googleLogo && googleLogo[0] ? googleLogo[0].style.display = 'none':''; 
        removalTextNodes();
    }
    loadEnquiryContainer(){
        // if(!this.state.view){
        //     import(/* webpackChunkName:"EnqBlPWA" */'../../EnquiryBlForms/components/EnqBlMain').then((module) => {
        //     this.setState({ view: module.default });
        //     import(/* webpackChunkName:"Index" */'../../App/styles/index.css')
        //     window.removeEventListener("touchstart",this.loadEnquiryContainer);
        // })
        // }
    }

    componentDidMount() {   
        let isGlid = this.isGlid;  
        let Props = this.props;
        setTimeout(function() {
            if(isGlid){
            window.IsIndicTrack = false;
            let ele = document.getElementById('google_translate_element')
            ele ? ele.style.display = 'block':'';
            ele ? ele.style.position = 'absolute':'';
            let menuEle = document.getElementById('MenuLayout')
            menuEle && ele ? menuEle.appendChild(ele) : '';
            let googSelect = document.getElementsByClassName('goog-te-combo');
            googSelect && googSelect[0] ? googSelect[0].onchange =  ()=> {
                if (Props.toggleMenu) {
                    window.IsIndicTrack = true;
                    let PreLang = getCookieValByKey('googtrans')?getCookieValByKey('googtrans'):'';
                    let elementGoogSel = document.getElementsByClassName("goog-te-combo");
                    let SelLang = elementGoogSel && elementGoogSel.length>0?elementGoogSel[0].value:'';
                    localStorage.setItem("IndicLang",SelLang);
                    let eventAction = PreLang ? 'Language Changed' :'Auto Language Selected';
                    gaTrack.trackEvent(['Indic',eventAction ,SelLang,0,true])
                    Props.toggleMenu("close");
                }
            }:'';

            }
            }, 250)
        if (checkUserStatus() != 0 && !this.state.countUnreadMessages) {
            import(/* webpackChunkName:"unreadMessageCount" */'../../../Globals/unreadMessageCount').then((module) => { module.countUnreadMessages(true) });
        }       
    }
componentWillUnmount(){
    let ele1 = document.getElementById('root')
    let menuEle = document.getElementById('google_translate_element')
    menuEle && ele1 ? (ele1.appendChild(menuEle),menuEle.style.display='none') : '';
}
    langBox(lantype, popupclick = "") {
        this.setState({ langBox: !this.state.langBox });
        if (!this.state.VernacularMenu) {
            import(/* webpackChunkName: "VernacularMenu" */'./VernacularMenu').then((module) => {
                this.setState({ VernacularMenu: module.default });
            })
        }
        if (!popupclick && lantype == "close") {
            document.body.className = document.body.className.replace("oh", "");
            if (this.props.toggleMenu) {
                this.props.toggleMenu("close");
            }
        }

    }

    gstBox(popupclick = "") {
        let gstWidgetLogic = () => {
            if (popupclick == "close") {
                document.body.className = document.body.className.replace("oh", "");
                if (this.props.toggleMenu) {
                    this.props.toggleMenu("close");
                }
            }
            else if (popupclick == "open") {
                this.setState({ MenuLayout: false });
            }
        }
        // let updateGSTView = (container = '') => {
        //     if (container) {
        // this.setState({ langBox: !this.state.langBox, GSTMenuWidgetContainer: container });
        //     this.setState({ GSTMenuWidgetContainer: container });
        // }
        // else {
        //     this.setState({ langBox: !this.state.langBox });
        // }
        // }
        if (!this.state.GSTMenuWidgetContainer) {
            import(/* webpackChunkName: "GSTMenuWidgetContainer" */'../../buyer/container/GSTMenuWidgetContainer').then((module) => {
                this.setState({ GSTMenuWidgetContainer: module.default });
                // updateGSTView(module.default);
                gstWidgetLogic();
            })
        }
        else {
            // updateGSTView();
            gstWidgetLogic();
        }
    }
    // mountEnqBlComponent(e) {
	// 		if (!this.state.EnqBlComponent) {
	// 			import(/* webpackChunkName:"EnqBl" */'../../App/components/EnqBlComponent').then((module) => {
	// 				this.setState({ EnqBlComponent: module.default });
	// 				import(/* webpackChunkName:"Index" */'../../App/styles/index.css')
	// 			})
			
	// 		}
	// }
    callBl(){
        let obj = {};
        obj.affiliationId = -43;
        obj.productName = "";
        obj.mcatId = "";
        obj.query = "";
        obj.queryText = "menu|PWA";
        obj.modid = "IMOB";
        obj.productImage = 'https://m.imimg.com/gifs/img/prod-img.png';
        obj.isEnquiry = false;
        obj.page = "home";
        obj.ctaName = "Get Verified Seller";
        obj.cityfromPincode="true";
    
        this.showModal(obj);
      };
    
    showModal(prop){
        this.prop=prop;
        this.setState({showEnqPopup:!this.state.showEnqPopup});
        document.getElementById("MenuLayout").style.marginLeft = "-400px";
        document.getElementById("MenuMain").style.marginLeft = "-4000px";
        document.getElementById("cross").style.backgroundColor = "rgb(255, 255, 255)";
        document.getElementById("cross").className.indexOf('dn') > -1 || document.getElementById("cross").className.indexOf('menuCross') > -1 ? this.props.toggleMenu("close") : '' ;
        document.body.className = document.body.className.replace("oh", "");
        document.getElementById("fltldng") ? document.getElementById("fltldng").style.display = "none" : '';
    }
    
    render() {
        //var filesInc = {};
        //provide files which are not required on this page
        // filesInc.EnqHtml = 0;
        // filesInc.centralizeEnqBl = 0;
        // filesInc.common = 0;
        // filesInc.miniBl = 0;
        // filesInc.EnqBlCommon = 0;
        // filesInc.chatbl = 0;
        // filesInc.PopUpHtml = 0;
        let uType = getCookieValByKey('ImeshVisitor', 'utyp') ? getCookieValByKey('ImeshVisitor', 'utyp') : '';
        let ucmid = getCookieValByKey('ImeshVisitor', 'cmid');
        let user_name = getCookieValByKey('ImeshVisitor', 'fn') ? getCookieValByKey('ImeshVisitor', 'fn') : 'User';
        let isTranslated = getCookieValByKey("googtrans") ? true : false;
        let userStatus = checkUserStatus();
        let sellMenu = <SellMenu toggleMenu={this.props.toggleMenu} gstBox={this.gstBox} checkUserStatus={userStatus} uType={uType} ucmid={ucmid}></SellMenu>;
        var strUser = getCookie("lang") ? getCookie("lang") : 0;
        setCookie('lang', strUser, 30);
let topText = "", eventAction = "",hrefLink="",mainText="",classProfile="";
        if(!checkUserStatus()) {
            topText = "Hi !";
            eventAction = "Login";
            hrefLink="/login/";
            mainText="Tell us more about you";
            classProfile="editProicon"
    }
        else{
            topText = "Hi "+user_name;
            eventAction = "Profile";
            hrefLink="/my/profile/";
            mainText="Edit Profile";
            classProfile="editProIcon";
       }
       
       let elementGoogSel1 = document.getElementsByClassName("goog-te-combo");
        let SelLang1 = elementGoogSel1 && elementGoogSel1.length>0?elementGoogSel1[0].value:'';
        return (
            <>  
            {this.state.showEnqPopup && this.state.view!=''?<this.state.view closePopup={this.showModal} prop={this.prop}/>:''}
                <div id="cross" class={this.state.showEnqPopup ? "dn pf w100 h100vh z99999" : this.state.MenuLayout?"blanketNI pf w100 h100vh z99999":''} onClick={(e) => requestAnimationFrame(()=>setTimeout(()=>{ (e.target.className.indexOf('blanketNI') > -1 || e.target.className.indexOf('menuCross') > -1) ? gaTrack.trackEvent([(window.pageName&&window.pageName=='home'?'Home-Page-Clicks-PWA':"Menu"), (window.pageName&&window.pageName=='home'?"Menu-Clicks":"Menu-Close"), 'Hamburger-click'+(window.pageName&&window.pageName=='home'?'|'+prevname():''), 0, true]) : ''; e.target.className.indexOf('blanketNI') > -1 || e.target.className.indexOf('menuCross') > -1 ? this.props.toggleMenu("close") : '' },0))}>
                    {/* <EnqBlComponent filesInc={filesInc} /> */}
                    {/* {this.state.EnqBlComponent ? <this.state.EnqBlComponent filesInc={filesInc} /> : ''} */}                
                    {this.state.MenuLayout ? <div className="por" id="MenuMain">
                        <div className="poa menuCross notranslate">&times;</div>
                    </div> : ''}
                </div>
                {this.state.MenuLayout ? <nav id="MenuLayout" className={this.state.showEnqPopup ? "dn":`pf bgw ht100 over-y pdb10 m400 z99999 top0 ${this.state.MenuLayout?'txL':'RtxL'}  ${getCookieValByKey('googtrans')?'truncateH':''}`}>
                <header className={ `${SelLang1 && SelLang1 == 'bn' ? 'h45' : ''} bgmim pd14 clrw`}>
              
            <h4 className="fs15 dib"><Link to={hrefLink} className="clrw fr por"> {topText}</Link></h4>
            <Link to={hrefLink} onClick={() => { (window.pageName&&window.pageName=='home')?gaTrack.trackEvent(["Home-Page-Clicks-PWA",'Menu-Clicks', 'Item-click|'+ prevname(), 0, true]) : gaTrack.trackEvent(["Menu", eventAction, 'Item-click', 0, true]); this.props.toggleMenu ? this.props.toggleMenu('close') : '';} } className={`${isTranslated?"fs12":"fs13"} tun clrw fr por db`}>
                <i className={`editIcon dib ${isTranslated?"":"mr7 poa"} ${classProfile}`}></i>
                {mainText}
             </Link>
        </header>
                    
                    <section>
                        <ul className="menuList">
                            <MenuList name="मुखपृष्ठ" link="/" ga="home" icoClass="homeIcon" toggleMenu={this.props.toggleMenu} callBl={this.callBl} showEnqPopup={this.state.showEnqPopup}></MenuList>
                            {this.isGlid && <MenuList name ="Language" icoClass="langIcon" ga="Choose-Language" toggleMenu={this.props.toggleMenu} langBox={this.props.langBox} setTranslatedTxt={this.props.setTranslatedTxt} isGlid={this.isGlid}></MenuList>}
                        </ul>
                        {uType == 'P' ? sellMenu : ''}
                        <BuyMenu toggleMenu={this.props.toggleMenu} uType={uType} callBl={this.callBl} showEnqPopup={this.state.showEnqPopup}></BuyMenu>
                        {uType == 'F' ? sellMenu : ''}
                        <MoreMenuItems setTranslatedTxt={this.props.setTranslatedTxt} uType={uType} langBox={this.langBox} toggleMenu={this.props.toggleMenu} callBl={this.callBl} isGlid={this.isGlid}></MoreMenuItems>
                    </section>
                </nav> : ''}
                {this.state.langBox && this.state.VernacularMenu ?<this.state.VernacularMenu langBox={this.langBox.bind(this)} setTranslatedTxt={this.props.setTranslatedTxt} ga={this.props.ga}/> : ''}
                {/* {this.state.gstBox ? <this.state.GSTMenuWidgetContainer gstBox={this.gstBox.bind(this)} /> : ''} */}
                {this.state.GSTMenuWidgetContainer ? <this.state.GSTMenuWidgetContainer gstBox={this.gstBox.bind(this)} /> : ""}
            </>
        )
    }
}

export default MenuLayout;


