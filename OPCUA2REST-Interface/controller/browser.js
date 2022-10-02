const opcua = require("node-opcua")


exports.browseOPCUA = (async(req, res, next) => {


    const endpointURL = req.query.url
    const node = req.query.node
    const securityMode = req.query.securityMode
    const securityPolicy = req.query.securityPolicy
    const authentication = req.query.authType
    const userName = req.query.username
    const password = req.query.password

    let auth = null

    if (authentication === "User & Password") {
        auth = { userName: userName, password: password }
    }

    let browseObjects = {
        nodeId: node,
        referenceTypeId: 33,
        browseDirection: opcua.BrowseDirection.Forward,
        includeSubtypes: true,
        nodeClassMask: opcua.NodeClass.Object,
        resultMask: 63

    }

    let browseVars = {
        nodeId: node,
        referenceTypeId: 33,
        browseDirection: opcua.BrowseDirection.Forward,
        includeSubtypes: true,
        nodeClassMask: opcua.NodeClass.Variables,
        resultMask: 63

    }


    async function browse() {
        try {

            const client = opcua.OPCUAClient.create({
                endpointMustExist: false,
                securityMode: securityMode,
                securityPolicy: securityPolicy
            });

            await client.connect(endpointURL);

            const session = await client.createSession(auth);


            const browsedNodes = await session.browse(browseObjects)
            const browsedVars = await session.browse(browseVars)

            browsedVars.references.forEach((el) => {
                if (el.nodeClass > 1) {
                    browsedNodes.references.push(el)
                }
            })

            await session.close();
            await client.disconnect();

            console.log(browsedNodes.toString())
            return browsedNodes.references

        } catch (err) {
            const error = new Error("Kein Endpunkt mit dieser Konfiguration gefunden")
            error.statusCode = 400;
            throw error

        }
    }

    browse()
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