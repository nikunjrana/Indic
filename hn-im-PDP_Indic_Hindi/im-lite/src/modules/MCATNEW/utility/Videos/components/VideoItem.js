import React from 'react';

const VideoItem = React.memo(({ index,videoData: { URL, ID, TITLE ,VIDEO_PLATFORM_ID },openMedia, }) => {
    let isFb = VIDEO_PLATFORM_ID && (VIDEO_PLATFORM_ID == 3 || VIDEO_PLATFORM_ID == 4) ? true : false;
    let isInsta = VIDEO_PLATFORM_ID && (VIDEO_PLATFORM_ID == 5 || VIDEO_PLATFORM_ID == 6) ? true : false;
    return (
            <div className={`dib bxrd4 bxsd4 mr6 vat w100px por ht75 ${isFb || isInsta ? "bgBlack" :"bgw" }`}  onClick={() => requestAnimationFrame(()=>setTimeout(()=>openMedia(URL,index+1,VIDEO_PLATFORM_ID),0))} data-vidid = {ID} data-vidurl = {URL} >
                <img loading="lazy" src="https://m.imimg.com/gifs/img/playIcon-min.png" alt={TITLE} className="mcatVideoIcon" />
                {isFb || isInsta ? "" : <img  loading='lazy' className="bxrd4 w100 ht100" src={`https://img.youtube.com/vi/${ID}/hqdefault.jpg`} alt={TITLE} /> }
                <div class="bxrd4 whNr dt w100 poa clrw bt0 bggre">
                    <h3 class="w100px tc fs11 pdt5 lineClamp2 ellipse">
                        {TITLE}
                    </h3>
                </div>
            </div>
    )
})

export default VideoItem;