import { getCookieValByKey } from "../../../Globals/CookieManager";
import { checkUserStatus } from "../../../Globals/MainFunctions";
import { imStore } from "../../../store/imStore";
import callNowApi from "../actions/callNowApi";

let FullLoginAPIParam={};
let timeOut1,timeOut2;
export const pnsVerification = (props) =>{

  !FullLoginAPIParam.token?getToken(props):'';
      timeOut1?clearTimeout(timeOut1):'';
      timeOut2?clearTimeout(timeOut2):'';

    if(props.CWILogin){
      return;
    }

  let oldTime=0;
  // let timeout = 0;
    let visibilityChange;
    let visibilityState;  
    if (typeof document.visibilityState !== 'undefined') {
      visibilityChange = 'visibilitychange';
      visibilityState = 'hidden';
    } else if (typeof document.mozHidden !== 'undefined'){ 
      visibilityChange = 'mozvisibilitychange';
      visibilityState = 'mozVisibilityState'; 
    } 

    document.addEventListener(visibilityChange, verification)

    function verification(){
      if(document.visibilityState=='hidden'){
        oldTime=new Date().getTime();
      }
        if(!document[visibilityState]){
            let t=new Date().getTime();
            let diff = t&&oldTime?(t - oldTime):0;
            let sec = Math.floor(diff / (1000));
            if(sec>=10){
              fullLoginFlow(props);
            }
      document.removeEventListener(visibilityChange, verification);
        }
    }

}

export function identification() {
  let userName = getCookieValByKey('ImeshVisitor', 'mb1'),
    iso = getCookieValByKey('ImeshVisitor', 'iso'),
    phcc = getCookieValByKey('ImeshVisitor', 'phcc'),
    gip = getCookieValByKey('iploc', 'gip'),
    gcnm = getCookieValByKey('iploc', 'gcnnm'),
    gcniso = getCookieValByKey('iploc', 'gcniso');
  let params = {
    username: userName ? userName : '',
    modid: "IMOB",
    glusr_usr_countryname: gcnm,
    ip: gip,
    ph_country: phcc ? phcc : '',
    FORMAT: "JSON",
    create_user: 0,
    screen_name: 'C2C and PNS Call',
    iso: iso ? iso : '',
    originalreferer: window.location.href,
    glusr_usr_ip: gip,
    referer: "",
    refurl: "",
    ip_country: gcnm,
    IP_ADDRESS: gip,
    GEOIP_COUNTRY_ISO: gcniso
  }
  return new Promise ( (resolve, reject) => {
    callNowApi.identifyUser(params).then(
      (result) => {
        if (result.statusText == 'ok' && result.response) {
          if(result.response.DataCookie && result.response.DataCookie.uv == 'V'){
            imStore.dispatch({ type: 'LOGIN_SUCCESS', success: true, requestLogin: result.response, ciso: "IN" });
          }
          resolve();
        }
      },
      (error) => {
        dispatch({ type: 'REQUEST_CANCEL', success: false })
      }
    )
    });
}

export function getToken(props)
{
  let mb1=getCookieValByKey('ImeshVisitor', 'mb1');
  let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
  let data = {
    glusrid: glusrid,
    mobile_num: mb1
  };
  props.getToken(data).then((result)=>{
    FullLoginAPIParam={...data, token:result.response.Response.Token, uid:result.response.Response.UID};
    props.CWILogin?fullLoginFlow(props):'';
  });
}

export function fullLoginFlow(props) {
  timeOut1?clearTimeout(timeOut1):'';
  timeOut2?clearTimeout(timeOut2):'';
  if (!FullLoginAPIParam.token) {
    return;
  }
  if (checkUserStatus() != 2) {
    FullLoginAPIParam.eventLabel = props.callProps.eventLabel;
    timeOut1 = setTimeout(function () {
      FullLoginAPIParam.time = props.CWILogin ? "15 sec|CWI" : "15 sec";
      if (checkUserStatus() != 2) {
        props.getFullLoginData(FullLoginAPIParam).then(() => {
          if (checkUserStatus() != 2) {
            timeOut2 = setTimeout(function () {
              FullLoginAPIParam.time = props.CWILogin ? "2 min|CWI" : "2 min";
              if (checkUserStatus() != 2) {
                props.getFullLoginData(FullLoginAPIParam).then(() => { });
              }
            }, 105000);
          }
        });
      }
    }, 15000);
  }
}