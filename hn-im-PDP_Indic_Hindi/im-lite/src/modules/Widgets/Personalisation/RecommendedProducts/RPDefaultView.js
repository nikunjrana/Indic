import React, { Component } from "react";
import { eventTracking } from '../../../../Globals/GaTracking';
import styles from "../../../../Globals/imageCss";
import { getPrice } from '../../../../Globals/priceModification';
// import { Link } from 'react-router'; will be used in future by Jatin 
import CallNow from '../../../buyer/container/callNowWidgetContainer';

export const RPDefaultView = (props) => {
    return (
        <div id="prodsViewedSection" className="oh mt10 mb10 pdl10 pdb10">
            <p className="fs18 fw clrb pdt10">{props.head}</p>
            <ul className="crx">
                {listItems(props)}
            </ul>
        </div>
    )
}

const listItems = (props) => {
    return props.data.map((items, index) => {
        let callProps = { im_popup: 'im_popup', CONTACT_NUMBER: items.contactnumber, glusrid: items.R_glusr_id, CONTACT_TYPE: items.contactnumber_type, mbgn_askpopup: 'mbgn_askpopup', itemId: items.mcatid, mcatname: items.name, translatedText: props.translatedText, compname: items.company_name, pagename: props.page, prodcss: 1, dbpagetrack: props.callTxt, widgetTrackCatg: 'w3_recently_viewed', widgetTrack: props.trck_param + 'cta_button_callnow', widgetTrackPage: 'IMOB_' + props.page };
        return (
            <li className="w50 fl">
                <div className="pd10 por mnH335 mt10 mr10 tc bdrBed bxdw2 brd10 bgw">
                    <div className="ht125px dib oh">
                        <a className="dtc vam ht125px" href={items.url} onClick={() => eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdimage', 'IMOB_' + props.page, true)}>
                            <div>
                                <img className="favImg lazy" loading="lazy" alt={items.name} src={items.image}></img>
                            </div>
                        </a>
                    </div>
                    <a href={items.url} onClick={() => eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_prdname', 'IMOB_' + props.page, true)} className="tc clrBl db fs15 pdt10 mb10 txtElip">{items.name}</a>
                    {priceData(props, items, index)}
                    <p className="tc fs12 pdt5 clr7B">Sold by<br />
                        <a href={items.website_url} className="fs13 clrBl db pdl5 w100 pdr5 txtElip"
                            onClick={() => { eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_cmpny_nme', 'IMOB_' + props.page, true); }} >
                            {items.company_name}
                        </a>
                    </p>
                    <div className="poa tc w100 bt10 lft0">
                        <CallNow  {...callProps} />
                        <div id={"dispid" + items.display_id} className="dib bxsdw bxrd20 clrw pdt10 pdb10 compBl fs14 w80"
                            onClick={(e) => {
                                if (e.target.innerHTML !== "Enquiry Sent") {
                                    props.showEnqForm(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, '', items.image);
                                    eventTracking('w3_recently_viewed', props.trck_param + 'cta_button_getquotes', 'IMOB_' + props.page, true);
                                }
                            }}>
                            <i className="enqIcn dib vam mr2"></i>
                            {props.enqLabel}
                        </div>
                    </div>
                </div>
            </li>
        )
    });
}

const priceData = (props, items, index) => {

    return ((items.price && items.currency) ?
        <p id={"pp" + items.display_id} className="clr33 tc fs16 fw txtElip"
            onClick={(e) => {
                if (!e.target.getAttribute('data-priceClicked')) {
                    eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_price', 'IMOB_' + props.page, true);
                    props.showEnqForm(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_CLICKED', items.image)
                }
            }}>
            <i style={styles.imageCss().mim_bg} className="rupIco wh15 dib mr5"></i>{getPrice(parseFloat(items.price), '', items.unit)}
        </p>
        :
        <p id={"prcid" + items.display_id + "pr"} className="clrBl tc fs16 fw txtElip"
            onClick={(e) => {
                if (e.target.innerHTML !== "Price Requested") {
                    eventTracking('w3_recently_viewed', props.trck_param + 'cta_click_price_request', 'IMOB_' + props.page, true);
                    props.showEnqForm(items.mcatid, items.display_id, items.price, items.company_name, items.R_glusr_id, items.name, 'PRICE_REQUESTED', items.image)
                }
            }}>
            लेटेस्ट रेट पाएं
        </p>);
}





