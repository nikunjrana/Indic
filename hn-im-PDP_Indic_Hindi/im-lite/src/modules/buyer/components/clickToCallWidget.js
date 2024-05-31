import React, { Component } from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import "../css/fcpWidget.css";
import styles from "../../../Globals/imageCss";

import {getCookieValByKey} from '../../../Globals/CookieManager';
import {gaTrack} from '../../../Globals/GaTracking';
class ClickToCalls extends Component {
    constructor(props) {
        super(props);
        var selfCall = this;
        this.state={
            c2c_page:'Home'
        }
        this.trackImpCtC = this.trackImpCtC.bind(this);
    }

    Dialer(mob) {
        window.location.href = "tel:" + mob;
        gaTrack.trackEvent(['Dialer-PWA2', 'Seller-Verification_'+this.state.c2c_page, 'PWA-Dialer', 'Dialed Number']);
        var data = { 'CONTACT_NUMBER':mob, 'glusrid':getCookieValByKey('ImeshVisitor', 'glid'),'CONTACT_TYPE':'MOBILE', PageName:this.state.c2c_page};
        this.props.addC2Ctrack(data);
    }
    componentDidMount(){
        if(window.location.pathname.indexOf('/bl/')>-1){
            this.setState({c2c_page:'BL' });
            gaTrack.trackEvent(['Click_to_Call', 'seller_verification__BL', 'display_impression', 0, false]);
        }
        else if(window.location.pathname.indexOf('/messages/')>-1){
            this.setState({c2c_page:'Message' });
            gaTrack.trackEvent(['Click_to_Call', 'seller_verification__Message', 'display_impression', 0, false]);
        }
        else{
            this.trackImpCtC();
            window.addEventListener("scroll", this.trackImpCtC, {passive:true});
            this.setState({c2c_page:'Home' });
        }
    }
    trackImpCtC(){
        var int = document.getElementById("qvfcpc2cwidget");
        if (int && (int.offsetTop==0 || (window.scrollY + window.innerHeight > (int.offsetTop) && int.offsetTop!=0))) {
            gaTrack.trackEvent(['Click_to_Call', 'seller_verification_Home', 'display_impression', 0, false]);
            window.removeEventListener('scroll', this.trackImpCtC, false);
        }
        
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.trackImpCtC, false);
    }

    render() {
        let num = '01416684000';

        return (
            <div className="pdt10 pdb10">
               
                    <div className="crx  bgw por brd5 ma012" id="qvfcpc2cwidget" >
                        <div className="pdt15 pdb15 pd10">
                            <img className="fl vkalpImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDQwIDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgPHBhdGggZmlsbD0iIzNCNDE0NSIgZD0iTTI1LjEyOCAzLjAwMmwxNC4wNiAyNC4wMTNBNS45IDUuOSAwIDAgMSA0MCAzMC4wMDdDNDAgMzMuMzE3IDM3LjI3OSAzNiAzMy45MjIgMzZoLTE0LjA2TDE1IDE4bDQuODYyLTE4YTYuMDkgNi4wOSAwIDAgMSA1LjI2NiAzLjAwMnoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNTI1QTYxIiBkPSJNMTUuNTA5IDMuMDAyTC44NDcgMjcuMDE1QTUuNzE3IDUuNzE3IDAgMCAwIDAgMzAuMDA3QzAgMzMuMzE3IDIuODM4IDM2IDYuMzM4IDM2SDIxVjBjLTIuMzQ4IDAtNC4zOTYgMS4yMDgtNS40OTEgMy4wMDJ6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iI0ZGQjc1MSIgZD0iTTM2LjUzIDI4LjQ3M0wyMi45NTEgMy44NDdDMjIuMzQgMi43MzcgMjEuMjE1IDIuMDM2IDIwIDJsMTEuNjE0IDMyaDEuODY0QzM1LjQyIDM0IDM3IDMyLjM0NiAzNyAzMC4zMTJjMC0uNjQ1LS4xNjMtMS4yODEtLjQ3LTEuODM5eiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkQ3NjQiIGQ9Ik0zNC41OTMgMjguNDc0Yy4yNjYuNTU3LjQwNyAxLjE5My40MDcgMS44MzlDMzUgMzIuMzQ2IDMzLjYzMSAzNCAzMS45NDggMzRINi41MzhDNC41ODggMzQgMyAzMi4zNDYgMyAzMC4zMTNjMC0uNjQ2LjE2NC0xLjI4Mi40NzItMS44NEwxNy4xMTMgMy44NUMxNy43NDUgMi43MSAxOC45MiAyIDIwLjE3OSAyYy4wMzQgMCAuMDY4IDAgLjEwMi4wMDIgMS4wNDguMDQzIDIuMDE2Ljc0MiAyLjU0MyAxLjg0N2wxMS43NjkgMjQuNjI1eiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMzQjQxNDUiIGQ9Ik0yMCAyNXY0YTIgMiAwIDEgMCAwLTR6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iIzUyNUE2MSIgZD0iTTE5LjY2NyAyNWMuMTg0IDAgLjMzMy44OTUuMzMzIDJzLS4xNSAyLS4zMzMgMkMxOC43NDYgMjkgMTggMjguMTA1IDE4IDI3cy43NDYtMiAxLjY2Ny0yeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiMzQjQxNDUiIGQ9Ik0yMCA4djE0YzEuMTA1IDAgMi0uODQ4IDItMS44OTJWOS44OTJDMjIgOC44NDcgMjEuMTA1IDggMjAgOHoiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNTI1QTYxIiBkPSJNMTkuNjY3IDhjLjE4NCAwIC4zMzMuODQ3LjMzMyAxLjg5MnYxMC4yMTZjMCAxLjA0NC0uMTUgMS44OTItLjMzMyAxLjg5Mi0uOTIxIDAtMS42NjctLjg0OC0xLjY2Ny0xLjg5MlY5Ljg5MkMxOCA4Ljg0NyAxOC43NDYgOCAxOS42NjcgOHoiLz4KICAgIDwvZz4KPC9zdmc+Cg==" />
                            <div className="pdl40">
                                <p className="fs16 fw">Your business details are not verified!</p>
                                <p className="fs14 mt3">Verify now to get 2X  {window.location.pathname.indexOf('/bl/') > -1 ? 'leads': 'enquiries' }</p>
                            </div>

                        </div>
                        <div className="tc">
                            <button className=" ripple  bgmim clrw ht40 w100 fs16 bxsdw bxrdb5 fw"  onClick={() => { this.Dialer(num); }}>
                                <i style={styles.imageCss().mim_bg} class="btnset callIco wh15 mr5 dib  vam"></i>
                                Call & Verify</button>
                        </div>
                    </div> 

            </div>
        )
    }
}

export default ClickToCalls;