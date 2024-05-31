import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';
import { checkUserStatus } from '../../../Globals/MainFunctions';
const CityList = (props) =>{
    let list_Check=[];
    let cityList = props.cityData && props.cityData.cities && props.cityData.cities.length>0 ?      
                    props.cityData.cities.filter(e => e.NAME !== (props.query.cq ? props.query.cq : '')).map(
                        (item,index)=>{
                           if (props.query.s && props.query.s != '' && item.QUERY){
                               let temp = []
                                for (let q of item.QUERY.slice(1).split('&')){
                                    if (q.includes('s='))
                                        temp.push('s=' + (props.flName ? props.flName : props.query.s))
                                    else temp.push(q)
                                }
                                item.QUERY = '?' + temp.join('&')
                           }
                            let linkParams = (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords") ? { pathname: item.LINK, search: item.QUERY ? item.QUERY + (props.query.biz ? '&biz=' + props.query.biz : '') : props.searchParam.split("=")[0].match('biz') ? props.searchParam : "", query:{"utm_source":"Adwords"}} 
                            : { pathname: item.LINK, search: item.QUERY ? item.QUERY + (props.query.biz ? '&biz=' + props.query.biz : '') : props.searchParam.split("=")[0].match('biz') ? props.searchParam : "" }
                            let name = item.NAME;
                            let lbl= props.openCityFilterView ? `Top-City${index+1}-Clicked-Ins` : `Top-City${index+1}-Clicked-Out`;
                            let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
                            let glid=getCookieValByKey('ImeshVisitor', 'glid');
                            if (window && window.location && window.location.href && window.location.href.indexOf('/isearch.php?') > -1 && (list_Check && list_Check.includes(name) || (name && name.toLowerCase() == 'null'))) return <></>;
                            list_Check.push(name)
                            return  <div className = {props.page=="Mcat"?"Unsel filter":'filterUnsel filter'} onClick = {(e)=>{
                                window && window.location && window.location.href && window.location.href.indexOf('/isearch.php?') > -1&&props.scrollLeftOnClick?props.scrollLeftOnClick():'';
                                eventTracking(props.tracking.click,'Location-Filter',lbl,1);
                                let sellerIntent  =(localStorage.getItem("sellerIntent"))? JSON.parse(localStorage.getItem("sellerIntent")):"";
                                (sellerIntent && sellerIntent.Intent&&checkUserStatus()==2  )?eventTracking(props.tracking.click,'Location-Filter',`Top-City${index+1}-Clicked-SOI-Button`,1):"";
                                }}>
                                {(window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) ? ((SSR && (SSR["userViewCount"] == 5)) || glid == '5414044002' || (localStorage.getItem("truecallerimpression") && (glid == undefined))) ? <Link data-index={index} to={linkParams} onClick={props.onBubbleClick}>{name}</Link> : <a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); props.onBubbleClick; event.preventDefault(); }}>{name}</a> :
                                    window.location.href.includes("isearch.php") ? <a data-index={index} href={linkParams.pathname + linkParams.search
                                    } onClick={(event) => {
                                        ; window.location.href = (linkParams.pathname + linkParams.search
                                        ); props.onBubbleClick; event.preventDefault();
                                    }}>{name}</a> : <Link data-index={index} to={linkParams} onClick={props.onBubbleClick}>{name}</Link>}
                                    </div>
                        }
                    )
    : props.page && props.page=="Mcat" && props.prefData ? props.prefData.map((item,index)=>{
        if((props.cityName && props.cityName.toLowerCase())!= item.NAME.toLowerCase()){
        return(
        <div className="Unsel filter sttc" onClick={(e) => {eventTracking(props.tracking.click,
            "City-PopUp-Chip-Select-prefLocCity",`City-PopUp-Chip-Clicked`,1);}}>
            <span role="button" data-index={index} onClick={(event) => { window.location.href = (item.LINK); event.preventDefault(); }}>{item.NAME}</span>
       </div>)}
    }):"";
    return cityList

}

export default CityList;