const { Router } = require("express");
const { matrix } = require("../controllers/matrixController");
const {
  verifyToken,
  superAdminAccess,
} = require("../middleware/authentication");
const router = Router();
router.use(verifyToken);
router.route("/").get(superAdminAccess, matrix);

module.exports = router;
