module.exports = (req, res, next) => {
 
  if (req.session.user) {
    return res.redirect("/users/profile");
  }
  next();
};

// module.exports = (req, res, next) => {
//   if (!req.session.currentUser) {
//     // Si el usuario no está autenticado, permite continuar con la solicitud
//     next();
//   } else {
//     // Si el usuario está autenticado, redirige a la página de perfil del usuario
//     res.redirect("/users/profile");
//   }
// };
