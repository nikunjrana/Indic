import React from 'react';
import fetchRelatedProducts from '../ServiceHandler/fetchRelatedProducts';
import fetchProductDetail from '../ServiceHandler/fetchProductDetail';
import ExtendedElement from "./ExtendedElement";
import "./extended.css";
import { throttle } from 'throttle-debounce';
import { checkForPageInfo } from './helper';
export default class Extended extends React.Component {
    constructor(props) {
        super(props);
        this.extendedDisplayIds = '';
        this.state = {
            extendedSections: [], isFetching: false, dispIdsStatus: '', showAd: false, firstPDPLoad: false
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.prodInfo = {};
        this.prodInfo["#pdp" + this.props.initialDispId] = {
            "url": this.props.initialUrl,
            "displayName": this.props.intialDispName,
            "title": this.props.initialTitle
        };
        this.setProdInfo = this.setProdInfo.bind(this);
        this.constructPDPSection = this.constructPDPSection.bind(this);
        this.setFirstPDPLoad = this.setFirstPDPLoad.bind(this);
        this.prodCount = 0;
    }
    setProdInfo(divID, url, displayName, title) {
        this.prodInfo[divID] = {
            "url": url,
            "displayName": displayName,
            "title": title

        }
    }
    handleScroll() {
        throttle(500, () => {    
            if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - 420) && Array.isArray(this.extendedDisplayIds) && this.extendedDisplayIds.length > 0 && !this.state.isFetching) {
                checkForPageInfo(this.prodInfo);
                fetchProductDetail(this.extendedDisplayIds.pop()).then((data) => {
                    if (data.response &&data.response.length>0&&data.response[0]&& data.status == 200) //status-OK
                    {
                        let lastProduct = this.extendedDisplayIds.length === 0 ? true : false;
                        this.constructPDPSection(data.response[0], lastProduct);
                    }
                    else if (data.statusText == 'client-error') {
                        window.removeEventListener('scroll', this.handleScroll);
                        this.setState({ isFetching: false });
                    }
                    else //Server error or Time-out
                    {
                        window.removeEventListener('scroll', this.handleScroll);
                        this.setState({ isFetching: false });
                    }
                }, (error) => { //Request error
                    window.removeEventListener('scroll', this.handleScroll);
                });
                this.setState({ isFetching: true });

            }
            else if (this.state.dispIdsStatus === "NA") {
                window.removeEventListener('scroll', this.handleScroll);
            }
        })();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    getExtendedDisplayIds() {
        let that = this;
        let initDispId = this.props.initialDispId;
        if(this.props.mcatid  && !isNaN(this.props.mcatid)) {
            if(window && window._Related_STORE)
            {
                let data = window._Related_STORE.relatedData
                let compState = { isFetching: false }
                if (data && data.Msg == 'Success' && data["RECOMMENDED DATA"] && data["RECOMMENDED DATA"].length>0) //status-OK
                {
                    this.extendedDisplayIds = [];
                    let that = this;
                    let cn = 0;
                    data["RECOMMENDED DATA"].map(function (prod) {
                        if (prod && prod["DISPLAY_ID"] && prod["DISPLAY_ID"].toString() !== initDispId) {
                            that.extendedDisplayIds[cn] = prod["DISPLAY_ID"];
                            cn++;
                        }
                    });
                }
                else //Server error or  or timeout
                {
                    compState["dispIdsStatus"] = "NA";
                }
                that.setState(compState);
            }
            else
            {
        fetchRelatedProducts(this.props.mcatid, this.props.cityid).then((data) => {
            let compState = { isFetching: false }
            if (data.response && data.statusText == 'ok' && data.response["RECOMMENDED DATA"]) //status-OK
            {
                this.extendedDisplayIds = [];
                let that = this;
                let cn = 0;
                data.response["RECOMMENDED DATA"].map(function (prod) {
                    if (prod && prod["DISPLAY_ID"] && prod["DISPLAY_ID"].toString() !== initDispId) {
                        that.extendedDisplayIds[cn] = prod["DISPLAY_ID"];
                        cn++;
                    }
                });
            }
            else if (data.statusText == 'client-error') {
                compState["dispIdsStatus"] = "NA";
            }
            else //Server error or  or timeout
            {
                compState["dispIdsStatus"] = "NA";
            }
            that.setState(compState);
        }, (error) => { //Server error
            that.setState({ isFetching: false, dispIdsStatus: "NA" });
        });
        this.setState({ isFetching: true })
    }

        }
    }
    constructPDPSection(data, lastProduct) {


        let extSec = this.state.extendedSections;

        extSec.push(<ExtendedElement  firstViewpdpdata={this.props.firstViewpdpdata} extSec={this.extendedDisplayIds} prodCount={this.prodCount} location={this.props.location} isFetching={this.state.isFetching} setProdInfo={this.setProdInfo} data={data} toggleEnqCTADisabled = {this.props.toggleEnqCTADisabled} setFirstPDPLoad={this.setFirstPDPLoad} firstPDPLoad={this.state.firstPDPLoad}
            enqCtaDisabled={this.props.enqCtaDisabled} showModal={this.props.showModal} isABtst={this.props.isABtst} cABTestPDP={this.props.cABTestPDP}  track={this.props.track} YouTubePlayer={this.props.YouTubePlayer} loadYoutubePlayer={this.props.loadYoutubePlayer}/>);
        this.setState({ extendedSections: extSec, isFetching: false });
        this.prodCount = this.prodCount + 1;
    }
    setFirstPDPLoad() {
        if(window.refUrl.length == 1 && (window.refUrl[0] == '' || window.refUrl[0].indexOf('indiamart.com') === -1)) {
            window.refUrl.push("extendedPDP");
            history.pushState({type:"extended"}, location.pathname, "")
        }
        this.setState({firstPDPLoad: true});
    }
    componentDidUpdate(prevProps, prevState) {
        typeof changeColorEnqAlreadySentBtn == 'function' ? changeColorEnqAlreadySentBtn() : '';

        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                extendedSections: [], isFetching: false, dispIdsStatus: ''
            });
            this.prodInfo["#pdp" + this.props.initialDispId] = {
                "url": this.props.initialUrl,
                "displayName": this.props.intialDispName,
                "title": this.props.initialTitle
            };
            this.prodInfo = {};
            this.extendedDisplayIds = '';
            window._Related_STORE = null;
            //this.getExtendedDisplayIds();
        }
        if (this.extendedDisplayIds.length == 0 && !this.state.showAd) {
            this.setState({ showAd: true });
        }

    }
    componentDidMount() {
        this.getExtendedDisplayIds();
        window.addEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <>
                {this.state.extendedSections.length > 0 ? this.state.extendedSections : ''}
                {this.state.isFetching ? <div class="tc mt10 mb10 por pdt10 fs18 pdb10 lnHt0 bgef"><p class="dividNxt bgef poa cntr">{this.props.translatedTxt.LABEL5}</p><div class="dividLn"></div></div> : ''}
            </>
        )
    }


}