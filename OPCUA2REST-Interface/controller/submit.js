const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");



exports.encryptAndSubmit = (async (req, res, next ) => {
    let body = req.body 
    let password = body.opcConfig.password 
    let username = body.opcConfig.username
    console.log(password + username)
    if (username  && password){
        let usernameEnc = AES.encrypt(username, process.env["PW"])
        let pwEnc = AES.encrypt(password, process.env["PW"])

        
    }

    
})



