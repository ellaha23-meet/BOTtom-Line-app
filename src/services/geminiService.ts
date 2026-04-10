import { GoogleGenAI, Type } from "@google/genai";

const stopWords = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with', 'this', 'can', 'you', 'your', 'or', 'use', 'using', 'used', 'tool', 'tools', 'help', 'helps', 'allow', 'allows']);

export function summarizeWithAI(text: string): Promise<string> {
  if (!text) return Promise.resolve("");
  
  // Local summarization: take the first sentence, and limit to ~10 words.
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  const words = firstSentence.split(/\s+/);
  if (words.length > 10) {
    return Promise.resolve(words.slice(0, 10).join(" ") + "...");
  }
  return Promise.resolve(firstSentence);
}

export function summarizeCategoryWithAI(text: string): Promise<string> {
  if (!text) return Promise.resolve("");
  
  // Local keyword extraction:
  // 1. Split by non-word characters
  // 2. Filter out stop words and short words
  // 3. Take the first 2 unique words
  const words = text.toLowerCase().split(/[\s,.;:()]+/);
  const keywords = Array.from(new Set(words.filter(w => w.length > 3 && !stopWords.has(w)))).slice(0, 2);
  
  if (keywords.length > 0) {
    return Promise.resolve(keywords.join(", "));
  }
  
  // Fallback if no good keywords found
  return Promise.resolve(text.split(/\s+/).slice(0, 2).join(" "));
}

async function hashStrings(strings: string[]) {
  const text = strings.sort().join('|');
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function batchSummarizeCategoriesWithAI(categories: string[]): Promise<Record<string, string>> {
  if (!categories || categories.length === 0) return {};

  const uniqueCategories = Array.from(new Set(categories.filter(Boolean)));
  const cacheKey = "gemini_category_summaries_v4_" + await hashStrings(uniqueCategories);

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // ignore
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `
You are an expert summarizer. I have a list of use case descriptions for AI tools. 
For each description, describe the tool's main purpose in a maximum of 3 words.
Return an array of objects, where each object has 'original' (the exact original use case description) and 'summary' (the max 3-word summary).

Use cases:
${JSON.stringify(uniqueCategories)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                summary: { type: Type.STRING }
              },
              required: ["original", "summary"]
            }
          }
      }
    });

    const resultText = response.text;
    if (resultText) {
      const parsedArray = JSON.parse(resultText);
      const parsed: Record<string, string> = {};
      for (const item of parsedArray) {
        parsed[item.original] = item.summary;
      }
      localStorage.setItem(cacheKey, JSON.stringify(parsed));
      return parsed;
    }
  } catch (error) {
    console.error("Error calling Gemini:", error);
  }

  // Fallback
  const fallback: Record<string, string> = {};
  for (const cat of uniqueCategories) {
    fallback[cat] = await summarizeCategoryWithAI(cat);
  }
  return fallback;
}
