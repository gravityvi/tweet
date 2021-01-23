const _ = require("lodash");
const Tweet = require("../models/Tweet");
exports._fulfillRequest = async (request) => {
  if (request.model === "tweets") {
    let tweet;
    let data;
    switch (request.type) {
      case "create":
        data = _.pick(request.payload, ["title", "data", "owner"]);
        tweet = new Tweet(data);
        await tweet.save();
        break;
      case "update":
        tweet = await Tweet.find({ _id: request.modelId });
        data = _.pick(requset.payload, ["title", "data"]);
        _.assign(tweet, data);
        await tweet.save();
        break;
      case "delete":
        tweet = await Tweet.findById(request.modelId);
        await tweet.remove();
        break;
      default:
        throw new Error("Invalid Operation");
    }
  }

  if (request.model === "users") {
    //make updates in user-Service
  }
};
