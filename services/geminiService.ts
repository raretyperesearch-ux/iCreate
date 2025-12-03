import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStartupPitch = async (name: string, ticker: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, punchy, 2-sentence elevator pitch for a memecoin startup called "${name}" with ticker $${ticker}. It should sound visionary but slightly degenerate, mixing Apple marketing speak with crypto slang.`,
    });
    return response.text || "This token changes everything. Again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The future of finance is here. Trust the process.";
  }
};

export const analyzeSentiment = async (comments: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze these crypto community comments and give a one-sentence "Market Sentiment" summary in the style of a cynical financial analyst: ${comments.join(' | ')}`,
    });
    return response.text || "Market sentiment is volatile.";
  } catch (error) {
    return "Analysis unavailable.";
  }
};
