import { browserHistory } from 'react-router';

export const goToRoute = (pathTo) => {
    let updatedPath = pathTo;
    if((window.location.href.includes("/impcat/") || window.location.href.includes("/city/")) && window.location.href.includes("utm_source=Adwords")){
        updatedPath = updatedPath.includes("isearch")?pathTo+"&utm_source=Adwords":pathTo+"?utm_source=Adwords";
    }
        browserHistory.push(updatedPath);
}

export const goToMcat = (pathTo,type = "path",returnPath = false) =>{
    //Pass type : "object" if url has params append
    let pathObj;
   
    if(type == "object"){
        pathObj = pathTo;
        pathObj.pathname = pathTo.pathname;
    }
    else{
        pathObj = {
            pathname : pathTo,
        }
    }

    pathObj.state = {isMcat :true};
    if(returnPath){
        return pathObj
    }
    else
    browserHistory.push(pathObj)
}