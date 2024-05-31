const imgDomain = process.NODE_ENV == "dev" || process.NODE_ENV == "stg" ? "https://" + process.NODE_ENV + "-m.imimg.com" : typeof process.NODE_ENV == "undefined" ? "https://dev-m.imimg.com" : "https://m.imimg.com";

export const errorJSON = {
    "timeout": {
        "heading": "Whoops",
        "subHeading": "Your request took longer than expected.",
        "buttonText": "Please Try Again.",
        "onAction": () => { window.location.reload(true); },
        "imgUrl": {
            "webp": imgDomain + "/gifs/img/slowerNetwork.webp",
            "jpg": imgDomain + "/gifs/img/slowerNetwork.jpg"
        }
    },
    "siteDown": {
        "heading": "We’re down for scheduled Maintenance",
        "subHeading": "Deploying new changes in the site. We are preparing to serve you better",
        "buttonText": "Go To Homepage",
        "onAction": () => { location.href = "/"; },
        "imgUrl": {
            "webp": imgDomain + "/gifs/img/siteDown.webp",
            "jpg": imgDomain + "/gifs/img/siteDown.jpg"
        }
    }
}


