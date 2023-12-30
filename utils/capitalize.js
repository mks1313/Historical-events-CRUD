function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
module.exports = capitalize;

// router.get("/event-archive", secure, (req, res, next) => {
//   HistoricalEvent.find()
//       .populate('creator', 'username')
//       .populate('comments.author', 'username')  
//       .populate('ratings.user', 'username') 
//       .then(allEvents => {
//           const eventsWithRating = allEvents.map(event => ({
//               ...event.toObject(),
//               averageRating: helpers.calculateAverageRating(event.ratings)
//           }));
//           res.render('events/event-archive',  { events: eventsWithRating });
//       })
//       .catch(error => {
//           next(error);
//       });
// });




