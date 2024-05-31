import { PWAAppState } from '../../../src/store/imStore';
var chunkVersion = require('../../version.json');
import { getCDNHost } from "../../GblComFunc"
import { renderToString } from "react-dom/server";
import React from 'react';
import First_Fold from '../../../src/modules/ProductDetail/components/SSRFirstFold/SSRFirstFold';
import { TransformContactNumber } from '../../../src/modules/ProductDetail/components/SSRFirstFold/helper';
var mnMinbase = getCDNHost();
function preloadedChunks() {
    return (`
   <link rel="preconnect" href="https://3.imimg.com/" crossorigin > 
   <link rel="dns-prefetch" href="https://3.imimg.com/"  > 
   <link rel="preconnect" href="https://4.imimg.com/" crossorigin >
   <link rel="dns-prefetch" href="https://4.imimg.com/" >
   <link rel="preconnect" href="https://5.imimg.com/" crossorigin > 
   <link rel="dns-prefetch" href="https://5.imimg.com/"  > 
   <link rel="preload" href="${mnMinbase + 'main-min_' + chunkVersion["main_min"] + '.js'}" as="script" >
   `);
}
function parseDisplayID(path) {
    path = path.split('/')[2].split('.html')[0].split('-');
    let dispID = path[path.length - 1];
    if (Number(dispID)) {
        return dispID;
    }
    else //Invalid URL
    {
        return false
    }
}
function getDisplayName(data) {
    let displayName = data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME;
    return displayName;
}

function metaOgTags(pdpData, path) {
    let desc = pdpData['metadesc'];
    let title = pdpData['metatitle'];
    let pdpUrl = "https://hindi.indiamart.com" + path;
    let firstImage = getFirstImg(pdpData);
    let productImage = handleImageUrl(firstImage.firstImg);
    let imgWidth = firstImage.w;
    let imgHeight = firstImage.h;
    return `
    <meta property="og:title" content="${title}" /><meta property="og:site_name" content="indiamart.com" /><meta property="og:url" content="${pdpUrl}" /><meta property="og:image" content="${productImage}" /><meta property="og:image:url" content="${productImage}" /><meta property="og:image:width" content="${imgWidth}" /><meta property="og:image:height" content="${imgHeight}" /><meta property="og:type" content="website" /><meta property="og:description" content="${desc}"/><meta property="twitter:card" content="summary" /><meta property="twitter:site" content="IndiaMART" /><meta property="twitter:title" content="${title}" /><meta name="twitter:description" content="${desc}" /><meta property="twitter:url" content="${pdpUrl}" /><meta property="twitter:image:src" content="${productImage}" /><meta property="twitter:image:width" content="${imgWidth}" /><meta property="twitter:image:height" content="${imgHeight}" />`
}
function metaTags(desc, keywords) {
    return `
    <meta name="description" content="${desc}"><meta name="keywords" content="${keywords}">`
}


function getPDPState(pdpData, is5XX = false, is404 = false, data404 = '') {
    let PDPStore = {}
    PDPStore["pdpData"] = pdpData;
    PDPStore["pdp404"] = is404;
    PDPStore["pdp5XX"] = is5XX;
    PDPStore["pdpFirstFold"] = true;
    PDPStore["pdp404Data"] = data404;
    // Assuming response is an object
    return 'window._PDP_STORE = ' + JSON.stringify(PDPStore) + ';';
}



function handleImageUrl(url) {
    if (url) {
        if (url.indexOf('https') == -1) {
            url = url.replace('http', 'https')
        }
        return url;
    }
    return '';
}




