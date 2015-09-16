"use strict";

// polynomial to genertae X position for altitude tick labels
function txc1(v) {
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
function tyc1(v) {
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

function txc2(v) {
  var a = 52.61587876;
  var b = -13.24555734;
  var c = 19.71421504 ;
  var d = -5.354185898;
  var e = 0.5068455711;
  var f = -0.01586282051;
  var r = a +
          b * v +
          c * v * v +
          d * v * v *v +
          e * v * v * v * v +
          f * v * v * v * v * v;
  return r.toFixed(2);
}

function tyc2(v) {
  // y = -4.487179543·10-4 x5 + 0.137325175 x4 - 3.35072844 x3 + 25.94222029 x2 - 59.8192774 x + 62.69090907
  var a =  62.69090907;
  var b = -59.8192774;
  var c =  25.94222029 ;
  var d =  -3.35072844;
  var e =   0.137325175;
  var f =  -0.0004487179543;
  var r = a +
          b * v +
          c * v * v +
          d * v * v *v +
          e * v * v * v * v +
          f * v * v * v * v * v;
  return r.toFixed(2);
}

// generate static tick elements
function altimeterTicks(parent) {
  "use strict";
  var r3 = 45.0;
  var r1 = 40.0;
  var r2 = 49.0;
  var cx = 50.0;
  var cy = 50.0;
  var a  = 270.0 * (Math.PI/180.0);
  var da = Math.PI / 25;
  var x1;
  var y1;
  var x2;
  var y2;
  var index;
  var e;
  var line;

  index = 0;
  for(var i=0;i<50;++i) {
    if ((i % 5) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
    }
    console.log(line);
    a += da;
  }
}

function airspeedTicks(dspeed) {
  "use strict";
  var r3 = 45.0;
  var r1 = 42.0;
  var r2 = 49.0;
  var cx = 50.0;
  var cy = 50.0;
  var a  = 270.0 * (Math.PI/180.0);
  var da = Math.PI / 22;
  var x1;
  var y1;
  var x2;
  var y2;
  var index;
  var e;
  var line;
  var speed;

  index  = 2;
  speed  = dspeed;
  for(var i=0;i<44;++i) {
    if ((i == 0)||(i==2)) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    else if ((i % 4) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
      // <text x="29" y="22.75" text-anchor="middle">9</text>
      line  = "<text ";
      line += "x='" + txc2(index) + "' ";
      line += "y='" + tyc2(index) + "' ";
      line += "text-anchor='middle'";
      line += ">";
      line += speed.toFixed(0);
      line += "</text>";
      console.log(line);
      speed += dspeed;

      index++;
    }
    else if ((i % 2) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    else {
      x1 = Math.cos(a) * r3 + cx;
      y1 = Math.sin(a) * r3 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    a += da;
  }
}

function headingTicks(parent) {
  "use strict";
  var r3 = 45.0;
  var r1 = 43.0;
  var r2 = 49.0;
  var r4 = 36.0;
  var cx = 0.0;
  var cy = 0.0;
  var a  = 270.0 * (Math.PI/180.0);
  var da = Math.PI / 36;
  var x1;
  var y1;
  var x2;
  var y2;
  var x4;
  var y4;
  var index;
  var d;
  var line;

  index = 0;
  d = 0;
  for(var i=0;i<72;++i) {
    if ((i % 6) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      x4 = Math.cos(a) * r4 + cx;
      y4 = Math.sin(a) * r4 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
      line  = "<text ";
      line += "text-anchor='middle' ";
      line += "transform='";
      line += "translate(";
      line += x4.toFixed(2) + " " + y4.toFixed(2);
      line += ") ";
      line += "rotate(";
      line += d.toFixed(0);
      line += ")' ";
      line += ">";
      line += (d / 10).toFixed(0);
      line += "</text>";
      console.log(line);
      d += 30.0;
    }
    else if ((i % 2) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    else {
      x1 = Math.cos(a) * r3 + cx;
      y1 = Math.sin(a) * r3 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }

    a += da;
  }
}
var vsi_y=[18,29, 52, 78, 88,78,52.5,27];
var vsi_x = [50,73,82,73,50,25,14,25];
function vsiTicks() {
  "use strict";
  var r3 = 45.0;
  var r1 = 40.0;
  var r2 = 49.0;
  var cx = 50.0;
  var cy = 50.0;
  var a  = 270.0 * (Math.PI/180.0);
  var da = Math.PI / 20;
  var x1;
  var y1;
  var x2;
  var y2;
  var line;
  var v;
  var index;

  index = 0;
  v = 10;
  for(var i=0;i<40;++i) {
    if ((i == 9)||(i==11)) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    else if (i==10) {
      // nothing
    }
    else if ((i % 5) == 0) {
      x1 = Math.cos(a) * r1 + cx;
      y1 = Math.sin(a) * r1 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke-width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
      line  = "<text ";
      line += "text-anchor='middle'";
      line += "x='" + vsi_x[index].toFixed(1) + "' ";
      line += "y='" + vsi_y[index].toFixed(1) + "' ";
      line += ">";
      line += v.toFixed(0);
      line += "</text>";
      console.log(line);
      index++;
    }
    else {
      x1 = Math.cos(a) * r3 + cx;
      y1 = Math.sin(a) * r3 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "/>";
      console.log(line);
    }
    a += da;
  }
}
function turnTicks() {
  "use strict";
  var r1 = 40.0;
  var r2 = 49.0;
  var cx = 50.0;
  var cy = 50.0;
  var a  = [0,16,164,180];
  var x1;
  var y1;
  var x2;
  var y2;
  var line;
  var v;
  var index;

  index = 0;
  v = 10;
  for(var i=0;i<4;++i) {
    v  = a[i] * (Math.PI / 180.0);
    x1 = Math.cos(v) * r1 + cx;
    y1 = Math.sin(v) * r1 + cy;
    x2 = Math.cos(v) * r2 + cx;
    y2 = Math.sin(v) * r2 + cy;
    line = "<line ";
    line += "stroke-width='2.0' ";
    line += "x1='" + x1.toFixed(2) + "' ";
    line += "y1='" + y1.toFixed(2) + "' ";
    line += "x2='" + x2.toFixed(2) + "' ";
    line += "y2='" + y2.toFixed(2) + "' ";
    line += "/>";
    console.log(line);
  }
}

function tick(x1,y1,x2,y2,stroke_width) {
  var line;

  line = "<line ";
  if (stroke_width) {
    line += "stroke-width='" + stroke_width + "' ";
  }
  line += "x1='" + x1.toFixed(2) + "' ";
  line += "y1='" + y1.toFixed(2) + "' ";
  line += "x2='" + x2.toFixed(2) + "' ";
  line += "y2='" + y2.toFixed(2) + "' ";
  line += "/>";

  return line;
}

function attitudeTicks() {
  "use strict";
  var r1 = 40.0;
  var r2 = 49.0;
  var r3 = 45.0;
  var cx = 50.0;
  var cy = 50.0;
  var x1;
  var y1;
  var x2;
  var y2;
  var v;

  v  =  (30.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (60.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (90.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (-30.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (-60.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (-90.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r2 + cx;
  y2 = Math.sin(v) * r2 + cy;
  console.log(tick(x1,y1,x2,y2,2));

  v  =  (10.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

  v  =  (20.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));


  v  =  (45.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

  v  =  (-10.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

  v  =  (-20.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

  v  =  (-45.0 - 90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

  v  =  (-90) * (Math.PI / 180.0);
  x1 = Math.cos(v) * r1 + cx;
  y1 = Math.sin(v) * r1 + cy;
  x2 = Math.cos(v) * r3 + cx;
  y2 = Math.sin(v) * r3 + cy;
  console.log(tick(x1,y1,x2,y2));

}
attitudeTicks();
