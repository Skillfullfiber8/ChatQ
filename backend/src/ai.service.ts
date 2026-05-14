import openai from 'openai';

const apiClient = new openai.Client({ apiKey: process.env.OPENAI_API_KEY });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await apiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return 'Sorry, I couldn\'t generate a response.';
  }
};
