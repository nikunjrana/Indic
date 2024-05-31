import React from 'react';
import '../styles/footer.css';
import styles from "../../../Globals/imageCss";
import { showToIndianUser } from '../../../Globals/indianUserCheck';
// import { impressionTrack } from '../../../Globals/impressionTrack';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
// import { checkisAppCookie, impressionTrackAppinstall } from '../../CentralizePopUp/utility/App/helper';
// import bannerDeepLinking from '../../CentralizePopUp/components/deepLinking';
import { checkUserStatus } from '../../../Globals/MainFunctions';
export default class Footer extends React.PureComponent {

    bannerSection() {
        // checkisAppCookie();
        return (
            <div id="footerBannerId" className=" bgBlu clrw fs15 fw tc pd6 bxrd4 bxsdw footerbanner bgShine" onClick={() => { }}><i className="tbSp dib vam ico21_30 apdIco"></i>ऐप में खोलें</div>
        );

    }

    payXSection() {

        let payText = showToIndianUser() ? <div id="payxfooter" className="db"><a href="https://paywith.indiamart.com?bannerid=Mfooter" className="db fs14 fw500 clrBl bdrBlu bxrd4 pd6 mt10 lh18 bxsdw" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Pay-With-IndiaMART-Link', this.props.pageName) }}><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 27 33" width="24" height="24"><path fill="#5360bc" d="M26.47,8.74c0-.86,0-1.68,0-2.47a1.11,1.11,0,0,0-1.09-1.12A14.69,14.69,0,0,1,14.25.82a1,1,0,0,0-1.51,0A14.65,14.65,0,0,1,1.65,5.15,1.11,1.11,0,0,0,.56,6.27c0,.79,0,1.61,0,2.47-.14,8-.35,19,12.61,23.7a1.13,1.13,0,0,0,.36.06,1,1,0,0,0,.35-.06c13-4.65,12.76-15.66,12.62-23.7Zm-13,21.45C2.38,26,2.55,16.87,2.7,8.78c0-.48,0-.95,0-1.41A16.38,16.38,0,0,0,13.5,3.14,16.38,16.38,0,0,0,24.28,7.37c0,.46,0,.93,0,1.41.15,8.08.32,17.23-10.8,21.41Zm0,0"></path><path fill="#5360bc" d="M17.23,12.61,12,18l-2.23-2.3a1.05,1.05,0,0,0-1.53,0,1.15,1.15,0,0,0,0,1.58l3,3.1a1,1,0,0,0,.76.33,1.06,1.06,0,0,0,.77-.33l6-6.2a1.15,1.15,0,0,0,0-1.58,1.05,1.05,0,0,0-1.53,0Zm0,0"></path></svg><strong style="display: inline-block;position: relative;top: -6px;"> IndiaMART से भुगतान करें</strong></a>
        </div> : ''

        return (
            <div>
                {payText}
            </div>
        )
    }
    componentDidMount() {
        this.loginRequest();
        // impressionTrackAppinstall("footerBannerId",`Footer_Link_Banner`)
    }


    loginRequest() {
        let imeshCookie = getCookie("ImeshVisitor");
        if (imeshCookie) {
            let previousDate = new Date(getCookieValByKey('ImeshVisitor', 'cd'));
            let callFrequency = 3;
            if (imeshCookie && (!getCookieValByKey('ImeshVisitor', 'fn') || (getCookieValByKey('ImeshVisitor', 'uv') != 'V') || !getCookieValByKey('ImeshVisitor', 'ctid'))) {
                callFrequency = 2;
            }
            let username = (getCookieValByKey('ImeshVisitor', 'iso') == "IN") ? getCookieValByKey('ImeshVisitor', 'mb1') : getCookieValByKey('ImeshVisitor', 'em');
            if (Math.abs(Math.floor((new Date - previousDate) / 864e5)) >= callFrequency && ((username != undefined) && (typeof username != "undefined") && (username != ""))) {
                this.props.loginUser ? this.props.loginUser(username) : '';
            }
        }
    }

