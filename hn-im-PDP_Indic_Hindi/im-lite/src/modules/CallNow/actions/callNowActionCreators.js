import callNowApi from './callNowApi';
import { getCookieValByKey } from '../../../Globals/CookieManager';
import { checkUserLoc, checkUserLocIso, checkip, checkImeshExists, checkImeshIso } from '../utility/loginHelper';
import { COUNTRY_DROPDOWN_JSON, TOP5COUNTRIES } from '../../../constants/constants';
import {gaTrack,eventTracking} from '../../../Globals/GaTracking'


let callNowActionCreators = {

	loginUser(logindata) {
		let loginData = {
			"use": logindata.use,
			"ciso": logindata.ciso,
			'IP': checkip(),
			'originalreferer': window.location.href,
			'ph_code': logindata.cncode,
			'duplicateEmailCheck': logindata.duplicateEmailCheck ? logindata.duplicateEmailCheck : ''
		};

		return (dispatch) => {
			return new Promise((resolve, reject) => {
				dispatch({ type: 'LOGIN_REQUEST' });
				callNowApi.loggedinUser(loginData).then(
					(data) => {
						if (data.response) {
							let requestLogin = data.response;
							let ciso = loginData.ciso;
							if(data.response.DataCookie.usts=='2'){
								if(ciso == "IN") {
									dispatch({type:'BlOCKED_LOGIN', success:true, requestLogin:data.response, mobileNumber:loginData.use}); 
								} else {
									document.getElementById("CallNowLoginErr") ? document.getElementById("CallNowLoginErr").innerHTML = "You seem to be from India. Select India as Country" : '';
									dispatch({ type: 'LOGIN_FAILURE', success: false});
								} 
                            }
							else if(requestLogin.code == "200" && (requestLogin.msg == "Email found in Indian Account Primary " || requestLogin.msg == "Email found in Primary Email") && (requestLogin.DataCookie && requestLogin.DataCookie.iso == "IN")) {
								document.getElementById("CallNowLoginErr") ? document.getElementById("CallNowLoginErr").innerHTML = "You seem to be from India. Select India as Country" : '';
								dispatch({ type: 'LOGIN_FAILURE', success: false});
							}
							else if(requestLogin.code == "204"){
								dispatch({type:'LOGIN_RESTRICTED', success:false, loginData, ciso});
							}
							else{
								dispatch({ type: 'LOGIN_SUCCESS', success: true, requestLogin, ciso });
							}
							

							if (ciso != 'IN' && checkImeshExists()) { 
								let data = {
									"USER_AGENT": navigator.userAgent,
									"IP": loginData.IP,
									"IP_COUNTRY": checkUserLoc(),
									"IP_COUNTRY_ISO": checkUserLocIso(),
									"USR_ID": getCookieValByKey('ImeshVisitor', 'glid')
								}
								callNowApi.tncacceptance(data);
							}
							localStorage.setItem("newTime", new Date());
							resolve(data);
						}
					},
					(errorLogin) => { dispatch({ type: 'LOGIN_FAILURE', success: false, errorLogin }) }
				)

			})
		}

	},


	otpVerification(otpdata) {
		let glusrid = getCookieValByKey('ImeshVisitor', 'glid');
		let ciso = checkImeshIso();
		let usrname = getCookieValByKey('ImeshVisitor', 'mb1');
		let email = "";
		let userIp = checkip();
		let cncode = getCookieValByKey('ImeshVisitor', 'phcc')
		if (ciso != 'IN') {
			email = getCookieValByKey('ImeshVisitor', 'em');
			usrname = getCookieValByKey('ImeshVisitor', 'em');
		}
		let p = 1;
		if (ciso != "IN" && ciso != "US" && ciso != "AE" && ciso != "UK" && ciso != "AU") {
			p = 0;
		}
		let val = (p == 0) ? COUNTRY_DROPDOWN_JSON.find(function (item) { return item.cniso == ciso }) : TOP5COUNTRIES.find(function (item) { return item.cniso == ciso });
		let country_name = "";
		if (p == 0) {
			country_name = val.cnname
		} else {
			country_name = val.cname
		}
		let msgKey=0;
        if ('OTPCredential' in window) {
            msgKey=1;
        }
		let otpData = {
			"user": usrname ? usrname : otpdata.mobileNumber?otpdata.mobileNumber:'',
			"type": otpdata.type,
			"authCode": otpdata.authCode ? otpdata.authCode : '',
			"ciso": ciso,
			"email": email,
			"OTPResend": otpdata.otpresent ? otpdata.otpresent : 0,
			"glusr_id": glusrid ? glusrid : otpdata.otpGlid ? otpdata.otpGlid :'',
			"userIp": userIp ? userIp : "121.241.109.212",
			"user_mobile_country_code": cncode,
			"user_country": country_name,
			"screenName": "IMOB कॉल करें",
			"msg_key": msgKey ? 1 : 0,
			"glid": glusrid ? glusrid : otpdata.otpGlid ? otpdata.otpGlid :'',
			"emailVerify": otpdata.emailVerify ? otpdata.email : '',
			"source": ''
		}
		return (dispatch) => {
			return new Promise((resolve, reject) => {
				dispatch({ type: 'OTP_REQUEST' });
				callNowApi.otpVerification(otpData).then(
					(data) => {
						if (data.response) {
							let response = data.response;
							dispatch({ type: 'OTP_SUCCESS', success: true, response });
							if (otpData.type == "OTPVER" && response.Code != "204" && response.Error != "Auth code mismatch") {
								localStorage.setItem("newTime", new Date());
								dispatch({ type: 'LOGIN_SUCCESS', success: true, response, callver: true })
							}
						}
						resolve(data);
					},
					(error) => dispatch({ type: 'OTP_SUCCESS', success: false })
				);
			})

		}

	},


	truecallerPolling(pollingData) {
        let gip = getCookieValByKey('iploc','gip');
        let param = {
        	modid: "IMOB",
        	Request_ID: pollingData.randomKeyVal,
        	ip: gip ? gip : '',
        	screen_name: pollingData.screenName ? pollingData.screenName : '',
        	isFullLogin: "True"
        }
        return (dispatch) => {
			callNowApi.truecallerPolling(param).then(
                (result) => {
                    if (result.statusText == 'ok' && result.response) {
                        if(result.response.Code != "204" && result.response.message != "Data Not found" && result.response.Login_DATA != undefined) {
                            dispatch({ type:'LOGIN_SUCCESS', success:true, requestLogin:result.response.Login_DATA, ciso:'IN'});
                            dispatch({ type:'TrueCaller_Succ', success:true, result:result.response});
							eventTracking(pollingData.trackingData.eventCategory, pollingData.trackingData.eventAction, pollingData.trackingData.eventLabel, true);
                            localStorage.setItem("newTime", new Date());
                            }
                        else if (result.response.code == "403") {
                            dispatch({ type:'USER_REJ_LOGIN', success:true});
                            document.getElementById("truecallerLoader") ? document.getElementById("truecallerLoader").style.display = "none" : '';
                            document.getElementById("mobNo") ? document.getElementById("mobNo").focus() : '';
                        }
                    }
                    else {
                       dispatch({ type: 'ENQBL_LOGIN_USER_FAIL', success: false })
                    }
 
                }, (error) => {
                    dispatch({ type: 'ENQBL_LOGIN_USER_ERR', success: false })
                }
			);
        }
    },


	resetGValue() {
		return (dispatch) => {
			dispatch({ type: 'RESET_Enq_Val' })
		}
	},

	CWIAction(action) {	// CWI: call without identification
		return (dispatch) => {
			dispatch({ type:'CWI_LOGIN', value:action })
		}
	},

	getToken(data){
		let iso=getCookieValByKey('ImeshVisitor', 'iso');
		let params ={
			modid:"IMOB",
			glusrid:data.glusrid,
			mobile_num:data.mobile_num,
			iso:iso,
			user_mobile_country_code:91
		}
		return (dispatch) => {
			return new Promise((resolve, reject) => {
			callNowApi.getToken(params).then((result)=>{
				if(result.response && result.response.Response && result.response.Response.Code==200){
					resolve(result);
				}
			})
		})
		}
	},

	getFullLoginData(data){
		let iso=getCookieValByKey('ImeshVisitor', 'iso');
		let params ={
			modid:"IMOB",
			glusrid:data.glusrid,
			mobile_num:data.mobile_num,
			iso:iso,
			user_mobile_country_code:91,
			token:data.token,
			uid:data.uid,
			screen_name:"C2C and PNS Call"
		}
		return (dispatch) => {
			return new Promise((resolve, reject) => {
			callNowApi.getFullLoginData(params).then((result)=>{
				let Response= result && result.response && result.response.Response?result.response.Response:'';
				if(Response.COOKIE_DATA){
					dispatch({type:'LOGIN_SUCCESS', success:true, requestLogin:Response.COOKIE_DATA, ciso:"IN"});
					eventTracking("FullLoginApi", "FullLogin", data.eventLabel+"|"+data.time, false);
				}
				else if(Response.IDENTIFY_RES){
					dispatch({type:'LOGIN_SUCCESS', success:true, requestLogin:Response.IDENTIFY_RES, ciso:"IN"});
					if(Response.IDENTIFY_RES.DataCookie && Response.IDENTIFY_RES.DataCookie.uv!=''){
						eventTracking("FullLoginApi", "Verified", data.eventLabel+"|"+data.time, false);
					}
					else
					eventTracking("FullLoginApi", "Not-Verified", data.eventLabel+"|"+data.time, false);
				}
				resolve();
			})
		})
		}
	},

	loginWithGoogle_First(loginData){
        let gip = getCookieValByKey('iploc','gip'), gcniso = getCookieValByKey('iploc','gcniso');
        let param = {
            username : loginData.userName ? loginData.userName : '',
            iso : loginData.ciso ? loginData.ciso : '',
            modid : 'IMOB',
            FORMAT : 'JSON',
            glusr_usr_ip: gip,
            id_token : loginData.id_token ? loginData.id_token : '',
            create_user : 1,
            originalreferer : window.location.href,
            GEOIP_COUNTRY_ISO : gcniso,
            ip: gip,
            screen_name : loginData.screenName ? loginData.screenName : '',
            ph_country : loginData.ccode ? loginData.ccode : '',
        }
        return (dispatch) => {
            dispatch({type:'LOGIN_REQUEST'});
			callNowApi.loginWithGoogle_First(param).then((result) => {
                    if (result.statusText == 'ok' && result.response) {  
						eventTracking('CallNow', "Unidentified", "login_with_email_submit_google", true);
                        dispatch({type:'LOGIN_SUCCESS', success:true, requestLogin:result.response, ciso:loginData.ciso}); 
                    } else dispatch({type:'LOGIN_FAILURE', success:false}) 
                },
                (error) => {
                    dispatch({type:'LOGIN_FAILURE', success:false})
                }
            );
        }
    },

};

export default callNowActionCreators;
