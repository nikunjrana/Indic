import React from "react";
import { useEffect } from "react";

function InstagramVideoComponent(props) {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.defer = true;
        script.id = "instaScript";


        document.head.appendChild(script);
        script.addEventListener('load', function () {
          window.instgrm && window.instgrm.Embeds ? window.instgrm.Embeds.process() : '';
                });
        }, []);

    let instaProdVid = '';
      const pattern = /\/(p|reel)\/([\w-]+)\//;
      const matches = (props.url ? props.url : '').match(pattern);
  
      if (matches) {
        const videoId = matches[2];
        const instaVersion = props.videoType && props.videoType === '5' ? '12' : '14';
  
        const instaBlockquote = `<div class="instaHeader"></div><blockquote class="instagram-media instaBlock" data-instgrm-permalink="https://www.instagram.com/${props.videoType === '5' ? 'p/' : 'reel/'}${videoId}/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version="${instaVersion}" ></blockquote>`;
  
        instaProdVid = (
          <div id="insta-video" className="instaVideo">
            <div id="inside-insta-video" dangerouslySetInnerHTML={{ __html: instaBlockquote }} />
          </div>
        );
      }
    return instaProdVid;
  }
  
  export default InstagramVideoComponent;
