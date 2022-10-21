const express = require("express")
const router = express.Router()

const browser = require("../controller/browser")
const reader = require("../controller/reader")
const submit = require("../controller/submit")

router.get("/browse", browser.browseOPCUA)
router.post("/read", reader.readNodes)
router.post("/submit", submit.encryptAndSubmit)

module.exports = router