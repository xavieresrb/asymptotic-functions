- https://gist.github.com/jrc03c/9057153b5f06cbdcdab8cf08087d3456
- https://www.youtube.com/watch?v=gw_TR1tycWQ

```js
var x, y, z, a, b, c, dt;
var points;

function setup() {
  createCanvas(600, 600, WEBGL);

  points = [];

  x = 0.01;
  y = 0;
  z = 0;

  a = 10;
  b = 28;
  c = 8 / 3;

  dt = 0.015;
}

function draw() {
  var dx = a * (y - x) * dt;
  var dy = (x * (b - z) - y) * dt;
  var dz = (x * y - c * z) * dt;

  x += dx;
  y += dy;
  z += dz;

  if (points.length > 500) points.splice(0, 1);
  points.push(createVector(x, y, z));

  rotateY(frameCount * 0.01);
  camera(0, 0, 500);
  scale(15);
  ambientLight(255);

  points.forEach(function(p) {
    push();
    translate(p.x, p.y, p.z);
    sphere(0.1);
    pop();
  });
}

function mousePressed() {
  setup();
}
```
