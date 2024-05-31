import React from 'react';
import WidgetItem from './WidgetItem';
import '../../CSS/widget.css';

const CategoryBrandWidget = React.memo(({heading, widgetData, cityName, clickTracking, ea, listNumber, cssClass, idName}) => {
  if (widgetData.length > 0) {
    return (
      <section id = {idName} className={cssClass}>
          <p className="fs14 clrg fw600 pd40 mb5">{heading}</p>
        <div className={`scWrap df htauto`}>
          {
            widgetData.map((widgetItem, index) => (
              <WidgetItem glid={glid} index={index + 1} ItemData={widgetItem} clickTracking={clickTracking} ea={ea} listNumber={listNumber}/>
            ))
          }
        </div>
      </section>
    )
  
  }
  else {
    return (<div></div>)
  }
})

export default CategoryBrandWidget;