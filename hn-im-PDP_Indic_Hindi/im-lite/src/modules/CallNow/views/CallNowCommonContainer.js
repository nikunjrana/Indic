import { mobileNumber } from "../utility/updateMobileNumber";
import React from 'react';

export const CallNowCommonUpperContainer = (props) => {
    return (
        <div id="callNowDiv">
            {ImageDiv({image:props.image, companyName:props.companyName})}
            {TSCodeandCompanyName({tsCode:props.tsCode, companyName:props.companyName})}
            {ContactNumber({contactNumber:props.contactNumber})}
        </div>

    )
}

export const ImageDiv = (props) => {
    return (
        <div >
            <img class="prd_img" src={props.image ? props.image : "https://m.imimg.com/gifs/img/prod-img.png"} alt={props.companyName} />
        </div>)
}


export const TSCodeandCompanyName = (props) => {
    return (
        <h2 className="db m5 fs16">
            {props.tsCode ? <span className="mim_bg tsIcn dib mr3"></span> : ""}
            {props.companyName}
        </h2>)
}


export const ContactNumber = (props) => {
    return (
        <div class="por fs15 dib mb10">
            <span className="mim_bg phnIcn poa"></span>
            {TransformContactNumber({contactNumber:props.contactNumber})}
        </div>)
}

export const TransformContactNumber = (props) =>{
    let updatedNo = mobileNumber(props.contactNumber);
    updatedNo = updatedNo.indexOf(',') > -1 ? updatedNo.split(',')[0] : updatedNo;
    updatedNo = "+91-" + updatedNo.slice(0, 2) + "XXXXXX" + updatedNo.slice(-2);
    return updatedNo;
}

export const Loader = () =>{
    return (
        <div class="mbg1 uxMbg dn" id="succLoader" >
            <div class="poa sCntr pd15">
                <div class="loader"></div>
            </div>
        </div>
    )
}