    newFooter() {
        return (
            <div className='df jcse fs14'>
                <div className='df flxDirColumn tl'>
                    <a id="home_url" className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/"
                        onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Home') : "" }}>मुखपृष्ठ
                    </a>

                    <a id="about_url" className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/about-us/"
                        onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'About-Us') : this.gaTrck_pwa('Footer-Clicks', 'About-Us', this.props.pageName) }}> IndiaMART के बारे में

                    </a>

                    {(window && window.newlinks) ? <a id="terms_url" className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/terms-of-use.html"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Terms-Of-Use', this.props.pageName) }}>उपयोग की शर्तें
                    </a> : ''}

                    {(window && window.newlinks) ? <a id="privacy_url" className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/privacy-policy.html"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Privacy-Policy', this.props.pageName) }}>प्राइवेसी पॉलिसी
                    </a> : ''}

                    {(window && window.newlinks) ? <a id="shipping_url" className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/shipping-policy.html"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Shipping-Policy', this.props.pageName) }}>शिपिंग की पॉलिसी
                    </a> : ''}

                    {(window && window.newlinks) ? <a id="refund_url" className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/refund-cancellation-policy.html"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Refund-Cancellation-Policy', this.props.pageName) }}>रिफंड / कैंसिलेशन की पॉलिसी

                    </a> : ''}

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://help.indiamart.com/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Help', this.props.pageName) }}> हेल्प
                    </a>

                    <a id="cc_url" className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/customer-care-services/"
                        onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Customer-Care') : this.gaTrck_pwa('Footer-Clicks', 'Customer-Care', this.props.pageName) }}>एक्कांउटिंग के सॉफ्टवेयर
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/branch-offices/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Contact Us', this.props.pageName) }}>हमसे संपर्क करें
                    </a>

                    <a id="about_url" className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/category/success-stories/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Success Stories', this.props.pageName) }}> सक्सेस स्टोरीज
                    </a>

                    <a id="cc_url" className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/category/indiamart-in-news/press-releases/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Press Section', this.props.pageName) }}>प्रेस सेक्शन
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/careers-at-im/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Jobs & Careers', this.props.pageName) }}>जॉब एंड कैरियर
                    </a>

                    <a href={this.props.desktopLink ? "/desktopredirect/?url=" + this.props.desktopLink : 'https://www.indiamart.com'} id="desktop_url" className="dib clr7B pdl7 pdr7 pd5" rel="nofollow"
                        onClick={() => { (this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Desktop-Site') : this.gaTrck_pwa('Footer-Clicks', 'Desktop-Site', this.props.pageName)); }}>डेस्कटॉप साइट
                    </a>
                </div>

                <div className='df flxDirColumn tl'>

                    <span className="dib clr7B pdl7 pdr7 pd5 fw fs16">सप्लायर की टूल किट</span>
                    {((checkUserStatus() == 1 || checkUserStatus() == 2) && getCookieValByKey('ImeshVisitor', 'utyp') != 'N') ? "" : <a className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/seller/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Sell on IndiaMART', this.props.pageName) }}>IndiaMART पर बेचें
                    </a>}
                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/bl/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Latest BuyLead', this.props.pageName) }}>लेटेस्ट बायलीड
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://corporate.indiamart.com/quick-learn/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Learning Centre', this.props.pageName) }}>लर्निंग सेंटर
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://shipwith.indiamart.com/?utm_source=mobile_site&utm_medium=footer"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Ship With IndiaMART', this.props.pageName) }}>IndiaMART के साथ शिप करें
                    </a>

                    <span className="dib clr7B pdl7 pdr7 pd5 fw fs16 mt10">बायर्स की टूल किट</span>
                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/postbuy.php"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Post Your Requirement', this.props.pageName) }}>अपनी आवश्यकताएं पोस्ट करें
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://m.indiamart.com/search.html"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Search Product or Service', this.props.pageName) }}>प्रोडक्ट या सर्विस खोजें
                    </a>

                    {/* <a className="dib clr7B pdl7 pdr7 pd5" href="https://paywith.indiamart.com/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Pay With IndiaMART', this.props.pageName) }}>Pay With IndiaMART
                    </a> */}
                    <span className="dib clr7B pdl7 pdr7 pd5 fw fs16 mt10">एकाउंटिंग सॉल्यूशन</span>
                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://busy.in/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Accounting Software', this.props.pageName) }}>एक्कांउटिंग के सॉफ्टवेयर
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://www.livekeeping.com/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Tally on Mobile', this.props.pageName) }}>मोबाइल में टेली
                    </a>

                    <a className="dib clr7B pdl7 pdr7 pd5" href="https://busy.in/e-invoice-software/"
                        onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'GST e-Invoice', this.props.pageName) }}>जीएसटी ई-चालान
                    </a>
                </div>
            </div>
        )
    }

    bottomLinks() {
        if (this.props.pageStatus == 'good') {
            return (
                <div>
                    {this.newFooter()}
                    <div className="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank" rel="noreferrer" className="ml10 dib" onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Facebook') : this.gaTrck_pwa('Footer-Clicks', 'Facebook', this.props.pageName) }}><i style={styles.imageCss().icoHf} className="dib fbIco wh30"></i></a><a href="https://twitter.com/IndiaMART" rel="noreferrer" target="_blank" className={`dib ${this.props.pageName && this.props.pageName == "HindiPDP" ? 'm10' : 'ml10'}`} onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Twitter') : this.gaTrck_pwa('Footer-Clicks', 'Twitter', this.props.pageName) }}><i className="dib twIco wh30"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" rel="noreferrer" target="_blank" onClick={() => { this.props.pageName && this.props.pageName == "home" ? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Linkedin') : this.gaTrck_pwa('Footer-Clicks', 'Linkedin', this.props.pageName) }} className="dib ml10"><i style={styles.imageCss().icoHf} className="dib linkInIco wh30"></i></a>
                    </div>
                </div>
                // <div>
                //     <a className="dib clr7B brdR7b pdl7 pdr7 dn" href="https://m.indiamart.com" 
                //     onClick={() => { this.props.pageName&&this.props.pageName=="home"?this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Home'):""}} 
                //     id="home_url">Home</a><a href="https://corporatindiamart.com/about-us/"e. onClick={() => { this.props.pageName&&this.props.pageName=="home"?this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'About-Us'):this.gaTrck_pwa('Footer-Clicks', 'About-Us', this.props.pageName) }} className="dib clr7B brdR7b pdl7 pdr7" id="about_url"> About Us </a><a href="https://help.indiamart.com" onClick={() => {
                //         this.props.pageName&&this.props.pageName=="home"? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Customer-Care'):this.gaTrck_pwa('Footer-Clicks', 'Customer-Care', this.props.pageName) }} className="dib clr7B pdl7 pdr7" id="cc_url">Customer Care</a><a href= {this.props.desktopLink ? "/desktopredirect/?url="+ this.props.desktopLink : 'https://www.indiamart.com' } className="dib clr7B brdL7b pdl7 pdr7"  rel="nofollow" onClick={() => { (this.props.pageName&&this.props.pageName=="home"? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks', 'Desktop-Site'):this.gaTrck_pwa('Footer-Clicks', 'Desktop-Site', this.props.pageName));}} id="desktop_url" >Desktop Site</a>

                //     <div className="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank" rel="noreferrer" className="ml10 dib" onClick={() => { this.props.pageName&&this.props.pageName=="home"? this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks','Facebook'):this.gaTrck_pwa('Footer-Clicks', 'Facebook', this.props.pageName) }}><i style={styles.imageCss().icoHf} className="dib fbIco wh30"></i></a><a href="https://twitter.com/IndiaMART" rel="noreferrer" target="_blank" className={`dib ${this.props.pageName&&this.props.pageName=="HindiPDP"?'m10':''}`} onClick={() => {  this.props.pageName&&this.props.pageName=="home"?this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks','Twitter'):this.gaTrck_pwa('Footer-Clicks', 'Twitter', this.props.pageName) }}><i style={styles.imageCss().icoHf} className="dib twIco wh30"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" rel="noreferrer" target="_blank" onClick={() => {  this.props.pageName&&this.props.pageName=="home"?this.gaTrck_pwa('Home-Page-Clicks-PWA', 'Bottom-Clicks','Linkedin'):this.gaTrck_pwa('Footer-Clicks', 'Linkedin', this.props.pageName) }} className="dib"><i style={styles.imageCss().icoHf} className="dib linkInIco wh30"></i></a>
                //     </div>
                // </div>
            )
        }
        else {
            return (
                <div>
                    <a className="dib clr7B brdR7b pdl7 pdr7 dn" href="https://hindi.indiamart.com" id="home_url">मुखपृष्ठ</a><a href="https://corporate.indiamart.com/about-us/" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'About-Us', this.props.pageName) }} className="dib clr7B brdR7b pdl7 pdr7" id="about_url"> IndiaMART के बारे में </a><a href="https://help.indiamart.com" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Customer-Care', this.props.pageName) }} className="dib clr7B pdl7 pdr7" id="cc_url">ग्राहक सेवा</a>
                    <div className="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank" rel="noreferrer" className="ml10 dib" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Facebook', this.props.pageName) }}><i style={styles.imageCss().icoHf} className="dib fbIco wh30"></i></a><a href="https://twitter.com/IndiaMART" rel="noreferrer" target="_blank" className="dib" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Twitter', this.props.pageName) }}><i className="dib twIco wh30"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" rel="noreferrer" target="_blank" onClick={() => { this.gaTrck_pwa('Footer-Clicks', 'Linkedin', this.props.pageName) }} className="dib"><i style={styles.imageCss().icoHf} className="dib linkInIco wh30"></i></a>
                    </div>
                </div>
            )
        }
    }


    getIMFooter() {
        let classFooter = "crb tc fs12 bgw pd10 mt10 promptHandlingClass"
        if (this.props.hideFooter && this.props.hideFooter == "false") {
            classFooter += "dn";
        }
        return (
            <div id="footerIM" className={classFooter}>
                {!(window.navigator && window.navigator.userAgent && (window.navigator.userAgent.includes('IM-Android_Webview')) && (window.location.href.includes('terms-of-use') || window.location.href.includes('privacy-policy'))) && !document.referrer.includes("twa") ? this.bannerSection() : ""}
                {!(window.navigator && window.navigator.userAgent && (window.navigator.userAgent.includes('IM-Android_Webview')) && window.location.href.includes('terms-of-use') || window.location.href.includes('privacy-policy')) && !document.referrer.includes("twa") ? this.payXSection() : ""}
                <br></br>
                {this.bottomLinks()}
                <div className="pdt10 fs12 tc">
                    <p className="copirightText clr7B cp-rt dib ml286">{[<span>&#169;</span>, '1996-' + new Date().getFullYear() + ' IndiaMART.com']}</p>
                </div>
            </div>
        )
    }
    gaTrck_pwa(c, d, b) {
        imgtm.push({
            event: "IMEvent-NI",
            eventCategory: c,
            eventAction: d,
            eventLabel: b,
            eventValue: 0
        })
    }
    render() {
        return (
            <div>
                {this.getIMFooter()}
            </div>
        );
    }
}