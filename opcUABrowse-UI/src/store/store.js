import { createStore } from 'vuex'
import axios from "axios"

const urlPrefix = "http://localhost:4840/"

const store = createStore({
    state() {
        return {
            opcConfig: null,
            tags: null,
        }
    },
    // eslint-disable-next-line prettier/prettier
    mutations: {
        setConfig(state, payload) {
            state.opcConfig = payload
        },
        setTags(state, payload) {

            for (let tag of payload) {
                tag["childs"] = []
            }
            state.tags = payload
        }
    },
    getters: {
        tagGetter(state) {
            return state.tags
        }
    },
    actions: {
        browse(context, payload) {
            console.log(context)
            console.log(payload)
            axios.get(`${urlPrefix}browse`, { params: payload })
                .then((res) => {
                    context.commit("setConfig", payload)

                    context.commit("setTags", res.data.message)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})

export default store