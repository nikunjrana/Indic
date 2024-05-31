let webPSupport = JSON.parse(localStorage.getItem("webPSupport"));
if(!webPSupport)
{  webPSupport={}
}
function getCookie(name) {
   var value = "; " + document.cookie;
   var parts = value.split("; " + name + "=");
   if (parts.length == 2) return parts.pop().split(";").shift();
}

let images = {
    bgimg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/bgIM50.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    mesagMobIcn : {
        backgroundSize: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '130px',
        height: '140px',
        backgroundImage: 'url("https://m.imimg.com/gifs/S2@2x.png")'
    },
    navSpri : {
        backgroundImage: 'url("https://m.imimg.com/gifs/nav_sprite_v2.png")',
        backgroundRepeat: 'no-repeat'
    },
    topIBg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/top-brands-new-1.webp")',
        backgroundRepeat: 'no-repeat'
    },
    mim_bg : { 
        backgroundImage: 'url("https://m.imimg.com/gifs/img/msite_sprite_v021.png")',
        backgroundRepeat: 'no-repeat'
    },
    spM : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/pwa-MS2.png")',
        backgroundRepeat: 'no-repeat'
    },
    bgMsc : {
        backgroundImage: 'url("https://m.imimg.com/gifs/PWA-msgCn2.png")',
        backgroundRepeat: 'no-repeat'
    },
    selrSprit : {
        backgroundImage:'url("https://m.imimg.com/gifs/sellerSprit.png")'
        // width: '17px',
        // backgroundPosition: '-51px -12px',
        // height: '17px'
    },
    emptStateMsg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/emptystate.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '170px',
        marginTop: '80px'
    },
    attachImgType : {
        backgroundImage: 'url("https://m.imimg.com/gifs/chat_img_new.png")',
        margin: '0 auto',
        height: '44px',
        width: '44px'
    },
    prodIcon : { 
        backgroundImage: 'url("https://m.imimg.com/gifs/supermarket-2.png")',
        backgroundRepeat: 'no-repeat'
    },
    soiBanIc : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/soiblbanner.png")'
    },
    emailwidpopup : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/emailicon.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    hSlrIcon : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/hSlrIcons.png")',
        backgroundRepeat: 'no-repeat'
    },
    chatBubble : {
        backgroundImage:'url("https://m.imimg.com/gifs/img/chatIcon.png")'
    },
    tinsImgBLSpri : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/BlTopIndusSpri125.png")',
        backgroundRepeat: 'no-repeat'
    },
    tinsImgBLSpriCovid : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/newCovidBlTopIndusSpri125.webp")',
        backgroundRepeat: 'no-repeat'
    },
    googleicon : {
        background: 'url("https://m.imimg.com/gifs/img/gicon.png") #fff',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '42px',
        height: '42px',
        backgroundSize: '26px',
        margin: '2px 0 0 3px'
    },
    googleiconSmall : {
        background: 'url("https://m.imimg.com/gifs/img/gicon.webp") #fff',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '20px',
        height: '20px',
        backgroundSize: '20px',
        margin: '0'
    },
    icoHf : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/HFsprite_v010.png")',
        backgroundRepeat: 'no-repeat'
    }      
}
let imagesWebP = {
    // tinsImg : {
    //     backgroundImage: 'url("https://m.imimg.com/gifs/img/topIndusSpri125.webp")',
    //     backgroundRepeat: 'no-repeat'
    // },
    // tinsImg2 : {
    //     backgroundImage: 'url("https://m.imimg.com/gifs/img/newTopIndusSpri125.webp")',
    //     backgroundRepeat: 'no-repeat'
    // },
    bgimg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/bgIM50.webp")', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    mesagMobIcn : {
        backgroundSize: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '130px',
        height: '140px',
        backgroundImage: 'url("https://m.imimg.com/gifs/S2@2x.webp")' 
    },
    navSpri : {
        backgroundImage: 'url("https://m.imimg.com/gifs/nav_sprite_v2.webp")',
        backgroundRepeat: 'no-repeat'
    },
    topIBg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/top-brands-new-1.webp")',
        backgroundRepeat: 'no-repeat'
    },
    mim_bg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/msite_sprite_v021.png")',
        backgroundRepeat: 'no-repeat'
    },
    spM : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/pwa-MS2.png")', 
        backgroundRepeat: 'no-repeat'
    },
    bgMsc : {
        backgroundImage: 'url("https://m.imimg.com/gifs/PWA-msgCn2.webp")', 
        backgroundRepeat: 'no-repeat'
    },
    selrSprit : {
        backgroundImage:'url("https://m.imimg.com/gifs/sellerSpritNewSoi.webp")'
        // width: '17px',
        // backgroundPosition: '-51px -12px',
        // height: '17px'
    },
    emptStateMsg : {
        backgroundImage: 'url("https://m.imimg.com/gifs/emptystate.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '170px',
        marginTop: '80px'
    },
    attachImgType : {
        backgroundImage: 'url("https://m.imimg.com/gifs/chat_img_new.webp")',
        margin: '0 auto',
        height: '44px',
        width: '44px'
    },
    prodIcon : { 
        backgroundImage: 'url("https://m.imimg.com/gifs/supermarket-2.webp")',
        backgroundRepeat: 'no-repeat'
    },
    soiBanIc : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/soiblbanner.webp")'
    },
    emailwidpopup : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/emailicon.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    hSlrIcon : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/hSlrIcons.webp")',
        backgroundRepeat: 'no-repeat'
    },
    chatBubble : {
        backgroundImage:'url("https://m.imimg.com/gifs/img/chatIcon.png")'
    },
    tinsImgBLSpri : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/BlTopIndusSpri125.webp")',
        backgroundRepeat: 'no-repeat'
    },
    tinsImgBLSpriCovid : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/newCovidBlTopIndusSpri125.webp")',
        backgroundRepeat: 'no-repeat'
    },
    googleicon : {
        background: 'url("https://m.imimg.com/gifs/img/gicon.webp") #fff',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '42px',
        height: '42px',
        backgroundSize: '26px',
        margin: '2px 0 0 3px'
    },
    googleiconSmall : {
        background: 'url("https://m.imimg.com/gifs/img/gicon.webp") #fff',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '20px',
        height: '20px',
        backgroundSize: '20px',
        margin: '0'
    },
    icoHf : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/HFsprite_v010.webp")',
        backgroundRepeat: 'no-repeat'
    },
    backIcon : {
        backgroundImage: 'url("https://m.imimg.com/gifs/img/m-cat-img.png")',
    }
       
    
}

 //page perf

let styles={
    imageCss(){
        let cssDec = (webPSupport['val'] == true) ? imagesWebP : images;
        return cssDec;
    }
}



export default styles;


  