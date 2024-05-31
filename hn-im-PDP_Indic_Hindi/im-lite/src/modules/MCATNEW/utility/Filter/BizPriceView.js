import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../../Globals/GaTracking';


const BizPriceView = (props) =>{
    let bizView = '';
    let selectedview = props.bizNameSelected ? <li onClick = {props.onDeSelectBiz} className = 'fltrSlcted filterPd'><Link data-index = {0} >{props.bizNameSelected}<i className ='dSelect'></i></Link></li> :'';
    if(props.bizData.length>0){      
        bizView =      
                    props.bizData.map(
                        (item,index)=>{
                            
                            let linkParams = { pathname : item.LINK,search: item.QUERY,state : {isMcat : true}};
                            let name = item.NAME;
                            if(props.isLoadingBizPrice.flag && props.isLoadingBizPrice.id && props.isLoadingBizPrice.id == index+1){
                                name = props.isLoadingBizPrice.text;
                            }
                           // let view = ""
                            // if(props.bizNameSelected === item.NAME) {
                            //     selectedview = <li onClick = {props.onDeSelectBiz} className = 'fltrSlcted filterPd'><Link data-index = {index} >{name}<i className ='dSelect'></i></Link></li>
                            // }
                           // else{
                            let view = (props.bizNameSelected !== item.NAME)?<li className = 'filterUnsel filterPd brd_gry' onClick = {(e)=>{
                                    eventTracking(props.tracking.click,'Price-Biz-Filter',name,1)
                                    props.onBubbleClick(e,'BIZPRICE')}}><Link data-index = {index+1} to= {linkParams}>{name}</Link></li>:''
                           // }
                            return view
                        }
                    )
               
    }
    // let priceView = '';
    // if(props.priceData){
    
    //     let linkParams = { pathname :props.priceData.LINK ,search: props.priceData.QUERY,state : {isMcat : true}};
    //     let lineView = props.bizData.length > 0 ? <span className="bdrRwt"></span>:'';
    //     let name = 'With Price';
    //     let deSelectView = <i className ='dSelect'></i>;
    //     if(props.isLoadingBizPrice.flag && props.isLoadingBizPrice.id && props.isLoadingBizPrice.id == 'PRICE'){
    //         name = props.isLoadingBizPrice.text;
    //         deSelectView = '';
    //     }
    //     priceView = <li className = 'filterUnsel filterPd brd_gry' onClick = {(e)=>{props.onBubbleClick(e,'BIZPRICE')}}><Link data-index = 'PRICE' to = {linkParams}>{name}</Link>{lineView}</li>;
    //     if(props.isPriceSelected) {
    //         priceView = <li onClick = {props.onDeSelectPrice} className = 'fltrSlcted filterPd'><Link data-index = 'PRICE' >{name}{deSelectView} </Link>{lineView}</li>
    //     }
        
       
    // }
    let displayClass = 'dn';
    if(props.showView) displayClass = 'bgw wnr oAuto pd10 bopt mtb0';

    return(
        <ul className = {displayClass}>
                {/* {priceView} */}
                {selectedview ? selectedview : ""}
                {bizView}   
        </ul>
    )
}

export default BizPriceView;