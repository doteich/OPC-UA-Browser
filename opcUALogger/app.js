const opcua = require("node-opcua")
const config = { "opcConfig": { "url": "opc.tcp://127.0.0.1:49320", "securityPolicy": "None", "securityMode": "None", "authType": "Anonymous", "username": null, "password": null, "node": "ns=2;s=Kanal1.Gerät1" }, "selectedTags": [{ "nodeId": "ns=2;s=Kanal1.Gerät1.Tag 1", "name": "Tag 1" }, { "nodeId": "ns=2;s=Kanal1.Gerät1.Tag 2", "name": "Tag 2" }, { "nodeId": "ns=2;s=Kanal1.Gerät1.Test Tag", "name": "Test Tag" }], "methodConfig": { "subInterval": 8, "name": "Test Config", "description": "Hallo Welt" } }

const endpointURL = config.opcConfig.url

async function main() {
    const client = opcua.OPCUAClient.create({
        endpointMustExist: false,
        securityMode: securityMode,
        securityPolicy: securityPolicy
    });

    await client.connect(endpointURL);

    const session = await client.createSession();
}