var canvas = document.getElementById('backgroundCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth * 2; // Ajusta según sea necesario
var height = canvas.height = window.innerHeight * 2;


function Pixel( x, y ) {
  this.x = x;
  this.y = y;
  this.hue = Math.floor( Math.random() * 360 );
  var direction = Math.random() > 0.5 ? -1 : 1;
  this.velocity = ( Math.random() * 30 + 20 ) * 0.01 * direction;
}

Pixel.prototype.update = function() {
  this.hue += this.velocity;
};

Pixel.prototype.render = function( ctx ) {
  var hue = Math.round( this.hue );
  ctx.fillStyle = 'hsl(' + hue + ', 100%, 50% )';
  ctx.fillRect( this.x, this.y, 1, 1 );
}

var pixels = [];

for (var x = 0; x < width; x++) {
  for (var y=0; y< height; y++) {
    pixels.push(new Pixel(x, y));
  }
}

function animate() {
  pixels.forEach( function( pixel ) {
    pixel.update();
    pixel.render( ctx );
  });
  requestAnimationFrame( animate );
}

animate();
