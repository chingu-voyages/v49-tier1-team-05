import iro from "@jaames/iro";
let color = "rgb(255, 0, 0)";
const colorWheel = new iro.ColorPicker("#colorWheel", {
  width: 320,
  color: color,
  borderWidth: 1,
  borderColor: "#fff",
  layoutDirection: "vertical",
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        wheelLightness: true,
        wheelAngle: 0,
        wheelDirection: "clockwise",
      },
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: "value",
      },
    },
  ],
});

colorWheel.on("color:change", (newColor) => {
  color = newColor.hexString;
  document.getElementById("pickerColorDiv").style.backgroundColor = color;
});
document.getElementById("pickerColorDiv").style.backgroundColor = color;
