export function toGiveColorsFromAI(palette) {
  // const rgbToHex = (r, g, b) =>
  //   ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

  // const rgbStrToHex = (rgb) =>
  //   "#" +
  //   rgb
  //     .match(/\d+/g)
  //     .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
  //     .join("");
  // const selectedOption = document.getElementById("category").value;

  // if (selectedOption == "monochrome") {
  //   const color =
  //     document.getElementById("pickerColorDiv").style.backgroundColor;

  //   const extractRgb = (str) => [str.replace(/rgb|\(|\)/g, "")];
  //   const pickColor = rgbStrToHex(color);
  //   palette = generateMonochromaticPalette(pickColor, 5);
  // }
  // displayPalette(palette);

  // function hexToRgb(hex) {
  //   hex = hex.replace(/^#/, "");
  //   let bigint = parseInt(hex, 16);
  //   let r = (bigint >> 16) & 255;
  //   let g = (bigint >> 8) & 255;
  //   let b = bigint & 255;
  //   return { r, g, b };
  // }

  // // Function to generate a monochromatic palette
  // function generateMonochromaticPalette(hex, numberOfShades) {
  //   let { r, g, b } = hexToRgb(hex);
  //   let palette = [];
  //   for (let i = 0; i < numberOfShades; i++) {
  //     let factor = i / (numberOfShades - 1);
  //     let newR = Math.round(r * (1 - factor) + 255 * factor);
  //     let newG = Math.round(g * (1 - factor) + 255 * factor);
  //     let newB = Math.round(b * (1 - factor) + 255 * factor);
  //     palette.push(rgbToHex(newR, newG, newB));
  //   }
  //   palette = palette.map((c) => `#${c}`);
  //   return palette;
  // }

  // function displayPalette(palette) {
  //   // dropdown menu and monochrome
  //   let boxOne = document.getElementById("one");
  //   let boxTwo = document.getElementById("two");
  //   let boxThree = document.getElementById("three");
  //   let boxFour = document.getElementById("four");
  //   let boxFive = document.getElementById("five");
  //   boxOne.style.backgroundColor = palette[0];
  //   boxTwo.style.backgroundColor = palette[1];
  //   boxThree.style.backgroundColor = palette[2];
  //   boxFour.style.backgroundColor = palette[3];
  //   boxFive.style.backgroundColor = palette[4];
  // }
}
