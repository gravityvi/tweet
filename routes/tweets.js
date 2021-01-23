const { Router } = require("express");
const {
  createTweet,
  getTweets,
  deleteTweet,
} = require("../controllers/tweetController");
const { verifyToken } = require("../middleware/authentication");
const router = Router();

router.use(verifyToken);
router.route("/").post(createTweet).get(getTweets);
router.route("/:id").delete(deleteTweet);

module.exports = router;
