module.exports = (req, res, next) => {
  
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  res.locals.isLoggedIn = true; 
  next();
};

