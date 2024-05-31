export function getscript(){
  window.addEventListener("touchstart", loadscript,{passive:true})
  window.addEventListener("scroll", loadscript,{passive:true})
  window.addEventListener("click", loadscript,{passive:true})
}
function updateTransator(){
  let googleLogo = document.getElementsByClassName('VIpgJd-ZVi9od-l4eHX-hSRGPd');
  googleLogo && googleLogo[0] ? googleLogo[0].style.display = 'none':'';
  let googleProcessLogo = document.getElementsByClassName('VIpgJd-ZVi9od-aZ2wEe-wOHMyf');
  googleProcessLogo && googleProcessLogo[0] ? googleProcessLogo[0].style.display = 'none':'';
  let googleText = document.getElementsByClassName('goog-te-gadget');
  googleText && googleText[0] ? googleText[0].style = 'color:rgb(10, 166, 153);':'';
  
}
export function loadscript(){
  const script = document.createElement('script');
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.type = "text/javascript";
  document.head.appendChild(script);
  window.googleTranslateElementInit  = googleTranslateElementInit;
  window.removeEventListener("touchstart", loadscript)
  window.removeEventListener("scroll", loadscript)
  window.removeEventListener("click", loadscript)
}
function googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL , includedLanguages : 'hi,mr,bn,gu,kn,te,en'},  'google_translate_element');
  updateTransator();
}
