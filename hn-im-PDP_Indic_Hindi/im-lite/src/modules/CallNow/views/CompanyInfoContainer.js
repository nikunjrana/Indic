import { mobileNumber } from "../utility/updateMobileNumber";
import React from 'react';

export const CompanyInfoContainer = (props) => {
    return (
        <div id="callNowDiv">
        {ImageDiv({image:props.image, companyName:props.companyName})}
        {!(window.pagename && (window.pagename=="PDP" || window.pagename.toLowerCase().includes("search")))?<>{TSCodeandCompanyName({tsCode:props.tsCode, companyName:props.companyName, custtypeWeight:props.custtypeWeight})}
        {ContactNumber({contactNumber:props.contactNumber})}</>:<><p className="m5 fs16 fw">{props.productName}</p>{ContactNumber({contactNumber:props.contactNumber})}</>}
    </div>

    )
}

export const ImageDiv = (props) => {
    let cls = 'prd_img callPrdImg';
    return (
        <div className="callImgBox">
            <img class={cls} src={props.image ? props.image : "https://m.imimg.com/gifs/img/prod-img.png"} alt={props.companyName} />
        </div>)
}


export const ProductNameDiv = (props) => {
    return (
        <p className="callPrdName dn">
            {props.productName}
        </p>)
}


export const TSCodeandCompanyName = (props) => {
    return (
        <h2 className="db m5 fs16 callPrdCompName">
            {props.tsCode ? <span className={window.pagename && window.pagename=="PDP"?"trustSealSvg wh15 dib mr3":"mim_bg tsIcn dib mr3"}></span>  
            : (props.custtypeWeight != '' && props.custtypeWeight >= 200 && props.custtypeWeight != 750)  ? (props.custtypeWeight <= 699) ? <span className="verifiedSvg wh15_16 dib mr3 wh15 bgNorepeat"></span> 
            : (props.custtypeWeight > 699 && props.custtypeWeight <= 1400) ? <span className="verifiedSvgGr wh15_16 dib mr3 wh15 bgNorepeat"></span> : ""
            :""}
            {props.companyName}
        </h2>)
}


export const PriceDiv = (props) => {
    return (
        <p className="callPrdPrice dn">
            {props.productPrice}
        </p>)
}


export const ContactNumber = (props) => {
    return (
        <div class="por fs15 dib mb10 callPrdNumber">
             <span className={window.pagename && window.pagename=="PDP"?"callIcnSvg wh13 bgNorepeat poa mml14 mt2":"mim_bg phnIcn poa"}></span>
            {TransformContactNumber({contactNumber:props.contactNumber})}
        </div>)
}

export const TransformContactNumber = (props) =>{
    let updatedNo = mobileNumber(props.contactNumber);
    if(updatedNo){
        updatedNo = updatedNo.indexOf(',') > -1 ? updatedNo.split(',')[0] : updatedNo;
        updatedNo = "+91-" + updatedNo.slice(0, 2) + "XXXXXX" + updatedNo.slice(-2);
        return updatedNo;
    }
    return "";

}



