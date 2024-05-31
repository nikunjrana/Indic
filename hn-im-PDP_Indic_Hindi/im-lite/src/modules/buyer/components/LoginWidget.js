import React, { Component } from 'react';
import { COUNTRY_DROPDOWN_JSON, TOP5COUNTRIES } from '../../../constants/constants';
import '../css/loginwidget.css';
import OTPverifyWidgetContainer from '../container/OTPverifyWidgetContainer';
import { validate_mobile, validate_email } from '../../../Globals/validationMobileEmail';
import { eventTracking } from '../../../Globals/GaTracking';
import { checkUserStatus } from '../../../Globals/MainFunctions';
import { getCookieValByKey } from '../../../Globals/CookieManager';

class LoginWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { showUsrErr: false, err: '', cname: "India", ciso: "IN", ccode: "+91", showOTPBoxhtml: '', OTPshow: false };
    this.identifyUser = this.identifyUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.identifyError = this.identifyError.bind(this);
    this.loginhtml = this.loginhtml.bind(this);
    this.closeLoginform = this.closeLoginform.bind(this);
    this.showOTPBox = this.showOTPBox.bind(this);
    this.tnchandler = this.tnchandler.bind(this);
    this.getnoskip = this.getnoskip.bind(this);
    this.showflag = true;
  }
  componentDidMount() {
    if (!(this.props.pagename && this.props.pagename.indexOf('product') > -1))
      eventTracking('Click-To-Call', 'Unidentified', this.props.pagename, true)
  }

  componentDidUpdate(prevProps, prevState) {
    let tagelem = document.getElementById("atag");
    if (tagelem != null) {
      tagelem.classList.remove('wd45')
      tagelem.style.width = document.getElementById('c2c_cFlag_id').offsetWidth + "px";
    }
    if (getCookieValByKey('ImeshVisitor', 'uv') != 'V' && checkUserStatus() == 1) {
      if (this.props.isidentified != prevProps.isidentified && this.props.isidentified == true && this.state.OTPshow == false) {
        if (this.state.ciso == 'IN') {
          this.setState({ showOTPBoxhtml: this.showOTPBox() });
        }
      }
    }
    let getnoskip = this.getnoskip();
    if (this.props.isidentified == true && this.props.authenticated == true && getCookieValByKey('ImeshVisitor', 'uv') == 'V') {
      this.props.clickToCall2();
    } else if (this.props.isidentified == true && this.props.authenticated == true && getnoskip != true && getCookieValByKey('ImeshVisitor', 'uv') == 'V') {
      this.props.clickToCall2();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.authenticated == true && this.state.OTPshow != true) {
      (document.getElementById("InstantLoader") != null) ? document.getElementById("InstantLoader").setAttribute('class', 'mbg1 uxMbg dblk') : '';
    } else if (nextState.err == '' && document.getElementById('c2cmob1') != null && document.getElementById('c2cmob1').value != '' && nextProps.authenticated == false) {
      (document.getElementById("InstantLoader") != null) ? document.getElementById("InstantLoader").setAttribute('class', 'mbg1 uxMbg dblk') : '';
      return false;
    } else if (this.state.OTPshow == true && nextProps.authenticated == false) {
      return false;
    } else if (this.state.OTPshow == true && nextProps.authenticated == true) {
      return false;
    }
  }

  componentWillUnmount() {
    this.closeLoginform('', 'askphdiv')
  }

  getnoskip() {
    var showskip = false;
    var multipurpsStg = JSON.parse(localStorage.getItem("multi_purpose"));
    if (multipurpsStg && multipurpsStg.call_now) {
      var showcount = multipurpsStg.call_now.split(";");
      if (showcount[0] > 1) {
        showskip = true
      }
    }
    return showskip;
  }

  identifyUser() {
    var errorMessage = this.identifyError();
    if (errorMessage.errorMsg !== '') {
      this.setState({ showUsrErr: true, err: errorMessage.errorMsg })
    } else {
      this.setState({ showUsrErr: false, err: '' })
      eventTracking('Click-To-Call', 'Accepted', this.props.pagename, false);
      let loginData = {
        "use": errorMessage.usrname,
        "pass": '',
        "ciso": this.state.ciso
      }
      this.props.loginUser(loginData);
      this.showflag = false;
    }
  }
  identifyError() {
    var resultVal = {};
    resultVal.usrname = document.getElementById('c2cmob1').value;
    resultVal.errorMsg = this.state.ciso == "IN" ? validate_mobile(resultVal.usrname) : validate_email(resultVal.usrname);
    document.getElementById("err_C2C").innerHTML = resultVal.errorMsg;
    if (resultVal.errorMsg == '') {
      document.getElementById("identify").removeAttribute('disabled');
      document.getElementById("identify").addEventListener('click', () => {
        document.body.classList.remove("oh")
      })
      document.getElementById("identify").setAttribute('class', 'tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 bgmim')
      document.getElementById("c2c-wrapper").setAttribute('class', 'ma mt10 mb10 divwid vChmark2')
    } else {
      document.getElementById("c2c-wrapper").setAttribute('class', 'ma mt10 mb10 divwid ')
    }
    if (this.state.ciso != 'IN') {
      this.tnchandler();
    }
    return resultVal;
  }

  tnchandler() {
    let element = document.getElementById('identify');
    if (document.getElementById("tccheck").checked == true) {
      element.removeAttribute('disabled');
      element.setAttribute('class', 'tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray bgmim');
    } else {
      element.setAttribute('disabled', true);
      element.setAttribute('class', 'ftc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray ');
    }
  }

  handleChange(event) {
    self = this;
    let element = document.getElementById('identify');
    element.setAttribute('disabled', true);
    element.setAttribute('class', ' tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray')
    if ("IN" !== event.target.getAttribute('data-val')) {
      self.showtc = true;
      element.setAttribute('class', 'tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray ')
      if (document.getElementById("tccheck")) {
        if (document.getElementById("tccheck").checked == true) {
          element.removeAttribute('disabled');
        } else {
          element.setAttribute('disabled', true);
        }
      }
    } else {
      self.showtc = false;
      element.setAttribute('class', 'tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray ')
    }
    document.getElementById("atag").style.width = document.getElementById('c2c_cFlag_id').offsetWidth + "px";
    document.getElementById('c2cmob1').value = '';
    this.setState({ ciso: event.target.getAttribute('data-val'), cname: event.target.getAttribute('data-name'), ccode: event.target.getAttribute('id'), err: '', showUsrErr: false });
  }

  closeLoginform(e, popid) {
    let pophtml = document.getElementById(popid);
    if (pophtml != null && pophtml != undefined) {
      this.props.showotphtml = '';
      pophtml.remove()

    }
  }

  loginhtml() {
    let countryList = [], top5countryList = [];
    TOP5COUNTRIES.map((top5C) => {
      top5countryList.push(<li onClick={this.handleChange} className="crx loginCL" key={"cc" + top5C.cniso} data-val={top5C.cniso} id={"+" + top5C.cncode} data-name={top5C.cname} >{top5C.cname}{" +" + top5C.cncode}</li>);
    });
    COUNTRY_DROPDOWN_JSON.map((dropdownJson) => {

      countryList.push(<li onClick={this.handleChange} className="crx loginCL" key={"cc" + dropdownJson.cniso} data-val={dropdownJson.cniso} id={"+" + dropdownJson.cncode} data-name={dropdownJson.cnname}>{dropdownJson.cnname}{" +" + dropdownJson.cncode}</li>);
    });
    let selectedcountry = this.state.cname;
    let loghtml = '';
    loghtml =
      <div id="askPhdiv">
        <div className="mbg dblk" style="display:block;"></div>
        <div className="w90 bxrd4 pf w90 z9999 ma tc tp30 pdt30 headSectn" id="askMobnumber">
          <i className="popups callpop db ma ht70"></i>
          <h2 id="part1" class="db bxrd4_t pdt15 clrw pl10 pr10 fs21">Enter your Mobile Number</h2>
          <h2 id="part2" class="db bxrd4_t clrw mb20 pr10 pl10 fs21">to call {this.props.compname}</h2>

          <div id="f1" className="bgw ma pd10 bxrd4_b frm mt10 pdb15">
            <div className="pd10 w100 fs15 por vdFlag pdtb16">
              <i className="dib glicon mr5"></i>Your Country is
                      <dl className="dropdown flag_cont enqCon drop" id="c2c_cFlag_id" autocomplete="off" onClick={() => { ((document.getElementById("cntryUl").style.display == "" || document.getElementById("cntryUl").style.display == "none")) ? document.getElementById("cntryUl").style.display = "block" : document.getElementById("cntryUl").style.display = "none"; }}>
                <dt><a id="atag" className="checkk wd45">
                  <span className="spanbgp"></span><div className="as_arrow"></div></a><span className="value">{selectedcountry}</span>
                </dt>

                <dd>
                  <ul id="cntryUl" className="country_list " style="display:none;" >
                    {top5countryList}
                    <div className="dn" id="cntryLi">{countryList}</div>
                    <li id="shwmre"><p onClick={() => { document.getElementById("cntryLi").style.display = "block"; document.getElementById("shwmre").style.display = "none"; document.getElementById("cntryUl").style.display = "" }}>Show More </p></li>

                  </ul>
                </dd>
              </dl>
            </div>

            <div className="ma mt10 mb10 divwid" id="c2c-wrapper">
              <label className="fs22 brdR7b" id="ccode1" style={this.state.ciso == "IN" ? "" : "display:none;"}>+91</label>
              <input id="c2cmob1" name="mobile" type={this.state.ciso == "IN" ? "tel" : "text"} className="w100 fs22 ma pdl7 pdl5" autocomplete="off" placeholder={this.state.ciso == "IN" ? 'Mobile number' : 'Email'} value="" maxlength={this.state.ciso == "IN" ? '10' : ''} onKeyUp={this.state.ciso == "IN" ? this.identifyError : ''} />
            </div>

            <div id="err_C2C" className="err fs11 tc">{this.state.err}</div>

            {(this.showtc) &&
              <div className="mb10" >
                <input type="checkbox" onChange={this.tnchandler} id="tccheck" className="fl mr5 chkbxinp" /> I agree to <a href="https://m.indiamart.com/terms-of-use.html" target="_blank">terms</a> and <a href="https://m.indiamart.com/privacy-policy.html" target="_blank">privacy policy</a>
              </div>}

            <input type="button" id="identify" className="tc db clrw fs18 pd10 bxrd20 bxsdw w70 mt10 ma mb20 dgray  br28" disabled defaultValue="Submit" onClick={this.identifyUser.bind(this)} />
            <span className="fs13 db pdb5 gryclr mgt" onClick={() => {
              document.body.classList.remove('oh'); this.closeLoginform('', 'askPhdiv'); eventTracking('Click-To-Call', 'Close-Button-Clicked', 'Non-Verified', false);
            }} >Close and continue browsing</span>


          </div>
          <div class="mbg1 uxMbg dn" id="InstantLoader" ><div class="poa sCntr pd15"><div class="loader"></div></div></div>
        </div>
      </div>

    return loghtml;
  }

  showOTPBox() {
    let showotphtml = '';
    if (getCookieValByKey('ImeshVisitor', 'uv') != 'V' && checkUserStatus() == 1) {
      this.setState({ OTPshow: true });
      let callprops = { contactmob: this.props.CONTACT_NUMBER, mcatnm: this.props.mcatname, compname: this.props.compname, pagename: this.props.pagename, clickToCall2: this.props.clickToCall2 }
      showotphtml = <OTPverifyWidgetContainer {...callprops} />
    }
    return showotphtml;
  }

  render() {
    var loginhtml = (checkUserStatus() == 0) ? this.loginhtml() : '';

    return (
      <React.Fragment>
        {((this.props.authenticated == false || this.props.authenticated == undefined)) ? loginhtml : ''}
        {this.state.showOTPBoxhtml}
      </React.Fragment>
    );


  }

}
export default LoginWidget
