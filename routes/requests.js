const { Router } = require("express");
const {
  createRequest,
  getRequests,
  updateRequest,
} = require("../controllers/requestController");
const {
  verifyToken,
  adminAccess,
  superAdminAccess,
} = require("../middleware/authentication");
const router = Router();
router.use(verifyToken);

router.route("/").post(adminAccess, createRequest).get(getRequests);
router.route("/:id").patch(superAdminAccess, updateRequest);

module.exports = router;
