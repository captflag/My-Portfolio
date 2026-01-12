
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use process.env.API_KEY directly and create new instances for each request to ensure fresh context/keys
export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || "You are an elite AI Freelancer specializing in technical brutalist systems for CAPT.",
      temperature: 0.7,
    },
  });
  // Use .text property directly as per latest SDK guidelines
  return response.text;
};

export const generateLeadInsights = async (url: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate scraping the URL: ${url}. Provide 3 highly specific business insights and growth strategies for this entity.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            value: { type: Type.STRING },
            strategy: { type: Type.STRING },
          },
          required: ["topic", "value", "strategy"],
        },
      },
    },
  });
  // Use .text property and provide a fallback for JSON parsing
  return JSON.parse(response.text || "[]");
};

export const getAgenticStep = async (conversation: { role: string; content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Fix: Concatenate conversation into a single prompt string for reliable processing in basic text completion
  const conversationLog = conversation.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: conversationLog,
    config: {
      systemInstruction: "You are a qualifying agent for CAPT AI, a technical AI freelancer. Ask exactly one short, punchy question to qualify the user's project or suggest a high-level technical workflow based on their previous message. Be professional and technical.",
    },
  });
  return response.text;
};
