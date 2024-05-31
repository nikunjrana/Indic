import { eventTracking } from '../../../Globals/GaTracking';
import { getCookie, getCookieValByKey } from '../../../Globals/CookieManager';
import {addC2Ctrack} from '../actions/addC2Ctrack';
import { callNowActionDispatcher } from '../actions/callNowActionDispatcher';

export const updateLocalStorage = (that) => {
    let multiPurposeLS = JSON.parse(localStorage.getItem("multi_purpose"));	
	multiPurposeLS == null? multiPurposeLS = {}:'';
	
    let updatedRecord = new Array();
    let newDate = new Date();
    updatedRecord.push(1);
    newDate.setHours(newDate.getHours() + 24);
    updatedRecord.push(newDate);
    
    if (typeof multiPurposeLS['call_now'] == "undefined") {
		//Setting new value for call record
        multiPurposeLS['call_now'] = updatedRecord.join(";");
        multiPurposeLS['ctcrecordid'] = 1;
       
    } else {
		//Checking previous value of call record
        let previousRecord = multiPurposeLS['call_now'].split(";");
        let previousDate = new Date(previousRecord[1]);
        let currentDate = new Date();
		
        if (currentDate > previousDate) {
			//Call Record Updated with new date for this case
            multiPurposeLS['call_now'] = updatedRecord.join(";");
            multiPurposeLS['ctcrecordid'] = 1;
        } else {
			//Only Call ctcrecordid is incremented here
            previousRecord[0]++;
            let c2cCount = multiPurposeLS['ctcrecordid'];
            c2cCount == null ||  c2cCount == undefined ? c2cCount = 1 : c2cCount++;
            multiPurposeLS['ctcrecordid'] = c2cCount;
            multiPurposeLS['call_now'] = previousRecord.join(";");
        }
    }
    localStorage.setItem("multi_purpose", JSON.stringify(multiPurposeLS));
}

export const callDurationSessionStorage=(r_glid, props, that,props1)=>{
    let timeLs={};
    timeLs['time']=new Date();
    timeLs['R_glid']=r_glid;
    
    sessionStorage.setItem("CallTime",JSON.stringify(timeLs));
    var visibilityChange;
    var visibilityState;  
    if (typeof document.visibilityState !== 'undefined') { 
      visibilityChange = 'visibilitychange';
      visibilityState = 'hidden';
    } else if (typeof document.mozHidden !== 'undefined'){ 
      visibilityChange = 'mozvisibilitychange';
      visibilityState = 'mozVisibilityState'; 
    } 
    
    document.addEventListener(visibilityChange, callDurationFunc)
      function callDurationFunc() {
        console.log("hi", that.props.c2c_ID)
      let callProps = props;
      let lsData=JSON.parse(sessionStorage.getItem("CallTime"));
      let usr_glusrid = getCookieValByKey('ImeshVisitor', 'glid');
      if(lsData){
        if(!document[visibilityState]){
        var oldTime=new Date(lsData['time']);
        let t=new Date();
        let R_glid= lsData['R_glid'] ? lsData['R_glid'] :'';
        let diff =(t.getTime() - oldTime.getTime()) ;
        let mins = Math.floor(diff / (1000 * 60));
        // diff -= mins * (1000 * 60);
        // let seconds = Math.floor(diff / (1000));
        // diff -= seconds * (1000);
        //eventTracking("Click-To-Call","Call-Duration",usr_glusrid+"|"+R_glid+"|"+mins+":"+seconds,true);
          sessionStorage.removeItem("CallTime");
          document.removeEventListener(visibilityChange, callDurationFunc);
          let multi_purpose = JSON.parse(localStorage.getItem("multi_purpose"));
          if(multi_purpose.VFPending){
            delete multi_purpose.VFPending;
            localStorage.setItem("multi_purpose", JSON.stringify(multi_purpose));
          }
          let data = {
            callDuration: mins < 10 ? diff : '',
            callTxt: callProps.callTxt,
            contactNumber: callProps.contactNumber, 
            glusrID: callProps.glusrID, 
            contactType: callProps.contactType, 
            startTime: new Date(),
            modrefid: callProps.modrefid,
            modrefname: callProps.modrefname,
            query_ref_id: callProps.query_ref_id,
            query_ref_type: callProps.query_ref_type,
            pageType: callProps.dbpagetrack ? callProps.dbpagetrack : callProps.pageType ? callProps.pageType : '',
            callRecordID: that.props.c2c_ID,
            userMode: callProps.userMode
          };
          if(that.props.c2c_ID) {
            addC2Ctrack(data);
          }
          else if(!getCookie("ImeshVisitor")){
            if(props1.callProps.checkForLoginScreen){
              props1.callProps.fetchDialerLogin();
            }else{
              props1.CWIAction(true);
              props1.callProps ? callNowActionDispatcher(true, props1.callProps):'';
            }
          }
        }
      }
    };
    

}