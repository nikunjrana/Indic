import React, { useState, useEffect } from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import PinchZoomPan from "../PinchZoom/PinchZoomPan";
import { yandexTrackingMultiLevel } from '../../../../Globals/yandexTracking';
import { deleteCookie, getCookie } from '../../../../Globals/CookieManager';
var currentThumb= "",imgdata='';


export function getFirstImg(data, carousel, zoomedIn) {
    let firstImg = '';
    let isDspId =['20254240333','23374050730','23770954955','12393254030','23672176248','23963890148','21947508048','22037264788','23711586155','21131044512','22588831562','23802655930','21635151955','20998394448','22664675088','19922564155','21054012288','22148337312','20438189397','21717251348','21925635788','20906611130','23494400633','20473997897','18425188148','22893735391']

if(zoomedIn){
    if (carousel) {
        if (data.PC_ITEM_IMG_ORIGINAL && data.PC_ITEM_IMG_ORIGINAL != '') { 
            firstImg = data.PC_ITEM_IMG_ORIGINAL }
        else if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') { 
            firstImg = data.PC_IMG_SMALL_600X600 }
        else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { 
            firstImg = data.PC_ITEM_IMG_SMALL }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { 
            firstImg = data.PC_IMG_SMALL_100X100 }
        else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { 
            firstImg = data.GLUSR_USR_LOGO_IMG }
        else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    }
    else {
        if (data.PC_ITEM_IMG_ORIGINAL && data.PC_ITEM_IMG_ORIGINAL != '') { 
            firstImg = data.PC_ITEM_IMG_ORIGINAL }
        else if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') { 
            firstImg = data.PC_IMG_SMALL_600X600 }
        else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { 
            firstImg = data.PC_ITEM_IMG_SMALL }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { 
            firstImg = data.PC_IMG_SMALL_100X100 }
        else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { 
            firstImg = data.GLUSR_USR_LOGO_IMG }
        else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    }

}else{
    if (carousel) {
        if (data && data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') {
            if(isDspId.includes(data.PC_ITEM_DISPLAY_ID)){
                let splitImgURL = data.PC_IMG_SMALL_600X600.split('/');
                let checkImag = splitImgURL[3] && splitImgURL[3].startsWith('data');
                checkImag? splitImgURL.splice(3,0,'webp-convert'):'';
                let joinImgURL= splitImgURL.join('/');
                firstImg= joinImgURL;
            }else {
                firstImg = data.PC_IMG_SMALL_600X600
            }

        }
         else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { firstImg = data.PC_ITEM_IMG_SMALL }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
        else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
        else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    }
    else {
        if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_600X600 != '') {
            if(isDspId.includes(data.PC_ITEM_DISPLAY_ID)){
                let splitImgURL = data.PC_IMG_SMALL_600X600.split('/');
                let checkImag = splitImgURL[3] && splitImgURL[3].startsWith('data');
                checkImag? splitImgURL.splice(3,0,'webp-convert'):'';
                let joinImgURL= splitImgURL.join('/');
                firstImg= joinImgURL;
            }else {
                firstImg = data.PC_IMG_SMALL_600X600
            }
        }
        else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL != '') { firstImg = data.PC_ITEM_IMG_SMALL }
        else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
        else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
        else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    }
}

    return firstImg;
}
export function getVidId(mediaUrl, flag="") {
    let videoId = '',
        video_link = mediaUrl;
    if (/watch\?v\=/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('=') + 1, 11);
    }
    else if (/time_continue\=/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('=',video_link.indexOf('=') + 1 ) + 1, 11);
    }
    else if (/\/\/youtu.be/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('/') + 11, 11)
    }
    else if (/shorts/.test(video_link)) {
        videoId = video_link.substr(video_link.indexOf('shorts/') + 7, 11);
    }   
    else {
        if (/embed\//.test(video_link)) {
            if(flag) 
                videoId = video_link.substr(video_link.indexOf('/embed/') + 7, 11) 
            else
            videoId = video_link.substr(video_link.indexOf('/') + 1, 11)
        }
       
    } return videoId;
}
export default class YouTubeComponent extends React.Component  {
    constructor(props) {
        super(props);
        let url=this.props.data.ITEM_DOCS&&this.props.data.ITEM_DOCS.pc_item_doc_path;
        url&&(url.includes("shorts/")? url= url.replace("shorts/","watch?v="):"");

        let compvideo=this.props.data.GLUSR_PROFILE_MEDIA_URL;
        compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
        if(!url && compvideo) {
            url = compvideo;
        }
        this.url = url.replace(/\?list.*$/, "");
    }