function pdpCss() {
    return (`<style>
    body{min-height:100vh;min-height:100dvh!important;}
    *{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}.bgw{background-color:#fff}.oh{overflow:hidden}.tc{text-align:center}.ht330{height:330px}.dflex{display:flex}.aic{align-items:center}.db{display:block}.por{position:relative}.negativeMargin{margin:-30px 0 0 10px}.pd10{padding:10px}.poa{position:absolute}.boxEffect{border-radius:10px;box-shadow:0 3px 14px -7px #666;z-index:1;width:calc(100% - 10px)}.crx:after{content:"";visibility:hidden;display:block;height:0;clear:both}.t_tc{text-transform:capitalize}.fw{font-weight:700}.fs18{font-size:18px}.pdb5{padding-bottom:5px}.wr{word-wrap:break-word}.fs13{font-size:13px}.clr33{color:#333}.tl{text-align:left}.fs16{font-size:16px}.fw500{font-weight:500}.pdb10{padding-bottom:10px}.clr5a{color:#5a5a5b}.mt2{margin-top:2px}.w100{width:100%}.clrlft{clear:left}.mb10{margin-bottom:10px}.bxsdw{box-shadow:0 1px 2px rgb(0 0 0 / 20%)}.fs15{font-size:15px}.clrb{color:#333}.brdb{border-bottom:1px solid #cbcbcb}.crb{clear:both}.columnDescPDP{float:left;width:50%;padding:5px 12px;word-wrap:break-word;word-break:break-word;overflow-wrap:break-word}.lh22{line-height:22px}.cl75{color:#757575}.pdt8 {padding-top: 8px;}.pdb10 {padding-bottom: 10px;}.bdrLtGry{border:1px solid #dcddf9}.mb12{margin-bottom:12px;}.mml5{margin-left: -5px;}.m10 {margin: 10px;}ul{list-style: none;}.ht150px {height: 150px;}.mnW150{min-width: 150px;}.pdl155{padding-left:155px}.mla{margin-left: auto;}.boxMidl-1{padding: 0 0 0 5px;}.btmtop {border-top: 1px solid #cbcbcb;}.lazy2{max-width: 120px!important;max-height: 150px;}
    .cva{content-visibility: auto;contain-intrinsic-size: 3000px;}.mt10{margin-top:10px}.centralizeIt{display: flex;align-items: center;justify-content: center;width: 100%;overflow: hidden;}.modal-content{margin: auto;max-height: 330px;max-width: 100%;}.nenqM{left:0;top:0;z-index:9999;height:100%}.enqfrm{position:fixed;margin-bottom:5px}.pf{position:fixed}.z10000{z-index:10000!important}.ovfy{overflow-y:scroll}.ht100{height:100%}.enqMain{padding:52px 0 20%}.ht52{height:52px}.z9{z-index:9}.t0{top:0}.r0{right:0}.bxrd20{border-radius:20px}.pdlr8{padding:5px 12px}.mr10{margin-right:10px}.dib{display:inline-block}.ml5{margin-left:5px}.vam{vertical-align:middle}.pdt16{padding-top:16px}.pdb17{padding-bottom:17px}.btmBodr{border-bottom:1px solid rgba(204,204,204,.5)}.txtElip{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.fs20{font-size:20px}.pdl10{padding-left:10px}.mb20{margin-bottom:20px}.nspac{justify-content:center;display:flex;align-items:center;margin:0 15px}.prdImg{width:50px;height:50px;flex-shrink:0}.prdImg img{max-height:50px;max-width:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pl10{padding-left:10px}.lcldr1{border:4px solid #f3f3f3;border-radius:50%;border-top:4px solid #2e3192;width:40px;height:40px;-webkit-animation:spin1 1s linear infinite;animation:spin1 1s linear infinite}
    .handleNext1 {color: #fff;background: #d3d3d3;}.mrla {margin-left: auto;margin-right: auto;}.w70 {width: 70%;}.tuc {text-transform: uppercase;}.enqmim2 {background: #d3d3d3!important;}.os{overflow:scroll;}.mbg{background-color:rgba(51,51,51,.7);height:100%;left:0;top:0;width:100%;z-index:112!important;min-height:100vh;display:none;position:fixed}.mt15p{margin-top:15%}.w90{width:90%}.bxrd4{border-radius:4px}.z9999{z-index:9999}.malr{margin-left:auto;margin-right:auto}.lr0{left:0;right:0}.bge5{background-color:#e5f7f5}.pdt15{padding-top:15px}.tp-40{top:-40px}.prd_img{width:50px}.m5{margin:5px}.mr3{margin-right:3px}.trustSealSvg{background-image:url(https://m.imimg.com/gifs/img/ver-icon.svg)}.wh15{height:15px;width:15px}.mml14{margin-left:-14px}.callIcnSvg{background-image:url(https://m.imimg.com/gifs/img/call-grn.svg)}.wh13{width:13px;height:13px}.bgNorepeat{background-position:50%;background-repeat:no-repeat}.bxgr{box-shadow: 0 1px 10px 0 rgb(0 0 0 / 30%);border-radius: 20px 20px 6px 6px;}.ht250{height:250px}.tp35{top:35%}.pr10{padding-right:10px;}.whNr{white-space: normal;}.wCallIcon{background-image : url("https://m.imimg.com/gifs/img/callIconM.svg");background-position: center center;background-repeat: no-repeat; width: 20px; height: 20px;}
    .mt13{margin-top:13px;}.dnipdp{display: none !important;}
    .compCl{background-color:#15746d;background-image:linear-gradient(90deg,#00a699,#15746d)}.fs14{font-size:14px}.clrw{color:#fff!important}.w49{width:49%}.mr5{margin-right:5px}.callIconM{width:14px;height:14px;background-image:url(https://m.imimg.com/gifs/img/callIconM.svg)}.bckArwZm,.bkgImgPstnRpt{background-position:50%;background-repeat:no-repeat}.compBl{background-color:#2f3394;background-image:linear-gradient(90deg,#5058bc,#2f3394)}.mr2{margin-right:2px}.enqIcn{background-image:url(https://m.imimg.com/gifs/img/enqIcn.svg);background-repeat:no-repeat;background-position:0 0;width:17px;height:12px}.pdb12{padding-bottom: 12px;}.pdt12 {padding-top: 12px;}@keyframes spin1{to{-webkit-transform:rotate(360deg);}}@-webkit-keyframes spin1{to{-webkit-transform: rotate(360deg);}}.pdt20{padding-top: 20px;}
    .enqBx{border-radius:6px;box-shadow:0 2px 4px 0 rgb(212 212 212 / 50%);border:solid .5px #e3e3e3;padding-bottom:20px;position:relative}.m7{margin:7px}.blanket{position:fixed;overflow:hidden;height:100%;width:100%}.ml10{margin-left:10px}.mt5{margin-top:5px}.mt0{margin-top:0px}.txtLabel1{pointer-events:none;transform:translate3d(72px,15px,0) scale(1);transform-origin:left top;transition:100ms;font-size:16px;color:#a0a0a0;z-index:1;position:absolute}.cr{color:#c10000}.eCon{width:65px;border-right:1px solid #8e8e8e;padding:0 0 0;background-color:#f1f1f1;left:2px;font-weight:400;font-size:20px;position:absolute;top:2px;border-radius:4px 0 0 4px;line-height:40px}.cmcode{font-size:20px;width:64px;border-right:1px solid #8e8e8e;background-color:#f1f1f1}.ht48{height:48px}.br8e{border:1px solid #8e8e8e}.ml10{margin-left:10px}.pdt10{padding-top:10px}.dn{display:none}.glicon {background: url(https://m.imimg.com/gifs/img/gliconLogin.png) no-repeat;width: 16px;height: 16px;background-size: 100%;margin-bottom: -3px;}.enq_country_name{border-bottom: 1px solid #555;}
    .pd20{padding:20px}.pdt7{padding-top:7px}.pdb7{padding-bottom:7px}.txtdecor{border-bottom:1px solid}.clr0c{color:#0c2c83}.m3{margin:3px}.inputField{display:flex;line-height:43px;max-width:280px;height:43px;border-radius:5px;border:1px solid #8e8e8e}.mauto{margin:auto}.mobimg{border-right:1px solid #8e8e8e;height:42px;width:65px;background-color:rgba(226,222,222,.29);}.pdl7{padding-left:7px}.bg6d{background-color:#6d6d6d}.w70{width:70%}.clr7B{color:#7b7b7b}.mobileInput::placeholder{font-size: 14px;font-weight:normal;}.lFocused label {transform: translate(15px,-12px);font-size: 13px;color:#2e3192;background-color:#fff;}.txtLabel1 {pointer-events: none;transform: translate3d(72px,15px,0) scale(1);transform-origin: left top;transition: 100ms;font-size: 16px;color: #a0a0a0;z-index: 1;position: absolute;}.lFocused .txtLabel1 {font-size: 13px;color: #2e3192;background-color: #fff;padding: 1px 5px;transform: translate3d(72px, -8px, 0) scale(1);}.lFocused input{border-color:#2e3192;border-width:2px;padding-right:40px}.Menu_icon{background-position:0 2px;cursor:pointer;height:21px;left:15px;top:12px;width:23px;z-index:100}.poa{position:absolute}.inp-head::before{content:" ";height:15px;width:100%;top:4px;position:absolute;z-index:1;background-color:#00a699}.inp-bx{background:#ffff;height:35px;border-radius:18px;box-shadow:0 1px 5px 0 #a1a1a1;border:solid 1.2px #0aa69a;outline-width:thick;background-color:#fff;padding:0 10px;width:90%;z-index:2}.srchIcn{margin-top:8px;position:absolute;left:11px}.srchIp{font-size:15px!important;font-weight:400!important;width:85%;padding:9px 0 0 25px;background:0 0}.srchIcn::placeholder{color:#a0a0a0}.voiceIcon{top:0;right:0;height:36px;width:44px;text-align:center;line-height:48px}.tp46{top:46px}.tp0{top:0}.lft0,.lt0{left:0}.ht35{height:35px}.gridcontainer,.gridimg{display:grid;overflow:hidden}.gridimg,.gridimg img{height:100%;width:100%}.gridimg:nth-child(2n),.gridimg:nth-child(odd){border-bottom:1px solid #efefef}.gridcontainer{grid-template-columns:repeat(2,1fr);grid-template-rows:auto;gap:0;align-items:unset;text-align:center}.gridimg{justify-content:center;padding:1px;align-items:center}.gridimg img{object-fit:cover;max-width:250px;max-height:250px}.gridimg:nth-child(2n){border-left:1px solid #efefef}.gridimg:last-child{border-bottom:0 solid #efefef;border-right:1px solid #efefef}.gridimg:last-child:not(:nth-child(odd)),.gridimg:nth-last-child(2):nth-child(odd){border-bottom:0 solid #efefef;border-right:0 solid #efefef}
    .fadElip:after{content:"";text-align:right;position:absolute;bottom:0;right:0;width:10%;height:30px;background:linear-gradient(to right,rgba(255,255,255,0),#fff 50%)}
.fs12{font-size:12px;}.blankULSen1{min-height: 20.33px}.jcse{justify-content: space-evenly;}.pdlrb10{padding: 0px 10px 10px 10px;}.lh18{line-height:18px;}.mt5{margin-top:5px;}.mb5{margin-bottom:5px}.flexGrow1{flex-grow: 1;}.wh15 {height: 15px; width: 15px;}.w45 { width: 45%;}.pdl130 {padding-left: 130px;}.column { float: left; width: 50%; padding: 5px 12px;word-wrap: break-word;word-break: break-word;overflow-wrap: break-word;line-height: 22px;}.bgef {background-color: #efefef;}.btn_enq {z-index: 10003;}.bt30 { bottom: 30px;}.lazy {max-width: 120px!important;max-height: 125px;}.mnW125 {min-width: 125px;}.ctaAlignCSR {top: 278px;border-radius: 10px;right: 0;padding: 7px 5px;left: 0;width: 40%;margin: auto;min-width: 140px;}.relatedMoreCat ul li {text-align: center;border-right: 1px solid hsla(0,0%,80%,.5);display: inline-block;vertical-align: middle;}.btm0 {bottom: 0;}.btm10{bottom: 10px;}.filtr.cityFilterRecomMcat .bubbleBtn.citySelected {color: #fff;position: relative;background-color: #00a699;border-color: #15746D;}.filtr.cityFilterRecomMcat .bubbleBtn.citySelected.icnCross:after {background-position: center centre;background-repeat: no-repeat;background-image: url("https://m.imimg.com/gifs/img/crose-gn.svg");}.bubbleBtn.citySelected.icnCross:after {width: 14px;height: 14px;margin: 0 -5px 0 5px;content: '';display: inline-block;vertical-align: middle;background-size: 12px;}.grnlocF {fill: #fff;stroke: #7d7d7d;stroke-miterlimit: 10;stroke-width: 5px}.grnloc-2F {fill: #7d7d7d}.bubbleBtn .grnlocF {stroke: #2e3192;}.bubbleBtn .grnloc-2F {fill: #2e3192}.mnH125 {min-height: 125px;}.mnW135 {min-width: 135px;}.w36{width:36%}.bxrdNR{border-radius:20px 0 0 20px}.callIcnN{background-image:url(https://m.imimg.com/gifs/img/green-call.svg);background-repeat:no-repeat;background-position:0 0;width:16px;height:16px}.enqIcnGreen{background-image:url(https://m.imimg.com/gifs/img/green-btn.svg)}
.t5{top:5px}.enqIcn,.enqIcnGreen{background-repeat:no-repeat;background-position:0 0;width:17px;height:12px}.bgimg,.locationIcn{background-position:50%;background-repeat:no-repeat}.ht42{height:42px}.bxrdNL{border-radius:0 20px 20px 0}.fl{float:left}.mnht99{min-height:99px}.dtc{display:table-cell}.clrmim{color:#00a699}.w125p{width:125px}.pdl5,.pl5{padding-left:5px}.pdlr15{padding-left:15px;padding-right:15px}.pdb15{padding-bottom:15px}.pdt15{padding-top:15px}.ht125px{height:125px}.bxdw2{box-shadow:0 0 3px rgba(0,0,0,.25)}.hw115{height:115px;width:115px}.fr{float:right}.pTitle{color:#2f3394!important}.jstyfyCenter{justify-content:center}.w87{width: 87%}
.mb16{margin-bottom: 16px}.algnCenter{align-items:center}.bgimg{background-image:url(https://m.imimg.com/gifs/bgIM50.webp)}.mxhw115{max-height:115px;max-width:115px}.mxht1000{max-height:1000px}.objctFitSclDown{object-fit:scale-down}.pdr5{padding-right:5px}.ht20{height:20px}.clr92{color:#2e3192}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rt10{right:10px}.phone svg{width:26px;height:22px;margin-top:9px;margin-left:11px}.phone svg path{fill:#02887d}.phone svg path:nth-child(2){-webkit-animation:.8s cubic-bezier(.1,.57,.5,1) infinite header-phone;animation:.8s cubic-bezier(.1,.57,.5,1) infinite header-phone}.phone svg path:nth-child(3){-webkit-animation:.8s cubic-bezier(.1,.57,.5,1) infinite header-phone2;animation:.8s cubic-bezier(.1,.57,.5,1) infinite header-phone2}.lh20{line-height:normal}.l0{left:0}.locationIcn{width:15px;height:15px;transform:scale(.85);vertical-align:text-bottom;padding-right:18px;background-image:url(https://m.imimg.com/gifs/img/location-gray.svg)}
.bubbleBtn,.ht60p {height: 60px;}.tc{text-align:center}.l15{left:15%}.t15{top:15px}.mrr3{margin-right:3px}.w80{width:80%}.trustSealSvg{background-image:url('https://m.imimg.com/gifs/img/ver-icon.svg')}.verifiedSvg{background-image:url('https://m.imimg.com/gifs/img/verifiedSvg.svg')}.mt3{margin-top:3px}.bubbleBtn.nearMe{color:#2e3192;border:1px solid #2e3192}.b0{bottom:0}.filtr .bubbleBtn{margin-bottom:3px;width:auto;font-size:13px;padding:7px 17px;border-color:#5a5a5b}.bubbleBtn{color:#333;padding:7px 2px;border-radius:20px;display:block;border:1px solid #aaa;margin-bottom:10px;background-color:#fff;width:100px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:33px}.pd5{padding:5px}.cityFilterRecomMcat{overflow:auto;white-space:nowrap}.relatedMoreCat{overflow-x:scroll;overflow-y:hidden;white-space:nowrap;position:relative;width:100%;transform:translateZ(0);-webkit-transform:translateZ(0);-ms-transform:translateZ(0)}.bdrC{border:1px solid #ccc}.mb0{margin-bottom:0}.hw50{height:50px;width:50px}.bxsdw{box-shadow:0 1px 2px rgb(0 0 0 / 20%)}.crb{clear:both}.fs15{font-size:15px}.mb10{margin-bottom:10px}.mt10{margin-top:10px}.pdb10{padding-bottom:10px}.pdl10{padding-left:10px}.pdr10{padding-right:10px}.pdt10{padding-top:10px}.flx{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.boxMain{align-items:center}.flxShrnk0{flex-shrink:0}.wd135pxl{width:135px}.br1{border-right:1px solid #dcddf9}.mb2{margin-bottom:2%}.dib{display:inline-block}.imgCntnr{max-width:100px;max-height:100px;object-fit:scale-down}.mhw125{max-width:125px;max-height:125px}.mr5{margin-right:5px}.boxMidl{padding:10px 10px 10px 5px}.htato{height:auto}.clrBl{color:#2e3192}.fs17{font-size:17px}.clr33{color:#333}.cDtl{line-height:17px;padding-top:3px}.clrw{color:#fff!important}.bgBlu{background-color:#2e3192}.bdrBlu{border:1px solid #2e3192}.enqBtnSt{border-radius:4px;box-shadow:0 10px 8px -11px #000}.animateArrow{width:50px;height:20px;margin-right:-30px}.arrowSpec-first{animation:2s ease-in-out infinite arrow-movement}.arrowSpec{opacity:0;position:absolute;right:0;top:11px;transform-origin:50% 50%;transform:translate3d(-50%,-50%,0)}
.arrowSpec-second{animation:2s ease-in-out 1s infinite arrow-movement}.c77{color:#777575}.bxrd10{border-radius:10px}.mxhw{max-width:50px;max-height:50px}.callIcnNAB{background-image:url("https://m.imimg.com/gifs/img/callIcnNAB.svg");background-repeat:no-repeat;background-position:0;width:16px;height:16px}.mt53{margin-top:53px}.imgCnt{left:50%;top:50%;transform:translate(-50%,-50%)}.di{display:inline}.mlm2{margin-left:-2px}
.locationSvg{background-image: url('https://m.imimg.com/gifs/img/location-red.svg');}
.gstIcon{background-image : url("https://m.imimg.com/gifs/img/green-vr.svg")}.bdrmim{border:1px solid #00a699}.hw45{height:45px;width:45px}.rt0{right:0}.bgLightGreen{background-color: rgb(209, 237, 234);}
.gmPhotoIcon{width:18px;height:18px;background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4Ij4NCjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiPjwvcGF0aD4NCjxwYXRoIGQ9Ik00LjgyOCAyMWwtLjAyLjAyLS4wMjEtLjAySDIuOTkyQS45OTMuOTkzIDAgMCAxIDIgMjAuMDA3VjMuOTkzQTEgMSAwIDAgMSAyLjk5MiAzaDE4LjAxNmMuNTQ4IDAgLjk5Mi40NDUuOTkyLjk5M3YxNi4wMTRhMSAxIDAgMCAxLS45OTIuOTkzSDQuODI4ek0yMCAxNVY1SDR2MTRMMTQgOWw2IDZ6bTAgMi44MjhsLTYtNkw2LjgyOCAxOUgyMHYtMS4xNzJ6TTggMTFhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0eiIgZmlsbD0iIzAwYTY5OSI+PC9wYXRoPg0KPC9zdmc+');background-repeat: no-repeat; background-position: center;}
.getPhotoCTa{background-color: rgba(255,255,255,0.9);}.ht62p{height:62px}
.pdt5{padding-top:5px}.bglghtBlue{background-color: #efefff;}.flexCenter{justify-content:center}.bglghtGry{background-color:#f6f6f7}.alnItemsCenter{align-items:center}.starSvg{background-image:url('https://m.imimg.com/gifs/img/star-icon.svg')}.mt7{margin-top:7px}.fs11{font-size:11px}.crx1:after{content:"";visibility:hidden;display:block;height:0;clear:both}.callIconSvg{background-image:url('https://m.imimg.com/gifs/img/gray-call.svg')}.pdp{padding:0 50px 0 60px}.w95{width:95%}.pd5b10{padding:10px 5px 5px 10px}.enqIcnAB{background-image:url("https://m.imimg.com/gifs/img/enqIcnAB.svg");background-repeat:no-repeat;background-position:0 0;width:17px;height:12px}.maxh60 {max-height: 60px;}.maxHeightWidth{ height: 100%;}.clrBl {color: #2e3192;}.zoomScale2{transform:scale(2)}.zoomScale1-5{transform:scale(1.5)}#imPWAHeader.ht53{height:53px;}.searchBarr{padding:0 50px 0 80px}.searchBarr2{padding:0 80px 0 80px}.inp-head.tp9, .tp9{top:9px}.inp-head.tp9::before{background-color: transparent;}.IMlogo.smallImLogo,.smallImLogo{position:absolute;background-position:-28px 0;width:31px;background-size:280px;height:36px;left:48px;right:auto;top:8px;background-repeat:no-repeat;background-color:#00a699}.pd15{padding:15px}#pdpLcpDiv .boxEffect{border-radius:10px;box-shadow:0 3px 14px -7px #666;z-index:1;width:calc(100% - 10px)}#pdpLcpDiv .boxEffect.outofstockproduct{border-radius:4px}#pdpLcpDiv .outofstockproduct{bottom:108%;color:#e85c61;border-color:#d86565;border-width:0 0 0 6px;border-style:solid;background-color:#fdf1ef}.objctFitSclDown{object-fit:scale-down}.clr7c{color: #7c7c7c}.flx{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.fleCntr{align-items: center;}.reqrmntSentIcon{background-image:url('https://m.imimg.com/gifs/img/new-ack.png');background-repeat:no-repeat;width:30px;height:20px;background-position:-11px -2px;background-size:42px 28px;}.inputFieldAB {display: flex;height: 48px;border: 2px solid #a9a9a9;padding-right: 5px;}.mobimgAB{background-color: rgba(226, 222, 222, 0.29);border-right: 1px solid #8e8e8e;width: 65px;border-radius: 25px 0px 0px 25px;}.bxrd25 {border-radius: 25px;}.mt20{margin-top: 20px;}.z1{z-index:1}.centeralizeIt{display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden}.pd810{padding:8px 10px}
.lockIcon{background-image: url('https://m.imimg.com/gifs/img/lock-icon.svg');background-position: center center; background-repeat: no-repeat; width: 16px; height: 16px; display: inline-block; margin-right:5px;vertical-align: bottom;}.msg3rdParty{font-size: 10px; color: #7c7c7c;}
.phoneIconGreen{background-position: center center;background-repeat: no-repeat; width: 16px; height: 16px;}
    .phoneIconGreen{background-image : url("https://m.imimg.com/gifs/img/green-call.svg");}
.closeArrowSvg:before, .closeArrowSvg:after {
    position: absolute; left: 22px; content: ' '; height: 19px;width: 1.5px; background-color: #fff; top: 5px;}.h50px {height: 50px;}
  .closeArrowSvg:before {transform: rotate(45deg);}
  .closeArrowSvg:after { transform: rotate(-45deg);}
  .pos{
    position: sticky;
    position: -webkit-sticky;
  }
  .pr{position: relative;}
.DownloadIcon{background-image: url("https://m.imimg.com/gifs/img/note-icon.svg");}.l20px{left:20px}.wh40{width:40px;height:40px}.pdt50{padding-top:50px}.t40p{top:40%}
.ctaShadow{box-shadow: 0 -6px 4px -3px #eee;}.ht72{height:72px}
.lineclamp2{    
-webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;}
.message-widget {
    padding: 10px;
    background-color:#EBFBFA;
    }
    .callIcnBig1 {
      background-image: url("https://m.imimg.com/gifs/img/callIcnBig1.svg");
      background-repeat: no-repeat;background-position: 0 0;width: 16px;height: 16px;
  }
  .wh35{width: 35px;height: 35px;}
  .MsgInp{
      width: 100%;
      padding: 12px;
      border-radius: 20px;
      padding-right: 50px;
    }
    .alignStretch{
      align-items: stretch;
    }
    .jcse{justify-content: space-evenly;}
    .custbtn {
      font-size:14px;
      padding: 12px 5px;
      color: #575757;
    }
  .sendIcon{
    background-image: url("https://m.imimg.com/gifs/img/SendIcnPDP.svg");
    background-position: 0 0;
    background-repeat: no-repeat;
    height: 30px;
    width: 30px;
    scale: 0.7;
  }
  .w50p{
    width:50px;
  }
  .ht40p{
    height:40px;
  }
    .send-button {
      border-radius: 25px;
      scale: 0.9;
    }
    .MessengerMsgicon {
      background-image: url("https://m.imimg.com/gifs/img/messagePdp.svg");
      background-position: 0 0;
      width: 30px;
      height: 35px;
      padding: 10px;
  }
  .flex1 {
    flex: 1;
  }
  .jcstart{
    justify-content: start;
  }
  .w50{
    width:50%;
}
  .cgap7px{
    column-gap: 7px;
  }
  .clrr{
    color: red;
  }
  .ml20{margin-left: 20px;}   
.oxs{
    overflow-x: scroll;
  }
.ht31{height: 31px;}
  .viewSmlrCta {
    top: -70px;
    left: 2px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}
.ltCntr {
    background-color: #ebfbfa;
    border: 1px solid #01a699;
    color: #01a699;
}
.flGrow1 {
    flex-grow: 1;
}
.callIconBoldGreen {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTMuNjQgNTEzLjY0IiBmaWxsPSIjMDBhNjk5Ij48cGF0aCBkPSJNNDk5LjY2IDM3Ni45NmwtNzEuNjgtNzEuNjhjLTI1LjYtMjUuNi02OS4xMi0xNS4zNTktNzkuMzYgMTcuOTItNy42OCAyMy4wNDEtMzMuMjggMzUuODQxLTU2LjMyIDMwLjcyLTUxLjItMTIuOC0xMjAuMzItNzkuMzYtMTMzLjEyLTEzMy4xMi03LjY4LTIzLjA0MSA3LjY4LTQ4LjY0MSAzMC43Mi01Ni4zMiAzMy4yOC0xMC4yNCA0My41Mi01My43NiAxNy45Mi03OS4zNmwtNzEuNjgtNzEuNjhjLTIwLjQ4LTE3LjkyLTUxLjItMTcuOTItNjkuMTIgMEwxOC4zOCA2Mi4wOGMtNDguNjQgNTEuMiA1LjEyIDE4Ni44OCAxMjUuNDQgMzA3LjJzMjU2IDE3Ni42NDEgMzA3LjIgMTI1LjQ0bDQ4LjY0LTQ4LjY0YzE3LjkyMS0yMC40OCAxNy45MjEtNTEuMiAwLTY5LjEyeiIvPjwvc3ZnPg==);
    background-position: 50%;
    background-repeat: no-repeat;
}

.flxwrp{flex-wrap: wrap;}
.bdrBA{border: 1px solid rgb(204 204 204/69%);}
.whatsAppIcn {
    background: linear-gradient(90deg, #49c557, #28b13d);
    width: 19px;
    height: 21px;
    position: relative;
    border-radius: 100%;
}
.whatsAppIcnpos {
    left: -1px;
    top: -1px;
}
.ht330px {
    height: 330px;
}
@media only screen and (min-width: 980px) {

    body{
        max-width:100%
    }
    .promptHandlingClass{
        display:flex;
        flex-wrap:wrap;
        
    }
    .centeralizeIt,.compdetail{
        width:50%;
        flex-shrink:0;
    }
   .relatedMoreCat {
    overflow-x: unset;
    overflow-y: unset;
    white-space: unset;
    position: relative;
    width: 100%;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    
}
   .relatedMoreCat ul {
       
           display: grid;
       grid-template-columns: repeat(4 , 1fr);
       grid-gap: 15px
    }
    #relatedWidgets{
        flex: 1 1 100%;
    }
    .relatedMoreCat li{
        border: 1px solid #ccc;
    }
    .popseller {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 15px;
    }
    .footerdesk{
        display: flex;
        align-items: center;
        justify-content: center;
        }
        #footerIM{
            margin-bottom:10px;
            padding:0px;
            
        }
}
    </style>`)
}







