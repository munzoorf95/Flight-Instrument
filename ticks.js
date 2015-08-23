function ticks() {
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
      // <line stroke-width='%.1f' x1='%.2f' y1='%.2f' x2='%.2f' y2='%.2f'/>\n",sw,x1,y1,x2,y2);
      line = "<line ";
      line += "stroke_width='1.0' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      index++;
    }
    else {
      x1 = Math.cos(a) * r3 + cx;
      y1 = Math.sin(a) * r3 + cy;
      x2 = Math.cos(a) * r2 + cx;
      y2 = Math.sin(a) * r2 + cy;
      line = "<line ";
      line += "stroke_width='0.5' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "y1='" + y1.toFixed(2) + "' ";
      line += "x2='" + x2.toFixed(2) + "' ";
      line += "y2='" + y2.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
      line += "x1='" + x1.toFixed(2) + "' ";
    }
    console.log(line);
    a += da;
  }
}
ticks();
