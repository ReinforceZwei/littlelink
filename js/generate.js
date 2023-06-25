// To be populated later
var brandInfo = {};

(function () {
    let app = Vue.createApp({
        data() {
            return {
                name: "",
                bio: "",
                links: [{"name": "Default LittleLink", "class": "button-default", "icon": "images/icons/littlelink.svg", "desc": "LittleLink"}],
            }
        },
        methods: {
            editBrand(index){
                console.log(index)
            }
        }
    })
    app.mount("#app")
    // Load brand data from json
    fetch("brand.json")
    .then(response => response.json())
    .then(brand => {
        let brandSelect = document.getElementById("brand-name")
        brand.forEach(e => {
            // Populate dropdown menu
            let { name, class: linkClass, icon, desc } = e
            let optionEl = document.createElement('option')
            optionEl.value = name
            optionEl.innerText = name
            brandSelect.appendChild(optionEl)

            brandInfo[name] = e
        })
    });


    let linksContainer = document.getElementById("links")
    linksContainer.addEventListener("click", e => {
        if (e.target.tagName.toLowerCase() == 'a'){
            console.log(e)
            let el = e.target
            let name = el.getAttribute("data-brand-name")
            let desc = el.innerText
            let link = el.getAttribute("data-brand-link")
            console.log(name, desc, link)
            brandEditSetData(name, desc, link)
            brandEditOpen()
        }
    })

    let brandSelectEl = document.getElementById("brand-name")
    brandSelectEl.addEventListener("change", () => {
        brandSelectChanged()
    })
})()

function brandEditOpen() {
    document.getElementById("brand-edit").style.display = "block"
}

function brandEditClose() {
    document.getElementById("brand-edit").style.display = "none"
}

function brandEditSetData(name, desc, link) {
    let nameEl = document.getElementById("brand-name")
    let descEl = document.getElementById("brand-desc")
    let linkEl = document.getElementById("brand-link")

    nameEl.value = name
    descEl.value = desc
    linkEl.value = link
}

function brandSelectChanged() {
    let brandSelectEl = document.getElementById("brand-name")
    let selectedName = brandSelectEl.value
    console.log(selectedName)
    let descEl = document.getElementById("brand-desc")
    descEl.value = brandInfo[selectedName].desc
}