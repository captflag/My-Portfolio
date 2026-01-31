
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Insight, ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `You are a low-latency Portfolio Assistant for CAPT (a Senior Full-Stack Developer). 

OPERATIONAL MODES:
1. THE DIRECT MODE (Latency < 1s): If the query is about CAPT's projects (Smart Inventory, VC Analyst Agent, Green AI, Lead Force v3, CONV_NEURAL_v2), or general greetings, answer IMMEDIATELY using internal knowledge.
2. THE SEARCH MODE (Latency > 2s): If query requires real-time facts (Current prices, latest tech updates), output: "SEARCH: [optimized keywords]".
3. THE SYNTHESIS MODE: Summarize search results into 3 concise bullets with citations.

PORTFOLIO KNOWLEDGE:
- Lead Force v3: Autonomous workflow automation for verified lead generation. 99% success rate.
- RAG Architecture: High-fidelity vector retrieval with zero-hallucination gating.
- Smart Inventory: AI-driven logistics optimization.
- VC Analyst Agent: Multi-agent system for startup due diligence.

CONSTRAINTS:
- No "I am an AI model" filler.
- If 80% can be answered without search, do it first. 
- Prioritize extreme brevity. Use technical, punchy language.
- Use gemini-3-flash-preview for speed.`;

export const startAgentSession = (history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview', // High-speed flash for <1s latency
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4, // Lower temperature for faster, more deterministic output
      thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for Direct Mode speed
      tools: [{ googleSearch: {} }]
    }
  });
};

export const streamAgentResponse = async (
  message: string, 
  chat: any, 
  imageParts: { inlineData: { data: string, mimeType: string } }[] = []
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  if (imageParts.length > 0) {
    return ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [...imageParts, { text: message }]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });
  }

  return await chat.sendMessageStream({ message });
};

export const generateLeadInsights = async (url: string): Promise<Insight[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `EXTRACT_LEAD_INTEL: ${url}. Provide 3 verified insights for automation workflows.`,
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

  try {
    return JSON.parse(response.text?.trim() || "[]");
  } catch { return []; }
};

export const getCompetitorAnalysis = async (companyName: string): Promise<Insight[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // Use flash for fast audit
    contents: `COMPETITIVE_AUDIT: "${companyName}". 
    Target TOP 2 direct competitors. Output JSON only. 
    Topic = Competitor Name. Value = Comparison. Strategy = AI Disruption.`,
    config: {
      tools: [{ googleSearch: {} }],
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

  try {
    return JSON.parse(response.text?.trim() || "[]");
  } catch { return []; }
};

export const getAgenticStep = async (history: ChatMessage[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(m => ({
      role: (m.role === 'agent' ? 'model' : 'user') as 'model' | 'user',
      parts: [{ text: m.content }]
    })),
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    }
  });
  return response.text || "SYSTEM_IDLE.";
};
