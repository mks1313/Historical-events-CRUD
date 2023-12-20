// iseditor.js
const editorMiddleware = (req, res, next) => {
    if (req.user.role === "creator") {
      next();
    } else {
         req.flash('error', 'You cannot edit or delete this event, since you are not the creator.');
         res.redirect('/events/event-archive');
    }
  };
  
  module.exports = editorMiddleware;
  