    componentDidMount() {
        window.vidThumbShellClick && document.getElementById("videoFloatingThumbnail")? document.getElementById("videoFloatingThumbnail").click() : '';
    }
    componentWillUnmount() {
        delete window.vidThumbShellClick;
    }
    

    render() {
        return (this.props.YouTubePlayer && this.url?<this.props.YouTubePlayer muted={true} width={"100%"} height={this.props.zoomedIn ? "300px" : "280px"}
        url={this.url} playing controls={this.props.zoomedIn?true:false} />:'');
    }
}

export function getVideoInCarousel(data, zoomedIn, startIndex, catchImgPostn,YouTubePlayer) {
    return <div className={zoomedIn?"videoWrapper1":"youTubevideoWrapper"} id="videoInCarousel">
            <YouTubeComponent data={data} zoomedIn={zoomedIn} startIndex={startIndex} YouTubePlayer={YouTubePlayer}/>
    </div>
}

export function constructCarousel(data, zoomedIn, startIndex, onSlideChanged, catchImgPostn="",transImg="",len,isExtended,YouTubePlayer,check,PinchZoom,setPinchZoom='',photoGallery="", hitVideoThumbnailTracking, setMorePhotos) {
    
    const [disableSwiper, toggleSwiper]= useState(false);
    const [swiperIndex, changeIndex ]= useState(0);
    const [SwipeableViews, setSwipeableViews] = useState('');


    function loadSwipeable() {
        if(!SwipeableViews){
            import(/* webpackChunkName:"Swipeableviews" */ 'react-swipeable-views').then(module=>{setSwipeableViews(() => module.default)})
        }
    }
    let isVideoNeeded = data.ITEM_DOCS != undefined &&data.ITEM_DOCS.pc_item_doc_type == "VIDEO" && check && check >= 1 && check <= 6 ?
        true : false;
    let compvideo=photoGallery ? "" : data.GLUSR_PROFILE_MEDIA_URL;
    compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
    isVideoNeeded = isVideoNeeded ==false && compvideo ? true : isVideoNeeded;
    isVideoNeeded==false&&len==0?'':loadSwipeable();
    let iscompvideopresent= data && data.GLUSR_PROFILE_MEDIA_URL?true:false;
    let handleChangeIndex = (index) => {changeIndex(index); selectedThumbnail("thumbLoop"+ index); catchImgPostn(index)};    

    let isIntermediateScreenVisible =  window.__TransitionData__!=null;
   
    let firstImg =  getFirstImg(data, true, zoomedIn),
        imgArr = data.ITEM_IMG;

    let zoomOn= false;
        zoomedIn === true? zoomOn = true: zoomOn = false;
    let carouselData = getcarouselImg(firstImg, startIndex, imgArr, isVideoNeeded, data, zoomOn, toggleSwiper , changeIndex, swiperIndex, catchImgPostn,transImg,len,isExtended,YouTubePlayer,check,PinchZoom,setPinchZoom,photoGallery, hitVideoThumbnailTracking);
        // window.__TransitionData__ = null;

    if (zoomedIn) {

        return (
            <div className="pdpZoomSctn">
                <div className="pdp-modal-content por ht100 oh tc" style={{overflow:'hidden'}}>
                    <div>
                        <div>
                            {isVideoNeeded==false&&len==0?carouselData.imgs: SwipeableViews ? <SwipeableViews disabled={disableSwiper} index={startIndex} onChangeIndex={handleChangeIndex}>
                                {carouselData.imgs}
                            </SwipeableViews> : carouselData.imgs}
                        </div>
                    </div>
                </div>

                <div id="thumbnailCarousel" 
                className={`bt50 pf scrbrh lft0 zIn999 w100 scrbrH ${len==0&&!isVideoNeeded?'dn':''}`}
                style="margin: 0 60px 90px 0;overflow:auto">
                    {getZoomImgThumbnail(firstImg, startIndex, carouselData.thumbnailImg, isVideoNeeded, data, false)}
                </div>
            </div>
        )

    }
    else {
        
        return (
                <div id="normalCarousel" className={ "por oh ht330 oh tc"}>
                    
                        {carouselData.imgs}
                 
                    {/* <div style="position: absolute;bottom: 5px; left:0;right: 0"> {carouselData.dots}</div> */}

                                        
                    {/* { (setMorePhotos && startIndex==0 && (isVideoNeeded || compvideo)) || (!setMorePhotos && startIndex!=1 && (isVideoNeeded || compvideo)) && (check==1 || check==2 || (!check && isVideoNeeded && compvideo)) ? <div id="videoFloatingThumbnail" className='bgw clrmim fw lh18 poa rt0 lft0 videothumbImgBlk' onClick={()=> {catchImgPostn(1), hitVideoThumbnailTracking()}}>
                        {getVideoFloatingThumbnail(carouselData.videoFloatingthumbnailImg)}
                    </div> :''} */}

                </div>

        )
    }
    
}



