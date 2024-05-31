import React from 'react';
import {gaTrack} from '../../../Globals/GaTracking';

class BadaAasaanHaiVideo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        var renderHtml = '';
        renderHtml =
            <a href="https://www.youtube.com/watch?v=AHOMX_k6BSU"  onClick={() => gaTrack.trackEvent(["Home-Page-Clicks-PWA", "IM-Banner", " CTA-Click", 0, true])}><img className='db ma w100' src="https://m.imimg.com/gifs/img/apna-sapna-banner.jpg" alt="AUR KYA" /></a>
        return(
    <>
    {renderHtml}
    </>
   )
    }
}

export default BadaAasaanHaiVideo;
