import { GoogleGenAI } from "@google/genai";
import { Word } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIExplanation = async (word: Word): Promise<string> => {
  if (!apiKey) return "API Key not configured. Using offline mode.";
  
  try {
    const prompt = `
      Act as a German language tutor for a Turkish speaker.
      Provide a concise explanation for the German word "${word.german}" (${word.wordType}).
      Include:
      1. Nuances of meaning.
      2. A common idiom or phrase using this word if applicable.
      3. Keep the explanation under 50 words.
      4. Output in Turkish.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Açıklama üretilemedi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bağlantı hatası. Lütfen daha sonra tekrar deneyin.";
  }
};

export const generateNewSentence = async (word: Word): Promise<{ german: string, turkish: string }> => {
  if (!apiKey) return { german: "Offline mode", turkish: "Offline mod" };

  try {
    const prompt = `
      Generate a simple German sentence using the word "${word.german}".
      Target CEFR level: ${word.level}.
      Return valid JSON only in this format: { "german": "...", "turkish": "..." }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { german: "Fehler beim Laden.", turkish: "Yükleme hatası." };
  }
};
