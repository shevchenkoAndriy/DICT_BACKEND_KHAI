import { OPENAI_API_KEY } from "../Common/config.js";
import { Configuration, OpenAIApi } from "openai";

class ChatgptService {
  constructor() {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }
  async makeRequest(content) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
      });

      return completion.data.choices[0].message;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const chatgptService = new ChatgptService();
