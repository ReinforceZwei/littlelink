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

var brandInfo = {}
fetch("brand.json")
.then(response => response.json())
.then(brand => {
    brand.forEach(e => {
        brandInfo[e.name] = e
    })
    render()
});

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
    let avatarEl = document.getElementById('avatar')

    nameEl.innerText = profile.name
    bioEl.innerText = profile.bio
    profile.links.forEach(link => {
        link.class = brandInfo[link.name].class
        link.icon = brandInfo[link.name].icon
        let htmlString = makeLinkTemplate(link)
        let htmlNode = createElementFromHTML(htmlString)
        linksEl.appendChild(htmlNode)
    })
    if (profile.gravatar) {
        avatarEl.src = `https://www.gravatar.com/avatar/${profile.gravatar}?r=g&d=404&s=128`
    }else{
        avatarEl.style.display = 'none'
    }
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
