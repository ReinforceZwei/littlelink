const DEFAULT_PROFILE = {
    'name': 'Reinforce',
    'bio': 'I am Reinforce',
    'links': [
        {
            "name": "GitHub",
            "class": "button-github",
            "icon": "images/icons/github.svg",
            "href": "https://github.com/ReinforceZwei",
            "desc": "GitHub"
        },
    ]
}
render()
//renderProfile(DEFAULT_PROFILE)

function render(){
    // Get json from url
    let base64 = getUrlHash()
    let dataStr = decodeBase64UrlSafe(base64)
    let profile;
    try {
        profile = JSON.parse(dataStr)
    } catch {
        alert('Cannot decode url')
        return
    }
    renderProfile(profile)
}

function renderProfile(profile) {
    let nameEl = document.getElementById('name')
    let bioEl = document.getElementById('bio')
    let linksEl = document.getElementById('links')

    nameEl.innerText = profile.name
    bioEl.innerText = profile.bio
    profile.links.forEach(link => {
        let htmlString = makeLinkTemplate(link)
        let htmlNode = createElementFromHTML(htmlString)
        linksEl.appendChild(htmlNode)
    })
}

function makeLinkTemplate(link) {
    let { name, class: linkClass, icon, href, desc } = link;
    name = escape(name);
    linkClass = escape(linkClass);
    icon = escape(icon);
    href = escape(href);
    desc = escape(desc);
    return `<a class="button ${linkClass}" href="${href}" target="_blank" rel="noopener" role="button"><img class="icon" src="${icon}" alt="">${desc}</a><br>`;
}

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