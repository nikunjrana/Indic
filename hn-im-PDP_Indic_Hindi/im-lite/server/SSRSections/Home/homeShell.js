var GblComFunc = require('../../GblComFunc'),
  chunkVersion = require('../../version.json'),
  appShell = GblComFunc.APP_SHELL_STRUCTURE();


function preloadedChunks() {
  return (` 
     <link rel="preload" href="${'https://hindi.indiamart.com' + '/pwagifs/Home.pwa' + chunkVersion["jsChunks"] + '.js'}" as="script" >
     <link rel="preload" href="${'https://hindi.indiamart.com' + '/pwagifs/main-min_' + chunkVersion["main_min"] + '.js'}" as="script" >
     <link rel="preload" href="https://3.imimg.com/data3/TS/JV/GLADMIN-11193/cotton-textile-125x125.jpg" as="image">
     <link rel="preload" href="https://3.imimg.com/data3/RX/IB/GLADMIN-84567/cotton-linen-fabric-125x125.jpg" as="image">
     <link rel="preload" href="https://3.imimg.com/data3/TM/AS/GLADMIN-2298/printed-fabrics-125x125.jpg" as="image">
     `);
}

function homeShellStruct(req) {
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
  appShell.TITLE = '<title>IndiaMART - भारतीय मैन्युफैक्चरर, सप्लॉयर्स, एक्सपोर्टर डायरेक्टरी, भारत एक्सपोर्टर मैन्युफैक्चरर</title>';
  appShell.SEARCHBAR = 'DEFAULT';
  appShell.META = '<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0" name="viewport"/><meta content="en" name="language"><meta content="IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer" property="og:title"/><meta content="website" property="og:type"/><meta content="https://hindi.indiamart.com" property="og:url"/><meta content="IndiaMART" property="og:site_name"/><meta content="https://m.imimg.com/gifs/iml300.png" property="og:image"/><meta content="https://m.imimg.com/gifs/iml300.png" property="og:image:url"/><meta content="300" property="og:image:width"/><meta content="300" property="og:image:height"/><meta content="IndiaMART.com is India\'s largest online marketplace that assists manufacturers, suppliers exporters to trade with each other at a common, reliable &amp; transparent platform. Largest free online business directory &amp; yellow page with listing of 1,945,000 Indian &amp; International companies. Find here quality products, trade leads, manufacturers, suppliers, exporters &amp; international buyers." property="og:description"/><meta content="IndiaMART.com भारत का सबसे बड़ा ऑनलाइन मार्केटप्लेस है जो सप्लॉयर्स, एक्सपोर्टर, मैन्युफैक्चरर को एक सामान्य, विश्वसनीय और पारदर्शी मंच पर एक दूसरे के साथ व्यापार करने में सहायता करता है। 1,945,000 भारतीय और अंतर्राष्ट्रीय कंपनियों की सूची के साथ सबसे बड़ी मुफ्त ऑनलाइन व्यापार डायरेक्टरी और यलो पेज। यहां गुणवत्तापूर्ण उत्पाद, व्यापार नेतृत्व, मैन्युफैक्चरर, सप्लॉयर्स, एक्सपोर्टर और अंतरराष्ट्रीय खरीदार खोजें।" name="description"/><meta content="Business directory, business directory in india, business e-commerce, business listings, business website, business marketplace, companies business listings, companies database india, companies directory, companies directory india, directory of companies, directory of indian companies, e-commerce in india, electronic trade &amp; commerce, electronic trade and commerce, exporter importer directory, exporters business directory, exporters in india, free business listings, free business listings in india, free business marketplace, free indian companies business listings, free manufacturers directory india, importers, india business directory, india export import, india importers, indiamart, indian business, Indian companies directory, indian exporters, indian exporters directory, indian manufacturers directory, indian market, indian service providers, manufacturers directory, manufacturers in india, online business directory, online marketplace,suppliers directory, yellow pages" name="keywords"/>';
  appShell.CANONICAL_LINKS = '<link href="https://hindi.indiamart.com/" rel="canonical"/><link href="https://hindi.indiamart.com/" media="only screen and (max-width:640px)" rel="alternate"/><link href="android-app://com.indiamart.m/https/hindi.indiamart.com/" rel="alternate"/><link href="https://m.imimg.com/gifs/im2-192.png" rel="icon" sizes="192x192"/><link href="https://m.imimg.com/apple-touch-icon.png" rel="apple-touch-icon"/><link href="https://m.imimg.com/apple-touch-icon-precomposed.png" rel="apple-touch-icon-precomposed"/>';
  appShell.LOADER = 'DEFAULT';
  appShell.HEAD_SCRIPTS = `${preloadedChunks()}<script type="application/ld+json">` + JSON.stringify(crumbsObj) + `</script>`;

  appShell.STATE = '';
  appShell.PRE_CONNECTS = '';
  appShell.IS_PDP_LCP = true;
  appShell.displayLcpDiv = homelcpcontent();
}
function homelcpcontent() {
  return (`
   <style> 
   .hnb125,.hnoh{overflow:hidden}*{margin:0;padding:0;box-sizing:border-box;outline:0;border:none}.hnpdt10{padding-top:10px}.hnwrapper{background-color:#fff}.hnpdl16{padding-left:16px}.hnpdr16{padding-right:16px}.hnmb10{margin-bottom:10px}.hnpor{position:relative}.hnpdt20{padding-top:20px}.hnpdb20{padding-bottom:20px}.hnbobr{border-top:1px solid #afc4dd}.hnfs17{font-size:17px}.hndb{display:block}.hnc1{color:#000}.hnlh24{line-height:24px}.hnbxrd20{border-radius:20px}.hnbgbrd li{background:#eef9f8;border-top:1px solid rgb(203 223 221)}.hnbgbrd{border:.5px solid rgb(203 223 221)}.hnfs16{font-size:16px}.hnspclr div{color:#2c2d4b;padding:16px 80px 16px 24px}.hnbdert{border-top:.5px solid rgb(203 223 221)}.hnb125{width:125px;height:125px;margin-right:20px}.hnma{margin:auto}.hnwdpt100{width:100%}.hncovidMcat{border-bottom:1px solid #eaeaed;color:#56576f;white-space:normal;padding:16px 15px 16px 0}.hnpr5{padding-right:5px}.hnclr92{color:#2e3192}.hncovidMcat,.hnmr10{margin-right:10px}.flx,.hfotr ul{display:flex}.hnb125,.hnpdr125{padding-right:125px}
   @media only screen and (min-width:980px){body{max-width:100%}.hnscWrap ul{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:15px;list-style:none;border:none;padding-bottom:20px}.hnscWrap li{padding-bottom:20px;background-color:#fff;border:1px solid rgb(203 223 221)!important}.hnscWrap .hnspclr{background-color:#eef9f8;border-radius:20px 20px 0 0}.footerdesk{display:flex;align-items:center;justify-content:center}
   #footerIM{margin-bottom:10px;padding:0}}
   </style>
<div id="HomeLcpHindi">
   ${homePageContent()}
   </div>
<script> window.isHomeLcp = true;</script>`
  )
}

