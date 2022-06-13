import { createStore } from 'vuex'
import axios from "axios"

const urlPrefix = "http://localhost:4840/"

const store = createStore({
    state() {
        return {
            test: null,
        }
    },
    // eslint-disable-next-line prettier/prettier
    mutations: {

    },
    getters: {

    },
    actions: {
        browse(context, payload) {
            console.log(context)
            console.log(payload)
            axios.get(`${urlPrefix}browse`, { params: payload })
        }
    }
})

export default store