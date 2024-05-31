import makeRequest from '../../../Globals/RequestsHandler/makeRequest';
const dataObj = {
    count: '&count=20',
    recom_displayid: '',
    caps_prd_flag: '&caps_prd_flag=1',
    modid:'&modid=IMOB'
}

//CITY_ID
//displayid
//MCAT_ID1,MCAT_ID2...
//count=

export default function fetchCapsData(data,flag=true) {
    let serviceParams = { ...dataObj, ...data };
    return ( makeRequest('GET', `/ajaxrequest/widgets/CAPService/?token=imobile@15061981${serviceParams.caps_prd_flag}${serviceParams.recom_displayid}${serviceParams.count}${serviceParams.modid}`, {}, null, 10000)
    )
    }