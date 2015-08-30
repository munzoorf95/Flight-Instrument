"use strict";

function ticks(parent) {
  "use strict";
  var  r3 = 45.0;
  var  r1 = 40.0;
  var  r2 = 49.0;
  var  cx = 50.0;
  var  cy = 50.0;
  var  a  = 270.0 * (PI/180.0);
  var  da = PI / 25;
  var  x1 = cos(a) * r1 + cx;
  var  y1 = sin(a) * r1 + cy;
  var  x2 = cos(a) * r2 + cx;
  var  y2 = sin(a) * r2 + cy;
  var  index;
  var s;

  index = 0;
  for(var i=0;i<50;++i) {
    if ((i % 5) == 0) {
      x1 = cos(a) * r1 + cx;
      y1 = sin(a) * r1 + cy;
      x2 = cos(a) * r2 + cx;
      y2 = sin(a) * r2 + cy;
      s = "<line stroke-width='1.0' x1='" + x1 + " y1='" + y1 + "' x2='" + x2 + "' y2='" y2 + "'>";
      index++;
    }
    else {
      x1 = cos(a) * r3 + cx;
      y1 = sin(a) * r3 + cy;
      x2 = cos(a) * r2 + cx;
      y2 = sin(a) * r2 + cy;
      s = "<line stroke-width='1.0' x1='" + x1 + " y1='" + y1 + "' x2='" + x2 + "' y2='" y2 + "'>";
    }
    parent.innerHTML = parent.innerHTML + s;
    a += da;
  }
}
