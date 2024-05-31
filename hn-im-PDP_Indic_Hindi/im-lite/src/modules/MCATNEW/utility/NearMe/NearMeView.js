import React from 'react';

function showNearMe(cityName) {
        if (sessionStorage.getItem("CTDC") && cityName && sessionStorage.getItem("CTDC") === cityName) {
            return false;
        }
        return true;
}
const NearMeView = (props) =>{
    let nearMe = props.countryIso == 'IN' && showNearMe(props.cityName) ? <div id="nearMeDiv" className = "nearmeCss wh9929"  onclick={props.onNearMeClick}>
                <i className="dib vam w14 h16">
                    <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 54 54">
                        <path className="grnlocFloc" d="M27,0V54"></path>
                        <path className="grnlocFloc"  d="M0,27H54"></path>
                        <circle className="grnlocFloc" cx="27.38" cy="26.63" r="16.88"></circle>
                        <circle className="grnloc-2Floc" cx="27.38" cy="26.63" r="8.25"></circle>
                    </svg>
                </i>
                <span className="clrBl fw wnr pdl5">{props.cta}</span>
    </div>:'';
    return (<>{nearMe}</>)

    
}

export default NearMeView;