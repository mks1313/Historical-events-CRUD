module.exports = (req, res, next) => {
  
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }

  next();
};
// module.exports = (req, res, next) => {
//   if (req.session.currentUser) {
//     // Si el usuario está autenticado, permite continuar con la solicitud
//     next();
//   } else {
//     // Si el usuario no está autenticado, redirige a la página de inicio de sesión
//     res.redirect("/auth/login");
//   }
// };