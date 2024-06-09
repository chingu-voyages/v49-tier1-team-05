import { colorSchemeFinder } from "./groq";
import "./color-wheel";
import { toGiveColorsFromAI } from "./GenerateAIColors";
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
  string.replace(/json/gi, "");
  const jsonRegex = /({.*})/gs;
  const match = jsonRegex.exec(string);
  const json = match ? match[1] : "";
  const colorSchemeJson = JSON.parse(json);

  colors = colorSchemeJson.colorScheme.colors;
  toGiveColorsFromAI(colors);
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
