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
