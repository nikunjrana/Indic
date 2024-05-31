import React from 'react';

const SellerHeading = (props) => {
    return (
        <div className="df jcs aic pdb6">
            <div className="df aic">
                <div className="verLine"></div>
                <h3 className=" mt2 fs17 fwb pdl10 dib ">{props.vernacularData != undefined ? props.vernacularData.LOC_LABEL15 : "Find Sellers Near You!"}</h3>
            </div>
            <div className="mcatIcon mcatLocIcon mr8"></div>
        </div>
    )
}

export default SellerHeading;
