import React from 'react';

function ProductName(props) {
    return (
            <section className={` bgw db crx t_tc ${props.isZoom?"prdNmTruncateOnZoom":""}`}>
                            <h1 className="fw mxht1000 fs15 pdb5 wr">{props.data.PC_ITEM_DISPLAY_NAME ? props.data.PC_ITEM_DISPLAY_NAME : props.data.PC_ITEM_NAME}</h1>
                            {props.data.PC_ITEM_HINDI_NAME_REVIEW_FLAG && props.data.PC_ITEM_HINDI_NAME ?<p id="Hindiname" className="fs13 pdb5">{props.data.PC_ITEM_HINDI_NAME}</p>:''}
            </section>

    );
}

export default ProductName;