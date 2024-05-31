import makeRequest from '../../../Globals/RequestsHandler/makeRequest';

export  function getRelatedData(mcats) {
       return makeRequest('GET', '/ajaxrequest/widgets/relatedData?mcats=' + mcats + '&count=20');
    }




