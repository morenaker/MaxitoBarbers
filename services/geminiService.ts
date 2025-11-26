import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn('VITE_GEMINI_API_KEY is not set. AI Chat will not work.');
}
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not configured. Please check your environment variables.');
    }
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || 'Omlouvám se, ale nemohu zpracovat vaši zprávu. Zkuste to prosím později.'
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Omlouvám se, ale momentálně nemohu odpovědět. Zkuste to prosím později nebo využijte kontaktní formulář.";
  }
};