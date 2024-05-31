export default function getBreadCrumbsJSON(pdpData) {
    let cumbsDispData = '',
        catname = pdpData["BRD_CAT_NAME"] ? pdpData["BRD_CAT_NAME"] : '',
        catflname = pdpData["BRD_CTL_FLNAME"] ? pdpData["BRD_CTL_FLNAME"] : '',
        catUrl = "suppliers/" + catflname + "/",
        mcatname = pdpData["BRD_MCAT_NAME"] ? pdpData["BRD_MCAT_NAME"] : pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
        mcatflname = pdpData["BRD_MCAT_FLNAME"] ? pdpData["BRD_MCAT_FLNAME"] : pdpData["PARENT_MCAT"]['GLCAT_MCAT_FLNAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_FLNAME'] : '',
        parent_mcat_name = pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_NAME'] : '',
        parent_mcat_flname = pdpData["PARENT_MCAT"]['GLCAT_MCAT_FLNAME'] ? pdpData["PARENT_MCAT"]['GLCAT_MCAT_FLNAME'] : '',
        parent_m_url = parent_mcat_flname ? "impcat/" + parent_mcat_flname + ".html" : '';

    if (catname && catflname && mcatname && mcatflname) {
        cumbsDispData = {};
        cumbsDispData["IndiaMART"] = "https://m.indiamart.com/";
        cumbsDispData[catname] = "https://m.indiamart.com/" + catUrl;
        if (parent_mcat_name && parent_m_url) {
            cumbsDispData[parent_mcat_name] = "https://m.indiamart.com/" + parent_m_url;
        }
        if (mcatname !== parent_mcat_name) {
            cumbsDispData[mcatname] = "https://m.indiamart.com/impcat/" + mcatflname + ".html";
        }

    }

    return cumbsDispData;
}