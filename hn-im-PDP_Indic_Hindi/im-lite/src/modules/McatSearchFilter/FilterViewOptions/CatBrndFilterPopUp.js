import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../Globals/GaTracking';
import { getCookieValByKey } from '../../../Globals/CookieManager';

function isq_data(data,onBubbleClick,tracking,selected,selectedHead,Noisomorph,allIndiaLink){
    let sorted = {};
    if(data && data.length>0){
    for( let i = 0; i < data.length ; i++ ){
        if( sorted[data[i].FK_ISQ_QUESTION_TEXT] == undefined ){
         sorted[data[i].FK_ISQ_QUESTION_TEXT] = [];
        }
        sorted[data[i].FK_ISQ_QUESTION_TEXT].push(data[i]);
    }}
    let Finaldata = []
       if(Object.keys(sorted) && Object.keys(sorted).length>0){
        for(let i=0;i<Object.keys(sorted).length;i++){
            let Heading =  <div className='por citySuggest fw'>{Object.keys(sorted)[i]}</div>
            let OptionsList = Object.values(sorted)[i].map((item,index)=>{
                let link = { pathname: item.ISQ_URL};
                let name = item.FK_ISQ_OPTION_TEXT;
                return <div className={Object.keys(sorted)[i] === selectedHead && selected === name?'t_tc Slcted filter' :`Unsel filter`} onClick={(e) => {
                    eventTracking(tracking, `ISQ-PopUp`, `ISQ-${i+1}-${index + 1}-Clicked`, 1)
                }}>{Noisomorph?<Link data-index={index} to={selected === name?allIndiaLink:link.pathname} onClick={onBubbleClick}>{name}</Link> :<a data-index={index} href={selected === name?allIndiaLink:link.pathname} onClick={(event) => { window.location.href = (link.pathname); onBubbleClick; event.preventDefault(); }}>{name}</a>}</div>
            })
            Finaldata.push(<div >
                        {Heading}
                        {OptionsList}
                    </div>)
        }}
        return Finaldata    }
const CatBrndFilterPopUp = props => {
    let SSR = JSON.parse(localStorage.getItem("multi_purpose"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let Noisomorph = (SSR && ((SSR["userViewCount"] == 5 && (glid == undefined))))
    ?true : false
    let isq = props.isqData && props.isqData.data ? isq_data(props.isqData.data,props.onBubbleClick,props.tracking.click,props.selectedISQ,props.selectedHead,Noisomorph,props.isqData.allIndiaLINK):""
    let dataArr =props.brandsData?props.brandsData.map(item=>{ return [item.NAME,item] }):""; 
    let maparr = props.brandsData?new Map(dataArr):"";
    let filteredData =props.brandsData?[...maparr.values()]:"";
    // let selected = props.selected.toLowerCase();
    let view =props.brandsData? filteredData.map(
        (item, index) => {
            let linkParams = (window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")?{ pathname: item.LINK, query:{"utm_source":"Adwords"}}:{ pathname: item.LINK };
            let name = item.NAME;
            return <div className='Unsel filter' onClick={(e) => {
                eventTracking(props.tracking.click,  'Brand-PopUp', `Brand-${index + 1}-Clicked`, 1)
            }}>{Noisomorph ? <Link data-index={index} to={linkParams} onClick={props.onBubbleClick}>{name}</Link> : <a data-index={index} href={linkParams.pathname} onClick={(event) => { window.location.href = (linkParams.pathname); props.onBubbleClick; event.preventDefault(); }}>{name}</a> }</div>
        }
    ):""
    return <div>
        <div className="mbg" onClick={props.closePopup} style={{ display: "block" }}></div>
        <div className={`ListOuter ${props.ecomCheck?"marginecom":"margincity"} bgw poa`}>
            <div className='pd10 ListInner'>
                {props.bizData && props.bizData.length>1 ? 
                    <div>
                        <div className='por citySuggest fw'>Seller Type</div>
                            {props.bizData.map((item,index)=>{
                                let selected = props.bizName ? props.bizName : "All"
                                let bizclass = selected == item.NAME ?'t_tc Slcted filter' :`Unsel filter` 
                                
                                return <div className={bizclass} onClick={(e) => {
                                    eventTracking(props.tracking.click, `Biz-PopUp`, `Biz-${index + 1}-Clicked`, 1)
                                }}>{Noisomorph?item.NAME == selected?item.NAME:<Link data-index={index} to={item.LINK +(item.QUERY ?item.QUERY : "")}  onClick={props.onBubbleClick}>{item.NAME}</Link> :item.NAME == selected?item.NAME:<a data-index={index} href={item.LINK +(item.QUERY ?item.QUERY : "")}  onClick={(event) => { window.location.href = (item.LINK +(item.QUERY ?item.QUERY : "")); props.onBubbleClick; event.preventDefault(); }}>{item.NAME}</a>}</div>})}</div>:""}
            {props.isqData && props.isqData.data && props.isqData.data.length>0?
                    <div>{isq.map((item,index)=>{
                        return item})}</div>
                : ""}
            {props.brandsData && props.brandsData.length>0 ?<div>
                    <div className='por citySuggest fw'>Brands</div>
                    {view}
                    </div>:""}
            </div>
        </div>
    </div>
}
export default CatBrndFilterPopUp;