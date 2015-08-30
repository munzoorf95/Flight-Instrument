; /*eslint no-extra-semi:0 */
(function() {
  'use strict';

  function pad(f, size){ return ('000000000' + f.toFixed(0)).substr(-size); }

  // create altimeter
  function Altimeter(global,parent,altimeterId,draw) {
    var altimeter;
    var needle;
    var drum;

    if (draw) {
      drawAltimeter(global, parent, altimeterId);
    }
    altimeter = global.querySelector('#' + altimeterId);
    needle    = global.querySelector( '#' + altimeterId + '-needle');
    drum      = global.querySelector( '#' + altimeterId + '-drum');
    return {
      set : function(altitude) {
        var d = (altitude % 1000) * (360.0 / 1000.0) - 90;
        drum.innerHTML = pad(altitude,6);
        needle.setAttribute('transform','translate(50,50),rotate(' + d + ')');
      },
      resize : function(size) {
        var s = size.toString();
        altimeter.setAttribute('width' ,s);
        altimeter.setAttribute('height',s);
      }
    };
  }

  function Airspeed(airspeedId) {
    var airspeed = document.querySelector('#' + airspeedId);
    var needle = document.querySelector( '#' + airspeedId + '-needle');
    return {
      set : function(knots) {
      },
      resize : function(size) {
        var s = size.toString();
        airspeed.setAttribute('width' ,s);
        airspeed.setAttribute('height',s);
      }
    };
  }

  function Heading(headingId) {
    var heading = document.querySelector('#' + headingId);
    var needle = document.querySelector( '#' + headingId + '-needle');
    return {
      set : function(degrees) {
      },
      resize : function(size) {
        var s = size.toString();
        heading.setAttribute('width' ,s);
        heading.setAttribute('height',s);
      }
    };
  }

  function Attitude(attiudeId) {
    var attitude = document.querySelector('#' + attiudeId);
    return {
      set : function(pitch,roll) {
      },
      resize : function(size) {
        var s = size.toString();
        attitude.setAttribute('width' ,s);
        attitude.setAttribute('height',s);
      }
    };
  }

  function Turn(turnId) {
    var turn = document.querySelector('#' + turnId);
    return {
      set : function(bank,lateral_acceleration) {
      },
      resize : function(size) {
        var s = size.toString();
        turn.setAttribute('width' ,s);
        turn.setAttribute('height',s);
      }
    };
  }

  function VSI(vsiId) {
    var vsi = document.querySelector('#' + vsiId);
    var needle = document.querySelector( '#' + vsiId + '-needle');
    return {
      set : function(vertical_speed) {
      },
      resize : function(size) {
        var s = size.toString();
        vsi.setAttribute('width' ,s);
        vsi.setAttribute('height',s);
      }
    };
  }

  function gg_createElementNS(global,ns,name,attr,id) {
    var e = global.createElementNS(ns,name);
    if (id) {
      e.setAttribute('id',id);
    }

    attr.forEach(function(v) {
      e.setAttribute(v[0],v[1]);
    });
    return e;
  }
/*
  <text x="50.00" y="16.75" text-anchor="middle">0</text>
  <text x="71" y="22.5" text-anchor="middle">1</text>
  <text x="85" y="41" text-anchor="middle">2</text>
  <text x="85" y="65" text-anchor="middle">3</text>
  <text x="70.5" y="82" text-anchor="middle">4</text>
  <text x="50" y="88" text-anchor="middle">5</text>
  <text x="29" y="82" text-anchor="middle">6</text>
  <text x="15" y="65" text-anchor="middle">7</text>
  <text x="15" y="41" text-anchor="middle">8</text>
  <text x="29" y="22.75" text-anchor="middle">9</text>
*/

// x
  var tx=[ 50,71,85,85,70.5,50,29,15,15,29];
// y
  var ty=[16.75,22.5,41,65,82,88,82,65,41,22.75];

  function gg_ticks(global,ns,parent) {
    "use strict";
    var  r3 = 45.0;
    var  r1 = 40.0;
    var  r2 = 49.0;
    var  cx = 50.0;
    var  cy = 50.0;
    var  a  = 270.0 * (Math.PI/180.0);
    var  da = Math.PI / 25;
    var  x1;
    var  y1;
    var  x2;
    var  y2;
    var  index;
    var  alt;
    var  e;
    var g;

    g = global.createElementNS(ns,'g');
    g.setAttribute('stroke','#fff');
    g.setAttribute('fill','#fff');
    g.setAttribute('font-family','sans-serif');
    g.setAttribute('font-size','8');
    parent.appendChild(g);

    alt   = 0;
    index = 0;
    for(var i=0;i<50;++i) {
      if ((i % 5) == 0) {
        // bold tick with number
        x1 = Math.cos(a) * r1 + cx;
        y1 = Math.sin(a) * r1 + cy;
        x2 = Math.cos(a) * r2 + cx;
        y2 = Math.sin(a) * r2 + cy;
        e = global.createElementNS(ns,'line');
        e.setAttribute('stroke-width','1');
        e.setAttribute('x1',x1);
        e.setAttribute('y1',y1);
        e.setAttribute('x2',x2);
        e.setAttribute('y2',y2);
        g.appendChild(e);
        e = global.createElementNS(ns,'text');
        e.setAttribute('x',tx[alt].toFixed(1));
        e.setAttribute('y',ty[alt].toFixed(1));
        e.setAttribute('text-anchor','middle');
        e.innerHTML = alt.toFixed(0);
        g.appendChild(e);
        alt++;
        index++;
      }
      else {
        // thin tick
        x1 = Math.cos(a) * r3 + cx;
        y1 = Math.sin(a) * r3 + cy;
        x2 = Math.cos(a) * r2 + cx;
        y2 = Math.sin(a) * r2 + cy;
        e = global.createElementNS(ns,'line');
        e.setAttribute('stroke-width','0.5');
        e.setAttribute('x1',x1);
        e.setAttribute('y1',y1);
        e.setAttribute('x2',x2);
        e.setAttribute('y2',y2);
        g.appendChild(e);
      }
      a += da;
    }
  }

  var svg = {
    name : 'svg',
    attr : [
      ['xmlns'  ,'http://www.w3.org/2000/svg'],
      ["id"     ,"gg145-altimeter"],
      ["width"  ,"400"],
      ["height" ,"400"],
      ["viewBox","0 0 100 100"]
    ]
  };

  var r1 = {
    name : 'rect',
    attr : [
      ['x','0'],
      ['y','0'],
      ['width','100'],
      ['height','100'],
      ['fill','#000']
    ]
  };

  var e1 = {
    name : 'ellipse',
    attr : [
      ["stroke" ,'#fff'],
      ['stroke-width','0.5'],
      ['cx','50'],
      ['cy','50'],
      ['rx','49'],
      ['ry','49']
    ]
  };

  var t1 = {
    name : 'text',
    attr : [
      ["stroke" ,'#000'],
      ['stroke-width','0.1'],
      ["fill","#fff"],
      ['x','50'],
      ['y','36'],
      ["font-family",'sans-serif'],
      ['font-size','10'],
      ['text-anchor','middle']
    ]
  };

  var g1 = {
    name : 'g',
    attr: [

    ]
  };

  var l1 = {
    name : 'path',
    attr : [
      ['d',"M0,0 L0,0.5 L40,1 L45,0 L40,-1 L0,-0.5 L0,0 z"],
      ['stroke','#fff'],
      ['fill','#fff']
    ]
  };

  var e2 = {
    name : 'ellipse',
    attr : [
      ['cx','50'],
      ['cy','50'],
      ['rx','4'],
      ['ry','4'],
      ['fill','#444']
    ]
  };

  var g2 = {
    name : 'g',
    attr : [
      ['stroke','#fff'],
      ['fill','#fff'],
      ['stroke-width','0.5'],
      ['font-family','sans-serif'],
      ['font-size','8']
    ]
  };

  function drawAltimeter(global,parent,id) {
    var ns = "http://www.w3.org/2000/svg";
    var e;
    var g;
    var l;

    svg = gg_createElementNS(global,ns,svg.name,svg.attr,id);
    parent.appendChild(svg);

    e = gg_createElementNS(global,ns,r1.name,r1.attr);
    svg.appendChild(e);

    e = gg_createElementNS(global,ns,e1.name,e1.attr);
    svg.appendChild(e);

    e = gg_createElementNS(global,ns,t1.name,t1.attr,id + '-drum');
    svg.appendChild(e);

    g = gg_createElementNS(global,ns,g1.name,g1.attr,id + '-needle');
    svg.appendChild(g);

    l = gg_createElementNS(global,ns,l1.name,l1.attr);
    g.appendChild(l);

    e = gg_createElementNS(global,ns,e2.name,e2.attr);
    svg.appendChild(e);

    g = gg_createElementNS(global,ns,g2.name,g2.attr);
    svg.appendChild(g);

    gg_ticks(global,ns,g);
  }

  // exports
  var gg = {
    Altimeter:Altimeter,
    Airspeed:Airspeed,
    Heading:Heading,
    Attitude:Attitude,
    Turn:Turn,
    VSI:VSI
  };
  // attach to parent object (usually 'window')
  this.gg = gg;
}.call(this));
