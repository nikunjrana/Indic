import makeRequest from '../../../Globals/RequestsHandler/makeRequest';


let callNowApi = {
     loggedinUser (data){
        return makeRequest('POST', '/ajaxrequest/identified/common/login', data);
    },
    
    tncacceptance (data)  {
        return makeRequest('POST', '/ajaxrequest/identified/tncacceptance/', data);
    },
    
     otpVerification (data)  {
        return makeRequest('POST', '/ajaxrequest/identified/common/otpVerification', data);
    },
    
     addC2Ctrack  (data)  {
        return makeRequest('POST', '/ajaxrequest/identified/call/', data, '', false);
    },

     truecallerPolling (data){
        return makeRequest('POST', '/ajaxrequest/identified/callnow/truecaller/polling', data);
    },
    identifyUser(data){
        return makeRequest('POST', '/ajaxrequest/callnow/identify', data);
    },
    getToken(data){
        return makeRequest('POST', '/ajaxrequest/callnow/getToken', data);
    },
    getFullLoginData(data){
        return makeRequest('POST', '/ajaxrequest/callnow/getFullLoginData', data);
    },
    addTemp(data){
        return makeRequest('POST', '/ajaxrequest/callnow/addTemp', data);
    },
    readTemp(data){
        return makeRequest('POST', '/ajaxrequest/callnow/readTemp', data);
    },
    loginWithGoogle_First(data){
        return makeRequest('POST', '/ajaxrequest/enquirybl/user/loginwithgoogle_first/',data);
    }

}

export default callNowApi;

