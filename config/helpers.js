function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return {
      average: null,
      count: 0
    }
  }

  const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
  const averageRating = totalRating / ratings.length;

  return {
    average: parseFloat(averageRating.toFixed(2)),
    count: ratings.length
  };
}

module.exports = {
  calculateAverageRating,
};

  