const getZoomImgThumbnail = (firstImg, startIndex, images, isVideoNeeded, data, zoomIn) => {
    return (<div className="flx fleCntr">{images}</div>)
}
const getVideoFloatingThumbnail = (images, isVideoNeeded) => {
    return (<div className="flx fleCntr">{images}</div>)
}

export const getFirstImgDetails = (data) =>{
    let wh='';
    if (data.PC_IMG_SMALL_600X600 && data.PC_IMG_SMALL_500X500_WH) { wh=data.PC_IMG_SMALL_500X500_WH }
    else if (data.PC_ITEM_IMG_SMALL && data.PC_ITEM_IMG_SMALL_WH) { wh = data.PC_ITEM_IMG_SMALL_WH }
    else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_125X125_WH) { wh = data.PC_IMG_SMALL_125X125_WH }
    else wh = "-1,-1";
    let whArr = wh.split(",");
    return ([whArr[0],whArr[1]]);
}

function FacebookVideoPlayer( url, zoomIn ) {
    const encodedURL = encodeURI(url);
    return (
      <div className={zoomIn?"videoWrapper1":"youTubevideoWrapper"}> 
        <div className="New_Fb tp10">
            <iframe
                src={`https://www.facebook.com/plugins/video.php?href=${encodedURL}&width=500&show_text=false&height=500&appId&autoPlay=1`}
                width="100%"
                height="330px"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                allowFullScreen
            ></iframe>
        </div>
      </div>
    );
}

export function InstagramVideoComponent(props) {

    function loadInstagram() {
        window.instgrm.Embeds.process()
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.defer = true;

        document.head.appendChild(script);
        script.addEventListener('load', loadInstagram, {passive:false} );
        return ()=>{
            script.removeEventListener('load', loadInstagram);
        }
    }, []);

    let instaProdVid = '';
      const pattern = /\/(p|reel)\/([\w-]+)\//;
      const matches = (props.url).match(pattern);
  
      if (matches) {
        const videoId = matches[2];
        const instaVersion = props.check === '5' ? '12' : '14';
  
        const instaBlockquote = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/${props.check === '5' ? 'p/' : 'reel/'}${videoId}/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="${instaVersion}" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:400px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"></blockquote>`;
  
        instaProdVid = (
          <div id="insta-video">
            <div id="inside-insta-video" dangerouslySetInnerHTML={{ __html: instaBlockquote }} />
          </div>
        );
      }  
    return <div>{instaProdVid}</div>;
  }

