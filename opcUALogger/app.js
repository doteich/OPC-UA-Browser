const opcua = require("node-opcua")
const config = { "opcConfig": { "url": "opc.tcp://pe2-popc-p01.meg-gruppe.net:48400", "securityPolicy": "None", "securityMode": "None", "authType": "Anonymous", "username": null, "password": null, "node": "ns=2;s=Minebea_Waage.Testing Scale.CurrentWeight" }, "selectedTags": [{ "nodeId": "ns=2;s=Minebea_Waage.Testing Scale.CurrentWeight.Gross", "name": "Gross" }, { "nodeId": "ns=2;s=Minebea_Waage.Testing Scale.CurrentWeight.Net", "name": "Net" }, { "nodeId": "ns=2;s=Minebea_Waage.Testing Scale.CurrentWeight.Tare", "name": "Tare" }], "methodConfig": { "subInterval": 10, "name": "Test", "description": "Test" } }
const endpointURL = config.opcConfig.url



const createSession = async (client) => {
    try {

        const session = await client.createSession();
        return session
    } catch (err) {
        return console.log(err)
    }
}

const setupSubscription = async (session) => {

    const subscriptionOptions = {
        maxNotificationsPerPublish: 1000,
        publishingEnabled: true,
        requestedLifetimeCount: 100,
        requestedMaxKeepAliveCount: 47,
        requestedPublishingInterval: 1000
    };
    const sub = await opcua.ClientSubscription.create(session, subscriptionOptions)

    sub.on("started", () => { console.log("HALLO WELT") })
    sub.on("keepalive", function () {
        console.log("subscription keepalive");
    })
    sub.on("terminated", function () {
        console.log("terminated");
    });

    return sub
}

const monitorItems = async (session, sub, item) => {

    console.log("LO")
    

    const itemToMonitor = {
        nodeId: opcua.resolveNodeId(item),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoringParamaters = {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 10
    };


    try {

        let item = await opcua.ClientMonitoredItem.create(sub, itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both)
       
        item.on("changed", function (dataValue) {
            console.log(
                itemToMonitor.nodeId.value, ":",
                dataValue.value.value
            );
        })

        

    } catch (err) {
        console.log(err)
    }
}


async function main() {
    try {
        const client = opcua.OPCUAClient.create({
            endpointMustExist: false,
            securityMode: config.opcConfig.securityMode,
            securityPolicy: config.opcConfig.securityPolicy
        });

        await client.connect(endpointURL);

        const newSession = await createSession(client)
        const newSubscription = await setupSubscription(newSession)

        const items = config.selectedTags

        for (let item of items) {
           await monitorItems(newSession, newSubscription, item.nodeId)
        }

        newSubscription.terminate();

        //await newSession.close();
        //await client.disconnect();
    }
    catch(err){
        console.log(err)
    }
}


main()