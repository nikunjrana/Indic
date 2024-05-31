import makeRequest from '../../../../Globals/RequestsHandler/makeRequest';

export default function fetchRelatedProducts(mcatid, cityid, prodCount = 10) {
    return makeRequest('GET', '/ajaxrequest/widgets/relatedproducts?MCAT_ID=' + mcatid + '&city=' + cityid + '&prod_count=' + prodCount);
}