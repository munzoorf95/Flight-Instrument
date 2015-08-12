# gg - geezer-x Gauges

SVG based aircraft gauges

## A beginner tutorial on using SVG images + javascript to make a dynamic image on a web page

[Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)
is a file format for rendering images using vectors rather than a bitmap. This tutorial is less about
how to construct an image using svg, than it is how to use svg with javascript on a web page. [Go here to
learn more about the svg file format](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial).

SVG images have some of advantages over jpeg or ping images for us on web pages:
* xml text rather than complex binary
* discrete parts of the image can be manipulated on a web page using the browser SVG API and Javascript.
* scales cleanly when resized, either up or down.
 
An SVG image can be included on a web page in a couple of ways. The image can be specified using an 'img' tag, or the xml text of the image can be included inline in the HTML. If all you need is to have an image that will be resized, then using the 'img' tag is a simple way to go. However, including using 'img' limits the modifications your javascript can make to the image. Basically the same set of attributes as any other image. The discrete parts of the image cannot be referenced. [Restrictions](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_as_an_Image)

If the actual svg xml is included inline in the HTML, then its global and discrete components can be referenced using the DOM API and Javascript. That's the approach this tutorial takes. 

### Simple Example

The following html code draws a 100x100 pixel black box with a white circle in it
* start with an svg tag
* include the namespace definition (xmlns attribute) required for svg images
* set a width and height
 
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

Now the resize works. Notice how cleanly the image appears after zooming. If you zoomed a single jpg or png image
it would be pixelated.

### Aircraft Altimeter
Ok, now that we can include an svg on a page and do something with it, lets get a little more complex. How about drawing
a representation of an aircraft altimeter? An aircraft altimeter has a static background and some moving parts, the
needle and the altitude readout (the 'drum'). [Here is an example](https://en.wikipedia.org/wiki/Altimeter#Use_in_aircraft).
Some altimeters have 2 needles so we will leave that as an exercise for the reader.

We will explore two approaches to rendering the svg:
* construct the svg offline using an editor or graphics program like [Inkscape](https://inkscape.org) and include the
 svg xml inline in the HTML document on the server side.
* construct the svg from scratch on the client using javascript.

In both cases, once the svg is available, we will then manipulate the altimeter to vary the altitude and see how that works.

#### Aircraft Altitmeter : static svg in the HTML
 
#### Aircraft Altimeter  : generate the svg image on the client