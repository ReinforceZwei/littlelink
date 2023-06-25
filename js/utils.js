function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

function encodeBase64UrlSafe(str) {
    const base64 = btoa(str);
    const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return base64Url;
}

function decodeBase64UrlSafe(data) {
    return decodeURIComponent(atob(data.replace(/-/g, '+').replace(/_/g, '/')));
}

function getUrlHash() {
    return window.location.hash.substring(1);
}

function escape(s) {
    return s.replace(
        /[^0-9A-Za-z ]/g,
        c => "&#" + c.charCodeAt(0) + ";"
    );
}