import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBlogContent = async (topic: string, tone: string) => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const model = "gemini-2.5-flash";

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Write a blog post about "${topic}". The tone should be ${tone}. 
      Return a JSON object with a catchy title, a short excerpt (summary), the main content (formatted with paragraphs), and a suggested category.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["title", "excerpt", "content", "category"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw error;
  }
};
