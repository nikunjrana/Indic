import React from 'react';
function SellerType(props) {
    let icon = "";
    let sellerType = "";
    if (props.custTypeWeight == 149 || props.custTypeWeight == 179 || props.tsCode) {
      icon = "tseaIco";
      sellerType = "TrustSEAL Verified";
    } else if (props.custTypeWeight < 1400 && props.custTypeWeight != 750) {
      icon = "vfdIco ";
      sellerType = "Verified Seller";
    } else {
      icon = "";
    }
    
    const sellerTypeData = (props.custTypeWeight == 149 || props.custTypeWeight == 179 || props.tsCode) || (props.custTypeWeight < 1400 && props.custTypeWeight != 750) ?
    <div className="df por">
        <i className={"mcatIcon wh15 mr5 poa lft0 top-2 " + icon}></i>
        <span className="clr33 ellipsis oh pdb7 pdl20 fs12">{sellerType}</span>
    </div>:'';
    return(
        sellerTypeData
    );
}
export default SellerType;