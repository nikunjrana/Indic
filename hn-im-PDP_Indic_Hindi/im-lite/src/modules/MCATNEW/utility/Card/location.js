import React from 'react';
import "../../CSS/location.css";
function Location(props) {

    const dealsInCity = (
      <span class="clr5a truncateH por oh pdb5 pdl20 db ctIco fs13">
        Deals in {props.city}
      </span>
    );
  
    let locality = props.locality.substr(0, 70);

    let loc = '';

    if(props.locality.length===0){
      loc = props.city;
    } else if(props.city.length + locality.length > 30){
      loc = props.city;
    } else {
      loc = props.locality + ', ' + props.city; 
    }

    if(props.district){
      loc += ', ' + props.district;
    }
    

    const location = (
        <span class="clr5a truncateH por oh pdb5 pdl20 db ctIco fs13">
          { loc }
        </span>
    );  

    return (
        (props.city === props.cityOrigin) || (window.location.search=="?shopnow=1") ? location : dealsInCity
    )
}
export default Location;