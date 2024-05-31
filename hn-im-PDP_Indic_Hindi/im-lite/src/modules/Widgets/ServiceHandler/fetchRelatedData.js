import makeRequest from '../../../Globals/RequestsHandler/makeRequest';
const dataObj = {
    count: '?count=25',
    count_mcat: '&count_mcat=10',
    mcats: '',
    cityid: '',
    dispid: '',
    relProdFlag: ''
}

//CITY_ID
//displayid
//MCAT_ID1,MCAT_ID2...
//count=
function checkIfDefined(queryVal) {
return queryVal ? queryVal : '';
}
export default function fetchRelatedData(data) {
let serviceParams = { ...dataObj, ...data };
return makeRequest('GET', `/ajaxrequest/widgets/relatedData${serviceParams.count}${serviceParams.mcats}${checkIfDefined(serviceParams.dispid)}${checkIfDefined(serviceParams.count_mcat)}${checkIfDefined(serviceParams.cityid)}${checkIfDefined(serviceParams.relProdFlag)}${checkIfDefined(serviceParams.ecomFlag)}`, {}, null, 10000)
}