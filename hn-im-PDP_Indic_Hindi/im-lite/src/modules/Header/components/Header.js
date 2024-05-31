import React from "react";
import ReactDOM from "react"
import { Link } from 'react-router';
import HamburgerMenu from '../../Menu/Components/HamburgerMenu';
import SearchAutoSuggest from '../../Search/components/SearchAutoSuggest';
//import VoiceHTML from '../../buyer/components/Voicehtml';
import AddToHomeScreen from '../../App/components/AddToHomeScreen';
import { goToRoute } from '../../../Globals/routingFunction';
import { countUnreadMessages, updateUnreadMsg } from '../../../Globals/unreadMessageCount';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import '../css/HeaderCss.css'
import {yandexTrackingMultiLevel} from "../../../Globals/yandexTracking";
// import BackToTop from '../../BackToTop/BacktoTop';
import { getCookieValByKey , getCookie } from "../../../Globals/CookieManager";
import { eventTracking, gaTrack,prevname } from "../../../Globals/GaTracking";
// import { impressionTrack } from "../../../Globals/impressionTrack";
import { showToIndianUser } from "../../Menu/utility/menuUtility";
import { imStore } from "../../../store/imStore";
import { removalTextNodes } from "../../../Globals/translatorPreact/translatorPatch";
import { getscript, loadscript } from "../../Menu/Components/GoogleTranslate";
import glidArr from '../../../../server/GlidsForIndic';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.defaultHeaderObj = {
            searchAutoSuggest: 'ErrorPage',
            hamburgerMenu: 'ErrorPage',
            userLogin: '',
            addToHomeScreen: '',
            msgIcon: '',
            setTranslatedTxt: '',
            background: 'bgwH',
            srchBarVal: '',
            placeholder: props.New_Header ? 'Search IndiaMART': props.pageName=='PDP'?'Search for product / service': 'Search for a Product / Service',
            showIMLogo: true,
            suggesterObj: '',
            countUnreadMessages:'',
            msgCntUpdated: false,
        }
        this.width="26px";
        this.height= "21px";
        this.msg='';
        this.msgStyle = 
            `top: 0px; right:0px; text-align: center; ${window.pageName=='home' && !window.location.href.includes('proddetail') && document.getElementById('imPWAHeader').classList.contains('homefixheader')? 'position:fixed' : ''}` ;
        this.countmsgstyle='';
       this.glid = getCookieValByKey('ImeshVisitor', 'glid');
        this.user_glid = getCookieValByKey('ImeshVisitor','glid');
        this.isGlid = this.user_glid && glidArr.includes(this.user_glid) ? true : false;
        let gaid=getCookie("_ga")?getCookie('_ga'):'';
        this.lastgadigit= gaid && gaid.length && gaid[gaid.length-1]?gaid[gaid.length-1]:'';
        
        this.hitUnreadMsg= true;
        this.headerHandling = this.headerHandling.bind(this);
        this.headerHandling2 = this.headerHandling2.bind(this);
        this.mountHeaderIcons = this.mountHeaderIcons.bind(this);
        this.menuIcon = this.menuIcon.bind(this);
        this.srchHtml = this.srchHtml.bind(this);
        this.msgIcon = this.msgIcon.bind(this);
        this.userLoginSvg = this.userLoginSvg.bind(this);
        this.updateMsgCount = this.updateMsgCount.bind(this);
        this.headerProps = { ...this.defaultHeaderObj, ...this.props };
        this.msgCount = '';
        this.localMsgCount = '';
        this.timerId='';
        this.yandexTracking = this.yandexTracking.bind(this);
        this.getSellerIntent = this.getSellerIntent.bind(this);
        this.getSellerMiniDetails = this.getSellerMiniDetails.bind(this);
        this.xmppLoad=this.xmppLoad.bind(this);
        this.onMessageRecieved=this.onMessageRecieved.bind(this);
        this.headerDefaultLook=this.headerDefaultLook.bind(this);
        this.isInViewport=this.isInViewport.bind(this);
        this.state={isCount:false};
        // this.setLocal
        
        window.addEventListener("touchstart", this.yandexTracking);
        window.addEventListener("scroll", this.yandexTracking)
        window.addEventListener("click", this.yandexTracking);
        let local=this;
        document.addEventListener("showMsgCount",
        function (e){
        local.setState({isCount:true})
        local.msgCount=e.detail;
        
       }
        );
        
    }
    componentWillUnmount(){

        if(window && window.newheader ){
            this.headerDefaultLook();
        }
        else{
         this.props && this.props.searchAutoSuggest && this.props.searchAutoSuggest == "Search" ? "" : this.headerDefaultLook();
        } 
        document.removeEventListener("showMsgCount", ()=>{});
    }
    yandexTracking() {
       
        if (typeof ym != 'function') {
            (function (b, o, j, n, h, g, f) {
                b[h] = b[h] || function () {
                    (b[h].a = b[h].a || []).push(arguments)
                }
                ;
                b[h].l = 1 * new Date();
                g = o.createElement(j),
                        f = o.getElementsByTagName(j)[0],
                        g.async = 1,
                        g.src = n,
                        f.parentNode.insertBefore(g, f)
            }
            )
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(49148410, "init", {
                id: 49148410,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        }
   
          window.removeEventListener("touchstart", this.yandexTracking);
          window.removeEventListener("scroll", this.yandexTracking)
          window.removeEventListener("click", this.yandexTracking)
        
      }
      onMessageRecieved(e) {
        this.msgCount="";
        imStore.dispatch({ type: 'REMOVE_XMPPALERT', sucess: true });
        this.timerId?clearTimeout(this.timerId):'';
        let localst = JSON.parse(localStorage.getItem("multi_purpose"));
        if (localst == null || localst == 'undefined') {
            localst = {};
        }
        let count=localst['count'];
        let time=localst['time'];
        time = new Date(time);
        updateUnreadMsg(count+1,time,localst['glid']);
        let msgElement = document.getElementById('hmIcnWrp')?document.getElementById('hmIcnWrp'):'';
        if (e && e.detail && e.detail.innerHTML != "") {
            let detail = e && e.detail && e.detail.innerHTML;
            var xmppDetail = JSON.parse(detail ? detail : '');
            if (xmppDetail && xmppDetail.msg_sender_id) {
                imStore.dispatch({ type: 'SET_XMPPALERT', xmppDetail:xmppDetail,unreadCount:count+1});
               this.timerId = setTimeout(() => {
                    imStore.dispatch({ type: 'REMOVE_XMPPALERT', sucess: true });
                }, 10000);
            }
            gaTrack.trackEvent(['Messages', 'XmppAlert_Full_login_Received', xmppDetail && xmppDetail.msg_receiver_id + '-' + xmppDetail && xmppDetail.msg_sender_id, true]);
            this.isInViewport(msgElement) && gaTrack.trackEvent(['Messages', 'XmppAlert_Full_login_Received_Viewed', xmppDetail && xmppDetail.msg_receiver_id + '-' + xmppDetail && xmppDetail.msg_sender_id, true]);
        }
        if (checkUserStatus() == 1) {
            imStore.dispatch({ type: 'SET_XMPPALERT', sucess: true,unreadCount:count+1});
           this.timerId = setTimeout(() => {
                imStore.dispatch({ type: 'REMOVE_XMPPALERT', sucess: true });
            }, 10000);
            gaTrack.trackEvent(['Messages', 'XmppAlert_Identified_Received', this.user_glid, true]);
            this.isInViewport(msgElement) && gaTrack.trackEvent(['Messages', 'XmppAlert_Identified_Received_Viewed', this.user_glid, true]);
        }
    }  

    isInViewport(element) {
        if(!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top > 0 &&
            rect.left > 0
        );
    }
   
    setLocalMsgCount() {
        try {
            var localst = JSON.parse(localStorage.getItem("multi_purpose"));
            this.localMsgCount = localst ? (localst['count'] > 0  || localst['count'] =="99+" ? localst['count'] : '') : '';
            if (this.localMsgCount !== "" && this.localMsgCount > 0) {
                this.localMsgCount > 99 ? this.localMsgCount = "99+" : this.localMsgCount;
            }
        } catch (e) { }
    }

    userLoginSvg() { return (<i className={`${this.headerProps.New_Header ? 'userLogin2' : 'userLogin'} db`}></i>) }
    
    menuIcon() {

        if(window && window.newheader  && this.headerProps.New_Header)
        { 
            return (
            <i id="menuIcon"  > <i className={`${this.headerProps.New_Header ? 'Menu_icon2' : 'Menu_icon'} poa`}></i> </i>
            )
        }
        else {
            return (
                <i id="menuIcon">
                <svg id='homemenu' xmlns="http://www.w3.org/2000/svg" width="26px" height="18px" viewBox="0 0 26 18" version="1.1" className="Menu_icon poa">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="home" transform="translate(-205.000000, -96.000000)" fill="#F6F6F6">
                            <g id="Group-2" transform="translate(205.000000, 96.000000)">
                                <rect id="Rectangle" x="0" y="0" width="25.4117647" height="3.17647059" rx="1.58823529" />
                                <rect id="Rectangle" x="0" y="7.41176471" width="25.4117647" height="3.17647059" rx="1.58823529" />
                                <rect id="Rectangle" x="0" y="14.8235294" width="25.4117647" height="3.17647059" rx="1.58823529" />
                            </g>
                        </g>
                    </g>
                </svg>
            </i>
            )
        }
    }
    srchHtml() {
        if(window && window.location && window.location.href && window.location.href.includes('/messages/') && checkUserStatus() == 2) {
            return <div className="IMlogo fs18 t12 tc fw clrw l0 r0 poa notranslate">Messages</div>
        }
    
        let newsearchbar = document.getElementById("searchBar"); 
        this.headerProps.New_Header && newsearchbar ? newsearchbar.classList.add('pdt6', 'pdr36' ,'pdl75') : '';
       
        let searchBarTxt = this.headerProps.page == "Mcat"|| this.headerProps.page == "NewMcatPage"||this.headerProps.page == "Search" ? this.headerProps.placeholder ? this.headerProps.placeholder : this.headerProps.srchBarVal : this.headerProps.srchBarVal ? this.headerProps.srchBarVal : this.headerProps.placeholder;

        if(window && window.newheader ) 
       { 
        searchBarTxt = this.headerProps.page == "Search" || this.headerProps.page == "Mcat" || this.headerProps.page == "NewMcatPage" ?  this.headerProps.placeholder ? this.headerProps.placeholder : this.headerProps.srchBarVal : 'Search IndiaMART';
       }
        return (<div className={`w100 por ht35 ${this.headerProps.New_Header ? '': 'tp46'} inp-head`}>
            <div id="srchinp" className={`poa r0 ma ${this.headerProps.New_Header ? 'inp-bx2' : 'l0 inp-bx'}`}>
            <i id="srchIcn" className={`${this.headerProps.New_Header ? 'srchIcn2' : 'srchIcn'}`}></i>
                {this.headerProps.page == "Mcat" || this.headerProps.page == "NewMcatPage"?<h1 className={`${this.headerProps.New_Header ? 'srchIp2' : 'srchIp'} t_tc`} style="overflow: hidden;
                text-overflow: ellipsis;white-space: nowrap;" name="s" id="srchInp" autocomplete="off" value={this.headerProps.srchBarVal}>{searchBarTxt}</h1>:<p className={`${this.headerProps.New_Header ? 'srchIp2' : 'srchIp'} t_tc`} style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" name="s" id="srchInp" autocomplete="off" value={this.headerProps.srchBarVal}>{searchBarTxt}</p>}

                {('webkitSpeechRecognition' in window) && <div id="vSrIco" className={`poa ${this.headerProps.New_Header ? 'voiceIcon2' : 'voiceIcon SvgVoice'}`}>            
                </div>}
            </div></div>)
    }
    userLogin() { 

        return (<div class="profileIcn dib" onClick={() => {  yandexTrackingMultiLevel('Header','SignIn',this.headerProps.userLogin.tracking); 
        (this.headerProps.userLogin.tracking&&this.headerProps.userLogin.tracking=='Home'?gaTrack.trackEvent(['Home-Page-Clicks-PWA','Header-Clicks','Sign-in|'+ prevname(),0,true]):'');
        goToRoute("/login/"); }}>
            {this.userLoginSvg()}
        </div>)
    }
    getSellerMiniDetails(){
        let sellerIntent  = JSON.parse(localStorage.getItem("sellerIntent"));
        if(getCookieValByKey('ImeshVisitor', 'utyp')=='N' && showToIndianUser() ){
            if(sellerIntent && sellerIntent.Intent && window.location.pathname=='/')
                return 1;        
        }
        return 0;
    }
    
    getSellerIntent(){
        let sellerIntent  = JSON.parse(localStorage.getItem("sellerIntent"));
        if(checkUserStatus() == '2' && getCookieValByKey('ImeshVisitor', 'utyp')=='N' && getCookieValByKey("soiBar", "v") != '100' && showToIndianUser() ){
          if((sellerIntent && sellerIntent.Intent && window.pageName && (window.pageName=='generic-impcat' || window.pageName=='impcat-district' || window.pageName=='impcat' || window.pageName=='PDP' || window.pageName.includes("Company") || window.pageName.includes("company") || window.pageName=='home' )  )){ 
            return 1;
          }

        }
        return 0;
      }


    msgIcon() {
        let msgIconSvg = (<i   className={`${this.headerProps.New_Header ? 'msgIconH2' : 'msgIconH'}`} ></i>)
        if(this.props.sellerRes && this.props.unreadCount){
            return (
                <div id="hmIcnWrp" class="poa msgIconXmpp">
                    <span className="fcwH poa rH33 aniH1s">&#40;</span>
                    <span className="fcwH poa rH38 aniH2s">&#40;</span>
                    <span className="fcwH poa rH43 aniH3s">&#40;</span>
                    {checkUserStatus() == 1 ? <Link id={"link"} to={{ pathname: '/messages/' }} onClick={() => {
                         yandexTrackingMultiLevel('Header', 'Go-to-messages', this.headerProps.msgIcon.tracking);(this.headerProps.msgIcon.tracking&&this.headerProps.msgIcon.tracking=='Home'?gaTrack.trackEvent(['Header','Go-to-messages',this.headerProps.msgIcon.tracking,0,true]):'');gaTrack.trackEvent(['Messages', 'XmppAlert_Identified_Clicked',this.user_glid,true]);
                    window.xmppTrack="Xmpp";
                    imStore.dispatch({ type: 'REMOVE_XMPPALERT', sucess: true });
                    clearTimeout(this.timerId);
                }}>{msgIconSvg}<div className="poa msgAlert wId fs14 rh0">You have a <span className="fs14 less-showH ">New Message!</span> <div className="tc fs14 less-showH hclr">Tap to Reply</div> </div></Link> : <Link                        to={{
                            pathname: '/messages/conversation/',
                            query: { sup_glid: decodeURIComponent(btoa(this.props.xmppDetail && this.props.xmppDetail.msg_sender_id)) },
                            state: { contactglid: this.props.xmppDetail && this.props.xmppDetail.msg_sender_id}
                        }}
                            onClick={() => { gaTrack.trackEvent(['Messages', 'XmppAlert_Full_login_Clicked', this.props.xmppDetail && this.props.xmppDetail.msg_receiver_id + "-" + this.props.xmppDetail && this.props.xmppDetail.msg_sender_id, true]);
                            imStore.dispatch({ type: 'REMOVE_XMPPALERT', sucess: true });
                            clearTimeout(this.timerId);
                        }}
                        >{msgIconSvg}<div className="poa msgAlert wfull fs14 rh0">New Messages From <div className="fs14 truncateH less-showH ">{this.props.xmppDetail && this.props.xmppDetail.msg_sender_company_name?this.props.xmppDetail.msg_sender_company_name:this.props.xmppDetail.msg_sender_name}</div> <div className="tc fs14 less-showH hclr">Tap to Reply</div></div></Link>}
                    <span className="fcwH poa rH0 aniH1s">&#41;</span>
                    <span className="fcwH poa rH5 aniH2s">&#41;</span>
                    <span className="fcwH poa rH10 aniH3s">&#41;</span>
                    <span style={this.countmsgstyle} id="homeMsgIconCount" className={`${this.headerProps.New_Header ? 'cntmsg2 genMsgCnt2' : 'cntmsg genMsgCnt'} fw poa tc clrw bxrd10 lh20`}>{this.props.unreadCount<=99?this.props.unreadCount:'99+'}</span>
                </div>
        )
        }
        else{
            return (<Link id={"link"} to={{ pathname: '/messages/'  }} onClick={() => { yandexTrackingMultiLevel('Header', 'Go-to-messages', this.headerProps.msgIcon.tracking); (this.headerProps.msgIcon.tracking&&this.headerProps.msgIcon.tracking=='Home'?gaTrack.trackEvent(['Home-Page-Clicks-PWA','Header-Clicks','Messages-Clicks|'+(checkUserStatus() == 2 ?(prevname() +'|NextPageName-Messages'):prevname()),0,true]):'');
        }} >
            <div style={this.msgStyle} id="hmIcnWrp" className={`${window && window.pageName && (window.pageName=='home' || window.pageName=='Search-PWA')? 'z999' : ''} poa msgIconR`}>
                        {msgIconSvg} 
                        <p style="font-size: 8px;color: white;font-weight: bold;position:absolute;top:4px;right:10px;">{this.msg}</p>
                        <span style={this.countmsgstyle} id="homeMsgIconCount" className={`${this.headerProps.New_Header ? 'cntmsg2 genMsgCnt2' : 'cntmsg genMsgCnt'} fw poa tc clrw bxrd10 lh20`}>{this.msgCount?this.msgCount:this.localMsgCount}</span>
                    </div>
                </Link>)
        }
    }
    updateMsgCount(count) {
        this.msgCount = count;
        if(count){
            this.setState({msgCntUpdated: true})
        }
        this.mountHeaderIcons();
    }
    

    mountHeaderIcons() {
        let userLoginDiv = '', a2hsDiv = '',
            checkBothIcons =  false,
            userStatus = checkUserStatus();

        if (this.headerProps.userLogin
            && this.headerProps.userLogin.mode.includes(userStatus))
            userLoginDiv = this.userLogin();

        if (this.headerProps.addToHomeScreen
            && this.headerProps.addToHomeScreen.mode.includes(userStatus))
           // a2hsDiv = <AddToHomeScreen checkBothIcons={checkBothIcons} page={this.headerProps.addToHomeScreen.tracking} />
            a2hsDiv = '';
            ReactDOM.render(<div className={`${this.headerProps.New_Header ? 'rightSideHeaderIcons2' : 'rightSideHeaderIcons'} poa`}>{a2hsDiv}{userLoginDiv}</div>, document.getElementById('iconList'));
        
    }
    componentWillMount() {
        this.setLocalMsgCount();
        this.headerProps.New_Header ? this.headerHandling2() : this.headerHandling();
       }

    xmppLoad() {
        // if (checkUserStatus() !=0) {
        //     import(/* webpackChunkName:"XmppJs" */'../../Messages/utility/loadXmpp').then((module) => { module.loadXmppJs() });
        // }
        }  
         
    componentDidMount() {
        let lastDigitArr = ["1","2","3","4","5"];
        if( (this.isGlid || (this.lastgadigit && lastDigitArr && lastDigitArr.includes(this.lastgadigit))) && !window.googleTranslateElementInit){
            
            getCookieValByKey('googtrans') ? loadscript() : getscript();
        }

        this.xmppLoad();
        this.mountHeaderIcons();
        if (checkUserStatus() != 0 && this.props.msgIcon) {
            this.hitUnreadMsg = false;
            if(this.headerProps&&this.headerProps.hamburgerMenu){
            countUnreadMessages(false, this.updateMsgCount,'',this.headerProps.hamburgerMenu,this.headerProps.setUnreadCount);
            }
            else
            {
                countUnreadMessages(false, this.updateMsgCount);
            }
        }
        if(!this.props.xmppAlert){
            document.addEventListener("xmppAlert", this.onMessageRecieved);
            imStore.dispatch({ type: 'XMPPALERT_ADDED',sucess:true});     
        }
    }
    componentDidUpdate(prevProps) {
        this.setLocalMsgCount();
        this.headerProps = { ...this.defaultHeaderObj, ...this.props };
        if(checkUserStatus() != 0 && this.props.msgIcon && this.hitUnreadMsg){
            this.mountHeaderIcons();
            this.hitUnreadMsg = false;
            if(this.headerProps&&this.headerProps.hamburgerMenu){
                countUnreadMessages(false, this.updateMsgCount,'',this.headerProps.hamburgerMenu,this.headerProps.setUnreadCount);
                }
            else
                {
                    countUnreadMessages(false, this.updateMsgCount);
                }
        }
        else {
            this.mountHeaderIcons();
            
            this.headerProps.New_Header ? this.headerHandling2() : this.headerHandling();
        }
    }
    // componentWillUnmount(){

    // }
    headerHandling2() {
        
        let pwaheader = document.getElementById('imPWAHeader');
        pwaheader ? pwaheader.classList.remove('ht63') : '';
        pwaheader ? pwaheader.classList.add('ht50') : ''; 
        

        if (this.headerProps.hamburgerMenu) {
            ReactDOM.render(this.menuIcon(), document.getElementById('menuIcon'));
            document.getElementById('menuIcon') ? document.getElementById('menuIcon').classList.remove('dn') : "";
        }
        else
            document.getElementById('menuIcon') ? document.getElementById('menuIcon').classList.add('dn') : "";

        if (!this.headerProps.showIMLogo)
            document.getElementById('logoIMart').classList.add('dn')
        else
            document.getElementById('logoIMart').classList.remove('dn')
            
       if(!this.headerProps.searchAutoSuggest || this.headerProps.pageName=='searchHtml'){
            document.getElementById('searchBar') ? document.getElementById('searchBar').classList.add('dn') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.remove('smallImLogo2') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.add('IMlogo') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.add('l0') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.add('r0') : "";
            ReactDOM.render('', document.getElementById('logoIMart'));

        }
        else{
            document.getElementById('searchBar') ? document.getElementById('searchBar').classList.remove('dn'): "";
            document.getElementById('searchBar') ? document.getElementById('searchBar').style.display = 'block' : ' ';
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.remove('IMlogo') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.add('smallImLogo2') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.remove('l0') : "";
            document.getElementById('logoIMart') ? document.getElementById('logoIMart').classList.remove('r0') : "";
            ReactDOM.render('', document.getElementById('logoIMart'));
        }
        if (this.headerProps.page == 'Search') {
            document.getElementById('imPWAHeader') ? document.getElementById('imPWAHeader').classList.add('sticky-header') : '';
            document.getElementById('hmIcnWrp') ? document.getElementById('hmIcnWrp').style.position = 'fixed' : '';
        } else if (document.getElementById('imPWAHeader') && document.getElementById('imPWAHeader').classList && document.getElementById('imPWAHeader').classList.contains('sticky-header')) {
            document.getElementById('imPWAHeader') ? document.getElementById('imPWAHeader').classList.remove('sticky-header') : '';
            document.getElementById('hmIcnWrp') ? document.getElementById('hmIcnWrp').style.position = '' : '';
        }
        
       ReactDOM.render(this.srchHtml(), document.getElementById('searchBar'));
        
        

    }

    headerHandling() {
    
        if (this.headerProps.hamburgerMenu) {
            ReactDOM.render(this.menuIcon(), document.getElementById('menuIcon'));
            document.getElementById('menuIcon').classList.remove('dn')
        }
        else
            document.getElementById('menuIcon').classList.add('dn')
        

        if (!this.headerProps.showIMLogo)
            document.getElementById('logoIMart').classList.add('dn')
        else
            document.getElementById('logoIMart').classList.remove('dn')
    
        
        
        let searchHtml = true;
        if(this.headerProps.pageName && this.headerProps.pageName=='searchHtml'){
            searchHtml = false;
        }
        this.headerChangeForSearch();

        if(searchHtml){
            document.getElementById('searchBar') ? document.getElementById('searchBar').style.display="block":'';
           
            if (this.headerProps.searchAutoSuggest) {
            if(window.pdpLcpNew || window.isMcatLcpNew){
            
            }
            else{
                document.getElementById('imPWAHeader').classList.remove('ht50');
                document.getElementById('imPWAHeader').classList.add('ht63');
            }
            // document.getElementById('imPWAHeader').classList.add('mb15');
            ReactDOM.render(this.srchHtml(), document.getElementById('searchBar'));
        }  
        else {
            document.getElementById('imPWAHeader').classList.remove('ht63');
            document.getElementById('imPWAHeader').classList.add('ht50');
            document.getElementById('imPWAHeader').classList.remove('mb15');
            ReactDOM.render('', document.getElementById('searchBar'));
        } } else {
            document.getElementById('imPWAHeader').classList.remove('ht63');
            document.getElementById('imPWAHeader').classList.add('ht50');
            document.getElementById('searchBar') ? document.getElementById('searchBar').style.display="none":'';

        }
    }
    headerDefaultLook(){
        let imPWAHeader = document.getElementById('imPWAHeader');
        let imLogo = document.getElementById('logoIMart');
        let catchSearchBar = document.getElementById('searchBar');
        let childSearchBar = catchSearchBar? catchSearchBar.getElementsByTagName('div')[0]:'';
            imPWAHeader?imPWAHeader.classList.remove('ht53'):'';
            imLogo? imLogo.classList.remove('smallImLogo2'):'';
            imLogo? imLogo.classList.remove('smallImLogo'):'';
            if(this.headerProps.New_Header){
            imLogo? imLogo.classList.add('IMlogo','l0','r0'): '';
            catchSearchBar ? catchSearchBar.classList.remove('pdt6', 'pdr36' ,'pdl75') : '';
            ReactDOM.render(<div class="w100 por ht35  inp-head"><div id="srchinp" class="poa r0 ma inp-bx2"><i id="srchIcn" class="srchIcn"></i><p class="srchIp2 t_tc" name="s" id="srchInp" autocomplete="off" value="" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Search IndiaMART</p><div id="vSrIco" class="poa voiceIcon2" style="display: block;"></div></div></div>,catchSearchBar);
            document.getElementById("searchBar").style.display='none';
            }
            catchSearchBar?catchSearchBar.classList.remove('searchBarr'):'';
            catchSearchBar?catchSearchBar.classList.remove('searchBarrx'):'';
            catchSearchBar?catchSearchBar.classList.remove('searchBarr2'):'';
            catchSearchBar?catchSearchBar.classList.remove('searchBarr3'):'';
            childSearchBar? childSearchBar.classList.remove('tp9'):'';
    }


    headerChangeForSearch() {
        let prevAndCurrURLS = localStorage && localStorage.getItem("PDP404URL") ?  JSON.parse(localStorage.getItem('PDP404URL')) : null;
        let currentPageURL = prevAndCurrURLS? prevAndCurrURLS.currentPageURL?prevAndCurrURLS.currentPageURL:'':'';
        let isSearch = prevAndCurrURLS?currentPageURL? currentPageURL.includes('isearch.php')?currentPageURL.includes('isearch.php'):'':'':'';
        isSearch=window&&window.location&&window.location.href&&(window.location.href.includes('/seller')||window.location.href.includes('/search.html')||window.location.href.includes('/login/'))?'':isSearch;
        let imPWAHeader = document.getElementById('imPWAHeader');
        let imLogo = document.getElementById('logoIMart');
        let catchSearchBar = document.getElementById('searchBar');
        let childSearchBar = catchSearchBar? catchSearchBar.getElementsByTagName('div')[0]:'';
        let menuIcon = document.getElementById('hmIcnWrp')
        let innnerSearchBar = document.getElementById('srchinp');
        
        if (isSearch && imPWAHeader && imLogo && catchSearchBar && childSearchBar && innnerSearchBar){
            imPWAHeader.classList.remove('headers');
            imPWAHeader.classList.remove('ht63');
            imPWAHeader.classList.add('ht53');
            imPWAHeader.classList.add('srchStickyHeader');
            imPWAHeader.classList.add('tp0');
            menuIcon ? menuIcon.classList.add('srchStickyHeader') : '';
            imLogo.classList.add('smallImLogo');
            catchSearchBar.classList.add('searchBarr');
            childSearchBar.classList.add('tp9');
            innnerSearchBar.classList.add('w95imp');
        } else {
            imPWAHeader? imPWAHeader.classList.remove('srchStickyHeader'):'';
            innnerSearchBar ? innnerSearchBar.classList.remove('w95imp'):'';

            imPWAHeader? imPWAHeader.classList.remove('ht53', 'tp0'):'';
            imLogo? imLogo.classList.remove('smallImLogo'):'';
            catchSearchBar? catchSearchBar.classList.remove('searchBarr'):'';
            childSearchBar? childSearchBar.classList.remove('tp9'):'';
        }
    }   
    render() {
        removalTextNodes();
        
     
        let msgIconDiv =this.headerProps.msgIcon && this.headerProps.msgIcon.mode.includes(checkUserStatus()) ?  this.msgIcon() : '';
        //  let beta = (
        //     <span
        //     class="poa"
        //     style="
        //     top: 2%;
        //     font-size: 24px;
        //     left: 20%;
        //     color: white;
        //     "
        //     >
        //     &beta;
        //     </span>
        //     );
        
        let searchComp = '';
        let menu = '';
        this.headerProps = { ...this.defaultHeaderObj, ...this.props };
        if (this.headerProps.searchAutoSuggest) {
            searchComp = <div><SearchAutoSuggest suggObj={this.headerProps.suggesterObj} page={this.headerProps.searchAutoSuggest} catId={this.headerProps.catId} mcatId={this.headerProps.mcatId} placeholder={this.headerProps.placeholder} /> </div>
        }
        if (this.headerProps.hamburgerMenu)
            menu = <HamburgerMenu ga={this.headerProps.hamburgerMenu} setTranslatedTxt={this.headerProps.setTranslatedTxt}/>
            
        return (<div>
                        {/* {this.props.hideBackToTop ? '' : 
            <BackToTop /> } */}
            {menu}
            {msgIconDiv}
            {/* {beta} */}
            {searchComp}
        </div>)
    }
}


