const { Router } = require("express");
const { getLogs } = require("../controllers/auditController");
const router = Router();

router.route("/").get(getLogs);
module.exports = router;
