import React from 'react';

export default function PDPCompanyName(props) {

    let slrCmpnyName = props.data.COMPANYNAME, slrCmpnyCity = props.data.CITY, slrCmpnyDetail = '', sentMsg= '', isIsDisabled='', isEcom='';
    
    isEcom = props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM == 1:''; 
    isIsDisabled = props.enqCtaDisabled   && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID)?true:false;

    let checkEnqStatus = this.props.enqSentFrom? true:false;
    let sentMg = checkEnqStatus? 'Your Request for Photos has been':'Your requirement is';

    sentMsg = (<div id={"reqSentCmpnyId"+ props.data.PC_ITEM_DISPLAY_ID} class="fs13 pdb10 clr5a mt2 flx fleCntr">
    <span className='reqrmntSentIcon vam dib'></span>
    <span>{sentMg} sent to {slrCmpnyName}{(slrCmpnyCity && slrCmpnyCity !== '') ? ', ' + slrCmpnyCity : ''}</span></div>);

    slrCmpnyDetail = isIsDisabled && !isEcom? sentMsg : <p id={"CmpnyId"+ props.data.PC_ITEM_DISPLAY_ID} class="fs13 mxht1000 pdb10 clr5a mt2">by: {slrCmpnyName}{(slrCmpnyCity && slrCmpnyCity !== '') ? ', ' + slrCmpnyCity : ''}</p>;


    return slrCmpnyDetail;
}

