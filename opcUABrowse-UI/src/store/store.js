import { createStore } from 'vuex'
import axios from "axios"

const urlPrefix = "http://localhost:4840/"

const store = createStore({
    state() {
        return {
            opcConfig: null,
            tags: [{ "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=85", "browseName": { "namespaceIndex": 0, "name": "Objects" }, "displayName": { "locale": "en", "text": "Objects" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "index": [0], "childs": [{ "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=2253", "browseName": { "namespaceIndex": 0, "name": "Server" }, "displayName": { "locale": "en", "text": "Server" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=2004", "childs": [{ "referenceTypeId": "ns=0;i=46", "isForward": true, "nodeId": "ns=0;i=2254", "browseName": { "namespaceIndex": 0, "name": "ServerArray" }, "displayName": { "locale": "en", "text": "ServerArray" }, "nodeClass": "Variable", "typeDefinition": "ns=0;i=68", "childs": [], "index": [0, 0, 0] }, { "referenceTypeId": "ns=0;i=46", "isForward": true, "nodeId": "ns=0;i=2255", "browseName": { "namespaceIndex": 0, "name": "NamespaceArray" }, "displayName": { "locale": "en", "text": "NamespaceArray" }, "nodeClass": "Variable", "typeDefinition": "ns=0;i=68", "childs": [], "index": [0, 0, 1] }, { "referenceTypeId": "ns=0;i=47", "isForward": true, "nodeId": "ns=0;i=2256", "browseName": { "namespaceIndex": 0, "name": "ServerStatus" }, "displayName": { "locale": "en", "text": "ServerStatus" }, "nodeClass": "Variable", "typeDefinition": "ns=0;i=2138", "childs": [], "index": [0, 0, 2] }, { "referenceTypeId": "ns=0;i=46", "isForward": true, "nodeId": "ns=0;i=2267", "browseName": { "namespaceIndex": 0, "name": "ServiceLevel" }, "displayName": { "locale": "en", "text": "ServiceLevel" }, "nodeClass": "Variable", "typeDefinition": "ns=0;i=68", "childs": [], "index": [0, 0, 3] }, { "referenceTypeId": "ns=0;i=46", "isForward": true, "nodeId": "ns=0;i=2994", "browseName": { "namespaceIndex": 0, "name": "Auditing" }, "displayName": { "locale": "en", "text": "Auditing" }, "nodeClass": "Variable", "typeDefinition": "ns=0;i=68", "childs": [], "index": [0, 0, 4] }, { "referenceTypeId": "ns=0;i=47", "isForward": true, "nodeId": "ns=0;i=2268", "browseName": { "namespaceIndex": 0, "name": "ServerCapabilities" }, "displayName": { "locale": "en", "text": "ServerCapabilities" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=2013", "childs": [], "index": [0, 0, 5] }, { "referenceTypeId": "ns=0;i=47", "isForward": true, "nodeId": "ns=0;i=2274", "browseName": { "namespaceIndex": 0, "name": "ServerDiagnostics" }, "displayName": { "locale": "en", "text": "ServerDiagnostics" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=2020", "childs": [], "index": [0, 0, 6] }, { "referenceTypeId": "ns=0;i=47", "isForward": true, "nodeId": "ns=0;i=2295", "browseName": { "namespaceIndex": 0, "name": "VendorServerInfo" }, "displayName": { "locale": "en", "text": "VendorServerInfo" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=2033", "childs": [], "index": [0, 0, 7] }, { "referenceTypeId": "ns=0;i=47", "isForward": true, "nodeId": "ns=0;i=2296", "browseName": { "namespaceIndex": 0, "name": "ServerRedundancy" }, "displayName": { "locale": "en", "text": "ServerRedundancy" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=2034", "childs": [], "index": [0, 0, 8] }], "index": [0, 0] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_AdvancedTags", "browseName": { "namespaceIndex": 2, "name": "_AdvancedTags" }, "displayName": { "locale": "en", "text": "_AdvancedTags" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 1] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_ConnectionSharing", "browseName": { "namespaceIndex": 2, "name": "_ConnectionSharing" }, "displayName": { "locale": "en", "text": "_ConnectionSharing" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 2] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_CustomAlarms", "browseName": { "namespaceIndex": 2, "name": "_CustomAlarms" }, "displayName": { "locale": "en", "text": "_CustomAlarms" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 3] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_DataLogger", "browseName": { "namespaceIndex": 2, "name": "_DataLogger" }, "displayName": { "locale": "en", "text": "_DataLogger" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 4] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_EFMExporter", "browseName": { "namespaceIndex": 2, "name": "_EFMExporter" }, "displayName": { "locale": "en", "text": "_EFMExporter" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 5] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_IDF_for_Splunk", "browseName": { "namespaceIndex": 2, "name": "_IDF_for_Splunk" }, "displayName": { "locale": "en", "text": "_IDF_for_Splunk" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 6] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_IoT_Gateway", "browseName": { "namespaceIndex": 2, "name": "_IoT_Gateway" }, "displayName": { "locale": "en", "text": "_IoT_Gateway" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 7] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_LocalHistorian", "browseName": { "namespaceIndex": 2, "name": "_LocalHistorian" }, "displayName": { "locale": "en", "text": "_LocalHistorian" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 8] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_Redundancy", "browseName": { "namespaceIndex": 2, "name": "_Redundancy" }, "displayName": { "locale": "en", "text": "_Redundancy" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 9] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_Scheduler", "browseName": { "namespaceIndex": 2, "name": "_Scheduler" }, "displayName": { "locale": "en", "text": "_Scheduler" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 10] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_SecurityPolicies", "browseName": { "namespaceIndex": 2, "name": "_SecurityPolicies" }, "displayName": { "locale": "en", "text": "_SecurityPolicies" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 11] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_SNMP Agent", "browseName": { "namespaceIndex": 2, "name": "_SNMP Agent" }, "displayName": { "locale": "en", "text": "_SNMP Agent" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 12] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_System", "browseName": { "namespaceIndex": 2, "name": "_System" }, "displayName": { "locale": "en", "text": "_System" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 13] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=_ThingWorx", "browseName": { "namespaceIndex": 2, "name": "_ThingWorx" }, "displayName": { "locale": "en", "text": "_ThingWorx" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 14] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=Goglio", "browseName": { "namespaceIndex": 2, "name": "Goglio" }, "displayName": { "locale": "en", "text": "Goglio" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 15] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=Goglio_MEQ", "browseName": { "namespaceIndex": 2, "name": "Goglio_MEQ" }, "displayName": { "locale": "en", "text": "Goglio_MEQ" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 16] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=Goglio_PAI", "browseName": { "namespaceIndex": 2, "name": "Goglio_PAI" }, "displayName": { "locale": "en", "text": "Goglio_PAI" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 17] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=LorenzPan", "browseName": { "namespaceIndex": 2, "name": "LorenzPan" }, "displayName": { "locale": "en", "text": "LorenzPan" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 18] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=LorenzPan_MEQ", "browseName": { "namespaceIndex": 2, "name": "LorenzPan_MEQ" }, "displayName": { "locale": "en", "text": "LorenzPan_MEQ" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 19] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=2;s=Minebea_Waage", "browseName": { "namespaceIndex": 2, "name": "Minebea_Waage" }, "displayName": { "locale": "en", "text": "Minebea_Waage" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "childs": [], "index": [0, 20] }] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=86", "browseName": { "namespaceIndex": 0, "name": "Types" }, "displayName": { "locale": "en", "text": "Types" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "index": [1], "childs": [] }, { "referenceTypeId": "ns=0;i=35", "isForward": true, "nodeId": "ns=0;i=87", "browseName": { "namespaceIndex": 0, "name": "Views" }, "displayName": { "locale": "en", "text": "Views" }, "nodeClass": "Object", "typeDefinition": "ns=0;i=61", "index": [2], "childs": [] }],
            selectedTags: [],
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