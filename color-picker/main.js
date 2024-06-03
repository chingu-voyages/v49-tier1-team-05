let colorWheel = document.getElementById("colorWheel");
const rect = colorWheel.getBoundingClientRect();
// dropdown menu and monochrome
let selectedOption;
let boxOne = document.getElementById("one");
let boxTwo = document.getElementById("two");
let boxThree = document.getElementById("three");
let boxFour = document.getElementById("four");
let boxFive = document.getElementById("five");

let getButton = document.getElementById("categoryButton")
getButton.onclick = getColorPalette;
let baseColor = "#0000ff";
function getColorPalette(){
  selectedOption = document.getElementById("category").value;
  console.log("selec", selectedOption)
  if (selectedOption == "monochrome"){
    let palette = generateMonochromaticPalette(baseColor, 5);  
console.log("monochromecolors",palette);
boxOne.style.backgroundColor = palette[0];
boxTwo.style.backgroundColor = palette[1];
boxThree.style.backgroundColor = palette[2];
boxFour.style.backgroundColor = palette[3];
boxFive.style.backgroundColor = palette[4];
  }
}

// Function to convert hex to RGB
function hexToRgb(hex) {
  
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

// Function to convert RGB to hex
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Function to generate a monochromatic palette
function generateMonochromaticPalette(hex, numberOfShades) {
  let { r, g, b } = hexToRgb(hex);
  let palette = [];
  for (let i = 0; i < numberOfShades; i++) {
      let factor = i / (numberOfShades - 1);
      let newR = Math.round(r * (1 - factor) + 255 * factor);
      let newG = Math.round(g * (1 - factor) + 255 * factor);
      let newB = Math.round(b * (1 - factor) + 255 * factor);
      palette.push(rgbToHex(newR, newG, newB));
  }
  return palette;
}


// code for monochromatic ends here
console.log(rect.width);
let saturationBar = document.querySelector(".saturation");
saturationBar.style.width = `${rect.width}px`;

let lighteningBar = document.querySelector(".lightening");
lighteningBar.style.width = `${rect.width}px`;

// const hslColor = {
//   hue: 120,
//   saturation: 100,
//   lightness: 50,
// };

let arr = [];

for (let i = 0; i < 360; i++) {
  arr.push(`hsl(${i}, 100%, 50%)`);
}

arr = arr.toString();

colorWheel.style.backgroundImage = `conic-gradient(${arr})`;

colorWheel.addEventListener("click", (event) => {
  const rect = colorWheel.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const x = event.clientX - centerX;
  const y = event.clientY - centerY;

  const angle = Math.atan2(y, x) * (180 / Math.PI);
  const hue = angle + 90;

  const currentColor = `hsl(${hue}, 100%, 50%)`;
  const currentColor0Sat = `hsl(${hue}, 0%, 50%)`;

  const colorInputDiv = document.getElementById("pickerColorDiv");
  colorInputDiv.style.backgroundColor = currentColor;

  saturationBar.style.backgroundColor = currentColor;
  saturationBar.style.backgroundImage = `linear-gradient(90deg, ${currentColor0Sat}, ${currentColor})`;

  lighteningBar.style.backgroundColor = currentColor;
  lighteningBar.style.backgroundImage = `linear-gradient(90deg, )`;
});
