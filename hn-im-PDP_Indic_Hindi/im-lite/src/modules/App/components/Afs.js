import React from 'react';


class Afs extends React.Component {

    constructor(props){
        super(props);
    }
      componentWillMount() {
        <script  src="https://www.google.com/adsense/search/ads.js"/>
      }
      componentDidMount() {
          
        var styleId = "", query = "";
         styleId = this.props.styleId;
         query = this.props.query;
         styleId = parseInt(styleId);
      var pageOptions = {
          "pubId": "partner-pub-0673059417528889", // Make sure that this is the correct client ID!
          "styleId": styleId,
          "adsafe": "high",
          "query": query,// Make sure that the correct query is placed here!
          };
          
          var adblock1 = {
            "number": 1,
          "container": "afscontainer1"
          };
        if(typeof(_googCsa) === 'function') {
            (function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push(arguments)},g[o]['t']=1*new Date})(window,'_googCsa');
            _googCsa('ads', pageOptions, adblock1);
        }

      }
    
    render() {

            return(
           <div id="afscontainer1" className='mb10'></div>
        );

    }
    }
    export default Afs;