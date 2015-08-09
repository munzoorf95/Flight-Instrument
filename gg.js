; /*eslint no-extra-semi:0 */
(function() {
  'use strict';

  function pad(f, size){ return ('000000000' + f.toFixed(0)).substr(-size); }

  // create altimeter
  function Altimeter(altimeterId) {
    var altimeter = document.querySelector('#' + altimeterId);
    var needle = document.querySelector( '#' + altimeterId + '-needle');
    var drum = document.querySelector( '#' + altimeterId + '-drum');
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
