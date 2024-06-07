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
// this is the array of colors that will be returned from the AI
let colors = [];

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let mood = formData.get("mood");
  let audience = formData.get("audience");
  let usage = formData.get("usage");
  let keywords = formData.get("keywords");
  const string = await colorSchemeFinder(mood, audience, usage, keywords);
  const jsonRegex = /({.*})/gs;
  const match = jsonRegex.exec(string);
  const json = match ? match[1] : "";
  const colorSchemeJson = JSON.parse(json);
  colors = colorSchemeJson.colorScheme.colors;
};
const form = document.getElementById("askAIForm");
form.addEventListener("submit", handleFormSubmit);

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