function pdp200(pdpData, path, cookie, relatedData) {
    let shell = require('../../GblComFunc').APP_SHELL_STRUCTURE(),
        AppState = PWAAppState();
    shell.TITLE = `<title>${pdpData['metatitle']}</title>`;
    shell.META = metaTags(pdpData['metadesc'], pdpData['metakeyword']);
    shell.ORG_SCHEMA = '';
    shell.NEW_HEADER = true;
    shell.PRE_CONNECTS = '';

    // let imgSrc = imgObj && imgObj["firstImg"] ? imgObj["firstImg"] : 'https://m.imimg.com/gifs/background_image.jpg';
    // imgSrc = modifyImgSrc(imgSrc);
    let preChunks = ''
    shell.HEAD_SCRIPTS = preChunks + `
    <script type="application/ld+json">
  
    </script>
 
    `;
    shell.STATE = AppState;
    shell.BODY_SCRIPTS = getPDPState(pdpData);
    shell.IS_PDP_LCP_NEW = true;
    shell.displayLcpDiv = constructPdpLcpDiv(pdpData, '', '', '')

    // shell.CANONICAL_LINKS = getCanonicalLinks(path);
    shell.METAOGTAGS = metaOgTags(pdpData, path);
    shell.FOOTER_LINK = 'https://www.indiamart.com' + path;
    shell.STATUS = 200;
    shell.ROOT_MT = '';
    return shell;
}

