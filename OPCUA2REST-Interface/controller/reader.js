const opcua = require("node-opcua")

exports.readNodes = (async(req, res, next) => {

    const endpointURL = req.body.url
    const nodes = req.body.nodes
    const securityMode = req.body.securityMode
    const securityPolicy = req.body.securityPolicy
    const authentication = req.body.authType
    const userName = req.body.username
    const password = req.body.password

    let auth = null
    if (authentication === "User & Password") {
        auth = { userName: userName, password: password }
    }


    async function read() {
        try {

            const client = opcua.OPCUAClient.create({
                endpointMustExist: false,
                securityMode: securityMode,
                securityPolicy: securityPolicy
            });

            await client.connect(endpointURL);

            const session = await client.createSession(auth);

            let readValue
            for (node of nodes) {
                readValue = await session.read({ nodeId: node.nodeId })
                node["currentValue"] = readValue.value.value
                node["dataTypeId"] = readValue.value.dataType

                switch (node.dataTypeId) {
                    case 1:
                        node["dataType"] = "Boolean"
                        break
                    case 4:
                        node["dataType"] = "Int16"
                        break
                    case 6:
                        node["dataType"] = "Int32"
                        break
                    case 8:
                        node["dataType"] = "Int64"
                        break
                    case 5:
                        node["dataType"] = "UInt16"
                        break
                    case 7:
                        node["dataType"] = "UInt32"
                        break
                    case 9:
                        node["dataType"] = "UInt64"
                        break
                    case 10:
                        node["dataType"] = "Float"
                        break
                    case 11:
                        node["dataType"] = "Double"
                        break
                    case 12:
                        node["dataType"] = "String"
                        break
                    default:
                        node["dataType"] = "Variant"
                        break

                }
            }



            await session.close();
            await client.disconnect();

            return nodes

        } catch (err) {
            const error = new Error("Kein Endpunkt mit dieser Konfiguration gefunden")
            error.statusCode = 400;
            throw error

        }
    }

    read()
        .then((result) => {
            res.status(200).json({
                message: result
            })
        })
        .catch((err) => {
            const error = new Error(err)
            error.statusCode = 500;
            next(error);
        })



})