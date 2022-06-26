const opcua = require("node-opcua")
const config = { "opcConfig": { "url": "opc.tcp://127.0.0.1:49320", "securityPolicy": "None", "securityMode": "None", "authType": "Anonymous", "username": null, "password": null, "node": "ns=2;s=Kanal1.Gerät1" }, "selectedTags": [{ "nodeId": "ns=2;s=Kanal1.Gerät1.Tag 1", "name": "Tag 1" }, { "nodeId": "ns=2;s=Kanal1.Gerät1.Tag 2", "name": "Tag 2" }, { "nodeId": "ns=2;s=Kanal1.Gerät1.Test Tag", "name": "Test Tag" }], "methodConfig": { "subInterval": 8, "name": "Test Config", "description": "Hallo Welt" } }

const endpointURL = config.opcConfig.url



const createSession = async(client) => {
    try {

        const session = await client.createSession();
        return session
    } catch (err) {
        return console.log(err)
    }
}

const setupSubscription = async(session) => {

    const subscriptionOptions = {
        maxNotificationsPerPublish: 1000,
        publishingEnabled: true,
        requestedLifetimeCount: 100,
        requestedMaxKeepAliveCount: 47,
        requestedPublishingInterval: 1000
    };
    const sub = await session.createSubscription2(subscriptionOptions)


    sub.on("started", () => {
        console.log(
            "subscription started for 2 seconds - subscriptionId=",
            the_subscription.subscriptionId
        );
    })
    sub.on("keepalive", function() {
        console.log("subscription keepalive");
    })
    sub.on("terminated", function() {
        console.log("terminated");
    });

    const itemToMonitor = {
        nodeId: opcua.resolveNodeId("ns=2;s=Kanal1.Gerät1.String"),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoringParamaters = {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 10
    };


    const item = await sub.monitor(itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both)
    item.on("changed", function(dataValue) {
        console.log(
            "monitored item changed:  % free mem = ",
            dataValue.value.value
        );
    })
}

const monitorItems = async(sub) => {

    const itemToMonitor = {
        nodeId: opcua.resolveNodeId("ns=2;s=Kanal1.Gerät1.Tag 1"),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoringParamaters = {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 10
    };


    try {

        let val = await sub.monitor(itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both)

        console.log(val)
    } catch (err) {
        console.log(err)
    }
}


async function main() {

    const client = opcua.OPCUAClient.create({
        endpointMustExist: false,
        securityMode: config.opcConfig.securityMode,
        securityPolicy: config.opcConfig.securityPolicy
    });
    await client.connect(endpointURL);

    const newSession = await createSession(client)

    await setupSubscription(newSession)






    //await newSession.close();
    //await client.disconnect();

}


main()