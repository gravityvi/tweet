const AppError = require("../helpers/error");

const _claimsToUser = (claims) => {
  return {
    firstName: claims.firstname,
    lastName: claims.lastname,
    displayPicture: "",
    status: claims.status,
    role: claims.user_role,
    uid: claims.user_id,
    email: claims.email,
  };
};
exports.verifyToken = (req, res, next) => {
  const xUserData = req.headers["x-user-data"];
  if (!xUserData) {
    return res.status(401).json({
      success: false,
      title: "No Token Provided",
      code: "OAUTH_10",
      message: "No Token Provided",
    });
  }
  let buff = Buffer.from(xUserData, "base64");
  let claims = JSON.parse(buff.toString("utf-8"));
  req.user = _claimsToUser(claims);
  return next();
};

exports.adminAccess = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "super-admin") {
    next();
  } else {
    throw new AppError(`Access Denied`, 403);
  }
};

exports.superAdminAccess = (req, res, next) => {
  if (req.user.role === "super-admin") {
    next();
  } else next(new AppError(`Access Denied`, 403));
};
