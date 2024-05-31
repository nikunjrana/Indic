import React from 'react';
import { getMobileNum } from './helper';
import { eventTracking } from '../../../../Globals/GaTracking';
export default class CallNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { CallNowWidgetContainer: '', callProps: '' };
        this.handleonCall = this.handleonCall.bind(this);
        this.getView = this.getView.bind(this);
    }




    handleonCall() {
        let numObj = getMobileNum(this.props.data),

            displayName = this.props.data.PC_ITEM_DISPLAY_NAME ? this.props.data.PC_ITEM_DISPLAY_NAME : this.props.data.PC_ITEM_NAME,
            mcatname = this.props.data["BRD_MCAT_NAME"] ? this.props.data["BRD_MCAT_NAME"] : this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? this.props.data["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
            callProps =
            {
                CONTACT_NUMBER: numObj.num,
                CONTACT_TYPE: numObj.type,
                call_txt: "call_txt",
                compname: this.props.data['COMPANYNAME'] ? this.props.data['COMPANYNAME'] : '',
                contact_no: "contact_no",
                glusrid: this.props.data["GLUSR_USR_ID"],
                im_popup: "im_popup",
                itemId: this.props.data["PC_ITEM_DISPLAY_ID"],
                mbgn_askpopup: "mbgn_askpopup",
                mcatname: mcatname,
                pagename: "product_detail_extended_PWA|" + this.props.pageLang,
                translatedText: this.props.translatedTxt,
                dbpagetrack: this.props.isExtended ? (this.props.type == 'OnAboutTheSeller' ? 'product-detail-about-seller-extended|' + this.props.pageLang : 'product-detail-extended|' + this.props.pageLang) : (this.props.type == 'OnAboutTheSeller' ? 'product-detail-about-seller|' + this.props.pageLang : 'product-detail-head|' + this.props.pageLang),
                widgetTrackCatg: 'Extended_PDP_PWA',
                widgetTrack: 'Main_CTA',
                widgetTrackPage: 'Call',
                callshowtext: this.props.translatedTxt ? this.props.translatedTxt.HEADER_BTN_1 : '',
                page: 'PDP',
                itemName:displayName
            };



        if ((this.props.type == "OnAboutTheSeller"  || this.props.type == "enqSent") && !this.state.CallNowWidgetContainer ) {

            import(/* webpackChunkName:"CallNowWidgetContainer" */'../../../buyer/container/callNowWidgetContainer').then((module) => {
                this.setState({ CallNowWidgetContainer: module.default, callProps: callProps })
            })
        }
        else if (this.props.type == "BelowImageCTA" ) {
            this.props.mountCallVerfPopUp(callProps);
        }
    }
    getView() {
        let view = '';
        switch (this.props.type) {
            case 'OnAboutTheSeller':
                {
                    view = (<div onClick={() => { eventTracking(this.props.category, this.props.action, this.props.label, true); this.handleonCall() }} id={'call' + this.props.type + this.props.data["PC_ITEM_DISPLAY_ID"]} class="bdrmim poa oh hw45 rt0 tp0 mr3 bxrd100 bxsdw" >
                        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" class="mxhw imgCnt poa">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Call-icon_about-the-seller" transform="translate(-308.000000, -293.000000)" fill="#00A699">
                                    <g id="telephone" transform="translate(308.000000, 293.000000)">
                                        <path d="M15.0891324,13.221427 C14.4407459,12.5813001 13.6312951,12.5813001 12.9870385,13.221427 C12.4955863,13.7087493 12.004134,14.1960717 11.5209415,14.6916538 C11.3887863,14.8279388 11.2772803,14.8568478 11.1162162,14.7659911 C10.7982177,14.5925374 10.4595699,14.4521224 10.153961,14.2621493 C8.72916257,13.3659717 7.53563576,12.2137434 6.47839403,10.9169704 C5.95390301,10.2727137 5.4872299,9.58302866 5.16097171,8.80661676 C5.0948941,8.64968244 5.10728365,8.54643617 5.23530902,8.41841081 C5.72676123,7.943478 6.20582389,7.45615563 6.6890164,6.96883327 C7.36218204,6.29153778 7.36218204,5.49860648 6.68488655,4.81718114 C6.30081045,4.42897519 5.91673435,4.04902894 5.53265825,3.66082299 C5.1361926,3.26435734 4.7438568,2.86376184 4.3432613,2.47142604 C3.69487477,1.83955891 2.88542406,1.83955891 2.24116738,2.47555589 C1.74558532,2.96287825 1.2706525,3.46259017 0.766810739,3.94165283 C0.300137629,4.38354684 0.0647361488,4.92455726 0.0151779424,5.55642439 C-0.0632892177,6.58475717 0.188631665,7.55527205 0.543798811,8.50100782 C1.2706525,10.458557 2.37745245,12.197224 3.71965387,13.7913463 C5.53265825,15.9471283 7.69669993,17.6527566 10.2282983,18.8834521 C11.3681371,19.436852 12.5492743,19.8622266 13.8336578,19.9324341 C14.7174458,19.9819923 15.485598,19.7589804 16.1009458,19.0692953 C16.5221905,18.5984924 16.9971233,18.1689879 17.4431472,17.7188342 C18.1039233,17.0497984 18.1080531,16.2403477 17.4514069,15.5795716 C16.6667353,14.7907702 15.8779338,14.0060986 15.0891324,13.221427 Z" id="Path"></path>
                                        <path d="M14.3003309,9.9299361 L15.8242458,9.66975552 C15.5847144,8.26973619 14.9239384,7.00187207 13.9203847,5.99418854 C12.8590131,4.93281696 11.5168117,4.26378117 10.0383252,4.05728864 L9.82357296,5.58946319 C10.9675416,5.75052736 12.0082639,6.26675868 12.8301041,7.08859894 C13.606516,7.86501084 14.1144877,8.84791526 14.3003309,9.9299361 Z" id="Path"></path>
                                        <path d="M16.6832547,3.30565585 C14.9239384,1.54633952 12.6979489,0.435409728 10.2406879,0.0926321338 L10.0259356,1.62480668 C12.1486788,1.92215592 14.0731892,2.88441109 15.5929741,4.40006624 C17.034292,5.84138407 17.9800278,7.66264816 18.3228054,9.66562567 L19.8467202,9.40544508 C19.4461247,7.08446908 18.3517143,4.97824531 16.6832547,3.30565585 Z" id="Path"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    );
                    break;
                }
                case 'enqSent':
                {
                    view = (
                    
                        <div onClick={() => { eventTracking(this.props.category, this.props.action, this.props.label, true); this.handleonCall() }} id={'call' + this.props.type + this.props.data["PC_ITEM_DISPLAY_ID"]} className="compCl bxrd20 clrw pdb12 pdt12 w100 fs14 fw bxsdw">
                        <i class="callimgIco mr5 dib vam"></i>
                        <span class="HEADER_BTN_1 dib vam">{this.props.translatedTxt.HEADER_BTN_1}</span>
                    </div>
                    );
                    break;
                }
            case 'BelowImageCTA':
                {
                    //
                    view = (
                        <div onClick={() => { eventTracking(this.props.category, this.props.action, this.props.label, true); this.handleonCall() }} id={'call' + this.props.type + this.props.data["PC_ITEM_DISPLAY_ID"]} className="fl compCl bxrd20 clrw pdb12 pdt12 w49 fs14 fw bxsdw">
                            <i class="callimgIco mr5 dib vam"></i>
                            <span class="HEADER_BTN_1 dib vam">{this.props.translatedTxt.HEADER_BTN_1}</span>
                        </div>
                    );
                    break;
                }
        }
        return view;
    }
    render() {
        return (
            <div>
                {(this.props.type == "OnAboutTheSeller" ||this.props.type == "enqSent" ) && this.state.CallNowWidgetContainer ? <this.state.CallNowWidgetContainer category={this.props.category} action={this.props.action} label={this.props.label} pageName="PDP" callId={'call' + this.props.type + this.props.data["PC_ITEM_DISPLAY_ID"]} {...this.state.callProps} /> : ''}
                {this.getView()}
            </div>
        )
    }
}