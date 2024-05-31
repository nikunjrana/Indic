import React, {PureComponent} from "react";
import VideoWidget from "./VideoWidget";
import InlineFilters from "./InlineFilters"

class SsrWidgets extends PureComponent {
    constructor(props){
    super(props);
   }
render(){
    return (
      <>
        {this.props.index==14?<InlineFilters catData={this.props.catData} brandsdata={this.props.brandsdata} isqData={this.props.isqData} isqText={this.props.isqText} bizData={this.props.bizData} bizSelected={this.props.bizSelected} citiesData={this.props.citiesData} allIndiaLINK={this.props.allIndiaLINK} iplockey={this.props.iplockey} cityNameSelected={this.props.cityNameSelected} path={this.props.path} />:""}
        {this.props.index==14?<VideoWidget VideoYoutubeData={this.props.VideoYoutubeData} mcatName={this.props.mcatName} path={this.props.path}/>:""}
      </>
    )
  }
}

export default SsrWidgets