const getcarouselImg = (firstImg, startIndex, images, isVideoNeeded, data, zoomIn, toggleSwiper , changeIndex, swiperIndex,catchImgPostn,transImg="",len,isExtended,YouTubePlayer,check,PinchZoom,setPinchZoom,photoGallery) => {
    
    const [loaded, setLoaded] = useState(false);
    function showOriginalImage()
    {
        document.getElementById("lcpImage")?document.getElementById("lcpImage").style.display="none":"";
        setLoaded(true);
    }
    currentThumb = "thumbLoop" + startIndex;
    let thumbnailImg =[(<div id="thumbLoop0" className={ startIndex == 0 ? 'flx fleCntr bgw tc thumbImgBlk activeImg jstyfyCenter': 'flx fleCntr bgw tc thumbImgBlk jstyfyCenter'} onClick={()=> {selectedThumbnail("thumbLoop0"); catchImgPostn(0);}} ><img id="defaultImgg" src={modifyImgSrc(firstImg)} alt={data.PC_ITEM_NAME? data.PC_ITEM_DISPLAY_NAME? data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME:'Loading'} /></div>)];

    let videoFloatingthumbnailImg =[];
    let imgs ='';
    if(photoGallery&&!PinchZoom){
        setPinchZoom()
    }
    if(zoomIn === true){
        imgs = [
            <div id="imageSectionOne" style="margin:-10% auto 0;height:100vh;">
                {PinchZoom ? 
                <PinchZoom toggleSwiper={toggleSwiper} zoomButtons={false} maxScale={3} doubleTapBehavior={'zoom'} initialScale={'auto'}>
                <div className={`ht80ZoomSec por ${len==0&&!isVideoNeeded?'mt15p':''}`}>
                 <img id="img"  class={`${len==0&&!isVideoNeeded&&window.innerHeight<700?'mxht80vh w100 ':' modal-content mxHt500'} moveToCenter`} src={modifyImgSrc(firstImg)} alt={data.PC_ITEM_NAME? data.PC_ITEM_DISPLAY_NAME? data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME:'Loading'}/>
                 </div>
                </PinchZoom> : ""}
            </div>
        ];
                    
    }else{
      let isCookie = getCookie("ImageData")
      if(isCookie)
      imgdata = isCookie; 
      let prdimg=modifyImgSrc(firstImg);
      let styleClass = " ht100 ";
      imgs = [
            (!isExtended) ?
                <div className={`centeralizeIt ht330px `}>
                    {!data.LANDING_FROM_SPA ? <img id="img" class={"modal-content noZoom " + styleClass} onLoad={showOriginalImage} style={loaded ? {} : { display: "none" }} src={modifyImgSrc(firstImg)} alt={data.PC_ITEM_NAME ? data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME : 'Loading'} /> : ""}
                    <img id="img" class={"modal-content noZoom "+ styleClass} src={(window.__TransitionData__ != undefined) ? window.__TransitionData__.imgUrl : imgdata ? imgdata : modifyImgSrc(firstImg)} style={loaded ? { display: "none" } : {}} alt={data.PC_ITEM_NAME ? data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME : 'Loading'} />
                </div>
                : <div className={`centeralizeIt ht330px `}>
                    <img id="img" class={"modal-content noZoom " + styleClass} onLoad={showOriginalImage} style={loaded ? {} : { display: "none" }} src={modifyImgSrc(firstImg)} alt={data.PC_ITEM_NAME ? data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME : 'Loading'} />
                </div>
        ];
        deleteCookie("ImageData");
    }

    let compvideo=photoGallery ? "" : data.GLUSR_PROFILE_MEDIA_URL;
    compvideo && (compvideo.includes("shorts/") ? compvideo = compvideo.replace("shorts/", "watch?v=") : "");
            
    let imgArr = data.ITEM_IMG;
    let dots = [imgArr.length==0?<span className={startIndex == 0 ?(data.ITEM_DOCS.pc_item_doc_type == "VIDEO" || (!check && isVideoNeeded && compvideo))?"dotofCar active" : "":"dotofCar"} id={0 + "dot" + data.PC_ITEM_DISPLAY_ID}></span>:<span className={startIndex == 0 ?"dotofCar active" : "dotofCar"} id={0 + "dot" + data.PC_ITEM_DISPLAY_ID}></span>];

    let uniqueId = 1;

    if (isVideoNeeded) {
        let videoThumbnail='';
        let videoURL = data.ITEM_DOCS.pc_item_doc_path;
        videoURL =!check && isVideoNeeded && compvideo ? compvideo : videoURL;
        let thumbvid  = getVidId(videoURL, data.empty_video_flag);
        videoThumbnail = (check==1||check==2|| (!check && isVideoNeeded && compvideo) && thumbvid)?<div id="thumbLoop1"  className={ startIndex == 1 ? 'yutubIcon por flx fleCntr bgw tc thumbImgBlk activeImg jstyfyCenter': 'yutubIcon por flx fleCntr bgw tc thumbImgBlk jstyfyCenter'} onClick={()=> {selectedThumbnail("thumbLoop1"); catchImgPostn(1);}}>
        <img alt="Youtube Icon Here" src={"https://img.youtube.com/vi/" + thumbvid + "/0.jpg"} />
        </div>
        :<div id="thumbLoop1"  className={ startIndex == 1 ? 'yutubIcon por flx fleCntr bgw tc thumbImgBlk activeImg jstyfyCenter': 'yutubIcon por flx fleCntr bgw tc thumbImgBlk jstyfyCenter'} onClick={()=> {selectedThumbnail("thumbLoop1"); catchImgPostn(1);}}>
        </div>;
        dots.push(<span className={startIndex == uniqueId ? "dotofCar active videoIcon" : "dotofCar videoIcon"} id={uniqueId + "dot" + data.PC_ITEM_DISPLAY_ID}></span>);

        if(check==1 || check==2 || (!check && isVideoNeeded && compvideo)){        
        imgs.push(getVideoInCarousel(data, zoomIn, startIndex, catchImgPostn,YouTubePlayer));
        }
        else if(check==3||check==4){
            imgs.push(FacebookVideoPlayer(data.ITEM_DOCS.pc_item_doc_path, zoomIn));
        }
        else if(check==5||check==6){
            imgs.push(<div className={zoomIn?"videoWrapperinsta1 mt-10":"instavideoWrapper mtm50"}><InstagramVideoComponent url={data.ITEM_DOCS.pc_item_doc_path} check={check} /></div>);
        }
    
        thumbnailImg.push(videoThumbnail);
        videoFloatingthumbnailImg.push(videoThumbnail);
        uniqueId++;
    }

    let isDspId =['20254240333','23374050730','23770954955','12393254030','23672176248','23963890148','21947508048','22037264788','23711586155','21131044512','22588831562','23802655930','21635151955','20998394448','22664675088','19922564155','21054012288','22148337312','20438189397','21717251348','21925635788','20906611130','23494400633','20473997897','18425188148','22893735391']
    
    for (let index in images) {
        if (images.hasOwnProperty(index)) {

            let im = images[index],
                imageFinal = '';

            if (zoomIn === true) {
                if (im.IMAGE_ORIGINAL && im.IMAGE_ORIGINAL != '') { imageFinal = im.IMAGE_ORIGINAL }
                else if (im.IMAGE_500X500 && im.IMAGE_500X500 != '') { imageFinal = im.IMAGE_500X500 }
                else if (im.IMAGE_250x250 && im.IMAGE_250x250 != '') { imageFinal = im.IMAGE_250x250 }
                else if (im.IMAGE_125x125 && im.IMAGE_125x125 != '') { imageFinal = im.IMAGE_125x125 }
            } else {
                if (im.IMAGE_500X500 && im.IMAGE_500X500 != '') {
                    if(isDspId.includes(data.PC_ITEM_DISPLAY_ID)){
                        let splitImgURL = im.IMAGE_500X500.split('/');
                        let checkImag =splitImgURL[3].startsWith('data');
                        checkImag? splitImgURL.splice(3,0,'webp-convert'):'';
                        let joinImgURL= splitImgURL.join('/');
                        imageFinal= joinImgURL;
                    }else {
                        imageFinal = im.IMAGE_500X500
                    }
                }
                else if (im.IMAGE_250x250 && im.IMAGE_250x250 != '') { imageFinal = im.IMAGE_250x250 }
                else if (im.IMAGE_125x125 && im.IMAGE_125x125 != '') { imageFinal = im.IMAGE_125x125 }
                else if (im.IMAGE_ORIGINAL && im.IMAGE_ORIGINAL != '') { imageFinal = im.IMAGE_ORIGINAL }
            }
            imageFinal = modifyImgSrc(imageFinal);

            dots.push(<span className={startIndex == uniqueId ? "dotofCar active" : "dotofCar"} id={uniqueId + "dot" + data.PC_ITEM_DISPLAY_ID}></span>)

            if(zoomIn === true){
                imgs.push(
                    <div id="imageSectionOne" style="margin:-10% auto 0;height:100vh;">
                     {PinchZoom ? <PinchZoom toggleSwiper={toggleSwiper} zoomButtons={false} maxScale={3} doubleTapBehavior={'zoom'} initialScale={'auto'}>
                     <div className="ht80ZoomSec por">
                        <img id={"img" + index + data.PC_ITEM_DISPLAY_ID} className="modal-content mxHt500 moveToCenter"
                            src={imageFinal}  alt={data.PC_ITEM_NAME? data.PC_ITEM_DISPLAY_NAME? data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME:'Loading'}/>
                    </div>
                    </PinchZoom> : ""}
                    </div>
                );
            }else{
                    imgs.push(
                    <div className={`centeralizeIt ht330px `}>
                        {index=="0"?
                        <img id={"img" + index + data.PC_ITEM_DISPLAY_ID} className="modal-content noZoom1" style="vertical-align: middle;"
                            src={imageFinal} alt={data.PC_ITEM_NAME ? data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME : 'Loading'} />
                        :<img id={"img" + index + data.PC_ITEM_DISPLAY_ID} loading="lazy" className="modal-content noZoom1" style="vertical-align: middle;"
                        src={imageFinal} alt={data.PC_ITEM_NAME ? data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME : 'Loading'} />}
                    </div>
                    );
            }

            thumbnailImg.push(<div 
            
            id={isVideoNeeded ? ("thumbLoop" +  (Number(index)+ 2)): ("thumbLoop" +  (Number(index)+ 1))} 
            className={isVideoNeeded? (startIndex ) == Number(index)+ 2 ? 'flx fleCntr bgw tc thumbImgBlk activeImg jstyfyCenter': 'flx fleCntr bgw tc thumbImgBlk jstyfyCenter': (startIndex ) == Number(index)+ 1  ? 'flx fleCntr bgw tc thumbImgBlk activeImg jstyfyCenter': 'flx fleCntr bgw tc thumbImgBlk jstyfyCenter' }
            onClick={()=> { selectedThumbnail( isVideoNeeded  ?  ("thumbLoop" + (Number(index)+ 2)) : ("thumbLoop" + (Number(index)+ 1)) ); catchImgPostn( isVideoNeeded ? Number(index)+ 2: Number(index)+ 1);}}>
                
                <img id={"thumbnailImg" + index} src={imageFinal}  alt={data.PC_ITEM_NAME? data.PC_ITEM_DISPLAY_NAME? data.PC_ITEM_DISPLAY_NAME:data.PC_ITEM_NAME:'Loading'}/>
            </div>);

            uniqueId++;
        }
    }

    return { imgs: imgs, dots: dots, thumbnailImg: thumbnailImg , videoFloatingthumbnailImg: videoFloatingthumbnailImg};

}


export const modifyImgSrc = (image) => {
    if (typeof image != "undefined" && image != 'no_image' && image != '') {
        image = image.replace(/^http:\/\//i, 'https://');
        image = image.replace('imghost.indiamart.com', '1.imimg.com');
        image = image.replace('imghost1.indiamart.com', '2.imimg.com');
        return image;
    }

}



const selectedThumbnail = (nextThumb) => {   
    let nextThumbs= document.getElementById(nextThumb);
    yandexTrackingMultiLevel("Product-Page-Clicks","Product-Image-Zoom","Thumbnail-Clicked");
    nextThumb? nextThumbs.scrollIntoView():'';
}

