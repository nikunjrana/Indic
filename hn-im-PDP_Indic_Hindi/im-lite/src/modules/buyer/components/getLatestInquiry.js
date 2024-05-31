import React, {Component} from 'react';
//import gblFunc from "../../../Globals/GlobalFunctions";
import '../css/buyerIndex.css';

import {getCookie} from '../../../Globals/CookieManager';
import {eventTracking} from '../../../Globals/GaTracking';


class GetLatestInquiry extends Component {

    constructor(props) {
        super(props);
        this.callUntillDefined = this
            .callUntillDefined
            .bind(this);
    }

    callUntillDefined(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemName, dsplayId) {
        var langSelection = getCookie("lang") == "1"
            ? "LangHi"
            : "LangEn";
        var prdtDesc = this.props.prdtDes == "productDscp"
            ? this.props.pdp_type == "main_pdp"? "_product" : "_product_extended"
            : this.props.pdp_type == "main_pdp"?"_company" : "_company_extended";
        var enqDivId = 'dispid' + pcItemDsplId;
        let IS_PROD_SERV = this.props.isProdServ;
        let dataType = this.props.DATATYPE
            ? this.props.DATATYPE
            : 'product';
        let catId = this.props.CAT_ID
            ? this.props.CAT_ID
            : '';
        let R_custtype_weight = this.props.GLUSR_USR_CUSTTYPE_WEIGHT;
        let modreftype = 2;
        let query = "did=" + dsplayId + "&ctg=" + catId + "&ss=&locality=&modreftype=" + modreftype;
        let query_text = 'product_detail_' + dataType + '_description' + prdtDesc + '_PWA|' + IS_PROD_SERV + '|' + langSelection;

        callUntillDefined('showEnquiryForm', 0, 50, [
            {
                'enq_mcat_id': mcatid,
                'enquiryDivId': enqDivId,
                'enq_sent_color': disableEnqBtn,
                'CefProdType': IS_PROD_SERV,
                'enq_item_price': itemPrice,
                'query': query,
                'company': cmpName,
                'formType': 'overlay',
                'query_text': query_text,
                'R_glusr_id': glUserId,
                'R_custtype_weight': R_custtype_weight,
                'R_title': PcItemName,
                'enqConv': 'on',
                'int_rec': '1',
                'modid': 'IMOB',
                'displayId': dsplayId,
                'callBakReq': 'callBakReqTrue',
                'product_name': PcItemName
            }
        ]);
    }

    render() { 
        let glUserId = this.props.GLUSR_USR_ID;
        let itemPrice = this.props.FOB_PRICE;
        let cmpName = this.props.COMPANYNAME;
        let mcatid = this.props.BRD_MCAT_ID;
        let pcItemDsplId = this.props.PC_ITEM_DISPLAY_ID;

        let PcItemName = this.props.pcItemName;
        var div_id = this.props.prdtDes == "productDscp"
            ? this.props.pdp_type == "main_pdp"?"CallBkRequest" :"CallBkRequest_ext"
            : this.props.pdp_type == "main_pdp"?"CallBkRequestcomp":"CallBkRequestcomp_ext";
        var price_id = this.props.prdtDes == "productDscp"
            ? this.props.pdp_type == "main_pdp"?"pricereqprd" : "pricereqprd_ext"
            : this.props.pdp_type == "main_pdp"?"pricereqcomp" : "pricereqcomp_ext";
        var gacategry = this.props.prdtDes == "productDscp"
        ? this.props.pdp_type == "main_pdp"?"Product_Description" : "Product_Description_Extended"
        : this.props.pdp_type == "main_pdp"?"Company_Card" : "Company_Card_Extended";
        let getLtstPriceInq = (
            <div
                className="pdt12 pdb12 fs15 mt10 bxrd4 por bgff c2e pl35 pr25"
                id={div_id + pcItemDsplId}
                onClick={() => {
                this.callUntillDefined(mcatid, pcItemDsplId, itemPrice, cmpName, glUserId, PcItemName, pcItemDsplId);
                eventTracking('PWA_Product_Detail', gacategry, 'Get_Latest_Price_clicked');
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="poa tp0 bt0 lft0"
                    style="margin: auto auto auto 3px;">
                    <path
                        fill="#333"
                        fill-rule="nonzero"
                        d="M23.682.117a.4.4 0 0 0-.565 0L21.634 1.6h-9.313L.613 13.404a1.403 1.403 0 0 0-.413.998c0 .377.146.732.413.998l8.186 8.187a1.416 1.416 0 0 0 2-.004l11.4-11.709V2.166L23.683.683a.4.4 0 0 0 0-.566zM21.4 11.55L10.23 23.02a.612.612 0 0 1-.865 0l-8.187-8.186a.613.613 0 0 1 .002-.866L12.654 2.4h8.18l-1.933 1.933A1.987 1.987 0 0 0 17.8 4c-1.103 0-2 .897-2 2s.897 2 2 2c1.102 0 2-.897 2-2 0-.407-.124-.785-.334-1.101L21.4 2.966v8.584zM19 6c0 .662-.539 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2.184 0 .357.046.514.12l-.797.797a.4.4 0 1 0 .565.566l.797-.797c.075.156.12.33.12.514z"/>
                </svg>
                <span className="fw" id={price_id + pcItemDsplId}>Get Latest Price </span> <span> for your requirement</span>
                <span
                    className="poa fs20 rt0 tp0 bt0"
                    style="margin: auto 8px auto auto;height: 20px;">&gt;</span>
            </div>
        );
        return (
            <div>
                <p className="crx"></p>
                {getLtstPriceInq}
            </div>
        );
    }

}

export default GetLatestInquiry;