function homePageContent() {
  return (` <div class="hnpdt10 hnwrapper">
  <span id="set9">
    <div class="hnpdl16 hnpdr16 hnpdt10 hnmb10">
      <div class="hnpor hnpdt20 hnpdb20 hnbobr">
        <h2 class="hnfs17 hndb hnc1 hnpdr125 hnlh24">कपड़े और गारमेंट</h2>
      </div>
      <div class="hnscWrap hnbxrd20">
        <ul class="hnbxrd20 hnoh hnbgbrd" id="topul9">
        <li class=" hnbxrd20 hnpor">
          <div class="hnpor hnfs16 hnspclr">
            <div alt="ladies-kurtis" class="hndb">सूती कपड़े</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="cotton textile"src="https://3.imimg.com/data3/TS/JV/GLADMIN-11193/cotton-textile-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-लिनन-कपड़ा.html">सूती लिनन कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-लाइक्रा-कपड़ा.html">सूती लाइक्रा कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/चंदेरी-कपड़ा.html">चंदेरी कपड़ा</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">कॉटन टेक्सटाइल</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="cotton linen fabric" src="https://3.imimg.com/data3/RX/IB/GLADMIN-84567/cotton-linen-fabric-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-ट्विल-कपड़ा.html">सूती ट्विल कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-यार्न-रंगे-कपड़े.html">सूती यार्न रंगे कपड़े</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-लिनन-कपड़ा.html">सूती लिनन कपड़ा</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">प्रिंटेड फ़ैब्रिक</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/TM/AS/GLADMIN-2298/printed-fabrics-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/अजरख-प्रिंटेड-कपड़ा.html">अजरख प्रिंटेड कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/डिज़ाइनर-कपड़ा.html">डिज़ाइनर कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/प्रिंटेड-शिफॉन-कपड़ा.html">प्रिंटेड शिफॉन कपड़ा</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">पुरषों के ट्राउजर</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/YI/MY/GLADMIN-295/mens-trousers-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/पुरषों-के-फॉर्मल-ट्रॉउज़र.html">पुरषों के फॉर्मल ट्रॉउज़र </a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/पुरुषों-की-चमड़े-की-पैंट.html">पुरुषों की चमड़े की पैंट</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/पुरुषों-के-कैजुअल-ट्रॉउज़र.html">पुरुषों के कैजुअल ट्रॉउज़र </a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">लेडीज सूट और ड्रेस मैटेरियल</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/IG/JF/GLADMIN-10602/ladies-dress-material-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सूती-ड्रेस-का-मैटेरियल.html">सूती ड्रेस का मैटेरियल</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/महिलाओं-के-सूट-और-ड्रेस-मटेरियल.html">महिलाओं के सूट और ड्रेस मटेरियल</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/ड्रेस-मटीरियल.html">ड्रेस मटीरियल</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">लड़कों के कपड़े</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/LK/UH/GLADMIN-23552/boys-clothes-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/लड़कों-की-टी-शर्ट.html">लड़कों की टी शर्ट</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/लड़कों-की-फ़ैशन-जीन्स.html">लड़कों की फ़ैशन जीन्स</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/लड़कों-के-ट्रॉउज़र.html">लड़कों के ट्रॉउज़र </a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">ब्लेजर</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/CS/SE/MY-2/blazers-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/पुरुषों-के-ब्लेज़र.html">पुरुषों के ब्लेज़र</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/महिलाओं-के-लिए-ब्लेज़र.html">महिलाओं के लिए ब्लेज़र</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/मखमली-ब्लेज़र.html">मखमली ब्लेज़र</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">सिल्क टेक्सटाइल</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/BJ/YS/GLADMIN-9397/silk-textile-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सिल्क-के-कपड़े.html">सिल्क के कपड़े</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सिल्क-साटन-का-कपड़ा.html">सिल्क साटन का कपड़ा</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/चंदेरी-सिल्क-का-कपड़ा.html">चंदेरी सिल्क का कपड़ा</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">इंडस्ट्रियल कपडे</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/EH/OU/GLADMIN-43464/industrial-clothing-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/इंडस्ट्रियल-यूनिफॉर्म.html">इंडस्ट्रियल यूनिफॉर्म</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/रिफ्लेक्टिव-टी-शर्ट.html">रिफ्लेक्टिव टी शर्ट</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/सुरक्षा-टी-शर्ट.html">सुरक्षा टी-शर्ट</a>
            </div>
          </div>
        </li>
        <li class=" hnbxrd20 hnpor listopen">
          <div class="hnpor hnfs16 hnspclr">
            <div class="hndb">सेफ्टी हेलमेट</div>
          </div>
          <div class="flx bgw hnbdert">
            <div class="hnb125 hnmr10 hnma ">
              <img height="125" width="125" alt="printed fabrics" src="https://3.imimg.com/data3/SY/YL/GLADMIN-8361/safety-helmets-125x125.jpg" />
            </div>
            <div class="hnwdpt100">
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/PVC-हेलमेट.html">PVC हेलमेट</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/माइनिंग-हेलमेट.html">माइनिंग हेलमेट</a>
              <a class="hncovidMcat hnpor hnpr5 hnclr92 hndb " href="/impcat/फ्यूजन-सुरक्षा-हेलमेट.html">फ्यूजन सुरक्षा हेलमेट</a>
            </div>
          </div>
        </li>
      </ul>
      </div>
    </div>
  </span>
`)
}
function getHomePage(req, res, shellCallBck) {
  homeShellStruct(req);
  shellCallBck(res, appShell);
}
module.exports = getHomePage;