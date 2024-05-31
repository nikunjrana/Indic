export function getDisplayName(data) {
    let displayName = data.PC_ITEM_DISPLAY_NAME ? data.PC_ITEM_DISPLAY_NAME : data.PC_ITEM_NAME;
    return displayName;
}

export function updatePageTitle(title) {
    document.title = title;
}
export function updatePageSearchBox(displayName) {
    document.getElementById('dpnameUpdate') ? document.getElementById('dpnameUpdate').innerText = displayName : '';
}
export function updatePageUrl(pageUrl) {
    // debugger;
    if(window.location.href.includes('proddetail')){
    history.replaceState('', '', pageUrl);
    }
}
export function isElementInViewport(el) {
    if (el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    else
        return false
}
export function checkForPageInfo(prodInfo) {
    return new Promise(function (resolve, reject) {
        if (prodInfo) {
            let dispIDS = Object.keys(prodInfo);
            for (let dispID of dispIDS) {
                if (isElementInViewport(document.querySelector(dispID))) {
                    updatePageSearchBox(prodInfo[dispID]["displayName"]);
                    updatePageTitle(prodInfo[dispID]["title"]);
                    // updatePageUrl(prodInfo[dispID]["url"]);
                }
            }
        }
        resolve('DONE');
    })
}