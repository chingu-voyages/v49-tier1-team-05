import { colorSchemeFinder } from "./groq";
import "./color-wheel";
// this is the rgb value and hex values (will only be set after hsl value is set)
let rgb = [0, 0, 0];
// hex value
let hex = "";
// this is the array of colors that will be returned from the AI
let colors = [];

// new line
const handleFormSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let mood = formData.get("mood");
  let audience = formData.get("audience");
  let usage = formData.get("usage");
  let keywords = formData.get("keywords");
  const dropdown = document.getElementById("category").value;
  const string = await colorSchemeFinder(
    mood,
    audience,
    usage,
    keywords,
    dropdown
  );
  console.log(string);
  string.replace(/json/gi, "");
  const jsonRegex = /({.*})/gs;
  const match = jsonRegex.exec(string);
  const json = match ? match[1] : "";
  console.log(json);
  const colorSchemeJson = JSON.parse(json);

  colors = colorSchemeJson.colorScheme.colors;
  // toGiveColorsFromAI(colors);
  displayPalette(colors);
};
const form = document.getElementById("askAIForm");
form.addEventListener("submit", handleFormSubmit);

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

// Generating colors through generate colors button
const generateButton = document.getElementById("categoryButton");
generateButton.onclick = generateColorPalette;
function generateColorPalette(palette) {
  const rgbToHex = (r, g, b) =>
    ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

  const rgbStrToHex = (rgb) =>
    "#" +
    rgb
      .match(/\d+/g)
      .map((x) => ("0" + parseInt(x).toString(16)).slice(-2))
      .join("");
  const selectedOption = document.getElementById("category").value;

  if (selectedOption == "monochrome") {
    const color =
      document.getElementById("pickerColorDiv").style.backgroundColor;

    // const extractRgb = (str) => [str.replace(/rgb|\(|\)/g, "")];
    const pickColor = rgbStrToHex(color);
    palette = generateMonochromaticPalette(pickColor, 5);
  } else if (selectedOption == "complementary") {
    const colorComp =
      document.getElementById("pickerColorDiv").style.backgroundColor;
    let parsedColor = parseRGB(colorComp);
    let complementary = rgbStrToHex(complementaryColor(parsedColor));
    let originalColor = rgbStrToHex(colorComp);
    palette = [
      originalColor,
      originalColor,
      complementary,
      complementary,
      "#ffffff",
    ];
  }
  displayPalette(palette);

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
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
    palette = palette.map((c) => `#${c}`);
    return palette;
  }
  function parseRGB(rgbString) {
    let rgbValues = rgbString.match(/\d+/g).map(Number);
    return rgbValues;
  }
  function complementaryColor(rgb) {
    let [r, g, b] = rgb;
    let compColor = [255 - r, 255 - g, 255 - b];
    return `rgb(${compColor[0]}, ${compColor[1]}, ${compColor[2]})`;
  }
}

function displayPalette(palette) {
  // dropdown menu and monochrome
  let boxOne = document.getElementById("one");
  let boxTwo = document.getElementById("two");
  let boxThree = document.getElementById("three");
  let boxFour = document.getElementById("four");
  let boxFive = document.getElementById("five");
  boxOne.style.backgroundColor = palette[0];
  boxOne.innerHTML = palette[0];
  boxTwo.style.backgroundColor = palette[1];
  boxTwo.innerHTML = palette[1];
  boxThree.style.backgroundColor = palette[2];
  boxThree.innerHTML = palette[2];
  boxFour.style.backgroundColor = palette[3];
  boxFour.innerHTML = palette[3];
  boxFive.style.backgroundColor = palette[4];
  boxFive.innerHTML = palette[4];
}
