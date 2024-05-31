import React from 'react';

export default class VideoAdsCreate extends React.Component {
    constructor(props) {
        super(props);
      }
      shouldComponentUpdate() {
          return false;
      }
render(){

    (function(v,d,o,ai){ai=d.createElement('script');ai.defer=true;ai.async=true;ai.src=v.location.protocol+o;d.head.appendChild(ai);})(window, document, '//a.vdo.ai/core/indiamartv2/vdo.ai.js');
    return(<div id = 'vdo_ai_div'></div>)
}


}
