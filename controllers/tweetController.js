const _ = require("lodash");
const AppError = require("../helpers/error");
const Tweet = require("../models/Tweet");

exports.createTweet = async (req, res, next) => {
  const { audit } = req;
  const data = _.pick(req.body, ["data", "title"]);

  const owner = req.user.uid;
  _.assign(data, { owner });
  const tweet = new Tweet(data);
  await tweet.save();
  const auditData = {
    type: "ACTION",
    actor: owner,
    action: "create",
    resource: "tweets",
    resourceId: tweet._id,
  };
  _.assign(audit, auditData);
  await audit.save();
  res.status(201).json({ success: true, data: tweet });
};

exports.deleteTweet = async (req, res, next) => {
  const tweet = await Tweet.find({ _id: req.parmas.id, owner: req.user.uid });
  const { audit } = req;
  if (!tweet) throw new AppError(`Tweet not found`, 404);
  await tweet.remove();
  const auditData = {
    type: "AUDIT",
    actor: owner,
    action: "delete",
    resource: "tweets",
    reourceId: tweet._id,
  };
  _.assign(audit, auditData);
  await audit.save();
  res.status(200).json({ success: true });
};

exports.getTweets = async (req, res, next) => {
  let tweets;
  if (req.user.role === "admin" || req.user.role === "super-admin")
    tweets = await Tweet.find({});
  else tweets = await Tweet.find({ owner: req.user.uid });
  res.status(200).json({ success: true, count: tweets.length, data: tweets });
};
