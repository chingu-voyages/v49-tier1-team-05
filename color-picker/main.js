let colorWheel = document.getElementById("colorWheel");

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

  console.log(x, y);

  const angle = Math.atan2(y, x) * (180 / Math.PI);
  const hue = angle / 360; // Adjust this mapping to your needs
  console.log(`User selected hue: ${hue * 360}`);
});
