"use strict";

// polynomial to genertae X position for altitude tick labels
function txc(v) {
  var a = 49.93776 ;
  var b = 20.80345 ;
  var c = 3.488636 ;
  var d = -3.47244 ;
  var e = 0.485256 ;
  var f = -0.01936 ;
  var r = a +
          b * v +
          c * v * v +
          d * v * v *v +
          e * v * v * v * v +
          f * v * v * v * v * v;
  return r;
}

// polynomial curve fit to generate y positions for altitude labels
function tyc(v) {
  var a = 16.81014 ;
  var b = -6.0395  ;
  var c = 13.69799 ;
  var d = -2.39376 ;
  var e = 0.078351 ;
  var f = 0.003077 ;
  var r = a +
          b * v +
          c * v * v +
          d * v * v *v +
          e * v * v * v * v +
          f * v * v * v * v * v;
  return r;
}

// generate static tick elements
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
