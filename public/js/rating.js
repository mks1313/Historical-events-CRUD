
  document.addEventListener('DOMContentLoaded', function () {
    const starInputs = document.querySelectorAll('.star-input');
    const starLabels = document.querySelectorAll('.star-label');

    starInputs.forEach(function (input, index) {
      input.addEventListener('change', function () {
        // Cuando se selecciona una estrella, llena todas las estrellas anteriores
        for (let i = 0; i <= index; i++) {
          starLabels[i].classList.add('filled');
        }

        // Desmarca todas las estrellas siguientes
        for (let i = index + 1; i < starLabels.length; i++) {
          starLabels[i].classList.remove('filled');
        }
      });
    });
  });
  function isValidRating(value) {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5;
}
  function rateEvent(rating) {
    document.getElementById('rating').value = rating;
    fillStars(rating);
    calculateRating();
  }

  // function fillStars(count) {
  //   const stars = document.querySelectorAll('.star');
  //   stars.forEach((star, index) => {
  //     star.classList.toggle('filled', index < count);
  //   });
  // }
  function fillStars(count) {
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        star.checked = index < count;
    });
}

  function calculateRating() {
    const selectedStars = document.querySelectorAll('.star.filled').length;
    const totalStars = 5; 
    const rating = (selectedStars / totalStars) * 5; 
    document.getElementById('calculatedRating').textContent = `Rating: ${rating.toFixed(2)}`;
  }