function getMobileNum(data) {
    let num = '', type = '';
    if (data) {
        if (data["MOBILE_PNS"]) {
            num = data["MOBILE_PNS"];
            type = "PNS";
        }
        else if (data["MOBILE"]) {
            num = data["MOBILE"];
            type = "M";
        }
        else if (data["PHONE"]) {
            num = data["PHONE"];
            type = "M";
        }
        return {
            num: num, type: type
        }
    }
    else
        return '';
}
function pdp404(data404 = '') {
    let shell = require('../../GblComFunc').APP_SHELL_STRUCTURE();
    let AppState = PWAAppState();
    AppState.pdp404 = true;
    shell.TITLE = '<title>Product not found</title>';
    shell.META = '';
    shell.ORG_SCHEMA = '';
    shell.LOADER = 'DEFAULT';
    shell.STATE = AppState;
    shell.CANONICAL_LINKS = '';
    shell.METAOGTAGS = '';
    shell.BODY_SCRIPTS = getPDPState('', false, true, data404);
    shell.HEAD_SCRIPTS = `${preloadedChunks()}`;
    shell.STATUS = 404;
    shell.FOOTER = 'NFP';
    shell.ROOT_MT = '';
    return shell;
}
function pdp5XX() {
    let shell = require('../../GblComFunc').APP_SHELL_STRUCTURE();
    let AppState = PWAAppState();
    AppState.pdp5XX = true;
    shell.TITLE = '<title>Page Not Found</title>';
    shell.META = '';
    shell.ORG_SCHEMA = '';
    shell.LOADER = 'DEFAULT';
    shell.STATE = AppState;
    shell.CANONICAL_LINKS = '';
    shell.METAOGTAGS = '';
    shell.HEAD_SCRIPTS = `${preloadedChunks()}`;
    shell.BODY_SCRIPTS = getPDPState('', true);
    shell.STATUS = 503;
    shell.FOOTER = 'NFP';
    shell.ROOT_MT = '';
    return shell;
}
function pdpShell(req, res, errorPage, shellCallBck, pageRedirect) {
    let displayID = parseDisplayID(req.path);
    if (displayID && !errorPage) {
        require('./serviceManager')(displayID, req, res).then((data) => {
            try {
                let pdpData = data.toObject();
                // let pdpData = data;


                // data = JSON.parse(data);

                // let mcatid = data[0] && data[0].BRD_MCAT_ID ? data[0].BRD_MCAT_ID : nonEmptyMcatList[0];
                // let ecomflag = data[0] && data[0].PC_ITEM_IS_ECOM && data[0].ECOM_ITEM_LANDING_URL && data[0].ECOM_STORE_ENABLE_FLAG ? "1" : "";
                // let city = data[0] && data[0].PC_ITEM_IS_ECOM && data[0].ECOM_ITEM_LANDING_URL && data[0].ECOM_STORE_ENABLE_FLAG ? "" : data[0] && data[0].CITY_ID ? data[0].CITY_ID : "";
                // if ((data && mcatid)) {

                // getRelatedData(mcatid, city, "10", data[0].PC_ITEM_DISPLAY_ID, ecomflag, req, res).then((rdata) => {

                // else {
                //     // let pdpData = data;
                //     console.log("pdpData: ", pdpData);
                //     console.log("Type of: ", typeof (pdpData));
                //     pdpRedirectUrl = checkForRedirect(pdpData, req.path, req.originalUrl);
                //     pdpRedirectUrl = pdpRedirectUrl ? pdpRedirectUrl : req.path;
                shellCallBck(res, pdp200(pdpData, decodeURIComponent(req.path), '', ''));

                // }
                // })


                // }
            }
            catch (error) {
                shellCallBck(res, pdp404());
            }
        }, ((error) => {

            if (error === 'Page Not Found') {
                shellCallBck(res, pdp404());
            }
            else {
                shellCallBck(res, pdp5XX());
            }
        }))
    }
    else {
        shellCallBck(res, pdp404());
    }
}
function getIsq(data) {
    try {
        let isqstring = '';
        data.map(isq => {
            isqstring += isq.FK_IM_SPEC_MASTER_DESC + ": " + isq.SUPPLIER_RESPONSE_DETAIL + ", ";
        })
        return isqstring;
    }
    catch (error) {
        return '';
    }
}
function getFirstImg(data) {
    let firstImg = '';
    let wh = data.PC_ITEM_IMG_ORIGINAL_WH ? data.PC_ITEM_IMG_ORIGINAL_WH : "0,0";
    wh = wh.split(",");
    let w = wh[0];
    let h = wh[1];
    if (data.pcImgSmall600x600 && data.pcImgSmall600x600 != '') { firstImg = data.pcImgSmall600x600 }
    else if (data.pcItemImgSmall && data.pcItemImgSmall != '') { firstImg = data.pcItemImgSmall }
    else if (data.PC_IMG_SMALL_100X100 && data.PC_IMG_SMALL_100X100 != '') { firstImg = data.PC_IMG_SMALL_100X100 }
    else if (data.GLUSR_USR_LOGO_IMG && data.GLUSR_USR_LOGO_IMG != '') { firstImg = data.GLUSR_USR_LOGO_IMG }
    else firstImg = 'https://m.imimg.com/gifs/background_image.jpg';
    return {
        firstImg: firstImg,
        w: w,
        h: h
    }
}

