module.exports.production =
  process.env.NODE_ENV === "development" ? false : true;
