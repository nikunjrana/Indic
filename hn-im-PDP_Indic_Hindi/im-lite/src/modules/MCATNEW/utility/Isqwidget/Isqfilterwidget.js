import React from 'react'
import '../Filter/Filter.css'
import { eventTracking } from '../../../../Globals/GaTracking'
const Isqfilterwidget = React.memo(({data, isqPresent,heading, clickTracking, selected}) => {
    if (data && data.length > 0) {
        let view = data.map((item,index)=>{
            let linkParams = isqPresent ? { pathname: item.ISQ_URL  } : {pathname : item.LINK + (item.QUERY?item.QUERY:"")};
            let name = isqPresent? item.FK_ISQ_OPTION_TEXT : item.NAME;
            let classCss;
            if(name == selected) {classCss ="InSchip"}
            else {classCss = "InUchip"}
            return(
            <div className={classCss} onClick={(e) => {eventTracking(clickTracking,
                isqPresent ? "ISQ-Widget" :"Biz-Widget" ,`${isqPresent ? "ISQ-Widget":"Biz-Widget"}${index + 1}-Clicked`,1);}}>
                <a data-index={index} href={linkParams.pathname}>
                                    {name}
                </a>
            </div>)
        })
      return (
        <section id = {isqPresent?"isqWidget":"bizwidget"} className="pdl5 mb8">
          <p className="fs14 clrg fw600 pd40 mb5">{heading}</p>
          <div className="scWrap wnr">
            {view}
          </div>
        </section>
    )
    }
    else return ""})
export default Isqfilterwidget