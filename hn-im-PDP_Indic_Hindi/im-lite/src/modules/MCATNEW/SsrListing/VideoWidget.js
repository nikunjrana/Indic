import React, {PureComponent} from "react";

class VideoWidget extends PureComponent {
   constructor(props){
    super(props);
   }
render(){
    return(
        this.props.VideoYoutubeData && this.props.VideoYoutubeData[0] && this.props.VideoYoutubeData[0].LINK && this.props.VideoYoutubeData[0].NAME && this.props.path.includes("/impcat")?
            <li id="mcatVideoWidget" data-nosnippet="true" className="oh"><section className="pl10 por crx fs13 pdt5 pdb10 bgw brdb mb10 pdr10"><p className="mt10 fs15 mb10 clrb fw">{`Know more about ${this.props.mcatName}`}</p>
            <div className="ht210px tc scWrap">
                <a className="dib bgw bxrd4 bxsd4 mr5 vat w100 por ht210px mcatVideo" href={this.props.VideoYoutubeData[0].LINK}>
                <div className="bxrd4 whNr dt w100 poa clrw bt0 bggre"><span className="ht40 tc dtc fs15 pdt5">{this.props.VideoYoutubeData[0].NAME}</span></div></a>
            </div>
            <div className="ht75 mt10 scWrap">
            {this.props.VideoYoutubeData.map((data,index) => { return index==0?<div></div>:(
                <a className="dib bgw bxrd4 bxsd4 mr5 vat w100px por ht75 mcatVideo" href={data.LINK}>
                <div className="bxrd4 whNr dt w100 poa clrw bt0 bggre"><h3 className="w100px tc fs11 pdt5 lineclamp2">{data.NAME}</h3></div></a>)})}
                </div>
            </section>
            </li>
        :""
    )

}
}
export default VideoWidget