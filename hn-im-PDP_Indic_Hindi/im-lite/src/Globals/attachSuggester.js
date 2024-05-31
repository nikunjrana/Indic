import attachScript from './attachScript';

function attachSuggest() {
    if (typeof (Suggester) == "undefined") {
        let jqacLink = '';
        if (process.NODE_ENV == "dev" || process.NODE_ENV == "stg")
            jqacLink = `https://${process.NODE_ENV}-utils.imimg.com/suggest/js/suggest.js`;
        else
            jqacLink = "https://utils.imimg.com/suggest/js/suggest.js";

        attachScript(jqacLink)
    }
}
export default function loadMsuggest() {
    if (window.jQuery) {
        attachSuggest();
    }
    else {
        attachScript('https://m.imimg.com/gifs/jquery.js', attachSuggest);
    }
}
