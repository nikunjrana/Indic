const { PDPClient } = require('./proto/pdpResponse_grpc_pb');
const { PDPRequest } = require('./proto/pdpResponse_pb');
const grpc = require('@grpc/grpc-js');



const insecureCredentials = grpc.credentials.createInsecure();
const client = new PDPClient('34.93.213.35:3000', insecureCredentials);

const request = new PDPRequest();
request.setDisplayid(13289337648);
var gRPCPDPRespose;
// Call the GetProductDetails method on the client, not PDPResponse
client.getProductDetails(request, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response);
        // gRPCPDPRespose = response;
    }
});
// console.log(gRPCPDPRespose);
/*
function homeShellStruct(req, gRPCPDPRespose) {
    let crumbsObj = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "IndiaMART",
            "alternateName": "IndiaMART InterMESH Ltd",
            "url": "https://hindi.indiamart.com/",
            "potentialAction": [
                {
                    "@type": "SearchAction",
                    "target": "https://hindi.indiamart.com/isearch.php?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            ]
        }
    ];
    appShell.FOOTER_LINK = 'https://hindi.indiamart.com';
    appShell.FOOTER = 'DEFAULT';
    appShell.STATUS = 200;
    appShell.TITLE = '<title>इंडियामार्ट - भारतीय निर्माता आपूर्तिकर्ता निर्यातक निर्देशिका, भारत निर्यातक निर्माता</title>';
    appShell.SEARCHBAR = 'DEFAULT';
    appShell.META = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"><meta name="language" content="en"/><meta property="og:title" content="IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer" /><meta property="og:type" content="website" /><meta property="og:url" content="https://hindi.indiamart.com" /><meta property="og:site_name" content="IndiaMART" /><meta property="og:image" content="https://m.imimg.com/gifs/iml300.png" /><meta property="og:image:url" content="https://m.imimg.com/gifs/iml300.png" /><meta property="og:image:width" content="300" /><meta property="og:image:height" content="300" /><meta property="og:description" content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable & transparent platform. Largest free online business directory & yellow page with listing of 1,945,000 Indian & International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters & international buyers." ><meta name="description" content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable & transparent platform. Largest free online business directory & yellow page with listing of 1,945,000 Indian & International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters & international buyers."><meta name="keywords" content="Business directory, business directory in india, business e-commerce, business listings, business website, business marketplace, companies business listings, companies database india, companies directory, companies directory india, directory of companies, directory of indian companies, e-commerce in india, electronic trade &amp; commerce, electronic trade and commerce, exporter importer directory, exporters business directory, exporters in india, free business listings, free business listings in india, free business marketplace, free indian companies business listings, free manufacturers directory india, importers, india business directory, india export import, india importers, indiamart, indian business, Indian companies directory, indian exporters, indian exporters directory, indian manufacturers directory, indian market, indian service providers, manufacturers directory, manufacturers in india, online business directory, online marketplace,suppliers directory, yellow pages">';
    appShell.CANONICAL_LINKS = '<link rel="canonical" href="https://hindi.indiamart.com/"><link rel="alternate" href="https://hindi.indiamart.com/" media="only screen and (max-width:640px)"><link rel="alternate" href="android-app://com.indiamart.m/https/hindi.indiamart.com/"><link rel="icon" sizes="192x192" href="https://m.imimg.com/gifs/im2-192.png"><link rel="apple-touch-icon" href="https://m.imimg.com/apple-touch-icon.png"><link rel="apple-touch-icon-precomposed" href="https://m.imimg.com/apple-touch-icon-precomposed.png">';
    appShell.LOADER = 'DEFAULT';
    appShell.HEAD_SCRIPTS = `${preloadedChunks()}<script type='application/ld+json'>` + JSON.stringify(crumbsObj) + `</script>`;

    appShell.STATE = '';
    appShell.PRE_CONNECTS = '';
    appShell.IS_PDP_LCP = true;
    appShell.displayLcpDiv = homelcpcontent(gRPCPDPRespose);
}
function homelcpcontent(gRPCPDPRespose) {
    return (`
    <style> 
    .pdt2{padding-top:2px}.pdt52{padding-top:52px}.pdb{padding-bottom:9px}.pdt42{padding-top:42px}.fw{font-weight:700}.cross_grey{width:22px;height:28px;right:4%;background-position:-156px -25px;z-index:100;top:5%;position:absolute;background:#fff;border:0}.pf{position:fixed}.offlinepop{box-sizing:border-box;box-shadow:0 2px 4px 0 #000;bottom:45px;left:0;width:100%;font-size:14px;padding:0 10px;transform:translateY(100%);z-index:1000;background:#323232;color:#f1f1f1}.pd15{padding:15px}.dib{display:inline-block}.ml5{margin-left:5px}.pl10{padding-left:10px}.por,.pr{position:relative}.pbrNB input[type=tel]:focus,.pbrNB input[type=text]:focus{box-shadow:0 0 10px #fff;border:1px solid #10a699}.prPd{padding:0 28px 0 10px}.stp1,.stp2,.stp3{width:30px;height:26px;margin:0 auto 5px}.stp1{background-position:4px -152px}.stp2{background-position:-42px -152px}.stp3{background-position:-91px -152px}.ln13{line-height:13px}.pbrNB input::-webkit-input-placeholder{font-size:16px}.pbrNB input::-moz-placeholder{font-size:16px}.pbrNB input::-webkit-input-placeholder{font-size:16px}.pbrNB{background-color:#0e2b54;background-image:linear-gradient(#0e2b54,#192036)}.pbrNB input::-moz-input-placeholder{font-size:16px}.pbrNB .err{color:#ffeb54;font-size:12px;padding:5px 0 12px}.mb10{margin-bottom:10px}.mt10{margin-top:10px}.CovidTopInd li:first-child .flx.alinItmCntr {display: flex }.bgbrd li {background: #eef9f8;border-top: 1px solid rgb(203 223 221) }.bgwI {background: #fff!important;border-radius: 20px 20px 0 0 }#topul1 li:first-child,#topul2 li:first-child,#topul3 li:first-child,#topul4 li:first-child,#topul5 li:first-child,#topul6 li:first-child,#topul7 li:first-child,#topul8 li:first-child,#topul9 li:first-child,#topul10 li:first-child,#topul11 li:first-child,#topul12 li:first-child,#topul13 li:first-child {border-top: inherit;}.bdert {border-top: .5px solid rgb(203 223 221) }.clrw{ color: #000!important;}.pdb5{padding-bottom:5px}.flxwrp{flex-wrap: wrap}.pdt5{padding-top:5px}.crx:after{content: "";visibility: hidden;display: block;height: 0;clear: both}.fl-sh{flex-shrink:0}.tbrndsBG {width: 150px;height: 85px;display: block;margin: 0 auto;text-align: center}.cnterN {top: 50%;left: 50%;transform: translate(-50%,-50%)}.bgmim{background-color:#00a699}.fs16{font-size:16px}.pd6{padding:6px;}.apdIco{width: 22px;height: 30px;background-position:-56px 0;margin-right: 5px;}.bgShine{word-wrap:break-word;padding: 12px 60px 12px 10px;width: 100%;-webkit-animation-name: bgAni;-webkit-animation-duration: 3s;-webkit-animation-iteration-count: infinite;-webkit-animation-timing-function: ease;}.wh30 {width: 30px;height: 30px;}.fbIco {background-position: -79px -51px;}.twIco {background-image: url(https://m.imimg.com/gifs/img/X_logo.svg);background-size: contain;background-repeat: no-repeat;}.gpIco {background-position: 0 -51px;}.mb60{margin-bottom: 60px;}.linkInIco{background-position: -2px -188px;}.bdrBlu {border: 1px solid #2e3192;}.pd6 {padding: 6px;}.cv7{background-image: url('https://m.imimg.com/gifs/covidImages/cv6.webp');}.cvp11{background-position: 0 0;}.cvp12{background-position: 0 -0125px;}.cvp13{background-position: 0 -0250px;}.cvp14{background-position: 0 -0375px;}.cvp15{background-position: 0 -0500px;}.cvp16{background-position: 0 -625px;}.cvp17{background-position: 0 -750px;}.cvp18{background-position: 0 -875px;}.cvp19{background-position: 0 -1000px;}.cv5{background-image: url('https://m.imimg.com/gifs/covidImages/cv4.webp');}.cv1,.cv1wp{background-image: url('https://m.imimg.com/gifs/covidImages/cv1.webp');}.cv2,.cv2wp{background-image: url('https://m.imimg.com/gifs/covidImages/cv2.webp');}.cv3{background-image: url('https://m.imimg.com/gifs/covidImages/cv12.webp');}.cv4{background-image: url('https://m.imimg.com/gifs/covidImages/cv3.webp');}.cv5{background-image: url('https://m.imimg.com/gifs/covidImages/cv4.webp');}.cv6{background-image: url('https://m.imimg.com/gifs/covidImages/cv5.webp');}.cv8{background-image: url('https://m.imimg.com/gifs/covidImages/cv13.webp');}.cv9{background-image: url('https://m.imimg.com/gifs/covidImages/cv7.webp');}.cvs10{background-image: url('https://m.imimg.com/gifs/covidImages/cv8.webp');}.cv11{background-image: url('https://m.imimg.com/gifs/covidImages/cv9.webp');}.cvs12{background-image: url('https://m.imimg.com/gifs/covidImages/cv10.webp');}.cv13{background-image: url('https://m.imimg.com/gifs/covidImages/cv11.webp');}.fs13 {font-size: 13px;}.compCl{background-color:#15746d;background-image:linear-gradient(to right,#00a699 ,#15746d)}.compBl{background-color:#2f3394;background-image:linear-gradient(to right,#5058bc ,#2f3394)}.w45{width:45%}.m10{margin:7px}.mnH240{min-height:240px}.bgBlu{background-color:#2e3192}*{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}@keyframes ripple{0%,35%{transform:scale(0);opacity:1}50%{transform:scale(1.5);opacity:.8}100%{opacity:0;transform:scale(4)}}.compCl{background-color:#15746d;background-image:linear-gradient(to right,#00a699 ,#15746d)}.compCl.ripple:active{background:radial-gradient(circle,transparent 1%,#000 1%) center/15000% #000;background-size:100%;transition:background 0s}.compCl.ripple:hover{background:radial-gradient(circle,transparent 1%,#15746d 1%) center/15000% #00a699}compCl:active{animation:ripple .3s ease-out;background:radial-gradient(circle,transparent 1%,#157#000D 1%) center/15000% #000}.pdt10{padding-top:10px}.pdb10{padding-bottom:10px}.ml10{margin-left:10px}.mr10{margin-right:10px}.clrb{color:#333}.pd5{padding:5px}.mt5{margin-top:5px}.fl{float:left}.db{display:block}.pr10{padding-right:10px}.clrBl{color:#2e3192}.clr99{color:#999}.wrapper{background-color: #fff;}.bxrd4{border-radius:4px}.vat{vertical-align:top}.mt60{margin-top:60px}.bxrd100{border-radius:100%}.bxsh15{box-shadow:0 0 10px rgba(0,0,0,.15)}.poa{position:absolute}.cntr{left:0;right:0;top:0;bottom:0;margin:auto}.clr5a{color:#5a5a5b}.bxsdw{box-shadow:0 1px 2px rgba(0,0,0,.2)}.bxrd20{border-radius:20px}.pdtb105{padding:10px 5px;}.ma{margin-left:auto;margin-right:auto}.w70{width:70%}.w50{width:50%}.bxdw2{box-shadow:0 0 3px rgba(0,0,0,.25)}.topb1{background-position: 0px -3px;}.topb2 {background-position: 0px -90px;}.topb3 {background-position: 0px -177px;}.topb4 {background-position: 0px -242px;}.topb5 {background-position: 0px -318px;}.topb6 {background-position: 0px -414px;}.topb7 {background-position: 0px -300px;}.topb8 {background-position: 0px -508px;height: 90px;}.topb9 {background-position: 0px -616px;}.topb10 {background-position: 0px -450px;}.topb11 {background-position: 0px -726px;height: 100px;transform: translate(-50%, -50%) scale(0.8);}.topb12 {background-position: 0px -835px;transform: translate(-50%, -50%) scale(0.8);}.topb13 {background-position: 0px -1144px;transform: translate(-50%, -50%) scale(0.8);}.topb14 {background-position: 0px -928px;transform: translate(-50%, -50%) scale(0.75);}.topb15 {background-position: 0px -1028px;transform: translate(-50%, -50%) scale(0.8);}.topb16 {background-position: 0px -745px;}.topb17 {background-position: 0px -800px;}.topb18 {background-position: 0px -1232px;}.topb19 {background-position: 0px -900px;}.applikectahome{background-color: #0aa699;border: 1px solid #0aa699;background-image: linear-gradient(90deg,#0aa699,#0aa699);}.brd5{border-radius:10px}.fs15{font-size:15px}.txtElip{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.oh{overflow:hidden}.dn{display:none}.mbg{background:rgba(51,51,51,.96);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:99}.mbg.bdZ{z-index:9999!important}.w125p{width:125px}.ht125px{height:125px}.srchLoader:before{content:'';box-sizing:border-box;position:absolute;left:50%;width:30px;height:30px;margin-left:-15px;border-radius:50%;border:2px solid #ccc;border-top-color:#00a699;animation:spinner .8s linear infinite}.vSh1{fill:#00a699;opacity:.81}.vSh2{fill:#d71920}.ht60p{height:60px}.LazyLoad.is-visible{opacity:1;transition:.1s all ease-in-out;-webkit-transition:.1s all ease-in-out}.LazyLoad.is-visible+.dOff{width:0;opacity:0}.lazy{max-width:125px;max-height:125px}.extendedSctn div.extBG{background-color:#dee5ff;border-radius:10px}#new-inline-pbr.extendedSctn{padding:10px 10px 10px}.soiEven{display: inline-flex;padding: 8px 16px 8px 14px;flex-direction: column;justify-content: center;align-items: center;gap: 4px;background: #FFF;width: 100%;}.soiL{width: 163px;height: 123px;flex-shrink: 0;}.soiLinner{width: 38px;height: 38px;flex-shrink: 0;border-radius: 38px;background: #EAF6F6;}.soiLbtm{width: 163px;min-height: 97px;flex-shrink: 0;border-radius: 7px;padding: 5px;}#soiL{background: #EAF6F6;}.soiLouter{width: 44px;height: 44px;flex-shrink: 0;border-radius: 44px;background: #FFF;}.buyR{width: 163px;height: 119px;flex-shrink: 0;}.buyRouter{width: 44px;height: 44px;flex-shrink: 0;border-radius: 44px;background: #FFF;}.buyRinner{width: 36px;height: 36px;flex-shrink: 0;border-radius: 36px;border: 0.5px solid var(--brand-2, #0AA699);background: #FDFDFD;}.buyRbtm{width: 163px;min-height: 97px;padding: 5px;flex-shrink: 0;}.mr4{margin-right: 4px;}#buyR {background: #FAFAFA;border: 0.5px solid var(--brand-2, #0AA699);border-radius: 6px;}.clrGry{color: #757575;}.buyRbtn{display: inline-flex;padding: 5px 12px;justify-content: center;align-items: center;gap: 8px;border-radius: 20px;border: 1px solid var(--brand-2, #0AA699);background: #FFF;margin-top: 13px;}.clrGrn{color: #0AA699;}.mt26{margin-top: 26px;}.buyRicon{background-image: url(https://m.imimg.com/gifs/img/BuyCartIcon.png);width: 20px;height: 17.614px;flex-shrink: 0;}.soiOdd{width: 100%;flex-shrink: 0;background: #FFF;flex-direction: column;justify-content: center;align-items: center;display: inline-flex;}.sellBuyIcn{background-image: url(https://m.imimg.com/gifs/img/buySellIcon.png);width: 135.515px;height: 89.999px;flex-shrink: 0;}.mt15 {margin-top: 15px;}.mr15 {margin-right: 15px;}.aic{align-items: center;}.centerItems {justify-content: center;align-items: center;}.flxDirColumn{flex-direction: column;}.df{display: flex;}.fs10{font-size:10px}.clrGn{color: #08625B;}.fs10{font-size: 10px;}.clrGb{color: #4F5857;}.soiLBtn{display: inline-flex;padding: 5px 35px;justify-content: center;align-items: center;gap: 8px;border-radius: 20px;background: #00A699;margin-top: 13px;min-height:29px;}.menuIco{background-image: url(https://m.imimg.com/gifs/img/nav_sprite_new5.png);height: 21px;width: 28px;background-size: 100% auto;background-repeat: no-repeat;float: left;margin-right: 12px;}.soiIcon {background-position: 0 -464px;}.w150 {width: 150px;}
    .flx,.hfotr ul{display:flex}.mt23{margin-top:23px}.ht36{height:36px}.ht37{height:37px}.mt33{margin-top:33px}.cvp11{background-position:0 0}.pd35{padding:35px}.gapc10{gap:10px}.gapc5{gap:5px}*{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}.mb5{margin-bottom:5px}.uprr{transform:rotate(180deg)}.brd25{border-radius:25px}.mrla{margin-left:auto;margin-right:auto}.pdt12{padding-top:12px}.pdb12{padding-bottom:12px}.error_msg{color:#c00;font-size:12px;text-align:left}.b125,.hfotr ul li,.voiceIcon{text-align:center}.cr{color:red}.mt20{margin-top:20px}.tuc{text-transform:uppercase}.Menu_icon{background-position:0 2px;cursor:pointer;height:21px;left:15px;top:12px;width:23px;z-index:100}.srchIcn{margin-top:8px;position:absolute;left:11px}.voiceIcon{top:0;right:0;height:36px;width:44px;line-height:48px}.ht52{height:52px}.fltLabel.lFocused label,.lFocused label{transform:translate(15px,-12px);font-size:13px;color:#2e3192;background-color:#fff}.txtEnqLabel1,.txtLabel1{pointer-events:none;transform:translate3d(72px,15px,0) scale(1);transform-origin:left top;transition:.1s;font-size:16px;color:#a0a0a0;z-index:1;position:absolute}.lFocused .txtEnqLabel1{font-size:13px;color:#2e3192;background-color:#fff;padding:1px 5px;transform:translate3d(72px,-8px,0) scale(1)}.inp-head::before{content:" ";height:16px;width:100%;top:3px;position:absolute;z-index:1;background-color:#00a699}.inp-bx{background:#ffff;height:35px;border-radius:18px;box-shadow:0 1px 5px 0 #a1a1a1;border:1.2px solid #0aa69a;outline-width:thick;background-color:#fff;padding:0 10px;width:90%;z-index:2}.wd180p{width:max-content;min-width:200px;bottom:-28px;box-shadow:1px 3px 5px 0 #a1a1a1}.CovidTopInd .RhtAr:after{top:23px;right:3px;padding:2px;transform:rotate(-45deg);content:"";position:absolute;display:inline-block;border:solid #56576f;border-width:0 2px 2px 0}#topInd:before{width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:5px solid #307bf6;content:"";left:0;top:50%;position:absolute}.bdr1e6{border:1px solid #49a399}.dowarr{background-image:url("https://m.imimg.com/gifs/img/dowarr.svg");content:"";width:60px;height:50px;position:absolute;top:0;right:-2px;z-index:1;background-repeat:no-repeat;background-position:50%}.por{position:relative}.pa,.poa{position:absolute}.hfotr,.pf{position:fixed}.c1{color:#000}.fs17{font-size:17px}.pbrNbg{background:#003d89;background:linear-gradient(180deg,#003d89 0,#001f4a)}.compnbg{background-color:#017aff}.bdrb35{border-bottom:35px solid #fff}.lh24{line-height:24px}.pdb16{padding-bottom:16px}.pdr16{padding-right:16px}.pdl16{padding-left:16px}.pd20{padding:20px}.pdt20{padding-top:20px}.pdr20{padding-right:20px}.pdb20{padding-bottom:20px}.pdr70{padding-right:75px}.pdr100{padding-right:100px}.b125,.pdr125{padding-right:125px}.fs24{font-size:24px}.w100,.wdpt100{width:100%}.b125,.db{display:block}.bgbrd li{background:#eef9f8;border-top:1px solid rgb(203 223 221)}.bgbrd{border:.5px solid rgb(203 223 221)}.spclr a{color:#2c2d4b;padding:16px 80px 16px 24px}.b125{width:125px;height:125px;margin-right:20px;overflow:hidden}.ht100,.nenqM{height:100%}.covidMcat,.mr10{margin-right:10px}.catMcatList .flx.alinItmCntr a{flex-shrink:0}.whtarr{width:135px}.firstImgLoad{background-image:url(https://m.imimg.com/gifs/img/cv-first.webp)}.wrapper{background-color:#efefef}.vert-move{animation:.8s infinite alternate mover}@keyframes mover{0%{transform:translateY(0)}to{transform:translateY(-10px)}}.CovidTopInd{background:#f6f9fe;padding-bottom:5px}.fs15{font-size:15px}.pr5{padding-right:5px}.pdt7{padding-top:7px}.pdb7{padding-bottom:7px}.pdt15{padding-top:15px}.pdl20{padding-left:20px}.ml10{margin-left:10px}.fs18{font-size:18px}.tl{text-align:left}.c49{color:#49a399}.bobr{border-top:1px solid #afc4dd}.tslte{top:50%;left:auto;transform:translateY(-50%)}.covidMcat{border-bottom:1px solid #eaeaed;color:#56576f;white-space:normal;padding:16px 15px 16px 0}.CovidTopInd .covidcatblk{box-shadow:inherit;border-radius:inherit}.clr92{color:#2e3192}.bgwI .flx.alinItmCntr.bgw.bdert{height:100%;opacity:1;visibility:visible}.flx.alinItmCntr.bgw.bdert{height:0;opacity:0;visibility:hidden}.CovidTopInd .flx.alinItmCntr{padding:0 10px}.mt24{margin-top:24px}.alinItmCntr{align-items:center}.hfotr{bottom:-2px;border-radius:4px 4px 0 0;width:100%;left:0;transition:.2s linear;z-index:9997;box-shadow:0 -2px 6px 0 hsla(0,0%,65.5%,.5);border:1px solid #cfcfcf;background-color:#fff;font-size:10px}.hfotr ul p{margin-top:5px}.hfotr ul{padding:0;margin:5px 0;align-items:center;justify-content:space-around}.hfotr ul li .active{color:#009e92}.hfotr ul li{list-style:none;padding:5px}.pdt16{padding-top:16px}.enqblue,.handleNext1{background:grey}.handleNext1{color:#fff}.err{color:red;padding-bottom:5px}.ovfy{overflow-y:scroll}.enQMain{padding:50px 0 20%}.enQMain input,.enQMain select{height:44px}.enQMain select{background-image:url(https://m.imimg.com/gifs/img/select-icon.png);background-repeat:no-repeat;background-position:97%}.nenqM{left:0;top:0;z-index:9999}.eCon{top:2px;border-radius:4px 0 0 4px}.enqmim{background:#0e3192}.w70{width:70%}.eCon,.eCon1{width:65px;border-right:1px solid #8e8e8e;padding:0;background-color:#f1f1f1;left:2px;font-weight:400;font-size:20px;position:absolute;line-height:40px}.glicon,.gliconLogin{background:url(https://m.imimg.com/gifs/img/gliconLogin.png) 0 0/100% no-repeat;width:16px;height:16px;margin-bottom:-3px}.bgcol,.shopIcons{background-repeat:no-repeat}.eCon1{top:7px;border-radius:7px 0 0 7px}.ht48{height:48px}.bxrd4{border-radius:4px}.enQMain input,.enQMain select,.enQMain textarea{border-radius:4px;-moz-appearance:none;background-color:#fff;-webkit-appearance:none;font-size:18px;margin:0}.br8e{border:1px solid #8e8e8e}.txtElip{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.pdl10{padding-left:10px}.btmBodr{border-bottom:1px solid hsla(0,0%,80%,.5)}.enqBx{border-radius:6px;box-shadow:0 2px 4px 0 hsla(0,0%,83.1%,.5);border:.5px solid #e3e3e3;padding-bottom:20px;position:relative}.pdb17{padding-bottom:17px}.pdlr8{padding:5px 12px}.m7{margin:7px}.mr5{margin-right:5px}.enq_country_name{border-bottom:1px solid #555}.outLineA{width:20px;height:20px;-webkit-transform:scale(1);border-radius:100%;background-color:transparent;border:1px solid #d4d4d4;transition:1s;-webkit-animation:1s infinite blsrch;transform:scale(1);animation:1s infinite blsrch}.vcDesc{top:55px;right:-9px}.tp0{top:0}.rt0{right:0}.w102mar4{width:101%;margin-left:-4px}.pdb15{padding-bottom:15px}.pdb15Imp{padding-bottom:15px!important}.pd10{padding:10px}.bgcol{background-size:100% 145px; background: #eef9f8;}.shiftAnim{left:-30px}@keyframes blsrch{0%{-webkit-trasform:scale(1.2)}50%{-webkit-transform:scale(1.8);opacity:.5}to{-webkit-transform:scale(2.4);opacity:0}}.fltLabel .traL{transform:translate3d(6px,10px,0) scale(1)}.fltLabel label{pointer-events:none;transform:translate3d(68px,10px,0) scale(1);transform-origin:left top;transition:.1s;font-size:16px;color:#a0a0a0;z-index:1}.shopIcons{background-image:url(https://m.imimg.com/gifs/img/Shopicon.png);height:22px;width:20px;margin-top:5px;margin-bottom:5px;float:left;background-size:100% auto;margin-left:10px}.blc{color:#2c2d4b}.pbrNbg .bgR{background-image:url("https://m.imimg.com/gifs/img/bulding-rp.png")}.cvs10{background-image:url(https://m.imimg.com/gifs/covidImages/cv8.webp)}.cv9{background-image:url(https://m.imimg.com/gifs/covidImages/cv7.webp)}.cvs12{background-image:url(https://m.imimg.com/gifs/covidImages/cv10.webp)}.cv3{background-image:url(https://m.imimg.com/gifs/covidImages/cv12.webp)}.mb20{margin-bottom:20px}.enQMain .lFocused .txtLabel1{font-size:13px;color:#2e3192;background-color:#fff;padding:1px 5px;transform:translate3d(72px,-8px,0) scale(1)!important}.lFocused input{border-color:#2e3192;border-width:2px;padding-right:40px}.enQMain div.enqMain{padding-top:15px!important}.enQMain .trgABi{transform:translate3d(72px,15px,0) scale(1)!important}.arrow_login:after{content:"";border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #555;vertical-align:middle;display:inline-block;margin-left:0}.enQMain .bwABi{background-color:#fff!important}.enQMain .fs18{font-size:18px!important}
    </style>
    <div id="HomeLcpHindi">
    ${homePageContent(gRPCPDPRespose)}
    </div>
 <script> window.isHomeLcp = true;</script>`
    )


}

function HomePageFooter() {
    return (`<div><div id="footerIM" class="crb tc fs12 bgw pd10 mb60 promptHandlingClass"><div></div><div><a class="dib clr7B brdR7b pdl7 pdr7 dn" href="https://hindi.indiamart.com" id="home_url">Home</a><a href="https://corporate.indiamart.com/about-us/" class="dib clr7B brdR7b pdl7 pdr7" id="about_url"> About Us </a><a href="https://help.indiamart.com" class="dib clr7B pdl7 pdr7" id="cc_url">Customer Care</a><a class="dib clr7B brdL7b pdl7 pdr7" rel="nofollow" id="desktop_url">Desktop Site</a><div class="pdt10 tc"><a href="https://www.facebook.com/IndiaMART" target="_blank" rel="noreferrer" class="ml10 dib"><i class="dib fbIco wh30" style="background-image: url(&quot;https://m.imimg.com/gifs/img/HFsprite_v010.webp&quot;); background-repeat: no-repeat;"></i></a><a href="https://twitter.com/IndiaMART" rel="noreferrer" target="_blank" class="dib"><i class="dib twIco wh30"></i></a><a href="https://www.linkedin.com/company/indiamart-intermesh-limited/" rel="noreferrer" target="_blank" class="dib"><i class="dib linkInIco wh30" style="background-image: url(&quot;https://m.imimg.com/gifs/img/HFsprite_v010.webp&quot;); background-repeat: no-repeat;"></i></a></div></div><div class="pdt10 fs12 tc"><p class="copirightText clr7B cp-rt dib ml286"><span>©</span>1996-2024 IndiaMART.com</p></div></div></div> `)
}


function homePageContent(gRPCPDPRespose) {
    return (` <div class="pdt10 wrapper">
    <span class="db fs18 fw pdt15 mr10  w102mar4 clrw  pdb15  por bgcol tl pdl20 c1 mb5" id="topInd">शीर्ष श्रेणियां</span>
    <span id="set9">
    <div class="pdl16 pdr16  pdt10 mb10 ">
      <div class="por pdt20 pdb20 bobr ">
        <a href="dir/apparel-garments/">
          <h2 class="fs17 db c1 pdr125 lh24 fwN">परिधान, वस्त्र एवं  &amp;गारमेंट्स</h2>
        </a>
        <pre>${gRPCPDPRespose}</pre>
      </div>
      <div class="scWrap bxrd20 ">
        <ul id="topul9" class="bxrd20 oh bgbrd">
          <li class="covidcatblk bxrd20 por  ">
            <div class="por fs16  spclr">
              <a class="db" alt='ladies-kurtis' href="https://hindi.indiamart.com/impcat/ladies-kurtis.html">महिलाओं की कुर्तियां</a>
                
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/ladies-kurtis.html" class=" b125 mr10 ma cvp11 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/designer-kurtis.html">
                डिजाइनर कुर्तियां</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cotton-kurti.html">सूती कुर्ती</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ladies-woolen-kurti.html">महिलाओं की ऊनी कुर्ती</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/mens-t-shirts.html">Mens T-Shirts</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/mens-t-shirts.html" class=" b125 mr10 ma cvp12 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mens-round-neck-t-shirt.html">Mens Round Neck T Shirt</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mens-polo-t-shirt.html">Mens Polo T Shirt</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/graphic-printed-t-shirt.html">Graphic Printed T-Shirt</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/blazers.html">Blazers</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/blazers.html" class=" b125 mr10 ma cvp13 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mens-blazer.html">Mens Blazer</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/womens-blazer.html">Womens Blazer</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/designer-blazer.html">Designer Blazer</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/safety-shoes.html">Safety Shoes</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/safety-shoes.html" class=" b125 mr10 ma cvp14 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/leather-safety-shoes.html">Leather Safety Shoes</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/steel-toe-safety-shoes.html">Steel Toe Safety Shoes</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/industrial-shoes.html">Industrial Shoes</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/trouser.html">Trouser</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/trouser.html" class=" b125 mr10 ma cvp15 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cargo-pant.html">Cargo Pant</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/jogger-pant.html">Jogger Pant</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/chino-trousers.html">Chino Trousers</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/mannequins.html">Mannequins</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/mannequins.html" class=" b125 mr10 ma cvp16 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/female-mannequins.html">Female Mannequins</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/dress-forms.html">Dress Forms</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/male-mannequins.html">Male Mannequins</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/commercial-uniforms.html">Commercial Uniforms</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/commercial-uniforms.html" class=" b125 mr10 ma cvp17 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/worker-uniform.html">Worker Uniform</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/housekeeping-uniform.html">Housekeeping Uniform</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/corporate-uniform.html">Corporate Uniform</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/shirt.html">Shirt</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/shirt.html" class=" b125 mr10 ma cvp18 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/printed-shirt.html">Printed Shirt</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/designer-shirt.html">Designer Shirt</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plain-shirt.html">Plain Shirt</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/synthetic-fabric.html">Synthetic Fabric</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/synthetic-fabric.html" class=" b125 mr10 ma cvp19 cv9"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/rayon-fabrics.html">Rayon Fabrics</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/faux-fur-fabric.html">Faux Fur Fabric</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/viscose-fabrics.html">Viscose Fabrics</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </span>
    <span id="set7">
       <div class="pdl16 pdr16  pdt10 mb10 ">
          <div class="por pdt20 pdb20 bobr ">
             <a href="dir/agro-farm/">
                <h2 class="fs17 db c1 pdr125 lh24 fwN c1">Food &amp; Beverages</h2>
             </a>
             </div>
          <div class="scWrap bxrd20 ">
             <ul id="topul7" class="bxrd20 oh bgbrd">
                <li class="covidcatblk bxrd20 por  ">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/rice.html">Rice</a>   </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/rice.html" class=" b125  mr10 ma cvp11 firstImgLoad"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/basmati-rice.html">Basmati Rice</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/kolam-rice.html">Kolam Rice</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ponni-rice.html">Ponni Rice</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/sona-masoori-rice.html">Sona Masoori Rice</a></div>
                   </div>
                </li>
                <li class="covidcatblk bxrd20 por listopen">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/wheat.html">Wheat</a>  </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/wheat.html" class=" b125 mr10 ma cvp12 cv7"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/wheat-grains.html">Wheat Grains</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/milling-wheat.html">Milling Wheat</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/lokwan-wheat.html">Lokwan Wheat</a></div>
                   </div>
                </li>
                <li class="covidcatblk bxrd20 por listopen">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/pulses.html">Pulses</a>  </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/pulses.html" class=" b125 mr10 ma cvp13 cv7"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/toor-dal.html">Toor Dal</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/chana-dal.html">Chana Dal</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/urad-dal.html">Urad Dal</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/moong-dal.html">Moong Dal</a></div>
                   </div>
                </li>
                <li class="covidcatblk bxrd20 por listopen">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/flours.html">Atta</a>  </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/flours.html" class=" b125 mr10 ma cvp14 cv7"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/wheat-flour.html">Wheat Flour</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/maida-flour.html">Maida Flour</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/wheat-bran.html">Wheat Bran</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/gram-flour.html">Gram Flour</a></div>
                   </div>
                </li>
                <li class="covidcatblk bxrd20 por listopen">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/fresh-vegetables.html">Fresh Vegetables</a>  </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/fresh-vegetables.html" class=" b125 mr10 ma cvp15 cv7"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/potato.html">Potato</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/onion.html">Onion</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/tomato.html">Tomato</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fresh-mushroom.html">Mushroom</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ginger.html">Ginger</a></div>
                   </div>
                </li>
                <li class="covidcatblk bxrd20 por listopen">
                   <div class="por fs16  spclr"><a class="db" href="https://hindi.indiamart.com/impcat/whole-spices.html">Whole Spices</a>  </div>
                   <div class="flx bgw bdert">
                      <a href="https://hindi.indiamart.com/impcat/whole-spices.html" class=" b125 mr10 ma cvp16 cv7"></a>
                      <div class="wdpt100"><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/green-cardamom.html">Green Cardamom</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/black-pepper.html">Black Pepper</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/green-cardamom.html">Cardamom</a><a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/turmeric.html">Turmeric</a></div>
                   </div>
                </li>
             </ul>
          </div>
       </div>
    </span>
 
    <span id="set10">
    <div class="pdl16 pdr16  pdt10 mb10 ">
      <div class="por pdt20 pdb20 bobr ">
        <a href="dir/plant-machinery/">
          <h2 class="fs17 db c1 pdr125 lh24 fwN">Industrial Plants, Machinery &amp; Equipment</h2>
        </a>
      </div>
      <div class="scWrap bxrd20 ">
        <ul id="topul10" class="bxrd20 oh bgbrd">
          <li class="covidcatblk bxrd20 por  ">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/snack-machine.html">Snack Machine</a>
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/snack-machine.html" class=" b125 mr10 ma cvp11 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/namkeen-making-machines.html">Namkeen Making Machines</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pani-puri-making-machine.html">Pani Puri Making Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/kurkure-extruder.html">Kurkure Extruder</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/air-compressors.html">Air Compressors</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/air-compressors.html" class=" b125 mr10 ma cvp12 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/reciprocating-air-compressor.html">Reciprocating Air Compressor</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ingersoll-rand-air-compressors.html">Ingersoll Rand Air Compressors</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/oil-free-air-compressor.html">Oil Free Air Compressor</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/water-purification-plants.html">Water Purification Plants</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/water-purification-plants.html" class=" b125 mr10 ma cvp13 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/waterpurificationplants.html">Water Treatment Plants</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/industrial-ro-system.html">Industrial RO System</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/water-ionizer-machine.html">Water Ionizer Machine</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/rice-mill-machinery.html">Rice Mill Machinery</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/rice-mill-machinery.html" class=" b125 mr10 ma cvp14 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/rice-cutting-machine.html">Rice Cutting Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/puffed-rice-machinery.html">Puffed Rice Machinery</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mini-rice-mill.html">Mini Rice Mill</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/arc-welder.html">Arc Welder</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/arc-welder.html" class=" b125 mr10 ma cvp15 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/arc-welding-machines.html">Arc Welding Machines</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/inverter-arc-welding-machine.html">Inverter ARC Welding Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/saw-welding-machine.html">Saw Welding Machine</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/bag-making-machine.html">Bag Making Machine</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/bag-making-machine.html" class=" b125 mr10 ma cvp16 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/non-woven-bag-making-machine.html">Non Woven Bag Making Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fully-automatic-paper-bags-making-machine.html">Fully Automatic Paper Bags Making Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-bag-making-machine.html">Plastic Bag Making Machine</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/animal-feed-making-machine.html">Animal Feed Making Machine</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/animal-feed-making-machine.html" class=" b125 mr10 ma cvp17 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/poultry-feed-making-machine.html">Poultry Feed Making Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fish-feed-making-machine.html">Fish Feed Making Machine</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cattle-feed-machine.html">Cattle Feed Machine</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/oil-extraction-machine.html">Oil Extraction Machine</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/oil-extraction-machine.html" class=" b125 mr10 ma cvp18 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/oil-expellers.html">Oil Expellers</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mustard-oil-expeller.html">Mustard Oil Expeller</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/edible-oil-extraction-machinery.html">Edible Oil Extraction Machinery</a>
              </div>
            </div>
          </li>
          <li class="covidcatblk bxrd20 por listopen">
            <div class="por fs16  spclr">
              <a class="db" href="https://hindi.indiamart.com/impcat/garment-printing-machine.html">Garment Printing Machine</a>
               
            </div>
            <div class="flx bgw bdert">
              <a href="https://hindi.indiamart.com/impcat/garment-printing-machine.html" class=" b125 mr10 ma cvp19 cvs10"></a>
              <div class="wdpt100">
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/t-shirt-printer.html">T Shirt Printer</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/screen-printing-machines.html">Screen Printing Machines</a>
                <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/digital-garment-printing-machine.html">Digital Garment Printing Machine</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </span>
 
 
 
 <span id="set12">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/electronic-goods/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Electronics &amp; Electrical Goods &amp; Supplies</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul12" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por  ">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/photocopier-machine.html">Photocopier Machine</a>
               
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/photocopier-machine.html" class=" b125 mr10 ma cvp11 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/multifunction-printer.html">Multifunction Printer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/xerox-machines.html">Xerox Machines</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fingerprint-scanners.html">Fingerprint Scanners</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/high-mast-lighting.html">High Mast Lighting</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/high-mast-lighting.html" class=" b125 mr10 ma cvp12 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/level-sensors.html">Level Sensors</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/proximity-sensor.html">Proximity Sensor</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/thermocouple-element.html">Sensor for Home &amp; Office</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/load-cells.html">Load Cell</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/billing-machines.html">Billing Machines</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/billing-machines.html" class=" b125 mr10 ma cvp13 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/level-controllers.html">Level Controllers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/motor-controllers.html">Motor Controllers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/temperature-controllers.html">Temperature Controllers</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/inverter-batteries.html">Inverter Batteries</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/inverter-batteries.html" class=" b125 mr10 ma cvp14 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/variable-frequency-drives.html">VFD</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/programmable-logic-controllers.html">PLC</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/human-machine-interface.html">HMI</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/automotive-batteries.html">Automotive Batteries</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/automotive-batteries.html" class=" b125 mr10 ma cvp15 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/integrated-circuits.html">Integrated Circuits</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/thyristors.html">Thyristors</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/light-emitting-diode.html">Light Emitting Diode</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/solar-batteries.html">Solar Batteries</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/solar-batteries.html" class=" b125 mr10 ma cvp16 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/house-wire.html">House Wire</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/armoured-cables.html">Armoured Cable</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/power-cables.html">Power cable</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/street-lights.html">Street Lights</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/street-lights.html" class=" b125 mr10 ma cvp17 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/led-street-light.html">LED Street Lights</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/solar-street-lights.html">Solar Street Lights</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/solar-led-street-light.html">Solar LED Street Light</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/flood-lights.html">Flood Lights</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/flood-lights.html" class=" b125 mr10 ma cvp18 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/led-floodlight.html">LED Floodlight</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/high-bay-light.html">High Bay Light</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/led-bay-light.html">LED Bay Light</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/spot-lights.html">Spot Lights</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/spot-lights.html" class=" b125 mr10 ma cvp19 cvs12"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/led-spotlight.html">LED Spotlight</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/led-track-light.html">LED Track Light</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/track-light.html">Track Light</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set3">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/drugs-medicines/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Pharmaceutical Drug, Medicine, Medical Care &amp; Consultation</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul3" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por  ">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/pharmaceutical-drug.html">Pharmaceutical Drug</a>
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/pharmaceutical-drug.html" class=" b125 mr10 ma cvp11 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/anticoagulants-drugs.html">Anticoagulants Drugs</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/antiparasitic-drug.html">Antiparasitic Drugs</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/antibiotic-tablets.html">Antibiotic Tablets</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/antifungal-drugs.html">Antifungal Drugs</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/essential-nutrients.html">Nutraceuticals</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/essential-nutrients.html" class=" b125 mr10 ma cvp12 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/vitamin-tablet.html">vitamin Tablet</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/weight-loss-supplement.html">Weight Loss Supplement</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/diet-supplement.html">Dietary Supplements</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/mineral-supplement.html">Mineral Supplements</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/fitness-supplements.html">Fitness Supplements</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/fitness-supplements.html" class=" b125 mr10 ma cvp13 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/weight-gain-nutrition.html">Weight Gain Nutrition</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/weight-gain-capsule.html">Weight Gain Capsule</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pre-workout-supplement.html">Pre workout Supplements</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/immune-booster.html">Immune Booster</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/medical-treatment-services.html">Medical Treatment Services</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/medical-treatment-services.html" class=" b125 mr10 ma cvp14 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/dental-treatment-services.html">Dental Treatment Services</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/medical-surgery-services.html">Medical Surgery Services</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/eye-treatment.html">Eye Treatment</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-surgery-services.html">Plastic Surgery Services</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/medical-test-services.html">Medical Test Services</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/medical-test-services.html" class=" b125 mr10 ma cvp15 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ct-scan-services.html">CT Scan Services</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ultrasound-services.html">Ultrasound Services</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/echo-cardiography.html">ECHO Cardiography</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/blood-testing.html">Blood Testing</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/pcd-pharma-franchise.html">PCD Pharma Franchise</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/pcd-pharma-franchise.html" class=" b125 mr10 ma cvp16 cv3"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pharma-franchise-opportunity.html">Pharma Franchise</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/allopathic-pcd-pharma-franchise.html">Allopathic PCD Pharma</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ayurvedic-medicine-franchise.html">Ayurvedic PCD Pharma</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/veterinary-franchise.html">Veterinary PCD Pharma</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set5">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/medical-pharma/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Hospital and Medical Equipment</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul5" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/diagnostic-test-kit.html">Diagnostic Test Kit</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/diagnostic-test-kit.html" class=" b125 mr10 ma cvp11 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/rapid-test-cassette.html">Rapid Test Kit</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/biochemistry-analyzer.html">Biochemistry Analyzer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/blood-bank-equipments.html">Blood Bank Equipments</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hematology-analyzers.html">Hematology Analyzers</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/patient-monitoring-devices.html">Patient Monitoring Systems</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/patient-monitoring-devices.html" class=" b125 mr10 ma cvp12 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/blood-pressure-machines.html">Blood Pressure Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/capnography.html">Capnometer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/medical-monitor.html">Medical Monitor</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/surgical-monitor.html">Surgical Monitor</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/thermometer.html">Thermometer</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/thermometer.html" class=" b125 mr10 ma cvp13 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/infrared-thermometers.html">Infrared Thermometers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/forehead-thermometer.html">Forehead Thermometer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/non-contact-thermometer.html">Non Contact Thermometer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/digital-thermometers.html">Digital Thermometers</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/medical-ventilators.html">Medical Ventilators</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/medical-ventilators.html" class=" b125 mr10 ma cvp14 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/x-ray-machine.html">X Ray Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ultrasound-machine.html">Ultrasound Machines</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ecg-machine.html">ECG Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/doppler-ultrasound-scanner.html">Doppler Machine</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/stethoscope.html">Stethoscope</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/stethoscope.html" class=" b125 mr10 ma cvp15 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cardiology-stethoscope.html">Cardiology Stethoscope</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/dual-head-stethoscope.html">Dual Head Stethoscope</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/electronic-stethoscope.html">Electronic Stethoscope</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pediatric-stethoscope.html">Pediatric Stethoscope</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/suction-machine.html">Suction Machine</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/suction-machine.html" class=" b125 mr10 ma cvp16 cv5"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/electric-suction-unit.html">Electric Suction Unit</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/foot-operated-suction-unit.html">Foot Operated Suction Unit</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/liposuction-machine.html">Liposuction Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/central-suction-system.html">Central Suction System</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set13">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/builders-hardware/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Building Construction Material &amp; Equipment</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul13" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/brick-making-machines.html">Brick Making Machines</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/brick-making-machines.html" class=" b125 mr10 ma cvp11 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fly-ash-brick-making-machine.html">Fly Ash Brick Making Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/clay-brick-making-machine.html">Clay Brick Making Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cement-brick-machine.html">Cement Brick Making Machine</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/passenger-lifts.html">Passenger Lifts</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/passenger-lifts.html" class=" b125 mr10 ma cvp12 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/residential-elevator.html">Residential Elevator</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/kone-automatic-elevator.html">Kone Passenger lift</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/stair-lift.html">Stair Lift</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/tmt-bars.html">TMT Bars</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/tmt-bars.html" class=" b125 mr10 ma cvp13 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/tmt-steel-bars.html">TMT Steel Bars</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/tata-tmt-bars.html">TATA TMT Bars</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/kamdhenu-tmt-bars.html">Kamdhenu TMT Bars</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/engineeredboards.html">Plywoods </a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/engineeredboards.html" class=" b125 mr10 ma cvp14 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/shuttering-plywood.html">Shuttering Plywood</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/laminated-plywood.html">Laminated Plywood</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/waterproof-plywood.html">Waterproof Plywood</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/excavator.html">Excavator</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/excavator.html" class=" b125 mr10 ma cvp15 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hitachi-excavator.html">Hitachi Excavator</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hyundai-excavator.html">Hyundai Excavator</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/komatsu-excavator.html">Komatsu Excavator</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/emulsion-paints.html">Emulsion Paints</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/emulsion-paints.html" class=" b125 mr10 ma cvp16 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/asian-emulsion-paints.html">Asian Emulsion Paints</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/berger-emulsion-paints.html">Berger Emulsion Paints</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/nerolac-emulsion-paints.html">Nerolac Emulsion Paints</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/wood-door.html">Wooden Door</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/wood-door.html" class=" b125 mr10 ma cvp17 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/designer-wooden-door.html">Designer Wooden Door</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ply-panel-doors.html">Plywood Door</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/wooden-flush-doors.html">Wooden Flush Doors</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/pvc-pipes.html">PVC Pipes</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/pvc-pipes.html" class=" b125 mr10 ma cvp18 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/finolexpipes.html">Finolex Pipes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/rigid-pvc-pipes.html">Rigid PVC Pipes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/flexible-pvc-pipes.html">Flexible PVC Pipes</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/building-brick.html">Building Brick</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/building-brick.html" class=" b125 mr10 ma cvp19 cv13"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/red-brick.html">Red Brick</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fly-ash-bricks.html">Fly Ash Bricks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cement-brick.html">Cement Brick</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set11">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/industrial-supplies/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Industrial &amp; Engineering Products, Spares and Supplies</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul11" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/submersible-pumpsets.html">Submersible Pump</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/submersible-pumpsets.html" class=" b125 mr10 ma cvp11 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/borewell-submersible-pump.html">Borewell Submersible Pump</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cri-submersible-pumps.html">CRI Submersible Pumps</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/open-well-submersible-pump.html">Open Well Submersible</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/automotive-oils.html">Automotive Oils</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/automotive-oils.html" class=" b125 mr10 ma cvp12 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/engine-oil.html">Engine Oil</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/gear-oil.html">Gear Oil</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/lubricating-oil.html">Lubricating Oil</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/water-tanks.html">Water Tanks</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/water-tanks.html" class=" b125 mr10 ma cvp13 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/triple-layered-water-tanks.html">Triple Layered Water Tanks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/stainless-steel-water-tank.html">Stainless Steel Water Tank</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/supreme-water-tanks.html">Supreme Water Tanks</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/pvc-sheets.html">PVC Sheets</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/pvc-sheets.html" class=" b125 mr10 ma cvp14 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pvc-foam-sheets.html">PVC Foam Sheets</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pvc-marble-sheet.html">PVC Marble Sheet</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/transparent-pvc-sheet.html">Transparent PVC Sheet</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/conveyor-components.html">Conveyor Components</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/conveyor-components.html" class=" b125 mr10 ma cvp15 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/conveyor-belt.html">Conveyor Belt</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/conveyor-rollers.html">Conveyor Rollers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/conveyor-chains.html">Conveyor Chains</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/plastic-scrap.html">Plastic Scrap</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/plastic-scrap.html" class=" b125 mr10 ma cvp16 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pp-scrap.html">PP Scrap</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pet-bottle-scrap.html">Pet Bottle Scrap</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pet-chips-scrap.html">PET Chips Scrap</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/packaging-tapes.html">Packaging Tapes</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/packaging-tapes.html" class=" b125 mr10 ma cvp17 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/self-adhesive-tapes.html">Self Adhesive Tapes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bopp-tapes.html">BOPP Tapes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/brown-tape.html">Brown Tape</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/industrial-rack.html">Industrial Rack</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/industrial-rack.html" class=" b125 mr10 ma cvp18 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/warehouse-racks.html">Warehouse Racks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/slotted-angle-racks.html">Slotted Angle Racks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pallet-racks.html">Pallet Racks</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/water-heaters.html">Water Heater &amp; Geyser</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/water-heaters.html" class=" b125 mr10 ma cvp19 cv11"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/solar-water-heater.html">Solar Water Heater</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/electric-geyser.html">Electric Geyser</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/gas-geyser.html">Gas Geyser</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set1">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="suppliers/surgical-clothing/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Medical, Safety &amp; Protective Clothing and Apparel</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul1" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/face-mask.html">Face Mask</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/face-mask.html" class=" b125 mr10 mawp cvp11 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/surgical-masks.html">Surgical Masks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/3-ply-face-mask.html">3 Ply Face Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/disposable-face-mask.html">Disposable Face Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/n95-respirator-mask.html">N95 Respirator Mask</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/medical-face-masks.html">Medical Mask</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/medical-face-masks.html" class=" b125 mr10 mawp cvp12 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cpr-mask.html">CPR Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/oxygen-mask.html">Oxygen Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cpap-mask.html">CPAP Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bipap-mask.html">BIPAP Mask</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/surgical-gloves.html">Surgical Gloves</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/surgical-gloves.html" class=" b125 mr10 mawp cvp13 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/nitrile-gloves.html">Nitrile Gloves</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/latex-surgical-gloves.html">Latex Surgical Gloves</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/examination-gloves.html">Medical Examination Gloves</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/sterile-surgical-gloves.html">Sterile Surgical Gloves</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/medical-clothes.html">Medical Clothing</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/medical-clothes.html" class=" b125 mr10 mawp cvp14 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/medical-apron.html">Medical Apron</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/nurse-uniform.html">Nurse Uniform</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/surgical-gown.html">Surgical Gown</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/disposable-clothing.html">Disposable Clothing</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/surgical-caps.html">Surgical Caps</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/surgical-caps.html" class=" b125 mr10 mawp cvp15 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bouffant-caps.html">Bouffant Caps</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/surgical-hood.html">Surgical Hood</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/disposable-cap.html">Disposable Cap</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/nurse-cap.html">Nurse Cap</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/cleanroom-clothing.html">Cleanroom Clothing</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/cleanroom-clothing.html" class=" b125 mr10 mawp cvp16 cv1"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cleanroom-gloves.html">Cleanroom Gloves</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/clean-room-hoods.html">Clean Room Hoods</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cleanroom-mask.html">Cleanroom Mask</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cleanroom-shoes.html">Cleanroom Shoes</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set4">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/chemicals-fertilizers/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Chemicals, Dyes, Solvents &amp; Allied Products</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul4" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/isopropyl-alcohol.html">Industrial Alcohol</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/isopropyl-alcohol.html" class=" b125 mr10 ma cvp11 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/isopropyl-alcohol.html">Isopropyl Alcohol</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/rubbing-alcohol.html">Rubbing Alcohol</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ethyl-alcohol.html">Ethyl Alcohol</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/neutral-ethanol.html">Neutral Ethanol</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/chemical-compound.html">Chemical Compound</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/chemical-compound.html" class=" b125 mr10 ma cvp12 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ipa-hcl.html">IPA HCL</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/glycerine.html">Glycerine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/laboratory-reagents.html">Laboratory Reagents</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/silver-nitrate.html">Silver Nitrate</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/suppliers/industrial-chemical/">Industrial Chemicals</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/suppliers/industrial-chemical/" class=" b125 mr10 ma cvp13 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/speciality-chemicals.html">Speciality Chemicals</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/waterproofing-chemicals.html">Waterprofing Chemicals</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/water-treatment-chemicals.html">Water Treatment Chemicals</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/adhesive-chemical.html">Adhesive Chemical</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/industrial-dyes.html">Industrial Dyes</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/industrial-dyes.html" class=" b125 mr10 ma cvp14 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/reactive-dyes.html">Reactive Dyes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/acid-dyes.html">Acid Dyes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/direct-dyes.html">Direct Dyes</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/solvent-dyes.html">Solvent Dyes</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/resins.html">Resin</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/resins.html" class=" b125 mr10 ma cvp15 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pvc-resin.html">PVC Resin</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/ion-exchange-resin.html">Ion Exchange Resin</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/polyester-resins.html">Polyester Resins</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/casting-resin.html">Casting Resin</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/chemical-fertilizers.html">Chemical Fertilizers</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/chemical-fertilizers.html" class=" b125 mr10 ma cvp16 cv4"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/micronutrient-fertilizers.html">Micronutrient Fertilizers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/phosphate-fertilizers.html">Phosphate Fertilizers</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/liquid-fertilizer.html">Chemical Liquid Fertilizer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/sulfur-fertilizers.html">Sulfur Fertilizers</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set2">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="suppliers/cosmetics-products-toiletries/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Hygiene, Personal Care and Cleaning Supplies</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul2" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/hand-sanitizer.html">Hand Sanitizer</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/hand-sanitizer.html" class=" b125 mr10 mawp cvp11 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/alcohol-based-hand-sanitizer.html">Alcoholic Hand Sanitizer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hand-sanitizer-spray.html">Hand Sanitizer Spray</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/lifebuoy-hand-sanitizer.html">Lifebuoy Hand Sanitizer</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/3m-hand-sanitizer.html">3M Hand Sanitizer</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/tissue-paper.html">Tissue Paper</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/tissue-paper.html" class=" b125 mr10 mawp cvp12 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/toilet-paper-roll.html">Toilet Paper Roll</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/jumbo-roll.html">Tissue Jumbo Roll</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cotton-towels.html">Cotton Towel</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/tissue-napkin.html">Tissue Napkin</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/hand-soap.html">Hand Soap</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/hand-soap.html" class=" b125 mr10 mawp cvp13 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/liquid-hand-wash.html">Liquid Hand Wash</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/lifebuoy-hand-wash.html">Lifebuoy Hand Wash</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hand-washing-gels.html">Hand Washing Gels</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/antibacterial-hand-wash.html">Antibacterial Hand Wash</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/cleaning-mop.html">Mops</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/cleaning-mop.html" class=" b125 mr10 mawp cvp14 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cotton-mop.html">Cotton Mop</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/magic-mop.html">Magic Mop</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/twist-mop.html">Twist Mop</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/microfiber-mop.html">Microfiber Mop</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/garbage-bags.html">Garbage Bags</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/garbage-bags.html" class=" b125 mr10 mawp cvp15 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/disposable-garbage-bags.html">Disposable Garbage Bags</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/biodegradable-garbage-bags.html">Biodegradable Garbage Bags</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bin-bag.html">Bin Bag</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-garbage-bag.html">Plastic Garbage Bag</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/floor-broom.html">Floor Broom</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/floor-broom.html" class=" b125 mr10 mawp cvp16 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/grass-broom.html">Phool Jhadu</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-brooms.html">Plastic Brooms</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/broomsticks.html">Broomsticks</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bamboo-broom.html">Bamboo Broom</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/suppliers/cleaning-supplies/">Cleaning Liquids &amp; Wipes</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/suppliers/cleaning-supplies/" class=" b125 mr10 mawp cvp17 cv2"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/phenyle.html">Phenyl</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/floor-cleaner.html">Floor Cleaner</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/toilet-cleaners.html">Toilet Cleaners</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/cleaning-wipes.html">Cleaning Wipes</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 
 <span id="set6">
   <div class="pdl16 pdr16  pdt10 mb10 ">
     <div class="por pdt20 pdb20 bobr ">
       <a href="dir/packaging-material/">
         <h2 class="fs17 db c1 pdr125 lh24 fwN">Packaging Material, Supplies &amp; Machines</h2>
       </a>
     </div>
     <div class="scWrap bxrd20 ">
       <ul id="topul6" class="bxrd20 oh bgbrd">
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/plastic-bottles.html">Plastic Bottles</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/plastic-bottles.html" class=" b125 mr10 ma cvp11 cv6"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pet-bottles.html">PET Bottles</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/hdpe-bottle.html">HDPE Bottle</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-spray-bottle.html">Plastic Spray Bottle</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/transparent-plastic-bottles.html">Transparent Plastic Bottles</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/cap-closures.html">Cap Closures</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/cap-closures.html" class=" b125 mr10 ma cvp12 cv6"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/bottle-caps.html">Bottle Caps</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/jar-cap.html">Jar Cap</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/flip-top-caps.html">Flip Top Caps</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/metal-caps.html">Metal Caps</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/packaging-pouch.html">Packaging Pouch</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/packaging-pouch.html" class=" b125 mr10 ma cvp13 cv6"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/plastic-pouches.html">Plastic Pouches</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/stand-up-pouch.html">Stand Up Pouch</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/zip-pouch.html">Zipper Pouches</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/paper-pouch.html">Paper Pouch</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/pouch-packaging-machines.html">Packaging Machines</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/pouch-packaging-machines.html" class=" b125 mr10 ma cvp14 cv6"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pouch-packaging-machines.html">Pouch Packaging Machines</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/fruit-juice-packaging-machine.html">Fruit Juice Packaging Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/blister-packing.html">Blister Packaging Machines</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/shrink-packaging-machines.html">Shrink Packaging Machines</a>
             </div>
           </div>
         </li>
         <li class="covidcatblk bxrd20 por listopen">
           <div class="por fs16  spclr">
             <a class="db" href="https://hindi.indiamart.com/impcat/vertical-form-fill-seal-machines.html">Vertical Form Fill Seal Machines</a>
              
           </div>
           <div class="flx bgw bdert">
             <a href="https://hindi.indiamart.com/impcat/vertical-form-fill-seal-machines.html" class=" b125 mr10 ma cvp15 cv6"></a>
             <div class="wdpt100">
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/powder-packaging-machine.html">Powder Packaging Machine</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/liquid-packaging-machinery.html">Liquid Packaging Machinery</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/pouch-packaging-machines.html">Pouch Packaging Machines</a>
               <a class="covidMcat por pr5 clr92  db RhtAr" href="https://hindi.indiamart.com/impcat/snacks-packaging-machine.html">Snack Packing Machine</a>
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </span>
 ${HomePageFooter()}`)
}


function getPDPGRPC(req, res, shellCallBck) {
    homeShellStruct(req);
    shellCallBck(res, appShell);
}
module.exports = getPDPGRPC;

*/