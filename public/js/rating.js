document.addEventListener('DOMContentLoaded', function () {
  const starInputs = document.querySelectorAll('.star-input');
  const starLabels = document.querySelectorAll('.star-label');

  starInputs.forEach(function (input, index) {
      input.addEventListener('change', function () {
          fillStars(index + 1); 
      });
  });
});

function fillStars(count) {
  const stars = document.querySelectorAll('.star-label img');
  stars.forEach((star, index) => {
      if (index < count) {
          star.src = "/images/star.png";  
      } else {
          star.src = "/images/stars.png"; 
      }
  });
}

function isValidRating(value) {
  const numericValue = parseFloat(value);
  return !isNaN(numericValue) && numericValue >= 1 && numericValue <= 5;
}

function rateEvent(rating) {
  document.getElementById('rating').value = rating;
  fillStars(rating);
  calculateRating();  
}









