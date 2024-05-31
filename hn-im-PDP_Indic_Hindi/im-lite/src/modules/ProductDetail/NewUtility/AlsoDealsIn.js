import React, { Component } from 'react';
import { service_link } from '../../../Globals/MainFunctions';
import { checkEnquirySentRelated, generateUniqueKey, modifyImgSrc } from '../utility/helper';
import { formatINRPrice } from '../../../Globals/priceModification';
import CallCta from './CallCta';
import EnquiryCTA from './EnquiryCTA';
import { eventTracking } from '../../../Globals/GaTracking';
import { setCookie } from "../../../Globals/CookieManager";

class AlsoDealsIn extends Component {
    constructor(props) {
        super(props);
        this.moreProducts = this.moreProducts.bind(this);
        this.state = {enquirySent: false}
        this.enqDisplayIDs=[]; 
        this.stylingCSS = `
        .top_indus1{overflow-x:scroll;overflow-y:hidden;white-space:nowrap;position:relative;overflow-y:hidden;width:100%;transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0)}
        .top_indus1 ul{width:322px}
        .top_indus1 ul li{width:48%;height:126px;text-align:center;display:inline-table;border-right: none;}
        .ht125px{height:125px}.w125p{width:125px}`
        if(this.props.callNowClick!="" && typeof this.props.callNowClick=='function') {
            let lsData=localStorage ? JSON.parse(localStorage.getItem("imEqGl")) : "";
            if (lsData && (lsData['date'] < (JSON.parse(JSON.stringify(new Date()))))) {
                localStorage.removeItem("imEqGl");
                lsData="";
            }
            let cookieData = lsData ? lsData['displayId'] : "undef";
            this.enqDisplayIDs = cookieData!="undef" && cookieData.length>0 ? cookieData.split(",") : [];
        }
        this.callProps={}
        this.checkEnquiryStatus = this.checkEnquiryStatus.bind(this)
    }

    checkEnquiryStatus() {
        this.setState({enquirySent: true})
    }

    checkIDinArray(displayId) {
        let array1 = this.enqDisplayIDs.length>0?this.enqDisplayIDs.filter((item)=> {
            if(item==displayId) {
                return item;
            }
        }):[]
        return array1.length>0  ? true : false;
    }
    
    moreProducts() {
        let List = [];
        let dataForWidget = this.props.relatedMCATData && this.props.relatedMCATData.Data && this.props.relatedMCATData.Data[0] && this.props.relatedMCATData.Data[0].RELATED_PRODUCTS;
        if (dataForWidget && dataForWidget.length) {
            for (let index = 0; index < dataForWidget.length; index++) {
                let mcat_name = dataForWidget[index] && dataForWidget[index].PC_ITEM_NAME ? dataForWidget[index].PC_ITEM_NAME : "";
                let id = dataForWidget[index].PC_ITEM_DISPLAY_ID;
                let isEnquirySent = this.props.callNowClick=="" ? false : checkEnquirySentRelated(id);
                let host_link = service_link(mcat_name, id);
                let imageforWidget = dataForWidget[index].PC_ITEM_IMG_SMALL ? dataForWidget[index].PC_ITEM_IMG_SMALL : "";
                imageforWidget = modifyImgSrc(imageforWidget);
                let price = dataForWidget[index].FOB_PRICE ?  dataForWidget[index].PRICE_SEO ?  dataForWidget[index].PRICE_SEO : '₹ ' + formatINRPrice(dataForWidget[index].FOB_PRICE) + (dataForWidget[index].PC_ITEM_MOQ_UNIT_TYPE ? ' / ' + dataForWidget[index].PC_ITEM_MOQ_UNIT_TYPE : '') : '';
                let keyVal = generateUniqueKey()
                List.push(
                 <li key={keyVal} className="tc crx mr10 bgw mt5">
                    <div className="pdb10 pdt10">
                    {this.props.isCSR && this.props.linkTag ?
                    <this.props.linkTag to={host_link} className="dib ht125px w125p ma oh" onClick={()=>{
                    eventTracking('Product-Page-Clicks', 'Also-Deals-In' , 'image-' + index, true);}}>
                    <div className="dtc w125p ht125px vam">
                    <img className="favImg" loading="lazy" src={imageforWidget} alt={mcat_name}/>
                    </div>
                    </this.props.linkTag>
                    :
                    <a href={host_link} className="dib ht125px w125p ma oh" onClick={()=>{
                    setCookie("ImageData",modifyImgSrc(imageforWidget));
                    eventTracking('Product-Page-Clicks', 'Also-Deals-In' , 'image-' + index, true);}}>
                    <div className="dtc w125p ht125px vam">
                    <img className="favImg" loading="lazy" src={imageforWidget} alt={mcat_name}/>
                    </div>
                    </a>}
                    {this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag to={host_link} onClick={()=>{
                        eventTracking('Product-Page-Clicks', 'More_product_from_same_seller', 'Product_name_clicked' + index, true)
                    }} className="db clrb pdl5 pdr5 mt10 lh18 mb10 wr ht35 whNr oh fadElip por">{mcat_name}</this.props.linkTag>
                    :
                    <a href={host_link} onClick={()=>{
                        setCookie("ImageData",modifyImgSrc(imageforWidget));
                        eventTracking('Product-Page-Clicks', 'More_product_from_same_seller', 'Product_name_clicked' + index, true)
                    }} className="db clrb pdl5 pdr5 mt10 lh18 mb10 wr ht35 whNr oh fadElip por">{mcat_name}</a>}
                    {price ? (this.props.isCSR && this.props.linkTag ? 
                    <this.props.linkTag className="db pdl5 pdr5 wr fw ht27 whNr clrBl notranslate" to={host_link} onClick={()=>{
                        eventTracking('Product-Page-Clicks','More_product_from_same_seller', 'Price_clicked' + index, true);
                        }}>{price}</this.props.linkTag>
                    :
                    <a className="db pdl5 pdr5 wr fw ht27 whNr clrBl notranslate" href={host_link} onClick={()=>{
                    eventTracking('Product-Page-Clicks','More_product_from_same_seller', 'Price_clicked' + index, true);
                    }}>{price}</a>) : (<i className="db pdl5 pdr5 wr ht27 whNr clr99">Get Latest Price</i>)}
                    {!this.props.isEcom? <EnquiryCTA type="alsoDealsIn" isEnquirySent={isEnquirySent} data={dataForWidget[index]} callNowClick={this.props.callNowClick} showModal={this.props.showModal} imgSrc={imageforWidget} cat_ID={dataForWidget[index].CAT_ID ? dataForWidget[index].CAT_ID : this.props.data.CAT_ID}
                    transformedNo = {this.props.transformedNo} callProps={this.callProps}/>: ""}
                    </div></li>)
                }
            }
            return(List);
    }

