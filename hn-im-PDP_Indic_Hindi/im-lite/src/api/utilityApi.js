import makeRequest from '../Globals/RequestsHandler/makeRequest';
import {getCookieValByKey} from '../Globals/CookieManager';
import { checkUserStatus } from '../Globals/MainFunctions';
import imApi from './imApi';
import { showToIndianUser } from '../modules/Menu/utility/menuUtility';

let utilityApi={
   
checkForSoiBanner(){
    let sellerIntent  = JSON.parse(localStorage.getItem("sellerIntent"));
    let glid=getCookieValByKey('ImeshVisitor', 'glid');
    let currentDate = new Date();
    if(sellerIntent){
        if(sellerIntent['Intent']){
            if(sellerIntent['ViewCount']<10){
                sellerIntent['ViewCount']++;
                localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
              //  return 1;
            }
            else if((currentDate.getTime() - (new Date(sellerIntent['Time'])).getTime()) > (60 * 1000 * 60 * 24 * 60)){
                sellerIntent['Time']=currentDate;
                sellerIntent['ViewCount']=1;
                localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
              //  return 1;
            }
            else {
              //  return 0;
            }
        }
        else{
          //  return 0;
        }

    }
    else{
        sellerIntent={}; 
        
        if(checkUserStatus()=='1'){
            if(showToIndianUser()){
            let miniDetailsSOI = imApi.getMiniDetails();
            miniDetailsSOI.then((res) => {
                if(res.Response.Data.glusr_usr_companyname ){
                    sellerIntent['Intent']=1;
                    sellerIntent['Time']=currentDate;
                    sellerIntent['ViewCount']=1;
                    sellerIntent['CompanyName']=res.Response.Data.glusr_usr_companyname;
                    localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
                    // self.hideLoader(1);
                }
            
            })
        }

        } 
        else {
            let gst =utilityApi.getGSTIN(glid);
            let companyName=utilityApi.getDetailOfUser(glid);
            let exceptions=['LTD','LLP','PVT'];
            companyName.then(companyNameresponse=>{
            gst.then(gstresponse=>{
                let gstValue=gstresponse.response.Response.Data['GST'];
                let companyNameValue=companyNameresponse.response.glusr_usr_companyname;
                if(gstValue || companyNameValue ){
                    if(companyNameValue){
                        if(!exceptions.filter((item)=>companyNameValue.toUpperCase().includes(item)).length){
                            sellerIntent['Intent']=1;
                            sellerIntent['Time']=currentDate;
                            sellerIntent['ViewCount']=1;
                            localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
                            // self.hideLoader(1);
                        }
                        else{
                            sellerIntent['Intent']=0;
                            localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
                            // self.hideLoader(0);
                        }
                    }
                    else{
                        sellerIntent['Intent']=1;
                        sellerIntent['Time']=currentDate;
                        sellerIntent['ViewCount']=1;
                        localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
                        // self.hideLoader(1);
                    }
                }
                else{
                    sellerIntent['Intent']=0;
                    localStorage.setItem("sellerIntent", JSON.stringify(sellerIntent));
                    // self.hideLoader(0);
                }
            },err=>{
                //  self.hideLoader(0);
            })
            },err=>{ 
            // self.hideLoader(0);
            })
    }
    }
},
getGSTIN(glid = '') {
    if (glid == '') {
        glid = getCookieValByKey('ImeshVisitor', 'glid');
    }
    var data = {
        glusrid: glid,
        glid:glid
    }
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/getgst/', data);
},
getDetailOfUser(glid) {

    let data = {
        glid: getCookieValByKey('ImeshVisitor', 'glid')
    }
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/info/', data);
}

}
export default utilityApi;