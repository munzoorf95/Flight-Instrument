# SVG Based Aircraft Instruments

![Instrument Panel](https://github.com/dmh2000/svg-ac-instruments/svg-ac.png, "Instrument Panel")

[Live Demo](https://dmh2000.github.io/svgac.html)

[API Documentation](https://dmh2000.github.io/svg-ac-inst/doc/index.html)

[Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)
is a file format for rendering images using vectors rather than a bitmap. This repo is less about
how to construct an image using svg, than it is how to use svg with javascript on a web page. [Go here to
learn more about the svg file format](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial).

SVG images have some of advantages over jpeg or ping images for use on web pages:
* xml text rather than complex binary
* discrete parts of the image can be manipulated on a web page using the browser SVG API and Javascript.
* scales cleanly when resized, either up or down, vs an image resize which can be pixelated or blurry

An SVG image can be included on a web page in a couple of ways. The image can be specified using an 'img' tag, or the xml text of the image can be included inline in the HTML. If all you need is to have an image that will be resized, then using the 'img' tag is a simple way to go. However, including using 'img' limits the modifications your javascript can make to the image. Basically the same set of attributes as any other image. The discrete parts of the image cannot be referenced. [Restrictions](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_as_an_Image)

If the actual svg xml is included inline in the HTML, then its global and discrete components can be referenced using the DOM API and Javascript. That's the approach this tutorial takes.

## Simple Example

The following html code draws a 100x100 pixel black box with a white circle in it
* start with an svg tag
* include the namespace definition (xmlns attribute) required for svg images
* set a width and height

Insert the HTML into the body somewhere:

    <!doctype html>
    <html>
    <body>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect x="0" y="0" width="100" height="100" fill="#000"/>
    <ellipse cx="50" cy="50" rx="20" ry="20" stroke="#fff"/>
    </svg>
    <input type='button' value='expand' onclick='resizeSvg();'></>
    </body>
    </html>

Now lets add a button to resize the image:

    <!doctype html>
    <html>
    <body>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect x="0" y="0" width="100" height="100" fill="#000"/>
        <ellipse cx="50" cy="50" rx="20" ry="20" stroke="#fff"/>
    </svg>
    <input type='button' value='expand' onclick='resizeSvg();'/>
    <script>
        function resizeSvg() {
            var svg = document.querySelector("svg");
            svg.setAttribute('width','400');
            svg.setAttribute('height','400');
       }
    </script>
    </body>
    </html>

Click the button. Oops, the button moves but the image isn't resized. Or is it?
The problem is that the width/height attributes of the svg tag do not specify the
internal scale of units of the image components. Instead they just say how much space
the image takes up. Internally, unless you specify a different unit scale, it uses
sizes in pixels of the elements. The way to fix that is to specify that the image has an
internal unit scale that is independent of the image width/height. In this case use 100x100. To do that,
add the [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute to the svg tag.
Note MDN describes the viewbox a little differently but the effect is the same.

    <!doctype html>
    <html>
    <body>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"  viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill="#000"/>
        <ellipse cx="50" cy="50" rx="20" ry="20" stroke="#fff"/>
    </svg>
    <input type='button' value='expand' onclick='resizeSvg();'/>
    <script>
        function resizeSvg() {
            var svg = document.querySelector("svg");
            svg.setAttribute('width','400');
            svg.setAttribute('height','400');
        }
    </script>
    </body>
    </html>

Now the resize works. Try it [here](https://jsbin.com/foqiyu/edit?html,output). Notice how cleanly the image appears after zooming. If you zoomed a single jpg or png image it would be pixelated.

## Aircraft Instruments

The implementations of the gauges in this collection have two options: include the svg element for the gauge in the html (static draw) and attach to it, or draw the svg on the client side (client draw). In both cases, once the svg is loaded or generated, the javascript to control them are the same. Each gauge has some functions in common and some functions unique to the gauge type.

### svg_ac_inst
Include the script in your html.

    <script src="svg_ac_inst.js"></script>

The script adds a global var 'svc_ac_inst' to the window object.
That variable is an object that contains 6 member functions:
* function __Airspeed__(parent,id,draw,options) -> AirspeedInstance
* function __Altimeter__(parent,id,draw)        -> AltimeterInstance
* function __Attitude__(parent,id,draw)         -> AttitudeInstance
* function __Heading__(parent,id,draw)          -> HeadingInstance
* function __Turn__(parent,id,draw)             -> TurnInstance
* function __VSI__(parent,id,draw)              -> VSIInstance

Each of these functions is a factory that creates instances of the instrument. To
instantiate an instrument, call the factory function. The factory function returns
an object that represents an instance of that instrument type. The objects returned
have two or more member functions that are used to manipulate the instrument image.

    var airspeed = svg_ac_inst.Airspeed(parent,id,draw,options);

For all of these functions, the first three parameters are the same:
* __parent__ :
  parent element that contains, or will contain, the svg XML for the given Instruments.
  typically a DIV.
* __id__ :
  DOM id of the svg.  For static svg included in the HTML, the svg should have the
  matching id attribute in the svg tag. For client draw images, the id will be
  given to the generate svg element. This id is also used to locate the 'moving parts' of the instrument,
  such as needle or dial. In this case the id is a prefix concatenated with a suffix. If you are using static draw,
  you need to modify the html to have the correct id prefix and suffix as shown in the example svg images
  in example/static/*.svg./
* __draw__ :
  if true, the svg is generated completely on the client side
  if false, the function will expect the static svg image with the given id
  to be included in the HTML statically.

_Note on static vs client draw_ : the javascript file is included identically if you use static svg or client draw. So if you want to use a standard instrument display as implemented here, then its usually better to use client draw and then you don't need to include the svg is your html, keeping it more compact. However if you wish to do some direct customization of the svg for an instrument without changing the javascript, static draw might work for you.

The Airspeed function is a special case that has an 'options' parameter for customization. 'options' is an object that
specifies the range of the various standard arcs on the airspeed indicator.

    var airspeed_options =
    {
      range  : 220,      // maximum airspeed on the dial (needs to be evenly divisible by 22)
      green  :[80,140],  // green arc from clean stall to max cruise
      yellow :[140,160], // yellow arc from max cruise to never-exceed
      red    :160,       // red arc from never-exceed to never-exceed
      white  :[50,100]   // white arc for stall-flaps to max-flaps
    };

### AltimeterInstance
This instance has two functions:
<ul>
<li>function set(altitude,pressure)</li>
  <ul>
  <li>altitude : in units (feet or meters, doesn't matter)</li>
  <li>pressure : altimeter setting in units (inches/Hg or millibars)</li>
  </ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

### AirspeedInstance
This instance has two functions:
<ul>
<li>function set(airspeed)</li>
  <ul>
  <li>airpeed : in knots</li>
  </ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

### AttitudeInstance
This instance has two functions:
<ul>
<li>function set(pitch,roll)</li>
  <ul>
  <li>pitch : in degrees, positive nose up</li>
  <li>roll : in degrees, positive right bank</li>
</ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

### HeadingInstance
This instance has two functions:
<ul>
<li>function set(heading)</li>
  <ul>
  <li>pitch : in degrees</li>
  </ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

### TurnInstance
This instance has two functions:
<ul>
<li>function set(turn_rate,lateral_accel)</li>
  <ul>
  <li>turn_rate : degrees per second</li>
  <li>lateral_accel : arbitrary units for ball deflection, -10 is full left, +10 is full right</li>
  </ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

### VSIInstance
This instance has two functions:
<ul>
<li>function set(climb_rate)</li>
  <ul>
  <li>climb_rate : in feet per minute</li>
  </ul>
<li>function resize(size)</li>
  <ul>
  <li>size : size of the instrument in pixels (instruments are always square)
  </ul>
</ul>

## Examples
### Static Examples
/examples/static has an example of handling each instrument type with static svg, plus an example, 'panel', that combines them all together in a simulated instrument panel, as well as svg image files for each instrument type that can be inserted into your html.
### Client Examples
/examples/clientc has an example of handling each instrument type with client draw svg, plus an example, 'panel', that combines them all together in a simulated instrument panel

_Note_ : the 'panel' example also has basic resizing in which the instruments are sized to fit the window size. Resizing the window will resize the instruments. It is a good example of how the svg image is sharp regardless of resizing.

