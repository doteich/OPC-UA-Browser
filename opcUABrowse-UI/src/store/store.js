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
            let index = 0
            for (let tag of payload) {
                tag["index"] = [index]
                tag["childs"] = []
                index += 1
            }
            state.tags = payload
        },
        setChildTags(state, payload) {

            let parentIndex = [...payload.index]

            let newIndex = 0
            for (let tag of payload.data) {
                tag["childs"] = []
                tag["index"] = [...parentIndex]
                tag.index.push(newIndex)
                newIndex += 1
            }



            function findChild(branchArray, indexArr) {

                let arr = [...indexArr]

                let el = arr.shift()
                console.log(el)
                let branch = branchArray[el]
                console.log(branch.nodeId)
                if (arr.length > 0) {

                    let nextBranch = findChild(branch.childs, arr)
                    if (nextBranch) {
                        return nextBranch
                    }
                } else {
                    console.log(branch)
                    return branch

                }
            }

            const returnedBranch = findChild(state.tags, parentIndex)

            returnedBranch.childs = payload.data





        }
    },
    getters: {
        tagGetter(state) {
            return state.tags
        }
    },
    actions: {
        browse(context, payload) {

            axios.get(`${urlPrefix}browse`, { params: payload })
                .then((res) => {
                    context.commit("setConfig", payload)

                    context.commit("setTags", res.data.message)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        browseNode(context, payload) {
            let config = context.state.opcConfig
            config.node = payload.nodeId

            axios.get(`${urlPrefix}browse`, { params: config })
                .then((res) => {

                    let resPayload = {
                        data: res.data.message,
                        index: payload.index
                    }

                    context.commit("setChildTags", resPayload)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
})

export default store