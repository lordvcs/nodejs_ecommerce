function auth(req, res, next) {
  /**
   * Make sure the user is authenticated
   *
   * If user is authenticated pass control to next middleware
   * else redirect to the home page
   */
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function nonAuth(req, res, next) {
  /**
   * Make sure the user is not authenticated
   *
   * If user is not authenticated pass control to next middleware
   * else redirect to the home page
   */
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = {
  auth,
  nonAuth,
};
