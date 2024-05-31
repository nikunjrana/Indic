export default function getPDPUrl(title, id, isTextneeded, src) {
    let name = title?title:'';
    if(name){
    name = name.replace(/^\s+/, '');
    name = name.replace(/\s+$/, '');
    name = name.replace(/\s+/g, "-");
    name = name.toLowerCase();
    name = name.replace(/\&amp;/g, "&");
    name = name.replace(/\&lt;/g, "<");
    name = name.replace(/\&gt;/g, ">");
    name = name.replace(/\&nbsp;/g, " ");
    name = name.replace(/[\'\/\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\|\;\:\"\<\>\,\.\?\\]+/g, "-");
    name = name.replace(/^(-)+/, "");
    name = name.replace(/-+$/, "");
    name = name.replace(/\s/g, "-");
    name=name.trim();
    }
    let textneeded = !isTextneeded ?  "/proddetail/" : "/";
    let isSrc = src ? true : false;
    // let params = '';
    let paramsPos = '';
    let paramsKwd = '';
    let paramsTag = '';
    let paramsPla = '';
    let paramsCombination = '';
    if(isSrc){let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let pos = urlParams.get('pos');
        let kwd = urlParams.get('kwd');
        let tags = urlParams.get('tags');
        let pla = urlParams.get('pla');
        tags = encodeURIComponent(tags);
        // params = (pos && kwd && tags) ? ("?pos=" + pos + "&kwd=" +kwd.replace(/ /gi, "+") + "&tags=" +tags) : '';
        paramsPos = (pos) ? ("?pos=" + pos) : '';
        paramsKwd = (kwd) ? ("&kwd=" + kwd.replace(/ /gi, "+")) : '';
        paramsTag = (tags && tags !== "null") ? ("&tags=" + tags) : '';
        paramsPla = (pla) ? ("&pla=" + pla) : '';
        paramsCombination = (paramsPos && paramsKwd && paramsTag) ?  paramsPos+ paramsKwd+ paramsTag : (paramsPos && paramsPla) ? paramsPos+paramsPla :'';
    }
    return textneeded + name + '-' + id + '.html' + paramsCombination;
}