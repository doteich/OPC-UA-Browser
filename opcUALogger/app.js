const opcua = require("node-opcua")
const config = require("./config.json")



const endpointURL = config.opcConfig.url
const items = config.selectedTags


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
    const sub = await opcua.ClientSubscription.create(session, subscriptionOptions)
    return sub
}

const monitorItems = async(session, sub, item) => {

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

        item.on("changed", function(dataValue) {
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



        for (let item of items) {
            await monitorItems(newSession, newSubscription, item.nodeId)
        }

        newSubscription.terminate();

        //await newSession.close();
        //await client.disconnect();
    } catch (err) {
        console.log(err)
    }
}


main()