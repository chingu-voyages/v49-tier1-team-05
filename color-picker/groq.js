import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ,
  dangerouslyAllowBrowser: true,
});

const colorSchemeFinder = async (mood, audience, usage, keywords, dropdown) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        The JSON schema should be in the format of:
        {
          "colorScheme": {
            "colors": ["string"]
          }
        }
        Provide a json object that contains a ${dropdown} color scheme of 5 colors given the mood ${mood},
        the color scheme should be for the ${audience} for ${usage}.
        here are a few more keywords to describe the color scheme we are aiming for: ${keywords}
        Dont give commnents in the JSON object, provide them after the JSON object is completed.

        example of json object is :
        {
          "colorScheme": {
            "colors": ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"]
          }
        }

        and then explain why you chose each color in the color scheme.
      `,
      },
    ],
    model: "llama3-8b-8192",
  });
  const chatResponse = chatCompletion.choices[0]?.message?.content || "";
  return chatResponse;
};

export { colorSchemeFinder };

// provide a json object that finds the triads, monochrome, complement of the color ${hexColor}
// provide them in the format of nested json objects

/**
 * Provide a JSON Object that contains a color scheme of four colors generated from the hex code color ${hexColor}. 
      The color scheme should help with ${formData.colorScheme}. 
      Provide details about why each color was picked. 
      Ensure each color has a name and hex code and description with at least 10 characters. 
      The color scheme must be used to ${formData.usage}. 
      The JSON object is an array of objects that contain the following properties: name, hex, description.
 */
