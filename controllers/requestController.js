const _ = require("lodash");
const { _fulfillRequest } = require("../helpers/request");
const Request = require("../models/Request");

exports.createRequest = async (req, res, next) => {
  const { audit } = req;
  const data = _.pick(req.body, ["type", "model", "modelId", "payload"]);
  const owner = req.user.uid;
  _.assign(data, { owner });
  const request = new Request(data);
  await request.save();
  const auditData = {
    type: "ACTION",
    actor: owner,
    action: "requests",
    payload: data.payload,
    operation: data.type,
    resource: data.model,
    resourceId: data.modelId,
  };
  _.assign(audit, auditData);
  await audit.save();
  res.status(200).json({ success: true, data: request });
};

exports.updateRequest = async (req, res, next) => {
  const { status } = req.body;
  const { audit } = req;
  const request = await Request.findById(req.params.id);
  if (!request) throw new AppError(`Request not found`, 404);
  if (request.status === "pending" && status == "approved") {
    try {
      await _fulfillRequest(request);
      _.assign(request, { status });
    } catch (e) {
      request.status = "error";
    }
  } else if (request.status === "pending") {
    _.assign(request, { status });
  }
  request.appprovedBy = req.user.uid;

  await request.save();
  const auditData = {
    type: "AUDIT",
    actor: req.user.uid,
    action: status,
    resource: "requests",
    resourceId: request._id,
  };
  _.assign(audit, auditData);
  await audit.save();
  res.status(200).json({ success: true, data: request });
};

exports.getRequests = async (req, res, next) => {
  const requests = await Request.find();
  return res.status(200).json({ success: true, data: requests });
};
