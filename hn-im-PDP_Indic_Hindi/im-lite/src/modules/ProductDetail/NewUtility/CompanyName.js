import React from 'react';

function CompanyName(props) {
    let isOutOfStock = props.data.PC_ITEM_STATUS_APPROVAL=="9"?true:false;
    let isEcom= props.data.PC_ITEM_IS_ECOM? props.data.PC_ITEM_IS_ECOM:'',
    isEcomURL= props.data.ECOM_CART_URL ? props.data.ECOM_CART_URL : props.data.ECOM_ITEM_LANDING_URL? props.data.ECOM_ITEM_LANDING_URL:'',
    isEcomStoreFlag= props.data.ECOM_STORE_ENABLE_FLAG? props.data.ECOM_STORE_ENABLE_FLAG:'';
    let E_COM_PROD = (isEcomURL && (isEcom && isEcomStoreFlag  == 1)&&!isOutOfStock);
    let isIsDisabled = props.enqCtaDisabled   && props.enqCtaDisabled == (props.data.PC_ITEM_DISPLAY_ID)?true:false;

    function reqSentMsg(isEcom, company, display_id){
    let checkEnqStatus = props.enqSentFrom? true:false;
    let sentMg = checkEnqStatus? 'Your Request for Photos has been':'Your requirement is';

    let sentMsg = (<div id={"isCompanyRqSnt"} className={`fs13 clr5a flx fleCntr pdt5 ${props.IsSSR?"dnipdp":""}`}>
    <span className='reqrmntSentIcon vam dib'></span>
    <span>{sentMg} sent to {company}{props.data.CITY ? ", "+props.data.CITY : ""}</span></div>);

        if(!isEcom){
            return (sentMsg)
        }else{return('') }
    }
    return (
        <>
        {!isIsDisabled||props.IsSSR?<p id={"isCompany"+`${props.data.PC_ITEM_DISPLAY_ID}`} className="fs13 pdb5 clr5a mxht1000">by:{props.data.COMPANYNAME + (props.data.CITY ? ", "+props.data.CITY : "")} </p>:""}
        {isIsDisabled||props.IsSSR? reqSentMsg(isEcom, props.data.COMPANYNAME, props.data.PC_ITEM_DISPLAY_ID) : ''}
        </>
    );
}

export default CompanyName;