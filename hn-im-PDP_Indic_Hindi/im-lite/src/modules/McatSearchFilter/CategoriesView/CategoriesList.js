import React from "react";
import { Link } from "react-router";
import { eventTracking } from "../../../Globals/GaTracking";
import { getCookieValByKey } from "../../../Globals/CookieManager";

const CategoriesList = (props) => {
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid= getCookieValByKey('ImeshVisitor', 'glid');
    let Noisomorph = (SSR && ((SSR["userViewCount"] == 5 && (glid == undefined))))
    ?true : false
    let dataArrSanity =props.categoriesData?props.categoriesData:[];
    let dataArr = props.selectedHead?dataArrSanity.map(item=>{ return [item.FK_ISQ_OPTION_TEXT,item] }) :dataArrSanity.map(item=>{ return [item.NAME,item] }); 
    let maparr = new Map(dataArr);
    let filteredData = [...maparr.values()];
    if(filteredData&&filteredData.length&&filteredData.length==0&&window.location.href.includes("/isearch.php")&&window.location.href.includes("/isearch.php")){
        props.setShowRelatedMcatSearch(false);
        return(<></>);
    }
    let categoriesList = filteredData.map((item, index) => {
        let linkParams = props.selectedHead?{ pathname: item.ISQ_URL  }:(window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?{ pathname: item.LINK+ (item.QUERY ? item.QUERY:""), query:{"utm_source":"Adwords"}}:{ pathname: item.LINK + (item.QUERY? item.QUERY:"")};
        let name = props.selectedHead?item.FK_ISQ_OPTION_TEXT:item.NAME;
        let srchTerm = props.searchTermval?props.searchTermval:window.location.href.includes("/isearch.php") ? window.location.href.split("=")[1].split("&")[0].replace(/\+/g, ' ') : ""; 
        srchTerm = srchTerm ? srchTerm.replace(/(%2B|%20|\s|\+\+)+/g, ' ') : '';
        srchTerm = srchTerm ? srchTerm.replace(/\s+$/, '') : '';
        let clicked = srchTerm == name ? '' : props.onBubbleClick ;
        return (
           ( window.location.href.includes("/isearch.php") && window.srchFltrNew||props.page=="Search") ?
                            props.cityName ? srchTerm.toLowerCase() == name.toLowerCase() ? '' :
                            <div className="filterUnsel filter" onClick={(e) => { eventTracking(props.tracking.click,"Category-Filter",`Related-Category${index + 1}-Clicked`,1)}}>
                                <a data-index={index} href={"/isearch.php?s=" + item.NAME + "&cq=" + props.cityName } onClick={(event)=>{event.preventDefault();window.location.href=("/isearch.php?s=" + item.NAME + "&cq=" + props.cityName);clicked}} >
                                {name} </a>
                            </div> : 
                            srchTerm.toLowerCase() == name.toLowerCase() ? '' :<div className="filterUnsel filter" onClick={(e) => {eventTracking(props.tracking.click,"Category-Filter",`Related-Category${index + 1}-Clicked`,1);}}>
                            <a data-index={index} href={"/isearch.php?s=" + item.NAME} onClick={(event)=>{event.preventDefault();window.location.href=("/isearch.php?s=" + item.NAME);clicked}}>
                                {name}
                            </a>
                        </div>
             :
            <div className={name == props.categoryName ?"Schip":"Uchip"} onClick={(e) => {eventTracking(props.tracking.click,props.categoryTray?`FilterTray-${props.type}`:"ISQ-tray",`${props.categoryTray?`FilterTray-${props.type}`:"ISQ"}-Tray${index + 1}-Clicked`,1);}}>   
                {Noisomorph?<Link data-index={index} to={props.categoryTray?linkParams:linkParams.pathname} onClick={props.onBubbleClick}>{name}</Link>:<a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); props.onBubbleClick; event.preventDefault(); }}>{name}</a>}
            </div>
        );
    });
    return categoriesList;
};

export default CategoriesList;