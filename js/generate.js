(function () {
    let brandEditModal = {
        template: "#brand-edit",
        props: ['brand', 'visible'],
        data() {
            return {
                "name": "",
                "linkClass": "",
                "icon": "",
                "link": "",
                "desc": "",
            }
        },
        methods: {
            onDone() {
                this.$emit('done', {
                    "name": this.name,
                    "class": this.linkClass,
                    "icon": this.icon,
                    "link": this.link,
                    "desc": this.desc
                })
            }
        }
    }
    let app = Vue.createApp({
        data() {
            return {
                name: "",
                bio: "",
                email: "",
                gravatar: "",
                gravatarHash: "",
                links: [{"name": "Default LittleLink", "desc": "Click To Edit"}],
                brandInfo: {},
                brandSelectList: [],
                editingBrand: {},
                editingBrandIndex: -1,
                editModalOpen: false,
                defaultLink: {"name": "Default LittleLink", "desc": "Click To Edit"},
                avatarModalOpen: false,
                generateModalOpen: false,
                finalProfileLink: "",
            }
        },
        methods: {
            editBrand(index){
                this.editingBrand = this.links[index]
                this.editingBrandIndex = index
                this.editModalOpen = true
            },
            editModalClose() {
                this.editModalOpen = false
            },
            addLink() {
                this.links.push(JSON.parse(JSON.stringify(this.defaultLink)))
            },
            onBrandSelectChange() {
                let name = this.editingBrand.name
                this.editingBrand.desc = this.brandInfo[name].desc
            },
            editModalDelete() {
                if (confirm('Delete this account?')) {
                    this.links.splice(this.editingBrandIndex, 1)
                    this.editModalOpen = false
                }
            },
            openAvatarModal() {
                this.avatarModalOpen = true
            },
            closeAvatarModal() {
                this.avatarModalOpen = false
            },
            findGravatar() {
                let hash = md5(this.email.toLowerCase())
                let gravatarUrl = `https://www.gravatar.com/avatar/${hash}?r=g&d=404&s=128`
                fetch(gravatarUrl)
                .then(resp => {
                    if (resp.ok) {
                        this.gravatar = gravatarUrl
                        this.gravatarHash = hash
                    }else{
                        alert("Cannot find your Gravatar")
                    }
                })
            },
            openGenerateModal() {
                let link = {
                    "name": this.name,
                    "bio": this.bio,
                    "links": this.links
                }
                if (this.gravatar) link.gravatar = this.gravatarHash

                let serverUrl = location.href.substring(0, location.href.lastIndexOf('/'))
                let base64 = encodeBase64UrlSafe(JSON.stringify(link))
                this.finalProfileLink = `${serverUrl}/view.html#${base64}`

                this.generateModalOpen = true
            },
            closeGenerateModal() {
                this.generateModalOpen = false
            },
            copyProfileLink() {
                navigator.clipboard.writeText(this.finalProfileLink)
            },
            importProfile() {
                let link = prompt('Paste your profile link')
                let url = new URL(link)
                let hash = url.hash.substring(1)
                let json = decodeBase64UrlSafe(hash)
                let profile = JSON.parse(json)
                
                this.name = profile.name
                this.bio = profile.bio
                this.links = profile.links
                if (profile.gravatar) {
                    this.gravatarHash = profile.gravatar
                    this.gravatar = `https://www.gravatar.com/avatar/${this.gravatarHash}?r=g&d=404&s=128`
                }
            }
        },
        created() {
            // Load brand data from json
            fetch("brand.json")
            .then(response => response.json())
            .then(brand => {
                //let brandSelect = document.getElementById("brand-name")
                this.brandSelectList = brand
                brand.forEach(e => {
                    this.brandInfo[e.name] = e
                })
            });
            let link = getUrlHash()
            if (link) {
                let json = decodeBase64UrlSafe(link)
                let profile = JSON.parse(json)
                this.name = profile.name
                this.bio = profile.bio
                this.links = profile.links
                if (profile.gravatar) {
                    this.gravatarHash = profile.gravatar
                    this.gravatar = `https://www.gravatar.com/avatar/${this.gravatarHash}?r=g&d=404&s=128`
                }
            }
        },
        updated() {
            let link = {
                "name": this.name,
                "bio": this.bio,
                "links": this.links
            }
            if (this.gravatar) link.gravatar = this.gravatarHash
            let base64 = encodeBase64UrlSafe(JSON.stringify(link))
            location.hash = '#' + base64
        }
    })
    app.mount("#app")
})()