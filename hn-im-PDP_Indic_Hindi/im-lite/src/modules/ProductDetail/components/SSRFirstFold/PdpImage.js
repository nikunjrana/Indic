
import React from 'react';

function PdpImage(props){
    let checkedurl= props.url?props.url.indexOf('https') == -1?props.url.replace('http', 'https'):props.url:'';
    return (
    <div class="centeralizeIt ht330px ">
        <img id="img" class="modal-content noZoom  ht100 " src={checkedurl} alt={props.itemname}/>
     </div>);
}
export default PdpImage;