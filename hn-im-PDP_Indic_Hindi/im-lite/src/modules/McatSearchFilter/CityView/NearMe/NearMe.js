import React from 'react';

function showNearMe(cityName) {
    if (sessionStorage.getItem("CTDC") && cityName && sessionStorage.getItem("CTDC") === cityName) {
        return false;
    }
    return true;
}
const NearMe = (props) => {
    let nearMe = showNearMe(props.cityName) ?
        <div className={props.page=="Mcat"?"bclrnearMe":'bclrnear filter'} onClick={()=>{props.onBubbleClick(); props.onNearMeClick(); }}>
            <svg className={props.page=="Mcat"?"dib vam mr5 w14 h14":'dib vam mrsrch55 w14 h14 '} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 54 54">
                <path className="grnlocFloc" d="M27,0V54"></path>
                <path className="grnlocFloc" d="M0,27H54"></path>
                <circle className="grnlocFloc" cx="27.38" cy="26.63" r="16.88"></circle>
                <circle className="grnloc-2Floc" cx="27.38" cy="26.63" r="8.25"></circle>
            </svg>

            <span id={window.pageName=="Search-PWA"?'NearMeSrch':''} className="clrBl fw wnr" >{props.detect && props.cta == "Near Me" ? props.detect : props.cta}</span>
        </div> : '';
    return nearMe


}

export default NearMe;