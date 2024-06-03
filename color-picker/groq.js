import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ,
  dangerouslyAllowBrowser: true,
});

const chatCompletion = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: `hi gpt 3, can you help me with a color picker?`,
    },
  ],
  model: "llama3-8b-8192",
});
const chatResponse = chatCompletion.choices[0]?.message?.content || "";

console.log(chatResponse);
