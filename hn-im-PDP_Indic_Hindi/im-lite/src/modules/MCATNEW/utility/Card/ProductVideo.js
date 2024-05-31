import React, { Component } from 'react'

class ProductVideo extends Component {
  constructor(props){
    super(props)
    this.state={isOverlay:false}
    this.clickHandler = this.clickHandler.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.UrlCheck = this.UrlCheck.bind(this);
  }

  UrlCheck(url){
    if(url && url.includes("shorts/")){
      url = url.replace("shorts/","watch?v=");
    }
    return url;
  }
  clickHandler(){
    this.setState({isOverlay:true});
    import(/* webpackChunkName:"YoutubePlayer" */'react-player/lib/players/YouTube').then(module=>{
      this.setState({
        YouTubePlayer:module.default
      })
    })
  }

  closeOverlay(){
    this.setState({isOverlay:false});
  }

  
  render() {
    let productCard = <div className="bgw video-bl-container whNr">
    <div className="aligCen ml9 df jc">
      <h3 className="fs16 mt3 lineClamp3 wb oh fcb">{this.props.name}</h3>
      <p className="lh23 fs16 mt3 fc75 clrBl">{this.props.priceInfoDiv}</p>
    </div>
    <div className="tc pdt10 w100">
      {this.props.callButton}
      {this.props.getBestPriceCta}
    </div>
  </div>
    let videoOverLay = <section className="z999 pf lft0 tp0 video-bl ht100">
      <div class="video-bl-backdrop poa" onClick={()=>{this.closeOverlay()}}></div>
      <div className="por video-bl-iframe-container">
      <div className="close-video-bl poa" onClick={()=>requestAnimationFrame(()=>setTimeout(()=>this.closeOverlay(),0))}>&#10005;</div>
        {this.state.YouTubePlayer ? 
          <this.state.YouTubePlayer
          height={Math.round((window.innerWidth * 360) / 640) + "px"}
          width="100%"
          url={this.UrlCheck(this.props.url)}
          playing={true}
          controls={true}
          muted=""
        /> : ''}
      </div>
      {productCard}
    </section>
    return (
      <>
      <div className="df centerItems backColor">
        <img loading="lazy" src="https://m.imimg.com/gifs/img/playIcon-min.png" className="watchVideoIcon" />
        <p className="watchVideo" onClick={()=>{
          this.clickHandler();
          this.props.eventTracking("MCAT-Page-Clicks","Product-Listing-Clicks-Product-Video",this.props.eventLabel,1);
        }}>Watch Video</p>
      </div>
      {this.state.isOverlay ?  videoOverLay : ''}
      </>
    )
  }
}

export default ProductVideo