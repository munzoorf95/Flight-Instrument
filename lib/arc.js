

//   <path stroke-width="2" stroke="#0f0" d="M2 49 A 48 48 0 0 0 86 82"/>

function arc(start_speed,end_speed,range,radius)
{
  var a1 = ((start_speed * (Math.PI * 2)) / range) - (Math.PI / 2.0);
  var a2 = ((end_speed   * (Math.PI * 2)) / range) - (Math.PI / 2.0);
  var x1;
  var y1;
  var x2;
  var y2;
  var cx = 50.0;
  var cy = 50.0;
  x1 = cx + radius * Math.cos(a1);
  y1 = cy + radius * Math.sin(a1);
  x2 = cx + radius * Math.cos(a2);
  y2 = cy + radius * Math.sin(a2);


  return {
    radius : radius,
    x1 : x1,
    y1 : y1,
    x2 : x2,
    y2 : y2
  };
}

// <path stroke-width="2" stroke="#0f0" d="M13.72 81.43 A 48 48 0 0 0 86.27 81.43"/>
function arc_path(pos)
{
  var d = "M";
  d += pos.x2.toFixed(2) + " ";
  d += pos.y2.toFixed(2) + " ";
  d += "A ";
  d += pos.radius.toFixed(2) + " ";
  d += pos.radius.toFixed(2) + " ";
  d += "0 0 0 ";
  d += pos.x1.toFixed(2) + " ";
  d += pos.y1.toFixed(2);

  return d;
}

function makeLimitArcs(
    range,
    radius,
    stall_flaps,
    max_flaps,
    stall_clean,
    max_cruise,
    max_caution,
    never_exceed
)
{
  var p;
  var green;
  var yellow;
  var red;
  var white;
  var s;

  p = arc(stall_clean,max_cruise,range,radius);
  green = '<path stroke-width="3" stroke="#0f0" d="' + arc_path(p) + '"/>';

  p = arc(max_cruise,max_caution,range,radius);
  yellow = '<path stroke-width="3" stroke="#ff0" d="' + arc_path(p) + '"/>';

  p = arc(never_exceed-1,never_exceed+1,range,radius);
  red = '<path stroke-width="3" stroke="#f00" d="' + arc_path(p) + '"/>';

  p = arc(stall_flaps,max_flaps,range,radius-3);
  white = '<path stroke-width="3" stroke="#fff" d="' + arc_path(p) + '"/>';

  return {
    green : green,
    yellow : yellow,
    red : red,
    white : white
  };
}

var range       = 220;
var radius      = 48;
var stall_flaps = 50;
var max_flaps   = 100;
var stall_clean = 80;
var max_cruise  = 140;
var max_caution = 160;
var never_exceed = 160;

var s = makeLimitArcs(range,radius,stall_flaps,max_flaps,stall_clean,max_cruise,max_caution,never_exceed);
console.log(s.green);
console.log(s.yellow);
console.log(s.white);
console.log(s.red);
