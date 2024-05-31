import React, { Component,createRef } from "react";
import videoService from "../videoServiceManager";
import VideoItem from "./VideoItem";
import { eventTracking } from "../../../../../Globals/GaTracking";
import { impressionTrack } from "../../../../../Globals/impressionTrack";
import { checkUserStatus } from "../../../../../Globals/MainFunctions";
import "../videoSection.css";
import { removalTextNodes } from "../../../../../Globals/translatorPreact/translatorPatch";
class VideoSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videosData: {},
      videoOverlay:"",
      playVideo: false,
      playVideoURL: "",
      autoPlay:false,
      YouTubePlayer : ''
    };
    this.tracker = "";
    this.videoRef = createRef();
    this.ref = createRef();
    this.videoplaying = "";
    this.videoType = '';
    this.getVideoData = this.getVideoData.bind(this);
    this.checkInViewPort = this.checkInViewPort.bind(this);
    this.openMedia = this.openMedia.bind(this);
    this.closeMedia = this.closeMedia.bind(this);
    this.loadYTPlayer = this.loadYTPlayer.bind(this);
  }
  componentDidMount() {
    this.getVideoData();
    window.addEventListener("scroll",this.loadYTPlayer, {passive : true})
  }
  loadYTPlayer(){
    import(/* webpackChunkName:"YoutubePlayer" */'react-player/lib/players/YouTube').then(module=>{
      this.setState({
        YouTubePlayer:module.default
      })
    })
    window.removeEventListener("scroll",this.loadYTPlayer)
  }
  
  componentDidUpdate(prevProps) {
    removalTextNodes();
    if (prevProps.mcatId != this.props.mcatId) {
      if(this.tracker)
        window.removeEventListener("scroll",this.tracker)
      this.getVideoData();
    }
  }
  componentWillUnmount(){
    window.removeEventListener("scroll", this.checkInViewPort);
    if(this.tracker)
      window.removeEventListener("scroll",this.tracker)
  }
  getVideoData() {
    let self = this;
    videoService.getVideoData(this.props.mcatId).then((res) => {
      if (
        res &&
        res.response &&
        res.response.CODE &&
        res.response.CODE == 200 && res.response.DATA.length
      ) {
        let videoData = res.response.DATA.filter(item =>item.fl_name != "");
        if(videoData && videoData.length){
        for(let i=0;i< videoData.length;i++){
          if(videoData[i].URL && videoData[i].URL.includes("shorts/"))
            videoData[i].URL = videoData[i].URL.replace("shorts/","watch?v=");}
        }
        self.setState({ videosData: videoData });
        this.tracker=impressionTrack("mcatVideoWidget", this.props.clickTracking,"MCAT Videos","Visible","",true);
        window.addEventListener("scroll", this.checkInViewPort, {passive : true});
      } else {
        self.setState({ videosData: {} });
      }
    });
    if (window.onpopstate === null) {
      window.onpopstate = function () {
        if (self.state.playVideo) {
          self.setState({ playVideo: false });
        }
      };
    }
  }

  openMedia(url, key,videoType) {
    if(!this.state.videoOverlay){
      import(/* webpackChunkName:"VideoOverlay" */ "./VideoOverlay").then((module) => {
        this.setState({ videoOverlay: module.default })}) }
    this.videoplaying = key;
    this.videoType = videoType ? videoType : '';
    let autoplay = key == 1 ? " autoplay" : "";
    window.refUrl.push("somePopUp");
    window.history.pushState("blVideoPop", "", "");
    this.setState({ playVideo: true, playVideoURL: url,autoPlay:false });
    eventTracking(this.props.clickTracking,"MCAT Videos","Clicked-" + key + autoplay,true);
    let userMode = checkUserStatus();
    if (userMode !=0){
      let intentObj={
        isEnquiry: false,
        productName: this.props.mcatName,
        pagename: this.props.pageType,
        mcatId: this.props.mcatId,
        queryText: this.props.pageType,
        displayId: "",
        productImage: this.props.mcatImg125,
        companyName: "",
        ctaName: "videoIntent",
        affiliationId: "-97",
        userMode: userMode,
        intentType:"16",
        userStatus: this.props.loginModes[userMode]
      };
      this.props.generateIntent(intentObj);
    }

  }
  closeMedia() {
    this.setState({ playVideo: false,videoOverlay:"" });
    window.history.back();
  }

  checkInViewPort(){
    let bounding = this.videoRef && this.videoRef.current ? this.videoRef.current.getBoundingClientRect() : 0;
    if ( bounding.top >= 0 &&
      bounding.left >= -250 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        if(!this.state.autoPlay) {
          this.setState({autoPlay:true})
          this.ref && this.ref.current ? this.ref.current.seekTo(parseInt(0)) : "";
          setTimeout(() =>{
            if ( bounding.top >= 0 && bounding.left >= -250 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)){
              if(this.ref && this.ref.current && this.ref.current.getCurrentTime()>=10)
                eventTracking(this.props.clickTracking,"MCAT Videos","Video Autoplay",true);
            }
            },12000);
        }
    }
    else if(this.state.autoPlay) this.setState({autoPlay:false})
}

  render() {
    const { videosData } = this.state;
    const { mcatName } = this.props;
    return (
      <>
        {videosData.length > 0 && videosData[0] && videosData[0].URL && videosData[0].ID && videosData[0].TITLE ? (
          <>
            <li id="mcatVideoWidget" data-nosnippet="true" className="oh">
              <section className="pl10 por crx fs13 pdt5 pdb10 bgw brdb mb10 pdr10">
                <p className="mt10 fs15 mb10 clrb fw">
                Know more about {this.props.heading ? this.props.heading : mcatName}
                </p>

                <div className="oh ht210px tc" onScroll={this.checkInViewPort}>
                      <div className="dib bgw bxrd4 bxsd4 mr5 vat w100 por ht210px " ref={this.videoRef} data-vidid = {videosData[0].ID} data-vidurl = {videosData[0].URL}>
                      { this.state.YouTubePlayer ?
                        <this.state.YouTubePlayer className="pointernone" ref={this.ref}
                          width="100%"
                          height="100%"
                          url={videosData[0].URL}
                          playing ={this.state.autoPlay}
                          muted={true}
                          
                        />
                        :
                          <img  loading='lazy' className="bxrd4 w100 ht100" src={`https://img.youtube.com/vi/${videosData[0].ID}/hqdefault.jpg`} alt={videosData[0].TITLE} /> }
                      <div class="pt210 bt0 poa w100" onClick={() => requestAnimationFrame(()=>setTimeout(()=>this.openMedia(videosData[0].URL,1,videosData[0].VIDEO_PLATFORM_ID),0))}></div>
                      <div class="bxrd4 whNr dt w100 poa clrw bt0 bggre">
                          <span class="ht40 tc dtc fs15 pdt5">
                              {videosData[0].TITLE}
                          </span>
                      </div>
                  </div>
                  </div>
                {videosData.length >1 ?
                  <div className="oh ht75 mt10 scWrap" onScroll={this.checkInViewPort}>
                    {videosData.map((video, index) => (
                      index == 0 ? <div> </div> :
                      <VideoItem
                        key={index}
                        index={index}
                        videoData={video}
                        openMedia={this.openMedia}
                      />
                    ))}
                  </div> :""}
              </section>
            </li>
              {(this.state.playVideo && this.state.videoOverlay) ? (
                <this.state.videoOverlay
                  showModal={this.props.showModal}
                  mcatImg125={this.props.mcatImg125}
                  mcatId={this.props.mcatId}
                  playVideoURL={this.state.playVideoURL}
                  videoType = {this.videoType}
                  mcatName={mcatName}
                  closeMedia={this.closeMedia}
                  usermode = {this.props.loginModes[checkUserStatus()]}
                  clickTracking={this.props.clickTracking}
                  index={this.videoplaying}
                  page={this.props.page}
                  prodType={this.props.prodType}
                  showEnqPopup={this.props.showEnqPopup}
                  labelText = {this.props.labelText}
                  mblIsqData = {this.props.mblIsqData}
                  listNumber = {this.props.listNumber}
                  searchKey= {this.props.searchKey}
                  translated_name={this.props.translated_name}
                  catId= {this.props.catId}
                  isqType= {this.props.isqType}
                  query_text={this.props.query_text}
                />
              ) : (
                ""
              )}
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default VideoSection;
