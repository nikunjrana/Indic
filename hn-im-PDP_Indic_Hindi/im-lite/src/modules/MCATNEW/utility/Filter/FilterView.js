import React from 'react';
import { Link } from 'react-router';
import { eventTracking } from '../../../../Globals/GaTracking';

const FilterView = (props) =>{
    let view = '';
    switch(props.type){
        //Categories filter view
        case 'CATEGORIES' :
            if(props.data.length>0){
              
                view =                       
                            props.data.map(
                                (item,index)=>{
                                    let linkParams = { pathname : item.LINK,state : {isMcat : true , ref : 'MCAT'}};
                                    let name = item.NAME;
                                    let arrowView = <span className = 'ml10 clr33 fs14'>&gt;</span>
                                    if(props.isLoadingCategories.flag && props.isLoadingCategories.id && props.isLoadingCategories.id == index){
                                        name = props.isLoadingCategories.text;
                                        arrowView = '';
                                    }
                                    return <li className = 'filterUnsel filterPd brd_gry' onClick={(e)=>{
                                        eventTracking(props.tracking.click,'Category-Filter',`Related-Category${index+1}-Clicked`,1)
                                        props.onBubbleClick(e,'CATEGORIES')}}><Link data-index={index} to= {linkParams}>{name}</Link>{arrowView}</li>
                                }
                            )
                        

                    
            }
            break;
        //Brand filter view
        case 'BRANDS':
                if(props.data.length>0){
                    view =                         
                                props.data.map(
                                    (item,index)=>{
                                        let linkParams = { pathname : item.LINK,state : {isMcat : true , ref : 'MCAT'}};
                                        let name = item.NAME;
                                        let arrowView = <span className = 'ml10 clr33 fs14'>&gt;</span>
                                        if(props.isLoadingBrands.flag && props.isLoadingBrands.id && props.isLoadingBrands.id == index){
                                            name = props.isLoadingBrands.text;
                                            arrowView = '';
                                        }
                                        return  <li className = 'filterUnsel filterPd brd_gry' onClick={(e)=>{
                                            eventTracking(props.tracking.click,'Brand-Filter',`Brand${index+1}-Clicked`,1)
                                            props.onBubbleClick(e,'BRANDS')}}>
                                                    <Link  data-index={index} to= {linkParams}>{name}</Link>{arrowView}
                                                </li>
                                    }
                                )
                            
    
                        
                }
            break;
        
        default :
        view = '';
        
    }

    let displayClass = 'dn';
    if(props.showView) displayClass = 'bgw wnr oAuto pd10 bopt mtb0';

    let selectedCatView = props.type === 'CATEGORIES' && props.isCatSelected ? <li className = 'fSeltCatCrcl filterPd brd_gry'><span>{props.mcatName}</span></li> : '';
    return(
        <ul className = {displayClass}>
          {selectedCatView}
          {view}
        </ul>
    )
}

export default FilterView;