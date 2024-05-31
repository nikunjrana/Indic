import "../../CSS/productName.css";
import React from 'react';
import { goToRoute } from "../../../../Globals/GlobalFunc";
import "../../CSS/card.css";
import { VERNACULAR_ARR } from "../../../../constants/constants";
import mcatHelper from "../../utility/helper";
import { setCookie} from '../../../../Globals/CookieManager'; 

function ProductName(props)  {    
    let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
    let Imesh = props.getCookie('ImeshVisitor');
    let eventActionSec = 'Hindi-Product-Display-Name'
    let eventAction = 'Product-Listing-Clicks-Product-Name';
    let classes = "fwn lh24 oh clrBl fs16 maxh80 lineClamp4 ellipse";
    let secondaryClasses = "wr oh lineClamp4 fs14 fw clgrey";
    if(props.tracking.langCookie == VERNACULAR_ARR['hi'] && props.name && props.productSecondaryName && props.name != props.productSecondaryName) {
        eventAction = 'Hindi-Product-Display-Name' 
        eventActionSec = 'Product-Name';  
        classes = 'fs16 fwn oh '+(props.tracking.langCookie == "1"?'maxh75 lh20 clrBl lineClamp4':'clrBl maxh75 mb5');
    }
    const ProdHTML = 
    props.urlType == 'MINIPDP' ? <div className={classes} onClick={()=>requestAnimationFrame(()=>setTimeout(()=>props.openMiniPDP(props.data,props.id,props.eventLabel),0))} dangerouslySetInnerHTML={{ __html:props.name }}></div> : 
    (multi_purpose && multi_purpose.userViewCount==5 && !Imesh) ?
    <a href={`/${props.url}`}  onClick={(e)=> {e.preventDefault(); goToRoute(`/${props.url}`);
        props.eventTracking(props.tracking.click,eventAction,props.eventLabel,1);}}
    ><h2 className= {classes} dangerouslySetInnerHTML={{__html:props.name}}></h2></a>
    :
    <a href={`/${props.url}`}  onClick={(e)=> {setCookie("ImageData",mcatHelper.modifyImgSrc(props.srcList)); window.location.href = `/${props.url}`;
        props.eventTracking(props.tracking.click,eventAction,props.eventLabel,1);
        e.preventDefault(); }}
    ><h2 className= {classes} dangerouslySetInnerHTML={{__html:props.name}}></h2>
        </a>
    
    const secondaryProdHTML = (props.productSecondaryName && props.name && !props.productSecondaryName.includes(props.name)) ?
    props.urlType == 'MINIPDP' ? <div className={secondaryClasses} onClick={()=>props.openMiniPDP(props.data,props.id,props.eventLabel)} dangerouslySetInnerHTML={{ __html:props.productSecondaryName }}></div> :
    (multi_purpose && multi_purpose.userViewCount==5 && !Imesh) ?
    <a  href={`/${props.url}`} onClick={(e)=> { e.preventDefault(); goToRoute(`/${props.url}`);
        props.eventTracking(props.tracking.click,eventActionSec,props.eventLabel,1);}} >
            <h2 className={secondaryClasses} dangerouslySetInnerHTML={{__html:props.productSecondaryName}}></h2>
    </a>:
    <a  href={`/${props.url}`} onClick={(e)=> { window.location.href = `/${props.url}`;
        props.eventTracking(props.tracking.click,eventActionSec,props.eventLabel,1);
        e.preventDefault(); }} ><h2 className={secondaryClasses} dangerouslySetInnerHTML={{__html:props.productSecondaryName}}></h2>
    </a>
    : ""
    return (
        <div>
            {ProdHTML}
            {secondaryProdHTML}
        </div>

    )    

}
export default ProductName;