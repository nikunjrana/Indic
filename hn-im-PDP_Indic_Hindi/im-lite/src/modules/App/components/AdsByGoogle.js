import React from 'react';
import new_script from './loadScript';


class AdsByGoogle extends React.Component {

    constructor(props){
        super(props);
    }
      
    componentDidMount(){
    new_script('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js').then(()=>{
            (adsbygoogle = window.adsbygoogle || []).push({});
        }).catch(()=>{
            console.log();
        })

    }
    render() {

            return(
                <div data-placeholder='Ad' className="srchAds df jc ht280 oh ">
  <div className="df jc">
                <ins class="adsbygoogle"
                style="display:inline-block;width:336px;height:280px;"
                data-ad-client="ca-pub-0673059417528889"
                data-ad-slot={this.props.adSlot}
                ></ins>
    </div> </div>      
        );

    }
    }
    export default AdsByGoogle;