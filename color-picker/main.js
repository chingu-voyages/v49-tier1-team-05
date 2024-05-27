let colorWheel = document.getElementById("colorWheel");
const rect = colorWheel.getBoundingClientRect();

let saturationBar = document.querySelector(".saturation");

let lighteningBar = document.querySelector(".lightening");

let slider = document.querySelector(".slider");
const sliderBounds = slider.getBoundingClientRect();
saturationBar.style.width = `${rect.width}px`;
lighteningBar.style.width = `${rect.width}px`;
let sbounds = saturationBar.getBoundingClientRect();
let lbounds = lighteningBar.getBoundingClientRect();
let unitOfColor = (sbounds.width - sliderBounds.width) / 100;

// slider.style.width = `${unitOfColor}px`;

console.log("sbounds");
console.log(sbounds);

console.log("lbounds");
console.log(lbounds);

// console.log("sliderbounds");
// console.log(sliderBounds);
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
  const currentColor0Ligt = `hsl(${hue}, 50%, 0%)`;
  console.log(hue);
  const currentColor100Ligt = `hsl(${hue}, 50%, 100%)`;

  const colorInputDiv = document.getElementById("pickerColorDiv");
  colorInputDiv.style.backgroundColor = currentColor;

  saturationBar.style.backgroundColor = currentColor;
  saturationBar.style.backgroundImage = `linear-gradient(90deg, ${currentColor0Sat}, ${currentColor})`;

  lighteningBar.style.backgroundColor = currentColor;
  lighteningBar.style.backgroundImage = `linear-gradient(90deg, ${currentColor0Ligt}, ${currentColor100Ligt})`;
});

let mouseDown = 0;

slider.addEventListener("mousedown", () => {
  mouseDown = 1;
});

window.addEventListener("mouseup", () => {
  console.log("mouse up");
  mouseDown = 0;
});

window.addEventListener("mousemove", (event) => {
  if (mouseDown == 1) {
    let sliderBounds = slider.getBoundingClientRect();
    if (event.x < sbounds.x + sliderBounds.width / 2) {
      slider.style.left = `-1px`;
    } else if (
      event.x > sbounds.x &&
      event.x < sbounds.x + sbounds.width - sliderBounds.width / 2
    ) {
      let currentLocation = event.x - sbounds.x - sliderBounds.width / 2;
      // console.log(currentLocation);
      let saturation = Math.floor(currentLocation / unitOfColor);
      pick;
      console.log(currentLocation / unitOfColor);
      slider.style.left = `${currentLocation}px`;
    }
  }
});
