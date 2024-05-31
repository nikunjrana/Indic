import React, { Component } from "react";
import "../styles/ads.css";
class BrandBillboard extends Component {
    constructor(props) {
        super(props)
        this.brandBillboardAd = this.brandBillboardAd.bind(this);
        this.pageType = ((navigator.userAgent.toLowerCase().indexOf('safari') != -1 && window.navigator.standalone) || (window.matchMedia('(display-mode:standalone)').matches)) ? 'imlite' : 'msite';
        this.hideAdLoader = this.hideAdLoader.bind(this);
        this.state = {
            isShowingLoader: true,
            isShowingAd: true,
        };
        this.maxHeight = this.props.oldOrNewAd == "newMcat" ? 150 : (this.props.oldOrNewAd == "old" || this.props.oldOrNewAd == "new" || this.props.oldOrNewAd == "bbbEkta" || this.props.oldOrNewAd == "bbbForeignUser") ? 280 : 150;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.maxHeight = this.props.oldOrNewAd == "newMcat" ? 150 : (this.props.oldOrNewAd == "old" || this.props.oldOrNewAd == "new" ||this.props.oldOrNewAd == "bbbEkta" || this.props.oldOrNewAd == "bbbForeignUser") ? 280 : 150;
        if (!nextState.isShowingLoader && this.state.isShowingLoader) {
            return true;
        } else if (!nextState.isShowingAd && this.state.isShowingAd) {
            return true;
        }
        return false;
    }

    hideAdLoader(event, eventType) {
        var AdName = this.props.name;
        if (eventType === "slotOnload" && AdName === event.slot.getAdUnitPath()) {
            this.setState({ isShowingLoader: false });
        }
        else if (
            eventType === "slotResponseReceived" && AdName === event.slot.getAdUnitPath() && event.slot.getResponseInformation() === null) {
            this.setState({ isShowingAd: false });
        }
    }

    brandBillboardAd = (name, id, mcatid, catid) => {
        let self = this;
        let userConverted = 0;
        if (sessionStorage.getItem("forAds") && sessionStorage.getItem("forAds") == 'converted') {
            userConverted = 1;
        }
        let adResolution = (this.props.oldOrNewAd == "new" || this.props.oldOrNewAd == "old" || this.props.oldOrNewAd == "bbbEkta"|| this.props.oldOrNewAd == "bbbForeignUser") ? [336, 280] : this.props.oldOrNewAd == "newMcat" ? [320, 150] : [320, 150];
        // console.log(name, id, mcatid, catid)
        // console.log(window.googletag)

        window.googletag = window.googletag || { cmd: [] };
        window.googletag.cmd.push(() => {
            window.googletag
                .pubads()
                .addEventListener("slotOnload", (event) =>
                    this.hideAdLoader(event, "slotOnload")
                );
            window.googletag
                .pubads()
                .addEventListener("slotResponseReceived", (event) =>
                    this.hideAdLoader(event, "slotResponseReceived")
                );
        });
        window.googletag.cmd.push(function () {
            window.googletag
                .defineSlot(name, adResolution, id)
                .setTargeting('mcatid', [mcatid])
                .setTargeting('catid', [catid])
                .setTargeting("pagetype", [self.pageType])
                .setTargeting('user-mode', userConverted)
                .addService(googletag.pubads());
            window.googletag.pubads().enableSingleRequest();
            window.pageName && window.pageName.toLowerCase().includes('search') ? "" : window.googletag.pubads().collapseEmptyDivs();
            window.googletag.enableServices();
            window.googletag.display(id);
        });
    }

    componentDidMount() {
        if (this.props.oldOrNewAd == "old" || this.props.oldOrNewAd == "new" || this.props.oldOrNewAd == "newMcat" || this.props.oldOrNewAd == "bbbEkta"|| this.props.oldOrNewAd == "bbbForeignUser") {
            if (!(window.googletag && window.googletag.pubads)) {
                let cscript = document.createElement("script");
                cscript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
                cscript.type = "text/javascript";
                cscript.async = true;
                document.head.appendChild(cscript);
                let self = this;
                cscript.onload = function () {
                    console.log(self.props.name, self.props.id, self.props.mcatId, self.props.catId);
                    self.brandBillboardAd(self.props.name, self.props.id, self.props.mcatId, self.props.catId)
                }
            }
            else {
                this.brandBillboardAd(this.props.name, this.props.id, this.props.mcatId, this.props.catId)
            }
        }
        else{
            window.brandbbAdErrorSet=this.props.oldOrNewAd;
        }
    }
    componentWillUnmount() {
        if (window.googletag && window.googletag.destroySlots)
            window.googletag.destroySlots();
    }
    render() {
        let id = this.props.id;
        let adSlot="";
        let loaderBackground = null;
        if (this.state.isShowingLoader) {
            loaderBackground = {
                backgroundColor: "#e2e2e2",
                height: this.maxHeight + "px",
            };
        }
        else {
            loaderBackground = { height: this.maxHeight + "px" };
        }
        if (this.props.oldOrNewAd == "old" || this.props.oldOrNewAd == "new" || this.props.oldOrNewAd == "newMcat" || this.props.oldOrNewAd == "bbbEkta"|| this.props.oldOrNewAd == "bbbForeignUser") {
            adSlot = (
                <div className="Adslots tc ma pr w100 df jcc aic mb8" style={loaderBackground}>
                    <div id={id} className="z1"></div>
                    {this.state.isShowingLoader ? (
                        <span className="poa brd9e pd210 bxrd4 fs10">Ad</span>
                    ) : null}
                </div>
            );
        }

        if (!this.state.isShowingAd) {
            adSlot = null;
        }
        return adSlot;
    }
}
export default BrandBillboard;