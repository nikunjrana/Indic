import '../css/callBtn3.css';
import { eventTracking } from '../../../Globals/GaTracking';

export const CallBtn3 = (props) =>{
    return(
        <div id={props.id}>
            <span className="call-icon poa" 
            onClick={() =>{props.displayPopup();eventTracking("Click-To-Call",props.eventAction,props.eventLabel,true)}}>
            </span>
        </div>
    );
}