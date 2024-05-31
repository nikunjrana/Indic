import React, { Component } from 'react';
import LoginWidgetContainer from '../container/LoginWidgetContainer';
import OTPverifyWidgetContainer from '../container/OTPverifyWidgetContainer';

import { checkUserStatus } from '../../../Globals/MainFunctions';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';

class CallNow extends Component {
    constructor(props) {

        super(props);
        this.state = { ciso: "IN", ccode: "+91", ccCode: true, showClick: 1 };
        this.askNumber = this.askNumber.bind(this);
        this.showdialer = this.showdialer.bind(this);
        this.updateLocalStg = this.updateLocalStg.bind(this);
        this.starttime = '';
        this.clickToCall2 = this.clickToCall2.bind(this);
        this.handleonCallPDP = this.handleonCallPDP.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.authenticated == true) {
            return false;
        }
    }

    clickToCall2(flag='') {
        this.starttime = new Date().getTime();
        this.updateLocalStg();

        var pagetype = this.props.dbpagetrack;
        if ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) {
            pagetype += '|A2HS-' + document.getElementById('page_name').value.split('-').join('');
        }
        var data = { 'CONTACT_NUMBER': this.props.CONTACT_NUMBER, 'glusrid': this.props.glusrid, 'CONTACT_TYPE': this.props.CONTACT_TYPE, PageName: pagetype,'modrefid':this.props.itemId,'modrefname':this.props.itemName,'C2C_RECORD_TYPE':this.props.C2C_RECORD_TYPE?this.props.C2C_RECORD_TYPE:'' };
        // this.props.showClick = 0;
        if(flag == 'skipncall'){ 
            this.showdialer(this.props.CONTACT_NUMBER); this.props.addC2Ctrack(data);
        }
        else if(flag =='otpVer' && this.props.trackresponse!='' && this.state.showClick && this.props.callver){ 
            this.showdialer(this.props.CONTACT_NUMBER); this.props.addC2Ctrack(data); this.setState({showClick:0})}
        else if(flag != 'otpVer' || flag ==''){ 
            this.showdialer(this.props.CONTACT_NUMBER); this.props.addC2Ctrack(data);
        }
    }
    handleonCallPDP() {
        let eventlabel = '', eventValue = '';
        if (this.props.CONTACT_TYPE == 'PNS') {
            eventlabel = 'Clicked-PNS'
        }
        else {
            eventlabel = "Clicked-NonPNS"
        }
        eventValue = '/vpv' + location.pathname;
        if (checkUserStatus() == 0) {
            this.askNumber(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.pagename, this.props.compname);
            // eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true);
            eventTracking('Click-To-Call', eventlabel, eventValue, false);
        }
        else if (checkUserStatus() == 1 && getCookieValByKey('ImeshVisitor', 'iso') == 'IN' && (getCookieValByKey('ImeshVisitor', 'uv') != 'V')) {
            this.askNumber(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.pagename, this.props.compname);
            eventTracking('Click-To-Call', eventlabel, eventValue, false);
            //eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true);
        }
        else {
            this.clickToCall2(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.dbpagetrack);
            eventTracking('Click-To-Call', eventlabel, eventValue, false);
            // eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true);
        }


    }
    componentDidMount() {
        if (this.props.pageName && this.props.pageName == "PDP") {
            document.getElementById(this.props.callId).addEventListener('click', this.handleonCallPDP)
            this.handleonCallPDP();
        }

    }

    showdialer(CONTACT_NUMBER) {
        var new_contactnum = '';
        var str_contactnum = CONTACT_NUMBER.replace(/[+]/g, '')
        if (str_contactnum.length == 12) {
            new_contactnum = str_contactnum.slice(2, 13);
        } else if (str_contactnum.indexOf(' ') > -1) {
            new_contactnum = str_contactnum.split(" ")[1];
        } else if (str_contactnum.indexOf('-') > -1){
            new_contactnum = str_contactnum.split("-")[1];
        } else {
            new_contactnum = str_contactnum;
        }
        document.location.href = "tel:" + "+91" + new_contactnum;
    }
    updateLocalStg() {
        let localst = JSON.parse(localStorage.getItem("multi_purpose"));
        let setvalues = new Array();
        let today = new Date();
        setvalues.push(1);
        today.setHours(today.getHours() + 24);
        setvalues.push(today);
        if (localst == null) {
            localst = {};
        }
        if (typeof localst['call_now'] == "undefined") {
            localst['call_now'] = setvalues.join(";");
        } else {
            let getvalues = localst['call_now'].split(";");
            let checkday = new Date(getvalues[1]);
            let nextday = new Date();
            if (nextday > checkday) {
                localst['call_now'] = setvalues.join(";");
            } else {
                getvalues[0]++;
                localst['call_now'] = getvalues.join(";");
            }
        }
        localStorage.setItem("multi_purpose", JSON.stringify(localst));
    }
    askNumber(popup, Pnsnum, glid, typ, mgn_popup, call_txt, contact_no, itemId, mcatnm, pagename, compname) {
        document.body.classList.add("oh");
        var callprops = { contactmob: Pnsnum, mcatnm: mcatnm, compname: compname, islogedin: checkUserStatus(), pagename: pagename, showotphtml: this.state.showotphtml, clickToCall2: this.clickToCall2, showClick: this.state.showClick }
        var showotphtml = ''
        if (checkUserStatus() == 0) {
            showotphtml = <LoginWidgetContainer {...callprops} />
        } else if (checkUserStatus() == 1 && (getCookieValByKey('ImeshVisitor', 'uv') != 'V')) {
            showotphtml = <OTPverifyWidgetContainer {...callprops} />
        } else {
            this.clickToCall2()
        }
        this.updateLocalStg();
        this.setState({ showotphtml: showotphtml })
    }

    render() {
        let callbtn = '';

        let eventCategory = 'Click-To-Call', eventLabel = 'Clicked', eventValue = this.props.pagename;
        if (this.props.pagename == "PDP") {
            if (this.props.CONTACT_TYPE && this.props.CONTACT_TYPE == 'PNS') {
                eventLabel = 'Clicked-PNS'
            }
            else {
                eventLabel = "Clicked-NonPNS"
            }
            eventValue = '/vpv' + location.pathname;
        }
        if (!(this.props.pageName && this.props.pageName == "PDP")) {
            var calltext = this.props.translatedText ? this.props.translatedText.HEADER_BTN_1 : "कॉल करें";
            let applycss = ((this.props.prodcss != undefined && this.props.prodcss == 1) ? ' dib bxsdw bxrd20 fs14 compCl clrw w80 mb10 pdt10 pdb10' :
                (this.props.prodcss == 2) ? 'call-icon' : (this.props.prodcss == 3) ? 'call-icon r120' :
                    'fl compCl ml10 ripple bxrd20 clrw pdt12 pdb12 w45 fs14 bxsdw fw');

            if (checkUserStatus() == 0) {
                callbtn = <span onClick={() => {
                    this.askNumber(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.pagename, this.props.compname)
                        , eventTracking(eventCategory, eventLabel, eventValue, false), eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true);
                }}
                    className={applycss} id="btnlogin">
                    {(this.props.prodcss != 2 && this.props.prodcss != 3) ? <i className="mim_bg btnset callIco wh15 mr5 dib vam"></i> : ''}
                    {(this.props.prodcss != 2 && this.props.prodcss != 3) ? calltext : ''}</span>
            } else if (checkUserStatus() == 1 && getCookieValByKey('ImeshVisitor', 'iso') == 'IN' && (getCookieValByKey('ImeshVisitor', 'uv') != 'V')) {
                callbtn = <span onClick={() => {
                    this.askNumber(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.pagename, this.props.compname)
                        , eventTracking(eventCategory, eventLabel, eventValue, false), eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true);
                }}
                    className={applycss} id="btnotp">
                    {(this.props.prodcss == 2 || this.props.prodcss == 3) ? '' : <i className="mim_bg btnset callIco wh15 mr5 dib vam"></i>}
                    {(this.props.prodcss == 2 || this.props.prodcss == 3) ? '' : calltext}</span>
            } else {
                callbtn = <span onClick={() => { this.clickToCall2(this.props.im_popup, this.props.CONTACT_NUMBER, this.props.glusrid, this.props.CONTACT_TYPE, this.props.mbgn_askpopup, this.props.call_txt, this.props.contact_no, this.props.itemId, this.props.mcatname, this.props.dbpagetrack), eventTracking(eventCategory, eventLabel, eventValue, false), eventTracking(this.props.widgetTrackCatg, this.props.widgetTrack, this.props.widgetTrackPage, true); }}
                    className={applycss} id="btncallnow">
                    {(this.props.prodcss == 2 || this.props.prodcss == 3) ? '' : <i className="mim_bg btnset callIco wh15 mr5 dib vam"></i>}
                    {(this.props.prodcss == 2 || this.props.prodcss == 3) ? '' : calltext}</span>
            }

        }
        return (
            <div>
                {this.state.showotphtml}
                {(this.props.pageName && this.props.pageName == "PDP") ? '' : callbtn}

            </div>
        );
    }

}
export default CallNow

