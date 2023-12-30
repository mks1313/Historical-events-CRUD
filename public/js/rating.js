// rating.js
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
    return Number.isFinite(numericValue) && numericValue >= 1 && numericValue <= 5;
  }
  
  function rateEvent(rating) {
    document.getElementById('rating').value = rating;
    fillStars(rating);
    calculateRating();
  }

  function fillStars(count) {
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        star.checked = index < count;
    });
}