function constructPdpLcpDiv(pdpData, relatedData, cookie = '', imgSrc = '') {
    let contact = getMobileNum(pdpData)
    let transformedNo = contact && contact.num ? TransformContactNumber(contact.num) : "";
    let image = imgSrc;
    let name = getDisplayName(pdpData);
    let display_id = pdpData.PC_ITEM_DISPLAY_ID;
    let price = pdpData.FOB_PRICE ? pdpData.FOB_PRICE : "लेटेस्ट रेट पाएं";
    let isMOBILE_PNS = pdpData.MOBILE_PNS ? true : false;
    let callProps = { callTxt: '', image: '', tsCode: '', companyName: '', contactNumber: '', contactType: '', glusrID: '', modrefid: '', modrefname: '', query_ref_id: '', query_ref_type: '', dbpagetrack: '', eventLabel: 'PDP', PAID_TYPE: '' };
    let SSR = renderToString(<><First_Fold data={pdpData} transformedNo={transformedNo} firstimage={image} name={name} IsSSR={true} callProps={callProps} />
    </>)
    return (`
    ${pdpCss()}
    <div id="pdpLcpDiv" class=" w100">
    <div id="pdpFirstFold" class="promptHandlingClass">${SSR}</div>
    </div>
    <script async=true>
    window.pdpLcpNew = true;
    </script>
    <div id="gblLoader"style="display:none" class="mSpinnerP centerAlign">  <div class="mSpinner"> <div></div><div></div></div></div>
    `)
}

module.exports = {
    pdpShell: pdpShell,
    pdp404: pdp404,
    pdp5XX: pdp5XX
}