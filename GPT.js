import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

config();

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    console.log(response.data.choices[0].message.content);
    userInterface.prompt();
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    userInterface.prompt();
  }
});
