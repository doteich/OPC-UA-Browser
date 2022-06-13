const opcua = require("node-opcua")


exports.browseOPCUA = (async(req, res, next) => {


    const endpointURL = req.query.url
    const node = req.query.node
    const securityMode = req.query.securityMode
    const securityPolicy = req.query.securityPolicy
    const authentication = req.query.authType
    const userName = req.query.username
    const password = req.query.password

    async function browse() {
        try {

            const client = opcua.OPCUAClient.create({
                endpointMustExist: false,
                securityMode: securityMode,
                securityPolicy: securityPolicy
            });

            await client.connect(endpointURL);

            const session = await client.createSession();

            session.browse(node, (err, browseResult) => {
                if (!err) {
                    console.log(browseResult.references.toString())
                } else {
                    const error = new Error("Browse Error")
                    error.statusCode = 500;
                    next(error);
                }
            })

            const test = session.browse(node)

            await session.close();
            await client.disconnect();

            console.log(test)

        } catch (err) {
            const error = new Error("Kein Endpunkt mit dieser Konfiguration gefunden")
            error.statusCode = 400;
            next(error);

        }
    }

    browse()




})