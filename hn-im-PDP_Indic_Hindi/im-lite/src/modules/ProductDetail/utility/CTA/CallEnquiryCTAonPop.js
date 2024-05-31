import React from 'react';
import CallNow from './CallNow';
import GetEnquiry from './GetEnquiry';
export default function CallEnquiryCTAonPop(props) {
    return (
        <div className="tc pf bt0 w100 pd10 zIn999">
            <CallNow category={props.category}  enqCtaDisabled = {props.enqCtaDisabled} action={props.action} label={props.label} mountCallVerfPopUp={props.mountCallVerfPopUp} type="BelowImageCTA" pageLang=  {props.pageLang} data={props.data} translatedTxt={props.translatedTxt} isExtended={props.isExtended} isZoom={true} />
            <GetEnquiry
             enqCtaDisabled = {props.enqCtaDisabled}
             pageLang={props.pageLang} data={props.data} translatedTxt={props.translatedTxt} isExtended={props.isExtended} isZoom={true} isExtendedIndex={props.isExtendedIndex} queryRef={props.queryRef} pageName={props.pageName} cta_name={props.cta_name} />
        </div>
    )
}