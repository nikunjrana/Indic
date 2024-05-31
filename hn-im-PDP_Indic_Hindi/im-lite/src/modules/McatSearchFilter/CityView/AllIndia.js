import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';
const AllIndia = (props) => {
    let allIndia = '';
    let allIndiaClass = props.cityName ? `${props.page=="Mcat"?"Unsel":"filterUnsel"} filter` : `${props.page=="Mcat"?"Slcted":"fltrSlcted"} filter`;
    let allIndiaName = "All India";
    let pathname = props.allIndiaLink;
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    if((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")){
        pathname.query={"utm_source":"Adwords"}
    }
    allIndia = props.cityName ?
            
        (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) ?
            (<div className={`txtclr ${allIndiaClass}`} onClick={(e) => { eventTracking(props.tracking.click, 'All-India-Clicked', 'Select-City', 1) }}>
                {((SSR && (SSR["userViewCount"] == 5)) || glid == '5414044002' || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link to={pathname} data-index="allIndia" onClick={props.onBubbleClick}>{allIndiaName}</Link> : <a href={pathname.pathname} data-index="allIndia" onClick={(event) => { window.location.href = (pathname.pathname); props.onBubbleClick; event.preventDefault(); }}>{allIndiaName}</a>}
            </div>)

            : (window.location.href.includes("isearch.php") ? <div className={`txtclr ${allIndiaClass}`} onClick={(e) => { eventTracking(props.tracking.click, 'All-India-Clicked', 'Select-City', 1) }}>
                <a href={pathname.pathname + pathname.search} data-index="allIndia" onClick={(event) => { window.location.href = (pathname.pathname + pathname.search); props.onBubbleClick; event.preventDefault(); }}>{allIndiaName}</a>
            </div> : (<div className={`txtclr ${allIndiaClass}`} onClick={(e) => { eventTracking(props.tracking.click, 'All-India-Clicked', 'Select-City', 1) }}>
                <Link to={pathname} data-index="allIndia" onClick={props.onBubbleClick}>{allIndiaName}</Link>
            </div>
            )
            )
        

        : <div className={allIndiaClass}>
            {allIndiaName}
        </div>;
    return allIndia
}

export default AllIndia;