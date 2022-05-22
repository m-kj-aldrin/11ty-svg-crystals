module.exports.production =
  process.env.NODE_ENV === "dev" ? false : true;
