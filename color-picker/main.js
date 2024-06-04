import { colorSchemeFinder } from "./groq";
let colorWheel = document.getElementById("colorWheel");
const rect = colorWheel.getBoundingClientRect();
let hue;
let saturation;
let lightening = 50;
// this is the rgb value and hex values (will only be set after hsl value is set)
let rgb = [0, 0, 0];
// hex value
let hex = "";

let vibe = "professional";
const handleFormSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let mood = formData.get("mood");
  let audience = formData.get("audience");
  let usage = formData.get("usage");
  let keywords = formData.get("keywords");
  console.log(await colorSchemeFinder(mood, audience, usage, keywords));
};
const form = document.getElementById("askAIForm");
form.addEventListener("submit", handleFormSubmit);

let saturationBar = document.querySelector(".saturation");
let lighteningBar = document.querySelector(".lightening");
let slider = document.querySelector(".slider");
let saturationSlider = document.getElementById("saturation-slider");
let lighteningSlider = document.getElementById("lightening-slider");

const sliderBounds = slider.getBoundingClientRect();
saturationBar.style.width = `${rect.width}px`;
lighteningBar.style.width = `${rect.width}px`;
let sbounds = saturationBar.getBoundingClientRect();
let lbounds = lighteningBar.getBoundingClientRect();
let unitOfColor = (sbounds.width - sliderBounds.width) / 100;

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
  hue = angle + 90;
  console.log(hue);
  const currentColor = `hsl(${hue}, 100%, 50%)`;
  console.log(currentColor);
  const currentColor0Sat = `hsl(${hue}, 0%, 50%)`;
  const currentColor0Ligt = `hsl(${hue}, 50%, 0%)`;
  console.log(hue);
  const currentColor50Ligt = `hsl(${hue}, 50%, 50%)`;

  const currentColor100Ligt = `hsl(${hue}, 50%, 100%)`;

  const colorInputDiv = document.getElementById("pickerColorDiv");
  colorInputDiv.style.backgroundColor = currentColor;

  saturationBar.style.backgroundColor = currentColor;
  saturationBar.style.backgroundImage = `linear-gradient(90deg, ${currentColor0Sat}, ${currentColor})`;

  lighteningBar.style.backgroundColor = currentColor;
  lighteningBar.style.backgroundImage = `linear-gradient(90deg, ${currentColor0Ligt}, ${currentColor50Ligt}, ${currentColor100Ligt})`;
});

let mouseDown = 0;

saturationSlider.addEventListener("mousedown", () => {
  mouseDown = 1;
});

lighteningSlider.addEventListener("mousedown", () => {
  mouseDown = 2;
});

window.addEventListener("mouseup", () => {
  console.log("mouse up");
  mouseDown = 0;
});

window.addEventListener("mousemove", (event) => {
  if (mouseDown == 1) {
    let sliderBounds = saturationSlider.getBoundingClientRect();
    if (event.x < sbounds.x + sliderBounds.width / 2) {
      saturationSlider.style.left = `-1px`;
    } else if (
      event.x > sbounds.x &&
      event.x < sbounds.x + sbounds.width - sliderBounds.width / 2
    ) {
      let currentLocation = event.x - sbounds.x - sliderBounds.width / 2;
      saturation = Math.floor(currentLocation / unitOfColor);
      let color = `hsl(${hue}, ${saturation}%, ${lightening}%)`;
      let colorInputDiv = document.getElementById("pickerColorDiv");
      colorInputDiv.style.backgroundColor = `${color}`;
      saturationSlider.style.left = `${currentLocation}px`;
    }
  }
  if (mouseDown == 2) {
    let sliderBounds = lighteningSlider.getBoundingClientRect();
    if (event.x < sbounds.x + sliderBounds.width / 2) {
      lighteningSlider.style.left = `-1px`;
    } else if (
      event.x > sbounds.x &&
      event.x < sbounds.x + sbounds.width - sliderBounds.width / 2
    ) {
      let currentLocation = event.x - sbounds.x - sliderBounds.width / 2;
      lightening = Math.floor(currentLocation / unitOfColor);
      let color = `hsl(${hue}, ${saturation}%, ${lightening}%)`;
      let colorInputDiv = document.getElementById("pickerColorDiv");
      colorInputDiv.style.backgroundColor = `${color}`;
      lighteningSlider.style.left = `${currentLocation}px`;

      rgb = hslToRgb(hue, saturation, lightening);
      hex = "#" + rgbToHex(...rgb).split(".")[0];
      document.getElementById("other-color-values").innerHTML = hex;
    }
  }
});

const rgbToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
