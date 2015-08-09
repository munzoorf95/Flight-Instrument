"use strict";

const altimeter_template = `<svg id="prefix-altimeter" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 100 100">
  <rect x="0" y="0" width="100" height="100" fill="#000"/>
  <ellipse stroke-width="0.5" cx="50" cy="50" rx="49" ry="49" stroke="#fff"/>
  <g id="prefix-altimeter-needle" >
    <line stroke="#fff" stroke-width="2" x1="0" y1="0" x2="45" y2="0"/>
  </g>
  <text id="prefix-altimeter-drum" text-anchor="middle" fill="#fff" x="50" y="36" font-family="sans-serif" font-size="10">00000</text>
  <ellipse cx="50" cy="50" rx="4" ry="4" fill="#444"/>
  <g stroke="#fff" fill="#fff" stroke-width="0.5" font-family="sans-serif" font-size="8">
    <line stroke-width="1.0" x1="50.00"y1="10.00"x2="50.00"y2="1.00"/>
    <text x="50.00" y="16.75" text-anchor="middle">0</text>
    <line x1="55.64" y1="5.35" x2="56.14" y2="1.39"/>
    <line x1="61.19" y1="6.41" x2="62.19" y2="2.54"/>
    <line x1="66.57" y1="8.16" x2="68.04" y2="4.44"/>
    <line x1="71.68" y1="10.57" x2="73.61" y2="7.06"/>
    <line stroke-width="1.0" x1="73.51" y1="17.64" x2="78.80" y2="10.36"/>
    <text x="71" y="22.5" text-anchor="middle">1</text>
    <line x1="80.80" y1="17.20" x2="83.54" y2="14.28"/>
    <line x1="84.67" y1="21.32" x2="87.76" y2="18.77"/>
    <line x1="87.99" y1="25.89" x2="91.37" y2="23.74"/>
    <line x1="90.72" y1="30.84" x2="94.34" y2="29.14"/>
    <line stroke-width="1.0" x1="88.04" y1="37.64" x2="96.60" y2="34.86"/>
    <text x="85" y="41" text-anchor="middle">2</text>
    <line x1="94.20" y1="41.57" x2="98.13" y2="40.82"/>
    <line x1="94.91" y1="47.17" x2="98.90" y2="46.92"/>
    <line x1="94.91" y1="52.83" x2="98.90" y2="53.08"/>
    <line x1="94.20" y1="58.43" x2="98.13" y2="59.18"/>
    <line stroke-width="1.0" x1="88.04" y1="62.36" x2="96.60" y2="65.14"/>
    <text x="85" y="65" text-anchor="middle">3</text>
    <line x1="90.72" y1="69.16" x2="94.34" y2="70.86"/>
    <line x1="87.99" y1="74.11" x2="91.37" y2="76.26"/>
    <line x1="84.67" y1="78.68" x2="87.76" y2="81.23"/>
    <line x1="80.80" y1="82.80" x2="83.54" y2="85.72"/>
    <line stroke-width="1.0" x1="73.51" y1="82.36" x2="78.80" y2="89.64"/>
    <text x="70.5" y="82" text-anchor="middle">4</text>
    <line x1="71.68" y1="89.43" x2="73.61" y2="92.94"/>
    <line x1="66.57" y1="91.84" x2="68.04" y2="95.56"/>
    <line x1="61.19" y1="93.59" x2="62.19" y2="97.46"/>
    <line x1="55.64" y1="94.65" x2="56.14" y2="98.61"/>
    <line stroke-width="1.0" x1="50.00" y1="90.00" x2="50.00" y2="99.00"/>
    <text x="50" y="88" text-anchor="middle">5</text>
    <line x1="44.36" y1="94.65" x2="43.86" y2="98.61"/>
    <line x1="38.81" y1="93.59" x2="37.81" y2="97.46"/>
    <line x1="33.43" y1="91.84" x2="31.96" y2="95.56"/>
    <line x1="28.32" y1="89.43" x2="26.39" y2="92.94"/>
    <line stroke-width="1.0" x1="26.49" y1="82.36" x2="21.20" y2="89.64"/>
    <text x="29" y="82" text-anchor="middle">6</text>
    <line x1="19.20" y1="82.80" x2="16.46" y2="85.72"/>
    <line x1="15.33" y1="78.68" x2="12.24" y2="81.23"/>
    <line x1="12.01" y1="74.11" x2="8.63" y2="76.26"/>
    <line x1="9.28" y1="69.16" x2="5.66" y2="70.86"/>
    <line stroke-width="1.0" x1="11.96" y1="62.36" x2="3.40" y2="65.14"/>
    <text x="15" y="65" text-anchor="middle">7</text>
    <line x1="5.80" y1="58.43" x2="1.87" y2="59.18"/>
    <line x1="5.09" y1="52.83" x2="1.10" y2="53.08"/>
    <line x1="5.09" y1="47.17" x2="1.10" y2="46.92"/>
    <line x1="5.80" y1="41.57" x2="1.87" y2="40.82"/>
    <line stroke-width="1.0" x1="11.96" y1="37.64" x2="3.40" y2="34.86"/>
    <text x="15" y="41" text-anchor="middle">8</text>
    <line x1="9.28" y1="30.84" x2="5.66" y2="29.14"/>
    <line x1="12.01" y1="25.89" x2="8.63" y2="23.74"/>
    <line x1="15.33" y1="21.32" x2="12.24" y2="18.77"/>
    <line x1="19.20" y1="17.20" x2="16.46" y2="14.28"/>
    <line stroke-width="1.0" x1="26.49" y1="17.64" x2="21.20" y2="10.36"/>
    <text x="29" y="22.75" text-anchor="middle">9</text>
    <line x1="28.32" y1="10.57" x2="26.39" y2="7.06"/>
    <line x1="33.43" y1="8.16" x2="31.96" y2="4.44"/>
    <line x1="38.81" y1="6.41" x2="37.81" y2="2.54"/>
    <line x1="44.36" y1="5.35" x2="43.86" y2="1.39"/>
  </g>
</svg>
`;

let prefix;
if (process.argv.length < 3) {
  console.log("<!-- no prefix specifed, generating random -->");
  prefix = 'gg' + (Math.random() * 1000).toFixed(0) + '-';
}
else {
  prefix = process.argv[2];
}
console.log("<!-- ID = "+prefix+" -->");
let at = altimeter_template.replace(/prefix-/g,prefix);

// output the prefixed string
console.log(at);
