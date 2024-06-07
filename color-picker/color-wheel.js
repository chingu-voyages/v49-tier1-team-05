import iro from "@jaames/iro";

const colorWheel = new iro.ColorPicker("#colorWheel", {
  width: 320,
  color: "rgb(255, 0, 0)",
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

colorWheel.on("color:change", (color) => {
  const hexColor = color.hexString;
  document.getElementById("pickerColorDiv").style.backgroundColor = hexColor;
  //   toGiveColorsFromAI();
});

export default colorWheel;
