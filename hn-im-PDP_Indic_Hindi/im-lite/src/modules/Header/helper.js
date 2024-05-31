import { imStore } from '../../store/imStore';
//  import { goToRoute } from '../../Globals/routingFunction';
window.login_success = new CustomEvent("loginCompleted");
import { eventTracking } from '../../Globals/GaTracking';
document.addEventListener("loginCompleted", onLoginComplete);

function capitalize (s)  {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
function onLoginComplete() {
    imStore.dispatch({ type: 'UPDATE_AUTHENTCATED', payload: { isidentified: true } });
    document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
}

let imLogo = document.getElementById('logoIMart');
if (imLogo) {
    let SSR = localStorage.multi_purpose  && JSON.parse(localStorage.getItem("multi_purpose"));
    imLogo.addEventListener('click', (event) => {
        let pageName = document.getElementById('page_name') ? document.getElementById('page_name').value : "";
        pageName = pageName ? capitalize(pageName) : "";
        let pageTrack = pageName.toLowerCase().includes('search') ? 'Search_' : "";
        pageName&&pageName.toLowerCase()=='hindipdp'?eventTracking('Header_HindiPDP_Page_Clicks_PWA','click_Logo-Clicks','IMOB_HindiPDP',true):eventTracking(pageTrack + 'Header','Logo-Clicks',pageName,true);     
        document.getElementById("fltldng") ? document.getElementById("fltldng").style = "display:none" : "";
        document.body.style.overflow = "unset";
        (window.location.href != 'https://m.indiamart.com/')?window.location.href = '/':'';
        // (SSR && (SSR["userViewCount"] == 5)) ? goToRoute('/') : window.location.href = '/'
        event.preventDefault();
       
    });

}
