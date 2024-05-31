import React, { Component } from 'react';
import '../css/Menu.css';
import { gaTrack } from '../../../Globals/GaTracking';
import { getCookie, setCookie } from '../../../Globals/CookieManager';

class VernacularMenu extends Component {
    constructor(props) {
        super(props);
        this.selectLanguage - this.selectLanguage.bind(this);
        this.gaTrackLang = this.gaTrackLang.bind(this);
        self = this;
    }

    selectLanguage(value) {
        setCookie('lang', value, 30);

        if (this.props.setTranslatedTxt) this.props.setTranslatedTxt(value);

    }

    gaTrackLang(ga) {
        if(ga == "Choose-Language-0") gaTrack.trackEvent(["Vernacular","English",this.props.ga, 0, false])
        else gaTrack.trackEvent(["Vernacular","Hindi", this.props.ga, 0, false])
        gaTrack.trackEvent(["Menu", ga, 'Item-click', 0, true]);
        if (this.props.langBox) {
            this.props.langBox("close");
        }

    }

    render() {
        return (
            <div id="VernacularMenu">
                <div>
                    <div className="bxrd4 clrb pf w80 bxrd5_b ma bgw tc langPopUpMenu"
                        style="z-index: 100002 !important;">
                        <label className="lang_slct crb tl por db" data-item="0">
                            <span for="English" className="dib">English</span>
                            <input id="English" className="fr" type="radio" checked={getCookie('lang') == 0 || !getCookie('lang')} name="lang_slct" value="0" onClick={(e) => { this.selectLanguage(0); this.gaTrackLang("Choose-Language-0"); }} />
                        </label>
                        <label className="lang_slct por tl db" data-item="1">
                            <span for="Hindi" className="dib">हिंदी</span>
                            <input id="Hindi" className="fr" type="radio" checked={getCookie('lang') == 1} name="lang_slct" value="1" onClick={() => {
                            document.getElementById("autosug_div") ? document.getElementById("autosug_div").style = "display:none" : "";
                            this.selectLanguage(1); this.gaTrackLang("Choose-Language-1");
                        }} />
                        </label>
                    </div>
                </div>
                <div className="mbg db z100001" onClick={() => {
                    document.getElementById("autosug_div") ? document.getElementById("autosug_div").style = "display:none" : "";
                    this.props.langBox("close", "popupclick")
                }}></div>
            </div>
        )
    }
}
export default VernacularMenu;