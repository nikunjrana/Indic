//Functions required in router/routes.js, reducer/index.js which are not defined in Globals/GaTracking.js and Globals/CookieManager.js
import { getCookie, deleteCookie } from './CookieManager';
import { checkVersionUpdate } from './versionHandler';

export const versionUp = (type = '') => {
    if (!isBot() && localStorage) {
        if (window._NEED_UPDATE && type !== 'XHR') {
            window.location.reload(true);
        }
        else {
            checkVersionUpdate().then((data) => {
                if (data === 'VERSION_UPDATED') {
                    if (type !== 'XHR') {
                        window.location.reload(true);
                    }
                }
            }, (error) => { })
        }
    }
}
export const checkUserStatus = () => {
    let status = 0;
    if (document.cookie) {
        var c = document.cookie;
        if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && -1 != c.indexOf('im_iss') && getCookie('ImeshVisitor') !== '' && getCookie('im_iss') !== '') status = 2;
        else if (c.length > 0 && -1 != c.indexOf('ImeshVisitor') && getCookie('ImeshVisitor') !== '') status = 1;
    }
    return status;
}
export const checkUserMode = () => {
    let mode=checkUserStatus() === 0 ? "Unidentified":checkUserStatus() === 1 ? "Identified":"Full login";
    return mode;
}
export const trackAppVer = (CD_Miscellaneous) => {
    try {
        if (process.NODE_ENV && window._MAIN_JS_VERSION) {
            let verNum = window._MAIN_JS_VERSION.split('/')[4].split('_')[1].split('.')[0];
            verNum = 'AppVersion=' + verNum;
            return (CD_Miscellaneous ? CD_Miscellaneous + '|' + verNum : verNum);
        }
        else {
            return CD_Miscellaneous ? CD_Miscellaneous : '';
        }
    }
    catch (e) {
        return CD_Miscellaneous ? CD_Miscellaneous : '';;
    }
}
export const service_link = (title, id) => {
    let name = title;
    name = name.replace(/^\s+/, '');
    name = name.replace(/\s+$/, '');
    name = name.replace(/\s+/g, "-");
    name = name.toLowerCase();
    name = name.replace(/\&amp;/g, "&");
    name = name.replace(/\&lt;/g, "<");
    name = name.replace(/\&gt;/g, ">");
    name = name.replace(/\&nbsp;/g, " ");
    name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
    name = name.replace(/^(-)+/, "");
    name = name.replace(/-+$/, "");
    return "/proddetail/" + name + '-' + id + '.html';
}
export const pdp_url = (title, id) => {
    let url = service_link(title, id)
    let posn = url.indexOf('proddetail')
    url = url.substring(posn)
    return url;
}
export const removeEnqStyletagspdp = () => {
    var p = document.getElementsByClassName("fr pdb12 pdt12 w45 clrw mr10 fs14 fw ripple bxsdw compBl bxrd20");
    for (var i = 0; i < p.length; i++) {
        p[i].style = "";
    }
    var q = document.getElementsByClassName("pdt12 pdb12 fs15 mt10 bxrd4 por bgff c2e pl35 pr25");
    for (var i = 0; i < q.length; i++) {
        q[i].style = "";
    }
}
export const getUrlVars = () => {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
export const getQueryStringValue = (key) => {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
export const removeEnqStyletags = () => {
    var p = document.getElementsByClassName("pdtb4 lh26 bdrm018 bgm018 clrw bxrdEnq w36 ml10 dib");
    for (var i = 0; i < p.length; i++) {
        p[i].style = "";
    }
}
export const resetCookies = (access) => {
    if (access == 4) {
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        window.location.reload();
    }
    else {
        deleteCookie('ImeshVisitor');
        deleteCookie('v4iilex');
        deleteCookie('im_iss');
        deleteCookie('userDet');
        window.location.href = "https://m.indiamart.com?src=reauth_pwa";
    }
}
export const isBot = () => {
    return (/googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent))
}

export const createFloatingLoader = () => {
    // Create a new element
    let newNode = document.createElement('div'); newNode.innerHTML = `<button style="display:none" id="fltldng" class=""></button>`;
    let newNode1 = document.createElement('div'); newNode1.innerHTML = `<button style="display:none;z-index:10000" id="fltldng1" class=""></button>`;

    // Get the reference node
    let referenceNode = document.querySelector('#gblLoader');

    // Insert the new node before the reference node
   // referenceNode.after(newNode);
   if(referenceNode&&referenceNode.parentNode){
       referenceNode.parentNode.insertBefore(newNode1,referenceNode.nextSibling);
       referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);
   }
}
export const createPdpLoader = () => {

    document.getElementById("root")
    ? (document.getElementById("root").style = "display:none")
    : "";
    document.getElementById('gblLoader') ? document.getElementById('gblLoader').style.display = "none":"";
    document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";   
    

    // let imPWAHeader = document.getElementById('imPWAHeader');
    // let pdpLcpDiv = document.getElementById('pdpLcpDiv');
    // let imLogo = document.getElementById('logoIMart');
    // let catchSearchBar = document.getElementById('searchBar');
    // let childSearchBar = catchSearchBar? catchSearchBar.getElementsByTagName('div')[0]:'';
    // let headerSearch = document.getElementById('headerSearch');
    // let childHeaderSearch = headerSearch? headerSearch.getElementsByTagName('div')[0]:'';
    // imPWAHeader?imPWAHeader.classList.add('ht53', 'newHeader'):'';
    // pdpLcpDiv? pdpLcpDiv.style.top='53px':'';
    // imLogo? imLogo.classList.add('smallImLogo'):'';
    // headerSearch? (headerSearch.style.padding='0 50px 0 80px',headerSearch.classList.remove('inp-head'), headerSearch.style.top='-44px'):'';
    // childSearchBar? childSearchBar.classList.add('tp9'):'';
    // childHeaderSearch? (childHeaderSearch.classList.add('por'), childHeaderSearch.classList.remove('poa')):'';

    function imgDiv(image, name) {
        return singleImgDiv(image, name)
    }
    
    function singleImgDiv(image, name) {
        let styleClass = "db mauto modal-content ht100"
        return (`
        <div class="bgw" id="lcpImage">
        <div>
            <div class="bgw oh tc ht330 dflex aic">
                <img id="pdpLcpImageId" class="${styleClass}" src=${image} alt="${name}">
            </div>
        </div>
        </div>`
        )
    }

    function conditionalPTag(value, styleVal) {
        if(value) return `<p class="${styleVal}">${value}</p>`
        return ``
    }

    function pdpCss() {
        return(`<style>
        *{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}.bgw{background-color:#fff}.oh{overflow:hidden}.tc{text-align:center}.ht330{height:330px}.dflex{display:flex}.aic{align-items:center}.db{display:block}.por{position:relative}.negativeMargin{margin:-30px 0 0 10px}.pd10{padding:10px}.poa{position:absolute}.boxEffect{border-radius:10px;box-shadow:0 3px 14px -7px #666;z-index:1;width:calc(100% - 10px)}.crx:after{content:"";visibility:hidden;display:block;height:0;clear:both}.t_tc{text-transform:capitalize}.fw{font-weight:700}.fs18{font-size:18px}.pdb5{padding-bottom:5px}.wr{word-wrap:break-word}.fs13{font-size:13px}.clr33{color:#333}.tl{text-align:left}.fs16{font-size:16px}.fw500{font-weight:500}.pdb10{padding-bottom:10px}.clr5a{color:#5a5a5b}.mt2{margin-top:2px}.w100{width:100%}.clrlft{clear:left}.mb10{margin-bottom:10px}.bxsdw{box-shadow:0 1px 2px rgb(0 0 0 / 20%)}.fs15{font-size:15px}.clrb{color:#333}.brdb{border-bottom:1px solid #cbcbcb}.prd-tble:nth-child(odd){background-color:#f6f6f7}.crb{clear:both}.columnDescPDP{float:left;width:50%;padding:5px 12px;word-wrap:break-word;word-break:break-word;overflow-wrap:break-word}.lh22{line-height:22px}.cl75{color:#757575}
        .mt10{margin-top:10px}.centralizeIt{display: flex;align-items: center;justify-content: center;width: 100%;overflow: hidden;}.modal-content{margin: auto;max-height: 330px;max-width: 100%;}.nenqM{left:0;top:0;z-index:9999;height:100%}.enqfrm{position:fixed;margin-bottom:5px}.pf{position:fixed}.z10000{z-index:10000!important}.ovfy{overflow-y:scroll}.ht100{height:100%}.enqMain{padding:52px 0 20%}.ht52{height:52px}.z9{z-index:9}.t0{top:0}.r0{right:0}.bxrd20{border-radius:20px}.pdlr8{padding:5px 12px}.mr10{margin-right:10px}.dib{display:inline-block}.ml5{margin-left:5px}.vam{vertical-align:middle}.pdt16{padding-top:16px}.pdb17{padding-bottom:17px}.btmBodr{border-bottom:1px solid rgba(204,204,204,.5)}.txtElip{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.fs20{font-size:20px}.pdl10{padding-left:10px}.mb20{margin-bottom:20px}.nspac{justify-content:center;display:flex;align-items:center;margin:0 15px}.prdImg{width:50px;height:50px;flex-shrink:0}.prdImg img{max-height:50px;max-width:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pl10{padding-left:10px}.lcldr1{border:4px solid #f3f3f3;border-radius:50%;border-top:4px solid #2e3192;width:40px;height:40px;-webkit-animation:spin1 1s linear infinite;animation:spin1 1s linear infinite}
        .handleNext1 {color: #fff;background: #d3d3d3;}.mrla {margin-left: auto;margin-right: auto;}.w70 {width: 70%;}.tuc {text-transform: uppercase;}.enqmim2 {background: #d3d3d3!important;}
        .mbg{background-color:rgba(51,51,51,.7);height:100%;left:0;top:0;width:100%;z-index:112!important;min-height:100vh;display:none;position:fixed}.mt15p{margin-top:15%}.w90{width:90%}.bxrd4{border-radius:4px}.z9999{z-index:9999}.malr{margin-left:auto;margin-right:auto}.lr0{left:0;right:0}.bge5{background-color:#e5f7f5}.pdt15{padding-top:15px}.tp-40{top:-40px}.prd_img{width:50px}.m5{margin:5px}.mr3{margin-right:3px}.trustSealSvg{background-image:url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI0YwQzkyQyIgZD0iTTAgMTFoMTR2MkgweiIvPjxjaXJjbGUgZmlsbD0iI0YwQzkyQyIgY3g9IjciIGN5PSI2IiByPSI2Ii8+PHBhdGggc3Ryb2tlPSIjRTUzRTNFIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00IDUuNzE0bDEuNzE0IDIuNTcyTDEwIDQiLz48L2c+PC9zdmc+)}.wh15{height:15px;width:15px}.mml14{margin-left:-14px}.callIcnSvg{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTMuNjQgNTEzLjY0IiBmaWxsPSIjMDI4ODdEIj48cGF0aCBkPSJNNDk5LjY2IDM3Ni45NmwtNzEuNjgtNzEuNjhjLTI1LjYtMjUuNi02OS4xMi0xNS4zNTktNzkuMzYgMTcuOTItNy42OCAyMy4wNDEtMzMuMjggMzUuODQxLTU2LjMyIDMwLjcyLTUxLjItMTIuOC0xMjAuMzItNzkuMzYtMTMzLjEyLTEzMy4xMi03LjY4LTIzLjA0MSA3LjY4LTQ4LjY0MSAzMC43Mi01Ni4zMiAzMy4yOC0xMC4yNCA0My41Mi01My43NiAxNy45Mi03OS4zNmwtNzEuNjgtNzEuNjhjLTIwLjQ4LTE3LjkyLTUxLjItMTcuOTItNjkuMTIgMEwxOC4zOCA2Mi4wOGMtNDguNjQgNTEuMiA1LjEyIDE4Ni44OCAxMjUuNDQgMzA3LjJzMjU2IDE3Ni42NDEgMzA3LjIgMTI1LjQ0bDQ4LjY0LTQ4LjY0YzE3LjkyMS0yMC40OCAxNy45MjEtNTEuMiAwLTY5LjEyeiIvPjwvc3ZnPg==)}.wh13{width:13px;height:13px}.bgNorepeat{background-position:50%;background-repeat:no-repeat}.bxgr{box-shadow: 0 1px 10px 0 rgb(0 0 0 / 30%);border-radius: 20px 20px 6px 6px;}.ht250{height:250px}.tp35{top:35%}
        .compCl{background-color:#15746d;background-image:linear-gradient(90deg,#00a699,#15746d)}.fs14{font-size:14px}.clrw{color:#fff!important}.w49{width:49%}.mr5{margin-right:5px}.callIconM{width:14px;height:14px;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTMuNjQgNTEzLjY0IiBmaWxsPSIjZmZmIj48cGF0aCBkPSJNNDk5LjY2IDM3Ni45NmwtNzEuNjgtNzEuNjhjLTI1LjYtMjUuNi02OS4xMi0xNS4zNTktNzkuMzYgMTcuOTItNy42OCAyMy4wNDEtMzMuMjggMzUuODQxLTU2LjMyIDMwLjcyLTUxLjItMTIuOC0xMjAuMzItNzkuMzYtMTMzLjEyLTEzMy4xMi03LjY4LTIzLjA0MSA3LjY4LTQ4LjY0MSAzMC43Mi01Ni4zMiAzMy4yOC0xMC4yNCA0My41Mi01My43NiAxNy45Mi03OS4zNmwtNzEuNjgtNzEuNjhjLTIwLjQ4LTE3LjkyLTUxLjItMTcuOTItNjkuMTIgMEwxOC4zOCA2Mi4wOGMtNDguNjQgNTEuMiA1LjEyIDE4Ni44OCAxMjUuNDQgMzA3LjJzMjU2IDE3Ni42NDEgMzA3LjIgMTI1LjQ0bDQ4LjY0LTQ4LjY0YzE3LjkyMS0yMC40OCAxNy45MjEtNTEuMiAwLTY5LjEyeiIvPjwvc3ZnPg==)}.bckArwZm,.bkgImgPstnRpt{background-position:50%;background-repeat:no-repeat}.compBl{background-color:#2f3394;background-image:linear-gradient(90deg,#5058bc,#2f3394)}.mr2{margin-right:2px}.enqIcn{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0My4zMyAzOCI+PHBhdGggZD0iTTQwLjY3IDI3LjEySDE2LjI1bC05IDguMTItLjktOC4xMkgzLjYyYTEuODEgMS44MSAwIDAxLTEuODEtMS44MVYyLjc1QTEuODEgMS44MSAwIDAxMy42Mi45NWgzNy4wNWExLjgxIDEuODEgMCAwMTEuODEgMS44MXYyMi41NmExLjgxIDEuODEgMCAwMS0xLjgxIDEuOHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzkuOCAwSDMuNTRBMy41NCAzLjU0IDAgMDAwIDMuNTN2MjEuMmEzLjU0IDMuNTQgMCAwMDMuNTMgMy41M2gyLjA4VjM3YTEgMSAwIDAwMS43Mi43MWw5LjQ0LTkuNDRoMjNhMy41NCAzLjU0IDAgMDAzLjUzLTMuNTNWMy41M0EzLjU0IDMuNTQgMCAwMDM5LjggMHptMS41MiAyNC43NGExLjUyIDEuNTIgMCAwMS0xLjUyIDEuNTJIMTYuMzRhMSAxIDAgMDAtLjY4LjI2bC04IDh2LTcuM2EuNzQuNzQgMCAwMDAtLjA5IDEgMSAwIDAwLTEtLjkxSDMuNTRhMS41MiAxLjUyIDAgMDEtMS41Mi0xLjUyVjMuNTNBMS41MiAxLjUyIDAgMDEzLjU0IDJIMzkuOGExLjUyIDEuNTIgMCAwMTEuNTIgMS41MnYyMS4yeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04Ljg2IDEyLjA4aDI1LjczYTEgMSAwIDEwMC0ySDguODZhMSAxIDAgMDAwIDJ6TTguODYgMTcuODVIMjUuMmExIDEgMCAwMDAtMkg4Ljg2YTEgMSAwIDAwMCAyeiIgZmlsbD0iIzJlMzE5MiIvPjwvc3ZnPg==);background-repeat:no-repeat;background-position:0 0;width:17px;height:12px}.pdb12{padding-bottom: 12px;}.pdt12 {padding-top: 12px;}@keyframes spin1{to{-webkit-transform:rotate(360deg);}}@-webkit-keyframes spin1{to{-webkit-transform: rotate(360deg);}}.pdt20{padding-top: 20px;}
        .enqBx{border-radius:6px;box-shadow:0 2px 4px 0 rgb(212 212 212 / 50%);border:solid .5px #e3e3e3;padding-bottom:20px;position:relative}.m7{margin:7px}.blanket{position:fixed;overflow:hidden;height:100%;width:100%}.ml10{margin-left:10px}.mt5{margin-top:5px}.txtLabel1{pointer-events:none;transform:translate3d(72px,15px,0) scale(1);transform-origin:left top;transition:100ms;font-size:16px;color:#a0a0a0;z-index:1;position:absolute}.cr{color:#c10000}.eCon{width:65px;border-right:1px solid #8e8e8e;padding:0 0 0;background-color:#f1f1f1;left:2px;font-weight:400;font-size:20px;position:absolute;top:2px;border-radius:4px 0 0 4px;line-height:44px}.cmcode{font-size:20px;width:64px;border-right:1px solid #8e8e8e;background-color:#f1f1f1}.ht48{height:48px}.br8e{border:1px solid #8e8e8e}.ml10{margin-left:10px}.pdt10{padding-top:10px}.dn{display:none}.glicon {background: url(https://m.imimg.com/gifs/img/gliconLogin.png) no-repeat;width: 16px;height: 16px;background-size: 100%;margin-bottom: -3px;}.enq_country_name{border-bottom: 1px solid #555;}
        .pd20{padding:20px}.txtdecor{border-bottom:1px solid}.clr0c{color:#0c2c83}.m3{margin:3px}.inputField{display:flex;line-height:43px;max-width:280px;height:43px;border-radius:5px;border:1px solid #8e8e8e}.mauto{margin:auto}.mobimg{border-right:1px solid #8e8e8e;height:42px;width:65px;background-color:rgba(226,222,222,.29);}.pdl7{padding-left:7px}.bg6d{background-color:#6d6d6d}.w70{width:70%}.clr7B{color:#7b7b7b}.mobileInput::placeholder{font-size: 14px;font-weight:normal;}.lFocused label {transform: translate(15px,-12px);font-size: 13px;color:#2e3192;background-color:#fff;}.txtLabel1 {pointer-events: none;transform: translate3d(72px,15px,0) scale(1);transform-origin: left top;transition: 100ms;font-size: 16px;color: #a0a0a0;z-index: 1;position: absolute;}
        .lFocused .txtLabel1 {font-size: 13px;color: #2e3192;background-color: #fff;padding: 1px 5px;transform: translate3d(72px, -8px, 0) scale(1);}.lFocused input{border-color:#2e3192;border-width:2px;padding-right:40px}
    .Menu_icon{background-position:0 2px;cursor:pointer;height:21px;left:15px;top:12px;width:23px;z-index:100}.poa{position:absolute}.inp-head::before{content:" ";height:15px;width:100%;top:4px;position:absolute;z-index:1;background-color:#00a699}.inp-bx{background:#ffff;height:35px;border-radius:18px;box-shadow:0 1px 5px 0 #a1a1a1;border:solid 1.2px #0aa69a;outline-width:thick;background-color:#fff;padding:0 10px;width:90%;z-index:2}.srchIcn{margin-top:8px;position:absolute;left:11px}.srchIp{font-size:15px!important;font-weight:400!important;width:85%;padding:9px 0 0 25px;background:0 0}.srchIcn::placeholder{color:#a0a0a0}.voiceIcon{top:0;right:0;height:36px;width:44px;text-align:center;line-height:48px}.tp46{top:46px}.tp0{top:0}.lft0{left:0}.ht35{height:35px}
    .fs12{font-size:12px;}.lh18{line-height:18px;}.mt5{margin-top:5px;}.mb5{margin-bottom:5px}.flexGrow1{flex-grow: 1;}.wh15 {
        height: 15px;
        width: 15px;
    }.trustSealSvg {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI0YwQzkyQyIgZD0iTTAgMTFoMTR2MkgweiIvPjxjaXJjbGUgZmlsbD0iI0YwQzkyQyIgY3g9IjciIGN5PSI2IiByPSI2Ii8+PHBhdGggc3Ryb2tlPSIjRTUzRTNFIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik00IDUuNzE0bDEuNzE0IDIuNTcyTDEwIDQiLz48L2c+PC9zdmc+);
    }
    .verifiedSvg{background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAuMDAwMDAwLCAtOTIxLjAwMDAwMCkiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNjE5LjAwMDAwMCkiPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS4wMDAwMDAsIDMwMy4wMDAwMDApIj4KPHJlY3QgZmlsbD0iIzBFN0MxOSIgeD0iMCIgeT0iMTIiIHdpZHRoPSIxMiIgaGVpZ2h0PSIyIj48L3JlY3Q+CjxjaXJjbGUgc3Ryb2tlPSIjMEU3QzE5IiBjeD0iNiIgY3k9IjYiIHI9IjYiPjwvY2lyY2xlPgo8cGF0aCBkPSJNMyw2LjIxMDUyNjMyIEw0LjQ4ODcyMTgsOC41MTEyNzgyIEM1LjI3OTA2NTAxLDcuMzQxOTg3NjIgNi4wMDM4NzcwNCw2LjQyNzcwMTkxIDYuNjYzMTU3ODksNS43Njg0MjEwNSBDNy4zMjI0Mzg3NSw1LjEwOTE0MDIgOC4xMDEzODYxMiw0LjUxOTY2NjUxIDksNCIgaWQ9IlBhdGgiIHN0cm9rZT0iIzBFN0MxOSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PC9wYXRoPgo8L2c+PC9nPjwvZz48L2c+PC9zdmc+');}
    .mt3{margin-top:3px;}
    .bdrC {
        border: 1px solid #ccc;
    }
    .hw50 {
        height: 50px;
        width: 50px;
    }
    .bxrd10 {
        border-radius: 10px;
    }
    .mxhw {
        max-width: 50px;
        max-height: 50px;
    }
    .imgCnt {
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .di{display:inline;}
    .mlm2 {
        margin-left: -2px;
    }
    .locationSvg{background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRTg1MzQ3IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJtNDA3LjU3OSA4Ny42NzdjLTMxLjA3My01My42MjQtODYuMjY1LTg2LjM4NS0xNDcuNjQtODcuNjM3LTIuNjItLjA1NC01LjI1Ny0uMDU0LTcuODc4IDAtNjEuMzc0IDEuMjUyLTExNi41NjYgMzQuMDEzLTE0Ny42NCA4Ny42MzctMzEuNzYyIDU0LjgxMi0zMi42MzEgMTIwLjY1Mi0yLjMyNSAxNzYuMTIzbDEyNi45NjMgMjMyLjM4N2MuMDU3LjEwMy4xMTQuMjA2LjE3My4zMDggNS41ODYgOS43MDkgMTUuNTkzIDE1LjUwNSAyNi43NyAxNS41MDUgMTEuMTc2IDAgMjEuMTgzLTUuNzk3IDI2Ljc2OC0xNS41MDUuMDU5LS4xMDIuMTE2LS4yMDUuMTczLS4zMDhsMTI2Ljk2My0yMzIuMzg3YzMwLjMwNC01NS40NzEgMjkuNDM1LTEyMS4zMTEtMi4zMjctMTc2LjEyM3ptLTE1MS41NzkgMTQ0LjMyM2MtMzkuNzAxIDAtNzItMzIuMjk5LTcyLTcyczMyLjI5OS03MiA3Mi03MiA3MiAzMi4yOTkgNzIgNzItMzIuMjk4IDcyLTcyIDcyeiIvPjwvZz48L3N2Zz4=');}
    .gstIcon{background-image : url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNSIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDEwIDkiPjxwYXRoIGZpbGw9IiMyOTgyMzUiIGQ9Ik05LjQyOSA0LjVMOC4zODEgMy4zMDVsLjE0Ni0xLjU4Mi0xLjU0NS0uMzUyTDYuMTcyIDAgNC43MTUuNjI2IDMuMjU3IDBsLS44MSAxLjM2N0wuOSAxLjcxNCAxLjA0NSAzLjMgMCA0LjVsMS4wNDUgMS4xOTZMLjkgNy4yODJsMS41NDcuMzUxTDMuMjU3IDlsMS40NTctLjYzIDEuNDU3LjYyNS44MS0xLjM2NiAxLjU0Ny0uMzUyLS4xNDctMS41OEw5LjQzIDQuNXpNMy44OTYgNi41MjNMMi4yNjggNC44OWwuNjMzLS42MzQuOTk1IDEuMDAxTDYuNCAyLjczOGwuNjM0LjYzNS0zLjEzOCAzLjE1eiI+PC9wYXRoPjwvc3ZnPg==")}
    .bdrmim{border:1px solid #00a699}
    .hw45{height:45px;width:45px}
    .rt0{right:0}
    .bgLightGreen{background-color: rgb(209, 237, 234);}
    .wifiCallIcon{background-position: center center;background-repeat: no-repeat; width: 20px; height: 20px;}
    .wifiCallIcon{background-image : url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTMuNjQgNTEzLjY0IiBmaWxsPSIjMDI4ODdEIj48cGF0aCBkPSJNNDk5LjY2IDM3Ni45NmwtNzEuNjgtNzEuNjhjLTI1LjYtMjUuNi02OS4xMi0xNS4zNTktNzkuMzYgMTcuOTItNy42OCAyMy4wNDEtMzMuMjggMzUuODQxLTU2LjMyIDMwLjcyLTUxLjItMTIuOC0xMjAuMzItNzkuMzYtMTMzLjEyLTEzMy4xMi03LjY4LTIzLjA0MSA3LjY4LTQ4LjY0MSAzMC43Mi01Ni4zMiAzMy4yOC0xMC4yNCA0My41Mi01My43NiAxNy45Mi03OS4zNmwtNzEuNjgtNzEuNjhjLTIwLjQ4LTE3LjkyLTUxLjItMTcuOTItNjkuMTIgMEwxOC4zOCA2Mi4wOGMtNDguNjQgNTEuMiA1LjEyIDE4Ni44OCAxMjUuNDQgMzA3LjJzMjU2IDE3Ni42NDEgMzA3LjIgMTI1LjQ0bDQ4LjY0LTQ4LjY0YzE3LjkyMS0yMC40OCAxNy45MjEtNTEuMiAwLTY5LjEyeiIvPjwvc3ZnPg==");}
    .pdt5 {
        padding-top: 5px;
    }.flexCenter{justify-content:center}
    .bglghtGry{background-color: #f6f6f7;}.alnItemsCenter{align-items: center;}
    .starSvg{background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDIuMDAwMDAwLCAtODcyLjAwMDAwMCkiIGZpbGw9IiNGREMwMDQiIGZpbGwtcnVsZT0ibm9uemVybyI+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0Mi4wMDAwMDAsIDg3Mi4wMDAwMDApIj4KPHBvbHlnb24gcG9pbnRzPSI4IDEyLjE4MDk4ODEgMTIuOTQ0IDE1LjE1MzQzOTIgMTEuNjM1OTg0MyA5LjU0NzQ3OTg1IDE2IDUuNzc3NDQ4MDYgMTAuMjQ3MjE1NyA1LjI4NTM0NDQzIDggMCA1Ljc1MjgxNTY5IDUuMjg1MzQ0NDMgMCA1Ljc3NzQ0ODA2IDQuMzY0MDE1NjkgOS41NDc0Nzk4NSAzLjA1NiAxNS4xNTM0MzkyIj48L3BvbHlnb24+CjwvZz48L2c+PC9nPjwvc3ZnPg==');}
    .mt7 {
        margin-top: 7px;
    }
    .callIconSvg{background-image: url('data:image/svg+xml;base64,DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTMuNjQgNTEzLjY0IiBmaWxsPSIjYWRhZGFkIj4NCjxwYXRoIGQ9Ik00OTkuNjYsMzc2Ljk2bC03MS42OC03MS42OGMtMjUuNi0yNS42LTY5LjEyLTE1LjM1OS03OS4zNiwxNy45MmMtNy42OCwyMy4wNDEtMzMuMjgsMzUuODQxLTU2LjMyLDMwLjcyDQpjLTUxLjItMTIuOC0xMjAuMzItNzkuMzYtMTMzLjEyLTEzMy4xMmMtNy42OC0yMy4wNDEsNy42OC00OC42NDEsMzAuNzItNTYuMzJjMzMuMjgtMTAuMjQsNDMuNTItNTMuNzYsMTcuOTItNzkuMzZsLTcxLjY4LTcxLjY4DQpjLTIwLjQ4LTE3LjkyLTUxLjItMTcuOTItNjkuMTIsMGwtNDguNjQsNDguNjRjLTQ4LjY0LDUxLjIsNS4xMiwxODYuODgsMTI1LjQ0LDMwNy4yYzEyMC4zMiwxMjAuMzIsMjU2LDE3Ni42NDEsMzA3LjIsMTI1LjQ0DQpsNDguNjQtNDguNjRDNTE3LjU4MSw0MjUuNiw1MTcuNTgxLDM5NC44OCw0OTkuNjYsMzc2Ljk2eiIvPg0KPC9zdmc+DQo=');}
    .pdp {
        padding: 0 50px 0 60px;
    }
    .maxHeightWidth{ height: 100%;}.clrBl {color: #2e3192;}.zoomScale2{transform:scale(2)}.zoomScale1-5{transform:scale(1.5)}
    #imPWAHeader.ht53{height:53px;}
    .searchBarr{padding:0 50px 0 80px}
    .searchBarr2{padding:0 80px 0 80px}
    .inp-head.tp9, .tp9{top:9px}
    .inp-head.tp9::before{background-color: transparent;}
    .IMlogo.smallImLogo,.smallImLogo{position:absolute;background-position:-28px 0;width:31px;background-size:280px;height:36px;left:48px;right:auto;top:8px;background-repeat:no-repeat;background-color:#00a699}
        </style>`)
    }

    function callEnqCTA(E_COM_PROD, E_COM_LANDING_URL, iSABtst){
        if(E_COM_PROD && E_COM_LANDING_URL) {
            return(`<style>.shopifyBtn{background-color:#15746d;background-image:linear-gradient(to right,#48a298,#36756f);box-shadow:0px 18px 9px -13px #aaa;}.shopifyBtn:active{background-color:#15746d;background-image:none; box-shadow:none}.lockIcon{background-position: center center; background-repeat: no-repeat; width: 16px; height: 16px; display: inline-block; margin-right:5px;vertical-align: bottom;}.lockIcon{background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTggMS42YTMuMiAzLjIgMCAwIDAtMy4yIDMuMnYuOEg0YS44LjggMCAwIDAtLjc5NS43MTJsLS44IDcuMmEuOC44IDAgMCAwIC43OTUuODg4aDkuNmEuOC44IDAgMCAwIC43OTUtLjg4OGwtLjgtNy4yQS44LjggMCAwIDAgMTIgNS42aC0uOHYtLjhBMy4yIDMuMiAwIDAgMCA4IDEuNnptMS42IDR2LS44YTEuNiAxLjYgMCAxIDAtMy4yIDB2LjhoMy4yek00LjggOGEuOC44IDAgMSAxIDEuNiAwIC44LjggMCAwIDEtMS42IDB6bTUuNi0uOGEuOC44IDAgMSAwIDAgMS42LjguOCAwIDAgMCAwLTEuNnoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg==');}
            .msg3rdParty{font-size: 10px; color: #7c7c7c;}</style>
            <div class="tc crx"><div><a href="${E_COM_LANDING_URL}" target="_blank"><button class="shopifyBtn tc bxrd20 fs14 clrw pdt10 pdb10 w100 fw"><i class="lockIcon"></i>Buy Now</button></a><p class="msg3rdParty tc pdt10">You will be redirected to a 3rd party webstore</p></div></div>
            <div style="display:none"><span id="pdpcallnow" class="fl tc compCl bxsdw bxrd20 fs14 tst clrw pdt12  pdb12 w49 fw"><i class="mr5 dib vam bkgImgPstnRpt callIconM"></i><span>कॉल करें</span></span><div><button id="pdpgbp" class="fr pdb12 pdt12 w49 clrw fs14 fw bxsdw compBl bxrd20 tc"><i class="enqIcn dib vam mr2"></i><span>सर्वोत्तम मूल्य प्राप्त करें</span></button></div><p class="clrBoth"></div>`)
        }
        else if(iSABtst){
            return(`<style>@-webkit-keyframes shimr{0%{background-position:-468px 0}to{background-position:468px 0}}.fr{float:right}.fl{float:left}.ctaBtn{background:#f6f7f8;width:49%;height:42px;border-radius:20px}.shine{background:#f1f3f4;background-image:linear-gradient(to right,#f1f3f4 0,#dcdddff5 20%,#f7f7f7 40%,#f6f7f8 100%);background-repeat:no-repeat;background-size:800px 104px;display:inline-block;position:relative;-webkit-animation-duration:1s;-webkit-animation-fill-mode:forwards;-webkit-animation-iteration-count:infinite;-webkit-animation-name:shimr;-webkit-animation-timing-function:linear}.db{display:block}.clrBoth{clear:both}.bdrmim{border:1px solid #00a699}.clrmim{color:#00a699}.bxrdNR{border-radius:20px 0 0 20px}.callIcnN{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik00LjQxMyA3LjE5M2ExMC4wNjUgMTAuMDY1IDAgMCAwIDQuMzk0IDQuMzk0bDEuNDY2LTEuNDY3YS42Ny42NyAwIDAgMSAuNjgtLjE2N2MuNzQ3LjI0NyAxLjU0Ny4zOCAyLjM4LjM4QS42NjcuNjY3IDAgMCAxIDE0IDExdjIuMzMzYS42NjYuNjY2IDAgMCAxLS42NjcuNjY3QTExLjMzMyAxMS4zMzMgMCAwIDEgMiAyLjY2Ny42NjcuNjY3IDAgMCAxIDIuNjY3IDJINWEuNjY3LjY2NyAwIDAgMSAuNjY3LjY2N2MwIC44MzMuMTMzIDEuNjMzLjM4IDIuMzhhLjY2OS42NjkgMCAwIDEtLjE2Ny42OEw0LjQxMyA3LjE5M3oiIGZpbGw9IiMxOUE1OTgiLz4KPC9zdmc+Cg==);background-repeat:no-repeat;background-position:0 0;width:16px;height:16px}.bgmim{background-color: #00a699;}.bxrdNL {border-radius: 0 20px 20px 0;}.enqIcnGreen{background-repeat: no-repeat;background-position: 0 0;width: 17px;height: 12px;}.enqIcnGreen {
      background-image: url("data:image/svg+xml;base64,DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQzLjMzIDM4Ij48cGF0aCBkPSJNNDMsMzMuMTJIMTguNThsLTksOC4xMi0uOS04LjEySDUuOTVhMS44MSwxLjgxLDAsMCwxLTEuODEtMS44MVY4Ljc1QTEuODEsMS44MSwwLDAsMSw1Ljk1LDYuOTVINDNhMS44MSwxLjgxLDAsMCwxLDEuODEsMS44MVYzMS4zMkExLjgxLDEuODEsMCwwLDEsNDMsMzMuMTJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi4zMyAtNikiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNNDIuMTMsNkg1Ljg3QTMuNTQsMy41NCwwLDAsMCwyLjMzLDkuNTN2MjEuMmEzLjU0LDMuNTQsMCwwLDAsMy41MywzLjUzSDcuOTRWNDNhMSwxLDAsMCwwLDEuNzIuNzFsOS40NC05LjQ0aDIzYTMuNTQsMy41NCwwLDAsMCwzLjUzLTMuNTNWOS41M0EzLjU0LDMuNTQsMCwwLDAsNDIuMTMsNlptMS41MiwyNC43NGExLjUyLDEuNTIsMCwwLDEtMS41MiwxLjUySDE4LjY3YTEsMSwwLDAsMC0uNjguMjZoMGwwLDAtOCw4di03LjNhLjc0Ljc0LDAsMCwwLDAtLjA5LDEsMSwwLDAsMC0xLS45MUg1Ljg3YTEuNTIsMS41MiwwLDAsMS0xLjUyLTEuNTJWOS41M0ExLjUyLDEuNTIsMCwwLDEsNS44Nyw4SDQyLjEzYTEuNTIsMS41MiwwLDAsMSwxLjUyLDEuNTJ2MjEuMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yLjMzIC02KSIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0xMS4xOSwxOC4wOEgzNi45MmExLDEsMCwxLDAsMC0ySDExLjE5YTEsMSwwLDAsMCwwLDJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi4zMyAtNikiIHN0eWxlPSJmaWxsOiMwMGE2OTkiLz48cGF0aCBkPSJNMTEuMTksMjMuODVIMjcuNTNhMSwxLDAsMCwwLDAtMkgxMS4xOWExLDEsMCwwLDAsMCwyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIuMzMgLTYpIiBzdHlsZT0iZmlsbDojMDBhNjk5Ii8+PC9zdmc+");
    }
            }</style>
            <div><span id="pdpcallnow" class="bdrmim clrmim bxrdNR fl tc fs14 tst pdt12 pdb12 w49 fw"><i class="mr5 dib vam bkgImgPstnRpt callIcnN"></i><span>कॉल करें</span></span><div><button id="pdpgbp" class="bdrmim bgmim bxrdNL  fr pdb12 pdt12 w49 clrw fs14 fw bxsdw tc"><i class="enqIcnGreen dib vam mr2"></i><span>सर्वोत्तम मूल्य प्राप्त करें</span></button></div><p class=clrBoth></div>`)
        }
        else{
            return(`<style>@-webkit-keyframes shimr{0%{background-position:-468px 0}to{background-position:468px 0}}.fr{float:right}.fl{float:left}.ctaBtn{background:#f6f7f8;width:49%;height:42px;border-radius:20px}.shine{background:#f1f3f4;background-image:linear-gradient(to right,#f1f3f4 0,#dcdddff5 20%,#f7f7f7 40%,#f6f7f8 100%);background-repeat:no-repeat;background-size:800px 104px;display:inline-block;position:relative;-webkit-animation-duration:1s;-webkit-animation-fill-mode:forwards;-webkit-animation-iteration-count:infinite;-webkit-animation-name:shimr;-webkit-animation-timing-function:linear}.db{display:block}.clrBoth{clear:both}</style>
        <div><span id="pdpcallnow" class="fl tc compCl bxsdw bxrd20 fs14 tst clrw pdt12  pdb12 w49 fw"><i class="mr5 dib vam bkgImgPstnRpt callIconM"></i><span>कॉल करें</span></span><div><button id="pdpgbp" class="fr pdb12 pdt12 w49 clrw fs14 fw bxsdw compBl bxrd20 tc"><i class="enqIcn dib vam mr2"></i><span>सर्वोत्तम मूल्य प्राप्त करें</span></button></div><p class=clrBoth></div>`)}  
    }
    
    let emptyArray = [];
    let emptyObject = [];
    let isqS = [];

    let loaderScreenData = {
        PC_CLNT_FLNAME : window.__TransitionData__.catFlname,
        CITY : window.__TransitionData__.city,
        MOBILE_PNS : window.__TransitionData__.companyContactNo,
        GLUSR_USR_FIRSTNAME : window.__TransitionData__.companyName,
        COMPANYNAME : window.__TransitionData__.companyName,
        URL : window.__TransitionData__.companySearchUrl,
        GLUSR_USR_CUSTTYPE_WEIGHT : window.__TransitionData__.custTypeWeight,
        PC_ITEM_DISPLAY_ID : window.__TransitionData__.displayId + "",
        GLUSR_USR_DISTRICT : window.__TransitionData__.district,
        PC_ITEM_NAME : window.__TransitionData__.extraPrdName,
        GLUSR_USR_ID : window.__TransitionData__.glid,
        PC_IMG_SMALL_600X600 : window.__TransitionData__.imgUrl,
        PC_IMG_SMALL_100X100 : window.__TransitionData__.imgUrl,
        LOCALITY : window.__TransitionData__.locality,
        BRD_MCAT_ID : window.__TransitionData__.productMcatId,
        PC_ITEM_DISPLAY_NAME : window.__TransitionData__.productName,
        PRODUCT_PRICE : priceofProduct,
        ETO_OFR_COMPANY_TSCODE : window.__TransitionData__.tsCode,
        ITEM_IMG : emptyArray ,
        ITEM_DOCS : emptyArray,
        PARENT_MCAT : emptyObject,
        ISQ : isqS,
        PC_ITEM_DESC_SMALL : window.__TransitionData__.small_desc,
        Statutory_Profile : emptyArray,
        Basic_Information : emptyArray,
        IS_PROD_SERV : window.__TransitionData__.prodType ? window.__TransitionData__.prodType : '',
        LANDING_FROM_SPA : 'LOADER',
        PC_ITEM_IS_ECOM : window.__TransitionData__.ecom_landing_url && window.__TransitionData__.ecom_store_name == "SHOPIFY" ? 1 : 0 ,
        ECOM_ITEM_LANDING_URL : window.__TransitionData__.ecom_landing_url ? window.__TransitionData__.ecom_landing_url : '', 
        ECOM_STORE_ENABLE_FLAG :  window.__TransitionData__.ecom_landing_url && window.__TransitionData__.ecom_store_name == "SHOPIFY" ? 1 : 0 
    }

    let priceofProduct =  window.__TransitionData__.standardPrice?window.__TransitionData__.standardPrice.split('/'):'';
    priceofProduct = (priceofProduct[0] ? '₹ ' + priceofProduct[0] : '') + (priceofProduct[1]? ' / ' + priceofProduct[1]:'') 
    // Create a new element
    let newNode = document.createElement('div'); 
    newNode.innerHTML = `
    ${pdpCss()}
    <div id="pdpLoaderDiv" style="position:absolute;top:63px;overflow:hidden;background:#efefef;width:100%">
    <div id="loaderDiv"><div id="blackCallBg" style="background: rgba(51,51,51,0.7);width: 100%;height: 100%;z-index: 112;position: fixed;top:0;bottom:0;display:none;"><div style="position: relative;top: 40%;left: 40%;" class="lcldr1"></div></div><div id="enqLoader" style="background: white;width: 100%;height: 100%;z-index: 112;position: fixed;top: 0;display:none;"><div style="position: relative;top: 10%;left: 45%;" class="lcldr1"></div></div></div>
    ${imgDiv(loaderScreenData.PC_IMG_SMALL_600X600, loaderScreenData.PC_ITEM_DISPLAY_NAME)}
    <section id="lcpPrdName" class="por negativeMargin">
        <div class="db pd10 bgw boxEffect">
            <section class="bgw db crx t_tc">
                <h1 class="fw fs18 pdb5 wr">${loaderScreenData.PC_ITEM_DISPLAY_NAME}</h1>
            </section> 
            ${conditionalPTag(priceofProduct, "clr33 tl fs16 pdb5 fw")} 
            ${conditionalPTag("by: "+loaderScreenData.COMPANYNAME, "fs13 pdb10 clr5a mt2 fw500")}
            ${callEnqCTA('','',true)}
        </div> 
    </section>
    
    </div>
    <div id="pdpSpinner" style="display:block; margin:auto; position:sticky;bottom:0px;" class="mSpinnerP"><div class="mSpinner"><div></div><div></div></div></div>
    </div>
    <div>
    <div id="pdpcalldiv" style="display:none">
    <div><div class="mbg" style="display: block; z-index: 1007 !important;"></div><div class="mt15p w90 bxrd4 pf z9999 malr tc lr0 bge5 pdt15 tp-40"><div id="callNowDiv"><div class="callImgBox"><img class="prd_img callPrdImg" src=${loaderScreenData.PC_IMG_SMALL_100X100} alt=${loaderScreenData.COMPANYNAME} /></div><h2 class="db m5 fs16 callPrdCompName"></h2><div class="por fs15 dib mb10 callPrdNumber"><span class="callIcnSvg wh13 bgNorepeat poa mml14 mt2"></span></div></div><div>
    <div class="mauto bgw pdb10 bxgr"><div class="pd20"><span class="db m5 fs16 fw">Enter your Mobile Number to call this Seller</span><div class="mt10"><i class="dib glicon mr5"></i>Your Country is <dl class="por dib"><dt><a><span class="m3 txtdecor clr0c">India</span><div class="droparrow dib "></div></a></dt></dl></div></div><div class="inputField mauto"><dl class="por mobimg fs20 fw">+91</dl><input id="mobNo1" class="w100 mauto pdl7 bxrd4 fw fs20 mobileInput" placeholder="Enter 10 digit Mobile Number" maxlength="10" type="tel" autocomplete="tel"/></div><div class="tc mb10"></div><div id="CallNowLoginErr" class="tc mb10"></div><input type="button" value="Submit" id="submitBtnLCP" disabled class="tc db clrw fs18 fw pd10 pdl15 bxrd20 bxsdw w70 mt20 mauto mb20 bg6d" /><span id="closeBtn" class="fs13 pdb5 clr7B mt10">Close and Continue Browsing</span></div></div></div></div>
    </div>
    </div>
    <div id="pdpenquirydiv" style="display:none">
    <div class="ovfy ht100 enQMain"><div><div><div class="bgw pf w100 enqfrm nenqM z10000"style="overflow-y:scroll;overflow:hidden;height:108%"><div class="ht100 enQMain ovfy"><div><div class="bgw pf w100 crx ht52 t0 z9"><span disabled class="fs16 bxrd20 handleNext1 mr10 mt10 pdlr8 poa r0">Continue<i class="dib ml5 vam"> <svg height="13" viewBox="0 0 7 13"width="7" xmlns="http://www.w3.org/2000/svg"><path d="M6.748 7.144l-5.28 5.59a.826.826 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.827.827 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643a.936.936 0 0 1-.252.644z"fill="#FFF" fillRule="nonzero"/></svg></i></span><p class="ht52 btmBodr fs15 fw pdb17 pdt16 tl" /><span class="tl db fs20 pdl10 txtElip">सर्वोत्तम मूल्य प्राप्त करें</span></div><div class="ht100 enqMain"><div class="bgw pdt20 mb20"><div class="nspac"><div class="por prdImg"><img alt=""src="${loaderScreenData.PC_IMG_SMALL_600X600}" /></div><div class="fs16 pl10">${loaderScreenData.PC_ITEM_DISPLAY_NAME}</div></div></div><div class="enqBx m7"> <div> <div class="blanket dn" id="blanket"></div><div id="num_div"> <div class="pd10 mt10 tc"> <div id="dropdown" class="c_country_dropdown_mobile"> <div class="db w100 por"> <i class="dib glicon mr5"></i>Your Country is <div class="dib ml5 pr20 z9 bdrb33" id="loginFlagbl" > <span class="enq_country_name"> India </span> <span class="arrow_login"></span> </div></div></div></div><div id="label-code" class="por ml10 mr10 mt5"><label for="username" class="txtLabel1" id="txtMob" style="">Mobile Number<span class="cr">*</span></label><div id="input_code" class="poa t1l2"> <dl class="tc cmcode eCon" id="cm_code" > +91 </dl> </div><input id="username1" name="username" type="tel" class="ht48 w100 bxrd4 br8e fs18 " autocomplete="tel" maxlength="10" autoFocus style="padding-left: 72px;" /> </div><i class=" mr10 ml10 pdt10 db" id="no_text"> Seller details will be sent to this number </i><div id="err" class=" mt10"></div></div></div>
    <div class="enqmim2 clrw fs18 tc fw tuc pdt12 pdb12 mt10  handleNext1 mrla w70 " id="identify" style="border-radius: 25px;">Continue<i class="dib ml5 vam" img="NextIcnDwn"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13"> <path fill="#FFF" fill-rule="nonzero" d="M6.748 7.144l-5.28 5.59a.826.826 0 0 1-1.216 0 .949.949 0 0 1 0-1.288L4.924 6.5.252 1.554a.949.949 0 0 1 0-1.287.827.827 0 0 1 1.216 0l5.28 5.59c.168.177.252.41.252.643a.936.936 0 0 1-.252.644z"></path> </svg></i></div>
    </div><div></div></div></div></div></div></div></div></div>
    </div>`;

    // Get the reference node
    let referenceNode = document.querySelector('#gblLoader');

    // Insert the new node before the reference node
   // referenceNode.after(newNode);
   referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);

}

