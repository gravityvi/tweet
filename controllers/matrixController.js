const _ = require("lodash");
const Request = require("../models/Request");
const Tweet = require("../models/Tweet");

exports.matrix = async (req, res, next) => {
  const { startDate, endDate, user, status } = req.query;
  const query = {};
  if (startDate) {
    _.assign(query, { createdAt: { $gte: startDate } });
  }
  if (endDate) {
    _.assign(query, { createdAt: { $lte: endDate } });
  }
  if (user) {
    _.assign(query, { owner: user });
  }
  const requestQuery = { ...query };
  if (status) {
    _.assign(requestQuery, { status });
  }
  const requests = await Request.find(requestQuery);
  const requestCount = requests.length;
  const tweets = await Tweet.find(query);
  const tweetsLength = tweets.length;
  res.status(200).json({
    success: true,
    data: { tweetsMade: tweetsLength, requestsMade: requestCount },
  });
};
