
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTitles = async (topic: string, keywords: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 10 viral, high-CTR YouTube titles for a video about: ${topic}. Focus keywords: ${keywords.join(', ')}. Format as JSON array of strings.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateTags = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 20 SEO-optimized YouTube tags for a video about: ${topic}. Format as a comma-separated string.`,
  });
  return response.text?.split(',').map(tag => tag.trim()) || [];
};

export const generateDescription = async (title: string, keywords: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a compelling, professional YouTube video description for the title: "${title}". Use keywords: ${keywords}. Include sections for About, Timestamps, Socials, and Hashtags.`,
  });
  return response.text || '';
};

export const generateIdeas = async (niche: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 trending, high-potential YouTube video ideas for the niche: "${niche}". For each idea, provide a working title and a brief hook. Format as JSON array of objects with 'title' and 'hook' properties.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING }
          },
          required: ['title', 'hook']
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const researchKeywords = async (keyword: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Perform a Vidiq-style keyword research for: "${keyword}". Return a JSON object with 'score' (0-100), 'searchVolume' (string), 'competition' (Low/Medium/High), and 'relatedKeywords' (array of strings).`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          searchVolume: { type: Type.STRING },
          competition: { type: Type.STRING },
          relatedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['score', 'searchVolume', 'competition', 'relatedKeywords']
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateVoiceover = async (script: string, voice: string = 'Kore') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: script }] }],
    config: {
      responseModalities: ['AUDIO' as any],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
