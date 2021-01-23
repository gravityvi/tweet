const Audit = require("../models/Audit");
exports.startAudit = async (req, res, next) => {
  const audit = new Audit();
  req.audit = audit;
  next();
};
