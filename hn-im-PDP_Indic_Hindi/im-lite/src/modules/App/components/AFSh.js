import React from 'react';


class AFSh extends React.Component {

    constructor(props){
        super(props);
        this.loadAds = this.loadAds.bind(this);
        this.attachScript = this.attachScript.bind(this);
    }
         
      componentDidMount() {
        window.addEventListener("scroll", this.attachScript, {passive:true});
      }
      componentDidUpdate(prevProps){
        if(prevProps.query!=this.props.query) this.loadAds()
      }
      componentWillUnmount() {
        window.removeEventListener("scroll", this.attachScript, {passive:true});
      }
      attachScript() {
        window.removeEventListener("scroll", this.attachScript, {passive:true});
        const script = document.createElement("script");
        script.src = "https://www.google.com/adsense/search/ads.js";
        script.async = true;
        script.addEventListener("load", this.loadAds, {passive:true});
        document.body.appendChild(script);
      }
      loadAds() {
        var styleId = "", query = "";
        styleId = this.props.styleId;
        query = this.props.query;
        var pageOptions = {
        "pubId" : "partner-vert-pla-indiamart-srp",
        "styleId": styleId,
        "query": query// Make sure that the correct query is placed here!
        };

        let outerWidth=window.outerWidth
        var afshblock = {
        "container": "afshcontainer",
        "width": outerWidth, // Size of viewport.
        // Width must be large enough to initially see 1.25 ads if enableInteractive is true.
        "number": 8 // Ignored if enableInteractive is true.
        // enableInteractive: true (Defaults to false, set to true to enable interactive layouts)

        }

        if(typeof(_googCsa) === 'function') {
            (function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push(arguments)},g[o]['t']=1*new Date})(window,'_googCsa');
            _googCsa('plas', pageOptions, afshblock);
        }
      }
    
    render() {
      
            return(
                <div id="afshcontainer" class = "mb10 w100"></div>
        );

    }
    }
    export default AFSh;