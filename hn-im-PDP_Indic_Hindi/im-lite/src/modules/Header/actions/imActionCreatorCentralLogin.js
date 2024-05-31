import { getCookie,getCookieValByKey } from '../../../Globals/CookieManager';
import makeRequest from '../../../Globals/RequestsHandler/makeRequest';

let imActionCreatorCentralLogin = {

	loginUser(logindata) {
        let gaCookie = getCookie("_ga");
		let loginData = {
			    username:logindata,
                modid: "IMOB",
                glusr_usr_countryname: getCookieValByKey('iploc','gcnnm')? getCookieValByKey('iploc','gcnnm') : "",
                ip: getCookieValByKey('iploc','gip')?getCookieValByKey('iploc','gip') : "",
                ph_country: getCookieValByKey('ImeshVisitor','phcc')?getCookieValByKey('ImeshVisitor','phcc'):'',
                FORMAT: "JSON",
                screen_name: "Footer at m-site",
                iso: getCookieValByKey('ImeshVisitor','iso')?getCookieValByKey('ImeshVisitor','iso'):'',
                email: "",
                glusr_usr_ip: "",
                referer: "",
                refurl: "",
                loginusing: "",
                originalreferer: window.location.href, 
                create_user: "1",
                IP_COUNTRY: getCookieValByKey('iploc','gcnnm')? getCookieValByKey('iploc','gcnnm') : "",
                GEOIP_COUNTRY_ISO: getCookieValByKey('iploc','gcniso') ? getCookieValByKey('iploc','gcniso') : "",
                IP_ADDRESS: getCookieValByKey('iploc','gip')?getCookieValByKey('iploc','gip') : "",
                gacookie: gaCookie 
		};

		return (dispatch) => {
			return new Promise(() => {
				dispatch({ type: 'LOGIN_REQUEST' });
                makeRequest('POST', '/ajaxrequest/enquirybl/user/login', loginData)
                .then((data) => {
						if (data.statusText == 'ok' && data.response) {
                            window.ENQUIRY_IDENTIFY_LOGOUT=true;
                            dispatch({ type: 'LOGIN_SUCCESS', success: true, requestLogin:data.response, ciso:loginData.iso });
                        }
					},
					     (errorLogin) => { dispatch({ type: 'LOGIN_FAILURE', success: false, errorLogin }) }
				)

			})
		}

	}

};

export default imActionCreatorCentralLogin;
