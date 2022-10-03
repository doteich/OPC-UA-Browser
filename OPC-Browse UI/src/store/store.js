import { createStore } from 'vuex'
import axios from "axios"

const urlPrefix = "http://localhost:4840/"

const store = createStore({
    state() {
        return {
            opcConfig: null,
            tags: null,
            selectedTags: [],
            methodConfig: null,
            displayedItems: {
                locationPicker: true,
                opcConfigurator: false,
                tagPicker: false,
                nameConfig: false,
                methodConfigurator: false,
                metricsConfigurator: false,
                reviewer: false,
            },
            endpointError: null
        }
    },
    // eslint-disable-next-line prettier/prettier
    mutations: {
        setConfig(state, payload) {
            state.opcConfig = payload
        },
        setErrorMessage(state, payload) {
            state.endpointError = payload
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
                    return branch
                }
            }
            const returnedBranch = findChild(state.tags, parentIndex)
            returnedBranch.childs = payload.data
        },
        collapseNode(state, payload) {
            payload.branch.childs = []

        },
        addSelectedNode(state, payload) {
            state.selectedTags.push(payload)
        },
        dropSelectedNode(state, payload) {
            const itemIndex = state.selectedTags.map(el => el.nodeId).indexOf(payload.nodeId)
            console.log(itemIndex)
            if (itemIndex > -1) {
                state.selectedTags.splice(itemIndex, 1);
            }
        },
        setUpdatedSelectedTags(state, payload) {
            for (let tag of payload) {
                tag["exposeAsMetric"] = false
                tag["metricsType"] = "Counter"
            }
            state.selectedTags = payload
        },
        setMethodConfig(state, payload) {
            state.methodConfig = payload
        },
        displayComponent(state, payload) {
            state.displayedItems[payload] = true
        },
        updateTagName(state, payload) {
            state.selectedTags.forEach((tag) => {
                if (tag.nodeId === payload.nodeId) {
                    tag.name = payload.name
                }
            })
        },
        updateMetricsType(state, payload) {
            state.selectedTags.forEach((tag) => {
                if (tag.nodeId === payload.nodeId) {
                    tag.metricsType = payload.metricsType
                }
            })
        },
        enableMetrics(state) {
            for (let tag of state.selectedTags) {
                if (tag.dataTypeId < 12) {
                    tag.exposeAsMetric = true
                }
            }
        }

    },
    getters: {
        tagGetter(state) {
            return state.tags
        },
        configFileGetter(state) {
            let opcConfig = state.opcConfig
            let selectedTags = state.selectedTags
            let methodConfig = state.methodConfig

            return {
                opcConfig,
                selectedTags,
                methodConfig
            }
        },
        displayedComponentsGetter(state) {
            return state.displayedItems
        },
        getConfigError(state) {
            return state.endpointError
        },
        getSelectedTags(state) {
            return state.selectedTags
        }
    },
    actions: {
        browse(context, payload) {

            axios.get(`${urlPrefix}browse`, { params: payload })
                .then((res) => {
                    context.commit("setConfig", payload)
                    context.commit("setTags", res.data.message)
                    context.commit("setErrorMessage", null)
                    context.commit("displayComponent", "tagPicker")
                })
                .catch(() => {
                    context.commit("setErrorMessage", "Keine Verbindung zum Endpunkt möglich - Konfiguration überprüfen")
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
        },
        readNodes(context) {
            let payload = context.state.opcConfig
            payload.nodes = context.state.selectedTags

            axios.post(`${urlPrefix}read`, payload)
                .then((res) => {
                    context.commit("setUpdatedSelectedTags", res.data.message)
                })
                .catch((err) => console.log(err))

        }

    }
})

export default store