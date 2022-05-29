let app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            dogTypes: ["akita", "wolfhound", "pekinese", "pomeranian", "shiba", "chow"],
            dogUrl: "",
            dogImages: "",
            isShow: false
            
        }
    },
    methods: {
        async fetchDogImage(index) {
            const that = this
            this.dogUrl = `https://dog.ceo/api/breed/${this.dogTypes[index]}/images`
            const response = await fetch(this.dogUrl, {method: "get"})
            .then(response => {
                if (response.ok) {
                    that.isShow = true
                    return response.json()
                }
                throw new Error("error")
                .catch(e => console.log(e.message))
            })
            this.render(response)
        },
        render(response) {
            if(response.message.length > 20) {
                this.dogImages = _(response.message).shuffle().slice(0, 20).value()
            } else {
                this.dogImages = _.shuffle(response.message)
            }
        }
    }
})
// app.mount("#app")