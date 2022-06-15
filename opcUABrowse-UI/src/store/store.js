import { createStore } from 'vuex'
import axios from "axios"

const urlPrefix = "http://localhost:4840/"

const store = createStore({
    state() {
        return {
            opcConfig:null,
            tags: [ { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=85", "browseName": { "namespaceIndex": 0, "name": "Objects" }, "displayName": { "locale": "en", "text": "Objects" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=86", "browseName": { "namespaceIndex": 0, "name": "Types" }, "displayName": { "locale": "en", "text": "Types" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=87", "browseName": { "namespaceIndex": 0, "name": "Views" }, "displayName": { "locale": "en", "text": "Views" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [] } ]
        }
    },
    // eslint-disable-next-line prettier/prettier
    mutations: {
        setConfig(state,payload){
            state.opcConfig = payload
        },
        setTags(state, payload){
            for(let tag of payload){
                tag["childs"] = []
            }
            state.tags = payload
        }
    },
    getters: {
        tagGetter(state){
            return state.tags
        }
    },
    actions: {
        browse(context, payload) {
           
            axios.get(`${urlPrefix}browse`, { params: payload })
            .then((res)=>{
                context.commit("setConfig",payload)
                context.commit("setTags",res.data.message)
            })
            .catch(err => console.log(err))
        },
        browseNode(context,payload){
           let config = context.state.opcConfig
           config.node = payload
           axios.get(`${urlPrefix}browse`, {params: config})
           .then((res)=>{
            console.log(res.data.message)
           })
        }
    }
})

export default store