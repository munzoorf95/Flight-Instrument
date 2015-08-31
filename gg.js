; /*eslint no-extra-semi:0 */
(function() {
  'use strict';

  function pad(f, size,fract){ return ('000000000' + f.toFixed(fract)).substr(-size); }


  /**
    create an altimeter
    @param global reference to global object (usually document)
    @param parent reference to parent element, such as a div
    @param altimeterID id to attach or reference to existing svg
    @param draw true = draw the altimeter, false = assume static draw
    @return reference to altimeter object
  */
  function Altimeter(global,parent,altimeterId,draw) {
    var altimeter;
    var needle;
    var drum;
    var pwindow;

    if (draw) {
      drawAltimeter(global, parent, altimeterId);
    }
    altimeter = global.querySelector('#' + altimeterId);
    needle    = global.querySelector('#' + altimeterId + '-needle');
    drum      = global.querySelector('#' + altimeterId + '-drum');
    pwindow   = global.querySelector('#' + altimeterId + '-pwin');
    return {
      set : function(altitude) {
        if (altitude >= 999999) {
          altitude = 999999;
        }
        var d = (altitude % 1000) * (360.0 / 1000.0) - 90;
        drum.innerHTML = pad(altitude,6,0);
        needle.setAttribute('transform','translate(50,50),rotate(' + d + ')');
      },
      setPressure : function(pressure) {
        pwindow.innerHtml = pad(pressure,5,2);
      },
      resize : function(size) {
        var s = size.toString();
        altimeter.setAttribute('width' ,s);
        altimeter.setAttribute('height',s);
      }
    };
  }

  function Airspeed(global,parent,airspeedId,draw) {
    var airspeed = document.querySelector('#' + airspeedId);
    var needle   = document.querySelector('#' + airspeedId + '-needle');
    return {
      set : function(knots) {
        if (knots >= 230) {
          knots = 230;
        }
        var d = knots * (360.0 / 230.0)-90.0;
        needle.setAttribute('transform','translate(50,50),rotate(' + d + ')');
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

  // x position for altitude numbers
  var tx=[ 50,71,85,85,70.5,50,29,15,15,29];
  // y position for altitude numbers
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

  var t2 = {
    name : 'text',
    attr : [
      ["fill","#fff"],
      ['x','50'],
      ['y','66'],
      ["font-family",'sans-serif'],
      ['font-size','6'],
      ['text-anchor','middle']
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

    e = gg_createElementNS(global,ns,t2.name,t2.attr,id + '-pwin');
    e.innerHTML = pad(29.92,5,2);
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