    componentDidMount() {
        document.addEventListener("enquirySent",this.checkEnquiryStatus);
    }

    render() {
        if(this.props.callProps) {
        this.callProps = {
            CONTACT_NUMBER:this.props.callProps.CONTACT_NUMBER,
            CONTACT_TYPE:  this.props.callProps.CONTACT_TYPE,
            compname:  this.props.callProps.compname,
            glusrid: this.props.callProps.glusrid,
            itemId:this.props.callProps.itemIdD,
            itemImage: this.props.firstimage,
            mcatid: this.props.callProps.mcatid,
            mcatname: this.props.callProps.mcatname,
            dbpagetrack: "PDP_AlsoDealsIn",
            page: 'PDP',
            itemName:  this.props.callProps.itemName,
            tscode: this.props.callProps.tscode,
            eventLabel:'',
            eventAction: (this.props.callProps.CONTACT_TYPE == 'PNS' ? 'Clicked-PNS' : "Clicked-NonPNS")+(`|IMOB_PDP_Catalog_Info|AlsoDealsIn|${this.props.callProps.PAID_TYPE}`),
            custtypeWeight:this.props.callProps.custtypeWeight,
            call_txt : "कॉल करें",
            query_ref_id: this.props.callProps.mcatid,
            query_ref_type:this.props.callProps.mcatname,
            modrefid: this.props.callProps.modrefid, 
            modrefname: this.props.callProps.modrefname,
            PAID_TYPE:this.props.callProps.PAID_TYPE
            }
        }
        return (
            <React.Fragment>
            <section className="w100 mt10 por btmtop ">
                <style>{this.stylingCSS}</style>
                <div className='dflex mt5'><p id="isAbt" className="pd10 fw fs17 mxht1000 mt10 ">से अधिक उत्पाद {this.props.data.COMPANYNAME}</p>
                {!this.props.isEcom ? <div id='alsoDealsInCall' className='mr10 mla'><CallCta data={this.props.data} transformedNo={this.props.transformedNo} type="alsoDealsIn" callProps={this.callProps} eventAction={this.callProps.eventAction} eventLabel={"PDP_AlsoDealsIn"}
                displayPopup = {
                    () => {
                    this.props.callNowClick("कॉल करें",
                    this.callProps.itemImage,this.callProps.tscode, this.callProps.compname,
                    this.callProps.CONTACT_NUMBER, this.callProps.CONTACT_TYPE, this.callProps.glusrid,
                    this.callProps.itemId, this.callProps.itemName,this.callProps.mcatid,this.callProps.mcatname,"IMOB_PDP_Catalog_Info|AlsoDealsIn",  this.callProps.PAID_TYPE)
                    }
                }/></div>: ""}</div>
                <div className="top_indus1 pl10 pr10 pdt5 pdb5 scrbrH">
                <ul>
                {this.moreProducts()}
                </ul>
                </div>
        </section>
            </React.Fragment>
        );
    }
}

export default AlsoDealsIn;