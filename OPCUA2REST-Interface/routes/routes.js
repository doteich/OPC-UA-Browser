const express = require("express")
const router = express.Router()

const browser = require("../controller/browser")
const reader = require("../controller/reader")

router.get("/browse", browser.browseOPCUA)
router.post("/read", reader.readNodes)

module.exports = router