export function loadTimeTracking(fromPage){
    let today = new Date();
    sessionStorage.setItem('OnClickPage', today.getSeconds() + '.' + today.getMilliseconds());
    sessionStorage.setItem('FromPage', fromPage);
}

export function loadTimeTrackingTo(toPage){
      let today = new Date();
      sessionStorage.setItem('OnPageRender', today.getSeconds() + '.' + today.getMilliseconds());
      sessionStorage.setItem('ToPage', toPage);
      let timingDiff = parseFloat(parseFloat(sessionStorage.getItem('OnPageRender')) - parseFloat(sessionStorage.getItem('OnClickPage')));
      let FromPage = sessionStorage.getItem('FromPage');
      let TooPage =  sessionStorage.getItem('ToPage');
      let trackingToBeSent = timingDiff>0 && FromPage && TooPage;
      let isTransition = window.companyTransition ? "TransitionScreen" : "";
        if(trackingToBeSent)
        { 

        import(/* webpackChunkName:"Yandex"*/"../Globals/yandexTracking").then(module=>{
            module.yandexTrackingMultiLevel(FromPage,TooPage,timingDiff.toFixed(2),isTransition);
        })
        
        }      
      
        sessionStorage.removeItem('OnClickPage');
        sessionStorage.removeItem('FromPage');
        sessionStorage.removeItem('OnPageRender');
        sessionStorage.removeItem('ToPage');
}