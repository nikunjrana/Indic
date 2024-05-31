import React from 'react';
import { Link } from 'react-router';
import {eventTracking} from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';
 const BizFilterPopUp = props =>{
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let Noisomorph = (SSR && ((SSR["userViewCount"] == 5 && (glid == undefined))))
    ?true : false
    let s = (props.searchParam && props.searchParam.slice(1).split('&').length > 0) ? props.searchParam.slice(1).split('&')[0] : '';
    let view =   props.bizData.map(
                    (item,index)=>{
                        let linkParams = item.QUERY?{pathname : item.LINK,search: item.QUERY}:{pathname : item.LINK,search:''}
                        let name = item.NAME;
                        let isAll = name=='All' && props.location.query.ecom_only ? true : false ;
                        return props.bizNameSelected!=name ?<div className = 'filterUnsel filter' onClick={(e)=>{
                            eventTracking(props.tracking.click,'Price-Biz-Filter',name,1);
                           }}>{Noisomorph ? <Link data-index={index} to= {linkParams} onClick={()=>props.onBubbleClick()}>{name}</Link> : <a data-index={index} href={linkParams.pathname + linkParams.search} onClick={(event) => { window.location.href = (linkParams.pathname + linkParams.search); props.onBubbleClick; event.preventDefault(); }}>{name}</a>}</div> :<div className = {`${isAll ? 'filterUnsel filter' : 'fltrSlcted filter'}`} >{isAll ? Noisomorph ? <Link to={linkParams} onClick={()=>props.onBubbleClick()}>{name}</Link> : <a data-index={index} href={linkParams.pathname + linkParams.search} onClick={(event) => { window.location.href = (linkParams.pathname + linkParams.search); props.onBubbleClick; event.preventDefault(); }}>{name}</a> : name}</div>
                    }
                )
        let ecomParams = props.location && props.location.search? props.location.search.includes('&biz') ? "/isearch.php" + props.location.search.split('&biz')[0] + '&ecom_only=true': 
        "/isearch.php" + props.location.search + '&ecom_only=true' : '';
        let ecomView = props.isEcomShow ? props.ecomName ? <div className = 'fltrSlcted filter' >Online Retailer</div>
         : <div className='filterUnsel filter' onClick={()=>{
            eventTracking(props.tracking.click,'Shop-Now-Filter',props.ecomName,1)
        }}>
            {Noisomorph ? <Link data-index={1} to= {ecomParams} onClick={()=>props.onBubbleClick()}>Online Retailer</Link> : <a data-index={1} href={ecomParams} onClick={(event) => { window.location.href = (ecomParams); props.onBubbleClick; event.preventDefault(); }}>Online Retailer</a>}
        </div>:''
    return <div>
                <div className="mbg2" onClick={props.closePopup} style={{display:"block"}}></div>
                <div className="filtersListOuter poa bgw translateBizPopup">
                    <div className = 'pd10  filtersListInner' style={{display:"flex"}}>
                    <div class="por citySuggest fw w100">Seller Type</div>
                    {view}
                    {ecomView}
                    </div>
                </div>
            </div>
}
export default BizFilterPopUp;