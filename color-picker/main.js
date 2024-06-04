let colorWheel = document.getElementById("colorWheel");
const rect = colorWheel.getBoundingClientRect();

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


//Color Palette Start

// Function to generate a random color NEED to Conect to the Color Wheel to generate monochromatic colors and triad colors
function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate the color palette
function generateColorPalette() {
  const colorPalette = document.getElementById('colorPalette');
  colorPalette.innerHTML = '';
//loop to generate 5 random colors
  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor(); //function needs to generate a specific color palette not random
    const colorBox = document.createElement('div'); //create a new div to hold the color and stores it in the colorBox variable
    colorBox.classList.add('colorBox'); //add the colorBox class to the colorBox variable
    colorBox.style.backgroundColor = color; //set the background color of the colorBox variable to the color variable
    colorBox.setAttribute('title', color); //set the title attribute of the colorBox variable to the color variable
    colorPalette.appendChild(colorBox); //append the colorBox variable to the colorPalette variable
  }
}

// Generate the initial color palette
generateColorPalette();

// Regenerate the color palette when clicking on any color box - also need to connect to the Color Wheel
document.getElementById('colorPalette').addEventListener('click', generateColorPalette);


//Color Palette End

