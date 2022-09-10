const { schemaTimestampsToReturn } = require("node-opcua")
const opcua = require("node-opcua")
const config = require("./config.json")



const endpointURL = config.opcConfig.url
const items = config.selectedTags

const setupClient = async() => {

    const connectionStrategy = {
        initialDelay: 1000,
        maxRetry: 3
    };

    const client = opcua.OPCUAClient.create({
        applicationName: "IEP-Sub",
        clientName: "IEP-Client",
        endpointMustExist: false,
        securityMode: config.opcConfig.securityMode,
        securityPolicy: config.opcConfig.securityPolicy,
        connectionStrategy: connectionStrategy,
        keepSessionAlive: true,
        reconnectOnFailure: true,
    });


    client.on("connection_lost", (client) => {
        console.log("Con LOST")
    })

    client.on("connection_reestablished", (client) => {
        console.log("Con REESTAB")
    })

    client.on("start_reconnection", (client) => {
        console.log("START RECON")
    })
    return client
}


const createSession = async(client) => {
    try {
        const sessionOptions = {
            requestedSessionTimeout: 10000
        }
        const session = await client.createSession(sessionOptions);
        return session
    } catch (err) {
        return console.log(err)
    }
}

const setupSubscription = async(session) => {

    const subscriptionOptions = {
        maxNotificationsPerPublish: 1000,
        publishingEnabled: true,
        requestedLifetimeCount: 3,
        requestedMaxKeepAliveCount: 1,
        requestedPublishingInterval: 1000
    };
    const sub = await opcua.ClientSubscription.create(session, subscriptionOptions)

    sub.on("started", () => { console.log("Subscription Started") })
    sub.on("keepalive", function() {
        console.log("subscription keepalive");
    })
    sub.on("terminated", async function() {
        console.log("Subscription terminated")

    });

    return sub
}

const monitorItems = async(session, sub, item, client) => {

    const itemToMonitor = {
        nodeId: opcua.resolveNodeId(item),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoringParameters = {
        samplingInterval: 2000,
        discardOldest: true,
        queueSize: 10
    };

    console.log(itemToMonitor)
    try {

        let item = await opcua.ClientMonitoredItem.create(sub, itemToMonitor, monitoringParameters, opcua.TimestampsToReturn.Both)


        item.on("changed", (dataValue) => {
            let data = {
                nodeId: itemToMonitor.nodeId.value,
                value: dataValue.value.value
            }
            console.log(data)
        })

    } catch (err) {
        console.warn(err)

    }
}

const monitorMultiple = async(session, sub, items) => {
    let monitorItems = []
    items.forEach((item) => {
        monitorItems.push({ attributeId: opcua.AttributeIds.Value, nodeId: nodeId });
    })

    const monitoringParameters = {
        samplingInterval: 2000,
        discardOldest: true,
        queueSize: 10
    };


    try {

        const monitoredItemGroup = await sub.monitorItems(monitorItems, monitoringParameters, opcua.TimestampsToReturn.Both);


        monitoredItemGroup.on("initialized", (monitoredItem, dataValue, index) => {

            console.log("HALLO")
        })
    } catch (err) {
        console.log(err)
    }
}

async function disconnectHandler(client, session, sub) {
    await sub.terminate();
    await session.close();
    await client.disconnect();
}


async function main() {
    try {

        const newClient = await setupClient()
        await newClient.connect(endpointURL);

        const newSession = await createSession(newClient)
        const newSubscription = await setupSubscription(newSession)


        /* for (let item of items) {

             await monitorItems(newSession, newSubscription, item.nodeId, newClient)
             console.log(item)
         } */

        await monitorMultiple(newSession, newSubscription, items)


        /*
        async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await timeout(10000)
          disconnectHandler(newSubscription, newSession, newClient)
        */


    } catch (err) {
        console.log(err)
    }
}


main()