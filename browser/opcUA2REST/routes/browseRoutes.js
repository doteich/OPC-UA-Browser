const express = require("express")
const router = express.Router()

const browser = require("../controller/browser")

router.get("/browse", browser.browseOPCUA)

module.exports = router