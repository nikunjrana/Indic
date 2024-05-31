import React from 'react';
import '../CSS/firstfold.css';
import { decodeEntityCode, getProdNames } from './helper';

function handleHindiNameReview(data, pageLang) {
    let hindiNameReview = data.PC_ITEM_HINDI_NAME_REVIEW_FLAG !==''? data.PC_ITEM_HINDI_NAME_REVIEW_FLAG : 1;
   
    if ((pageLang == "LangEn"|| pageLang == "LangHi") && hindiNameReview === 1) {
        return (
            data.PC_ITEM_HINDI_NAME ? data.PC_ITEM_HINDI_NAME : ''
            )
    }else if (pageLang == "LangHi" && hindiNameReview === 0) {
        return (
            data.PC_ITEM_HINDI_NAME ? data.PC_ITEM_HINDI_NAME : ''
            )
    }else {
        return '';
    }
}
export default function ProductName(props) {

    let displayName = '', displayHindiName = '', hindiNameReview = props.data.PC_ITEM_HINDI_NAME_REVIEW_FLAG ? props.data.PC_ITEM_HINDI_NAME_REVIEW_FLAG : 1;
    displayName = props.data.PC_ITEM_DISPLAY_NAME ? props.data.PC_ITEM_DISPLAY_NAME : props.data.PC_ITEM_NAME;
    displayName=displayName? decodeEntityCode(displayName).replace(/[$@?¿&!~_*^]/g, ''):"";
    displayHindiName = handleHindiNameReview(props.data,props.pageLang);
    displayHindiName = displayHindiName ? decodeEntityCode(displayHindiName) : '';
    return (

        <section className="bgw db crx t_tc prdNmTruncateOnZoom">
            {getProdNames(props.pageLang, displayHindiName, displayName, props.isFix)}
        </section>
    );
}

