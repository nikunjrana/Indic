export default function attachScript(src, callback, async = true) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    callback ? s.onload = callback : '';
    async ? s.async = true : '';
    document.body.appendChild(s);
}